import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Calculator, Cpu, Database, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';
export function CalculatorPage() {
  const [requests, setRequests] = useState(50000);
  const [storage, setStorage] = useState(2);
  const [neurons, setNeurons] = useState(2000);
  const limits = {
    requests: 100000,
    storage: 10,
    neurons: 10000
  };
  const calculateUsage = (val: number, limit: number) => (val / limit) * 100;
  const requestUsage = calculateUsage(requests, limits.requests);
  const storageUsage = calculateUsage(storage, limits.storage);
  const neuronUsage = calculateUsage(neurons, limits.neurons);
  const totalUsage = (requestUsage + storageUsage + neuronUsage) / 3;
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12 space-y-8 pb-24 overflow-y-auto no-scrollbar h-full">
        <header className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <Calculator className="text-primary" />
            </div>
            <h2 className="text-2xl font-sketchy">Quota Calculator</h2>
          </div>
          <p className="text-sm text-muted-foreground">Estimate your Free Tier consumption across standard services.</p>
        </header>
        <section className="space-y-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-dashed">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Capacity Meter</h3>
          <div className="space-y-4">
            <Progress 
              value={totalUsage} 
              className={cn(
                "h-3",
                totalUsage > 90 ? "bg-destructive/20" : "bg-primary/20"
              )}
            />
            <div className="flex justify-between text-[10px] font-bold">
              <span>OVERALL LOAD</span>
              <span className={cn(totalUsage > 90 && "text-destructive")}>{Math.round(totalUsage)}%</span>
            </div>
          </div>
        </section>
        <div className="space-y-6">
          <Card className="p-6 space-y-4 border-dashed rounded-3xl">
            <div className="flex items-center gap-2">
              <Cpu size={16} className="text-blue-500" />
              <span className="text-xs font-bold uppercase tracking-widest">Compute Requests</span>
            </div>
            <Slider 
              value={[requests]} 
              onValueChange={(vals) => setRequests(vals[0])} 
              max={limits.requests} 
              step={1000}
            />
            <div className="flex justify-between text-xs font-mono">
              <span className="text-muted-foreground">{requests.toLocaleString()} / day</span>
              <span className={cn(requestUsage > 80 ? "text-destructive" : "text-primary")}>{Math.round(requestUsage)}%</span>
            </div>
          </Card>
          <Card className="p-6 space-y-4 border-dashed rounded-3xl">
            <div className="flex items-center gap-2">
              <Database size={16} className="text-amber-500" />
              <span className="text-xs font-bold uppercase tracking-widest">Storage (R2/KV)</span>
            </div>
            <Slider 
              value={[storage]} 
              onValueChange={(vals) => setStorage(vals[0])} 
              max={limits.storage} 
              step={0.5}
            />
            <div className="flex justify-between text-xs font-mono">
              <span className="text-muted-foreground">{storage} GB used</span>
              <span className={cn(storageUsage > 80 ? "text-destructive" : "text-primary")}>{Math.round(storageUsage)}%</span>
            </div>
          </Card>
          <Card className="p-6 space-y-4 border-dashed rounded-3xl">
            <div className="flex items-center gap-2">
              <Brain size={16} className="text-purple-500" />
              <span className="text-xs font-bold uppercase tracking-widest">AI Neurons</span>
            </div>
            <Slider 
              value={[neurons]} 
              onValueChange={(vals) => setNeurons(vals[0])} 
              max={limits.neurons} 
              step={100}
            />
            <div className="flex justify-between text-xs font-mono">
              <span className="text-muted-foreground">{neurons.toLocaleString()} / day</span>
              <span className={cn(neuronUsage > 80 ? "text-destructive" : "text-primary")}>{Math.round(neuronUsage)}%</span>
            </div>
          </Card>
        </div>
        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 text-[10px] text-center italic text-muted-foreground">
          Note: These are estimates based on standard monthly averages. Real-world usage may vary by region and traffic bursts.
        </div>
      </div>
    </div>
  );
}