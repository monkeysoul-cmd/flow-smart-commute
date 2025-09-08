import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Users, Clock } from "lucide-react";

const MetricsDashboard = () => {
  const metrics = [
    {
      label: "Average Speed",
      value: "42 km/h",
      change: "+5.2%",
      trend: "up",
      progress: 75,
      icon: TrendingUp,
    },
    {
      label: "Traffic Volume",
      value: "8,247",
      change: "-12.8%",
      trend: "down",
      progress: 65,
      icon: Users,
    },
    {
      label: "Wait Time",
      value: "2.3 min",
      change: "-8.1%",
      trend: "down",
      progress: 80,
      icon: Clock,
    },
    {
      label: "Flow Efficiency",
      value: "87.3%",
      change: "+3.4%",
      trend: "up",
      progress: 87,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index} className="p-4 hover:shadow-lg transition-shadow animate-slide-in" 
              style={{ animationDelay: `${index * 0.1}s` }}>
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg bg-${metric.trend === 'up' ? 'traffic-good' : 'traffic-info'}/20`}>
              <metric.icon className={`w-4 h-4 text-${metric.trend === 'up' ? 'traffic-good' : 'traffic-info'}`} />
            </div>
            <div className={`text-sm font-medium ${
              metric.trend === 'up' ? 'text-traffic-good' : 'text-traffic-info'
            }`}>
              {metric.change}
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{metric.label}</p>
            <p className="text-2xl font-bold">{metric.value}</p>
            <Progress value={metric.progress} className="h-2" />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default MetricsDashboard;