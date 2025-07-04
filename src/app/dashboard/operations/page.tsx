import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, PlusCircle, Package, PackageCheck, PackageX } from "lucide-react";
import Image from "next/image";

const inventory = [
  { id: "P001", name: "فستان صيفي بناتي", stock: 120, category: "فساتين", status: "متوفر", imageHint: "kids dress" },
  { id: "P002", name: "طقم ولادي جينز", stock: 80, category: "أطقم", status: "متوفر", imageHint: "boys outfit" },
  { id: "P003", name: "بيجامة أطفال قطن", stock: 5, category: "ملابس نوم", status: "كمية قليلة", imageHint: "kids pajamas" },
  { id: "P004", name: "جاكيت شتوي", stock: 0, category: "ملابس خارجية", status: "نفذ المخزون", imageHint: "kids jacket" },
  { id: "P005", name: "شورت سباحة", stock: 200, category: "ملابس سباحة", status: "متوفر", imageHint: "swim shorts" },
];

export default function OperationsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">إدارة التشغيل</h1>
          <p className="text-muted-foreground">مراقبة المخزون، الطلبات، وسير العمليات.</p>
        </div>
        <Button>
          <PlusCircle className="ml-2 h-4 w-4" />
          إضافة منتج جديد
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">المنتجات في المخزون</CardTitle>
                <Package className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold">405</div>
                <p className="text-xs text-muted-foreground">إجمالي عدد القطع</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">الطلبات المكتملة</CardTitle>
                <PackageCheck className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold">350</div>
                <p className="text-xs text-muted-foreground">هذا الشهر</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">منتجات نفذت</CardTitle>
                <PackageX className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">تحتاج لإعادة تخزين</p>
            </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>إدارة المخزون</CardTitle>
            <CardDescription>نظرة عامة على المنتجات في المخزون.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>المنتج</TableHead>
                  <TableHead>الكمية المتاحة</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead className="text-left">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium flex items-center gap-3">
                      <Image src={`https://placehold.co/40x40.png`} alt={item.name} width={40} height={40} className="rounded-md" data-ai-hint={item.imageHint} />
                      <div>
                        <p>{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.category}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{item.stock}</TableCell>
                    <TableCell>
                      <Badge variant={
                        item.status === "متوفر" ? "default" :
                        item.status === "كمية قليلة" ? "secondary" : "destructive"
                      }>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-left">
                      <Button variant="outline" size="sm">تعديل</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>إجراءات التشغيل</CardTitle>
            <CardDescription>المستندات الخاصة بسير العمليات.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-center justify-between p-3 rounded-md border">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary"/>
                  <span>دليل تجهيز الطلبات.pdf</span>
                </div>
                <Button variant="ghost" size="sm">تحميل</Button>
              </li>
              <li className="flex items-center justify-between p-3 rounded-md border">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary"/>
                  <span>سياسة الإرجاع والاستبدال.docx</span>
                </div>
                <Button variant="ghost" size="sm">تحميل</Button>
              </li>
               <li className="flex items-center justify-between p-3 rounded-md border">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary"/>
                  <span>دليل فحص الجودة.pdf</span>
                </div>
                <Button variant="ghost" size="sm">تحميل</Button>
              </li>
            </ul>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
