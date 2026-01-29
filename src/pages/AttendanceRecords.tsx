import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useAttendance } from '@/hooks/useAttendance';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CalendarIcon, CheckCircle2, Clock, XCircle, Download, FileSpreadsheet } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

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

export default function AttendanceRecords() {
  const { records, getRecordsByDate } = useAttendance();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const filteredRecords = getRecordsByDate(selectedDate);

  const exportToCSV = () => {
    const headers = ['Roll Number', 'Name', 'Department', 'Date', 'Time', 'Status', 'Method'];
    const rows = filteredRecords.map((r) => [
      r.rollNumber,
      r.studentName,
      r.department,
      format(new Date(r.date), 'yyyy-MM-dd'),
      r.time,
      r.status,
      r.verificationMethod,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance-${format(selectedDate, 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Attendance Records</h1>
            <p className="text-muted-foreground mt-1">
              View and export attendance history
            </p>
          </div>
          <Button onClick={exportToCSV} variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>

        {/* Date Picker */}
        <div className="flex items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-[280px] justify-start text-left font-normal',
                  !selectedDate && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, 'PPP') : 'Pick a date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <p className="text-sm text-muted-foreground">
            {filteredRecords.length} records found
          </p>
        </div>

        {/* Records Table */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          {filteredRecords.length === 0 ? (
            <div className="p-12 text-center">
              <FileSpreadsheet className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No records found</h3>
              <p className="text-muted-foreground">
                No attendance records for {format(selectedDate, 'MMMM d, yyyy')}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Roll Number</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((record) => {
                  const status = statusConfig[record.status];
                  const StatusIcon = status.icon;
                  return (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.rollNumber}</TableCell>
                      <TableCell>{record.studentName}</TableCell>
                      <TableCell>{record.department}</TableCell>
                      <TableCell>{record.time}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn('gap-1', status.className)}>
                          <StatusIcon className="h-3 w-3" />
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="capitalize">
                          {record.verificationMethod}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
