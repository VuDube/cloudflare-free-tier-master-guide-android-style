import React, { useState } from 'react';
import { CODE_TEMPLATES, AUTOMATION_SCRIPTS } from '@/data/knowledgeBase';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code2, Copy, Check, Terminal, Zap, Shield } from 'lucide-react';
import { toast } from 'sonner';
export function TemplatesPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const handleCopy = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12 pb-24 space-y-12 h-full overflow-y-auto no-scrollbar">
      <header className="space-y-2">
        <h2 className="text-3xl font-sketchy">Code & Automation</h2>
        <p className="text-sm text-muted-foreground">Master the CLI and production-ready stacks.</p>
      </header>
      <section className="space-y-6">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary px-1">Automation Hub</h3>
        <div className="grid grid-cols-1 gap-4">
          {AUTOMATION_SCRIPTS.map(script => (
            <Card key={script.id} className="p-5 border-dashed border-2 rounded-3xl bg-slate-900 border-slate-700">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-white text-sm font-bold">{script.title}</h4>
                  <p className="text-white/50 text-[10px]">{script.description}</p>
                </div>
                <Button size="icon" variant="ghost" className="text-white hover:bg-white/10" onClick={() => handleCopy(script.id, script.command)}>
                  {copiedId === script.id ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </Button>
              </div>
              <div className="bg-black/50 p-4 rounded-xl border border-white/5 flex gap-3">
                <Terminal size={14} className="text-emerald-400 shrink-0" />
                <code className="text-emerald-400 text-[10px] font-mono leading-tight">{script.command}</code>
              </div>
            </Card>
          ))}
        </div>
      </section>
      <section className="space-y-6">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary px-1">Production Stacks</h3>
        <div className="grid grid-cols-1 gap-6">
          {CODE_TEMPLATES.map((template) => (
            <Card key={template.id} className="overflow-hidden border-2 border-dashed rounded-3xl bg-background">
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg">{template.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {template.stack.map(s => <Badge key={s} variant="secondary" className="text-[9px] uppercase">{s}</Badge>)}
                    </div>
                  </div>
                  <Button size="icon" variant="ghost" className="rounded-full" onClick={() => handleCopy(template.id, template.codeSnippet)}>
                    {copiedId === template.id ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                  </Button>
                </div>
                <pre className="bg-slate-950 text-slate-100 p-6 rounded-2xl text-[11px] font-mono overflow-x-auto no-scrollbar border-l-4 border-primary">
                  <code>{template.codeSnippet}</code>
                </pre>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}