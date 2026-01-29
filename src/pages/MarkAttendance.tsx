import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { WebcamCapture } from '@/components/attendance/WebcamCapture';
import { useStudents } from '@/hooks/useStudents';
import { useAttendance } from '@/hooks/useAttendance';
import { CheckCircle2, User, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function MarkAttendance() {
  const { students } = useStudents();
  const { markAttendance } = useAttendance();
  const [verifiedStudent, setVerifiedStudent] = useState<typeof students[0] | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCapture = async (imageData: string) => {
    setIsProcessing(true);
    
    // Simulate face recognition processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // For demo: randomly match a student
    const randomStudent = students[Math.floor(Math.random() * students.length)];
    
    if (randomStudent) {
      setVerifiedStudent(randomStudent);
      
      const now = new Date();
      const hours = now.getHours();
      const isLate = hours >= 9 && hours < 10;
      
      const result = markAttendance({
        studentId: randomStudent.id,
        studentName: randomStudent.name,
        rollNumber: randomStudent.rollNumber,
        department: randomStudent.department,
        date: now,
        time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        status: isLate ? 'late' : 'present',
        verificationMethod: 'face',
      });

      if (result.success) {
        toast.success(`Attendance marked for ${randomStudent.name}`, {
          description: `Status: ${isLate ? 'Late' : 'Present'}`,
        });
      } else {
        toast.warning(result.message);
      }
    } else {
      toast.error('No students registered. Please register students first.');
    }
    
    setIsProcessing(false);
  };

  const handleReset = () => {
    setVerifiedStudent(null);
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mark Attendance</h1>
          <p className="text-muted-foreground mt-1">
            Position your face within the frame for automatic recognition
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Camera Section */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <WebcamCapture onCapture={handleCapture} mode="verify" />
              
              {isProcessing && (
                <div className="mt-6 flex items-center justify-center gap-2 text-primary">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  <span className="font-medium">Processing face recognition...</span>
                </div>
              )}
            </div>
          </div>

          {/* Result Section */}
          <div className="space-y-6">
            {verifiedStudent ? (
              <div className="rounded-xl border border-success/30 bg-success/5 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="h-8 w-8 text-success" />
                  <h3 className="text-lg font-semibold text-success">Verified!</h3>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{verifiedStudent.name}</p>
                    <p className="text-sm text-muted-foreground">{verifiedStudent.rollNumber}</p>
                    <p className="text-sm text-muted-foreground">{verifiedStudent.department}</p>
                  </div>
                </div>
                <Button onClick={handleReset} className="w-full">
                  Mark Another Student
                </Button>
              </div>
            ) : (
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="h-6 w-6 text-warning" />
                  <h3 className="font-semibold text-foreground">Instructions</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">1.</span>
                    Click "Start Camera" to begin
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">2.</span>
                    Position your face within the frame
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">3.</span>
                    Wait for "Face Detected" indicator
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">4.</span>
                    Click "Verify & Mark" to record attendance
                  </li>
                </ul>
              </div>
            )}

            {/* Today's Stats */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-semibold text-foreground mb-3">Today's Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Students</span>
                  <span className="font-medium text-foreground">{students.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current Time</span>
                  <span className="font-medium text-foreground">
                    {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
