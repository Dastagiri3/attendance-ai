import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileDown, BookOpen, Code, Database, Users, Camera, ClipboardList } from 'lucide-react';
import { jsPDF } from 'jspdf';
import logo from '@/assets/audisankara-logo.png';

export default function Documentation() {
  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let y = 20;

    // Helper function to add text with word wrap
    const addWrappedText = (text: string, x: number, startY: number, maxWidth: number, lineHeight: number = 7) => {
      const lines = doc.splitTextToSize(text, maxWidth);
      doc.text(lines, x, startY);
      return startY + lines.length * lineHeight;
    };

    // Helper to check page break
    const checkPageBreak = (neededSpace: number) => {
      if (y + neededSpace > 280) {
        doc.addPage();
        y = 20;
      }
    };

    // Title
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 64, 175);
    doc.text('ACET Face Recognition Attendance System', pageWidth / 2, y, { align: 'center' });
    y += 12;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('Audisankara College of Engineering and Technology', pageWidth / 2, y, { align: 'center' });
    y += 8;
    doc.text('Smart Attendance Management System', pageWidth / 2, y, { align: 'center' });
    y += 15;

    // Horizontal line
    doc.setDrawColor(30, 64, 175);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 15;

    // Project Overview
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 64, 175);
    doc.text('1. Project Overview', margin, y);
    y += 10;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    const overview = 'The ACET Face Recognition Attendance System is a modern web-based application designed to automate and streamline the student attendance process at Audisankara College of Engineering and Technology. The system utilizes facial recognition technology to verify student identity and mark attendance, eliminating manual processes and reducing errors.';
    y = addWrappedText(overview, margin, y, pageWidth - 2 * margin);
    y += 10;

    // Key Objectives
    checkPageBreak(40);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 64, 175);
    doc.text('Key Objectives:', margin, y);
    y += 8;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    const objectives = [
      '• Automate daily student attendance tracking',
      '• Reduce time spent on manual attendance',
      '• Provide accurate attendance records',
      '• Generate comprehensive attendance reports',
      '• Enable real-time monitoring of student presence'
    ];
    objectives.forEach((obj) => {
      doc.text(obj, margin + 5, y);
      y += 7;
    });
    y += 10;

    // Features
    checkPageBreak(60);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 64, 175);
    doc.text('2. Features', margin, y);
    y += 10;

    const features = [
      { title: 'Dashboard', desc: 'Real-time attendance statistics, present/absent counts, average attendance, and quick action shortcuts.' },
      { title: 'Face Recognition Attendance', desc: 'Live webcam integration with real-time face detection and automated student identification.' },
      { title: 'Student Management', desc: 'Student registration with face capture, comprehensive profiles, search and filter capabilities.' },
      { title: 'Attendance Records', desc: 'Complete attendance history with date/department filtering and CSV export functionality.' },
      { title: 'Student Registration', desc: 'Multi-field registration form with live webcam face capture and validation.' }
    ];

    features.forEach((feature) => {
      checkPageBreak(20);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(50, 50, 50);
      doc.text(`• ${feature.title}`, margin + 5, y);
      y += 6;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      y = addWrappedText(feature.desc, margin + 10, y, pageWidth - 2 * margin - 10, 5);
      y += 5;
    });
    y += 10;

    // Technology Stack
    checkPageBreak(80);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 64, 175);
    doc.text('3. Technology Stack', margin, y);
    y += 10;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);

    const techStack = [
      'Frontend: React 18.3.1, TypeScript, Vite',
      'Styling: Tailwind CSS, shadcn/ui components',
      'Routing: React Router DOM',
      'State Management: TanStack Query, React Hook Form',
      'Icons: Lucide React',
      'Date Handling: date-fns',
      'Charts: Recharts',
      'PDF Generation: jsPDF'
    ];

    techStack.forEach((tech) => {
      doc.text(`• ${tech}`, margin + 5, y);
      y += 7;
    });
    y += 10;

    // Data Models
    checkPageBreak(60);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 64, 175);
    doc.text('4. Data Models', margin, y);
    y += 10;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(50, 50, 50);
    doc.text('Student Interface:', margin + 5, y);
    y += 7;

    doc.setFontSize(10);
    doc.setFont('courier', 'normal');
    const studentFields = ['id, name, rollNumber, department,', 'semester, email, phone, faceImage, registeredAt'];
    studentFields.forEach((field) => {
      doc.text(field, margin + 10, y);
      y += 5;
    });
    y += 5;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('AttendanceRecord Interface:', margin + 5, y);
    y += 7;

    doc.setFontSize(10);
    doc.setFont('courier', 'normal');
    const attendanceFields = ['id, studentId, studentName, rollNumber,', 'department, date, time, status, verificationMethod'];
    attendanceFields.forEach((field) => {
      doc.text(field, margin + 10, y);
      y += 5;
    });
    y += 10;

    // System Architecture
    checkPageBreak(50);
    doc.addPage();
    y = 20;

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 64, 175);
    doc.text('5. System Architecture', margin, y);
    y += 12;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);

    const archLayers = [
      { layer: 'Presentation Layer', components: 'Dashboard, Students, Attendance Records, Register, Mark Attendance' },
      { layer: 'Component Layer', components: 'WebcamCapture, StatCard, RecentAttendance, StudentCard, Sidebar, MainLayout' },
      { layer: 'Hooks Layer', components: 'useStudents (CRUD operations), useAttendance (attendance management)' },
      { layer: 'Data Layer', components: 'localStorage for persistence (students, attendanceRecords)' }
    ];

    archLayers.forEach((arch) => {
      doc.setFont('helvetica', 'bold');
      doc.text(`${arch.layer}:`, margin + 5, y);
      y += 6;
      doc.setFont('helvetica', 'normal');
      y = addWrappedText(arch.components, margin + 10, y, pageWidth - 2 * margin - 10, 5);
      y += 8;
    });
    y += 10;

    // Installation
    checkPageBreak(60);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 64, 175);
    doc.text('6. Installation & Setup', margin, y);
    y += 10;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);

    const installSteps = [
      '1. Prerequisites: Node.js (v18+), npm or bun, modern browser with webcam',
      '2. Clone repository: git clone <repository-url>',
      '3. Install dependencies: npm install (or bun install)',
      '4. Start development server: npm run dev',
      '5. Open browser: http://localhost:5173',
      '6. Build for production: npm run build'
    ];

    installSteps.forEach((step) => {
      y = addWrappedText(step, margin + 5, y, pageWidth - 2 * margin - 5, 6);
      y += 4;
    });
    y += 10;

    // Future Enhancements
    checkPageBreak(60);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 64, 175);
    doc.text('7. Future Enhancements', margin, y);
    y += 10;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);

    const enhancements = [
      'Phase 1: Cloud database integration, user authentication, role-based access',
      'Phase 2: TensorFlow.js face recognition, anti-spoofing measures',
      'Phase 3: Department-wise charts, automated reports, email notifications',
      'Phase 4: Progressive Web App (PWA), mobile optimization'
    ];

    enhancements.forEach((enh) => {
      y = addWrappedText(`• ${enh}`, margin + 5, y, pageWidth - 2 * margin - 5, 6);
      y += 4;
    });
    y += 15;

    // Footer
    doc.setDrawColor(30, 64, 175);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100, 100, 100);
    doc.text('Audisankara College of Engineering and Technology', pageWidth / 2, y, { align: 'center' });
    y += 6;
    doc.text('Department of Computer Science and Engineering', pageWidth / 2, y, { align: 'center' });
    y += 6;
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, y, { align: 'center' });

    // Save
    doc.save('ACET_Attendance_System_Documentation.pdf');
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logo} alt="ACET Logo" className="h-16 w-auto" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Project Documentation</h1>
              <p className="text-muted-foreground mt-1">
                ACET Face Recognition Attendance System
              </p>
            </div>
          </div>
          <Button size="lg" onClick={generatePDF} className="gap-2 shadow-lg">
            <FileDown className="h-5 w-5" />
            Download PDF
          </Button>
        </div>

        {/* Documentation Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Project Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                The ACET Face Recognition Attendance System is a modern web-based application 
                designed to automate student attendance at Audisankara College of Engineering 
                and Technology.
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Automate daily student attendance tracking</li>
                <li>Reduce time spent on manual attendance</li>
                <li>Provide accurate attendance records</li>
                <li>Generate comprehensive reports</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                Technology Stack
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-muted rounded-lg p-2 text-center">React 18</div>
                <div className="bg-muted rounded-lg p-2 text-center">TypeScript</div>
                <div className="bg-muted rounded-lg p-2 text-center">Tailwind CSS</div>
                <div className="bg-muted rounded-lg p-2 text-center">Vite</div>
                <div className="bg-muted rounded-lg p-2 text-center">React Router</div>
                <div className="bg-muted rounded-lg p-2 text-center">shadcn/ui</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-primary" />
                Key Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-success" />
                  Face Recognition Attendance
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-success" />
                  Real-time Dashboard Statistics
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-success" />
                  Student Management System
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-success" />
                  Attendance Records & Export
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                Data Models
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div>
                <p className="font-medium text-foreground">Student</p>
                <p className="text-xs">id, name, rollNumber, department, semester, email, phone, faceImage</p>
              </div>
              <div>
                <p className="font-medium text-foreground">AttendanceRecord</p>
                <p className="text-xs">id, studentId, studentName, date, time, status, verificationMethod</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-primary" />
              Project Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-primary/5 rounded-xl">
                <p className="text-3xl font-bold text-primary">6</p>
                <p className="text-sm text-muted-foreground">Pages</p>
              </div>
              <div className="text-center p-4 bg-success/5 rounded-xl">
                <p className="text-3xl font-bold text-success">40+</p>
                <p className="text-sm text-muted-foreground">Components</p>
              </div>
              <div className="text-center p-4 bg-warning/5 rounded-xl">
                <p className="text-3xl font-bold text-warning">2</p>
                <p className="text-sm text-muted-foreground">Custom Hooks</p>
              </div>
              <div className="text-center p-4 bg-destructive/5 rounded-xl">
                <p className="text-3xl font-bold text-destructive">5</p>
                <p className="text-sm text-muted-foreground">Core Features</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
