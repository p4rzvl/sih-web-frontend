"use client";

import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Users,
  Building2,
  IndianRupee,
  GraduationCap,
  Bell,
  TrendingUp,
  Calendar,
  Search,
  Menu,
  Home,
  Landmark,
  Settings,
  CircleUser,
  BookOpen,
  UserCheck,
  BedDouble,
  Wallet,
  Star,
  Award,
  ChevronRight,
  Target,
  Paintbrush,
  ChevronDown,
} from "lucide-react";

// --- ENHANCED THEME ENGINE ---
const THEMES = {
  light: {
    name: "Default",
    bg: "bg-slate-50",
    card: "bg-white",
    text: "text-slate-900",
    textMuted: "text-slate-600",
    border: "border-slate-200",
    primary: {
      bg: "bg-emerald-500",
      hover: "hover:bg-emerald-600",
      text: "text-emerald-600",
      stroke: "#059669",
      fill: "#10b981",
    },
    secondary: { stroke: "#0ea5e9", fill: "#38bdf8" },
    accent: { bg: "bg-violet-500", stroke: "#8b5cf6", fill: "#a78bfa" },
  },
  green: {
    name: "Green",
    bg: "bg-green-50",
    card: "bg-white",
    text: "text-slate-900",
    textMuted: "text-green-900/70",
    border: "border-green-200",
    primary: {
      bg: "bg-green-600",
      hover: "hover:bg-green-700",
      text: "text-green-700",
      stroke: "#15803d",
      fill: "#16a34a",
    },
    secondary: { stroke: "#0d9488", fill: "#14b8a6" },
    accent: { bg: "bg-lime-500", stroke: "#65a30d", fill: "#84cc16" },
  },
  blue: {
    name: "Blue",
    bg: "bg-blue-50",
    card: "bg-white",
    text: "text-slate-900",
    textMuted: "text-blue-900/70",
    border: "border-blue-200",
    primary: {
      bg: "bg-blue-600",
      hover: "hover:bg-blue-700",
      text: "text-blue-700",
      stroke: "#2563eb",
      fill: "#3b82f6",
    },
    secondary: { stroke: "#0891b2", fill: "#06b6d4" },
    accent: { bg: "bg-indigo-500", stroke: "#6366f1", fill: "#818cf8" },
  },
  ocean: {
    name: "Ocean",
    bg: "bg-slate-50",
    card: "bg-white",
    text: "text-slate-900",
    textMuted: "text-slate-600",
    border: "border-cyan-200/60",
    primary: {
      bg: "bg-teal-600",
      hover: "hover:bg-teal-700",
      text: "text-teal-700",
      stroke: "#0d9488",
      fill: "#14b8a6",
    },
    secondary: { stroke: "#0ea5e9", fill: "#38bdf8" },
    accent: { bg: "bg-emerald-500", stroke: "#059669", fill: "#10b981" },
  },
};

// --- ANIMATED COUNTER ---
const AnimatedCounter = ({
  value,
  prefix = "",
  suffix = "",
}: {
  value: any;
  prefix?: string;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const numericValue =
    typeof value === "string"
      ? parseFloat(value.replace(/[^\d.]/g, ""))
      : value;

  useEffect(() => {
    if (isNaN(numericValue)) return;
    let startTime: number;
    const duration = 2000;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(numericValue * easeOutQuart);
      if (progress < 1) requestAnimationFrame(animate);
      else setCount(numericValue);
    };
    requestAnimationFrame(animate);
  }, [numericValue]);

  const formattedCount = Number.isInteger(count)
    ? count.toLocaleString()
    : parseFloat(count.toFixed(1)).toLocaleString();
  return (
    <span className="tabular-nums">
      {prefix}
      {formattedCount}
      {suffix}
    </span>
  );
};

