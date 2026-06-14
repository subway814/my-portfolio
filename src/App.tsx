import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { STAGES } from './data';
import { SubPageKey, ItemType, PortfolioItem } from './types';
import BackgroundAurora from './components/BackgroundAurora';
import MainStage from './components/MainStage';
import SubStage from './components/SubStage';
import ItemModal from './components/ItemModal';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function App() {
  const [currentCategory, setCurrentCategory] = useState<SubPageKey | null>(null);
  const theme = 'light';
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark');
    root.style.colorScheme = 'light';
    localStorage.setItem('theme', 'light');
  }, []);
  
  // Modal State Manager
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: ItemType;
    src: string;
    title: string;
    fullDesc: string;
    currentIndex: number;
    allItems: PortfolioItem[];
    slides?: string[];
    categoryKey?: SubPageKey;
  }>({
    isOpen: false,
    type: 'video',
    src: '',
    title: '',
    fullDesc: '',
    currentIndex: 0,
    allItems: []
  });

  const handleSelectCategory = (key: SubPageKey) => {
    setCurrentCategory(key);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToMain = () => {
    setCurrentCategory(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenModal = (
    type: ItemType,
    src: string,
    title: string,
    fullDesc: string,
    idx: number,
    allItems: PortfolioItem[],
    slides?: string[],
    categoryKey?: SubPageKey
  ) => {
    setModalState({
      isOpen: true,
      type,
      src,
      title,
      fullDesc,
      currentIndex: idx,
      allItems,
      slides,
      categoryKey
    });
  };

  const handleCloseModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  const handleNavigateModal = (direction: number) => {
    const { currentIndex, allItems } = modalState;
    if (!allItems || allItems.length <= 1) return;

    const nextIndex = (currentIndex + direction + allItems.length) % allItems.length;
    const nextItem = allItems[nextIndex];

    setModalState(prev => ({
      ...prev,
      type: nextItem.type,
      src: nextItem.src,
      title: nextItem.title,
      fullDesc: nextItem.fullDesc || '',
      currentIndex: nextIndex,
      slides: nextItem.slides
    }));
  };

  return (
    <div className="relative min-h-screen w-full bg-[#FAFAFA] dark:bg-[#0A0A0C] text-[#1A1A1A] dark:text-[#E4E4E7] selection:bg-[#1A1A1A] dark:selection:bg-white dark:selection:text-zinc-950 selection:text-white overflow-x-hidden antialiased font-sans transition-colors duration-500 pt-16">
      {/* Background Aurora Canvas */}
      <BackgroundAurora />

      {/* Global Brand Header / Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAFAFA]/80 dark:bg-[#0A0A0C]/80 backdrop-blur-md border-b border-[#E5E5E5] dark:border-zinc-800/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          
          {/* Logo Brand Title */}
          <button
            onClick={handleBackToMain}
            className="flex items-center gap-2 font-mono text-sm font-bold tracking-widest text-[#1A1A1A] dark:text-white uppercase focus:outline-none cursor-pointer group"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A] dark:bg-zinc-200 group-hover:scale-110 transition-transform" />
            <span>SUBWAY-portfolio</span>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-2">
            {[
              { key: 'video', label: '视频作品', num: '01' },
              { key: 'design', label: '平面设计', num: '02' },
              { key: 'photo', label: '摄影作品', num: '03' },
              { key: 'media', label: '新媒体作品', num: '04' },
              { key: 'contact', label: '取得联系', num: '05' }
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => handleSelectCategory(item.key as SubPageKey)}
                className={`text-xs font-semibold px-4 py-2 rounded-full transition-all duration-300 font-mono tracking-wider cursor-pointer ${
                  currentCategory === item.key
                    ? 'bg-[#1A1A1A] text-white dark:bg-zinc-200 dark:text-zinc-950 shadow-sm'
                    : 'text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                }`}
              >
                <span className="opacity-40 mr-1 text-[9px]">{item.num}</span>
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Toggle button */}
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-full border border-[#E5E5E5] bg-white/70 text-[#1A1A1A] shadow-sm cursor-pointer"
            >
              {mobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
            </button>
          </div>
        </div>

        {/* Mobile Slideout Tabs/Drawer navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-[#E5E5E5] dark:border-zinc-800/80 bg-[#FAFAFA] dark:bg-[#0A0A0C] px-6 py-4 flex flex-col gap-2"
            >
              {[
                { key: 'video', label: '视频作品', num: '01' },
                { key: 'design', label: '平面设计', num: '02' },
                { key: 'photo', label: '摄影作品', num: '03' },
                { key: 'media', label: '新媒体作品', num: '04' },
                { key: 'contact', label: '取得联系', num: '05' }
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    handleSelectCategory(item.key as SubPageKey);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left py-3 px-4 rounded-xl flex items-center justify-between font-mono text-sm font-semibold transition-all cursor-pointer ${
                    currentCategory === item.key
                      ? 'bg-[#1A1A1A] text-white dark:bg-zinc-200 dark:text-zinc-950'
                      : 'text-zinc-650 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs text-zinc-400">{item.num}</span>
                    <span>{item.label}</span>
                  </span>
                  <ArrowUpRight size={14} className="opacity-40" />
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Orchestrator Panel */}
      <AnimatePresence mode="wait">
        {!currentCategory ? (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative"
          >
            <MainStage onSelectCategory={handleSelectCategory} />
          </motion.div>
        ) : (
          <motion.div
            key="substage"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative"
          >
            <SubStage
              categoryKey={currentCategory}
              stageData={STAGES[currentCategory]}
              onBack={handleBackToMain}
              onOpenModal={handleOpenModal}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Global Immersive Lightbox Modal */}
      <AnimatePresence>
        {modalState.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100"
          >
            <ItemModal
              isOpen={modalState.isOpen}
              onClose={handleCloseModal}
              type={modalState.type}
              src={modalState.src}
              title={modalState.title}
              fullDesc={modalState.fullDesc}
              currentIndex={modalState.currentIndex}
              allItems={modalState.allItems}
              onNavigate={handleNavigateModal}
              slides={modalState.slides}
              categoryKey={modalState.categoryKey}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
