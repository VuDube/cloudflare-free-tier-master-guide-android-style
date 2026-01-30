import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { KNOWLEDGE_BASE } from '@/data/knowledgeBase';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { IllustrativeIcon } from '@/components/ui/illustrative-icon';
import { Badge } from '@/components/ui/badge';
export function BrowsePage() {
  const [search, setSearch] = useState('');
  const apps = Object.values(KNOWLEDGE_BASE);
  const filteredApps = apps.filter(app => 
    app.title.toLowerCase().includes(search.toLowerCase()) ||
    app.description.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search features, limits, quotas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 h-12 rounded-2xl bg-slate-50 dark:bg-slate-900 border-dashed focus-visible:ring-primary"
        />
      </div>
      <div className="space-y-4">
        {filteredApps.length > 0 ? (
          filteredApps.map((app) => (
            <Link key={app.id} to={`/topic/${app.id}`}>
              <Card className="p-4 flex items-center gap-4 hover:bg-accent/50 transition-all border-none shadow-sm active:scale-[0.98]">
                <IllustrativeIcon
                  iconName={app.icon}
                  color={app.color}
                  size={24}
                  className="shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm uppercase tracking-tight truncate">{app.title}</h3>
                  <p className="text-xs text-muted-foreground truncate">{app.description}</p>
                </div>
                <Badge variant="secondary" className="text-[10px] shrink-0 font-mono">
                  {app.limits[0].split(' ')[0]}+
                </Badge>
              </Card>
            </Link>
          ))
        ) : (
          <div className="py-20 text-center opacity-40">
            <p className="font-illustrative text-xl">No features found...</p>
          </div>
        )}
      </div>
      <div className="pt-8">
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-4 px-1">Developer Resources</h4>
        <div className="grid grid-cols-2 gap-3">
          {['API Docs', 'Community', 'Status', 'Blog'].map(item => (
            <div key={item} className="p-3 bg-muted/30 rounded-xl border border-dashed text-xs text-center font-medium">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}