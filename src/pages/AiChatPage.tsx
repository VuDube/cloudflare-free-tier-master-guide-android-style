import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, AlertCircle, Sparkles, UserCheck, Shield, Database, Cpu } from 'lucide-react';
import { chatService } from '@/lib/chat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { Message } from '../../worker/types';
export function AiChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [streamingResponse, setStreamingResponse] = useState('');
  const [persona, setPersona] = useState('General');
  const scrollRef = useRef<HTMLDivElement>(null);
  const personas = [
    { name: 'General', prompt: 'You are a general Cloudflare expert.', icon: UserCheck },
    { name: 'Architect', prompt: 'You are a Database Architect specializing in D1 and R2.', icon: Database },
    { name: 'SecOps', prompt: 'You are a DevSecOps specialist focusing on Turnstile and Tunnels.', icon: Shield },
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
    // Optimistic UI update
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
  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950">
      <div className="p-3 border-b bg-background flex gap-2 overflow-x-auto no-scrollbar shrink-0">
        {personas.map(p => (
          <button
            key={p.name}
            onClick={() => setPersona(p.name)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all whitespace-nowrap text-[10px] font-bold uppercase tracking-tighter",
              persona === p.name ? "bg-primary border-primary text-primary-foreground" : "bg-muted/50 border-slate-200 dark:border-slate-800 text-muted-foreground"
            )}
          >
            <p.icon size={12} />
            {p.name}
          </button>
        ))}
      </div>
      <div className="bg-amber-50 dark:bg-amber-950/30 px-4 py-2 flex items-center justify-between border-b border-amber-200/50">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <p className="text-[9px] text-amber-800 dark:text-amber-200 uppercase font-bold tracking-widest">AI Quota Policy v2.5</p>
        </div>
        <div className="flex gap-2">
          {['D1', 'KV', 'AI'].map(t => <span key={t} className="text-[8px] font-bold text-amber-600 border border-amber-600/30 px-1 rounded">{t}</span>)}
        </div>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar scroll-smooth">
        {messages.length === 0 && !isTyping && (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-40 space-y-6">
            <Bot size={64} className="text-primary animate-pulse" />
            <div className="space-y-2">
              <p className="font-illustrative text-2xl uppercase">Expert Studio</p>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.2em]">Persona: {persona}</p>
            </div>
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
      <div className="p-4 bg-background border-t">
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
      <div className="px-4 py-2 bg-muted/20 text-center border-t">
        <p className="text-[8px] text-muted-foreground uppercase font-bold tracking-widest">Note: AI capacity is subject to shared quota limits.</p>
      </div>
    </div>
  );
}