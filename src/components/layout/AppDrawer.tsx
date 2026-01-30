import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { LayoutGrid, Calculator, GraduationCap, Code2, Users, Trash2, RefreshCcw, UserCircle, Activity, Globe, Share2, Terminal, User, Network, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { chatService } from '@/lib/chat';
import { toast } from 'sonner';
interface AppDrawerProps {
  children?: React.ReactNode;
}
export function AppDrawer({ children }: AppDrawerProps) {
  const navigate = useNavigate();
  const navItems = [
    { label: 'All Features', icon: LayoutGrid, path: '/browse' },
    { label: 'FlowViz OS', icon: Network, path: '/architecture' },
    { label: 'Diagnostic Hub', icon: Stethoscope, path: '/troubleshooting' },
    { label: 'System Dashboard', icon: Activity, path: '/dashboard' },
    { label: 'Global Network', icon: Globe, path: '/network' },
    { label: 'Quota Calculator', icon: Calculator, path: '/calculator' },
    { label: 'System Logs', icon: Terminal, path: '/logs' },
    { label: 'User Profile', icon: User, path: '/profile' },
    { label: 'Technical Quizzes', icon: GraduationCap, path: '/quizzes' },
    { label: 'Code Templates', icon: Code2, path: '/templates' },
    { label: 'Share Guide', icon: Share2, path: '/share' },
  ];
  const handleNav = (path: string) => { navigate(path); };
  const handleWipeState = async () => {
    try {
      await chatService.clearAllSessions();
      await chatService.clearMessages();
      localStorage.removeItem('cf_droid_session_id');
      toast.success('System state wiped successfully');
      navigate('/');
      window.location.reload();
    } catch (error) { toast.error('Failed to wipe system state'); }
  };
  const handleReboot = () => {
    toast.info('Initiating hard reboot...');
    setTimeout(() => { window.location.reload(); }, 1000);
  };
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="left" className="w-[300px] p-0 flex flex-col bg-background border-r-2 border-slate-900/10" onOpenAutoFocus={(e) => e.preventDefault()}>
        <SheetHeader className="p-6 bg-primary text-primary-foreground">
          <div className="flex items-center gap-4">
            <UserCircle className="w-12 h-12 opacity-80" />
            <div className="text-left">
              <SheetTitle className="text-white font-sketchy text-xl">CF Droid</SheetTitle>
              <p className="text-xs text-white/70">Guest Architect</p>
            </div>
          </div>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-4 mb-4">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-2 mb-2">Navigation</h3>
            <div className="space-y-1">
              {navItems.map((item) => (
                <Button key={item.label} variant="ghost" className="w-full justify-start gap-3 h-11 font-medium rounded-xl hover:bg-primary/5 hover:text-primary" onClick={() => handleNav(item.path)}>
                  <item.icon className="w-5 h-5 opacity-70" />
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
          <Separator className="mx-6 my-4 opacity-50" />
          <div className="px-4">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-2 mb-2">Kernel Control</h3>
            <div className="grid grid-cols-2 gap-2 p-2">
              <Button variant="outline" size="sm" className="flex-col h-16 gap-1 rounded-xl border-dashed" onClick={handleWipeState}>
                <Trash2 className="w-4 h-4 text-destructive" />
                <span className="text-[10px]">Wipe State</span>
              </Button>
              <Button variant="outline" size="sm" className="flex-col h-16 gap-1 rounded-xl border-dashed" onClick={handleReboot}>
                <RefreshCcw className="w-4 h-4 text-emerald-500" />
                <span className="text-[10px]">Hard Reboot</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="p-4 bg-muted/30 text-center border-t border-dashed">
          <p className="text-[10px] uppercase font-bold tracking-tighter text-muted-foreground">Cloudflare Droid OS v2.5.Final</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}