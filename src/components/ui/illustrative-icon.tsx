import React from 'react';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';
interface IllustrativeIconProps {
  iconName: string;
  className?: string;
  size?: number;
  color?: string;
}
export function IllustrativeIcon({ iconName, className, size = 24, color = "currentColor" }: IllustrativeIconProps) {
  const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.HelpCircle;
  return (
    <div className={cn("relative inline-flex items-center justify-center p-3", className)}>
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        viewBox="0 0 100 100"
        fill={color}
        preserveAspectRatio="none"
      >
        <path d="M10,20 Q40,5 90,20 Q105,50 85,85 Q45,100 15,80 Q-5,50 10,20 Z" />
      </svg>
      <IconComponent 
        size={size} 
        style={{ color: color }}
        strokeWidth={2}
        className="relative z-10"
      />
    </div>
  );
}