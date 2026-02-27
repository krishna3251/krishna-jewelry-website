import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

export default function LuxuryLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'revealing' | 'done'>('loading');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setPhase('revealing');
          setTimeout(() => {
            setPhase('done');
            onComplete();
          }, 1200);
          return 100;
        }
        // Ease towards 100 with slight acceleration
        return prev + Math.max(0.5, (100 - prev) * 0.04);
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[10000] bg-theme-dark flex flex-col items-center justify-center overflow-hidden"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        key="luxury-loader"
      >
          {/* Ambient glow */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)',
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Floating golden dots */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-theme-accent"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 0.8, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Logo */}
          <motion.div
            className="relative z-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.h1
              className="font-serif text-5xl md:text-7xl text-white tracking-[0.3em] uppercase mb-2"
              animate={phase === 'revealing' ? { letterSpacing: '0.5em', opacity: 0, y: -30 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              Krishna
            </motion.h1>

            <motion.div
              className="flex items-center gap-4 justify-center mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-theme-accent/50" />
              <span className="text-theme-accent text-[10px] uppercase tracking-[0.4em]">Jewelry Atelier</span>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-theme-accent/50" />
            </motion.div>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="relative z-10 w-48 md:w-64"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="h-[1px] bg-white/10 relative overflow-hidden rounded-full">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-theme-accent/60 to-theme-accent rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
              {/* Glow at tip */}
              <motion.div
                className="absolute inset-y-0 w-4 rounded-full"
                style={{
                  left: `calc(${progress}% - 8px)`,
                  background: 'radial-gradient(circle, rgba(212,175,55,0.8) 0%, transparent 70%)',
                  filter: 'blur(2px)',
                }}
              />
            </div>
            <div className="flex justify-between mt-3">
              <span className="text-[10px] text-white/30 uppercase tracking-widest">Loading</span>
              <span className="text-[10px] text-theme-accent font-mono">{Math.round(progress)}%</span>
            </div>
          </motion.div>
        </motion.div>
    </AnimatePresence>
  );
}
