// components/faculty-sidenav.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Home,
  BookOpen,
  Users,
  ClipboardList,
  Calendar,
  MessageSquare,
  BarChart3,
} from "lucide-react";

const menuItems = [
  { href: "/faculty", label: "Dashboard", icon: Home },
  { href: "/faculty/attendance", label: "Attendance", icon: ClipboardList },
  { href: "/faculty/students", label: "Student Data", icon: Users },
  { href: "/faculty/academics", label: "IA Marks", icon: BookOpen },
  { href: "/faculty/schedule", label: "Schedule", icon: Calendar },
  {
    href: "/faculty/communication",
    label: "Communication",
    icon: MessageSquare,
  },
  { href: "/faculty/reports", label: "Reports", icon: BarChart3 },
];

export function SideNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2 p-4">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Button
            key={item.href}
            variant={isActive ? "secondary" : "ghost"}
            className="w-full justify-start gap-3 h-11"
            asChild
          >
            <Link href={item.href}>
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          </Button>
        );
      })}
    </nav>
  );
}
