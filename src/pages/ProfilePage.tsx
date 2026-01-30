import React, { useState, useEffect } from 'react';
import { UserCircle, Shield, Award, Zap, BookOpen, Star, MoreVertical, Loader2, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { chatService } from '@/lib/chat';
import { KNOWLEDGE_BASE } from '@/data/knowledgeBase';
export function ProfilePage() {
  const [metadata, setMetadata] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    loadProfile();
  }, []);
  const loadProfile = async () => {
    setIsLoading(true);
    try {
      const response = await chatService.getMessages();
      if (response.success && response.data) {
        setMetadata(response.data.metadata || {});
      }
    } finally {
      setIsLoading(false);
    }
  };
  const recents = metadata?.recents || [];
  const quizScore = metadata?.quizResult?.score || 0;
  // Progress is strictly based on the unique topics viewed in KNOWLEDGE_BASE
  const totalTopics = Object.keys(KNOWLEDGE_BASE).length;
  const progress = Math.min(100, (recents.length / totalTopics) * 100);
  // Level is a combined score of topics read and quiz performance
  const level = Math.floor(recents.length / 2) + Math.floor(quizScore * 1.5) + 1;
  const getRank = () => {
    if (progress >= 90 && quizScore >= 5) return "Edge Grandmaster";
    if (progress > 70) return "Cloud Architect";
    if (progress > 40) return "Edge Developer";
    if (progress > 10) return "Cloud Associate";
    return "Guest Architect";
  };
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Syncing Identity...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12 pb-24 space-y-8 h-full overflow-y-auto no-scrollbar">
      <header className="flex flex-col items-center text-center gap-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center border-4 border-background shadow-[0_0_30px_rgba(243,128,32,0.2)]">
            <UserCircle size={64} className="text-primary opacity-80" />
          </div>
          <Badge className="absolute -bottom-2 right-0 px-3 py-1 border-2 border-background font-mono shadow-md">
            LVL {level}
          </Badge>
        </div>
        <div className="space-y-1">
          <h2 className="text-2xl font-sketchy tracking-wide">{getRank()}</h2>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Verified Cloudflare Engineer • 2025</p>
        </div>
      </header>
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-5 border-dashed rounded-3xl flex flex-col items-center gap-2 bg-slate-50 dark:bg-slate-900/50 hover:bg-primary/5 transition-colors">
          <BookOpen className="text-blue-500" size={24} />
          <div className="text-center">
            <p className="text-2xl font-mono font-bold">{recents.length}</p>
            <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-tighter">Manifests Read</p>
          </div>
        </Card>
        <Card className="p-5 border-dashed rounded-3xl flex flex-col items-center gap-2 bg-slate-50 dark:bg-slate-900/50 hover:bg-primary/5 transition-colors">
          <Star className="text-amber-500" size={24} />
          <div className="text-center">
            <p className="text-2xl font-mono font-bold">{quizScore}</p>
            <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-tighter">Quiz Mastery</p>
          </div>
        </Card>
      </div>
      <section className="space-y-4 px-1">
        <div className="flex justify-between items-end">
          <div className="space-y-0.5">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Ecosystem Mastery</h3>
            <p className="text-[9px] text-muted-foreground italic">Coverage of all 2025 core services</p>
          </div>
          <span className="text-[11px] font-mono font-bold text-primary">{Math.round(progress)}%</span>
        </div>
        <div className="space-y-3">
          <Progress value={progress} className="h-2 bg-slate-100 dark:bg-slate-800" />
          <div className="flex justify-between text-[9px] font-bold text-muted-foreground uppercase tracking-tighter opacity-60">
            <span>Entry Level</span>
            <span>Edge Master</span>
          </div>
        </div>
      </section>
      <section className="space-y-4">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1 flex items-center gap-2">
          <Clock size={12} className="text-primary" />
          Transmission Logs
        </h3>
        <div className="space-y-3">
          {recents.slice(0, 4).map((id: string) => {
            const topic = KNOWLEDGE_BASE[id];
            if (!topic) return null;
            return (
              <div key={id} className="p-4 bg-white dark:bg-slate-900/50 rounded-2xl border border-dashed flex items-center justify-between group hover:border-primary transition-colors">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="h-6 w-6 rounded-full p-0 flex items-center justify-center border-dashed">
                    <Zap size={10} className="text-primary" />
                  </Badge>
                  <span className="text-xs font-bold uppercase tracking-tight">{topic.title}</span>
                </div>
                <Badge variant="secondary" className="text-[8px] uppercase font-bold">{topic.category}</Badge>
              </div>
            );
          })}
          {recents.length === 0 && (
            <div className="py-12 flex flex-col items-center justify-center opacity-30 gap-2 border-2 border-dashed rounded-3xl">
              <Shield size={32} />
              <p className="text-[10px] uppercase font-bold">No active history found</p>
            </div>
          )}
        </div>
      </section>
      <Card className="p-4 border-dashed border-2 rounded-3xl bg-primary/5 flex items-center justify-between border-primary/20">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-xl">
            <Award className="text-primary" size={20} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-tight">Full Stack Strategist</p>
            <p className="text-[9px] text-muted-foreground">Deploy a Workers AI app</p>
          </div>
        </div>
        <MoreVertical className="text-muted-foreground opacity-30" size={16} />
      </Card>
      <div className="text-center pt-4 opacity-10">
        <p className="text-[8px] uppercase font-bold tracking-[0.5em]">Identity Token: {metadata?.sessionId?.slice(0,8) || 'GUEST'}</p>
      </div>
    </div>
  );
}