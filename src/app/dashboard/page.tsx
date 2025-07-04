import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Users, Megaphone, CircleDollarSign, Truck } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2 font-headline">لوحة التحكم الرئيسية</h1>
      <p className="text-muted-foreground mb-8">نظرة عامة على جميع أقسام Tom Tom Kids.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الموارد البشرية</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15 موظف</div>
            <p className="text-xs text-muted-foreground">إدارة شؤون الموظفين</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">التسويق</CardTitle>
            <Megaphone className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 حملات نشطة</div>
            <p className="text-xs text-muted-foreground">أفكار ومحتوى تسويقي</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الحسابات</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">50,000₪</div>
            <p className="text-xs text-muted-foreground">إجمالي الإيرادات هذا الشهر</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">التشغيل</CardTitle>
            <Truck className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">120 طلبية</div>
            <p className="text-xs text-muted-foreground">طلبيات جديدة هذا الأسبوع</p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8">
        <Card>
            <CardHeader>
                <CardTitle>مرحباً بك في لوحة تحكم Tom Tom Kids</CardTitle>
                <CardDescription>هذا هو مركزك لإدارة جميع جوانب علامتك التجارية. استخدم الشريط الجانبي للتنقل بين الأقسام المختلفة.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>يمكنك من هنا:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 pr-4">
                    <li>إدارة الموظفين والتوظيف في قسم الموارد البشرية.</li>
                    <li>إنشاء حملات تسويقية والحصول على أفكار إبداعية من مساعد الذكاء الاصطناعي.</li>
                    <li>متابعة الأمور المالية في قسم الحسابات.</li>
                    <li>مراقبة المخزون والطلبات في قسم التشغيل.</li>
                </ul>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
