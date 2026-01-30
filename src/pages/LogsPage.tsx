import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Activity, Trash2, Play, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
interface LogEntry {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS';
  message: string;
}
export function LogsPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isPaused) return;
    const mockEvents = [
      { level: 'INFO', message: "Worker 'auth-router' deployed to 330 nodes." },
      { level: 'SUCCESS', message: "R2 Bucket 'assets-v2' created successfully." },
      { level: 'INFO', message: "D1 Database 'users' executed schema migration." },
      { level: 'WARN', message: "Worker 'image-resizer' CPU threshold (8ms) reached." },
      { level: 'ERROR', message: "AI Inference 'llama-3' failed: Rate limit exceeded." },
      { level: 'INFO', message: "KV Namespace 'config-store' write synchronized." },
      { level: 'INFO', message: "Edge Request: [GET] /api/v1/health from SFO node." }
    ];
    const interval = setInterval(() => {
      const event = mockEvents[Math.floor(Math.random() * mockEvents.length)];
      const newLog: LogEntry = {
        id: Math.random().toString(36).substring(2, 9),
        timestamp: new Date().toLocaleTimeString(),
        level: event.level as any,
        message: event.message
      };
      setLogs(prev => [...prev.slice(-49), newLog]);
    }, 2000);
    return () => clearInterval(interval);
  }, [isPaused]);
  useEffect(() => {
    if (scrollRef.current && !isPaused) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, isPaused]);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12 h-full flex flex-col">
      <header className="flex items-center justify-between mb-6 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-slate-900 rounded-2xl">
            <Terminal size={24} className="text-emerald-500" />
          </div>
          <div>
            <h2 className="text-2xl font-sketchy">System Logs</h2>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Live Edge Telemetry</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-xl border-dashed"
            onClick={() => setIsPaused(!isPaused)}
          >
            {isPaused ? <Play size={16} className="text-emerald-500" /> : <Square size={16} className="text-amber-500" />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-xl border-dashed"
            onClick={() => setLogs([])}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </header>
      <div className="flex-1 bg-slate-950 rounded-[2rem] border-4 border-slate-900 shadow-2xl p-6 font-mono overflow-hidden flex flex-col">
        <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
          <span className="text-[10px] text-white/30 ml-2 uppercase tracking-widest">kernel_log_v2.5</span>
        </div>
        <div ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar space-y-2 text-[10px]">
          {logs.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-white/10 italic">
              <Activity size={32} className="mb-2" />
              <p>Establishing Edge Stream...</p>
            </div>
          )}
          {logs.map((log) => (
            <div key={log.id} className="flex gap-3 leading-tight animate-in fade-in slide-in-from-left-2">
              <span className="text-white/20 shrink-0">[{log.timestamp}]</span>
              <span className={cn(
                "font-bold shrink-0 w-12",
                log.level === 'SUCCESS' ? "text-emerald-500" :
                log.level === 'WARN' ? "text-amber-500" :
                log.level === 'ERROR' ? "text-red-500" : "text-blue-500"
              )}>
                {log.level}
              </span>
              <span className="text-white/80">{log.message}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 p-4 bg-muted/30 rounded-2xl border border-dashed text-[10px] text-center text-muted-foreground flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        Streaming encrypted logs from 330 globally distributed points of presence.
      </div>
    </div>
  );
}