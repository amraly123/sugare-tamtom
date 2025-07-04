"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegendContent } from "@/components/ui/chart";
import { PlusCircle, Package, Gauge, Clock, ClipboardList, CheckSquare, Loader2 } from "lucide-react";
import Image from "next/image";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { getInventory, getRecentOrders, getChecklists, getOperationsStats } from "@/services/operationsService";
import type { InventoryItem, Order, Checklist } from "@/data/operations";

const chartConfigBase = {
    value: { label: "قطع" },
    available: { label: "متوفر", color: "hsl(var(--primary))" },
    low: { label: "كمية قليلة", color: "hsl(var(--accent))" },
};

export default function OperationsPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [checklists, setChecklists] = useState<Checklist[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const invData = await getInventory();
        const ordData = await getRecentOrders();
        const chkData = await getChecklists();
        const statData = await getOperationsStats(invData);
        
        setInventory(invData);
        setRecentOrders(ordData);
        setChecklists(chkData);
        setStats(statData);

      } catch (error) {
        console.error("Failed to fetch operations data", error);
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
  
  const chartConfig = {
      ...chartConfigBase,
      out: {
        label: `نفذ المخزون (${stats.outOfStockCount} صنف)`,
        color: "hsl(var(--destructive))",
    }
  }

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
                <div className="text-3xl font-bold">{stats.totalStock}</div>
                <p className="text-xs text-muted-foreground">إجمالي عدد القطع المتاحة</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">دقة المخزون</CardTitle>
                <Gauge className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold">{stats.inventoryAccuracy}%</div>
                <p className="text-xs text-muted-foreground">مقارنة بالجرد الفعلي</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">متوسط وقت تجهيز الطلب</CardTitle>
                <Clock className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold">{stats.avgFulfillmentTime}</div>
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
                            <Pie data={stats.inventoryStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={50} labelLine={false} label={({ percent }) => `${(percent * 100).toFixed(0)}%`}>
                                {stats.inventoryStatusData.map((entry: any) => (
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
