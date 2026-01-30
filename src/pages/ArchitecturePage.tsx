import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { User, Database, Globe, Zap, Layers, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
export function ArchitecturePage() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const nodes = [
    { id: 'user', label: 'Client', icon: User, color: 'text-blue-500', bg: 'bg-blue-500/10', description: 'Browser initiates request via TLS 1.3.' },
    { id: 'edge', label: 'Global Edge', icon: Globe, color: 'text-primary', bg: 'bg-primary/10', description: 'Anycast routing hits nearest node.' },
    { id: 'worker', label: 'Worker OS', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10', description: 'V8 Isolate executes logic in <1ms.' },
    { id: 'storage', label: 'Persistent', icon: Database, color: 'text-emerald-500', bg: 'bg-emerald-500/10', description: 'Strongly consistent state access.' }
  ];
  const packetVariants: Variants = {
    animate: {
      left: ['0%', '33%', '66%', '100%'],
      transition: { duration: 4, repeat: Infinity, ease: 'linear' as const }
    }
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12 h-full flex flex-col">
      <header className="space-y-2 mb-6 text-center shrink-0">
        <h2 className="text-3xl font-sketchy">FlowViz OS</h2>
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Interactive Architecture</p>
      </header>
      <Tabs defaultValue="pipeline" className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="grid grid-cols-2 rounded-2xl bg-muted/40 p-1 mb-8 shrink-0">
          <TabsTrigger value="pipeline" className="text-[10px] font-bold uppercase">Request Pipeline</TabsTrigger>
          <TabsTrigger value="async" className="text-[10px] font-bold uppercase">State & Async</TabsTrigger>
        </TabsList>
        <TabsContent value="pipeline" className="flex-1 space-y-12 overflow-y-auto no-scrollbar pb-20">
          <div className="relative h-24 flex items-center justify-between px-8 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border-4 border-dashed border-slate-200 dark:border-slate-800 shadow-inner">
            <motion.div 
              variants={packetVariants} 
              animate="animate" 
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_rgba(243,128,32,0.6)] z-10" 
            />
            {nodes.map((node) => (
              <div key={node.id} className="relative z-20 flex flex-col items-center gap-2">
                <button 
                  onClick={() => setActiveNode(activeNode === node.id ? null : node.id)} 
                  className={cn(
                    "p-4 rounded-2xl transition-all duration-300",
                    node.bg,
                    activeNode === node.id ? "ring-4 ring-primary ring-offset-2 dark:ring-offset-slate-950 scale-110 shadow-lg" : "hover:scale-105"
                  )}
                >
                  <node.icon className={cn(node.color, "transition-transform duration-300", activeNode === node.id && "scale-110")} size={24} />
                </button>
                <span className={cn(
                  "text-[8px] font-bold uppercase tracking-tighter transition-colors duration-300",
                  activeNode === node.id ? "text-primary" : "text-muted-foreground"
                )}>
                  {node.label}
                </span>
              </div>
            ))}
            <div className="absolute left-16 right-16 top-1/2 h-0.5 bg-slate-200 dark:bg-slate-800 z-0" />
          </div>
          <AnimatePresence mode="wait">
            {activeNode && (
              <motion.div 
                key={activeNode}
                initial={{ opacity: 0, y: 10, scale: 0.95 }} 
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="p-6 border-dashed border-2 rounded-3xl bg-primary/5 shadow-xl border-primary/20 backdrop-blur-sm">
                  <h3 className="font-bold uppercase tracking-widest text-sm mb-2 text-primary">
                    {nodes.find(n => n.id === activeNode)?.label} Insight
                  </h3>
                  <p className="text-xs text-foreground/80 leading-relaxed font-medium">
                    {nodes.find(n => n.id === activeNode)?.description}
                  </p>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </TabsContent>
        <TabsContent value="async" className="flex-1 overflow-y-auto no-scrollbar pb-20">
          <div className="grid grid-cols-1 gap-6">
            <Card className="p-6 border-dashed border-2 rounded-3xl bg-emerald-500/5 space-y-4 border-emerald-500/20 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-xl">
                  <Layers className="text-emerald-500" size={24} />
                </div>
                <h3 className="font-bold uppercase tracking-widest text-sm">Durable Objects State</h3>
              </div>
              <div className="flex justify-around items-center h-24 relative bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-emerald-500/10">
                <div className="w-16 h-16 rounded-xl bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-[10px] font-bold text-emerald-700 dark:text-emerald-300 shadow-inner">Worker</div>
                <div className="w-0.5 h-full bg-emerald-500/20 border-dashed border" />
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-[10px] font-bold text-emerald-700 dark:text-emerald-300 shadow-inner">DO State</div>
                <motion.div 
                  animate={{ x: [-40, 40, -40] }} 
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} 
                  className="absolute w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.6)]" 
                />
              </div>
              <p className="text-[10px] text-muted-foreground italic text-center font-medium">Consistent storage with low-latency Worker co-location.</p>
            </Card>
            <Card className="p-6 border-dashed border-2 rounded-3xl bg-blue-500/5 space-y-4 border-blue-500/20 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-xl">
                  <RefreshCw className="text-blue-500" size={24} />
                </div>
                <h3 className="font-bold uppercase tracking-widest text-sm">Workflow Engine</h3>
              </div>
              <div className="flex flex-col gap-3 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-blue-500/10">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center text-[10px] font-bold text-blue-700 dark:text-blue-300 shadow-sm">S{i}</div>
                    <div className="flex-1 h-3 bg-blue-500/10 rounded-full overflow-hidden shadow-inner">
                      <motion.div 
                        initial={{ width: "0%" }}
                        animate={{ width: i === 1 ? "100%" : "0%" }} 
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }} 
                        className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.4)]" 
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground italic text-center font-medium">Automatic retries and state persistence across distributed steps.</p>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}