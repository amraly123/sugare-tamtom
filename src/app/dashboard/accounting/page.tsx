"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Bar } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { CircleDollarSign } from 'lucide-react';

const monthlyRevenue = [
  { month: "يناير", revenue: 18600 },
  { month: "فبراير", revenue: 30500 },
  { month: "مارس", revenue: 23700 },
  { month: "أبريل", revenue: 7300 },
  { month: "مايو", revenue: 20900 },
  { month: "يونيو", revenue: 21400 },
];

const chartConfig = {
  revenue: {
    label: "الإيرادات (₪)",
    color: "hsl(var(--primary))",
  },
};

const transactions = [
  { id: "TRX001", description: "بيع فساتين", date: "2024-05-20", amount: 250.00, status: "مكتملة" },
  { id: "TRX002", description: "شراء أقمشة", date: "2024-05-19", amount: -150.75, status: "مكتملة" },
  { id: "TRX003", description: "بيع أطقم أولاد", date: "2024-05-18", amount: 350.00, status: "قيد المعالجة" },
  { id: "TRX004", description: "إيجار المحل", date: "2024-05-18", amount: -450.00, status: "مكتملة" },
  { id: "TRX005", description: "بيع ملابس نوم", date: "2024-05-17", amount: 550.00, status: "ملغاة" },
];


export default function AccountingPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-2">إدارة الحسابات</h1>
      <p className="text-muted-foreground mb-8">تتبع الإيرادات، المصروفات، والتقارير المالية.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الإيرادات</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">121,400₪</div>
            <p className="text-xs text-muted-foreground">+20.1% عن الشهر الماضي</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المصروفات</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,231.89₪</div>
            <p className="text-xs text-muted-foreground">+18% عن الشهر الماضي</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">صافي الربح</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76,168.11₪</div>
            <p className="text-xs text-muted-foreground">+22% عن الشهر الماضي</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>الإيرادات الشهرية</CardTitle>
            <CardDescription>نظرة على أداء الإيرادات خلال آخر 6 أشهر.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={chartConfig} className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyRevenue} margin={{ top: 5, right: 10, left: 10, bottom: 5 }} >
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} angle={-45} textAnchor="end" height={50}/>
                  <YAxis tickLine={false} axisLine={false} tickMargin={10} tickFormatter={(value) => `₪${value / 1000}k`} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                  <Bar dataKey="revenue" fill="var(--color-revenue)" radius={8} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>آخر المعاملات</CardTitle>
            <CardDescription>آخر 5 معاملات مالية مسجلة.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                 <TableRow>
                  <TableHead>الوصف</TableHead>
                  <TableHead>المبلغ</TableHead>
                  <TableHead>الحالة</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell className={`font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-destructive'}`}>{transaction.amount.toFixed(2)}₪</TableCell>
                    <TableCell>
                      <Badge variant={
                        transaction.status === "مكتملة" ? "default" :
                        transaction.status === "قيد المعالجة" ? "secondary" : "destructive"
                      }>
                        {transaction.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
