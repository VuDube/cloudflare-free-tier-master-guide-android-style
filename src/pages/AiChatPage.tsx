import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, AlertCircle, Sparkles } from 'lucide-react';
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const promptChips = [
    "Workers Limits",
    "D1 Setup Guide",
    "R2 Egress Fees",
    "AI Neuron Quotas"
  ];
  useEffect(() => {
    loadMessages();
  }, []);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streamingResponse]);
  const loadMessages = async () => {
    const response = await chatService.getMessages();
    if (response.success && response.data) {
      setMessages(response.data.messages);
    }
  };
  const handleSend = async (text?: string, e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const userMessage = text || input.trim();
    if (!userMessage || isTyping) return;
    setInput('');
    setIsTyping(true);
    setStreamingResponse('');
    // Optimistic UI for User Message
    const newUserMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: userMessage,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, newUserMsg]);
    try {
      await chatService.sendMessage(userMessage, undefined, (chunk) => {
        setStreamingResponse(prev => prev + chunk);
      });
      // After streaming finishes, sync the official history
      await loadMessages();
      setStreamingResponse('');
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setIsTyping(false);
    }
  };
  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950">
      {/* Notice */}
      <div className="bg-amber-50 dark:bg-amber-950/30 px-4 py-2 flex items-center gap-2 border-b border-amber-200/50 dark:border-amber-900/50">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
        <p className="text-[10px] text-amber-800 dark:text-amber-200">
          AI requests are subject to global rate limits across all free-tier sessions.
        </p>
      </div>
      {/* Message List */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {messages.length === 0 && !isTyping && (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-40 px-8 space-y-6">
            <Bot size={64} className="text-primary animate-pulse" />
            <div className="space-y-2">
              <p className="font-illustrative text-2xl">Cloudflare OS Assistant</p>
              <p className="text-xs text-muted-foreground">Ask about quotas, setup, or architecture.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              {promptChips.map(chip => (
                <button
                  key={chip}
                  onClick={() => handleSend(chip)}
                  className="px-4 py-2 bg-white dark:bg-slate-900 border rounded-full text-[10px] font-bold uppercase tracking-tighter hover:bg-primary/5 hover:border-primary transition-all flex items-center gap-1.5"
                >
                  <Sparkles size={10} className="text-primary" />
                  {chip}
                </button>
              ))}
            </div>
          </div>
        )}
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn(
                "flex w-full",
                msg.role === 'user' ? "justify-end" : "justify-start"
              )}
            >
              <div className={cn(
                "max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm",
                msg.role === 'user'
                  ? "bg-primary text-primary-foreground rounded-tr-none"
                  : "bg-white dark:bg-slate-900 border text-foreground rounded-tl-none"
              )}>
                <div className="flex items-center gap-2 mb-1 opacity-70">
                  {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                  <span className="text-[10px] font-bold uppercase tracking-tighter">
                    {msg.role === 'user' ? 'You' : 'CF Assistant'}
                  </span>
                </div>
                <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              </div>
            </motion.div>
          ))}
          {/* Streaming Bubble */}
          {streamingResponse && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start w-full"
            >
              <div className="max-w-[85%] bg-white dark:bg-slate-900 border rounded-2xl px-4 py-3 rounded-tl-none shadow-sm">
                <div className="flex items-center gap-2 mb-1 opacity-70">
                  <Bot size={12} />
                  <span className="text-[10px] font-bold uppercase tracking-tighter">CF Assistant</span>
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                </div>
                <p className="leading-relaxed whitespace-pre-wrap text-sm">{streamingResponse}</p>
              </div>
            </motion.div>
          )}
          {isTyping && !streamingResponse && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-white dark:bg-slate-900 border rounded-2xl px-4 py-3 rounded-tl-none">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Input Area */}
      <div className="p-4 bg-background border-t">
        <form onSubmit={(e) => handleSend(undefined, e)} className="flex gap-2 items-center">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search OS Knowledge..."
            className="rounded-full bg-slate-100 dark:bg-slate-900 border-none px-6 focus-visible:ring-primary h-12"
            disabled={isTyping}
          />
          <Button
            type="submit"
            size="icon"
            className="rounded-full shrink-0 h-12 w-12"
            disabled={!input.trim() || isTyping}
          >
            <Send size={20} />
          </Button>
        </form>
      </div>
    </div>
  );
}