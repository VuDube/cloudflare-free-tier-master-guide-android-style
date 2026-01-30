import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUIZ_QUESTIONS } from '@/data/knowledgeBase';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, GraduationCap, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
export function QuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const currentQuestion = QUIZ_QUESTIONS[currentIndex];
  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    if (index === currentQuestion.correctIndex) {
      setScore(s => s + 1);
    }
    setTimeout(() => {
      if (currentIndex < QUIZ_QUESTIONS.length - 1) {
        setCurrentIndex(c => c + 1);
        setSelectedAnswer(null);
      } else {
        setIsFinished(true);
      }
    }, 1500);
  };
  if (isFinished) {
    const percentage = (score / QUIZ_QUESTIONS.length) * 100;
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center space-y-8 h-full flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
            <Trophy size={64} className="text-primary animate-bounce" />
          </div>
          <Badge className="absolute -bottom-2 -right-2 px-3 py-1 font-bold">
            {score}/{QUIZ_QUESTIONS.length}
          </Badge>
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-sketchy">Quiz Complete!</h2>
          <p className="text-muted-foreground text-sm">
            {percentage === 100 ? 'Architect Status Achieved.' : 'Keep exploring the ecosystem to master the edge.'}
          </p>
        </div>
        <Button onClick={() => window.location.reload()} className="rounded-full px-8">Try Again</Button>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12 pb-24 space-y-8">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <GraduationCap className="text-primary" />
          <h2 className="text-xl font-illustrative">Technical Quiz</h2>
        </div>
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
          Q {currentIndex + 1} of {QUIZ_QUESTIONS.length}
        </span>
      </header>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-8 space-y-8 border-2 border-dashed rounded-3xl">
            <h3 className="text-lg font-bold leading-tight">{currentQuestion.question}</h3>
            <div className="grid grid-cols-1 gap-3">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrect = idx === currentQuestion.correctIndex;
                const showFeedback = selectedAnswer !== null;
                return (
                  <Button
                    key={idx}
                    variant="outline"
                    className={cn(
                      "h-14 justify-start px-6 rounded-2xl border-2 transition-all",
                      showFeedback && isCorrect && "bg-emerald-50 border-emerald-500 text-emerald-700 dark:bg-emerald-950/20",
                      showFeedback && isSelected && !isCorrect && "bg-destructive/5 border-destructive text-destructive",
                      !showFeedback && "hover:border-primary hover:bg-primary/5"
                    )}
                    onClick={() => handleAnswer(idx)}
                  >
                    <span className="flex-1 text-left">{option}</span>
                    {showFeedback && isCorrect && <CheckCircle2 size={18} className="text-emerald-500" />}
                    {showFeedback && isSelected && !isCorrect && <XCircle size={18} />}
                  </Button>
                );
              })}
            </div>
            {selectedAnswer !== null && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-muted/40 rounded-2xl text-[11px] leading-relaxed text-muted-foreground border border-dashed"
              >
                <span className="font-bold text-foreground">Explain:</span> {currentQuestion.explanation}
              </motion.div>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}