import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, AlertCircle, UserCheck, Database, Cpu, Table as TableIcon, Workflow, ChevronDown, ChevronUp } from 'lucide-react';
import { chatService } from '@/lib/chat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { KNOWLEDGE_BASE, WORKFLOW_TEMPLATES } from '@/data/knowledgeBase';
import { cn } from '@/lib/utils';
import type { Message } from '../../worker/types';
export function AiChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [streamingResponse, setStreamingResponse] = useState('');
  const [persona, setPersona] = useState('General');
  const [showNeuronCosts, setShowNeuronCosts] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const personas = [
    { name: 'General', prompt: 'You are a general Cloudflare expert.', icon: UserCheck },
    { name: 'Architect', prompt: 'You are a Database Architect specializing in D1 and R2.', icon: Database },
    { name: 'Workflows', prompt: 'You are an Automation expert. Help me build Cloudflare Workflows.', icon: Workflow },
    { name: 'AI Expert', prompt: 'You are an AI Researcher helping with Workers AI and Vectorize.', icon: Cpu }
  ];
  useEffect(() => { loadMessages(); }, []);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: isTyping ? 'auto' : 'smooth'
      });
    }
  }, [messages, streamingResponse, isTyping]);
  const loadMessages = async () => {
    const response = await chatService.getMessages();
    if (response.success && response.data) setMessages(response.data.messages);
  };
  const handleSend = async (text?: string, e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const userMessage = text || input.trim();
    if (!userMessage || isTyping) return;
    setInput('');
    setIsTyping(true);
    setStreamingResponse('');
    const personaPrompt = personas.find(p => p.name === persona)?.prompt || '';
    const fullMessage = `Persona Context: ${personaPrompt}\n\nUser Question: ${userMessage}`;
    setMessages(prev => [...prev, {
      id: crypto.randomUUID(),
      role: 'user',
      content: userMessage,
      timestamp: Date.now()
    }]);
    try {
      await chatService.sendMessage(fullMessage, undefined, (chunk) => {
        setStreamingResponse(prev => prev + chunk);
      });
      await loadMessages();
      setStreamingResponse('');
    } catch (err) {
      console.error('Chat error:', err);
    } finally {
      setIsTyping(false);
    }
  };
  const injectWorkflow = (wfId: string) => {
    const wf = WORKFLOW_TEMPLATES.find(w => w.id === wfId);
    if (wf) {
      handleSend(`I want to implement the ${wf.title} workflow. Its steps are: ${wf.steps.join(' -> ')}. Can you help me write the Worker code for this?`);
    }
  };
  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950">
      <div className="p-3 border-b bg-background flex flex-col gap-3 shrink-0 sticky top-0 z-20 shadow-sm">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {personas.map(p => (
            <button
              key={p.name}
              onClick={() => setPersona(p.name)}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all whitespace-nowrap text-[10px] font-bold uppercase tracking-tighter hover:scale-105 active:scale-95",
                persona === p.name ? "bg-primary border-primary text-primary-foreground shadow-md" : "bg-muted/50 border-slate-200 dark:border-slate-800 text-muted-foreground hover:bg-muted"
              )}
            >
              <p.icon size={12} />
              {p.name}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowNeuronCosts(!showNeuronCosts)}
          className="flex items-center justify-between px-3 py-2 bg-slate-100 dark:bg-slate-900 rounded-xl text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors border border-transparent hover:border-primary/20"
        >
          <div className="flex items-center gap-2"><TableIcon size={12} /> Neuron Cost Reference</div>
          {showNeuronCosts ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
        <AnimatePresence>
          {showNeuronCosts && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="border rounded-xl overflow-hidden mt-1 bg-card">
                <Table className="table-fixed w-full">
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="text-[9px] h-8 w-[70%]">Model</TableHead>
                      <TableHead className="text-[9px] h-8 w-[30%] text-right">Cost/Req</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(KNOWLEDGE_BASE.ai.neuronCosts || {}).map(([model, cost]) => (
                      <TableRow key={model} className="h-8 hover:bg-accent/50 transition-colors">
                        <TableCell className="text-[9px] py-1 font-mono truncate">{model.split('/').pop()}</TableCell>
                        <TableCell className="text-[9px] py-1 text-right font-bold text-primary">{cost}N</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {persona === 'Workflows' && (
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            {WORKFLOW_TEMPLATES.map(wf => (
              <Button
                key={wf.id}
                variant="outline"
                size="sm"
                className="text-[9px] h-7 rounded-lg border-dashed border-primary/40 hover:bg-primary/5 text-primary whitespace-nowrap"
                onClick={() => injectWorkflow(wf.id)}
              >
                + {wf.title}
              </Button>
            ))}
          </div>
        )}
      </div>
      <div className="bg-amber-50 dark:bg-amber-950/30 px-4 py-2 flex items-center justify-between border-b border-amber-200/50 shrink-0">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <p className="text-[9px] text-amber-800 dark:text-amber-200 uppercase font-bold tracking-widest leading-tight">AI Quota Policy v2.5</p>
        </div>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar scroll-smooth">
        {messages.length === 0 && !isTyping && (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-40 space-y-6">
            <Bot size={64} className="text-primary animate-pulse" />
            <p className="font-illustrative text-2xl uppercase">Expert Studio</p>
          </div>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className={cn("flex w-full", msg.role === 'user' ? "justify-end" : "justify-start")}>
            <div className={cn("max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm", msg.role === 'user' ? "bg-primary text-primary-foreground rounded-tr-none" : "bg-white dark:bg-slate-900 border rounded-tl-none")}>
              <div className="flex items-center gap-2 mb-1 opacity-70">
                {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                <span className="text-[10px] font-bold uppercase tracking-tighter">{msg.role === 'user' ? 'You' : `${persona} Assistant`}</span>
              </div>
              <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {streamingResponse && (
          <div className="flex justify-start w-full">
            <div className="max-w-[85%] bg-white dark:bg-slate-900 border rounded-2xl px-4 py-3 rounded-tl-none shadow-sm">
              <div className="flex items-center gap-2 mb-1 opacity-70">
                <Bot size={12} />
                <span className="text-[10px] font-bold uppercase tracking-tighter">{persona} Assistant</span>
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              </div>
              <p className="leading-relaxed whitespace-pre-wrap text-sm">{streamingResponse}</p>
            </div>
          </div>
        )}
      </div>
      <div className="p-4 bg-background border-t shrink-0">
        <form onSubmit={(e) => handleSend(undefined, e)} className="flex gap-2 items-center">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Consult ${persona}...`}
            className="rounded-full bg-slate-100 dark:bg-slate-900 border-none px-6 focus-visible:ring-primary h-12"
            disabled={isTyping}
          />
          <Button type="submit" size="icon" className="rounded-full shrink-0 h-12 w-12" disabled={!input.trim() || isTyping}>
            <Send size={20} />
          </Button>
        </form>
      </div>
      <div className="px-4 py-2 bg-muted/20 text-center border-t shrink-0">
        <p className="text-[8px] text-muted-foreground uppercase font-bold tracking-widest leading-relaxed px-4">Note: although this project has AI capabilities, There is a limit on the number of requests that can be made to the AI servers across all user apps in a given time period.</p>
      </div>
    </div>
  );
}