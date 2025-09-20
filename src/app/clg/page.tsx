// page.tsx
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
  Bar,
  BarChart,
  LineChart,
  Line,
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
  BookOpen,
  GraduationCap,
  Bell,
  TrendingUp,
  Calendar,
  Search,
  Menu,
  Home,
  Settings,
  CircleUser,
  UserCheck,
  BedDouble,
  Briefcase,
  Star,
  Award,
  ChevronRight,
  Target,
  Paintbrush,
  ChevronDown,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingDown,
  BookOpenCheck,
  Wifi,
  Coffee,
  Users2,
  MapPin,
  LucideIcon,
} from "lucide-react";
import { THEMES } from "@/lib/theme";
import { MetricCard } from "@/components/MetricCard";

// Theme configuration

// Animated Counter Component
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
    let startTime: number | undefined;
    const duration = 2000;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min(
        (currentTime - (startTime as number)) / duration,
        1
      );
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

// Mock data
const collegeData: any = {
  name: "Computer Science & Engineering College",
  location: "Gandhinagar, Gujarat",
  established: "1995",
  accreditation: "NAAC A+",
};

const recentActivities: {
  time: string;
  text: string;
  icon: LucideIcon;
  type: string;
}[] = [
  {
    time: "2 hours ago",
    text: "New batch of 120 students registered for Winter 2024.",
    icon: Users,
    type: "Registration",
  },
  {
    time: "4 hours ago",
    text: "Internal assessment results published for all departments.",
    icon: BookOpen,
    type: "Academic",
  },
  {
    time: "1 day ago",
    text: "Hostel maintenance completed in Block A.",
    icon: Building2,
    type: "Infrastructure",
  },
  {
    time: "2 days ago",
    text: "Faculty performance reviews initiated for Q2 2024.",
    icon: UserCheck,
    type: "HR",
  },
];

