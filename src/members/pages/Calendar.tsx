import { Calendar as CalendarComponent } from "../components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Calendar as CalendarIcon, Clock, MapPin, User, Eye, Edit } from "lucide-react";
import { useState } from "react";

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const events = [
    {
      id: 1,
      date: "2024-01-15",
      time: "10:00 AM",
      title: "React Workshop",
      organizer: "Sarah Chen",
      location: "Lab A-101",
      status: "confirmed" as const
    },
    {
      id: 2,
      date: "2024-01-16",
      time: "2:00 PM",
      title: "Project Presentation",
      organizer: "Dr. Smith",
      location: "Auditorium",
      status: "pending" as const
    },
    {
      id: 3,
      date: "2024-01-18",
      time: "9:00 AM",
      title: "Tech Talk: AI in Practice",
      organizer: "Tech Club",
      location: "Conference Room B",
      status: "confirmed" as const
    },
    {
      id: 4,
      date: "2024-01-20",
      time: "3:30 PM",
      title: "Team Building Event",
      organizer: "Student Council",
      location: "Campus Garden",
      status: "cancelled" as const
    },
    {
      id: 5,
      date: "2024-01-22",
      time: "11:00 AM",
      title: "Coding Competition",
      organizer: "Programming Club",
      location: "Computer Lab",
      status: "confirmed" as const
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed": return { variant: "default" as const, label: "Confirmed" };
      case "pending": return { variant: "secondary" as const, label: "Pending" };
      case "cancelled": return { variant: "destructive" as const, label: "Cancelled" };
      default: return { variant: "secondary" as const, label: status };
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center animate-pulse-glow">
          <CalendarIcon className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold font-orbitron bg-gradient-primary bg-clip-text text-transparent">
            Calendar
          </h1>
          <p className="text-muted-foreground font-jetbrains">
            Manage your events and schedule
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar */}
        <Card className="lg:col-span-1 border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-orbitron text-lg flex items-center">
              <CalendarIcon className="w-5 h-5 mr-2 text-primary" />
              Event Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border border-primary/20"
            />
          </CardContent>
        </Card>

        {/* Events Table */}
        <Card className="lg:col-span-2 border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-orbitron text-lg flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-primary" />
                Upcoming Events
              </div>
              <Button size="sm" className="bg-gradient-accent hover:bg-gradient-accent/80 font-jetbrains">
                Add Event
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-primary/20">
                    <TableHead className="font-jetbrains text-muted-foreground">Date</TableHead>
                    <TableHead className="font-jetbrains text-muted-foreground">Time</TableHead>
                    <TableHead className="font-jetbrains text-muted-foreground">Title</TableHead>
                    <TableHead className="font-jetbrains text-muted-foreground">Organizer</TableHead>
                    <TableHead className="font-jetbrains text-muted-foreground">Location</TableHead>
                    <TableHead className="font-jetbrains text-muted-foreground">Status</TableHead>
                    <TableHead className="font-jetbrains text-muted-foreground">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((event) => {
                    const statusInfo = getStatusBadge(event.status);
                    return (
                      <TableRow key={event.id} className="border-primary/20 hover:bg-muted/50">
                        <TableCell className="font-jetbrains">
                          <div className="flex items-center">
                            <CalendarIcon className="w-4 h-4 mr-2 text-primary" />
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell className="font-jetbrains">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                            {event.time}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium font-orbitron">{event.title}</TableCell>
                        <TableCell className="font-jetbrains">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-2 text-muted-foreground" />
                            {event.organizer}
                          </div>
                        </TableCell>
                        <TableCell className="font-jetbrains">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                            {event.location}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={statusInfo.variant} className="font-jetbrains">
                            {statusInfo.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Calendar;