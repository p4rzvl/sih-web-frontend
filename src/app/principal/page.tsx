// app/principal/page.tsx
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
  Users,
  Building2,
  BookOpen,
  TrendingUp,
  Settings,
  UserCheck,
  Briefcase,
  CheckCircle,
  AlertCircle,
  BookOpenCheck,
  Wifi,
  Coffee,
  Users2,
  CalendarCheck, // Added for Faculty Leaves
  LucideIcon,
  TrendingDown,
} from "lucide-react";
import { THEMES } from "@/lib/theme"; // Assuming theme is in lib

// --- Animated Counter Component ---
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

// --- [FIXED] Metric Card Component ---
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
  value: number | string;
  change?: string;
  icon: React.ReactElement;
  prefix?: string;
  suffix?: string;
  trend?: "up" | "down" | "neutral";
  theme: any;
}) => (
  <Card
    className={`relative overflow-hidden h-30 ${theme.borderClass} ${theme.card} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group`}
  >
    <CardContent className="p-4 flex flex-col justify-center h-full">
      <div className="flex items-start justify-between">
        <div
          className={`p-2 rounded-xl ${theme.primary.bg}/10 ${theme.primary.text} group-hover:scale-110 transition-transform`}
        >
          {icon}
        </div>
        {change && (
          <div
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium mt-2 ${
              trend === "up"
                ? "bg-emerald-100 text-emerald-700"
                : trend === "down"
                ? "bg-red-100 text-red-700"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            {trend === "up" && <TrendingUp className="h-3 w-3" />}
            {trend === "down" && <TrendingDown className="h-3 w-3" />}
            {change}
          </div>
        )}
      </div>
      <div className="mt-2">
        <h3 className={`text-sm font-medium ${theme.textMuted}`}>{title}</h3>
        <p className={`text-2xl font-bold ${theme.text} tracking-tight`}>
          <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
        </p>
      </div>
    </CardContent>
  </Card>
);

// --- Main Dashboard Component for Principal ---
export default function PrincipalDashboardPage() {
  const [currentTheme] = useState<string>("blue");
  const themeConfig = THEMES[currentTheme] || THEMES.light;

  // --- Mock Data ---
  const metrics: any[] = [
    {
      title: "Total Students",
      value: 2850,
      change: "+5.2%",
      icon: <Users className="h-5 w-5" />,
      trend: "up",
    },
    {
      title: "Faculty On Leave",
      value: 7,
      change: "+2 Today",
      icon: <UserCheck className="h-5 w-5" />,
      trend: "up",
    },
    {
      title: "Placements YTD",
      value: 782,
      change: "+12.3%",
      icon: <Briefcase className="h-5 w-5" />,
      trend: "up",
    },
    {
      title: "Pending Leave Apps",
      value: 5,
      change: "High",
      icon: <AlertCircle className="h-5 w-5" />,
      trend: "down",
    },
  ];
  const barColors = [
    themeConfig.primary.fill, // Emerald
    themeConfig.tertiary.fill, // Amber
    themeConfig.secondary.fill, // Sky Blue
    themeConfig.accent.fill, // Violet
  ];

  const attendanceData: any[] = [
    { month: "Jan", attendance: 87.5 },
    { month: "Feb", attendance: 89.2 },
    { month: "Mar", attendance: 85.8 },
    { month: "Apr", attendance: 91.3 },
    { month: "May", attendance: 88.7 },
    { month: "Jun", attendance: 92.1 },
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
  ];

  const placementData: any[] = [
    { company: "TCS", students: 85, package: "4.2 LPA" },
    { company: "Infosys", students: 72, package: "4.8 LPA" },
    { company: "Wipro", students: 68, package: "4.5 LPA" },
    { company: "Cognizant", students: 54, package: "5.2 LPA" },
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

  // --- Faculty Leave Data ---
  const facultyLeaveData: any[] = [
    { name: "Approved", value: 22, fill: themeConfig.primary.fill },
    { name: "Pending", value: 5, fill: "#f59e0b" }, // amber-500
    { name: "Rejected", value: 3, fill: "#ef4444" }, // red-500
  ];

  const recentLeaveRequests: any[] = [
    { name: "Dr. Priya Sharma", department: "IT", status: "Approved" },
    { name: "Dr. Amit Patel", department: "Electronics", status: "Pending" },
    { name: "Dr. Sunil Gupta", department: "Mechanical", status: "Approved" },
    { name: "Dr. Meera Shah", department: "Civil", status: "Rejected" },
  ];

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
      text: "Campus security audit completed successfully.",
      icon: Building2,
      type: "Infrastructure",
    },
    {
      time: "2 days ago",
      text: "Dr. Sharma's leave request has been approved.",
      icon: UserCheck,
      type: "HR",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className={` ${themeConfig.text}`}>Hello Dr. H. P. Verma</h1>
          <p className={`${themeConfig.textMuted}`}>
            Welcome back! Here's the college's performance overview.
          </p>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} theme={themeConfig} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Chart */}
        <Card className={`${themeConfig.border} ${themeConfig.card} shadow-sm`}>
          <CardHeader>
            <CardTitle className={`text-xl font-semibold ${themeConfig.text}`}>
              Monthly Attendance Trends
            </CardTitle>
            <CardDescription className={themeConfig.textMuted}>
              Overall student attendance percentage
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

        {/* --- [UPDATED] Placement Chart with Theme Colors --- */}
        <Card className={`${themeConfig.border} ${themeConfig.card} shadow-sm`}>
          <CardHeader>
            <CardTitle className={`text-xl font-semibold ${themeConfig.text}`}>
              Recent Placements
            </CardTitle>
            <CardDescription className={themeConfig.textMuted}>
              Students placed in top companies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={placementData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={themeConfig.border}
                />
                <XAxis
                  dataKey="company"
                  stroke={themeConfig.textMuted}
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke={themeConfig.textMuted}
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: themeConfig.card,
                    borderRadius: "12px",
                    border: `1px solid ${themeConfig.border}`,
                  }}
                  cursor={{ fill: "rgba(100, 116, 139, 0.1)" }}
                />
                <Bar dataKey="students" radius={[4, 4, 0, 0]}>
                  {/* This part maps data to colors from your theme */}
                  {placementData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={barColors[index % barColors.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* HODs and Highlights */}
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
                  <p className="text-xs text-slate-500">92.1% Present Today</p>
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

      {/* Library and Faculty Leave Section */}
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
                <span className="text-sm font-medium">Books Issued Today</span>
                <span className="text-sm font-bold">47</span>
              </div>
              <Progress value={65} className="h-2" />
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Digital Access</span>
                <span className="text-sm font-bold">89%</span>
              </div>
              <Progress value={89} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className={`${themeConfig.border} ${themeConfig.card}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarCheck
                className={`h-5 w-5 ${themeConfig.primary.text}`}
              />
              Faculty Leave Request
            </CardTitle>
            <CardDescription>
              Overview of faculty leave requests and status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-8 items-center">
              {/* Left side: Chart and Custom Legend */}
              <div className="flex items-center justify-center gap-4">
                <ResponsiveContainer width={150} height={150}>
                  <PieChart>
                    <Pie
                      data={facultyLeaveData}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={75}
                      startAngle={90}
                      endAngle={-270}
                      paddingAngle={2}
                      stroke="none"
                    >
                      {facultyLeaveData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2">
                  {facultyLeaveData.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center gap-2 text-sm"
                    >
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: item.fill }}
                      />
                      <span className="text-slate-600">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right side: Recent Requests List */}
              <div className="w-full space-y-2">
                <div className="flex justify-between text-xs font-semibold text-slate-500 pb-2 border-b">
                  <span>Faculty Name</span>
                  <span>Status</span>
                </div>
                {recentLeaveRequests.map((req) => (
                  <div
                    key={req.name}
                    className="flex items-center justify-between py-2 border-b border-slate-100"
                  >
                    <p className="font-medium text-sm">{req.name}</p>
                    <Badge
                      className={`text-xs font-semibold
                ${
                  req.status === "Approved"
                    ? "bg-slate-800 text-white hover:bg-slate-700"
                    : req.status === "Pending"
                    ? "bg-slate-100 text-slate-800 hover:bg-slate-200"
                    : "bg-red-600 text-white hover:bg-red-500"
                }`}
                    >
                      {req.status}
                    </Badge>
                  </div>
                ))}
                <Button
                  variant="ghost"
                  className="w-full justify-center text-sm text-blue-600 h-8 mt-2"
                >
                  View More
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Faculty Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                <span className="text-sm">Associate Profs.</span>
                <span className="font-semibold">45</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Assistant Profs.</span>
                <span className="font-semibold">72</span>
              </div>
            </div>
            <div className={`p-3 rounded-lg ${themeConfig.bg} mt-4`}>
              <div className="text-center">
                <p className={`text-sm ${themeConfig.textMuted}`}>
                  Faculty-Student Ratio
                </p>
                <p className={`text-xl font-bold ${themeConfig.primary.text}`}>
                  1:19.7
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

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

        <Card className={`${themeConfig.border} ${themeConfig.card}`}>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button
              className={`w-full justify-start gap-2 ${themeConfig.primary.bg} ${themeConfig.primary.hover}`}
            >
              <UserCheck className="h-4 w-4" />
              Manage Leaves
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <BookOpen className="h-4 w-4" />
              Generate Reports
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <Briefcase className="h-4 w-4" />
              Placements
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <CalendarCheck className="h-4 w-4" />
              Faculty Leave Policy
            </Button>
            {/* <Button variant="outline" className="w-full justify-start gap-2">
              <Settings className="h-4 w-4" />
              System Settings
            </Button> */}
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
                    <p className="text-sm font-medium mb-1">{activity.text}</p>
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
  );
}
