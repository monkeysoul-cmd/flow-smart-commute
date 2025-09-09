-- Create the demo user for testing
-- Note: This is a direct insert which will trigger our handle_new_user() function
-- to create the corresponding profile entry

-- First, let's create a test user with a known password hash
-- We'll use Supabase's auth.users table insert with proper password hashing

-- Insert test user directly into auth.users
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_user_meta_data,
  is_super_admin,
  confirmation_token,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  'demo-user-12345678-1234-1234-1234-123456789012'::uuid,
  'authenticated',
  'authenticated',
  'demo@traffic.gov',
  '$2a$10$5z0Z8G0xk1qQ5z0Z8G0xk1qQ5z0Z8G0xk1qQ5z0Z8G0xk1qQ5z0Z8G',
  now(),
  now(),
  now(),
  '{"full_name": "Demo User", "role": "admin"}',
  false,
  '',
  ''
) ON CONFLICT (email) DO NOTHING;

-- Insert corresponding profile entry
INSERT INTO public.profiles (
  user_id,
  email,
  full_name,
  role,
  department
) VALUES (
  'demo-user-12345678-1234-1234-1234-123456789012'::uuid,
  'demo@traffic.gov',
  'Demo User',
  'admin',
  'traffic_control'
) ON CONFLICT (user_id) DO NOTHING;