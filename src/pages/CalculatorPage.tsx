import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Calculator, Cpu, Database, Brain, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
export function CalculatorPage() {
  const [requests, setRequests] = useState(50000);
  const [storage, setStorage] = useState(5);
  const [neurons, setNeurons] = useState(5000);
  const limits = {
    requests: 100000,
    storage: 10,
    neurons: 10000
  };
  const handleReset = () => {
    setRequests(50000);
    setStorage(5);
    setNeurons(5000);
  };
  const calculateUsage = (val: number, limit: number) => (val / limit) * 100;
  const requestUsage = calculateUsage(requests, limits.requests);
  const storageUsage = calculateUsage(storage, limits.storage);
  const neuronUsage = calculateUsage(neurons, limits.neurons);
  const totalUsage = (requestUsage + storageUsage + neuronUsage) / 3;
  const getProgressColor = (usage: number) => {
    if (usage > 85) return "bg-destructive";
    if (usage > 50) return "bg-amber-500";
    return "bg-emerald-500";
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col">
      <div className="py-8 space-y-8 pb-24 overflow-y-auto no-scrollbar flex-1">
        <header className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-2xl">
                <Calculator className="text-primary" />
              </div>
              <h2 className="text-2xl font-sketchy">Quota Calc</h2>
            </div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">2025 Quota Estimator</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleReset}
            className="rounded-full hover:bg-primary/5 hover:text-primary transition-colors"
          >
            <RotateCcw size={20} />
          </Button>
        </header>
        <section className="space-y-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border-2 border-dashed border-primary/20">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Free Tier Load Factor</h3>
          <div className="space-y-4">
            <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${totalUsage}%` }}
                className={cn("h-full transition-colors duration-500", getProgressColor(totalUsage))}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold uppercase tracking-widest">Aggregate Capacity</span>
              <span className={cn(
                "text-lg font-mono font-bold",
                totalUsage > 85 ? "text-destructive" : totalUsage > 50 ? "text-amber-500" : "text-emerald-500"
              )}>
                {Math.round(totalUsage)}%
              </span>
            </div>
          </div>
        </section>
        <div className="space-y-6">
          <Card className="p-6 space-y-4 border-dashed rounded-3xl bg-background/50 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu size={16} className="text-blue-500" />
                <span className="text-xs font-bold uppercase tracking-widest">Compute Requests</span>
              </div>
              <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full border",
                requestUsage > 80 ? "border-destructive text-destructive" : "border-slate-200 text-muted-foreground"
              )}>
                {requestUsage > 80 ? 'CRITICAL' : 'STABLE'}
              </span>
            </div>
            <Slider
              value={[requests]}
              onValueChange={(vals) => setRequests(vals[0])}
              max={limits.requests}
              step={1000}
              className="py-4"
            />
            <div className="flex justify-between text-xs font-mono">
              <span className="text-muted-foreground">{requests.toLocaleString()} / day</span>
              <span className="font-bold">{Math.round(requestUsage)}%</span>
            </div>
          </Card>
          <Card className="p-6 space-y-4 border-dashed rounded-3xl bg-background/50 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database size={16} className="text-amber-500" />
                <span className="text-xs font-bold uppercase tracking-widest">Storage (R2/KV)</span>
              </div>
              <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full border",
                storageUsage > 80 ? "border-destructive text-destructive" : "border-slate-200 text-muted-foreground"
              )}>
                {storageUsage > 80 ? 'CAPACITY' : 'STABLE'}
              </span>
            </div>
            <Slider
              value={[storage]}
              onValueChange={(vals) => setStorage(vals[0])}
              max={limits.storage}
              step={0.5}
              className="py-4"
            />
            <div className="flex justify-between text-xs font-mono">
              <span className="text-muted-foreground">{storage} GB used</span>
              <span className="font-bold">{Math.round(storageUsage)}%</span>
            </div>
          </Card>
          <Card className="p-6 space-y-4 border-dashed rounded-3xl bg-background/50 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain size={16} className="text-purple-500" />
                <span className="text-xs font-bold uppercase tracking-widest">AI Neurons</span>
              </div>
              <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full border",
                neuronUsage > 80 ? "border-destructive text-destructive" : "border-slate-200 text-muted-foreground"
              )}>
                {neuronUsage > 80 ? 'BURSTING' : 'STABLE'}
              </span>
            </div>
            <Slider
              value={[neurons]}
              onValueChange={(vals) => setNeurons(vals[0])}
              max={limits.neurons}
              step={100}
              className="py-4"
            />
            <div className="flex justify-between text-xs font-mono">
              <span className="text-muted-foreground">{neurons.toLocaleString()} / day</span>
              <span className="font-bold">{Math.round(neuronUsage)}%</span>
            </div>
          </Card>
        </div>
        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 text-[10px] text-center italic text-muted-foreground">
          Calculations updated for Cloudflare Free Tier 2025 API specs. Egress remains $0 for R2.
        </div>
      </div>
    </div>
  );
}