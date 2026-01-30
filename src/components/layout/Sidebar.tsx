import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  Camera, 
  ClipboardList,
  FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';
import logo from '@/assets/audisankara-logo.png';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Camera, label: 'Mark Attendance', path: '/mark-attendance' },
  { icon: Users, label: 'Students', path: '/students' },
  { icon: UserPlus, label: 'Register Student', path: '/register' },
  { icon: ClipboardList, label: 'Attendance Records', path: '/records' },
  { icon: FileText, label: 'Documentation', path: '/documentation' },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-card border-r border-border">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-border">
          <img src={logo} alt="ACET Logo" className="h-12 w-auto" />
          <div>
            <h1 className="text-sm font-bold text-foreground leading-tight">ACET</h1>
            <p className="text-xs text-muted-foreground">Attendance System</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-border px-6 py-4">
          <p className="text-xs text-muted-foreground text-center leading-tight">
            © 2024 Audisankara College of Engineering and Technology
          </p>
        </div>
      </div>
    </aside>
  );
}
