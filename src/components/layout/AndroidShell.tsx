import React, { useState } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { Battery, Wifi, Signal, ChevronLeft, Menu, RefreshCw, Bell, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BottomNav } from './BottomNav';
import { AppDrawer } from './AppDrawer';
import { KNOWLEDGE_BASE } from '@/data/knowledgeBase';
import { toast } from 'sonner';
export function AndroidShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSyncing, setIsSyncing] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const isHome = location.pathname === '/';
  const getTitle = () => {
    if (isHome) return 'CF Droid Guide';
    if (location.pathname.startsWith('/topic/')) {
      const parts = location.pathname.split('/');
      const id = parts[parts.length - 1];
      return KNOWLEDGE_BASE[id]?.title || 'Brief';
    }
    if (location.pathname === '/browse') return 'Search 2.0';
    if (location.pathname === '/ai-chat') return 'AI Studio';
    if (location.pathname === '/settings') return 'System Settings';
    if (location.pathname === '/calculator') return 'Quota Calc';
    if (location.pathname === '/quizzes') return 'Technical Quiz';
    if (location.pathname === '/templates') return 'Code Lab';
    if (location.pathname === '/dashboard') return 'Health Deck';
    if (location.pathname === '/network') return 'Edge Map';
    if (location.pathname === '/share') return 'Share Link';
    return 'Knowledge Brief';
  };
  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      toast.success('System database synchronized');
    }, 1200);
  };
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-black flex items-center justify-center p-0 md:p-4 transition-colors duration-500">
      <div className="w-full max-w-md h-[100dvh] md:h-[850px] bg-background shadow-2xl relative overflow-hidden flex flex-col md:rounded-[3rem] border-[8px] border-slate-900">
        {/* PWA Notification Drawer */}
        <AnimatePresence>
          {showNotifs && (
            <motion.div
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              exit={{ y: -100 }}
              className="absolute top-8 left-0 right-0 z-[60] px-4 pt-2"
            >
              <div className="bg-slate-900 text-white p-4 rounded-3xl shadow-2xl border border-white/10 flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <AlertCircle size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-widest">System Update</p>
                  <p className="text-[10px] opacity-70">Worker limits reset in 2 hours.</p>
                </div>
                <button onClick={() => setShowNotifs(false)} className="text-[10px] font-bold uppercase text-primary">Dismiss</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Status Bar */}
        <div className="h-8 px-6 flex items-center justify-between text-[11px] font-medium bg-background z-50 shrink-0">
          <div className="flex items-center gap-2">
            <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowNotifs(!showNotifs)} className="relative">
              <Bell className="w-3.5 h-3.5" />
              <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-primary rounded-full" />
            </button>
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-3 h-3" />
          </div>
        </div>
        {/* App Bar / Header */}
        <header className={cn(
          "h-16 px-4 flex items-center justify-between gap-4 transition-all duration-300 z-40 shrink-0",
          isHome ? "bg-background border-b border-dashed" : "bg-primary text-primary-foreground shadow-md"
        )}>
          <div className="flex items-center gap-4">
            {isHome ? (
              <AppDrawer>
                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                  <Menu className="w-6 h-6" />
                </button>
              </AppDrawer>
            ) : (
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
            <h1 className={cn(
              "text-xl font-bold tracking-tight truncate max-w-[200px]",
              isHome ? "text-foreground font-sketchy" : "text-primary-foreground font-illustrative"
            )}>
              {getTitle()}
            </h1>
          </div>
          {!isHome && (
            <button
              onClick={handleSync}
              className={cn(
                "p-2 hover:bg-white/10 rounded-full transition-all",
                isSyncing && "animate-spin"
              )}
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          )}
        </header>
        {/* Viewport */}
        <main className="flex-1 overflow-y-auto no-scrollbar relative bg-background">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute inset-0 w-full h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
        <BottomNav />
        {/* Home Indicator */}
        <div className="h-6 flex justify-center items-center bg-background shrink-0">
          <div className="w-24 h-1 bg-muted-foreground/20 rounded-full" />
        </div>
      </div>
    </div>
  );
}