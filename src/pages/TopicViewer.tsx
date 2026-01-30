import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { KNOWLEDGE_BASE } from '@/data/knowledgeBase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IllustrativeIcon } from '@/components/ui/illustrative-icon';
import { Badge } from '@/components/ui/badge';
export function TopicViewer() {
  const { topicId } = useParams();
  const topic = topicId ? KNOWLEDGE_BASE[topicId] : null;
  if (!topic) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="animate-in slide-in-from-right duration-300 h-full flex flex-col">
      <div className="p-6 bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center text-center gap-4">
        <IllustrativeIcon iconName={topic.icon} color={topic.color} size={48} />
        <div>
          <h2 className="text-3xl font-bold font-illustrative">{topic.title}</h2>
          <p className="text-sm text-muted-foreground max-w-[250px] mx-auto mt-2">
            {topic.description}
          </p>
        </div>
      </div>
      <div className="flex-1 p-4">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 rounded-xl">
            <TabsTrigger value="overview">Brief</TabsTrigger>
            <TabsTrigger value="limits">Quotas</TabsTrigger>
            <TabsTrigger value="setup">Setup</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-6 space-y-4">
            <h3 className="font-illustrative text-xl">What is it?</h3>
            <p className="text-sm leading-relaxed text-foreground/90 bg-primary/5 p-4 rounded-xl border border-primary/10">
              {topic.overview}
            </p>
            <div className="aspect-video bg-muted rounded-xl center">
              <span className="text-2xs font-mono uppercase opacity-30 tracking-widest">Visual Illustration Placeholder</span>
            </div>
          </TabsContent>
          <TabsContent value="limits" className="mt-6 space-y-3">
            <h3 className="font-illustrative text-xl">Free Usage Limits</h3>
            <ul className="space-y-2">
              {topic.limits.map((limit, idx) => (
                <li key={idx} className="flex items-center gap-3 p-3 bg-card border rounded-lg text-sm">
                  <Badge variant="outline" className="h-6 w-6 rounded-full center p-0 text-[10px] shrink-0">
                    {idx + 1}
                  </Badge>
                  {limit}
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="setup" className="mt-6 space-y-4">
            <h3 className="font-illustrative text-xl">Quick Start Guide</h3>
            <div className="space-y-4">
              {topic.setupSteps.map((step, idx) => (
                <div key={idx} className="relative pl-8 before:absolute before:left-3 before:top-2 before:bottom-[-20px] before:w-[2px] before:bg-muted last:before:hidden">
                  <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary text-primary-foreground text-[10px] center font-bold">
                    {idx + 1}
                  </div>
                  <p className="text-sm">{step}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}