import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { KNOWLEDGE_BASE, TopicCategory } from '@/data/knowledgeBase';
import { IllustrativeIcon } from '@/components/ui/illustrative-icon';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react';
import { chatService } from '@/lib/chat';
export function HomePage() {
  const [recents, setRecents] = useState<string[]>([]);
  useEffect(() => {
    loadRecents();
  }, []);
  const loadRecents = async () => {
    const response = await chatService.getMessages();
    if (response.success && response.data?.metadata?.recents) {
      setRecents(response.data.metadata.recents.slice(0, 3));
    }
  };
  const handleTopicClick = async (id: string) => {
    const updated = [id, ...recents.filter(rid => rid !== id)].slice(0, 10);
    setRecents(updated.slice(0, 3));
    await chatService.updateMetadata({ recents: updated });
  };
  const categories: TopicCategory[] = ['Compute', 'Storage', 'AI', 'Network'];
  const apps = Object.values(KNOWLEDGE_BASE);
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 }
  };
  return (
    <div className="p-6 space-y-10 pb-20 no-scrollbar overflow-y-auto h-full">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold font-illustrative">Master Guide</h2>
          <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
            OS 2.5
          </div>
        </div>
        <p className="text-muted-foreground text-xs leading-relaxed max-w-[280px]">
          Comprehensive 2025 technical manual for Cloudflare's free tier architecture.
        </p>
      </section>
      {recents.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock size={14} />
            <h3 className="text-[10px] font-bold uppercase tracking-widest">Recently Viewed</h3>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
            {recents.map(id => {
              const topic = KNOWLEDGE_BASE[id];
              if (!topic) return null;
              return (
                <Link key={id} to={`/topic/${id}`} className="shrink-0" onClick={() => handleTopicClick(id)}>
                  <div className="flex items-center gap-2 px-4 py-2 bg-muted/40 rounded-xl border border-dashed border-muted-foreground/20 hover:bg-muted/60 transition-colors">
                    <IllustrativeIcon iconName={topic.icon} color={topic.color} size={16} className="p-1" />
                    <span className="text-[10px] font-bold truncate max-w-[80px]">{topic.title}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
      {categories.map(cat => (
        <section key={cat} className="space-y-4">
          <h3 className={cn(
            "text-[10px] font-bold uppercase tracking-[0.3em] pl-1",
            cat === 'Compute' ? 'text-blue-500' :
            cat === 'Storage' ? 'text-amber-500' :
            cat === 'AI' ? 'text-purple-500' : 'text-emerald-500'
          )}>
            {cat} Hub
          </h3>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-3 gap-3"
          >
            {apps.filter(app => app.category === cat).map((app) => (
              <motion.div key={app.id} variants={item}>
                <Link to={`/topic/${app.id}`} onClick={() => handleTopicClick(app.id)}>
                  <Card className="p-3 flex flex-col items-center justify-center text-center gap-2 hover:bg-accent transition-colors border-dashed border-2 aspect-square group">
                    <IllustrativeIcon
                      iconName={app.icon}
                      color={app.color}
                      size={24}
                      className="group-hover:scale-110 transition-transform"
                    />
                    <span className="font-bold text-[8px] uppercase tracking-tighter leading-tight">
                      {app.title.replace('Cloudflare ', '')}
                    </span>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>
      ))}
      <div className="text-center pt-8 opacity-20">
        <p className="text-[8px] uppercase font-bold tracking-[0.4em]">Enterprise Reference v2025.04</p>
      </div>
    </div>
  );
}