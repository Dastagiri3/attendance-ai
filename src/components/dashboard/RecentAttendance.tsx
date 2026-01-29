import { AttendanceRecord } from '@/types';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, XCircle, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecentAttendanceProps {
  records: AttendanceRecord[];
}

const statusConfig = {
  present: {
    icon: CheckCircle2,
    label: 'Present',
    className: 'bg-success/10 text-success border-success/20',
  },
  late: {
    icon: Clock,
    label: 'Late',
    className: 'bg-warning/10 text-warning border-warning/20',
  },
  absent: {
    icon: XCircle,
    label: 'Absent',
    className: 'bg-destructive/10 text-destructive border-destructive/20',
  },
};

export function RecentAttendance({ records }: RecentAttendanceProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Today's Attendance</h3>
      <div className="space-y-3">
        {records.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No attendance records for today
          </p>
        ) : (
          records.slice(0, 5).map((record) => {
            const status = statusConfig[record.status];
            const StatusIcon = status.icon;
            return (
              <div
                key={record.id}
                className="flex items-center justify-between rounded-lg bg-muted/50 p-3 transition-colors hover:bg-muted"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{record.studentName}</p>
                    <p className="text-sm text-muted-foreground">
                      {record.rollNumber} • {record.department}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">{record.time}</span>
                  <Badge variant="outline" className={cn('gap-1', status.className)}>
                    <StatusIcon className="h-3 w-3" />
                    {status.label}
                  </Badge>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
