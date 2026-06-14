import { motion } from 'motion/react';

export default function BackgroundAurora() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#FAFAFA] dark:bg-[#0A0A0C] transition-colors duration-500">
      {/* Aurora Mesh Gradient Blends (Lightened, airy, warm minimalist shades in light, and deep cosmic elements in dark) */}
      <motion.div
        animate={{
          scale: [1, 1.15, 0.95, 1],
          x: [0, 50, -40, 0],
          y: [0, -60, 30, 0],
          opacity: [0.6, 0.75, 0.6, 0.6]
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-[20%] -left-[10%] w-[60%] h-[70%] rounded-full bg-gradient-to-br from-[#E0F2FE]/40 via-[#FAE8FF]/30 to-transparent dark:from-[#3B82F6]/10 dark:via-[#D946EF]/5 dark:to-transparent blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1.1, 0.9, 1.15, 1.1],
          x: [0, -30, 60, 0],
          y: [0, 40, -50, 0],
          opacity: [0.5, 0.7, 0.5, 0.5]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[80%] rounded-full bg-gradient-to-tr from-[#FEF3C7]/30 via-[#ECFDF5]/20 to-transparent dark:from-[#F59E0B]/5 dark:via-[#10B981]/5 dark:to-transparent blur-[140px]"
      />
      <motion.div
        animate={{
          scale: [0.95, 1.1, 0.9, 0.95],
          x: [-40, 20, -10, -40],
          y: [30, -30, 40, 30],
          opacity: [0.3, 0.45, 0.3, 0.3]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[40%] left-[30%] w-[45%] h-[50%] rounded-full bg-gradient-to-r from-[#DBEAFE]/30 via-[#E0F2FE]/15 to-transparent dark:from-[#60A5FA]/5 dark:via-transparent blur-[100px]"
      />

      {/* Grid Pattern Overlay (Minimal Day Grid) */}
      <div 
        className="absolute inset-0 bg-repeat opacity-[0.03] dark:hidden"
        style={{
          backgroundImage: `radial-gradient(#1a1a1a 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Grid Pattern Overlay (Minimal Night Grid) */}
      <div 
        className="absolute inset-0 bg-repeat hidden dark:block opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Ambient subtle vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] via-transparent to-[#FAFAFA]/45 dark:from-[#0A0A0C] dark:via-transparent dark:to-[#0A0A0C]/50" />
    </div>
  );
}
