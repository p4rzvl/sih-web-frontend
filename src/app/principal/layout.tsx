// app/principal/layout.tsx
"use client";

import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import {
  Menu,
  ChevronRight,
  ChevronDown,
  Bell,
  CircleUser,
  Home,
  Users,
  UserCheck,
  BookOpen,
  Landmark,
  Wallet,
  Settings,
  Users2,
  Briefcase,
  Calendar,
  CalendarCheck, // Icon for Faculty Leaves
} from "lucide-react";
import Image from "next/image";

// --- MOCK DATA ---
const recentActivities = [
  {
    time: "30 mins ago",
    text: "Dr. Sharma's leave request has been approved.",
    icon: UserCheck,
  },
  {
    time: "2 hours ago",
    text: "CSE department budget for Q3 has been submitted.",
    icon: Wallet,
  },
  {
    time: "1 day ago",
    text: "Campus placement drive results are now available.",
    icon: Briefcase,
  },
  {
    time: "3 days ago",
    text: "New academic circular published for all students.",
    icon: BookOpen,
  },
];

const departments = [
  "Computer Engineering",
  "Information Technology",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electrical Engineering",
];

const academicYears = ["2024-2025", "2023-2024", "2022-2023"];

// --- LAYOUT COMPONENT FOR PRINCIPAL ---
export default function PrincipalDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedDepartment, setSelectedDepartment] = useState(departments[0]);
  const [selectedYear, setSelectedYear] = useState(academicYears[0]);

  const themeConfig = {
    name: "Blue",
    bg: "bg-slate-50",
    card: "bg-white",
    text: "text-slate-900",
    textMuted: "text-blue-900/70",
    border: "border-blue-200",
    primary: {
      bg: "bg-blue-600",
      hover: "hover:bg-blue-700",
      text: "text-blue-700",
    },
  };

  // --- [UPDATED] Navigation links for Principal ---
  const navLinks = [
    { href: "/principal", label: "Dashboard", icon: Home, active: true },
    { href: "#", label: "HODs", icon: Users2 },
    { href: "#", label: "Faculty", icon: UserCheck },
    { href: "#", label: "Students", icon: Users },
    { href: "#", label: "Placements", icon: Briefcase },
    { href: "#", label: "Faculty Leaves", icon: CalendarCheck }, // Changed from Hostel
    { href: "#", label: "Library", icon: BookOpen },
    
  ];

  return (
    <div className={`min-h-screen ${themeConfig.bg}`}>
      <div className="grid min-h-screen w-full md:grid-cols-[280px_1fr]">
        {/* --- SIDEBAR --- */}
        <div
          className={`hidden border-r ${themeConfig.border} ${themeConfig.card} md:block sticky top-0 h-screen overflow-y-auto`}
        >
          <div className="flex h-full flex-col">
            <div
              className={`flex h-16 items-center px-6 border-b ${themeConfig.border}`}
            >
              <div className="flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="VidyaLink Logo"
                  width={50}
                  height={50}
                  className="rounded-md"
                />
                <div>
                  <h1 className="font-bold text-xl">
                    <span className="text-[#001675]">Vidya</span>
                    <span className="text-[#444346]">Link</span>
                  </h1>
                  <p className={`text-xs font-medium ${themeConfig.textMuted}`}>
                    ERP System
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-auto py-4">
              <nav className="space-y-1 px-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      link.active
                        ? `bg-[#001675] text-white shadow-md`
                        : `${themeConfig.textMuted} hover:bg-slate-100 hover:text-slate-900`
                    }`}
                  >
                    <link.icon
                      className={`h-5 w-5 ${
                        link.active ? "text-white" : "text-slate-500"
                      }`}
                    />
                    <span className="flex-1">{link.label}</span>
                    <ChevronRight
                      className={`h-4 w-4 transition-transform ${
                        link.active
                          ? "text-white/70"
                          : "text-slate-400 group-hover:translate-x-1"
                      }`}
                    />
                  </a>
                ))}
              </nav>
            </div>

            <div
              className={`border-t ${themeConfig.border} p-4 sticky bottom-0 ${themeConfig.card}`}
            >
              <Card className={`${themeConfig.bg} ${themeConfig.border}`}>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3
                        className={`font-semibold text-sm ${themeConfig.text} mb-2`}
                      >
                        LDRP-ITR College
                      </h3>
                      <p className={`text-xs ${themeConfig.textMuted}`}>
                        Gandhinagar, Gujarat
                      </p>
                      {/* <p className={`text-xs ${themeConfig.textMuted} mt-1`}>
                        Est. 2008 • NAAC A+
                      </p> */}
                    </div>
                    <Image
                      src="/ldrp.png"
                      alt="LDRP logo"
                      width={70}
                      height={70}
                      className="rounded-md object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* --- MAIN CONTENT --- */}
        <div className="flex flex-col">
          <header
            className={`flex h-16 items-center gap-4 border-b ${themeConfig.border} ${themeConfig.card} px-6 justify-between sticky top-0 z-10`}
          >
            {/* Left */}
            <div className="flex items-center">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden mr-4"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72"></SheetContent>
              </Sheet>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                Principal
              </p>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
              {/* Department Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Briefcase className="h-4 w-4" />
                    <span className="hidden md:inline-block max-w-28 truncate">
                      {selectedDepartment}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel>Select Department</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {departments.map((dept) => (
                    <DropdownMenuItem
                      key={dept}
                      onSelect={() => setSelectedDepartment(dept)}
                    >
                      {dept}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Academic Year Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="hidden md:block">{selectedYear}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Academic Year</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {academicYears.map((year) => (
                    <DropdownMenuItem
                      key={year}
                      onSelect={() => setSelectedYear(year)}
                    >
                      {year}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"></span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Recent Activities</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {recentActivities.map((item, idx) => (
                    <DropdownMenuItem key={idx} className="items-start gap-3">
                      <div
                        className={`p-2 mt-1 rounded-lg ${themeConfig.primary.bg}/10 ${themeConfig.primary.text}`}
                      >
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs">{item.text}</p>
                        <p className="text-xs text-slate-500">{item.time}</p>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <div className="flex items-center gap-2">
                      <div className="hidden md:block text-right">
                        <p className="text-sm font-medium">Dr. H. P. Verma</p>
                        <p className={`text-xs ${themeConfig.textMuted}`}>
                          Principal
                        </p>
                      </div>
                      <div
                        className={`h-8 w-8 rounded-full bg-[#001675] flex items-center justify-center`}
                      >
                        <CircleUser className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56"
                ></DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </div>
  );
}
