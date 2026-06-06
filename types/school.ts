export type Teacher = {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  salary: number;
  joinDate: string;
};

export type Exam = {
  id: number;
  name: string;
  className: string;
  subject: string;
  date: string;
  maxMarks: number;
};

export type Result = {
  id: number;
  studentId: number;
  examId: number;
  marks: number;
};

export type Activity = {
  id: number;
  action: string;
  user: string;
  timestamp: string;
  type: "add" | "edit" | "delete" | "pay";
};

export type Notification = {
  id: number;
  title: string;
  message: string;
  type: "warning" | "success" | "info";
  read: boolean;
  timestamp: string;
};

export type TimeSlot = {
  id: number;
  day: string;
  startTime: string;
  endTime: string;
  subject: string;
  teacher: string;
  className: string;
};

export type SchoolSettings = {
  name: string;
  address: string;
  phone: string;
  email: string;
  defaultFees: number;
  currency: string;
};

export const dummyTeachers: Teacher[] = [
  { id: 1, name: "Rahul Sharma", email: "rahul@school.com", phone: "9876543210", subject: "Mathematics", salary: 35000, joinDate: "2022-06-15" },
  { id: 2, name: "Priya Patel", email: "priya@school.com", phone: "9876543211", subject: "Science", salary: 32000, joinDate: "2021-08-20" },
  { id: 3, name: "Amit Kumar", email: "amit@school.com", phone: "9876543212", subject: "English", salary: 30000, joinDate: "2023-01-10" },
  { id: 4, name: "Sneha Gupta", email: "sneha@school.com", phone: "9876543213", subject: "Hindi", salary: 28000, joinDate: "2022-03-05" },
  { id: 5, name: "Vikram Singh", email: "vikram@school.com", phone: "9876543214", subject: "Social Studies", salary: 33000, joinDate: "2021-11-12" },
  { id: 6, name: "Neha Reddy", email: "neha@school.com", phone: "9876543215", subject: "Computer Science", salary: 40000, joinDate: "2023-04-18" },
];

export const dummyExams: Exam[] = [
  { id: 1, name: "Unit Test 1", className: "10A", subject: "Mathematics", date: "2024-02-15", maxMarks: 50 },
  { id: 2, name: "Unit Test 1", className: "10A", subject: "Science", date: "2024-02-17", maxMarks: 50 },
  { id: 3, name: "Mid Term", className: "9A", subject: "English", date: "2024-03-01", maxMarks: 100 },
  { id: 4, name: "Quiz 1", className: "8A", subject: "Mathematics", date: "2024-02-20", maxMarks: 20 },
];

export const dummyResults: Result[] = [
  { id: 1, studentId: 1, examId: 1, marks: 45 },
  { id: 2, studentId: 2, examId: 1, marks: 38 },
  { id: 3, studentId: 3, examId: 1, marks: 42 },
  { id: 4, studentId: 1, examId: 2, marks: 48 },
  { id: 5, studentId: 2, examId: 2, marks: 35 },
];

export const dummyActivities: Activity[] = [
  { id: 1, action: "Added new student Aarav Patel", user: "Admin", timestamp: "2024-01-15 10:30", type: "add" },
  { id: 2, action: "Fees paid by Ananya Sharma", user: "Admin", timestamp: "2024-01-15 11:45", type: "pay" },
  { id: 3, action: "Updated attendance for Class 10A", user: "Admin", timestamp: "2024-01-15 14:20", type: "edit" },
  { id: 4, action: "Deleted student record #12", user: "Admin", timestamp: "2024-01-14 16:00", type: "delete" },
  { id: 5, action: "Added new teacher Rahul Sharma", user: "Admin", timestamp: "2024-01-14 09:15", type: "add" },
];

export const dummyNotifications: Notification[] = [
  { id: 1, title: "Fees Due", message: "5 students have pending fees", type: "warning", read: false, timestamp: "2024-01-15" },
  { id: 2, title: "Low Attendance", message: "3 students below 75% attendance", type: "warning", read: false, timestamp: "2024-01-14" },
  { id: 3, title: "Payment Success", message: "Fees collected: ₹15,000 today", type: "success", read: true, timestamp: "2024-01-15" },
];

export const dummyTimeSlots: TimeSlot[] = [
  { id: 1, day: "Monday", startTime: "09:00", endTime: "10:00", subject: "Mathematics", teacher: "Rahul Sharma", className: "10A" },
  { id: 2, day: "Monday", startTime: "10:00", endTime: "11:00", subject: "Science", teacher: "Priya Patel", className: "10A" },
  { id: 3, day: "Monday", startTime: "11:00", endTime: "12:00", subject: "English", teacher: "Amit Kumar", className: "10A" },
  { id: 4, day: "Tuesday", startTime: "09:00", endTime: "10:00", subject: "Hindi", teacher: "Sneha Gupta", className: "9A" },
  { id: 5, day: "Tuesday", startTime: "10:00", endTime: "11:00", subject: "Mathematics", teacher: "Rahul Sharma", className: "9A" },
];

export const defaultSettings: SchoolSettings = {
  name: "EduAdmin Public School",
  address: "123 Education Street, City, State - 123456",
  phone: "+91 9876543210",
  email: "info@eduadmin.com",
  defaultFees: 5000,
  currency: "₹",
};
