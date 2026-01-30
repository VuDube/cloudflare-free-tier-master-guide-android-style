import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { KNOWLEDGE_BASE, TopicCategory } from '@/data/knowledgeBase';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { IllustrativeIcon } from '@/components/ui/illustrative-icon';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
export function BrowsePage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<TopicCategory | 'All'>('All');
  const categories: (TopicCategory | 'All')[] = ['All', 'Compute', 'Storage', 'AI', 'Network'];
  const apps = Object.values(KNOWLEDGE_BASE);
  const filteredApps = apps.filter(app => {
    const matchesSearch = app.title.toLowerCase().includes(search.toLowerCase()) ||
                        app.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || app.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
  const getQuotaLevel = (limit: string) => {
    if (limit.includes('Unlimited') || limit.includes('100k')) return 'GENEROUS';
    if (limit.includes('10 GB') || limit.includes('1M')) return 'STANDARD';
    return 'LIMITED';
  };
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 space-y-4 bg-background sticky top-0 z-10 border-b border-dashed">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search Search 2.0..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-11 rounded-2xl bg-muted/50 border-dashed focus-visible:ring-primary"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap border-2",
                activeCategory === cat 
                  ? "bg-primary text-primary-foreground border-primary" 
                  : "bg-background text-muted-foreground border-slate-100 dark:border-slate-800"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar pb-20">
        {filteredApps.length > 0 ? (
          categories.filter(c => c !== 'All').map(cat => {
            const categoryApps = filteredApps.filter(app => app.category === cat);
            if (categoryApps.length === 0) return null;
            return (
              <div key={cat} className="space-y-3">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground px-1">
                  {cat} Services
                </h3>
                <div className="space-y-3">
                  {categoryApps.map((app) => (
                    <Link key={app.id} to={`/topic/${app.id}`}>
                      <Card className="p-4 flex items-center gap-4 hover:bg-accent/50 transition-all border-none shadow-sm active:scale-[0.98] bg-slate-50 dark:bg-slate-900/50">
                        <IllustrativeIcon
                          iconName={app.icon}
                          color={app.color}
                          size={24}
                          className="shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-sm uppercase tracking-tight truncate">{app.title}</h3>
                          <p className="text-[10px] text-muted-foreground truncate leading-tight mt-0.5">{app.description}</p>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "text-[8px] shrink-0 font-bold border-2",
                            getQuotaLevel(app.limits[0]) === 'GENEROUS' ? "text-emerald-500 border-emerald-500/20" : 
                            getQuotaLevel(app.limits[0]) === 'STANDARD' ? "text-blue-500 border-blue-500/20" : 
                            "text-amber-500 border-amber-500/20"
                          )}
                        >
                          {getQuotaLevel(app.limits[0])}
                        </Badge>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-20 text-center opacity-40">
            <Filter className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="font-illustrative text-xl">System found no matches...</p>
          </div>
        )}
      </div>
    </div>
  );
}