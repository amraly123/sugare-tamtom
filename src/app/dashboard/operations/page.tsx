"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegendContent } from "@/components/ui/chart";
import { PlusCircle, Package, Gauge, Clock, ClipboardList, CheckSquare } from "lucide-react";
import Image from "next/image";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const inventory = [
  { sku: "DRS-SMR-PNK-S", name: "فستان صيفي بناتي", stock: 120, category: "فساتين", status: "متوفر", imageHint: "kids dress" },
  { sku: "SET-JNS-BLU-M", name: "طقم ولادي جينز", stock: 80, category: "أطقم", status: "متوفر", imageHint: "boys outfit" },
  { sku: "PJM-CTN-WHT-L", name: "بيجامة أطفال قطن", stock: 5, category: "ملابس نوم", status: "كمية قليلة", imageHint: "kids pajamas" },
  { sku: "JKT-WNT-BLK-M", name: "جاكيت شتوي", stock: 0, category: "ملابس خارجية", status: "نفذ المخزون", imageHint: "kids jacket" },
  { sku: "SWM-SHT-GRN-S", name: "شورت سباحة", stock: 200, category: "ملابس سباحة", status: "متوفر", imageHint: "swim shorts" },
];

const availableStock = inventory.filter(i => i.status === "متوفر").reduce((acc, item) => acc + item.stock, 0);
const lowStock = inventory.filter(i => i.status === "كمية قليلة").reduce((acc, item) => acc + item.stock, 0);
const outOfStockCount = inventory.filter(i => i.status === "نفذ المخزون").length;

const inventoryStatusData = [
    { name: 'available', label: 'متوفر', value: availableStock, fill: 'hsl(var(--primary))' },
    { name: 'low', label: 'كمية قليلة', value: lowStock, fill: 'hsl(var(--accent))' },
    { name: 'out', label: 'نفذ المخزون', value: outOfStockCount, fill: 'hsl(var(--destructive))' },
].filter(d => d.value > 0);

const chartConfig = {
    value: {
      label: "قطع",
    },
    available: {
        label: "متوفر",
        color: "hsl(var(--primary))",
    },
    low: {
        label: "كمية قليلة",
        color: "hsl(var(--accent))",
    },
    out: {
        label: `نفذ المخزون (${outOfStockCount} صنف)`,
        color: "hsl(var(--destructive))",
    }
};

const recentOrders = [
  { id: "ORD-1024", customer: "علياء محمد", status: "تم التسليم", progress: 100 },
  { id: "ORD-1023", customer: "خالد يوسف", status: "في الشحن", progress: 75 },
  { id: "ORD-1022", customer: "فاطمة أحمد", status: "تحت التجهيز", progress: 45 },
  { id: "ORD-1021", customer: "حسن إبراهيم", status: "طلب جديد", progress: 10 },
];

const checklists = [
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

export default function OperationsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">إدارة التشغيل المحسّنة</h1>
          <p className="text-muted-foreground">لوحة تحكم تفاعلية لمراقبة وتحسين كفاءة العمليات.</p>
        </div>
        <Button>
          <PlusCircle className="ml-2 h-4 w-4" />
          إضافة منتج جديد
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">إجمالي القطع في المخزون</CardTitle>
                <Package className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold">{inventory.reduce((acc, item) => acc + item.stock, 0)}</div>
                <p className="text-xs text-muted-foreground">إجمالي عدد القطع المتاحة</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">دقة المخزون</CardTitle>
                <Gauge className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold">98.5%</div>
                <p className="text-xs text-muted-foreground">مقارنة بالجرد الفعلي</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">متوسط وقت تجهيز الطلب</CardTitle>
                <Clock className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold">3.5 ساعات</div>
                <p className="text-xs text-muted-foreground">من الطلب إلى الشحن</p>
            </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>إدارة المخزون المتقدمة</CardTitle>
            <CardDescription>نظرة تفصيلية على المنتجات في المخزون.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>المنتج</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>الكمية</TableHead>
                  <TableHead>الحالة</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventory.map((item) => (
                  <TableRow key={item.sku}>
                    <TableCell className="font-medium flex items-center gap-3">
                      <Image src={`https://placehold.co/40x40.png`} alt={item.name} width={40} height={40} className="rounded-md" data-ai-hint={item.imageHint} />
                      <div>
                        <p>{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.category}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{item.sku}</TableCell>
                    <TableCell className="text-center font-medium">{item.stock}</TableCell>
                    <TableCell>
                      <Badge variant={
                        item.status === "متوفر" ? "default" :
                        item.status === "كمية قليلة" ? "secondary" : "destructive"
                      }>
                        {item.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2 flex flex-col">
            <CardHeader>
                <CardTitle>تحليلات المخزون</CardTitle>
                <CardDescription>توزيع كمية المخزون حسب الحالة.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center">
                <ChartContainer config={chartConfig} className="w-full h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" hideLabel />} />
                            <Pie data={inventoryStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={50} labelLine={false} label={({ percent }) => `${(percent * 100).toFixed(0)}%`}>
                                {inventoryStatusData.map((entry) => (
                                    <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                                ))}
                            </Pie>
                             <Legend content={<ChartLegendContent />} />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><ClipboardList className="h-5 w-5"/>إدارة الطلبات</CardTitle>
                <CardDescription>تتبع مراحل الطلبات الحالية.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>الطلب</TableHead>
                            <TableHead>العميل</TableHead>
                            <TableHead>حالة التجهيز</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentOrders.map(order => (
                            <TableRow key={order.id}>
                                <TableCell className="font-medium">{order.id}</TableCell>
                                <TableCell>{order.customer}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-1.5">
                                        <p className="text-xs text-muted-foreground">{order.status}</p>
                                        <Progress value={order.progress} className="h-2"/>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><CheckSquare className="h-5 w-5"/>سير العمليات والمهام</CardTitle>
                <CardDescription>حوّل الأدلة إلى قوائم تحقق تفاعلية لضمان الجودة.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Accordion type="single" collapsible className="w-full">
                     {checklists.map(list => (
                        <AccordionItem value={list.id} key={list.id}>
                            <AccordionTrigger>{list.title}</AccordionTrigger>
                            <AccordionContent>
                                <ul className="list-decimal list-inside pr-4 space-y-2 text-sm text-muted-foreground">
                                    {list.steps.map((step, index) => <li key={index}>{step}</li>)}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                     ))}
                </Accordion>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