// --- METRIC CARD ---
const MetricCard = ({
  title,
  value,
  change,
  icon,
  prefix = "",
  suffix = "",
  trend = "up",
  theme,
}: {
  title: string;
  value: any;
  change: string;
  icon: React.ReactNode;
  prefix?: string;
  suffix?: string;
  trend?: "up" | "down" | "neutral";
  theme: any;
}) => (
  <Card
    className={`relative overflow-hidden ${theme.border} ${theme.card} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group`}
  >
    <CardContent className="relative">
      <div className="flex items-start justify-between">
        <div
          className={` rounded-xl ${theme.primary.bg}/10 ${theme.primary.text} group-hover:scale-110 transition-transform`}
        >
          {icon}
        </div>
        <div
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
            trend === "up"
              ? "bg-emerald-100 text-emerald-700"
              : trend === "down"
              ? "bg-red-100 text-red-700"
              : "bg-slate-100 text-slate-700"
          }`}
        >
          {trend === "up" && <TrendingUp className="" />}
          {change}
        </div>
      </div>
      <div className="">
        <h3 className={`text-sm font-medium ${theme.textMuted}`}>{title}</h3>
        <p className={`text-xl font-bold ${theme.text} tracking-tight`}>
          <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
        </p>
      </div>
    </CardContent>
  </Card>
);

// --- MOCK DATA FOR NOTIFICATIONS ---
const recentActivities = [
  {
    time: "2 hours ago",
    text: "New batch of 450 students registered for Summer 2024.",
    icon: Users,
    type: "Registration",
  },
  {
    time: "5 hours ago",
    text: "Monthly financial report generated and sent to stakeholders.",
    icon: Wallet,
    type: "Finance",
  },
  {
    time: "1 day ago",
    text: "CM Patel College hostel renovation project completed.",
    icon: Building2,
    type: "Infra",
  },
  {
    time: "2 days ago",
    text: "Faculty performance reviews initiated for Q2 2024.",
    icon: UserCheck,
    type: "HR",
  },
];

// --- LAYOUT COMPONENT ---
const DashboardLayout = ({
  children,
  theme,
  setTheme,
}: {
  children: React.ReactNode;
  theme: string;
  setTheme: (theme: string) => void;
}) => {
  const navLinks = [
    { href: "/", label: "Dashboard", icon: Home, active: true },
    { href: "#", label: "Student Management", icon: Users },
    { href: "#", label: "Faculty & Staff", icon: UserCheck },
    { href: "#", label: "Academic Programs", icon: BookOpen },
    { href: "#", label: "College Management", icon: Landmark },
    { href: "#", label: "Hostel Management", icon: BedDouble },
    { href: "#", label: "Financial Reports", icon: Wallet },
  ];

  const themeConfig = THEMES[theme as keyof typeof THEMES] || THEMES.light;

  return (
    <div className={`min-h-screen ${themeConfig.bg}`}>
      <div className="grid min-h-screen w-full md:grid-cols-[280px_1fr]">
        {/* --- STICKY SIDEBAR --- */}
        <div
          className={`hidden border-r ${themeConfig.border} ${themeConfig.card} md:block sticky top-0 h-screen overflow-y-auto`}
        >
          <div className="flex h-full flex-col">
            <div
              className={`flex h-16 items-center border-b ${themeConfig.border} px-6 sticky top-0 ${themeConfig.card} z-10`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${themeConfig.primary.bg}`}>
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1
                    className={`font-bold text-xl ${themeConfig.primary.text}`}
                  >
                    KSV University
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
                        ? `${themeConfig.primary.bg} text-white shadow-md`
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
                  <h3
                    className={`font-semibold text-sm ${themeConfig.text} mb-2`}
                  >
                    KSV University
                  </h3>
                  <p className={`text-xs ${themeConfig.textMuted}`}>
                    Gandhinagar, Gujarat
                  </p>
                  <p className={`text-xs ${themeConfig.textMuted} mt-1`}>
                    Est. 1995 • NAAC A+
                  </p>
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
                <SheetContent side="left" className="w-72">
                  {/* Mobile Nav Content */}
                </SheetContent>
              </Sheet>

              <div className="hidden md:block">
                <div className="relative">
                  <Search
                    className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${themeConfig.textMuted}`}
                  />
                  <Input
                    placeholder="Search..."
                    className={`pl-10 ${themeConfig.card} ${themeConfig.border} w-64`}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Paintbrush className="h-4 w-4" />
                    <span className="hidden md:block">Theme</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Select Theme</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {Object.entries(THEMES).map(([key, themeOption]) => (
                    <DropdownMenuItem key={key} onClick={() => setTheme(key)}>
                      <div
                        className={`w-4 h-4 rounded mr-2 ${themeOption.primary.bg}`}
                      />
                      {themeOption.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

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
                  {recentActivities.slice(0, 4).map((item, idx) => (
                    <DropdownMenuItem key={idx} className="items-start gap-3">
                      <div
                        className={`p-2 mt-1 rounded-lg ${themeConfig.primary.bg}/10 ${themeConfig.primary.text}`}
                      >
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs text-wrap">{item.text}</p>
                        <p className="text-xs text-slate-500">{item.time}</p>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <div className="flex items-center gap-2">
                      <div className="text-right hidden md:block">
                        <p className="text-sm font-medium">Admin</p>
                        <p className={`text-xs ${themeConfig.textMuted}`}>
                          KSV University
                        </p>
                      </div>
                      <div
                        className={`h-8 w-8 rounded-full ${themeConfig.primary.bg} flex items-center justify-center`}
                      >
                        <CircleUser className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {/* User Menu Content */}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </div>
  );
};

// --- MAIN DASHBOARD COMPONENT ---
export default function ModernDashboard() {
  const [currentTheme, setCurrentTheme] = useState("light");
  const themeConfig =
    THEMES[currentTheme as keyof typeof THEMES] || THEMES.light;

  // --- MOCK DATA ---
  const metrics = [
    {
      title: "Total Students",
      value: 8535,
      change: "+8.2%",
      icon: <Users className="h-5 w-5" />,
      trend: "up" as const,
    },
    {
      title: "Faculty & Staff",
      value: 462,
      change: "+5.1%",
      icon: <UserCheck className="h-5 w-5" />,
      trend: "up" as const,
    },
    {
      title: "Annual Revenue",
      value: 13.1,
      change: "+12.3%",
      icon: <IndianRupee className="h-5 w-5" />,
      prefix: "₹",
      suffix: " Cr",
      trend: "up" as const,
    },
    {
      title: "Colleges",
      value: 3,
      change: "Stable",
      icon: <Building2 className="h-5 w-5" />,
      trend: "neutral" as const,
    },
  ];
  const revenueGrowthData = [
    { month: "Jan", ldrp: 3.5, kb: 3.2 },
    { month: "Feb", ldrp: 3.8, kb: 3.4 },
    { month: "Mar", ldrp: 4.0, kb: 3.6 },
    { month: "Apr", ldrp: 3.9, kb: 3.5 },
    { month: "May", ldrp: 4.2, kb: 3.8 },
    { month: "Jun", ldrp: 4.2, kb: 3.8 },
  ];
  const admissionTrendData = [
    { month: "Mar", applications: 450 },
    { month: "Apr", applications: 620 },
    { month: "May", applications: 1100 },
    { month: "Jun", applications: 950 },
    { month: "Jul", applications: 1300 },
  ];
  const collegePerformanceData = [
    {
      name: "CM Patel College",
      students: 3456,
      placementRate: 91,
      rating: 4.8,
    },
    { name: "LDRP-ITR", students: 2845, placementRate: 87, rating: 4.6 },
    { name: "KB College", students: 2234, placementRate: 82, rating: 4.4 },
  ];
  const universityHighlights = [
    {
      category: "ACADEMIC",
      title: "NAAC Accreditation",
      text: "LDRP-ITR site visit scheduled in 3 weeks.",
      priority: "high",
      icon: <Award className="h-4 w-4" />,
    },
    {
      category: "ACHIEVEMENT",
      title: "NIRF Ranking",
      text: "CM Patel College ranked in Top 50 Engineering Colleges.",
      priority: "medium",
      icon: <Star className="h-4 w-4" />,
    },
    {
      category: "DEADLINE",
      title: "Research Grants",
      text: "Faculty research grant submissions due this Friday.",
      priority: "high",
      icon: <Target className="h-4 w-4" />,
    },
  ];
  const feeStatusData = [
    { category: "Tuition Fees", pending: 0.8, colorKey: "primary" },
    { category: "Hostel Fees", pending: 0.3, colorKey: "secondary" },
    { category: "Other Fees", pending: 0.1, colorKey: "accent" },
  ];
  const totalPendingFees = feeStatusData.reduce(
    (acc, fee) => acc + fee.pending,
    0
  );

  return (
    <DashboardLayout theme={currentTheme} setTheme={setCurrentTheme}>
      <div className="p-6 space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className={`text-3xl font-bold ${themeConfig.primary.text}`}>
              Dashboard Overview
            </h1>
            <p className={`${themeConfig.textMuted} mt-1`}>
              Welcome back! Here's a real-time summary of your university.
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Academic Year 2024-25
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <MetricCard key={metric.title} {...metric} theme={themeConfig} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Card
            className={`lg:col-span-8 ${themeConfig.border} ${themeConfig.card} shadow-sm`}
          >
            <CardHeader>
              <CardTitle
                className={`text-xl font-semibold ${themeConfig.text}`}
              >
                Revenue Growth Trends
              </CardTitle>
              <CardDescription className={themeConfig.textMuted}>
                Monthly revenue comparison across all colleges (in ₹ Cr)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueGrowthData}>
                  <defs>
                    <linearGradient
                      id="colorPrimary"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={themeConfig.primary.fill}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor={themeConfig.primary.fill}
                        stopOpacity={0}
                      />
                    </linearGradient>
                    <linearGradient
                      id="colorSecondary"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={themeConfig.secondary.fill}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor={themeConfig.secondary.fill}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={themeConfig.border}
                  />
                  <XAxis
                    dataKey="month"
                    stroke={themeConfig.textMuted}
                    fontSize={12}
                  />
                  <YAxis
                    stroke={themeConfig.textMuted}
                    fontSize={12}
                    tickFormatter={(value) => `₹${value}Cr`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: themeConfig.card,
                      borderRadius: "12px",
                      border: `1px solid ${themeConfig.border}`,
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="ldrp"
                    name="LDRP-ITR"
                    stroke={themeConfig.primary.stroke}
                    fill="url(#colorPrimary)"
                    strokeWidth={3}
                  />
                  <Area
                    type="monotone"
                    dataKey="kb"
                    name="KB College"
                    stroke={themeConfig.secondary.stroke}
                    fill="url(#colorSecondary)"
                    strokeWidth={3}
                  />
                  <Area
                    type="monotone"
                    dataKey="cmp"
                    name="CM Patel"
                    stroke={themeConfig.primary.stroke}
                    fill="url(#colorPrimary)"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card
            className={`lg:col-span-4 ${themeConfig.border} ${themeConfig.card}`}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bell className={`h-5 w-5 ${themeConfig.primary.text}`} />
                University Highlights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {universityHighlights.map((item, idx) => (
                <div
                  key={idx}
                  className={`group p-4 rounded-xl ${themeConfig.bg} hover:bg-emerald-50 ${themeConfig.border} hover:border-emerald-200 transition-all`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        item.priority === "high"
                          ? "bg-red-100 text-red-600"
                          : "bg-amber-100 text-amber-600"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary">{item.category}</Badge>
                        {item.priority === "high" && (
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        )}
                      </div>
                      <h4 className={`font-medium ${themeConfig.text} text-sm`}>
                        {item.title}
                      </h4>
                      <p className={`text-xs ${themeConfig.textMuted}`}>
                        {item.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Card
            className={`lg:col-span-7 ${themeConfig.border} ${themeConfig.card}`}
          >
            <CardHeader>
              <CardTitle>College Performance</CardTitle>
              <CardDescription>
                Key metrics for each affiliated college.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>College Name</TableHead>
                    <TableHead className="text-right">Students</TableHead>
                    <TableHead className="text-right">Placement %</TableHead>
                    <TableHead className="text-right">Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {collegePerformanceData.map((college) => (
                    <TableRow key={college.name}>
                      <TableCell className="font-medium">
                        {college.name}
                      </TableCell>
                      <TableCell className="text-right">
                        {college.students.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            college.placementRate >= 90
                              ? "default"
                              : "secondary"
                          }
                        >
                          {college.placementRate}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right flex justify-end items-center gap-1">
                        <Star className="h-4 w-4 text-amber-400 fill-current" />
                        {college.rating}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card
            className={`lg:col-span-5 ${themeConfig.border} ${themeConfig.card}`}
          >
            <CardHeader>
              <CardTitle>Admission Funnel</CardTitle>
              <CardDescription>
                <span
                  className={`text-2xl font-bold ${themeConfig.primary.text}`}
                >
                  3,420{" "}
                </span>
                applications received this cycle (+18%)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={150}>
                <AreaChart data={admissionTrendData}>
                  <defs>
                    <linearGradient
                      id="colorAdmission"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={themeConfig.primary.fill}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor={themeConfig.primary.fill}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: themeConfig.card,
                      border: `1px solid ${themeConfig.border}`,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="applications"
                    stroke={themeConfig.primary.stroke}
                    fill="url(#colorAdmission)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className={`${themeConfig.border} ${themeConfig.card}`}>
            <CardHeader>
              <CardTitle>Pending Fee Collections</CardTitle>
              <CardDescription>
                <span className="text-2xl font-bold text-red-600">
                  ₹{totalPendingFees.toFixed(1)} Cr{" "}
                </span>
                total outstanding from students.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {feeStatusData.map((fee) => {
                const indicatorColor =
                  fee.colorKey === "primary"
                    ? themeConfig.primary.bg
                    : fee.colorKey === "secondary"
                    ? "bg-sky-500"
                    : themeConfig.accent.bg;
                return (
                  <div key={fee.category}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">
                        {fee.category}
                      </span>
                      <span className="text-sm font-bold">
                        ₹{fee.pending} Cr
                      </span>
                    </div>
                    <Progress
                      value={(fee.pending / totalPendingFees) * 100}
                      //   indicatorClassName={indicatorColor}
                    />
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className={`${themeConfig.border} ${themeConfig.card}`}>
            <CardHeader>
              <CardTitle>Hostel Occupancy</CardTitle>
              <CardDescription>
                Current occupancy rate and capacity.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <ResponsiveContainer width={150} height={150}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Occupied", value: 92.2 },
                        { name: "Empty", value: 7.8 },
                      ]}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      startAngle={90}
                      endAngle={-270}
                      paddingAngle={2}
                    >
                      <Cell fill={themeConfig.primary.fill} />
                      <Cell fill={themeConfig.border} />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p
                    className={`text-3xl font-bold ${themeConfig.primary.text}`}
                  >
                    92.2%
                  </p>
                  <p className="text-xs text-slate-500">Occupied</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${themeConfig.primary.bg}`}
                  />
                  <div>
                    <p className="text-sm text-slate-500">Occupied Beds</p>
                    <p className="font-semibold">3,312</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full bg-slate-200`} />
                  <div>
                    <p className="text-sm text-slate-500">Total Capacity</p>
                    <p className="font-semibold">3,590</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
