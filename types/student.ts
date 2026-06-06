export type Student = {
  id: number;
  name: string;
  className: string;
  feesPaid: boolean;
  totalFees: number;
  paidAmount: number;
  attendance: "Present" | "Absent";
  // Additional fields for profile
  rollNumber?: string;
  dateOfBirth?: string;
  gender?: "Male" | "Female" | "Other";
  address?: string;
  phone?: string;
  email?: string;
  parentName?: string;
  parentPhone?: string;
  admissionDate?: string;
  bloodGroup?: string;
};
