import { TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { AnimatedCounter } from "./AnimatedCounter";

export const MetricCard = ({
  title,
  value,
  change,
  icon,
  key,
  prefix = "",
  suffix = "",
  trend = "up",
  theme,
}: {
  title: any;
  key?: string;
  value: number | string;
  change?: string;
  icon: React.ReactElement;
  prefix?: string;
  suffix?: string;
  trend?: "up" | "down" | "neutral" | string;
  theme: any;
}) => (
  <Card
    key={key}
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
          <AnimatedCounter value={value} suffix={suffix} />
        </p>
      </div>
    </CardContent>
  </Card>
);
