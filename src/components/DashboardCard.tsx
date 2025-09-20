"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  theme: any;
  className?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  icon,
  children,
  theme,
  className = "",
}) => (
  <Card className={`${theme.borderClass} ${theme.card} shadow-sm ${className}`}>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        {icon && <span className={theme.primary.text}>{icon}</span>}
        {title}
      </CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);
