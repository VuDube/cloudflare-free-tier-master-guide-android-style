import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, AlertCircle } from 'lucide-react';
import { chatService } from '@/lib/chat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { Message } from '../../worker/types';
export function AiChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    loadMessages();
  }, []);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);
  const loadMessages = async () => {
    const response = await chatService.getMessages();
    if (response.success && response.data) {
      setMessages(response.data.messages);
    }
  };
  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isTyping) return;
    const userMessage = input.trim();
    setInput('');
    setIsTyping(true);
    // Optimistic UI
    const tempId = crypto.randomUUID();
    const newUserMsg: Message = {
      id: tempId,
      role: 'user',
      content: userMessage,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, newUserMsg]);
    try {
      await chatService.sendMessage(userMessage, undefined, (chunk) => {
        // Handle streaming if needed, or just reload at end
      });
      await loadMessages();
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
          <div className="h-full flex flex-col items-center justify-center text-center opacity-40 px-8 space-y-4">
            <Bot size={48} className="text-primary" />
            <p className="font-illustrative text-lg">Ask me anything about Cloudflare's Free Tier!</p>
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
          {isTyping && (
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
        <form onSubmit={handleSend} className="flex gap-2 items-center">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="rounded-full bg-slate-100 dark:bg-slate-900 border-none px-6 focus-visible:ring-primary"
            disabled={isTyping}
          />
          <Button 
            type="submit" 
            size="icon" 
            className="rounded-full shrink-0" 
            disabled={!input.trim() || isTyping}
          >
            <Send size={18} />
          </Button>
        </form>
      </div>
    </div>
  );
}