// Dashboard Layout Component
const DashboardLayout = ({
  children,
  theme,
  setTheme,
}: {
  children: React.ReactNode;
  theme: string;
  setTheme: (theme: string) => void;
}) => {
  const navLinks: any[] = [
    { href: "/", label: "Dashboard", icon: Home, active: true },
    { href: "#", label: "Students", icon: Users },
    { href: "#", label: "Faculty", icon: UserCheck },
    { href: "#", label: "HODs", icon: Users2 },
    { href: "#", label: "Attendance", icon: CheckCircle },
    { href: "#", label: "Placements", icon: Briefcase },
    { href: "#", label: "Library", icon: BookOpen },
    { href: "#", label: "Hostel", icon: BedDouble },
  ];

  const themeConfig = THEMES[theme] || THEMES.light;

  return (
    <div className={`min-h-screen ${themeConfig.bg}`}>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
};

// Main Dashboard Component
export default function CollegeAdminDashboard() {
  const [currentTheme, setCurrentTheme] = useState<string>("light");
  const themeConfig = THEMES[currentTheme] || THEMES.light;

  // Mock data
  const metrics: any[] = [
    {
      title: "Total Students",
      value: 2850,
      change: "+5.2%",
      icon: <Users className="h-5 w-5" />,
      trend: "up",
    },
    {
      title: "Faculty Members",
      value: 145,
      change: "+2.1%",
      icon: <UserCheck className="h-5 w-5" />,
      trend: "up",
    },
    {
      title: "Students Placed",
      value: 782,
      change: "+12.3%",
      icon: <Briefcase className="h-5 w-5" />,
      trend: "up",
    },
    {
      title: "HODs",
      value: 8,
      change: "Stable",
      icon: <Users2 className="h-5 w-5" />,
      trend: "neutral",
    },
  ];

  const attendanceData: any[] = [
    { month: "Jan", attendance: 87.5 },
    { month: "Feb", attendance: 89.2 },
    { month: "Mar", attendance: 85.8 },
    { month: "Apr", attendance: 91.3 },
    { month: "May", attendance: 88.7 },
    { month: "Jun", attendance: 92.1 },
  ];

  const assessmentGrowthData: any[] = [
    { month: "Jan", avg_score: 72 },
    { month: "Feb", avg_score: 75 },
    { month: "Mar", avg_score: 78 },
    { month: "Apr", avg_score: 76 },
    { month: "May", avg_score: 80 },
    { month: "Jun", avg_score: 82 },
  ];

  const hodData: any[] = [
    {
      department: "Computer Science",
      hod: "Dr. Rajesh Kumar",
      experience: "15 years",
      students: 580,
    },
    {
      department: "Information Technology",
      hod: "Dr. Priya Sharma",
      experience: "12 years",
      students: 520,
    },
    {
      department: "Electronics",
      hod: "Dr. Amit Patel",
      experience: "18 years",
      students: 450,
    },
    {
      department: "Mechanical",
      hod: "Dr. Sunil Gupta",
      experience: "20 years",
      students: 490,
    },
    {
      department: "Civil",
      hod: "Dr. Meera Shah",
      experience: "14 years",
      students: 410,
    },
    {
      department: "Chemical",
      hod: "Dr. Rohit Jain",
      experience: "16 years",
      students: 380,
    },
  ];

  const placementData: any[] = [
    { company: "TCS", students: 85, package: "4.2 LPA" },
    { company: "Infosys", students: 72, package: "4.8 LPA" },
    { company: "Wipro", students: 68, package: "4.5 LPA" },
    { company: "Cognizant", students: 54, package: "5.2 LPA" },
    { company: "Accenture", students: 42, package: "5.8 LPA" },
  ];

  const libraryStats: any[] = [
    {
      category: "Total Books",
      count: 45000,
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      category: "Digital Resources",
      count: 8500,
      icon: <Wifi className="h-5 w-5" />,
    },
    {
      category: "Active Members",
      count: 2650,
      icon: <Users className="h-5 w-5" />,
    },
    {
      category: "Study Seats",
      count: 350,
      icon: <Coffee className="h-5 w-5" />,
    },
  ];

  const hostelOccupancyData: any[] = [
    { name: "Occupied", value: 89.5, fill: themeConfig.primary.fill },
    { name: "Available", value: 10.5, fill: "#e5e7eb" },
  ];

  return (
    <DashboardLayout theme={currentTheme} setTheme={setCurrentTheme}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className={`${themeConfig.text}`}>College Dashboard</h1>
            <p className={`${themeConfig.textMuted} `}>
              Welcome back! Here's your college overview for today.
            </p>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <MetricCard key={metric.title} {...metric} theme={themeConfig} />
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Attendance Chart */}
          <Card
            className={`${themeConfig.border} ${themeConfig.card} shadow-sm`}
          >
            <CardHeader>
              <CardTitle
                className={`text-xl font-semibold ${themeConfig.text}`}
              >
                Monthly Attendance Trends
              </CardTitle>
              <CardDescription className={themeConfig.textMuted}>
                Overall attendance percentage across all departments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={attendanceData}>
                  <defs>
                    <linearGradient
                      id="colorAttendance"
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
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={themeConfig.border}
                  />
                  <XAxis
                    dataKey="month"
                    stroke={themeConfig.textMuted}
                    fontSize={12}
                  />
                  <YAxis stroke={themeConfig.textMuted} fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: themeConfig.card,
                      borderRadius: "12px",
                      border: `1px solid ${themeConfig.border}`,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="attendance"
                    stroke={themeConfig.primary.stroke}
                    fill="url(#colorAttendance)"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Internal Assessment Growth */}
          <Card
            className={`${themeConfig.border} ${themeConfig.card} shadow-sm`}
          >
            <CardHeader>
              <CardTitle
                className={`text-xl font-semibold ${themeConfig.text}`}
              >
                Internal Assessment Growth
              </CardTitle>
              <CardDescription className={themeConfig.textMuted}>
                Average assessment scores trend across all students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={assessmentGrowthData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={themeConfig.border}
                  />
                  <XAxis
                    dataKey="month"
                    stroke={themeConfig.textMuted}
                    fontSize={12}
                  />
                  <YAxis stroke={themeConfig.textMuted} fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: themeConfig.card,
                      borderRadius: "12px",
                      border: `1px solid ${themeConfig.border}`,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="avg_score"
                    stroke={themeConfig.secondary.stroke}
                    strokeWidth={3}
                    dot={{
                      fill: themeConfig.secondary.fill,
                      strokeWidth: 2,
                      r: 4,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* HODs and Faculty Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Card
            className={`lg:col-span-8 ${themeConfig.border} ${themeConfig.card}`}
          >
            <CardHeader>
              <CardTitle>Department HODs Overview</CardTitle>
              <CardDescription>
                Head of Departments and their department statistics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead>HOD</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead className="text-right">Students</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hodData.map((hod) => (
                    <TableRow key={hod.department}>
                      <TableCell className="font-medium">
                        {hod.department}
                      </TableCell>
                      <TableCell>{hod.hod}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{hod.experience}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {hod.students}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card
            className={`lg:col-span-4 ${themeConfig.border} ${themeConfig.card}`}
          >
            <CardHeader>
              <CardTitle>Today's Highlights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                className={`p-4 rounded-xl ${themeConfig.bg} ${themeConfig.border}`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-100 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Attendance Status</h4>
                    <p className="text-xs text-slate-500">
                      92.1% Present Today
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`p-4 rounded-xl ${themeConfig.bg} ${themeConfig.border}`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                    <BookOpenCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Library Status</h4>
                    <p className="text-xs text-slate-500">285 Active Users</p>
                  </div>
                </div>
              </div>

              <div
                className={`p-4 rounded-xl ${themeConfig.bg} ${themeConfig.border}`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-100 text-amber-600">
                    <AlertCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Placement Drive</h4>
                    <p className="text-xs text-slate-500">
                      3 Companies This Week
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Placements Section */}
        <Card className={`${themeConfig.border} ${themeConfig.card}`}>
          <CardHeader>
            <CardTitle>Recent Placements</CardTitle>
            <CardDescription>
              Top companies and placement statistics for current academic year
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                {/* <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={placementData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={themeConfig.border}
                    />
                    <XAxis
                      dataKey="company"
                      stroke={themeConfig.textMuted}
                      fontSize={12}
                    />
                    <YAxis stroke={themeConfig.textMuted} fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: themeConfig.card,
                        borderRadius: "12px",
                        border: `1px solid ${themeConfig.border}`,
                      }}
                    />
                    <Bar
                      dataKey="students"
                      fill={themeConfig.primary.fill}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer> */}
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={placementData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={themeConfig.border}
                    />
                    <XAxis
                      dataKey="company"
                      stroke={themeConfig.textMuted}
                      fontSize={12}
                    />
                    <YAxis stroke={themeConfig.textMuted} fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: themeConfig.card,
                        borderRadius: "12px",
                        border: `1px solid ${themeConfig.border}`,
                      }}
                      itemStyle={{ color: "#000000" }} // Tooltip text color
                      labelStyle={{ color: "#000000" }} // Label text color
                    />
                    <Bar
                      dataKey="students"
                      fill={themeConfig.primary.fill}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                {placementData.map((placement, idx) => (
                  <div
                    key={placement.company}
                    className={`flex items-center justify-between p-3 rounded-lg ${themeConfig.bg}`}
                  >
                    <div>
                      <h4 className="font-semibold">{placement.company}</h4>
                      <p className="text-sm text-slate-500">
                        {placement.students} students placed
                      </p>
                    </div>
                    <Badge variant="default">{placement.package}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Library and Hostel Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Library Section */}
          <Card className={`${themeConfig.border} ${themeConfig.card}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className={`h-5 w-5 ${themeConfig.primary.text}`} />
                Library Management
              </CardTitle>
              <CardDescription>
                Current library statistics and resource utilization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {libraryStats.map((stat) => (
                  <div
                    key={stat.category}
                    className={`p-4 rounded-xl ${themeConfig.bg} text-center`}
                  >
                    <div
                      className={`inline-flex p-3 rounded-full ${themeConfig.primary.bg}/10 ${themeConfig.primary.text} mb-2`}
                    >
                      {stat.icon}
                    </div>
                    <p className={`text-2xl font-bold ${themeConfig.text}`}>
                      <AnimatedCounter value={stat.count} />
                    </p>
                    <p className={`text-xs ${themeConfig.textMuted} mt-1`}>
                      {stat.category}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">
                    Books Issued Today
                  </span>
                  <span className="text-sm font-bold">47</span>
                </div>
                <Progress value={65} className="h-2" />

                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Digital Access</span>
                  <span className="text-sm font-bold">89%</span>
                </div>
                <Progress value={89} className="h-2" />

                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">
                    Study Room Occupancy
                  </span>
                  <span className="text-sm font-bold">76%</span>
                </div>
                <Progress value={76} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Hostel Section */}
          <Card className={`${themeConfig.border} ${themeConfig.card}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BedDouble className={`h-5 w-5 ${themeConfig.primary.text}`} />
                Hostel Management
              </CardTitle>
              <CardDescription>
                Current hostel occupancy and facility status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <ResponsiveContainer width={150} height={150}>
                    <PieChart>
                      <Pie
                        data={hostelOccupancyData}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        startAngle={90}
                        endAngle={-270}
                        paddingAngle={2}
                      >
                        {hostelOccupancyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p
                      className={`text-3xl font-bold ${themeConfig.primary.text}`}
                    >
                      89.5%
                    </p>
                    <p className="text-xs text-slate-500">Occupied</p>
                  </div>
                </div>

                <div className="space-y-4 flex-1">
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      className={`p-3 rounded-lg ${themeConfig.bg} text-center`}
                    >
                      <p className={`text-lg font-bold ${themeConfig.text}`}>
                        1,245
                      </p>
                      <p className="text-xs text-slate-500">Occupied Beds</p>
                    </div>
                    <div
                      className={`p-3 rounded-lg ${themeConfig.bg} text-center`}
                    >
                      <p className={`text-lg font-bold ${themeConfig.text}`}>
                        1,390
                      </p>
                      <p className="text-xs text-slate-500">Total Capacity</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Boys Hostel</span>
                      <span className="text-sm font-semibold">91.2%</span>
                    </div>
                    <Progress value={91.2} className="h-2" />

                    <div className="flex justify-between items-center">
                      <span className="text-sm">Girls Hostel</span>
                      <span className="text-sm font-semibold">87.8%</span>
                    </div>
                    <Progress value={87.8} className="h-2" />
                  </div>

                  <div className={`p-3 rounded-lg ${themeConfig.bg} mt-4`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">
                          All Facilities Operational
                        </span>
                      </div>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Faculty Performance and Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Faculty Quick Stats */}
          <Card className={`${themeConfig.border} ${themeConfig.card}`}>
            <CardHeader>
              <CardTitle>Faculty Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Faculty</span>
                <span className="text-2xl font-bold">145</span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Professors</span>
                  <span className="font-semibold">28</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Associate Professors</span>
                  <span className="font-semibold">45</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Assistant Professors</span>
                  <span className="font-semibold">72</span>
                </div>
              </div>

              <div className={`p-3 rounded-lg ${themeConfig.bg} mt-4`}>
                <div className="text-center">
                  <p className={`text-sm ${themeConfig.textMuted}`}>
                    Faculty-Student Ratio
                  </p>
                  <p
                    className={`text-xl font-bold ${themeConfig.primary.text}`}
                  >
                    1:19.7
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attendance Summary */}
          <Card className={`${themeConfig.border} ${themeConfig.card}`}>
            <CardHeader>
              <CardTitle>Today's Attendance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className={`text-3xl font-bold ${themeConfig.primary.text}`}>
                  92.1%
                </p>
                <p className={`text-sm ${themeConfig.textMuted}`}>
                  Overall Attendance
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">First Year</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">94.2%</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm">Second Year</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">91.8%</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm">Third Year</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">89.5%</span>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm">Fourth Year</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">93.7%</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className={`${themeConfig.border} ${themeConfig.card}`}>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className={`w-full justify-start gap-2 ${themeConfig.primary.bg} ${themeConfig.primary.hover}`}
              >
                <UserCheck className="h-4 w-4" />
                Mark Attendance
              </Button>

              <Button variant="outline" className="w-full justify-start gap-2">
                <BookOpen className="h-4 w-4" />
                Generate Report
              </Button>

              <Button variant="outline" className="w-full justify-start gap-2">
                <Briefcase className="h-4 w-4" />
                Add Placement
              </Button>

              <Button variant="outline" className="w-full justify-start gap-2">
                <BedDouble className="h-4 w-4" />
                Hostel Management
              </Button>

              <Button variant="outline" className="w-full justify-start gap-2">
                <Settings className="h-4 w-4" />
                System Settings
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities Footer */}
        <Card className={`${themeConfig.border} ${themeConfig.card}`}>
          <CardHeader>
            <CardTitle>Recent System Activities</CardTitle>
            <CardDescription>
              Latest updates and system notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {recentActivities.map((activity, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl ${themeConfig.bg} hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg ${themeConfig.primary.bg}/10 ${themeConfig.primary.text} mt-1`}
                    >
                      <activity.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <Badge variant="secondary" className="text-xs mb-2">
                        {activity.type}
                      </Badge>
                      <p className="text-sm font-medium mb-1">
                        {activity.text}
                      </p>
                      <p className={`text-xs ${themeConfig.textMuted}`}>
                        {activity.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

// import React, { useEffect, useState } from "react";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   Cell,
//   Legend,
//   Pie,
//   PieChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
//   Bar,
//   BarChart,
//   LineChart,
//   Line,
// } from "recharts";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Progress } from "@/components/ui/progress";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Input } from "@/components/ui/input";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import {
//   Users,
//   Building2,
//   BookOpen,
//   GraduationCap,
//   Bell,
//   TrendingUp,
//   Calendar,
//   Search,
//   Menu,
//   Home,
//   Settings,
//   CircleUser,
//   UserCheck,
//   BedDouble,
//   Briefcase,
//   Star,
//   Award,
//   ChevronRight,
//   Target,
//   Paintbrush,
//   ChevronDown,
//   Clock,
//   CheckCircle,
//   AlertCircle,
//   TrendingDown,
//   BookOpenCheck,
//   Wifi,
//   Coffee,
//   Users2,
//   MapPin,
// } from "lucide-react";

// // Theme configuration
// const THEMES = {
//   light: {
//     name: "Default",
//     bg: "bg-slate-50",
//     card: "bg-white",
//     text: "text-slate-900",
//     textMuted: "text-slate-600",
//     border: "border-slate-200",
//     primary: {
//       bg: "bg-emerald-500",
//       hover: "hover:bg-emerald-600",
//       text: "text-emerald-600",
//       stroke: "#059669",
//       fill: "#10b981",
//     },
//     secondary: { stroke: "#0ea5e9", fill: "#38bdf8" },
//     accent: { bg: "bg-violet-500", stroke: "#8b5cf6", fill: "#a78bfa" },
//   },
//   blue: {
//     name: "Blue",
//     bg: "bg-blue-50",
//     card: "bg-white",
//     text: "text-slate-900",
//     textMuted: "text-blue-900/70",
//     border: "border-blue-200",
//     primary: {
//       bg: "bg-blue-600",
//       hover: "hover:bg-blue-700",
//       text: "text-blue-700",
//       stroke: "#2563eb",
//       fill: "#3b82f6",
//     },
//     secondary: { stroke: "#0891b2", fill: "#06b6d4" },
//     accent: { bg: "bg-indigo-500", stroke: "#6366f1", fill: "#818cf8" },
//   },
//   green: {
//     name: "Green",
//     bg: "bg-green-50",
//     card: "bg-white",
//     text: "text-slate-900",
//     textMuted: "text-green-900/70",
//     border: "border-green-200",
//     primary: {
//       bg: "bg-green-600",
//       hover: "hover:bg-green-700",
//       text: "text-green-700",
//       stroke: "#15803d",
//       fill: "#16a34a",
//     },
//     secondary: { stroke: "#0d9488", fill: "#14b8a6" },
//     accent: { bg: "bg-lime-500", stroke: "#65a30d", fill: "#84cc16" },
//   },
// };

// // Animated Counter Component
// const AnimatedCounter = ({ value, prefix = "", suffix = "" } : {value: any , prefix?: string, suffix?: string}) => {
//   const [count, setCount] = useState(0);
//   const numericValue = typeof value === "string"
//     ? parseFloat(value.replace(/[^\d.]/g, ""))
//     : value;

//   useEffect(() => {
//     if (isNaN(numericValue)) return;
//     let startTime: number;
//     const duration = 2000;
//     const animate = (currentTime: number) => {
//       if (!startTime) startTime = currentTime;
//       const progress = Math.min((currentTime - startTime) / duration, 1);
//       const easeOutQuart = 1 - Math.pow(1 - progress, 4);
//       setCount(numericValue * easeOutQuart);
//       if (progress < 1) requestAnimationFrame(animate);
//       else setCount(numericValue);
//     };
//     requestAnimationFrame(animate);
//   }, [numericValue]);

//   const formattedCount = Number.isInteger(count)
//     ? count.toLocaleString()
//     : parseFloat(count.toFixed(1)).toLocaleString();

//   return (
//     <span className="tabular-nums">
//       {prefix}{formattedCount}{suffix}
//     </span>
//   );
// };

// // Metric Card Component
// const MetricCard = ({ title, value, change, icon, prefix = "", suffix = "", trend = "up", theme }) => (
//   <Card className={relative overflow-hidden ${theme.border} ${theme.card} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group}>
//     <CardContent className="relative p-6">
//       <div className="flex items-start justify-between">
//         <div className={p-3 rounded-xl ${theme.primary.bg}/10 ${theme.primary.text} group-hover:scale-110 transition-transform}>
//           {icon}
//         </div>
//         <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
//           trend === "up" ? "bg-emerald-100 text-emerald-700" :
//           trend === "down" ? "bg-red-100 text-red-700" :
//           "bg-slate-100 text-slate-700"
//         }`}>
//           {trend === "up" && <TrendingUp className="h-3 w-3" />}
//           {trend === "down" && <TrendingDown className="h-3 w-3" />}
//           {change}
//         </div>
//       </div>
//       <div className="mt-4">
//         <h3 className={text-sm font-medium ${theme.textMuted}}>{title}</h3>
//         <p className={text-2xl font-bold ${theme.text} tracking-tight mt-1}>
//           <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
//         </p>
//       </div>
//     </CardContent>
//   </Card>
// );

// // Mock data
// const collegeData = {
//   name: "Computer Science & Engineering College",
//   location: "Gandhinagar, Gujarat",
//   established: "1995",
//   accreditation: "NAAC A+",
// };

// const recentActivities = [
//   { time: "2 hours ago", text: "New batch of 120 students registered for Winter 2024.", icon: Users, type: "Registration" },
//   { time: "4 hours ago", text: "Internal assessment results published for all departments.", icon: BookOpen, type: "Academic" },
//   { time: "1 day ago", text: "Hostel maintenance completed in Block A.", icon: Building2, type: "Infrastructure" },
//   { time: "2 days ago", text: "Faculty performance reviews initiated for Q2 2024.", icon: UserCheck, type: "HR" },
// ];

// // Dashboard Layout Component
// const DashboardLayout = ({ children, theme, setTheme }) => {
//   const navLinks = [
//     { href: "/", label: "Dashboard", icon: Home, active: true },
//     { href: "#", label: "Students", icon: Users },
//     { href: "#", label: "Faculty", icon: UserCheck },
//     { href: "#", label: "HODs", icon: Users2 },
//     { href: "#", label: "Attendance", icon: CheckCircle },
//     { href: "#", label: "Placements", icon: Briefcase },
//     { href: "#", label: "Library", icon: BookOpen },
//     { href: "#", label: "Hostel", icon: BedDouble },
// //   ];

//   const themeConfig = THEMES[theme] || THEMES.light;

//   return (
//     <div className={min-h-screen ${themeConfig.bg}}>
//       <div className="grid min-h-screen w-full md:grid-cols-[280px_1fr]">
//         {/* Sidebar */}
//         <div className={hidden border-r ${themeConfig.border} ${themeConfig.card} md:block sticky top-0 h-screen overflow-y-auto}>
//           <div className="flex h-full flex-col">
//             <div className={flex h-16 items-center border-b ${themeConfig.border} px-6 sticky top-0 ${themeConfig.card} z-10}>
//               <div className="flex items-center gap-3">
//                 <div className={p-2 rounded-xl ${themeConfig.primary.bg}}>
//                   <GraduationCap className="h-6 w-6 text-white" />
//                 </div>
//                 <div>
//                   <h1 className={font-bold text-lg ${themeConfig.primary.text}}>
//                     CSE College
//                   </h1>
//                   <p className={text-xs font-medium ${themeConfig.textMuted}}>
//                     Admin Portal
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="flex-1 overflow-auto py-4">
//               <nav className="space-y-1 px-4">
//                 {navLinks.map((link) => (
//                   <a
//                     key={link.label}
//                     href={link.href}
//                     className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
//                       link.active
//                         ? ${themeConfig.primary.bg} text-white shadow-md
//                         : ${themeConfig.textMuted} hover:bg-slate-100 hover:text-slate-900
//                     }`}
//                   >
//                     <link.icon className={h-5 w-5 ${link.active ? "text-white" : "text-slate-500"}} />
//                     <span className="flex-1">{link.label}</span>
//                     <ChevronRight className={`h-4 w-4 transition-transform ${
//                       link.active ? "text-white/70" : "text-slate-400 group-hover:translate-x-1"
//                     }`} />
//                   </a>
//                 ))}
//               </nav>
//             </div>

//             <div className={border-t ${themeConfig.border} p-4 sticky bottom-0 ${themeConfig.card}}>
//               <Card className={${themeConfig.bg} ${themeConfig.border}}>
//                 <CardContent className="p-3">
//                   <h3 className={font-semibold text-sm ${themeConfig.text} mb-2}>
//                     {collegeData.name}
//                   </h3>
//                   <p className={text-xs ${themeConfig.textMuted}}>
//                     {collegeData.location}
//                   </p>
//                   <p className={text-xs ${themeConfig.textMuted} mt-1}>
//                     Est. {collegeData.established} • {collegeData.accreditation}
//                   </p>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="flex flex-col">
//           <header className={flex h-16 items-center gap-4 border-b ${themeConfig.border} ${themeConfig.card} px-6 justify-between sticky top-0 z-10}>
//             <div className="flex items-center">
//               <Sheet>
//                 <SheetTrigger asChild>
//                   <Button variant="outline" size="icon" className="shrink-0 md:hidden mr-4">
//                     <Menu className="h-5 w-5" />
//                   </Button>
//                 </SheetTrigger>
//                 <SheetContent side="left" className="w-72">
//                   {/* Mobile Nav Content */}
//                 </SheetContent>
//               </Sheet>

//               <div className="hidden md:block">
//                 <div className="relative">
//                   <Search className={absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${themeConfig.textMuted}} />
//                   <Input
//                     placeholder="Search students, faculty..."
//                     className={pl-10 ${themeConfig.card} ${themeConfig.border} w-64}
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center gap-3">
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="outline" className="gap-2">
//                     <Paintbrush className="h-4 w-4" />
//                     <span className="hidden md:block">Theme</span>
//                     <ChevronDown className="h-4 w-4" />
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end" className="w-48">
//                   <DropdownMenuLabel>Select Theme</DropdownMenuLabel>
//                   <DropdownMenuSeparator />
//                   {Object.entries(THEMES).map(([key, themeOption]) => (
//                     <DropdownMenuItem key={key} onClick={() => setTheme(key)}>
//                       <div className={w-4 h-4 rounded mr-2 ${themeOption.primary.bg}} />
//                       {themeOption.name}
//                     </DropdownMenuItem>
//                   ))}
//                 </DropdownMenuContent>
//               </DropdownMenu>

//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button size="icon" variant="ghost" className="relative">
//                     <Bell className="h-5 w-5" />
//                     <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"></span>
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end" className="w-80">
//                   <DropdownMenuLabel>Recent Activities</DropdownMenuLabel>
//                   <DropdownMenuSeparator />
//                   {recentActivities.slice(0, 4).map((item, idx) => (
//                     <DropdownMenuItem key={idx} className="items-start gap-3">
//                       <div className={p-2 mt-1 rounded-lg ${themeConfig.primary.bg}/10 ${themeConfig.primary.text}}>
//                         <item.icon className="h-4 w-4" />
//                       </div>
//                       <div>
//                         <p className="text-xs text-wrap">{item.text}</p>
//                         <p className="text-xs text-slate-500">{item.time}</p>
//                       </div>
//                     </DropdownMenuItem>
//                   ))}
//                 </DropdownMenuContent>
//               </DropdownMenu>

//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="ghost" className="gap-2">
//                     <div className="flex items-center gap-2">
//                       <div className="text-right hidden md:block">
//                         <p className="text-sm font-medium">Dr. Admin</p>
//                         <p className={text-xs ${themeConfig.textMuted}}>Principal</p>
//                       </div>
//                       <div className={h-8 w-8 rounded-full ${themeConfig.primary.bg} flex items-center justify-center}>
//                         <CircleUser className="h-5 w-5 text-white" />
//                       </div>
//                     </div>
//                   </Button>
//                 </DropdownMenuTrigger>
//               </DropdownMenu>
//             </div>
//           </header>

//           <main className="flex-1 overflow-auto">{children}</main>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main Dashboard Component
// export default function CollegeAdminDashboard() {
//   const [currentTheme, setCurrentTheme] = useState("light");
//   const themeConfig = THEMES[currentTheme] || THEMES.light;

//   // Mock data
//   const metrics = [
//     {
//       title: "Total Students",
//       value: 2850,
//       change: "+5.2%",
//       icon: <Users className="h-5 w-5" />,
//       trend: "up",
//     },
//     {
//       title: "Faculty Members",
//       value: 145,
//       change: "+2.1%",
//       icon: <UserCheck className="h-5 w-5" />,
//       trend: "up",
//     },
//     {
//       title: "Students Placed",
//       value: 782,
//       change: "+12.3%",
//       icon: <Briefcase className="h-5 w-5" />,
//       trend: "up",
//     },
//     {
//       title: "HODs",
//       value: 8,
//       change: "Stable",
//       icon: <Users2 className="h-5 w-5" />,
//       trend: "neutral",
//     },
//   ];

//   const attendanceData = [
//     { month: "Jan", attendance: 87.5 },
//     { month: "Feb", attendance: 89.2 },
//     { month: "Mar", attendance: 85.8 },
//     { month: "Apr", attendance: 91.3 },
//     { month: "May", attendance: 88.7 },
//     { month: "Jun", attendance: 92.1 },
//   ];

//   const assessmentGrowthData = [
//     { month: "Jan", avg_score: 72 },
//     { month: "Feb", avg_score: 75 },
//     { month: "Mar", avg_score: 78 },
//     { month: "Apr", avg_score: 76 },
//     { month: "May", avg_score: 80 },
//     { month: "Jun", avg_score: 82 },
//   ];

//   const hodData = [
//     { department: "Computer Science", hod: "Dr. Rajesh Kumar", experience: "15 years", students: 580 },
//     { department: "Information Technology", hod: "Dr. Priya Sharma", experience: "12 years", students: 520 },
//     { department: "Electronics", hod: "Dr. Amit Patel", experience: "18 years", students: 450 },
//     { department: "Mechanical", hod: "Dr. Sunil Gupta", experience: "20 years", students: 490 },
//     { department: "Civil", hod: "Dr. Meera Shah", experience: "14 years", students: 410 },
//     { department: "Chemical", hod: "Dr. Rohit Jain", experience: "16 years", students: 380 },
//   ];

//   const placementData = [
//     { company: "TCS", students: 85, package: "4.2 LPA" },
//     { company: "Infosys", students: 72, package: "4.8 LPA" },
//     { company: "Wipro", students: 68, package: "4.5 LPA" },
//     { company: "Cognizant", students: 54, package: "5.2 LPA" },
//     { company: "Accenture", students: 42, package: "5.8 LPA" },
//   ];

//   const libraryStats = [
//     { category: "Total Books", count: 45000, icon: <BookOpen className="h-5 w-5" /> },
//     { category: "Digital Resources", count: 8500, icon: <Wifi className="h-5 w-5" /> },
//     { category: "Active Members", count: 2650, icon: <Users className="h-5 w-5" /> },
//     { category: "Study Seats", count: 350, icon: <Coffee className="h-5 w-5" /> },
//   ];

//   const hostelOccupancyData = [
//     { name: "Occupied", value: 89.5, fill: themeConfig.primary.fill },
//     { name: "Available", value: 10.5, fill: "#e5e7eb" },
//   ];

//   return (
//     <DashboardLayout theme={currentTheme} setTheme={setCurrentTheme}>
//       <div className="p-6 space-y-6">
//         {/* Header */}
//         <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//           <div>
//             <h1 className={text-3xl font-bold ${themeConfig.primary.text}}>
//               College Dashboard
//             </h1>
//             <p className={${themeConfig.textMuted} mt-1}>
//               Welcome back! Here's your college overview for today.
//             </p>
//           </div>
//           <Button variant="outline" className="gap-2">
//             <Calendar className="h-4 w-4" />
//             Academic Year 2024-25
//           </Button>
//         </div>

//         {/* Metrics Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           {metrics.map((metric) => (
//             <MetricCard key={metric.title} {...metric} theme={themeConfig} />
//           ))}
//         </div>

//         {/* Charts Row 1 */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Attendance Chart */}
//           <Card className={${themeConfig.border} ${themeConfig.card} shadow-sm}>
//             <CardHeader>
//               <CardTitle className={text-xl font-semibold ${themeConfig.text}}>
//                 Monthly Attendance Trends
//               </CardTitle>
//               <CardDescription className={themeConfig.textMuted}>
//                 Overall attendance percentage across all departments
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <ResponsiveContainer width="100%" height={300}>
//                 <AreaChart data={attendanceData}>
//                   <defs>
//                     <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%" stopColor={themeConfig.primary.fill} stopOpacity={0.8} />
//                       <stop offset="95%" stopColor={themeConfig.primary.fill} stopOpacity={0} />
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid strokeDasharray="3 3" stroke={themeConfig.border} />
//                   <XAxis dataKey="month" stroke={themeConfig.textMuted} fontSize={12} />
//                   <YAxis stroke={themeConfig.textMuted} fontSize={12} />
//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: themeConfig.card,
//                       borderRadius: "12px",
//                       border: 1px solid ${themeConfig.border},
//                     }}
//                   />
//                   <Area
//                     type="monotone"
//                     dataKey="attendance"
//                     stroke={themeConfig.primary.stroke}
//                     fill="url(#colorAttendance)"
//                     strokeWidth={3}
//                   />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>

//           {/* Internal Assessment Growth */}
//           <Card className={${themeConfig.border} ${themeConfig.card} shadow-sm}>
//             <CardHeader>
//               <CardTitle className={text-xl font-semibold ${themeConfig.text}}>
//                 Internal Assessment Growth
//               </CardTitle>
//               <CardDescription className={themeConfig.textMuted}>
//                 Average assessment scores trend across all students
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={assessmentGrowthData}>
//                   <CartesianGrid strokeDasharray="3 3" stroke={themeConfig.border} />
//                   <XAxis dataKey="month" stroke={themeConfig.textMuted} fontSize={12} />
//                   <YAxis stroke={themeConfig.textMuted} fontSize={12} />
//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: themeConfig.card,
//                       borderRadius: "12px",
//                       border: 1px solid ${themeConfig.border},
//                     }}
//                   />
//                   <Line
//                     type="monotone"
//                     dataKey="avg_score"
//                     stroke={themeConfig.secondary.stroke}
//                     strokeWidth={3}
//                     dot={{ fill: themeConfig.secondary.fill, strokeWidth: 2, r: 4 }}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </div>

//         {/* HODs and Faculty Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//           <Card className={lg:col-span-8 ${themeConfig.border} ${themeConfig.card}}>
//             <CardHeader>
//               <CardTitle>Department HODs Overview</CardTitle>
//               <CardDescription>
//                 Head of Departments and their department statistics
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Department</TableHead>
//                     <TableHead>HOD</TableHead>
//                     <TableHead>Experience</TableHead>
//                     <TableHead className="text-right">Students</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {hodData.map((hod) => (
//                     <TableRow key={hod.department}>
//                       <TableCell className="font-medium">{hod.department}</TableCell>
//                       <TableCell>{hod.hod}</TableCell>
//                       <TableCell>
//                         <Badge variant="secondary">{hod.experience}</Badge>
//                       </TableCell>
//                       <TableCell className="text-right font-semibold">
//                         {hod.students}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>

//           <Card className={lg:col-span-4 ${themeConfig.border} ${themeConfig.card}}>
//             <CardHeader>
//               <CardTitle>Today's Highlights</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className={p-4 rounded-xl ${themeConfig.bg} ${themeConfig.border}}>
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 rounded-lg bg-green-100 text-green-600">
//                     <CheckCircle className="h-4 w-4" />
//                   </div>
//                   <div>
//                     <h4 className="font-medium text-sm">Attendance Status</h4>
//                     <p className="text-xs text-slate-500">92.1% Present Today</p>
//                   </div>
//                 </div>
//               </div>

//               <div className={p-4 rounded-xl ${themeConfig.bg} ${themeConfig.border}}>
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
//                     <BookOpenCheck className="h-4 w-4" />
//                   </div>
//                   <div>
//                     <h4 className="font-medium text-sm">Library Status</h4>
//                     <p className="text-xs text-slate-500">285 Active Users</p>
//                   </div>
//                 </div>
//               </div>

//               <div className={p-4 rounded-xl ${themeConfig.bg} ${themeConfig.border}}>
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 rounded-lg bg-amber-100 text-amber-600">
//                     <AlertCircle className="h-4 w-4" />
//                   </div>
//                   <div>
//                     <h4 className="font-medium text-sm">Placement Drive</h4>
//                     <p className="text-xs text-slate-500">3 Companies This Week</p>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Placements Section */}
//         <Card className={${themeConfig.border} ${themeConfig.card}}>
//           <CardHeader>
//             <CardTitle>Recent Placements</CardTitle>
//             <CardDescription>
//               Top companies and placement statistics for current academic year
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <div>
//                 <ResponsiveContainer width="100%" height={250}>
//                   <BarChart data={placementData}>
//                     <CartesianGrid strokeDasharray="3 3" stroke={themeConfig.border} />
//                     <XAxis dataKey="company" stroke={themeConfig.textMuted} fontSize={12} />
//                     <YAxis stroke={themeConfig.textMuted} fontSize={12} />
//                     <Tooltip
//                       contentStyle={{
//                         backgroundColor: themeConfig.card,
//                         borderRadius: "12px",
//                         border: 1px solid ${themeConfig.border},
//                       }}
//                     />
//                     <Bar dataKey="students" fill={themeConfig.primary.fill} radius={[4, 4, 0, 0]} />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//               <div className="space-y-3">
//                 {placementData.map((placement, idx) => (
//                   <div key={placement.company} className={flex items-center justify-between p-3 rounded-lg ${themeConfig.bg}}>
//                     <div>
//                       <h4 className="font-semibold">{placement.company}</h4>
//                       <p className="text-sm text-slate-500">{placement.students} students placed</p>
//                     </div>
//                     <Badge variant="default">{placement.package}</Badge>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Library and Hostel Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Library Section */}
//           <Card className={${themeConfig.border} ${themeConfig.card}}>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <BookOpen className={h-5 w-5 ${themeConfig.primary.text}} />
//                 Library Management
//               </CardTitle>
//               <CardDescription>
//                 Current library statistics and resource utilization
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-2 gap-4 mb-6">
//                 {libraryStats.map((stat) => (
//                   <div key={stat.category} className={p-4 rounded-xl ${themeConfig.bg} text-center}>
//                     <div className={inline-flex p-3 rounded-full ${themeConfig.primary.bg}/10 ${themeConfig.primary.text} mb-2}>
//                       {stat.icon}
//                     </div>
//                     <p className={text-2xl font-bold ${themeConfig.text}}>
//                       <AnimatedCounter value={stat.count} />
//                     </p>
//                     <p className={text-xs ${themeConfig.textMuted} mt-1}>
//                       {stat.category}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               <div className="space-y-3">
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm font-medium">Books Issued Today</span>
//                   <span className="text-sm font-bold">47</span>
//                 </div>
//                 <Progress value={65} className="h-2" />

//                 <div className="flex justify-between items-center">
//                   <span className="text-sm font-medium">Digital Access</span>
//                   <span className="text-sm font-bold">89%</span>
//                 </div>
//                 <Progress value={89} className="h-2" />

//                 <div className="flex justify-between items-center">
//                   <span className="text-sm font-medium">Study Room Occupancy</span>
//                   <span className="text-sm font-bold">76%</span>
//                 </div>
//                 <Progress value={76} className="h-2" />
//               </div>
//             </CardContent>
//           </Card>

//           {/* Hostel Section */}
//           <Card className={${themeConfig.border} ${themeConfig.card}}>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <BedDouble className={h-5 w-5 ${themeConfig.primary.text}} />
//                 Hostel Management
//               </CardTitle>
//               <CardDescription>
//                 Current hostel occupancy and facility status
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="flex flex-col md:flex-row items-center gap-6">
//                 <div className="relative">
//                   <ResponsiveContainer width={150} height={150}>
//                     <PieChart>
//                       <Pie
//                         data={hostelOccupancyData}
//                         dataKey="value"
//                         cx="50%"
//                         cy="50%"
//                         innerRadius={50}
//                         outerRadius={70}
//                         startAngle={90}
//                         endAngle={-270}
//                         paddingAngle={2}
//                       >
//                         {hostelOccupancyData.map((entry, index) => (
//                           <Cell key={cell-${index}} fill={entry.fill} />
//                         ))}
//                       </Pie>
//                     </PieChart>
//                   </ResponsiveContainer>
//                   <div className="absolute inset-0 flex flex-col items-center justify-center">
//                     <p className={text-3xl font-bold ${themeConfig.primary.text}}>
//                       89.5%
//                     </p>
//                     <p className="text-xs text-slate-500">Occupied</p>
//                   </div>
//                 </div>

//                 <div className="space-y-4 flex-1">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className={p-3 rounded-lg ${themeConfig.bg} text-center}>
//                       <p className={text-lg font-bold ${themeConfig.text}}>1,245</p>
//                       <p className="text-xs text-slate-500">Occupied Beds</p>
//                     </div>
//                     <div className={p-3 rounded-lg ${themeConfig.bg} text-center}>
//                       <p className={text-lg font-bold ${themeConfig.text}}>1,390</p>
//                       <p className="text-xs text-slate-500">Total Capacity</p>
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <div className="flex justify-between items-center">
//                       <span className="text-sm">Boys Hostel</span>
//                       <span className="text-sm font-semibold">91.2%</span>
//                     </div>
//                     <Progress value={91.2} className="h-2" />

//                     <div className="flex justify-between items-center">
//                       <span className="text-sm">Girls Hostel</span>
//                       <span className="text-sm font-semibold">87.8%</span>
//                     </div>
//                     <Progress value={87.8} className="h-2" />
//                   </div>

//                   <div className={p-3 rounded-lg ${themeConfig.bg} mt-4}>
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                         <span className="text-sm">All Facilities Operational</span>
//                       </div>
//                       <CheckCircle className="h-4 w-4 text-green-600" />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Faculty Performance and Quick Stats */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Faculty Quick Stats */}
//           <Card className={${themeConfig.border} ${themeConfig.card}}>
//             <CardHeader>
//               <CardTitle>Faculty Overview</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <span className="text-sm">Total Faculty</span>
//                 <span className="text-2xl font-bold">145</span>
//               </div>

//               <div className="space-y-3">
//                 <div className="flex justify-between">
//                   <span className="text-sm">Professors</span>
//                   <span className="font-semibold">28</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-sm">Associate Professors</span>
//                   <span className="font-semibold">45</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-sm">Assistant Professors</span>
//                   <span className="font-semibold">72</span>
//                 </div>
//               </div>

//               <div className={p-3 rounded-lg ${themeConfig.bg} mt-4}>
//                 <div className="text-center">
//                   <p className={text-sm ${themeConfig.textMuted}}>Faculty-Student Ratio</p>
//                   <p className={text-xl font-bold ${themeConfig.primary.text}}>1:19.7</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Attendance Summary */}
//           <Card className={${themeConfig.border} ${themeConfig.card}}>
//             <CardHeader>
//               <CardTitle>Today's Attendance</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="text-center">
//                 <p className={text-3xl font-bold ${themeConfig.primary.text}}>92.1%</p>
//                 <p className={text-sm ${themeConfig.textMuted}}>Overall Attendance</p>
//               </div>

//               <div className="space-y-3">
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm">First Year</span>
//                   <div className="flex items-center gap-2">
//                     <span className="text-sm font-semibold">94.2%</span>
//                     <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                   </div>
//                 </div>

//                 <div className="flex justify-between items-center">
//                   <span className="text-sm">Second Year</span>
//                   <div className="flex items-center gap-2">
//                     <span className="text-sm font-semibold">91.8%</span>
//                     <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                   </div>
//                 </div>

//                 <div className="flex justify-between items-center">
//                   <span className="text-sm">Third Year</span>
//                   <div className="flex items-center gap-2">
//                     <span className="text-sm font-semibold">89.5%</span>
//                     <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
//                   </div>
//                 </div>

//                 <div className="flex justify-between items-center">
//                   <span className="text-sm">Fourth Year</span>
//                   <div className="flex items-center gap-2">
//                     <span className="text-sm font-semibold">93.7%</span>
//                     <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Quick Actions */}
//           <Card className={${themeConfig.border} ${themeConfig.card}}>
//             <CardHeader>
//               <CardTitle>Quick Actions</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               <Button className={w-full justify-start gap-2 ${themeConfig.primary.bg} ${themeConfig.primary.hover}}>
//                 <UserCheck className="h-4 w-4" />
//                 Mark Attendance
//               </Button>

//               <Button variant="outline" className="w-full justify-start gap-2">
//                 <BookOpen className="h-4 w-4" />
//                 Generate Report
//               </Button>

//               <Button variant="outline" className="w-full justify-start gap-2">
//                 <Briefcase className="h-4 w-4" />
//                 Add Placement
//               </Button>

//               <Button variant="outline" className="w-full justify-start gap-2">
//                 <BedDouble className="h-4 w-4" />
//                 Hostel Management
//               </Button>

//               <Button variant="outline" className="w-full justify-start gap-2">
//                 <Settings className="h-4 w-4" />
//                 System Settings
//               </Button>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Recent Activities Footer */}
//         <Card className={${themeConfig.border} ${themeConfig.card}}>
//           <CardHeader>
//             <CardTitle>Recent System Activities</CardTitle>
//             <CardDescription>Latest updates and system notifications</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//               {recentActivities.map((activity, idx) => (
//                 <div key={idx} className={p-4 rounded-xl ${themeConfig.bg} hover:shadow-md transition-shadow}>
//                   <div className="flex items-start gap-3">
//                     <div className={p-2 rounded-lg ${themeConfig.primary.bg}/10 ${themeConfig.primary.text} mt-1}>
//                       <activity.icon className="h-4 w-4" />
//                     </div>
//                     <div className="flex-1">
//                       <Badge variant="secondary" className="text-xs mb-2">
//                         {activity.type}
//                       </Badge>
//                       <p className="text-sm font-medium mb-1">{activity.text}</p>
//                       <p className={text-xs ${themeConfig.textMuted}}>{activity.time}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </DashboardLayout>
//   );
// }
