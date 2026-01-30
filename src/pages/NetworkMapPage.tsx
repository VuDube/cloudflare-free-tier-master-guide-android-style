import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Signal, Zap } from 'lucide-react';
export function NetworkMapPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeNodes, setActiveNodes] = useState(330);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationId: number;
    const nodes: { x: number; y: number; alpha: number; speed: number }[] = [];
    // Simple pseudo-random dots to simulate edge presence
    for (let i = 0; i < 200; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        alpha: Math.random(),
        speed: 0.01 + Math.random() * 0.02
      });
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Draw illustrative "map" - stylized outline (mock)
      ctx.strokeStyle = 'rgba(243, 128, 32, 0.1)';
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, Math.PI * 2);
      ctx.stroke();
      nodes.forEach(node => {
        node.alpha += node.speed;
        if (node.alpha > 1 || node.alpha < 0) node.speed *= -1;
        ctx.fillStyle = `rgba(243, 128, 32, ${Math.max(0, node.alpha)})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fill();
        // Pulsing core nodes
        if (node.alpha > 0.8) {
          ctx.strokeStyle = `rgba(243, 128, 32, ${1 - node.alpha})`;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 10 * node.alpha, 0, Math.PI * 2);
          ctx.stroke();
        }
      });
      animationId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animationId);
  }, []);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12 h-full flex flex-col">
      <div className="space-y-6 flex-1 overflow-y-auto no-scrollbar pb-24">
        <header className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <Globe className="text-primary" />
            </div>
            <h2 className="text-2xl font-sketchy">Edge Network</h2>
          </div>
          <p className="text-sm text-muted-foreground">330+ Cities. 0ms Cold Starts. Global Presence.</p>
        </header>
        <div className="relative aspect-video bg-slate-900 rounded-[3rem] border-4 border-slate-800 overflow-hidden shadow-2xl">
          <canvas 
            ref={canvasRef} 
            width={800} 
            height={450} 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 space-y-2">
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
              <span className="text-[10px] font-bold text-white uppercase tracking-widest">Live Traffic Flow</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 bg-slate-50 dark:bg-slate-900 border-2 border-dashed rounded-3xl space-y-2">
            <div className="flex items-center gap-2 text-primary">
              <Signal size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">P95 Latency</span>
            </div>
            <p className="text-3xl font-mono font-bold tracking-tighter">42ms</p>
            <p className="text-[10px] text-muted-foreground uppercase font-bold">Global Aggregate</p>
          </div>
          <div className="p-6 bg-slate-50 dark:bg-slate-900 border-2 border-dashed rounded-3xl space-y-2">
            <div className="flex items-center gap-2 text-amber-500">
              <Zap size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Availability</span>
            </div>
            <p className="text-3xl font-mono font-bold tracking-tighter">99.9%</p>
            <p className="text-[10px] text-muted-foreground uppercase font-bold">Uptime SLA</p>
          </div>
        </div>
        <div className="p-4 bg-muted/40 rounded-2xl border border-dashed text-[10px] text-center text-muted-foreground leading-relaxed">
          The network map is a visual representation of Cloudflare Anycast routing points.
          Data traffic is automatically routed to the nearest available compute node.
        </div>
      </div>
    </div>
  );
}