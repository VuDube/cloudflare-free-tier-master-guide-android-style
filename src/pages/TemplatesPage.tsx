import React, { useState } from 'react';
import { CODE_TEMPLATES } from '@/data/knowledgeBase';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code2, Copy, Check, Terminal } from 'lucide-react';
import { toast } from 'sonner';
export function TemplatesPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const handleCopy = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    toast.success('Template copied!');
    setTimeout(() => setCopiedId(null), 2000);
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12 pb-24 space-y-8">
      <header className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-2xl">
            <Terminal className="text-primary" />
          </div>
          <h2 className="text-2xl font-sketchy">Code Lab</h2>
        </div>
        <p className="text-sm text-muted-foreground">Production-ready boilerplate for the Free Tier ecosystem.</p>
      </header>
      <div className="grid grid-cols-1 gap-6">
        {CODE_TEMPLATES.map((template) => (
          <Card key={template.id} className="overflow-hidden border-2 border-dashed rounded-3xl bg-background">
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-bold text-lg">{template.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {template.stack.map(s => (
                      <Badge key={s} variant="secondary" className="text-[9px] uppercase tracking-tighter">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="rounded-full"
                  onClick={() => handleCopy(template.id, template.codeSnippet)}
                >
                  {copiedId === template.id ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                </Button>
              </div>
              <div className="relative group">
                <div className="absolute top-3 right-3 opacity-30 group-hover:opacity-100 transition-opacity">
                  <Code2 size={14} />
                </div>
                <pre className="bg-slate-950 text-slate-100 p-6 rounded-2xl text-[11px] font-mono overflow-x-auto no-scrollbar border-l-4 border-primary">
                  <code>{template.codeSnippet}</code>
                </pre>
              </div>
              <div className="flex items-center justify-between pt-2">
                <p className="text-[10px] text-muted-foreground italic">
                  Optimized for Cloudflare Workers v2025.4.0
                </p>
                <Button variant="link" className="text-[10px] font-bold uppercase tracking-widest h-auto p-0">
                  Read Deployment Guide
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}