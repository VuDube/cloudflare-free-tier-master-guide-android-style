import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Battery, Wifi, Signal, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BottomNav } from './BottomNav';
export function AndroidShell({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-black flex items-center justify-center p-0 md:p-4 transition-colors duration-500">
      <div className="w-full max-w-md h-[100dvh] md:h-[850px] bg-background shadow-2xl relative overflow-hidden flex flex-col md:rounded-[3rem] border-[8px] border-slate-900">
        {/* Status Bar */}
        <div className="h-8 px-6 flex items-center justify-between text-[11px] font-medium bg-background z-50 shrink-0">
          <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <div className="flex items-center gap-1.5">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-3 h-3" />
          </div>
        </div>
        {/* App Bar / Header */}
        <header className={cn(
          "h-16 px-4 flex items-center gap-4 transition-all duration-300 z-40 shrink-0",
          isHome ? "bg-background" : "bg-primary text-primary-foreground shadow-md"
        )}>
          {!isHome && (
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          <h1 className={cn(
            "text-xl font-bold tracking-tight",
            isHome ? "text-foreground font-sketchy" : "text-primary-foreground font-illustrative"
          )}>
            {isHome ? 'CF Droid Guide' : 'Knowledge Brief'}
          </h1>
        </header>
        {/* Viewport with Transitions */}
        <main className="flex-1 overflow-y-auto no-scrollbar relative bg-background">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute inset-0 w-full h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
        {/* Bottom Navigation */}
        <BottomNav />
        {/* Home Indicator */}
        <div className="h-6 flex justify-center items-center bg-background shrink-0">
          <div className="w-24 h-1 bg-muted-foreground/20 rounded-full" />
        </div>
      </div>
    </div>
  );
}