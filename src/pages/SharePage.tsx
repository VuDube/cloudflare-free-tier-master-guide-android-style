import React from 'react';
import { Share2, QrCode, Copy, Twitter, Mail, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
export function SharePage() {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin);
    toast.success('Deep link copied to clipboard');
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12 h-full flex flex-col">
      <div className="space-y-8 flex-1 overflow-y-auto no-scrollbar pb-24">
        <header className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <Share2 className="text-primary" />
            </div>
            <h2 className="text-2xl font-sketchy">Share Brief</h2>
          </div>
          <p className="text-sm text-muted-foreground">Export your technical configuration guide.</p>
        </header>
        <Card className="p-8 border-dashed rounded-3xl flex flex-col items-center text-center gap-6 bg-slate-50 dark:bg-slate-900/40">
          <div className="relative p-6 bg-white rounded-3xl shadow-xl">
            <QrCode size={160} className="text-slate-900" />
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <Share2 size={80} />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold uppercase tracking-tight">System QR Access</h3>
            <p className="text-[10px] text-muted-foreground max-w-[200px]">
              Scan to open this specific guide configuration on another device.
            </p>
          </div>
        </Card>
        <div className="space-y-4">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">Quick Share</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-14 rounded-2xl gap-3 font-bold border-dashed hover:bg-primary/5" onClick={() => toast.info('Social sharing simulated')}>
              <Twitter size={18} className="text-blue-400" /> Twitter
            </Button>
            <Button variant="outline" className="h-14 rounded-2xl gap-3 font-bold border-dashed hover:bg-primary/5" onClick={() => toast.info('Email export simulated')}>
              <Mail size={18} className="text-amber-500" /> Email
            </Button>
          </div>
          <Button 
            className="w-full h-14 rounded-2xl gap-3 font-bold uppercase tracking-widest text-xs" 
            onClick={handleCopyLink}
          >
            <Link2 size={18} /> Copy Deep Link
          </Button>
        </div>
        <div className="p-4 bg-primary/5 rounded-2xl border border-dashed text-[10px] text-center text-muted-foreground italic">
          Shared configurations include current quota levels and recent topic history.
        </div>
      </div>
    </div>
  );
}