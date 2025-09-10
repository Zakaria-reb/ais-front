import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
  GraduationCap, 
  Clock, 
  Calendar, 
  User, 
  BookOpen, 
  ExternalLink,
  Github,
  FileText,
  Download,
  Play,
  CheckCircle
} from "lucide-react";

const Trainings = () => {
  // Mock data - replace with real data from Supabase
  const myTrainings = [
    {
      id: 1,
      title: "React Advanced Patterns",
      progress: 75,
      totalLessons: 12,
      completedLessons: 9,
      nextLesson: "Custom Hooks Deep Dive",
      instructor: "Sarah Chen",
      estimatedTimeLeft: "2.5 hours"
    },
    {
      id: 2,
      title: "Python Data Science",
      progress: 100,
      totalLessons: 16,
      completedLessons: 16,
      nextLesson: "Completed",
      instructor: "Dr. Ahmed Rahman",
      estimatedTimeLeft: "Completed"
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      progress: 40,
      totalLessons: 10,
      completedLessons: 4,
      nextLesson: "Color Theory & Typography",
      instructor: "Emily Rodriguez",
      estimatedTimeLeft: "4 hours"
    }
  ];

  const availableTrainings = [
    {
      id: 4,
      title: "Machine Learning with TensorFlow",
      description: "Comprehensive course covering neural networks, deep learning, and practical ML applications.",
      instructor: "Dr. Michael Chang",
      duration: "6 weeks",
      startDate: "March 15, 2024",
      level: "Intermediate",
      enrolledCount: 24,
      maxStudents: 30
    },
    {
      id: 5,
      title: "Full Stack Web Development",
      description: "Build modern web applications with React, Node.js, MongoDB, and deploy to cloud platforms.",
      instructor: "Alex Thompson",
      duration: "8 weeks",
      startDate: "March 20, 2024",
      level: "Beginner",
      enrolledCount: 18,
      maxStudents: 25
    },
    {
      id: 6,
      title: "DevOps & Cloud Computing",
      description: "Learn Docker, Kubernetes, AWS, and CI/CD pipelines for modern software deployment.",
      instructor: "Jennifer Liu",
      duration: "4 weeks",
      startDate: "March 25, 2024",
      level: "Advanced",
      enrolledCount: 12,
      maxStudents: 20
    }
  ];

  const resources = [
    {
      id: 1,
      title: "JavaScript ES6+ Cheat Sheet",
      type: "PDF",
      category: "Programming",
      downloadUrl: "#",
      description: "Quick reference for modern JavaScript features"
    },
    {
      id: 2,
      title: "React Component Library",
      type: "GitHub",
      category: "Frontend",
      downloadUrl: "#",
      description: "Reusable React components and hooks"
    },
    {
      id: 3,
      title: "Python Algorithm Templates",
      type: "Code",
      category: "Data Structures",
      downloadUrl: "#",
      description: "Common algorithm implementations in Python"
    },
    {
      id: 4,
      title: "Design System Guidelines",
      type: "PDF",
      category: "Design",
      downloadUrl: "#",
      description: "Complete guide to building design systems"
    },
    {
      id: 5,
      title: "API Security Best Practices",
      type: "External",
      category: "Security",
      downloadUrl: "#",
      description: "OWASP security guidelines for APIs"
    }
  ];

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'PDF': return <FileText className="w-5 h-5 text-destructive" />;
      case 'GitHub': return <Github className="w-5 h-5 text-foreground" />;
      case 'Code': return <BookOpen className="w-5 h-5 text-primary" />;
      case 'External': return <ExternalLink className="w-5 h-5 text-accent" />;
      default: return <FileText className="w-5 h-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold font-orbitron bg-gradient-primary bg-clip-text text-transparent">
          Trainings & Resources
        </h1>
        <p className="text-muted-foreground font-jetbrains">
          Enhance your skills with our curated learning paths and resources
        </p>
      </div>

      <Tabs defaultValue="my-trainings" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-muted/50 font-jetbrains">
          <TabsTrigger value="my-trainings">My Trainings</TabsTrigger>
          <TabsTrigger value="available">Available Trainings</TabsTrigger>
          <TabsTrigger value="resources">Resource Library</TabsTrigger>
        </TabsList>

        {/* My Trainings */}
        <TabsContent value="my-trainings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {myTrainings.map((training) => (
              <Card key={training.id} className="card-elevated border border-primary/20 hover:border-primary/40 transition-all">
                <CardHeader>
                  <CardTitle className="font-orbitron text-lg">{training.title}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground font-jetbrains">{training.instructor}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-jetbrains">
                      <span>Progress</span>
                      <span>{training.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-primary h-2 rounded-full transition-all duration-500 animate-pulse-glow" 
                        style={{ width: `${training.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground font-jetbrains">
                      <span>{training.completedLessons}/{training.totalLessons} lessons</span>
                      <span>{training.estimatedTimeLeft}</span>
                    </div>
                  </div>

                  {training.progress < 100 ? (
                    <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                      <p className="text-sm font-medium font-jetbrains">Next: {training.nextLesson}</p>
                    </div>
                  ) : (
                    <div className="p-3 rounded-lg bg-success/10 border border-success/20 flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <span className="text-sm font-medium text-success font-jetbrains">Completed!</span>
                    </div>
                  )}

                  <Button 
                    className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 font-jetbrains"
                    disabled={training.progress === 100}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {training.progress === 100 ? 'Review Course' : 'Continue Learning'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Available Trainings */}
        <TabsContent value="available" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {availableTrainings.map((training) => (
              <Card key={training.id} className="card-elevated border border-primary/20 hover:border-primary/40 transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="font-orbitron text-xl">{training.title}</CardTitle>
                      <Badge variant="outline" className="mt-2 font-jetbrains">
                        {training.level}
                      </Badge>
                    </div>
                    <div className="text-right text-sm text-muted-foreground font-jetbrains">
                      <div>{training.enrolledCount}/{training.maxStudents} enrolled</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground font-jetbrains">{training.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-primary" />
                      <span className="font-jetbrains">{training.instructor}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="font-jetbrains">{training.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 col-span-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="font-jetbrains">Starts {training.startDate}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-gradient-accent text-accent-foreground hover:opacity-90 font-jetbrains"
                    disabled={training.enrolledCount >= training.maxStudents}
                  >
                    <GraduationCap className="w-4 h-4 mr-2" />
                    {training.enrolledCount >= training.maxStudents ? 'Full' : 'Enroll Now'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Resource Library */}
        <TabsContent value="resources" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resources.map((resource) => (
              <Card key={resource.id} className="card-elevated border border-primary/20 hover:border-primary/40 transition-all group">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 rounded-lg bg-muted/50 group-hover:bg-muted transition-colors">
                      {getResourceIcon(resource.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium font-orbitron truncate">{resource.title}</h3>
                      <Badge variant="secondary" className="mt-1 text-xs font-jetbrains">
                        {resource.category}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-2 font-jetbrains line-clamp-2">
                        {resource.description}
                      </p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="mt-3 p-0 h-auto font-jetbrains text-primary hover:text-primary-dark"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        {resource.type === 'External' ? 'Visit' : 'Download'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Trainings;