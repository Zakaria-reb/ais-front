import { useState } from "react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Checkbox } from "../components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import ProjectCard from "../components/ProjectCard";
import { 
  Plus, 
  Filter, 
  Search,
  CheckCircle2,
  Clock,
  MessageSquare,
  FileText,
  Users
} from "lucide-react";

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data - replace with real data from Supabase
  const availableProjects = [
    {
      id: "1",
      name: "AI Study Assistant",
      description: "Building an AI-powered study assistant to help students organize notes and create study plans.",
      status: "open" as const,
      memberCount: 3,
      dueDate: "Dec 15, 2024",
      members: [
        { id: "1", name: "Alice Johnson", initials: "AJ" },
        { id: "2", name: "Bob Smith", initials: "BS" },
        { id: "3", name: "Carol Davis", initials: "CD" }
      ]
    },
    {
      id: "2", 
      name: "Campus Event App",
      description: "Mobile app for discovering and managing campus events with real-time updates and social features.",
      status: "ongoing" as const,
      memberCount: 5,
      dueDate: "Jan 30, 2025",
      members: [
        { id: "4", name: "David Wilson", initials: "DW" },
        { id: "5", name: "Eva Martinez", initials: "EM" },
        { id: "6", name: "Frank Brown", initials: "FB" },
        { id: "7", name: "Grace Lee", initials: "GL" },
        { id: "8", name: "Henry Taylor", initials: "HT" }
      ]
    },
    {
      id: "3",
      name: "Sustainability Tracker",
      description: "Web platform to track and gamify sustainable practices across campus dormitories.",
      status: "closed" as const,
      memberCount: 8,
      members: [
        { id: "9", name: "Ivy Chen", initials: "IC" },
        { id: "10", name: "Jack Kumar", initials: "JK" }
      ]
    }
  ];

  const myProjects = [
    {
      id: "mp1",
      name: "Web Development Portfolio",
      tasks: [
        { id: "t1", title: "Design homepage layout", isDone: true },
        { id: "t2", title: "Implement responsive navigation", isDone: true },
        { id: "t3", title: "Create project showcase section", isDone: false },
        { id: "t4", title: "Add contact form", isDone: false },
        { id: "t5", title: "Optimize for mobile", isDone: false }
      ],
      progress: 40,
      teamMembers: 4,
      lastActivity: "2 hours ago"
    },
    {
      id: "mp2",
      name: "Machine Learning Workshop",
      tasks: [
        { id: "t6", title: "Prepare dataset examples", isDone: true },
        { id: "t7", title: "Create presentation slides", isDone: true },
        { id: "t8", title: "Set up Jupyter environment", isDone: true },
        { id: "t9", title: "Practice demo session", isDone: false }
      ],
      progress: 75,
      teamMembers: 2,
      lastActivity: "1 day ago"
    }
  ];

  const recentMessages = [
    { id: 1, user: "Sarah K.", message: "Updated the API documentation", time: "5m ago", project: "Web Development Portfolio" },
    { id: 2, user: "Mike R.", message: "Ready for code review", time: "1h ago", project: "Machine Learning Workshop" },
    { id: 3, user: "Lisa M.", message: "Meeting notes uploaded", time: "3h ago", project: "Web Development Portfolio" }
  ];

  const sharedFiles = [
    { id: 1, name: "project_requirements.pdf", size: "2.4 MB", uploadedBy: "Sarah K.", uploadedAt: "2 days ago" },
    { id: 2, name: "wireframes_v2.fig", size: "15.8 MB", uploadedBy: "Mike R.", uploadedAt: "1 week ago" },
    { id: 3, name: "database_schema.sql", size: "8.2 KB", uploadedBy: "Lisa M.", uploadedAt: "3 days ago" }
  ];

  const filteredProjects = availableProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleJoinProject = (projectId: string) => {
    console.log("Joining project:", projectId);
    // TODO: Implement join project logic with Supabase
  };

  const handleViewDetails = (projectId: string) => {
    console.log("Viewing project details:", projectId);
    // TODO: Navigate to project details page
  };

  const toggleTask = (projectId: string, taskId: string) => {
    console.log("Toggling task:", taskId, "in project:", projectId);
    // TODO: Implement task toggle with Supabase
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground">Discover projects and manage your contributions</p>
        </div>
        <Button className="btn-gradient hover:scale-105 transition-transform">
          <Plus className="w-4 h-4 mr-2" />
          Create Project
        </Button>
      </div>

      <Tabs defaultValue="available" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="available" className="flex items-center space-x-2">
            <Search className="w-4 h-4" />
            <span>Available Projects</span>
          </TabsTrigger>
          <TabsTrigger value="my-projects" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>My Projects</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="ongoing">Ongoing</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                {...project}
                onJoin={handleJoinProject}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-projects" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* My Projects Section */}
            <div className="lg:col-span-2 space-y-6">
              {myProjects.map((project) => (
                <div key={project.id} className="card-elevated p-6 rounded-xl border border-border/50">
                  <div className="space-y-4">
                    {/* Project Header */}
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{project.teamMembers}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{project.lastActivity}</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Tasks */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-foreground">Tasks</h4>
                      <div className="space-y-2">
                        {project.tasks.map((task) => (
                          <div key={task.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                            <Checkbox
                              checked={task.isDone}
                              onCheckedChange={() => toggleTask(project.id, task.id)}
                              className="data-[state=checked]:bg-gradient-primary"
                            />
                            <span className={`flex-1 text-sm ${task.isDone ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                              {task.title}
                            </span>
                            {task.isDone && (
                              <CheckCircle2 className="w-4 h-4 text-success" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Team Chat */}
              <div className="card-elevated p-4 rounded-xl border border-border/50">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    <h4 className="font-medium text-foreground">Recent Messages</h4>
                  </div>
                  <div className="space-y-3">
                    {recentMessages.map((message) => (
                      <div key={message.id} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-foreground">{message.user}</span>
                          <span className="text-xs text-muted-foreground">{message.time}</span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">{message.message}</p>
                        <Badge variant="secondary" className="text-xs">{message.project}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Shared Files */}
              <div className="card-elevated p-4 rounded-xl border border-border/50">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-primary" />
                    <h4 className="font-medium text-foreground">Shared Files</h4>
                  </div>
                  <div className="space-y-3">
                    {sharedFiles.map((file) => (
                      <div key={file.id} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-foreground truncate">{file.name}</span>
                          <span className="text-xs text-muted-foreground">{file.size}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          by {file.uploadedBy} • {file.uploadedAt}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Projects;