import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { KNOWLEDGE_BASE } from '@/data/knowledgeBase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IllustrativeIcon } from '@/components/ui/illustrative-icon';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHeader, TableRow, TableHead } from '@/components/ui/table';
import { Copy, ArrowRight, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
export function TopicViewer() {
  const { topicId } = useParams();
  const topic = topicId ? KNOWLEDGE_BASE[topicId] : null;
  useEffect(() => {
    if (topicId) {
      const saved = JSON.parse(localStorage.getItem('recent_topics') || '[]');
      const updated = [topicId, ...saved.filter((id: string) => id !== topicId)].slice(0, 10);
      localStorage.setItem('recent_topics', JSON.stringify(updated));
    }
  }, [topicId]);
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
      <div className="flex-1 p-4 overflow-y-auto no-scrollbar pb-24">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 rounded-xl bg-muted/50 p-1">
            <TabsTrigger value="overview" className="text-xs font-bold rounded-lg">Brief</TabsTrigger>
            <TabsTrigger value="limits" className="text-xs font-bold rounded-lg">Specs</TabsTrigger>
            <TabsTrigger value="setup" className="text-xs font-bold rounded-lg">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-6 space-y-6">
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
            {topic.related && (
              <div className="space-y-4">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Ecosystem Integration</h3>
                <div className="grid grid-cols-1 gap-2">
                  {topic.related.map(relId => {
                    const rel = KNOWLEDGE_BASE[relId];
                    if (!rel) return null;
                    return (
                      <Link key={relId} to={`/topic/${relId}`}>
                        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-between border border-dashed hover:border-primary transition-all group">
                          <div className="flex items-center gap-3">
                            <IllustrativeIcon iconName={rel.icon} size={16} color={rel.color} />
                            <span className="text-xs font-bold uppercase">{rel.title}</span>
                          </div>
                          <ArrowRight size={14} className="opacity-30 group-hover:translate-x-1 group-hover:opacity-100 transition-all" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </TabsContent>
          <TabsContent value="limits" className="mt-6 space-y-4">
            <h3 className="font-illustrative text-xl">2025 Resource Quotas</h3>
            <ul className="space-y-3">
              {topic.limits.map((limit, idx) => (
                <li key={idx} className="flex items-start gap-4 p-4 bg-card border-2 border-dashed rounded-2xl text-sm leading-tight">
                  <div className="h-6 w-6 rounded-full bg-primary/10 text-primary center text-[10px] font-bold shrink-0">
                    {idx + 1}
                  </div>
                  {limit}
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="setup" className="mt-6 space-y-6">
            <h3 className="font-illustrative text-xl">Lab Integration</h3>
            <div className="space-y-6">
              {topic.setupSteps.map((step, idx) => {
                const isCommand = step.startsWith('wrangler') || step.startsWith('npm');
                return (
                  <div key={idx} className="relative pl-10 before:absolute before:left-4 before:top-4 before:bottom-[-24px] before:w-[2px] before:bg-muted last:before:hidden">
                    <div className="absolute left-1 top-2 w-7 h-7 rounded-full bg-slate-900 dark:bg-slate-100 text-slate-100 dark:text-slate-900 text-[10px] center font-bold">
                      {idx + 1}
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-medium">{step}</p>
                      {isCommand && (
                        <div className="relative group">
                          <code className="block p-3 bg-slate-900 text-emerald-400 rounded-xl text-[10px] font-mono border-l-4 border-emerald-500 overflow-x-auto whitespace-nowrap no-scrollbar">
                            $ {step}
                          </code>
                          <button 
                            onClick={() => copyToClipboard(step)}
                            className="absolute right-2 top-2 p-1.5 bg-white/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Copy size={12} className="text-white" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <Button className="w-full h-12 rounded-2xl gap-2 mt-8 font-bold uppercase tracking-widest text-[10px]" variant="secondary">
              View Deployment Logs <ExternalLink size={12} />
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}