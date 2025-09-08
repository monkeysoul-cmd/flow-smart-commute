import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Zap, Settings, RotateCcw } from "lucide-react";
import { useState } from "react";

const TrafficLightsPanel = () => {
  const [autoMode, setAutoMode] = useState(true);
  
  const trafficLights = [
    { id: "TL001", location: "Main St & 1st Ave", status: "green", cycle: 45, remaining: 23 },
    { id: "TL002", location: "Oak Rd & 2nd St", status: "red", cycle: 60, remaining: 8 },
    { id: "TL003", location: "Pine Ave & 3rd St", status: "yellow", cycle: 40, remaining: 3 },
    { id: "TL004", location: "Elm St & 4th Ave", status: "green", cycle: 50, remaining: 31 },
    { id: "TL005", location: "Maple Dr & 5th St", status: "red", cycle: 55, remaining: 12 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "green": return "traffic-good";
      case "red": return "traffic-danger";
      case "yellow": return "traffic-warning";
      default: return "muted";
    }
  };

  const getStatusDot = (status: string) => {
    return `w-3 h-3 rounded-full bg-${getStatusColor(status)} ${status === 'yellow' ? 'animate-pulse' : ''}`;
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Traffic Lights Control</h3>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Auto Mode</span>
            <Switch checked={autoMode} onCheckedChange={setAutoMode} />
          </div>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {trafficLights.map((light) => (
          <div key={light.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className={getStatusDot(light.status)}></div>
              <div>
                <p className="font-medium">{light.id}</p>
                <p className="text-sm text-muted-foreground">{light.location}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium">{light.remaining}s</p>
                <p className="text-xs text-muted-foreground">of {light.cycle}s</p>
              </div>
              
              <Badge variant="outline" className={`text-${getStatusColor(light.status)}`}>
                {light.status.toUpperCase()}
              </Badge>
              
              {!autoMode && (
                <Button variant="ghost" size="sm">
                  <RotateCcw className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TrafficLightsPanel;