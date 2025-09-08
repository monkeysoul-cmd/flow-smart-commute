import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Construction, Car, X } from "lucide-react";
import { useState } from "react";

const IncidentAlerts = () => {
  const [incidents, setIncidents] = useState([
    {
      id: 1,
      type: "accident",
      severity: "high",
      location: "I-95 Mile 47",
      description: "Multi-vehicle collision blocking 2 lanes",
      time: "2 minutes ago",
      resolved: false,
    },
    {
      id: 2,
      type: "construction",
      severity: "medium",
      location: "Downtown Bridge",
      description: "Lane closure for emergency repairs",
      time: "15 minutes ago",
      resolved: false,
    },
    {
      id: 3,
      type: "breakdown",
      severity: "low",
      location: "Route 101 Exit 23",
      description: "Disabled vehicle on shoulder",
      time: "8 minutes ago",
      resolved: false,
    },
  ]);

  const getIncidentIcon = (type: string) => {
    switch (type) {
      case "accident": return AlertTriangle;
      case "construction": return Construction;
      case "breakdown": return Car;
      default: return AlertTriangle;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "traffic-danger";
      case "medium": return "traffic-warning";
      case "low": return "traffic-info";
      default: return "muted";
    }
  };

  const resolveIncident = (id: number) => {
    setIncidents(incidents.filter(incident => incident.id !== id));
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Active Incidents</h3>
        <Badge variant="destructive" className="animate-pulse">
          {incidents.length} Active
        </Badge>
      </div>

      <div className="space-y-3">
        {incidents.map((incident) => {
          const Icon = getIncidentIcon(incident.type);
          return (
            <div key={incident.id} className="flex items-start gap-3 p-3 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors">
              <div className={`p-2 rounded-lg bg-${getSeverityColor(incident.severity)}/20 flex-shrink-0`}>
                <Icon className={`w-4 h-4 text-${getSeverityColor(incident.severity)}`} />
              </div>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{incident.location}</p>
                  <Badge variant="outline" className={`text-${getSeverityColor(incident.severity)} text-xs`}>
                    {incident.severity}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{incident.description}</p>
                <p className="text-xs text-muted-foreground">{incident.time}</p>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => resolveIncident(incident.id)}
                className="flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          );
        })}
        
        {incidents.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <AlertTriangle className="w-12 h-12 mx-auto mb-2 opacity-20" />
            <p>No active incidents</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default IncidentAlerts;