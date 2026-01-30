import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Zap, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
export function BottomNav() {
  const location = useLocation();
  const navItems = [
    { label: 'Home', icon: Home, path: '/' },
    { label: 'Browse', icon: Compass, path: '/browse' },
    { label: 'AI Tools', icon: Zap, path: '/ai-chat' },
    { label: 'Settings', icon: Settings, path: '/settings' },
  ];
  return (
    <nav className="h-16 border-t bg-background flex items-center justify-around px-2 z-50">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center gap-1 px-3 py-1 rounded-xl transition-all",
              isActive ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <item.icon className={cn("w-5 h-5 transition-transform", isActive && "scale-110")} />
            <span className="text-[10px] font-medium tracking-tight uppercase">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}