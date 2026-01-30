import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { Battery, Wifi, Signal, ChevronLeft, Menu, RefreshCw, Bell, AlertCircle, Cloud, Circle } from 'lucide-react';
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
  const [isBooting, setIsBooting] = useState(true);
  const isHome = location.pathname === '/';
  useEffect(() => {
    const timer = setTimeout(() => setIsBooting(false), 2000);
    const notifTimer = setTimeout(() => setShowNotifs(true), 8000);
    return () => { clearTimeout(timer); clearTimeout(notifTimer); };
  }, []);
  const getTitle = () => {
    if (isHome) return 'CF Droid Guide';
    if (location.pathname.startsWith('/topic/')) {
      const parts = location.pathname.split('/');
      const id = parts[parts.length - 1];
      return KNOWLEDGE_BASE[id]?.title || 'Knowledge Brief';
    }
    const routes: Record<string, string> = {
      '/browse': 'Feature Explorer', '/ai-chat': 'AI Studio', '/settings': 'System Settings',
      '/calculator': 'Quota Analytics', '/quizzes': 'Edge Certification', '/templates': 'Code Lab v2.5',
      '/dashboard': 'Health Deck', '/network': 'Edge Map Live', '/share': 'Transfer Link',
      '/profile': 'Architect Hub', '/logs': 'Kernel Logs', '/architecture': 'FlowViz OS',
      '/troubleshooting': 'Diagnostic Hub'
    };
    return routes[location.pathname] || 'System OS';
  };
  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => { setIsSyncing(false); toast.success('Edge Database Synchronized'); }, 1200);
  };
  if (isBooting) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-8 flex flex-col items-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-24 h-24 bg-primary rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(243,128,32,0.5)]">
            <Cloud className="text-white w-16 h-16" />
          </motion.div>
          <div className="space-y-4 w-48">
            <h2 className="text-white font-sketchy text-2xl tracking-widest">CF Droid</h2>
            <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} className="h-full w-1/2 bg-primary" />
            </div>
            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-[0.3em]">Kernel v2.5.0 Final Load</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-black flex items-center justify-center p-0 md:p-4 transition-colors duration-500 overflow-hidden">
      <div className="w-full max-w-md h-[100dvh] md:h-[850px] bg-background shadow-2xl relative overflow-hidden flex flex-col md:rounded-[3rem] border-0 md:border-[12px] border-slate-900">
        <AnimatePresence>
          {showNotifs && (
            <motion.div initial={{ y: -100 }} animate={{ y: 0 }} exit={{ y: -100 }} className="absolute top-8 left-0 right-0 z-[60] px-4 pt-2">
              <div className="bg-slate-900 text-white p-4 rounded-3xl shadow-2xl border border-white/10 flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center"><AlertCircle size={20} /></div>
                <div className="flex-1"><p className="text-xs font-bold uppercase tracking-widest">PWA Update</p><p className="text-[10px] opacity-70">Edge Point Optimization Complete (SFO/LHR).</p></div>
                <button onClick={() => setShowNotifs(false)} className="text-[10px] font-bold uppercase text-primary">Dismiss</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="h-8 px-6 flex items-center justify-between text-[11px] font-medium bg-background z-50 shrink-0">
          <div className="flex items-center gap-2"><span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span><Circle className="w-1.5 h-1.5 fill-emerald-500 text-emerald-500 animate-pulse ml-1" /></div>
          <div className="flex items-center gap-2"><button onClick={() => setShowNotifs(!showNotifs)} className="relative hover:scale-110 transition-transform"><Bell className="w-3.5 h-3.5" /><span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-primary rounded-full" /></button><Signal className="w-3 h-3" /><Wifi className="w-3 h-3" /><Battery className="w-3 h-3" /></div>
        </div>
        <header className={cn("h-16 px-4 flex items-center justify-between gap-4 transition-all duration-300 z-40 shrink-0", isHome ? "bg-background border-b border-dashed" : "bg-primary text-primary-foreground shadow-lg")}>
          <div className="flex items-center gap-4">
            {isHome ? (<AppDrawer><button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors active:scale-90"><Menu className="w-6 h-6" /></button></AppDrawer>) : (<button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-full transition-all active:scale-90"><ChevronLeft className="w-6 h-6" /></button>)}
            <h1 className={cn("text-xl font-bold tracking-tight truncate max-w-[220px]", isHome ? "text-foreground font-sketchy" : "text-primary-foreground font-illustrative")}>{getTitle()}</h1>
          </div>
          {!isHome && (<button onClick={handleSync} className={cn("p-2 hover:bg-white/10 rounded-full transition-all active:rotate-180", isSyncing && "animate-spin")}><RefreshCw className="w-5 h-5" /></button>)}
        </header>
        <main className="flex-1 overflow-hidden relative bg-background">
          <AnimatePresence mode="wait">
            <motion.div key={location.pathname} initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="absolute inset-0 w-full h-full"><Outlet /></motion.div>
          </AnimatePresence>
        </main>
        <BottomNav /><div className="h-6 flex justify-center items-center bg-background shrink-0"><div className="w-24 h-1 bg-muted-foreground/20 rounded-full" /></div>
      </div>
    </div>
  );
}