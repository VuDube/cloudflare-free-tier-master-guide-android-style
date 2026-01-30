import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, User, Server, Database, Globe, ArrowRight, Zap, Info } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
export function ArchitecturePage() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const nodes = [
    { id: 'user', label: 'Client', icon: User, color: 'text-blue-500', bg: 'bg-blue-500/10', description: 'Web Browser or Mobile App initiates request.' },
    { id: 'edge', label: 'Global Edge', icon: Globe, color: 'text-primary', bg: 'bg-primary/10', description: 'Anycast routing hits the nearest 330+ DC nodes.' },
    { id: 'worker', label: 'Worker OS', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10', description: 'Serverless logic executes in V8 isolates.' },
    { id: 'storage', label: 'Persistent State', icon: Database, color: 'text-emerald-500', bg: 'bg-emerald-500/10', description: 'R2, D1, or KV storage access.' }
  ];
  const packetVariants = {
    animate: {
      left: ['0%', '33%', '66%', '100%'],
      transition: { duration: 4, repeat: Infinity, ease: 'linear' }
    }
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12 h-full flex flex-col">
      <header className="space-y-2 mb-10 text-center">
        <div className="inline-flex p-3 bg-primary/10 rounded-2xl mb-2">
          <Network className="text-primary" size={32} />
        </div>
        <h2 className="text-3xl font-sketchy">FlowViz OS</h2>
        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-bold">Interactive Request Pipeline</p>
      </header>
      <div className="flex-1 space-y-12">
        <div className="relative h-24 flex items-center justify-between px-8 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border-4 border-dashed border-slate-200 dark:border-slate-800">
          <motion.div 
            variants={packetVariants}
            animate="animate"
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_rgba(243,128,32,0.8)] z-10"
          />
          {nodes.map((node, idx) => (
            <div key={node.id} className="relative z-20 flex flex-col items-center gap-2">
              <button
                onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
                className={`p-4 rounded-2xl transition-all active:scale-90 ${node.bg} ${activeNode === node.id ? 'ring-4 ring-primary' : ''}`}
              >
                <node.icon className={node.color} size={24} />
              </button>
              <span className="text-[8px] font-bold uppercase tracking-tighter">{node.label}</span>
            </div>
          ))}
          <div className="absolute left-16 right-16 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 dark:bg-slate-800 z-0" />
        </div>
        <AnimatePresence mode="wait">
          {activeNode ? (
            <motion.div
              key={activeNode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Card className="p-6 border-dashed border-2 rounded-3xl bg-primary/5 border-primary/20">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl">
                    {(() => {
                      const node = nodes.find(n => n.id === activeNode);
                      return node ? <node.icon size={24} className={node.color} /> : null;
                    })()}
                  </div>
                  <div className="space-y-1 flex-1">
                    <h3 className="font-bold uppercase tracking-widest text-sm">
                      {nodes.find(n => n.id === activeNode)?.label} Insight
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {nodes.find(n => n.id === activeNode)?.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ) : (
            <div className="text-center py-12 opacity-30 flex flex-col items-center gap-4 border-2 border-dashed rounded-3xl">
              <Info size={32} />
              <p className="text-[10px] uppercase font-bold tracking-widest">Select a pipeline node to inspect flow logic</p>
            </div>
          )}
        </AnimatePresence>
        <section className="space-y-4">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Flow Rules</h3>
          <div className="grid grid-cols-1 gap-3">
            {[
              "0ms Cold Starts on all Global Edge points.",
              "Strong consistency across D1 Write Units.",
              "Automatic TLS 1.3 termination at the Edge."
            ].map((rule, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-muted/40 rounded-2xl border border-dashed text-xs italic">
                <ArrowRight size={14} className="text-primary" />
                {rule}
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="p-4 mt-8 bg-slate-900 text-emerald-400 rounded-2xl font-mono text-[10px] border-l-4 border-emerald-500 overflow-x-auto whitespace-nowrap">
        $ system_trace --request-id {Math.random().toString(36).substr(2, 9)} --verbose
      </div>
    </div>
  );
}