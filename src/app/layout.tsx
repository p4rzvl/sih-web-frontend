import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Landmark,
  Users,
  Package2,
  Menu,
  Search,
  Settings,
} from "lucide-react";

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

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VidyaLink ERP System",
  description:
    "VidyaLink is a comprehensive cloud-based Educational Resource Planning (ERP) system that digitally transforms educational institutions by unifying student management, academic operations, finance, hostel services, and alumni engagement into a single integrated platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "#", label: "College Management", icon: Landmark },
    { href: "#", label: "Analytics", icon: LineChart, badge: "Pro" },
    { href: "#", label: "User Management", icon: Users },
  ];

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
