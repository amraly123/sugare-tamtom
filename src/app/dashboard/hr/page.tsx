"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle, User, Users, Calendar, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getEmployees, getHrStats } from "@/services/hrService";
import type { Employee } from "@/data/hr";

type HrStats = {
  totalEmployees: number;
  newThisMonth: number;
  attendance: number;
};

export default function HRPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [stats, setStats] = useState<HrStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const employeesData = await getEmployees();
        const statsData = await getHrStats();
        setEmployees(employeesData);
        setStats(statsData);
      } catch (error) {
        console.error("Failed to fetch HR data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">إدارة الموارد البشرية</h1>
          <p className="text-muted-foreground">إدارة الموظفين، التوظيف، والرواتب.</p>
        </div>
        <Button>
          <PlusCircle className="ml-2 h-4 w-4" />
          إضافة موظف جديد
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الموظفين</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalEmployees}</div>
            <p className="text-xs text-muted-foreground">موظف نشط في الشركة</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">موظفين جدد هذا الشهر</CardTitle>
            <User className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">+{stats.newThisMonth}</div>
             <p className="text-xs text-muted-foreground">انضموا حديثًا</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">حضور اليوم</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.attendance}%</div>
            <p className="text-xs text-muted-foreground">معدل الحضور للجميع</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>قائمة الموظفين</CardTitle>
          <CardDescription>قائمة بجميع الموظفين الحاليين في الشركة.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الموظف</TableHead>
                <TableHead>المنصب</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={`https://i.pravatar.cc/40?u=${employee.email}`} />
                          <AvatarFallback>{employee.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p>{employee.name}</p>
                          <p className="text-sm text-muted-foreground">{employee.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>
                      <Badge variant={employee.status === "نشط" ? "default" : "secondary"}>
                        {employee.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">عرض التفاصيل</Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    لا يوجد موظفين لعرضهم. يرجى إضافة بيانات في Firestore.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
