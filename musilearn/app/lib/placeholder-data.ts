const users = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    email: "admin@musilearn.com",
    password: "admin123",
    name: "Admin",
    role: "admin",
    createdAt: new Date(),
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    email: "teacher@musilearn.com",
    password: "teacher123",
    name: "John Doe",
    role: "teacher",
    createdAt: new Date(),
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    email: "student@musilearn.com",
    password: "student123",
    name: "Jane Smith",
    role: "student",
    createdAt: new Date(),
  },
];

const courses = [
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    title: "Guitar Basics",
    description: "Intro to guitar",
    instrument: "Guitar",
    teacherId: "550e8400-e29b-41d4-a716-446655440001",
    level: "Beginner",
    schedule: "Mon 10AM",
    capacity: 10,
  },
];

const enrollments = [
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    studentId: "550e8400-e29b-41d4-a716-446655440002",
    courseId: "550e8400-e29b-41d4-a716-446655440003",
    enrollmentDate: new Date(),
    status: "active",
  },
];

const progress = [
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    studentId: "550e8400-e29b-41d4-a716-446655440002",
    courseId: "550e8400-e29b-41d4-a716-446655440003",
    date: new Date(),
    evaluation: "Good",
    comments: "Needs to improve chord transitions",
  },
];

export { users, courses, enrollments, progress };
