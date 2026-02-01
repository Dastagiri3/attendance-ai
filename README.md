# ACET Face Recognition Attendance System

## Audisankara College of Engineering and Technology
### Smart Attendance Management System

Project Live Demo Link: https://attendance-ai-sauu.vercel.app

---

## 📋 Project Overview

The **ACET Face Recognition Attendance System** is a modern web-based application designed to automate and streamline the student attendance process at Audisankara College of Engineering and Technology. The system utilizes facial recognition technology to verify student identity and mark attendance, eliminating manual processes and reducing errors.

### Key Objectives
- Automate daily student attendance tracking
- Reduce time spent on manual attendance
- Provide accurate attendance records
- Generate comprehensive attendance reports
- Enable real-time monitoring of student presence

---

## ✨ Features

### 1. Dashboard
- Real-time attendance statistics
- Total students enrolled
- Present/Absent count for the day
- Average attendance percentage (30-day rolling)
- Recent attendance activity feed
- Quick action shortcuts

### 2. Face Recognition Attendance
- Live webcam integration
- Real-time face detection
- Automated student identification
- Instant attendance marking
- Visual feedback during scanning

### 3. Student Management
- Student registration with face capture
- Comprehensive student profiles
- Search and filter capabilities
- Department-wise organization
- Edit and delete functionality

### 4. Attendance Records
- Complete attendance history
- Date-based filtering
- Department-wise filtering
- Status filtering (Present/Absent/Late)
- CSV export functionality
- Sortable data tables

### 5. Student Registration
- Multi-field registration form
- Live webcam face capture
- Validation and error handling
- Duplicate prevention

---

## 🛠️ Technology Stack

### Frontend Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3.1 | UI Library |
| TypeScript | 5.x | Type Safety |
| Vite | 5.x | Build Tool |

### Styling & UI
| Technology | Purpose |
|------------|---------|
| Tailwind CSS | Utility-first CSS framework |
| shadcn/ui | Pre-built accessible components |
| Lucide React | Icon library |

### State Management & Routing
| Technology | Purpose |
|------------|---------|
| React Router DOM | Client-side routing |
| TanStack Query | Server state management |
| React Hook Form | Form handling |
| Zod | Schema validation |

### Additional Libraries
| Library | Purpose |
|---------|---------|
| date-fns | Date manipulation |
| Recharts | Data visualization |
| Sonner | Toast notifications |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── attendance/
│   │   └── WebcamCapture.tsx      # Webcam integration component
│   ├── dashboard/
│   │   ├── StatCard.tsx           # Statistics display cards
│   │   └── RecentAttendance.tsx   # Recent activity list
│   ├── layout/
│   │   ├── MainLayout.tsx         # Page layout wrapper
│   │   └── Sidebar.tsx            # Navigation sidebar
│   ├── students/
│   │   └── StudentCard.tsx        # Student profile card
│   └── ui/                        # Reusable UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── select.tsx
│       ├── table.tsx
│       └── ... (40+ components)
├── data/
│   └── mockData.ts                # Sample data for demo
├── hooks/
│   ├── useStudents.ts             # Student management hook
│   ├── useAttendance.ts           # Attendance management hook
│   └── use-toast.ts               # Toast notifications
├── pages/
│   ├── Index.tsx                  # Dashboard (home page)
│   ├── MarkAttendance.tsx         # Attendance marking page
│   ├── Students.tsx               # Student directory
│   ├── RegisterStudent.tsx        # New student registration
│   ├── AttendanceRecords.tsx      # Attendance history
│   └── NotFound.tsx               # 404 error page
├── types/
│   └── index.ts                   # TypeScript interfaces
├── lib/
│   └── utils.ts                   # Utility functions
├── App.tsx                        # Main application component
├── main.tsx                       # Application entry point
└── index.css                      # Global styles
```

---

## 📊 Data Models

### Student Interface
```typescript
interface Student {
  id: string;
  name: string;
  rollNumber: string;
  department: string;
  semester: number;
  email: string;
  phone: string;
  faceImage: string;      // Base64 encoded face image
  registeredAt: Date;
}
```

### Attendance Record Interface
```typescript
interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  department: string;
  date: Date;
  time: string;
  status: 'present' | 'absent' | 'late';
  verificationMethod: 'face' | 'manual';
}
```

### Dashboard Statistics Interface
```typescript
interface DashboardStats {
  totalStudents: number;
  presentToday: number;
  absentToday: number;
  averageAttendance: number;
}
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or bun package manager
- Modern web browser with webcam support

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd acet-attendance-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production
```bash
npm run build
# or
bun run build
```

