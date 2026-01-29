import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { WebcamCapture } from '@/components/attendance/WebcamCapture';
import { useStudents } from '@/hooks/useStudents';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const departments = [
  'Computer Science',
  'Electronics',
  'Mechanical',
  'Civil',
  'Electrical',
  'Information Technology',
];

const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

export default function RegisterStudent() {
  const navigate = useNavigate();
  const { addStudent } = useStudents();
  const [faceImage, setFaceImage] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    department: '',
    semester: '',
    email: '',
    phone: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCapture = (imageData: string) => {
    setFaceImage(imageData);
    toast.success('Face captured successfully!');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!faceImage) {
      toast.error('Please capture face image before registering');
      return;
    }

    if (!formData.name || !formData.rollNumber || !formData.department || !formData.semester) {
      toast.error('Please fill in all required fields');
      return;
    }

    addStudent({
      ...formData,
      semester: parseInt(formData.semester),
      faceImage,
    });

    toast.success('Student registered successfully!');
    navigate('/students');
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Register Student</h1>
          <p className="text-muted-foreground mt-1">
            Add a new student to the face recognition system
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Student Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Student Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="Enter student name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="rollNumber">Roll Number *</Label>
                    <Input
                      id="rollNumber"
                      placeholder="e.g., CS2024001"
                      value={formData.rollNumber}
                      onChange={(e) => handleInputChange('rollNumber', e.target.value)}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="department">Department *</Label>
                    <Select
                      value={formData.department}
                      onValueChange={(value) => handleInputChange('department', value)}
                    >
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="semester">Semester *</Label>
                    <Select
                      value={formData.semester}
                      onValueChange={(value) => handleInputChange('semester', value)}
                    >
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                      <SelectContent>
                        {semesters.map((sem) => (
                          <SelectItem key={sem} value={sem.toString()}>
                            Semester {sem}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="student@college.edu"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Face Capture */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {faceImage ? (
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  ) : (
                    <User className="h-5 w-5 text-primary" />
                  )}
                  Face Registration
                </CardTitle>
              </CardHeader>
              <CardContent>
                {faceImage ? (
                  <div className="space-y-4">
                    <div className="relative rounded-xl overflow-hidden border border-success">
                      <img
                        src={faceImage}
                        alt="Captured face"
                        className="w-full h-auto"
                      />
                      <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-success px-3 py-1.5 text-success-foreground">
                        <CheckCircle2 className="h-4 w-4" />
                        <span className="text-sm font-medium">Face Captured</span>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setFaceImage('')}
                      className="w-full"
                    >
                      Retake Photo
                    </Button>
                  </div>
                ) : (
                  <WebcamCapture onCapture={handleCapture} mode="register" />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => navigate('/students')}>
              Cancel
            </Button>
            <Button type="submit" size="lg" disabled={!faceImage}>
              Register Student
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
