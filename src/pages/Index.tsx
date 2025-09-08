import { Activity, BarChart3, AlertCircle, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import TrafficMap from "@/components/TrafficMap";
import MetricsDashboard from "@/components/MetricsDashboard";
import TrafficLightsPanel from "@/components/TrafficLightsPanel";
import IncidentAlerts from "@/components/IncidentAlerts";
import heroImage from "@/assets/traffic-control-hero.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Smart Traffic Management</h1>
                <p className="text-sm text-muted-foreground">Real-time monitoring & control system</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-traffic-good animate-pulse"></div>
                <span className="text-muted-foreground">System Online</span>
              </div>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Smart Traffic Management Control Center"
            className="w-full h-64 object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/40"></div>
        </div>
        
        <div className="relative container mx-auto px-6 py-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Advanced Traffic Intelligence
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Monitor and optimize traffic flow across the entire city network with real-time data analytics and intelligent control systems.
            </p>
            <div className="flex gap-3">
              <Button className="bg-gradient-primary text-primary-foreground">
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
              <Button variant="outline">
                <AlertCircle className="w-4 h-4 mr-2" />
                Emergency Mode
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Metrics Overview */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Traffic Metrics</h3>
          <MetricsDashboard />
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Traffic Map - Takes 2 columns */}
          <div className="lg:col-span-2">
            <TrafficMap />
          </div>
          
          {/* Incident Alerts */}
          <div>
            <IncidentAlerts />
          </div>
        </div>

        {/* Traffic Lights Panel */}
        <section>
          <TrafficLightsPanel />
        </section>
      </main>
    </div>
  );
};

export default Index;