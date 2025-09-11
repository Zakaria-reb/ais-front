import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Bell, CheckCheck, Info, AlertTriangle, CheckCircle } from "lucide-react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Project Assignment",
      message: "You've been assigned to the AI Research Project",
      time: "2h ago",
      type: "info" as const,
      read: false
    },
    {
      id: 2,
      title: "Training Reminder",
      message: "React Advanced Patterns training starts tomorrow",
      time: "4h ago",
      type: "warning" as const,
      read: false
    },
     {
       id: 3,
       title: "Task Completed",
       message: "Database schema design has been approved",
       time: "1d ago",
       type: "success" as const,
       read: true
     },
    {
      id: 4,
      title: "System Maintenance",
      message: "Scheduled maintenance on Saturday 2AM-4AM",
      time: "2d ago",
      type: "warning" as const,
      read: false
    },
    {
      id: 5,
      title: "Event Registration",
      message: "Successfully registered for Tech Talk 2024",
      time: "3d ago",
      type: "success" as const,
      read: true
    }
  ]);

  const [activeTab, setActiveTab] = useState("all");

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "info": return <Info className="w-4 h-4 text-primary" />;
      case "warning": return <AlertTriangle className="w-4 h-4 text-warning" />;
      case "success": return <CheckCircle className="w-4 h-4 text-success" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "info": return "secondary";
      case "warning": return "destructive";
      case "success": return "default";
      default: return "secondary";
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    if (activeTab === "unread") return !notif.read;
    if (activeTab === "system") return notif.type === "warning";
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center animate-pulse-glow">
            <Bell className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-orbitron bg-gradient-primary bg-clip-text text-transparent">
              Notifications
            </h1>
            <p className="text-muted-foreground font-jetbrains">
              {unreadCount} unread notifications
            </p>
          </div>
        </div>
        <Button 
          onClick={markAllAsRead}
          className="bg-gradient-accent hover:bg-gradient-accent/80 font-jetbrains"
          disabled={unreadCount === 0}
        >
          <CheckCheck className="w-4 h-4 mr-2" />
          Mark all as read
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted/50 border border-primary/20">
          <TabsTrigger value="all" className="font-jetbrains">
            All ({notifications.length})
          </TabsTrigger>
          <TabsTrigger value="unread" className="font-jetbrains">
            Unread ({unreadCount})
          </TabsTrigger>
          <TabsTrigger value="system" className="font-jetbrains">
            System
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4 mt-6">
          {filteredNotifications.length === 0 ? (
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground font-jetbrains">No notifications found</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            filteredNotifications.map((notification) => (
              <Card 
                key={notification.id}
                className={`border-primary/20 bg-card/50 backdrop-blur-sm transition-all hover:bg-card/70 hover:border-primary/40 ${
                  !notification.read ? 'border-l-4 border-l-accent shadow-lg' : ''
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      {getTypeIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`font-medium font-orbitron ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {notification.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <Badge variant={getTypeBadge(notification.type) as any} className="font-jetbrains">
                            {notification.type}
                          </Badge>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                          )}
                        </div>
                      </div>
                      <p className={`text-sm font-jetbrains mb-2 ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground font-jetbrains">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Notifications;