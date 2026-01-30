import React, { useState, useEffect } from 'react';
import { UserCircle, Shield, Award, Zap, BookOpen, Star, MoreVertical } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { chatService } from '@/lib/chat';
import { KNOWLEDGE_BASE } from '@/data/knowledgeBase';
export function ProfilePage() {
  const [metadata, setMetadata] = useState<any>(null);
  useEffect(() => {
    loadProfile();
  }, []);
  const loadProfile = async () => {
    const response = await chatService.getMessages();
    if (response.success && response.data) {
      setMetadata(response.data.metadata);
    }
  };
  const recents = metadata?.recents || [];
  const progress = Math.min(100, (recents.length / Object.keys(KNOWLEDGE_BASE).length) * 100);
  const getRank = () => {
    if (progress > 80) return "Edge Master";
    if (progress > 50) return "Senior Architect";
    if (progress > 20) return "Cloud Builder";
    return "Guest Architect";
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12 pb-24 space-y-8 h-full overflow-y-auto no-scrollbar">
      <header className="flex flex-col items-center text-center gap-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center border-4 border-background shadow-xl">
            <UserCircle size={64} className="text-primary opacity-80" />
          </div>
          <Badge className="absolute -bottom-2 right-0 px-2 py-0.5 border-2 border-background">
            LVL {Math.floor(recents.length / 3) + 1}
          </Badge>
        </div>
        <div className="space-y-1">
          <h2 className="text-2xl font-sketchy">{getRank()}</h2>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Authenticated Identity • 2025.4</p>
        </div>
      </header>
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 border-dashed rounded-3xl flex flex-col items-center gap-2 bg-slate-50 dark:bg-slate-900/50">
          <BookOpen className="text-blue-500" size={20} />
          <div className="text-center">
            <p className="text-lg font-mono font-bold">{recents.length}</p>
            <p className="text-[8px] uppercase font-bold text-muted-foreground">Topics Read</p>
          </div>
        </Card>
        <Card className="p-4 border-dashed rounded-3xl flex flex-col items-center gap-2 bg-slate-50 dark:bg-slate-900/50">
          <Star className="text-amber-500" size={20} />
          <div className="text-center">
            <p className="text-lg font-mono font-bold">0</p>
            <p className="text-[8px] uppercase font-bold text-muted-foreground">Certifications</p>
          </div>
        </Card>
      </div>
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">Ecosystem Mastery</h3>
          <span className="text-[10px] font-mono font-bold text-primary">{Math.round(progress)}%</span>
        </div>
        <div className="space-y-3">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-[9px] font-bold text-muted-foreground uppercase tracking-tighter">
            <span>Entry Level</span>
            <span>Mastery</span>
          </div>
        </div>
      </section>
      <section className="space-y-4 pt-4">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">Badges & Achievements</h3>
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="aspect-square rounded-2xl bg-muted/30 border-2 border-dashed flex items-center justify-center opacity-30 grayscale">
              <Shield size={20} />
            </div>
          ))}
        </div>
        <p className="text-[9px] text-center italic text-muted-foreground">Complete quizzes and read more topics to unlock badges.</p>
      </section>
      <Card className="p-4 border-dashed rounded-3xl bg-primary/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-xl">
            <Award className="text-primary" size={20} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase">Master Strategist</p>
            <p className="text-[9px] text-muted-foreground">Guide completion goal</p>
          </div>
        </div>
        <MoreVertical className="text-muted-foreground opacity-30" size={16} />
      </Card>
    </div>
  );
}