import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { KNOWLEDGE_BASE } from '@/data/knowledgeBase';
import { IllustrativeIcon } from '@/components/ui/illustrative-icon';
import { Card } from '@/components/ui/card';
export function HomePage() {
  const apps = Object.values(KNOWLEDGE_BASE);
  return (
    <div className="p-6 space-y-8">
      <section className="space-y-2">
        <h2 className="text-3xl font-bold font-illustrative">Welcome, Builder</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Master the Cloudflare Free Tier ecosystem with this interactive technical manual.
        </p>
      </section>
      <div className="grid grid-cols-2 gap-4">
        {apps.map((app, index) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={`/topic/${app.id}`}>
              <Card className="p-4 flex flex-col items-center justify-center text-center gap-3 hover:bg-accent transition-colors border-dashed border-2 aspect-square">
                <IllustrativeIcon 
                  iconName={app.icon} 
                  color={app.color} 
                  size={32} 
                />
                <span className="font-bold text-xs uppercase tracking-wider">{app.title}</span>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
      <div className="mt-8 p-4 bg-muted/50 rounded-2xl border border-dashed border-muted-foreground/30">
        <h3 className="font-illustrative text-lg mb-2 underline decoration-primary underline-offset-4">Pro Tip</h3>
        <p className="text-2xs text-muted-foreground">
          Workers AI now supports Llama 3 on the free tier! Use it for edge-based classification without external API costs.
        </p>
      </div>
      <div className="text-center pt-8 opacity-40">
        <p className="text-[10px] uppercase font-bold tracking-[0.2em]">Cloudflare Free Tier Master Guide</p>
      </div>
    </div>
  );
}