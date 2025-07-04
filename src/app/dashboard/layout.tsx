'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import Logo from '@/components/icons/logo';
import {
  Users,
  Megaphone,
  CircleDollarSign,
  Truck,
  LayoutDashboard,
  LogOut,
  Loader2,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
  { href: '/dashboard/hr', label: 'الموارد البشرية', icon: Users },
  { href: '/dashboard/marketing', label: 'التسويق', icon: Megaphone },
  { href: '/dashboard/accounting', label: 'الحسابات', icon: CircleDollarSign },
  { href: '/dashboard/operations', label: 'التشغيل', icon: Truck },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-muted/50">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-muted/50">
        <Sidebar side="right">
          <SidebarHeader>
            <div className="flex items-center gap-3">
              <Logo />
              <div className="flex flex-col">
                <h2 className="text-lg font-bold font-headline">Sugar Tamtom</h2>
                <p className="text-sm text-muted-foreground">لوحة التحكم</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <Link href={item.href} passHref>
                    <SidebarMenuButton
                      isActive={pathname === item.href}
                      tooltip={item.label}
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenuButton onClick={handleSignOut}>
              <LogOut />
              <span>تسجيل الخروج</span>
            </SidebarMenuButton>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
            <header className="sticky top-0 z-10 flex items-center justify-end h-16 px-4 bg-background/80 backdrop-blur-sm border-b md:px-6">
                <SidebarTrigger className="md:hidden" />
            </header>
            <main className="p-4 sm:p-6 lg:p-8">
              {children}
            </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
