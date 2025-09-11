import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { cn } from "../../lib/utils";
import { Button } from "./ui/button";
import { 
  Home, 
  FolderKanban, 
  Calendar, 
  Users, 
  Bell, 
  Search,
  Menu,
  X,
  GraduationCap
} from "lucide-react";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
  // Use relative paths so these resolve under the /members base route
  { name: 'Home', href: '', icon: Home },
  { name: 'Projects', href: 'projects', icon: FolderKanban },
  { name: 'Calendar', href: 'calendar', icon: Calendar },
  { name: 'Notifications', href: 'notifications', icon: Bell, badge: 3 },
  { name: 'Trainings & Resources', href: 'trainings', icon: GraduationCap },
  { name: 'Member Profile', href: 'profile', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden bg-background/80 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 ease-in-out lg:translate-x-0",
        "before:absolute before:inset-0 before:bg-gradient-to-b before:from-primary/5 before:to-accent/5 before:pointer-events-none",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-sidebar-border relative z-10">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center animate-pulse-glow">
                <FolderKanban className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold font-orbitron bg-gradient-primary bg-clip-text text-transparent">
                App in science
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 relative z-10">
            {navigation.map((item) => {
              const Icon = item.icon;
              // Resolve link: empty href means the members index
              // Always use absolute /members/... paths to avoid routing out of the members area
              const to = item.href === '' ? '/members' : `/members/${item.href}`;
              // Active when the current pathname equals /members (home) or starts with /members/<href>
              const isActive = item.href === ''
                ? location.pathname === '/members' || location.pathname === '/members/'
                : location.pathname.startsWith(`/members/${item.href}`);

              return (
                <Link
                  key={item.name}
                  to={to}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium font-jetbrains transition-all duration-200 relative group",
                    isActive
                      ? "bg-gradient-primary text-primary-foreground shadow-lg animate-pulse-glow"
                      : "text-sidebar-foreground hover:text-primary hover:bg-sidebar-accent/50"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <div className="relative">
                    <Icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", isActive && "animate-pulse")} />
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center animate-pulse-glow">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="relative">
                    {item.name}
                    {isActive && (
                      <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent animate-data-flow"></div>
                    )}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-sidebar-border relative z-10">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-sidebar-accent/50 border border-primary/20 hover:border-primary/40 transition-all group">
              <div className="w-8 h-8 bg-gradient-accent rounded-full flex items-center justify-center animate-pulse-glow">
                <span className="text-xs font-bold font-jetbrains text-accent-foreground">JD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium font-orbitron text-sidebar-foreground truncate group-hover:text-primary transition-colors">John Doe</p>
                <p className="text-xs text-sidebar-foreground/70 font-jetbrains truncate">Computer Science, Y3</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-30 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5"></div>
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 relative z-10">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>

            {/* Search bar */}
            <div className="flex-1 max-w-lg mx-4">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Search projects, members..."
                  className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm font-jetbrains focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:bg-card transition-all"
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"></div>
              </div>
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative group hover:bg-muted/50 transition-all">
              <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full animate-pulse"></span>
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;