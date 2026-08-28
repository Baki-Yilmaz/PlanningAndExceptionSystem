import React from "react";

interface DashboardCardProps{
    title: string;
    value: string | number;
    icon: React.ReactNode;
    iconColor?: string;
    bgColor?: string;
}

export default function DashboardCard({
    title,
    value,
    icon,
    iconColor = "text-primary",
    bgColor = "bg-primary/10"
} : DashboardCardProps) {
    return (
        <div className="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant shadow-sm transition-transform hover:-translate-y-1">
          <div className="flex items-center gap-4">
            <div className= {`p-3 rounded-xl ${bgColor} ${iconColor}`}>
              {icon}
            </div>

            <div>
              <p className="text-xs font-semibold text-on-surface-variant uppercase">{title}</p>
              <h4 className="text-2xl font-bold text-on-surface">{value} Adet</h4>
            </div>
          </div>
        </div>
    );
}