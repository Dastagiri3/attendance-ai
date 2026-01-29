import { MainLayout } from '@/components/layout/MainLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentAttendance } from '@/components/dashboard/RecentAttendance';
import { useStudents } from '@/hooks/useStudents';
import { useAttendance } from '@/hooks/useAttendance';
import { Users, UserCheck, UserX, TrendingUp, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { students } = useStudents();
  const { getTodayRecords, getAttendanceStats } = useAttendance();
  
  const stats = getAttendanceStats(students.length);
  const todayRecords = getTodayRecords();

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back! Here's today's attendance overview.
            </p>
          </div>
          <Link to="/mark-attendance">
            <Button size="lg" className="gap-2 shadow-lg">
              <Camera className="h-5 w-5" />
              Mark Attendance
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Students"
            value={stats.totalStudents}
            icon={<Users className="h-6 w-6" />}
            variant="primary"
          />
          <StatCard
            title="Present Today"
            value={stats.presentToday}
            subtitle={`${Math.round((stats.presentToday / Math.max(stats.totalStudents, 1)) * 100)}% attendance`}
            icon={<UserCheck className="h-6 w-6" />}
            variant="success"
          />
          <StatCard
            title="Absent Today"
            value={stats.absentToday}
            icon={<UserX className="h-6 w-6" />}
            variant="destructive"
          />
          <StatCard
            title="Avg. Attendance"
            value={`${stats.averageAttendance}%`}
            subtitle="Last 30 days"
            icon={<TrendingUp className="h-6 w-6" />}
            trend={{ value: 5, isPositive: true }}
            variant="default"
          />
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <RecentAttendance records={todayRecords} />
          
          {/* Quick Actions */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/mark-attendance" className="block">
                <div className="rounded-xl border border-border bg-muted/50 p-4 text-center transition-all hover:bg-accent hover:border-primary/30 cursor-pointer">
                  <Camera className="h-8 w-8 mx-auto text-primary mb-2" />
                  <p className="font-medium text-foreground">Mark Attendance</p>
                  <p className="text-sm text-muted-foreground">Scan face to verify</p>
                </div>
              </Link>
              <Link to="/register" className="block">
                <div className="rounded-xl border border-border bg-muted/50 p-4 text-center transition-all hover:bg-accent hover:border-primary/30 cursor-pointer">
                  <Users className="h-8 w-8 mx-auto text-primary mb-2" />
                  <p className="font-medium text-foreground">Add Student</p>
                  <p className="text-sm text-muted-foreground">Register new face</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
