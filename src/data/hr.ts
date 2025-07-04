export type Employee = {
  id: string; // Changed from number to string to accommodate Firestore document IDs
  name: string;
  email: string;
  position: string;
  department: string;
  status: 'نشط' | 'في إجازة';
};

export const employees: Employee[] = [
  { id: "1", name: "نور الهدى", email: "nour@example.com", position: "مدير موارد بشرية", department: "الإدارة", status: "نشط" },
  { id: "2", name: "أحمد المصري", email: "ahmad@example.com", position: "مسوق رقمي", department: "التسويق", status: "نشط" },
  { id: "3", name: "سارة خليل", email: "sara@example.com", position: "محاسبة", department: "الحسابات", status: "في إجازة" },
  { id: "4", name: "عمر الشامي", email: "omar@example.com", position: "مدير عمليات", department: "التشغيل", status: "نشط" },
  { id: "5", name: "فاطمة الزهراء", email: "fatima@example.com", position: "مصممة أزياء", department: "التشغيل", status: "نشط" },
];

export const stats = {
  totalEmployees: 15,
  newThisMonth: 2,
  attendance: 95,
};
