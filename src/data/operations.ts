export type InventoryItem = {
  sku: string;
  name: string;
  stock: number;
  category: string;
  status: 'متوفر' | 'كمية قليلة' | 'نفذ المخزون';
  imageHint: string;
};

export type Order = {
    id: string;
    customer: string;
    status: 'تم التسليم' | 'في الشحن' | 'تحت التجهيز' | 'طلب جديد';
    progress: number;
};

export type Checklist = {
    id: string;
    title: string;
    steps: string[];
};


export const inventory: InventoryItem[] = [
  { sku: "DRS-SMR-PNK-S", name: "فستان صيفي بناتي", stock: 120, category: "فساتين", status: "متوفر", imageHint: "kids dress" },
  { sku: "SET-JNS-BLU-M", name: "طقم ولادي جينز", stock: 80, category: "أطقم", status: "متوفر", imageHint: "boys outfit" },
  { sku: "PJM-CTN-WHT-L", name: "بيجامة أطفال قطن", stock: 5, category: "ملابس نوم", status: "كمية قليلة", imageHint: "kids pajamas" },
  { sku: "JKT-WNT-BLK-M", name: "جاكيت شتوي", stock: 0, category: "ملابس خارجية", status: "نفذ المخزون", imageHint: "kids jacket" },
  { sku: "SWM-SHT-GRN-S", name: "شورت سباحة", stock: 200, category: "ملابس سباحة", status: "متوفر", imageHint: "swim shorts" },
];

export const recentOrders: Order[] = [
  { id: "ORD-1024", customer: "علياء محمد", status: "تم التسليم", progress: 100 },
  { id: "ORD-1023", customer: "خالد يوسف", status: "في الشحن", progress: 75 },
  { id: "ORD-1022", customer: "فاطمة أحمد", status: "تحت التجهيز", progress: 45 },
  { id: "ORD-1021", customer: "حسن إبراهيم", status: "طلب جديد", progress: 10 },
];

export const checklists: Checklist[] = [
    { 
        id: "fulfillment",
        title: "قائمة التحقق الرقمية لتجهيز الطلبات",
        steps: [
            "استلام وتأكيد الطلب",
            "اختيار المنتجات الصحيحة من المخزون",
            "فحص الجودة المبدئي للمنتجات",
            "تغليف المنتجات بشكل آمن",
            "طباعة بوليصة الشحن",
            "تسليم الشحنة لمندوب شركة الشحن"
        ]
    },
    { 
        id: "quality",
        title: "قائمة التحقق الرقمية لفحص الجودة",
        steps: [
            "فحص الأقمشة (خلوها من العيوب)",
            "فحص الخياطة والتطريز",
            "التأكد من المقاسات والأبعاد",
            "فحص الأزرار والسحابات",
            "التحقق من تطابق اللون",
            "الكي والتغليف النهائي"
        ]
    },
];
