import React from 'react';
import { Settings, Moon, Bell, Shield, Info, ExternalLink, RefreshCw } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
export function SettingsPage() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <section className="space-y-4">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-primary px-1">Interface</h2>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/10 rounded-lg">
                <Moon className="w-5 h-5 text-indigo-500" />
              </div>
              <Label className="font-medium cursor-pointer" htmlFor="dark-mode">Dark Mode</Label>
            </div>
            <Switch id="dark-mode" checked={isDark} onCheckedChange={toggleTheme} />
          </div>
        </div>
      </section>
      <section className="space-y-4">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-primary px-1">System Info</h2>
        <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl overflow-hidden divide-y divide-slate-200/50 dark:divide-slate-800/50">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <RefreshCw className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm">API Status</span>
            </div>
            <span className="text-xs font-mono text-emerald-500 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              OPERATIONAL
            </span>
          </div>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm">App Version</span>
            </div>
            <span className="text-xs text-muted-foreground">v2.4.0 (Droid-L)</span>
          </div>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm">Kernel Version</span>
            </div>
            <span className="text-xs text-muted-foreground">6.1.0-cloudflare</span>
          </div>
        </div>
      </section>
      <section className="space-y-4">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-primary px-1">About</h2>
        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
          <p className="text-xs leading-relaxed text-muted-foreground">
            This application is a specialized technical brief designed for Cloudflare developers exploring the limits of the free tier ecosystem.
          </p>
          <div className="mt-4 flex gap-4">
            <button className="text-[10px] font-bold uppercase tracking-tighter flex items-center gap-1 text-primary">
              License <ExternalLink size={10} />
            </button>
            <button className="text-[10px] font-bold uppercase tracking-tighter flex items-center gap-1 text-primary">
              Privacy <ExternalLink size={10} />
            </button>
          </div>
        </div>
      </section>
      <div className="text-center pt-10 opacity-30 flex flex-col items-center gap-1">
        <Settings size={20} className="animate-spin-slow" />
        <p className="text-[9px] font-bold uppercase tracking-widest">CF Droid OS Enterprise Edition</p>
      </div>
    </div>
  );
}