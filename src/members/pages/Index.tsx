import { Button } from "../components/ui/button";
import StatCard from "../components/StatCard";
import { 
  FolderKanban, 
  GraduationCap, 
  Calendar, 
  TrendingUp,
  Users,
  MessageSquare,
  Plus,
  ArrowRight
} from "lucide-react";

const Index = () => {
  // Mock data - replace with real data from Supabase
  const userStats = {
    projects: 3,
    trainings: 5,
    events: 8
  };

  const announcements = [
    {
      id: 1,
      title: "New AI Workshop Series Starting Next Week",
      content: "Join our comprehensive AI workshop series covering machine learning fundamentals and practical applications.",
      date: "2 hours ago"
    },
    {
      id: 2,
      title: "Hackathon Registration Now Open",
      content: "Annual tech hackathon is here! Form your teams and register before the deadline.",
      date: "1 day ago"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      title: "New discussion in Web Development Project",
      user: "Sarah Chen",
      time: "5 min ago"
    },
    {
      id: 2,
      title: "Mobile App prototype ready for review",
      user: "Alex Kumar",
      time: "1 hour ago"
    },
    {
      id: 3,
      title: "Database schema updated",
      user: "Maria Garcia",
      time: "3 hours ago"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold font-orbitron text-foreground">
              Welcome back, <span className="bg-gradient-primary bg-clip-text text-transparent animate-pulse">John</span>!
            </h1>
            <p className="text-muted-foreground mt-2 font-jetbrains text-lg">
              Here's what's happening in your club today
            </p>
            <div className="mt-4 flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm text-success font-jetbrains">System Online</span>
              <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
              <span className="text-sm text-muted-foreground font-jetbrains">Last sync: 2 min ago</span>
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="animate-float">
              <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg animate-pulse-glow border border-primary/20">
                <GraduationCap className="w-10 h-10 text-primary-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="My Projects"
          value={userStats.projects}
          icon={FolderKanban}
          trend={{ value: 12, label: "this month" }}
        />
        <StatCard
          title="Trainings Enrolled"
          value={userStats.trainings}
          icon={GraduationCap}
          trend={{ value: 8, label: "this month" }}
        />
        <StatCard
          title="Events Joined"
          value={userStats.events}
          icon={Calendar}
          trend={{ value: 15, label: "this month" }}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Button className="btn-gradient h-20 text-left justify-start space-x-4 hover:scale-105 transition-all group border border-primary/20 font-jetbrains relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform z-10" />
          <div className="z-10">
            <div className="font-medium font-orbitron">Join a Project</div>
            <div className="text-xs opacity-90">Find exciting projects to contribute</div>
          </div>
        </Button>
        
        <Button className="btn-accent h-20 text-left justify-start space-x-4 hover:scale-105 transition-all group border border-accent/20 font-jetbrains relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <GraduationCap className="w-6 h-6 group-hover:rotate-12 transition-transform z-10" />
          <div className="z-10">
            <div className="font-medium font-orbitron">Register for Training</div>
            <div className="text-xs opacity-90">Enhance your skills</div>
          </div>
        </Button>
        
        <Button variant="outline" className="h-20 text-left justify-start space-x-4 border-2 border-primary/30 hover:bg-gradient-card hover:border-primary hover:scale-105 transition-all group font-jetbrains relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <Calendar className="w-6 h-6 group-hover:scale-110 transition-transform z-10" />
          <div className="z-10">
            <div className="font-medium font-orbitron">View Event Calendar</div>
            <div className="text-xs text-muted-foreground">See upcoming events</div>
          </div>
        </Button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Announcements */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold font-orbitron text-foreground">Latest Announcements</h2>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary-dark font-jetbrains group">
              View all <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          <div className="space-y-3">
            {announcements.map((announcement, index) => (
              <div key={announcement.id} className="card-elevated p-5 rounded-lg border border-primary/20 hover:border-primary/40 transition-all group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-primary"></div>
                <div className="space-y-3 relative z-10">
                  <div className="flex items-start justify-between">
                    <h3 className="font-medium font-orbitron text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                      {announcement.title}
                    </h3>
                    <span className="text-xs text-muted-foreground font-jetbrains whitespace-nowrap ml-2">
                      {announcement.date}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground font-jetbrains line-clamp-2">
                    {announcement.content}
                  </p>
                  <div className="flex items-center space-x-2">
                    <div className="w-1 h-1 bg-accent rounded-full animate-pulse"></div>
                    <span className="text-xs text-accent font-jetbrains">Priority {index === 0 ? 'High' : 'Normal'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold font-orbitron text-foreground">Recent Activity</h2>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary-dark font-jetbrains group">
              View all <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={activity.id} className="card-elevated p-5 rounded-lg border border-primary/20 hover:border-primary/40 transition-all group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex items-start space-x-4 relative z-10">
                  <div className="w-3 h-3 bg-gradient-primary rounded-full mt-1.5 flex-shrink-0 animate-pulse"></div>
                  <div className="space-y-2 flex-1 min-w-0">
                    <p className="text-sm font-medium font-orbitron text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                      {activity.title}
                    </p>
                    <div className="flex items-center space-x-3 text-xs text-muted-foreground font-jetbrains">
                      <span className="flex items-center space-x-1">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span>by {activity.user}</span>
                      </span>
                      <span>•</span>
                      <span>{activity.time}</span>
                      <span>•</span>
                      <span className="text-accent">Live</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
