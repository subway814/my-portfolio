import React, { useState } from 'react';
import { motion } from 'motion/react';
import { STAGES } from '../data';
import { SubPageKey } from '../types';
import { ArrowDown } from 'lucide-react';

interface MainStageProps {
  onSelectCategory: (key: SubPageKey) => void;
}

export default function MainStage({ onSelectCategory }: MainStageProps) {
  const stageKeys = Object.keys(STAGES) as SubPageKey[];
  const [hoveredCategory, setHoveredCategory] = useState<SubPageKey | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 95, 
        damping: 16 
      } 
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between px-6 md:px-20 py-24 z-10 select-none">
      {/* Main Chapters List */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 w-full flex flex-col justify-center divide-y divide-zinc-200/80 border-y border-zinc-200/80"
      >
        {stageKeys.map((key) => {
          const s = STAGES[key];
          const isHovered = hoveredCategory === key;
          const isAnyHovered = hoveredCategory !== null;

          return (
            <motion.div
              key={key}
              variants={itemVariants}
              onClick={() => onSelectCategory(key)}
              onMouseEnter={() => setHoveredCategory(key)}
              onMouseLeave={() => setHoveredCategory(null)}
              className="group relative py-12 md:py-16 flex flex-col md:flex-row md:items-center justify-between cursor-pointer"
              style={{
                transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                opacity: isAnyHovered ? (isHovered ? 1 : 0.3) : 1,
                transform: isHovered ? 'scale(1.005)' : 'scale(1)',
              }}
            >
              {/* Dynamic Left Content */}
              <div 
                className="flex items-baseline gap-4 md:gap-10 z-10"
                style={{
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isHovered ? 'translateX(16px)' : 'translateX(0)',
                }}
              >
                <span 
                  className="font-mono text-xs md:text-sm tracking-wider"
                  style={{
                    transition: 'color 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    color: isHovered ? '#000000' : '#a1a1aa',
                  }}
                >
                  {s.num} / {s.subtitle}
                </span>
                
                <h2 
                  className="text-4xl md:text-6xl font-bold tracking-tight origin-left"
                  style={{
                    transition: 'color 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    color: isHovered ? '#000000' : '#27272a',
                    transform: isHovered ? 'scale(1.04)' : 'scale(1)',
                  }}
                >
                  {s.title}
                </h2>
              </div>

              {/* Staggered Right Reveal Details */}
              <div 
                className="mt-4 md:mt-0 max-w-sm text-left md:text-right z-10 font-sans"
                style={{
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isHovered ? 'translateX(-8px)' : 'translateX(0)',
                }}
              >
                <p 
                  className="text-sm font-medium"
                  style={{
                    transition: 'color 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    color: isHovered ? '#18181b' : '#71717a',
                  }}
                >
                  {s.desc}
                </p>
                <span 
                  className="inline-block mt-2 font-mono text-xs"
                  style={{
                    transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    color: isHovered ? '#000000' : 'transparent',
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'translateX(0)' : 'translateX(10px)',
                  }}
                >
                  ENTER CATEGORY ↗
                </span>
              </div>

              {/* Hardware-accelerated solid line stretching from left to right */}
              <div 
                className="absolute left-0 bottom-0 w-full h-[1.8px] bg-zinc-950 scale-x-0 origin-left pointer-events-none" 
                style={{ 
                  transition: 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isHovered ? 'scaleX(1)' : 'scaleX(0)'
                }}
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Footer Navigation Hints */}
      <div className="mt-16 flex justify-between items-center text-zinc-400 font-mono text-xs">
        <div>@2026 SUBWAY-PORTFOLIO</div>
        <div className="flex items-center gap-1.5 text-zinc-400">
          <span>SELECT AND FLIP CHAPTER</span>
          <ArrowDown size={14} className="animate-bounce" />
        </div>
      </div>
    </div>
  );
}
