export type UserRole = "admin" | "teacher" | "student";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
};

export type Course = {
  id: string;
  title: string;
  description: string;
  instrument: string;
  teacherId: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  schedule: string;
  capacity: number;
};

export type Enrollment = {
  id: string;
  studentId: string;
  courseId: string;
  enrollmentDate: Date;
  status: "active" | "completed" | "cancelled";
};

export type Progress = {
  id: string;
  studentId: string;
  courseId: string;
  date: Date;
  evaluation: string;
  comments: string;
};

export type Users = User[];
export type Courses = Course[];
export type Enrollments = Enrollment[];
export type ProgressRecords = Progress[];
