import React from "react";

interface KpiCardProps{
    title: string;
    value: string | number;
    subtitle: string;
    icon: React.ReactNode;
    iconColor?: string;
    valueColor?: string;
    subtitleColor?: string;
}

export default function KpiCard({
    title,
    value,
    subtitle,
    icon,
    iconColor = "text-on-surface",
    valueColor = "text-on-surface",
    subtitleColor = "text-on-surface-variant"
} : KpiCardProps) {

    return (
         <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm relative overflow-hidden">
      {/* İkon */}
      <div className={`absolute top-0 right-0 p-4 opacity-10 ${iconColor}`}>
        {icon}
      </div>
      
      {/* İçerik */}
      <p className="text-xs font-semibold text-on-surface-variant uppercase mb-1">{title}</p>
      <h4 className={`text-2xl font-bold mb-2 ${valueColor}`}>{value}</h4>
      <span className={`text-xs font-medium ${subtitleColor}`}>{subtitle}</span>
    </div>
    );
}