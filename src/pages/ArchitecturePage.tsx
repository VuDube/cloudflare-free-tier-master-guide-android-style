import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Network, User, Server, Database, Globe, ArrowRight, Zap, Info, Layers, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
      <header className="space-y-2 mb-6 text-center">
        <h2 className="text-3xl font-sketchy">FlowViz OS</h2>
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Interactive Architecture</p>
      </header>
      <Tabs defaultValue="pipeline" className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-2 rounded-2xl bg-muted/40 p-1 mb-8 shrink-0">
          <TabsTrigger value="pipeline" className="text-[10px] font-bold uppercase">Request Pipeline</TabsTrigger>
          <TabsTrigger value="async" className="text-[10px] font-bold uppercase">State & Async</TabsTrigger>
        </TabsList>
        <TabsContent value="pipeline" className="flex-1 space-y-12">
          <div className="relative h-24 flex items-center justify-between px-8 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border-4 border-dashed border-slate-200 dark:border-slate-800">
            <motion.div variants={packetVariants} animate="animate" className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full shadow-lg z-10" />
            {nodes.map((node) => (
              <div key={node.id} className="relative z-20 flex flex-col items-center gap-2">
                <button onClick={() => setActiveNode(activeNode === node.id ? null : node.id)} className={`p-4 rounded-2xl transition-all ${node.bg} ${activeNode === node.id ? 'ring-4 ring-primary' : ''}`}>
                  <node.icon className={node.color} size={24} />
                </button>
                <span className="text-[8px] font-bold uppercase tracking-tighter">{node.label}</span>
              </div>
            ))}
            <div className="absolute left-16 right-16 top-1/2 h-0.5 bg-slate-200 dark:bg-slate-800 z-0" />
          </div>
          {activeNode && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="p-6 border-dashed border-2 rounded-3xl bg-primary/5">
                <h3 className="font-bold uppercase tracking-widest text-sm mb-2">{nodes.find(n => n.id === activeNode)?.label} Insight</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{nodes.find(n => n.id === activeNode)?.description}</p>
              </Card>
            </motion.div>
          )}
        </TabsContent>
        <TabsContent value="async" className="flex-1">
          <div className="grid grid-cols-1 gap-6">
            <Card className="p-6 border-dashed border-2 rounded-3xl bg-emerald-500/5 space-y-4">
              <div className="flex items-center gap-3">
                <Layers className="text-emerald-500" size={24} />
                <h3 className="font-bold uppercase tracking-widest text-sm">Durable Objects State</h3>
              </div>
              <div className="flex justify-around items-center h-24 relative">
                <div className="w-16 h-16 rounded-xl bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-[10px] font-bold">Worker</div>
                <div className="w-0.5 h-full bg-emerald-500/20 border-dashed border" />
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-[10px] font-bold">DO State</div>
                <motion.div animate={{ x: [0, 80, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute w-2 h-2 bg-emerald-500 rounded-full" />
              </div>
              <p className="text-[10px] text-muted-foreground italic text-center">Consistent storage with low-latency Worker co-location.</p>
            </Card>
            <Card className="p-6 border-dashed border-2 rounded-3xl bg-blue-500/5 space-y-4">
              <div className="flex items-center gap-3">
                <RefreshCw className="text-blue-500" size={24} />
                <h3 className="font-bold uppercase tracking-widest text-sm">Workflow Engine</h3>
              </div>
              <div className="flex flex-col gap-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-md bg-blue-500/20 border border-blue-500 flex items-center justify-center text-[8px] font-bold">S{i}</div>
                    <div className="flex-1 h-2 bg-blue-500/10 rounded-full overflow-hidden">
                      <motion.div animate={{ width: i === 1 ? '100%' : '0%' }} transition={{ duration: 3, repeat: Infinity }} className="h-full bg-blue-500" />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground italic text-center">Automatic retries and state persistence across distributed steps.</p>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}