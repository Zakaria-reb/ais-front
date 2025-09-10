import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { cn } from "../../lib/utils";
import { Clock, Users, Calendar } from "lucide-react";

interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  status: "open" | "ongoing" | "closed";
  memberCount: number;
  dueDate?: string;
  members: Array<{ id: string; name: string; initials: string }>;
  onJoin?: (projectId: string) => void;
  onViewDetails?: (projectId: string) => void;
  isJoined?: boolean;
}

const ProjectCard = ({
  id,
  name,
  description,
  status,
  memberCount,
  dueDate,
  members,
  onJoin,
  onViewDetails,
  isJoined = false
}: ProjectCardProps) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "open":
        return "status-open";
      case "ongoing":
        return "status-ongoing";
      case "closed":
        return "status-closed";
      default:
        return "status-open";
    }
  };

  return (
    <div className="card-elevated p-6 rounded-xl border border-border/50 hover:border-primary/20 group transition-all duration-300">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {name}
              </h3>
              <Badge className={cn("text-xs", getStatusStyles(status))}>
                {status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          </div>
        </div>

        {/* Project Info */}
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{memberCount} members</span>
          </div>
          {dueDate && (
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{dueDate}</span>
            </div>
          )}
        </div>

        {/* Members Avatars */}
        <div className="flex items-center space-x-2">
          <div className="flex -space-x-2">
            {members.slice(0, 4).map((member) => (
              <Avatar key={member.id} className="w-8 h-8 border-2 border-background">
                <AvatarFallback className="text-xs bg-gradient-accent text-accent-foreground">
                  {member.initials}
                </AvatarFallback>
              </Avatar>
            ))}
            {members.length > 4 && (
              <div className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center">
                <span className="text-xs text-muted-foreground">+{members.length - 4}</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 pt-2">
          {!isJoined && status === "open" && onJoin && (
            <Button
              onClick={() => onJoin(id)}
              className="btn-gradient hover:scale-105 transition-transform"
              size="sm"
            >
              Join Project
            </Button>
          )}
          
          {isJoined && (
            <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
              Joined
            </Badge>
          )}
          
          {onViewDetails && (
            <Button
              onClick={() => onViewDetails(id)}
              variant="outline"
              size="sm"
              className="hover:bg-muted/50"
            >
              View Details
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;