---

## 📖 User Guide

### Registering a New Student

1. Navigate to **Register Student** from the sidebar
2. Fill in student details:
   - Full Name
   - Roll Number
   - Department (select from dropdown)
   - Semester
   - Email Address
   - Phone Number
3. Click **Start Camera** to activate webcam
4. Position face within the frame
5. Click **Capture Face** to take photo
6. Click **Register Student** to complete

### Marking Attendance

1. Navigate to **Mark Attendance** from the sidebar
2. Click **Start Camera** to begin scanning
3. System will automatically detect faces
4. When face is detected, click **Verify & Mark**
5. System confirms attendance with toast notification

### Viewing Attendance Records

1. Navigate to **Attendance Records** from the sidebar
2. Use date picker to filter by date
3. Use department dropdown to filter by department
4. Use status dropdown to filter by attendance status
5. Click **Export CSV** to download records

### Viewing Student Directory

1. Navigate to **Students** from the sidebar
2. Use search bar to find specific students
3. Browse student cards with profile information
4. View individual attendance history

---

## 🔧 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                        │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐   │
│  │  Dashboard  │ │  Students   │ │ Attendance Records  │   │
│  └─────────────┘ └─────────────┘ └─────────────────────┘   │
│  ┌─────────────┐ ┌─────────────┐                           │
│  │  Register   │ │    Mark     │                           │
│  │  Student    │ │  Attendance │                           │
│  └─────────────┘ └─────────────┘                           │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    COMPONENT LAYER                           │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────────┐    │
│  │ WebcamCapture│ │   StatCard   │ │ RecentAttendance │    │
│  └──────────────┘ └──────────────┘ └──────────────────┘    │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────────┐    │
│  │  StudentCard │ │   Sidebar    │ │    MainLayout    │    │
│  └──────────────┘ └──────────────┘ └──────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     HOOKS LAYER                              │
│  ┌────────────────────┐    ┌─────────────────────────┐     │
│  │    useStudents     │    │     useAttendance       │     │
│  │  - addStudent      │    │  - markAttendance       │     │
│  │  - updateStudent   │    │  - getTodayRecords      │     │
│  │  - deleteStudent   │    │  - getRecordsByDate     │     │
│  │  - getStudentById  │    │  - getAttendanceStats   │     │
│  └────────────────────┘    └─────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     DATA LAYER                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              localStorage (Browser)                  │   │
│  │  - students: Student[]                              │   │
│  │  - attendanceRecords: AttendanceRecord[]            │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔮 Future Enhancements

### Phase 1 - Backend Integration
- [ ] Connect to cloud database (Lovable Cloud/Supabase)
- [ ] User authentication and authorization
- [ ] Role-based access control (Admin, Faculty, Student)

### Phase 2 - Advanced Face Recognition
- [ ] Integrate TensorFlow.js for real face recognition
- [ ] Face encoding and matching algorithms
- [ ] Anti-spoofing measures (liveness detection)

### Phase 3 - Analytics & Reporting
- [ ] Department-wise attendance charts
- [ ] Weekly/Monthly trend analysis
- [ ] Automated report generation
- [ ] Email notifications for low attendance

### Phase 4 - Mobile Support
- [ ] Progressive Web App (PWA) support
- [ ] Mobile-responsive design optimization
- [ ] Native mobile app development

---

## 👨‍💻 Development Team

**Institution:** Audisankara College of Engineering and Technology

**Department:** Electronics and communication Engineering

**Project Type:** Academic Project / Final Year Project

---

## 📄 License

This project is developed for educational purposes at Audisankara College of Engineering and Technology.

---

## 🙏 Acknowledgments

- Audisankara College of Engineering and Technology
- Department of Computer Science
- Faculty Advisors and Mentors
- Open Source Community

---

## 📞 Contact

**Institution:** Audisankara College of Engineering and Technology

**Website:** [www.acet.edu.in](http://www.acet.edu.in)

---

*Last Updated: January 2026*

*Version: 1.0.0*
