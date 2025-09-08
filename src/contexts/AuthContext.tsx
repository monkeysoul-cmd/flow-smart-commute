import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
  updateProfile: (data: { full_name?: string; role?: string; department?: string }) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (event === 'SIGNED_IN' && session?.user) {
          // Log user activity
          setTimeout(() => {
            logUserActivity('login', 'User signed in');
            updateLoginStats();
          }, 0);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const logUserActivity = async (activityType: string, description: string, metadata?: any) => {
    if (!user) return;
    
    await supabase
      .from('user_activity')
      .insert({
        user_id: user.id,
        activity_type: activityType,
        description,
        metadata,
        created_at: new Date().toISOString()
      });
  };

  const updateLoginStats = async () => {
    if (!user) return;
    
    // Get current login count and increment it
    const { data: profile } = await supabase
      .from('profiles')
      .select('login_count')
      .eq('user_id', user.id)
      .single();
    
    const newLoginCount = (profile?.login_count || 0) + 1;
    
    await supabase
      .from('profiles')
      .update({
        last_login: new Date().toISOString(),
        login_count: newLoginCount
      })
      .eq('user_id', user.id);
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: fullName ? { full_name: fullName } : undefined
      }
    });
    
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    return { error };
  };

  const signOut = async () => {
    if (user) {
      await logUserActivity('logout', 'User signed out');
    }
    
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  const updateProfile = async (data: { full_name?: string; role?: string; department?: string }) => {
    if (!user) return { error: 'Not authenticated' };
    
    const { error } = await supabase
      .from('profiles')
      .update(data)
      .eq('user_id', user.id);
      
    if (!error) {
      await logUserActivity('profile_update', 'Profile updated', data);
    }
    
    return { error };
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}