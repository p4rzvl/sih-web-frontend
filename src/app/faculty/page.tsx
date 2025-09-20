// app/faculty/dashboard/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Calendar,
  Users,
  AlertTriangle,
  QrCode,
  BookOpen,
  Mail,
  Eye,
  ChevronDown,
  UserCheck,
  GraduationCap,
  BookOpenCheck,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { THEMES } from "@/lib/theme"; // Make sure this path is correct
import { MetricCard } from "@/components/MetricCard";

// --- [NEW] Animated Counter Component ---
const AnimatedCounter = ({
  value,
  suffix = "",
}: {
  value: any;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const numericValue =
    typeof value === "string"
      ? parseFloat(value.replace(/[^\d.]/g, ""))
      : Number(value);

  useEffect(() => {
    if (isNaN(numericValue)) return;
    let startTime: number | null = null;
    const duration = 1500;
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

  const formattedCount =
    count < 10 && !Number.isInteger(count)
      ? parseFloat(count.toFixed(1))
      : Math.round(count).toLocaleString();

  return (
    <span className="tabular-nums">
      {formattedCount}
      {suffix}
    </span>
  );
};

// --- [NEW] Metric Card Component ---
// --- [UPDATED] MetricCard Component ---
// --- [CORRECTED] MetricCard Component ---

// --- Mock Data ---
const faculty = {
  name: "Dr. Himani Trivedi",
  department: "Computer Science",
  designation: "Assistant Professor",
};

const summaryMetrics = [
  {
    title: "Today's Classes",
    value: 4,
    change: "+1 Lab",
    icon: <Calendar />,
    trend: "up",
  },
  {
    title: "Avg. Performance",
    value: 81,
    suffix: "%",
    change: "+2.5%",
    icon: <GraduationCap />,
    trend: "up",
  },
  {
    title: "Pending Submissions",
    value: 12,
    change: "+3",
    icon: <BookOpenCheck />,
    trend: "down",
  },
  {
    title: "Students at Risk",
    value: 3,
    change: "-1",
    icon: <AlertTriangle />,
    trend: "down",
  },
];

const todaySchedule = [
  {
    subject: "Data Structures",
    time: "09:00 AM",
    room: "CS-201",
    class: "CSE-2A",
    students: 45,
  },
  {
    subject: "Algorithm Analysis",
    time: "11:00 AM",
    room: "CS-301",
    class: "CSE-3B",
    students: 42,
  },
  {
    subject: "Database Systems",
    time: "02:00 PM",
    room: "CS-401",
    class: "CSE-2B",
    students: 48,
  },
];
const pendingTasks = [
  {
    task: "Enter IA marks for Algorithm Analysis",
    priority: "high",
    dueDate: "2 days left",
  },
  {
    task: "Submit attendance for Database Systems",
    priority: "medium",
    dueDate: "1 day left",
  },
];
const classPerformance = [
  {
    class: "CSE-2A",
    subject: "Data Structures",
    avgAttendance: 87,
    avgMarks: 78,
  },
  {
    class: "CSE-3B",
    subject: "Algorithm Analysis",
    avgAttendance: 92,
    avgMarks: 82,
  },
];
const recentActivities = [
  {
    activity: "Attendance marked for Data Structures",
    time: "2 hours ago",
    type: "success",
  },
  {
    activity: "IA marks submitted for approval",
    time: "1 day ago",
    type: "info",
  },
];

export default function FacultyDashboardPage() {
  const themeConfig = THEMES.light;

  return (
    // Added padding to the main container
    <main className="p-4 sm:p-6 lg:p-6 space-y-6">
      {/* --- [NEW] Header Section --- */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className={`${themeConfig.text}`}>Faculty Dashboard</h1>
          <p className="text-slate-600 mt-1">
            Analytics and management for Dr. Himani Trivedi (CSE Dept).
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              Fall Semester 2025
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Fall Semester 2025</DropdownMenuItem>
            <DropdownMenuItem>Spring Semester 2025</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* --- [NEW] Top KPI Cards --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
        {summaryMetrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} theme={themeConfig} />
        ))}
      </div>
      {/* Main Grid Layout (Existing Content) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Schedule Card */}
          <Card className={`${themeConfig.card} `}>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>
                Your classes and lab sessions for today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todaySchedule.map((session, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`rounded-lg p-3 ${themeConfig.primary.bg}/10 ${themeConfig.primary.text}`}
                      >
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{session.subject}</h4>
                        <p className="text-sm text-gray-600">
                          {session.class} • {session.students} students
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{session.time}</p>
                      <p className="text-sm text-gray-600">
                        Room: {session.room}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Class Performance Card */}
          <Card className={`${themeConfig.card} ${themeConfig.borderClass}`}>
            <CardHeader>
              <CardTitle>Class Performance Overview</CardTitle>
              <CardDescription>
                Average attendance and marks across your classes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {classPerformance.map((classData, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">
                        {classData.class} - {classData.subject}
                      </h4>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">
                            Attendance
                          </span>
                          <span className="text-sm font-bold">
                            {classData.avgAttendance}%
                          </span>
                        </div>
                        <Progress
                          value={classData.avgAttendance}
                          className="h-2"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">
                            Avg Marks
                          </span>
                          <span className="text-sm font-bold">
                            {classData.avgMarks}%
                          </span>
                        </div>
                        <Progress value={classData.avgMarks} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Pending Tasks Card */}
          <Card className={`${themeConfig.card} ${themeConfig.borderClass}`}>
            <CardHeader>
              <CardTitle>Pending Tasks</CardTitle>
              <CardDescription>Items requiring your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingTasks.map((task, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 border rounded-lg"
                  >
                    <div
                      className={`w-2.5 h-2.5 rounded-full mt-2 ${
                        task.priority === "high"
                          ? "bg-red-500"
                          : task.priority === "medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    ></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{task.task}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {task.dueDate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4" variant="outline">
                View All Tasks
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card className={`${themeConfig.card} ${themeConfig.borderClass}`}>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start gap-3" variant="outline">
                <QrCode className="h-4 w-4 mr-2" />
                Generate QR Code
              </Button>
              <Button className="w-full justify-start gap-3" variant="outline">
                <BookOpen className="h-4 w-4 mr-2" />
                Enter IA Marks
              </Button>
              <Button className="w-full justify-start gap-3" variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Send Notice
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
