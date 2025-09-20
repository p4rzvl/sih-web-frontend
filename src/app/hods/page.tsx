// app/mentor/hods/page.tsx
"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Megaphone,
  BarChart3,
  MessageSquare,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { THEMES } from "@/lib/theme";
import { MetricCard } from "@/components/MetricCard";

// --- Mock / demo data ---
const passFailDropout = [
  { name: "Pass", value: 82, color: "#10b981" }, // green
  { name: "Fail", value: 10, color: "#ef4444" }, // red
  { name: "Dropout", value: 8, color: "#f59e0b" }, // amber
];

const placementOverview = {
  placedPercent: "71",
  avgPackage: 6.4, // LPA
  trend: [
    { year: "2020", placed: 45 },
    { year: "2021", placed: 55 },
    { year: "2022", placed: 60 },
    { year: "2023", placed: 62 },
    { year: "2024", placed: 68 },
    { year: "2025", placed: 71 },
  ],
};
const attendanceSummary = {
  average: 84, // average attendance % across dept
};

const upcomingEvents = [
  {
    title: "Industry Interaction: Cloud Security",
    date: "Oct 02, 2025",
    time: "10:00 AM",
  },
  { title: "Research Paper Workshop", date: "Oct 10, 2025", time: "2:00 PM" },
  {
    title: "Semester Exam Committee Meeting",
    date: "Oct 15, 2025",
    time: "11:00 AM",
  },
];

const departmentStats = {
  totalStudents: 420, // 👈 number of students in the department
};

// --- Page component ---
export default function HODDashboard() {
  const theme = THEMES.light;

  return (
    <div className={`min-h-screen ${theme.bg}`}>
      <main className="p-4 sm:p-6 lg:p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`${theme.text}`}>HOD Dashboard</h1>
            <p className={`${theme.textMuted}`}>
              Overview — Academic health, placements, events and feedback
              (department).
            </p>
          </div>
        </div>

        {/* Top metrics row */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <MetricCard
            title="Pass Rate"
            value={passFailDropout[0].value}
            suffix="%"
            theme={theme}
            icon={<BarChart3 className="h-5 w-5 " />}
          />
          <MetricCard
            title="Placed Students"
            value={placementOverview.placedPercent}
            suffix="%"
            theme={theme}
            icon={<Calendar className="h-5 w-5 " />}
          />
          <MetricCard
            title="Total Students"
            value={departmentStats.totalStudents}
            theme={theme}
            icon={<MessageSquare className="h-5 w-5 " />}
          />
          <MetricCard
            title={
              <span>
                Attendance Summary
                <span className="font-normal text-slate-500 ml-1">
                  ( January )
                </span>
              </span>
            }
            value={attendanceSummary.average}
            suffix="%"
            theme={theme}
            icon={<BarChart3 className="h-5 w-5 " />}
          />
        </div>

        {/* --- [CORRECTED & RESTRUCTURED] Main Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* --- Left Column (Charts) --- */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pass / Fail / Dropout Card */}
            <Card className={`${theme.card} ${theme.borderClass} shadow-sm`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" /> Academic Performance
                </CardTitle>
                <CardDescription>
                  Pass / Fail / Dropout distribution (this semester)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-full md:w-1/2" style={{ height: 260 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart
                        margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
                      >
                        <Pie
                          data={passFailDropout}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={70}
                          paddingAngle={4}
                          labelLine={true}
                          label={(entry) => `${entry.name} (${entry.value}%)`}
                        >
                          {passFailDropout.map((entry, idx) => (
                            <Cell key={idx} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="w-full md:w-1/2 space-y-3">
                    {passFailDropout.map((p) => (
                      <div
                        key={p.name}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            style={{ background: p.color }}
                            className="h-3 w-3 rounded-full inline-block"
                          />
                          <div>
                            <p className="text-sm font-medium">{p.name}</p>
                            <p className={`text-xs ${theme.textMuted}`}>
                              Share of students
                            </p>
                          </div>
                        </div>
                        <div className="font-semibold">{p.value}%</div>
                      </div>
                    ))}
                    <div className="mt-3">
                      <p className="text-sm text-slate-500">
                        Note: dropout = students who withdrew mid-semester. Use
                        the student profile for details.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Placement Overview Card */}
            <Card className={`${theme.card} ${theme.borderClass} shadow-sm`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" /> Placement Overview
                </CardTitle>
                <CardDescription>
                  Placement % trend across recent years
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="md:col-span-1 flex flex-col justify-center gap-4">
                    <div>
                      <h3 className="text-sm text-slate-500">
                        Placed Percentage
                      </h3>
                      <p className="text-3xl font-bold">
                        {placementOverview.placedPercent}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Average Package</p>
                      <p className="text-2xl font-semibold">
                        {placementOverview.avgPackage} LPA
                      </p>
                    </div>
                  </div>
                  <div className="md:col-span-2" style={{ height: 200 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={placementOverview.trend}
                        margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e6e6e6" />
                        <XAxis dataKey="year" stroke="#6b7280" fontSize={12} />
                        <YAxis stroke="#6b7280" fontSize={12} unit="%" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#fff",
                            borderRadius: "0.5rem",
                            border: "1px solid #e2e8f0",
                          }}
                          cursor={{
                            stroke: "#cbd5e1",
                            strokeWidth: 1,
                            strokeDasharray: "3 3",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="placed"
                          name="Placed (%)"
                          stroke="#059669"
                          strokeWidth={3}
                          dot={{ r: 4, fill: "#059669" }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* --- Right Column (Upcoming Events) --- */}
          {/* --- Right Column: Upcoming Events (Themed) --- */}
          <div className="lg:col-span-1 space-y-6">
            <Card className={`${theme.card} ${theme.borderClass} shadow-sm`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {/* Icon now uses the primary theme color */}
                  <Calendar className={`h-5 w-5 ${theme.primary.text}`} />
                  Upcoming Events
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Department events & important dates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingEvents.map((ev) => (
                  <div
                    key={ev.title}
                    className="flex items-start justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      {/* Event icon background and color now use the theme */}
                      <div
                        className={`p-2 rounded-lg ${theme.primary.bg}/10 ${theme.primary.text}`}
                      >
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{ev.title}</p>
                        {/* Using a standard muted color for the date/time */}
                        <p className="text-xs text-slate-600">
                          {ev.date} • {ev.time}
                        </p>
                      </div>
                    </div>
                    <div>
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="pt-2 border-t border-slate-100">
                  {/* Button now uses theme colors for hover effect */}
                  <Button
                    variant="ghost"
                    className={`w-full justify-start gap-2 text-slate-600 hover:${theme.primary.text} hover:bg-emerald-50`}
                  >
                    <Megaphone className="h-4 w-4" /> Create Event
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
