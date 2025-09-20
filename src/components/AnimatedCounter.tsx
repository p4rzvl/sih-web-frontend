import { useEffect, useState } from "react";

export const AnimatedCounter = ({
  value,
  prefix = "",
  suffix = "",
}: {
  value: any;
  prefix?: string;
  suffix?: string;
}) => {
  const [count, setCount] = useState<number>(0);
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
      {prefix}
      {formattedCount}
      {suffix}
    </span>
  );
};
