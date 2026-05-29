import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, Cpu, Database, Brain, RotateCcw, Activity, Shield, Network, Globe, Video, Image as ImageIcon, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
export function CalculatorPage() {
  const [activeCategory, setActiveCategory] = useState('compute');
  const [isStressTesting, setIsStressTesting] = useState(false);
  const [usage, setUsage] = useState<Record<string, number>>({
    workers: 50000, kv: 100000, d1: 50, r2: 5, ai: 5000,
    images: 1000, stream: 2, tunnel: 1, turnstile: 10000,
    queues: 50000, vectorize: 1000, email: 10, logic: 50,
    cache: 10, trace: 5
  });
  const limits = {
    workers: 100000, kv: 500000, d1: 500, r2: 10, ai: 10000,
    images: 5000, stream: 10, tunnel: 10, turnstile: 100000,
    queues: 1000000, vectorize: 10000, email: 100, logic: 100,
    cache: 100, trace: 50
  };
  useEffect(() => {
    let interval: number;
    if (isStressTesting) {
      interval = window.setInterval(() => {
        setUsage(prev => {
          const next = { ...prev };
          Object.keys(next).forEach(key => {
            const delta = (Math.random() - 0.45) * (limits[key as keyof typeof limits] * 0.05);
            next[key] = Math.max(0, Math.min(limits[key as keyof typeof limits], next[key] + delta));
          });
          return next;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isStressTesting]);
  const handleReset = () => {
    setIsStressTesting(false);
    setUsage({
      workers: 50000, kv: 100000, d1: 50, r2: 5, ai: 5000,
      images: 1000, stream: 2, tunnel: 1, turnstile: 10000,
      queues: 50000, vectorize: 1000, email: 10, logic: 50,
      cache: 10, trace: 5
    });
  };
  const calculateUsage = (val: number, limit: number) => Math.min(100, Math.max(0, (val / limit) * 100));
  const categories = {
    compute: [
      { id: 'workers', label: 'Workers', icon: Cpu, unit: 'req/day' },
      { id: 'queues', label: 'Queues', icon: Activity, unit: 'msg/day' },
      { id: 'logic', label: 'Workflows', icon: Network, unit: 'steps' }
    ],
    storage: [
      { id: 'kv', label: 'KV', icon: Database, unit: 'reads' },
      { id: 'd1', label: 'D1 SQL', icon: Database, unit: 'MB' },
      { id: 'r2', label: 'R2 Object', icon: Database, unit: 'GB' }
    ],
    intelligence: [
      { id: 'ai', label: 'Workers AI', icon: Brain, unit: 'neurons' },
      { id: 'vectorize', label: 'Vectorize', icon: Globe, unit: 'vectors' },
      { id: 'turnstile', label: 'Turnstile', icon: Shield, unit: 'challenges' }
    ],
    media: [
      { id: 'images', label: 'Images', icon: ImageIcon, unit: 'transforms' },
      { id: 'stream', label: 'Stream', icon: Video, unit: 'minutes' }
    ]
  };
  const totalUsage = Object.keys(usage).reduce((acc, key) => acc + calculateUsage(usage[key], limits[key as keyof typeof limits]), 0) / Object.keys(usage).length;
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col">
      <div className="py-8 space-y-8 pb-24 overflow-y-auto no-scrollbar flex-1">
        <header className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-sketchy flex items-center gap-2"><Calculator className="text-primary" /> Quota 15</h2>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">15-Service Ecosystem Sim</p>
          </div>
          <Button variant="ghost" size="icon" onClick={handleReset} className="rounded-full"><RotateCcw size={20} /></Button>
        </header>
        <section className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border-2 border-dashed border-primary/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Full System Load</h3>
            <div className="flex items-center gap-2">
              <Label htmlFor="stress" className="text-[9px] font-bold uppercase">Stress Mode</Label>
              <Switch id="stress" checked={isStressTesting} onCheckedChange={setIsStressTesting} />
            </div>
          </div>
          <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div animate={{ width: `${totalUsage}%` }} className={cn("h-full transition-colors", totalUsage > 85 ? "bg-destructive" : totalUsage > 50 ? "bg-amber-500" : "bg-emerald-500")} />
          </div>
        </section>
        <Tabs defaultValue="compute" className="w-full" onValueChange={setActiveCategory}>
          <TabsList className="grid grid-cols-4 rounded-2xl h-12 bg-muted/40 p-1 mb-6">
            <TabsTrigger value="compute" className="text-[9px] font-bold uppercase">Compute</TabsTrigger>
            <TabsTrigger value="storage" className="text-[9px] font-bold uppercase">Storage</TabsTrigger>
            <TabsTrigger value="intelligence" className="text-[9px] font-bold uppercase">AI/Sec</TabsTrigger>
            <TabsTrigger value="media" className="text-[9px] font-bold uppercase">Media</TabsTrigger>
          </TabsList>
          {Object.entries(categories).map(([catId, items]) => (
            <TabsContent key={catId} value={catId} className="space-y-4">
              {items.map((item) => {
                const u = usage[item.id];
                const l = limits[item.id as keyof typeof limits];
                const pct = calculateUsage(u, l);
                return (
                  <Card key={item.id} className="p-4 border-dashed rounded-2xl bg-background/50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <item.icon size={14} className="text-primary" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold">{Math.round(pct)}%</span>
                    </div>
                    <Slider
                      value={[u]}
                      max={l}
                      onValueChange={([v]) => setUsage(prev => ({ ...prev, [item.id]: v }))}
                      disabled={isStressTesting}
                    />
                    <div className="flex justify-between mt-2 text-[9px] text-muted-foreground font-mono">
                      <span>{Math.round(u).toLocaleString()} {item.unit}</span>
                      <span>MAX {l.toLocaleString()}</span>
                    </div>
                  </Card>
                );
              })}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}