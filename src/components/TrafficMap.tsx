import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, AlertTriangle } from "lucide-react";

const TrafficMap = () => {
  const intersections = [
    { id: 1, x: 20, y: 30, status: "good", flow: 85 },
    { id: 2, x: 60, y: 25, status: "warning", flow: 65 },
    { id: 3, x: 45, y: 60, status: "danger", flow: 25 },
    { id: 4, x: 75, y: 70, status: "good", flow: 90 },
    { id: 5, x: 30, y: 75, status: "good", flow: 80 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "traffic-good";
      case "warning": return "traffic-warning";
      case "danger": return "traffic-danger";
      default: return "primary";
    }
  };

  return (
    <Card className="p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Live Traffic Map</h3>
        <div className="flex gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-traffic-good"></div>
            Good Flow
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-traffic-warning"></div>
            Congested
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-traffic-danger"></div>
            Blocked
          </Badge>
        </div>
      </div>
      
      <div className="relative bg-muted/20 rounded-lg h-96 overflow-hidden">
        {/* Road Network */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          {/* Horizontal Roads */}
          <line x1="0" y1="30" x2="100" y2="30" stroke="currentColor" strokeWidth="0.5" className="opacity-30" />
          <line x1="0" y1="60" x2="100" y2="60" stroke="currentColor" strokeWidth="0.5" className="opacity-30" />
          <line x1="0" y1="75" x2="100" y2="75" stroke="currentColor" strokeWidth="0.5" className="opacity-30" />
          
          {/* Vertical Roads */}
          <line x1="20" y1="0" x2="20" y2="100" stroke="currentColor" strokeWidth="0.5" className="opacity-30" />
          <line x1="45" y1="0" x2="45" y2="100" stroke="currentColor" strokeWidth="0.5" className="opacity-30" />
          <line x1="60" y1="0" x2="60" y2="100" stroke="currentColor" strokeWidth="0.5" className="opacity-30" />
          <line x1="75" y1="0" x2="75" y2="100" stroke="currentColor" strokeWidth="0.5" className="opacity-30" />
        </svg>

        {/* Traffic Intersections */}
        {intersections.map((intersection) => (
          <div
            key={intersection.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
            style={{
              left: `${intersection.x}%`,
              top: `${intersection.y}%`,
            }}
          >
            <div className={`w-3 h-3 rounded-full bg-${getStatusColor(intersection.status)} animate-pulse-glow`}></div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Card className="p-2 text-xs whitespace-nowrap">
                <div className="font-medium">Intersection {intersection.id}</div>
                <div className="text-muted-foreground">Flow: {intersection.flow}%</div>
              </Card>
            </div>
          </div>
        ))}

        {/* Active Incident Markers */}
        <div className="absolute top-4 right-4">
          <AlertTriangle className="w-6 h-6 text-traffic-danger animate-pulse" />
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button className="p-2 bg-card/80 backdrop-blur rounded-md hover:bg-card transition-colors">
            <Navigation className="w-4 h-4" />
          </button>
          <button className="p-2 bg-card/80 backdrop-blur rounded-md hover:bg-card transition-colors">
            <MapPin className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Card>
  );
};

export default TrafficMap;