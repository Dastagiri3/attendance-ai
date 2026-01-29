import { Student } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, Calendar, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface StudentCardProps {
  student: Student;
  onDelete?: (id: string) => void;
}

export function StudentCard({ student, onDelete }: StudentCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
      <CardContent className="p-0">
        <div className="flex items-start gap-4 p-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
            {student.faceImage ? (
              <img
                src={student.faceImage}
                alt={student.name}
                className="h-full w-full rounded-xl object-cover"
              />
            ) : (
              <User className="h-8 w-8 text-primary" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-foreground">{student.name}</h3>
                <p className="text-sm text-muted-foreground">{student.rollNumber}</p>
              </div>
              <Badge variant="secondary">{student.department}</Badge>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" />
                <span className="truncate">{student.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5" />
                <span>{student.phone}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <span>Semester {student.semester}</span>
              </div>
            </div>
          </div>
        </div>
        {onDelete && (
          <div className="border-t border-border bg-muted/30 px-4 py-2 flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => onDelete(student.id)}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Remove
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
