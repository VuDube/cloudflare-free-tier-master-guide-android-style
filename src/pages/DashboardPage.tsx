import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, ShieldCheck, Cpu, Database, HardDrive, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
export function DashboardPage() {
  const services = [
    { name: 'Workers', status: 'Operational', icon: Cpu, color: 'text-blue-500', usage: 45 },
    { name: 'D1 Database', status: 'Operational', icon: Database, color: 'text-amber-500', usage: 82 },
    { name: 'R2 Storage', status: 'Operational', icon: HardDrive, color: 'text-purple-500', usage: 12 },
    { name: 'AI Inference', status: 'Degraded', icon: Activity, color: 'text-destructive', usage: 98 },
  ];
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12 h-full flex flex-col">
      <div className="space-y-8 flex-1 overflow-y-auto no-scrollbar pb-24">
        <header className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-2xl">
                <ShieldCheck className="text-primary" />
              </div>
              <h2 className="text-2xl font-sketchy">Health View</h2>
            </div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">System Telemetry</p>
          </div>
          <Badge variant="outline" className="border-emerald-500 text-emerald-500 font-mono text-[10px]">
            v2.5_STABLE
          </Badge>
        </header>
        <div className="grid grid-cols-1 gap-4">
          {services.map((svc) => (
            <Card key={svc.name} className="p-4 border-dashed rounded-3xl flex items-center gap-4 hover:bg-muted/30 transition-all">
              <div className={cn("p-3 rounded-2xl bg-muted/50", svc.color)}>
                <svc.icon size={24} />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-sm uppercase tracking-tight">{svc.name}</h3>
                  <span className={cn(
                    "text-[9px] font-bold px-2 py-0.5 rounded-full border",
                    svc.status === 'Operational' ? "border-emerald-500/30 text-emerald-500" : "border-destructive/30 text-destructive"
                  )}>
                    {svc.status}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={cn("h-full", svc.usage > 90 ? "bg-destructive" : svc.usage > 70 ? "bg-amber-500" : "bg-primary")}
                      style={{ width: `${svc.usage}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono font-bold w-8 text-right">{svc.usage}%</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <section className="space-y-4">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1 flex items-center gap-2">
            <AlertTriangle size={12} className="text-amber-500" />
            Resource Alerts
          </h3>
          <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-2xl border-2 border-dashed border-amber-200 dark:border-amber-900">
            <div className="flex gap-3">
              <div className="shrink-0 w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                <Database className="w-4 h-4 text-amber-500" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-amber-800 dark:text-amber-200">D1 Storage Near Limit</p>
                <p className="text-[10px] text-amber-700/70 dark:text-amber-400">
                  D1 "main-db" is at 410MB/500MB (82%). Consider optimizing schemas.
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="text-center pt-8">
          <p className="text-[8px] uppercase font-bold tracking-[0.5em] opacity-30">Heartbeat: Last Sync 2s ago</p>
        </div>
      </div>
    </div>
  );
}