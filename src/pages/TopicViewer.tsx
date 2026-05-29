import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { KNOWLEDGE_BASE } from '@/data/knowledgeBase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IllustrativeIcon } from '@/components/ui/illustrative-icon';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Copy, ShieldCheck, Bug, CheckCircle2, FileCode } from 'lucide-react';
import { toast } from 'sonner';
import { chatService } from '@/lib/chat';
import { cn } from '@/lib/utils';
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
  if (!topic) return <Navigate to="/" replace />;
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };
  const showConfigTab = topic.id === 'workers' || topic.id === 'pages';
  return (
    <div className="h-full flex flex-col bg-background">
      <div className="p-8 bg-slate-50 dark:bg-slate-950 flex flex-col items-center text-center gap-4 border-b border-dashed">
        <IllustrativeIcon iconName={topic.icon} color={topic.color} size={56} />
        <div className="space-y-1">
          <Badge variant="outline" className="text-[9px] uppercase tracking-widest font-bold mb-2">
            {topic.category}
          </Badge>
          <h2 className="text-3xl font-bold font-illustrative">{topic.title}</h2>
          <p className="text-sm text-muted-foreground max-w-[280px] mx-auto">{topic.description}</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className={cn(
              "flex w-full rounded-xl bg-muted/50 p-1 mb-6 h-auto overflow-x-auto no-scrollbar justify-start md:justify-center whitespace-nowrap",
            )}>
              <TabsTrigger value="overview" className="text-[10px] py-2 px-4 font-bold uppercase">Brief</TabsTrigger>
              <TabsTrigger value="limits" className="text-[10px] py-2 px-4 font-bold uppercase">Specs</TabsTrigger>
              {showConfigTab && <TabsTrigger value="config" className="text-[10px] py-2 px-4 font-bold uppercase">Config</TabsTrigger>}
              <TabsTrigger value="setup" className="text-[10px] py-2 px-4 font-bold uppercase">Steps</TabsTrigger>
              <TabsTrigger value="practice" className="text-[10px] py-2 px-4 font-bold uppercase">Tips</TabsTrigger>
              <TabsTrigger value="debug" className="text-[10px] py-2 px-4 font-bold uppercase">Debug</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-6">
              <h3 className="font-illustrative text-xl underline decoration-primary/30 decoration-4 underline-offset-4">Executive Brief</h3>
              <p className="text-sm leading-relaxed text-foreground/90 bg-primary/5 p-4 rounded-2xl border-2 border-primary/10 border-dashed">{topic.overview}</p>
              {topic.specs && (
                <div className="border rounded-2xl overflow-hidden mt-4">
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
              )}
            </TabsContent>
            {showConfigTab && (
              <TabsContent value="config" className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <FileCode className="text-primary" size={24} />
                  <h3 className="font-illustrative text-2xl">wrangler.toml</h3>
                </div>
                <div className="relative group">
                  <pre className="bg-slate-900 text-emerald-400 p-6 rounded-2xl text-[11px] font-mono border-l-4 border-emerald-500 overflow-x-auto no-scrollbar">
                    <code>{topic.wranglerConfig}</code>
                  </pre>
                  <button onClick={() => copyToClipboard(topic.wranglerConfig || '')} className="absolute right-4 top-4 p-2 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <Copy size={14} className="text-white" />
                  </button>
                </div>
              </TabsContent>
            )}
            <TabsContent value="practice" className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="text-emerald-500" size={24} />
                <h3 className="font-illustrative text-2xl">Best Practices</h3>
              </div>
              {topic.bestPractices?.map((tip, idx) => (
                <div key={idx} className="flex gap-4 p-4 bg-emerald-50/50 dark:bg-emerald-950/20 border-2 border-dashed border-emerald-500/20 rounded-2xl">
                  <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" size={16} />
                  <p className="text-sm font-medium">{tip}</p>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="debug" className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Bug className="text-destructive" size={24} />
                <h3 className="font-illustrative text-2xl">Common Errors</h3>
              </div>
              {topic.commonErrors?.map((err, idx) => (
                <div key={idx} className="p-5 border-2 border-dashed border-destructive/20 rounded-2xl bg-destructive/5 space-y-3">
                  <span className="text-xs font-mono font-bold text-destructive bg-destructive/10 px-2 py-0.5 rounded">CODE: {err.code}</span>
                  <p className="text-sm font-bold">{err.message}</p>
                  <div className="p-3 bg-white/50 dark:bg-black/50 rounded-xl text-xs border"><span className="font-bold">FIX:</span> {err.fix}</div>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="limits" className="space-y-4">
              <h3 className="font-illustrative text-xl">2025 Resource Quotas</h3>
              {topic.limits.map((limit, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-card border-2 border-dashed rounded-2xl text-sm">
                  <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold shrink-0">{idx + 1}</div>
                  {limit}
                </div>
              ))}
            </TabsContent>
            <TabsContent value="setup" className="space-y-6">
              <h3 className="font-illustrative text-xl">Setup Procedure</h3>
              {topic.setupSteps.map((step, idx) => (
                <div key={idx} className="flex gap-4 items-center">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold shrink-0">{idx + 1}</div>
                  <p className="text-xs font-medium">{step}</p>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}