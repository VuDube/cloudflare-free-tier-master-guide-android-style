import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, AlertTriangle, ShieldAlert, Cpu, Database, Cloud, RefreshCw, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
export function TroubleshootingPage() {
  const [checking, setChecking] = useState(false);
  const [activeCat, setActiveCat] = useState<'Connectivity' | 'Compute' | 'Storage' | null>(null);
  const handleCheck = () => {
    setChecking(true);
    setTimeout(() => setChecking(false), 2000);
  };
  const solutions = {
    Connectivity: [
      { q: "521 Web Server Is Down", edge: "Origin unreachable via TLS/SSL.", fix: "Check origin port 443 availability." },
      { q: "1001 DNS Resolution", edge: "CName flattening mismatch.", fix: "Verify DNS records match Dashboard settings." }
    ],
    Compute: [
      { q: "1101 Worker Exception", edge: "Runtime crash in V8 isolate.", fix: "Use wrangler tail to capture uncaught errors." },
      { q: "1015 Rate Limited", edge: "Free quota (100k/day) exhausted.", fix: "Monitor usage via Analytics Deck." }
    ],
    Storage: [
      { q: "D1 Storage Limit", edge: "Database reached 500MB cap.", fix: "Run vacuum or purge legacy table rows." },
      { q: "KV Consistency Lag", edge: "Global propagation delay.", fix: "Use Strongly Consistent headers if required." }
    ]
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12 h-full flex flex-col space-y-8">
      <header className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-destructive/10 rounded-2xl">
              <Stethoscope className="text-destructive" size={24} />
            </div>
            <h2 className="text-2xl font-sketchy">Diag Hub</h2>
          </div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">System Health & Recovery</p>
        </div>
        <Button 
          variant="outline" 
          className="rounded-xl border-dashed gap-2" 
          onClick={handleCheck}
          disabled={checking}
        >
          {checking ? <RefreshCw size={16} className="animate-spin" /> : <ShieldAlert size={16} />}
          {checking ? "Checking..." : "Full Scan"}
        </Button>
      </header>
      <section className="bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] p-6 border-4 border-dashed border-slate-200 dark:border-slate-800 text-center space-y-4">
        <div className="flex justify-center gap-4">
          <Cloud size={32} className={checking ? "animate-pulse text-blue-400" : "text-emerald-500"} />
          <Cpu size={32} className={checking ? "animate-pulse text-primary" : "text-emerald-500"} />
          <Database size={32} className={checking ? "animate-pulse text-amber-400" : "text-emerald-500"} />
        </div>
        <div>
          <h3 className="font-bold uppercase tracking-widest text-sm">
            {checking ? "Analytic Kernel Pulse..." : "System Status: Nominal"}
          </h3>
          <p className="text-[10px] text-muted-foreground italic">Last edge-wide diagnostic performed 2m ago.</p>
        </div>
      </section>
      <div className="grid grid-cols-3 gap-2">
        {Object.keys(solutions).map((cat) => (
          <Button
            key={cat}
            variant={activeCat === cat ? "default" : "outline"}
            className="h-12 rounded-xl text-[10px] font-bold uppercase tracking-tighter"
            onClick={() => setActiveCat(cat as any)}
          >
            {cat}
          </Button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-4 pb-20">
        {activeCat ? solutions[activeCat].map((sol, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="p-5 border-dashed border-2 rounded-3xl space-y-3">
              <div className="flex justify-between items-start">
                <Badge variant="destructive" className="text-[8px] font-bold">{sol.q}</Badge>
                <AlertTriangle size={14} className="text-amber-500" />
              </div>
              <p className="text-xs font-bold leading-tight">{sol.edge}</p>
              <div className="p-3 bg-emerald-500/5 rounded-xl border border-emerald-500/20 flex gap-3">
                <CheckCircle size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-[10px] italic leading-relaxed text-emerald-700 dark:text-emerald-400">
                  <span className="font-bold">Recovery:</span> {sol.fix}
                </p>
              </div>
            </Card>
          </motion.div>
        )) : (
          <div className="py-20 text-center opacity-20 flex flex-col items-center gap-4">
            <Stethoscope size={64} />
            <p className="font-illustrative text-xl uppercase tracking-widest">Awaiting Diagnostic Selection</p>
          </div>
        )}
      </div>
    </div>
  );
}