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

## 🌐 IoT Integration Roadmap

> **Project Classification:** IoT-Ready Smart Attendance System

This project is designed as an **IoT-Ready** solution that can be extended with hardware components for full IoT functionality.

### Current Architecture (Web Application + Computer Vision)

| Component | Technology | Status |
|-----------|------------|--------|
| Face Capture | Browser WebRTC API | ✅ Implemented |
| Data Storage | localStorage | ✅ Implemented |
| User Interface | React + Tailwind | ✅ Implemented |
| Face Detection | Simulated | ✅ Demo Ready |

### IoT Enhancement Phases

#### Phase 1 - Cloud Connectivity (IoT Foundation)
- [ ] Connect to Lovable Cloud database for real-time sync
- [ ] Enable multi-device data sharing
- [ ] Add user authentication
- [ ] REST API for IoT device communication

#### Phase 2 - Raspberry Pi Integration
- [ ] Dedicated Raspberry Pi attendance kiosk
- [ ] Pi Camera Module for face capture
- [ ] Python scripts for edge processing
- [ ] GPIO integration for LED/buzzer feedback

#### Phase 3 - Sensor Integration
- [ ] Motion/IR sensors to trigger camera
- [ ] RFID reader for dual verification
- [ ] Temperature sensor for health screening
- [ ] Proximity sensors for queue management

#### Phase 4 - Advanced IoT Features
- [ ] MQTT protocol for device communication
- [ ] Edge computing with TensorFlow Lite
- [ ] Multiple kiosk synchronization
- [ ] Real-time dashboard with WebSocket

---

## 🍓 Raspberry Pi Hardware Setup

### Required Components

| Component | Model | Purpose | Approx. Cost |
|-----------|-------|---------|--------------|
| Raspberry Pi | 4 Model B (4GB) | Main controller | ₹4,500 |
| Camera Module | Pi Camera V2 / USB Webcam | Face capture | ₹1,200 |
| MicroSD Card | 32GB Class 10 | OS & Storage | ₹500 |
| Power Supply | 5V 3A USB-C | Power | ₹400 |
| Display | 7" Touchscreen / HDMI Monitor | Interface | ₹3,000 |
| LED Indicators | Red/Green LEDs | Status feedback | ₹50 |
| Buzzer | Piezo Buzzer | Audio feedback | ₹30 |
| Case | Official Pi Case | Protection | ₹500 |

### Circuit Diagram

```
Raspberry Pi 4 GPIO Pinout for Attendance System
================================================

                    +-----+
       3.3V Power --|  1  |-- 5V Power
       GPIO 2 SDA --|  2  |-- 5V Power
       GPIO 3 SCL --|  3  |-- Ground
          GPIO 4  --|  4  |-- GPIO 14 TXD
            Ground--|  5  |-- GPIO 15 RXD
          GPIO 17 --|  6  |-- GPIO 18 (PWM)
          GPIO 27 --|  7  |-- Ground
          GPIO 22 --|  8  |-- GPIO 23
       3.3V Power --|  9  |-- GPIO 24
         GPIO 10  --| 10  |-- Ground
          GPIO 9  --| 11  |-- GPIO 25
         GPIO 11  --| 12  |-- GPIO 8
            Ground--| 13  |-- GPIO 7
                    +-----+

Connections:
- GPIO 17 → Green LED (Success) + 220Ω Resistor → Ground
- GPIO 27 → Red LED (Error) + 220Ω Resistor → Ground  
- GPIO 22 → Buzzer Positive → Ground
- Pi Camera → CSI Port (Ribbon Cable)
- Display → HDMI / DSI Port
```

### Python Script for Raspberry Pi

```python
# attendance_kiosk.py - Raspberry Pi Attendance System
# Place this script on your Raspberry Pi

import cv2
import requests
import RPi.GPIO as GPIO
import time
from datetime import datetime

# GPIO Setup
GREEN_LED = 17
RED_LED = 27
BUZZER = 22

GPIO.setmode(GPIO.BCM)
GPIO.setup(GREEN_LED, GPIO.OUT)
GPIO.setup(RED_LED, GPIO.OUT)
GPIO.setup(BUZZER, GPIO.OUT)

# API Configuration (Update with your deployed URL)
API_URL = "https://your-app-url.lovable.app/api"

def capture_face():
    """Capture image from Pi Camera"""
    camera = cv2.VideoCapture(0)
    ret, frame = camera.read()
    camera.release()
    if ret:
        _, buffer = cv2.imencode('.jpg', frame)
        return buffer.tobytes()
    return None

def success_feedback():
    """Green LED + Short beep"""
    GPIO.output(GREEN_LED, GPIO.HIGH)
    GPIO.output(BUZZER, GPIO.HIGH)
    time.sleep(0.2)
    GPIO.output(BUZZER, GPIO.LOW)
    time.sleep(0.8)
    GPIO.output(GREEN_LED, GPIO.LOW)

def error_feedback():
    """Red LED + Long beep"""
    GPIO.output(RED_LED, GPIO.HIGH)
    GPIO.output(BUZZER, GPIO.HIGH)
    time.sleep(1)
    GPIO.output(BUZZER, GPIO.LOW)
    GPIO.output(RED_LED, GPIO.LOW)

def mark_attendance(student_id):
    """Send attendance to cloud API"""
    try:
        response = requests.post(f"{API_URL}/attendance", json={
            "studentId": student_id,
            "timestamp": datetime.now().isoformat(),
            "device": "raspberry_pi_kiosk_1"
        })
        return response.status_code == 200
    except Exception as e:
        print(f"Error: {e}")
        return False

def main():
    print("ACET Attendance Kiosk Starting...")
    while True:
        # Capture and process face
        image = capture_face()
        if image:
            # Send to face recognition API
            # On success: success_feedback()
            # On failure: error_feedback()
            pass
        time.sleep(1)

if __name__ == "__main__":
    try:
        main()
    finally:
        GPIO.cleanup()
```

### Raspberry Pi Setup Steps

1. **Flash Raspberry Pi OS**
   ```bash
   # Download Raspberry Pi Imager
   # Flash Raspberry Pi OS (64-bit) to SD card
   ```

2. **Enable Camera & SSH**
   ```bash
   sudo raspi-config
   # Interface Options → Camera → Enable
   # Interface Options → SSH → Enable
   ```

3. **Install Dependencies**
   ```bash
   sudo apt update && sudo apt upgrade -y
   sudo apt install python3-opencv python3-pip -y
   pip3 install requests RPi.GPIO
   ```

4. **Auto-start on Boot**
   ```bash
   # Add to /etc/rc.local before 'exit 0'
   python3 /home/pi/attendance_kiosk.py &
   ```

---

## 🔮 Future Enhancements

### Phase 1 - Backend Integration
- [ ] Connect to cloud database (Lovable Cloud)
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

### Phase 4 - Mobile & PWA Support
- [ ] Progressive Web App (PWA) support
- [ ] Mobile-responsive design optimization
- [ ] Offline attendance sync

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
