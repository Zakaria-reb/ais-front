import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { 
  User, 
  Mail, 
  Phone, 
  GraduationCap, 
  Calendar, 
  Award, 
  FolderKanban,
  Settings,
  Edit
} from "lucide-react";

import { useEffect, useState } from "react";
import { getCurrentUser, UserProfile } from "../../lib/api";
import { login, logout } from "../../lib/api";

const MemberProfile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // local fallback until API responds
  const fallback: UserProfile = {
    fullName: "John Doe",
    username: "johndoe",
    yearOfStudy: "Year 3",
    email: "john.doe@university.edu",
    phone: "+1 (555) 123-4567",
    projectsParticipated: [
      { id: 1, name: "AI Chatbot", role: "Frontend Developer", status: "Completed" },
      { id: 2, name: "Web Portfolio", role: "Full Stack", status: "Ongoing" },
      { id: 3, name: "Mobile App", role: "UI/UX Designer", status: "Completed" }
    ],
    eventsAttended: [
      { id: 1, name: "Tech Conference 2024", date: "Mar 15, 2024" },
      { id: 2, name: "Hackathon Spring", date: "Feb 20, 2024" },
      { id: 3, name: "AI Workshop Series", date: "Jan 10, 2024" }
    ],
    achievements: [
      { id: 1, name: "Project Leader", description: "Led 3+ successful projects", icon: "🏆" },
      { id: 2, name: "Team Player", description: "Collaborated on 10+ projects", icon: "🤝" },
      { id: 3, name: "Innovation Award", description: "Best innovative solution 2024", icon: "💡" },
      { id: 4, name: "Code Master", description: "Contributed 50+ commits", icon: "💻" }
    ]
  };

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getCurrentUser()
      .then((u) => {
        if (!cancelled) setUserProfile(u);
      })
      .catch((err) => {
        console.error(err);
        if (!cancelled) setError(String(err));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const profile = userProfile ?? fallback;

  return (
    <div className="space-y-8">
      {loading && (
        <div className="p-4 rounded bg-muted/40 text-center">Loading profile...</div>
      )}
      {error && (
        <div className="p-4 rounded bg-destructive/10 text-destructive">Failed to load profile: {error}</div>
      )}
      <div className="flex space-x-2">
        <button
          onClick={async () => {
            const user = prompt('username', 'janedoe');
            const pass = prompt('password', 'password');
            if (user && pass) {
              try {
                await login(user, pass);
                setLoading(true);
                const u = await getCurrentUser();
                setUserProfile(u);
                setError(null);
              } catch (e) {
                setError(String(e));
              } finally {
                setLoading(false);
              }
            }
          }}
          className="px-3 py-1 btn"
        >
          Login
        </button>
        <button
          onClick={() => {
            logout();
            setUserProfile(null);
          }}
          className="px-3 py-1 btn"
        >
          Logout
        </button>
      </div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-orbitron bg-gradient-primary bg-clip-text text-transparent">
            Member Profile
          </h1>
          <p className="text-muted-foreground mt-1 font-jetbrains">
            Manage your club profile and achievements
          </p>
        </div>
        <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90 font-jetbrains">
          <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-1">
          <Card className="card-elevated border border-primary/20">
      <CardHeader className="text-center">
              <div className="mx-auto w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mb-4 animate-pulse-glow">
                <User className="w-12 h-12 text-primary-foreground" />
              </div>
      <CardTitle className="font-orbitron">{profile.fullName}</CardTitle>
      <p className="text-muted-foreground font-jetbrains">@{profile.username}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  <div>
        <p className="text-sm font-medium">{profile.yearOfStudy}</p>
                    <p className="text-xs text-muted-foreground">Computer Science</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
        <p className="text-sm font-medium font-jetbrains">{profile.email}</p>
                    <p className="text-xs text-muted-foreground">Primary email</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
        <p className="text-sm font-medium font-jetbrains">{profile.phone}</p>
                    <p className="text-xs text-muted-foreground">Mobile number</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Projects Participated */}
          <Card className="card-elevated border border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 font-orbitron">
                <FolderKanban className="w-5 h-5 text-primary" />
                <span>Projects Participated</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {profile.projectsParticipated.map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-4 rounded-lg bg-gradient-card border border-border/50 hover:border-primary/30 transition-all">
                    <div>
                      <h3 className="font-medium font-orbitron">{project.name}</h3>
                      <p className="text-sm text-muted-foreground font-jetbrains">{project.role}</p>
                    </div>
                    <Badge variant={project.status === 'Completed' ? 'default' : 'secondary'} className="font-jetbrains">
                      {project.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Events Attended */}
          <Card className="card-elevated border border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 font-orbitron">
                <Calendar className="w-5 h-5 text-primary" />
                <span>Events Attended</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {profile.eventsAttended.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 rounded-lg bg-gradient-card border border-border/50 hover:border-primary/30 transition-all">
                    <div>
                      <h3 className="font-medium font-orbitron">{event.name}</h3>
                      <p className="text-sm text-muted-foreground font-jetbrains">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievements & Badges */}
          <Card className="card-elevated border border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 font-orbitron">
                <Award className="w-5 h-5 text-primary" />
                <span>Achievements & Badges</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.achievements.map((achievement) => (
                  <div key={achievement.id} className="p-4 rounded-lg bg-gradient-accent/10 border border-accent/20 hover:border-accent/40 transition-all animate-pulse-glow">
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div>
                        <h3 className="font-medium font-orbitron">{achievement.name}</h3>
                        <p className="text-sm text-muted-foreground font-jetbrains">{achievement.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;