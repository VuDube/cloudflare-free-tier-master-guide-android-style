import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { KNOWLEDGE_BASE } from '@/data/knowledgeBase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IllustrativeIcon } from '@/components/ui/illustrative-icon';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Copy, ArrowRight, ExternalLink, ShieldCheck, Bug, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { chatService } from '@/lib/chat';
export function TopicViewer() {
  const { topicId } = useParams();
  const topic = topicId ? KNOWLEDGE_BASE[topicId] : null;
  useEffect(() => {
    if (topicId) {
      updateRecentHistory(topicId);
    }
  }, [topicId]);
  const updateRecentHistory = async (id: string) => {
    try {
      const response = await chatService.getMessages();
      if (response.success && response.data) {
        const currentRecents = response.data.metadata?.recents || [];
        const updated = [id, ...currentRecents.filter((rid: string) => rid !== id)].slice(0, 10);
        await chatService.updateMetadata({ recents: updated });
      }
    } catch (error) {
      console.error('Failed to sync topic history:', error);
    }
  };
  if (!topic) {
    return <Navigate to="/" replace />;
  }
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Command copied to clipboard!');
  };
  return (
    <div className="h-full flex flex-col bg-background">
      <div className="p-8 bg-slate-50 dark:bg-slate-950 flex flex-col items-center text-center gap-4 border-b border-dashed">
        <IllustrativeIcon iconName={topic.icon} color={topic.color} size={56} />
        <div className="space-y-1">
          <Badge variant="outline" className="text-[9px] uppercase tracking-widest font-bold mb-2">
            {topic.category}
          </Badge>
          <h2 className="text-3xl font-bold font-illustrative">{topic.title}</h2>
          <p className="text-sm text-muted-foreground max-w-[280px] mx-auto">
            {topic.description}
          </p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5 rounded-xl bg-muted/50 p-1 mb-6 h-auto">
              <TabsTrigger value="overview" className="text-[10px] py-2 font-bold uppercase">Brief</TabsTrigger>
              <TabsTrigger value="limits" className="text-[10px] py-2 font-bold uppercase">Specs</TabsTrigger>
              <TabsTrigger value="setup" className="text-[10px] py-2 font-bold uppercase">Code</TabsTrigger>
              <TabsTrigger value="practice" className="text-[10px] py-2 font-bold uppercase">Tips</TabsTrigger>
              <TabsTrigger value="debug" className="text-[10px] py-2 font-bold uppercase">Debug</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-illustrative text-xl underline decoration-primary/30 decoration-4 underline-offset-4">Executive Brief</h3>
                <p className="text-sm leading-relaxed text-foreground/90 bg-primary/5 p-4 rounded-2xl border-2 border-primary/10 border-dashed">
                  {topic.overview}
                </p>
              </div>
              {topic.specs && (
                <div className="space-y-4">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Technical Specs</h3>
                  <div className="border rounded-2xl overflow-hidden">
                    <Table>
                      <TableBody>
                        {Object.entries(topic.specs).map(([key, value]) => (
                          <TableRow key={key}>
                            <TableCell className="font-medium text-xs bg-muted/20 w-1/3">{key}</TableCell>
                            <TableCell className="text-xs font-mono">{value}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
            </TabsContent>
            <TabsContent value="practice" className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="text-emerald-500" size={24} />
                <h3 className="font-illustrative text-2xl">Best Practices</h3>
              </div>
              <div className="space-y-3">
                {topic.bestPractices?.map((tip, idx) => (
                  <div key={idx} className="flex gap-4 p-4 bg-emerald-50/50 dark:bg-emerald-950/20 border-2 border-dashed border-emerald-500/20 rounded-2xl">
                    <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" size={16} />
                    <p className="text-sm font-medium">{tip}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="debug" className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Bug className="text-destructive" size={24} />
                <h3 className="font-illustrative text-2xl">Common Errors</h3>
              </div>
              <div className="space-y-4">
                {topic.commonErrors?.map((err, idx) => (
                  <div key={idx} className="p-5 border-2 border-dashed border-destructive/20 rounded-2xl bg-destructive/5 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-mono font-bold text-destructive bg-destructive/10 px-2 py-0.5 rounded">
                        CODE: {err.code}
                      </span>
                    </div>
                    <p className="text-sm font-bold">{err.message}</p>
                    <div className="p-3 bg-white/50 dark:bg-black/50 rounded-xl text-xs leading-relaxed italic border">
                      <span className="font-bold text-foreground">FIX:</span> {err.fix}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="limits" className="space-y-4">
              <h3 className="font-illustrative text-xl">2025 Resource Quotas</h3>
              <ul className="space-y-3">
                {topic.limits.map((limit, idx) => (
                  <li key={idx} className="flex items-start gap-4 p-4 bg-card border-2 border-dashed rounded-2xl text-sm leading-tight">
                    <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold shrink-0">
                      {idx + 1}
                    </div>
                    {limit}
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="setup" className="space-y-6">
              <h3 className="font-illustrative text-xl">Lab Integration</h3>
              <div className="space-y-6">
                {topic.setupSteps.map((step, idx) => {
                  const isCommand = step.startsWith('wrangler') || step.startsWith('npm') || step.startsWith('cloudflared');
                  return (
                    <div key={idx} className="relative pl-10 before:absolute before:left-4 before:top-4 before:bottom-[-24px] before:w-[2px] before:bg-muted last:before:hidden">
                      <div className="absolute left-1 top-2 w-7 h-7 rounded-full bg-slate-900 dark:bg-slate-100 text-slate-100 dark:text-slate-900 text-[10px] flex items-center justify-center font-bold">
                        {idx + 1}
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-medium">{step}</p>
                        {isCommand && (
                          <div className="relative group">
                            <code className="block p-3 bg-slate-900 text-emerald-400 rounded-xl text-[10px] font-mono border-l-4 border-emerald-500 overflow-x-auto whitespace-nowrap no-scrollbar">
                              $ {step}
                            </code>
                            <button onClick={() => copyToClipboard(step)} className="absolute right-2 top-2 p-1.5 bg-white/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                              <Copy size={12} className="text-white" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}