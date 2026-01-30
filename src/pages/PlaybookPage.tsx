import React, { useState } from 'react';
import { KNOWLEDGE_BASE, TopicCategory } from '@/data/knowledgeBase';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, ShieldCheck, Bug, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
export function PlaybookPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<TopicCategory | 'All'>('All');
  const topics = Object.values(KNOWLEDGE_BASE);
  const allPractices = topics.flatMap(t => (t.bestPractices || []).map(p => ({ topic: t.title, text: p, category: t.category, type: 'PRACTICE' })));
  const allErrors = topics.flatMap(t => (t.commonErrors || []).map(e => ({ topic: t.title, ...e, category: t.category, type: 'ERROR' })));
  const filtered = [...allPractices, ...allErrors].filter(item => {
    const matchesSearch = 'text' in item ? item.text.toLowerCase().includes(search.toLowerCase()) : (item.message.toLowerCase().includes(search.toLowerCase()) || item.code.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = category === 'All' || item.category === category;
    return matchesSearch && matchesCategory;
  });
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12 h-full flex flex-col space-y-6">
      <header className="space-y-4 shrink-0">
        <h2 className="text-3xl font-sketchy">Playbook OS</h2>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search playbook..." 
              className="pl-10 rounded-2xl bg-muted/30 border-dashed"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select 
            className="bg-muted/30 rounded-2xl px-4 text-[10px] font-bold uppercase border-dashed border"
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
          >
            <option value="All">All Hubs</option>
            {['Compute', 'Storage', 'AI', 'Security', 'Media'].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto no-scrollbar grid grid-cols-1 gap-4 pb-24">
        {filtered.map((item, idx) => (
          <Card key={idx} className={cn(
            "p-5 border-dashed border-2 rounded-[2rem] space-y-3",
            item.type === 'PRACTICE' ? "bg-emerald-500/5 border-emerald-500/20" : "bg-destructive/5 border-destructive/20"
          )}>
            <div className="flex justify-between items-center">
              <Badge variant="outline" className="text-[8px] font-bold">{item.topic}</Badge>
              {item.type === 'PRACTICE' ? <ShieldCheck className="text-emerald-500" size={16} /> : <Bug className="text-destructive" size={16} />}
            </div>
            {item.type === 'PRACTICE' ? (
              <p className="text-xs font-medium leading-relaxed">{(item as any).text}</p>
            ) : (
              <div className="space-y-2">
                <p className="text-[10px] font-mono font-bold text-destructive">CODE: {(item as any).code}</p>
                <p className="text-xs font-bold">{(item as any).message}</p>
                <div className="p-3 bg-background rounded-xl text-[10px] border border-dashed"><span className="font-bold">FIX:</span> {(item as any).fix}</div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}