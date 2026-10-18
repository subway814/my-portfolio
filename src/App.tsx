import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'motion/react';
import { STAGES } from './data';
import { SubPageKey, ItemType, PortfolioItem } from './types';
import BackgroundAurora from './components/BackgroundAurora';
import MainStage from './components/MainStage';
import SubStage from './components/SubStage';
import ItemModal from './components/ItemModal';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function App() {
  const [currentCategory, setCurrentCategory] = useState<SubPageKey | null>(null);
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  // 顶部滚动进度条（阅读动线指示）
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    // 黑色为主：强制 dark 主题
    const root = document.documentElement;
    root.classList.add('dark');
    root.style.colorScheme = 'dark';
    localStorage.setItem('theme', 'dark');
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

  // 导航直达：滚动到主页对应章节（而非二级界面）
  const scrollToChapter = (key: SubPageKey) => {
    setCurrentCategory(null);
    setMobileMenuOpen(false);
    requestAnimationFrame(() => {
      document.getElementById(`chapter-${key}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
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

  const handleNavigateCategory = (categoryKey: SubPageKey, itemTitle: string) => {
    // 关闭当前modal，回到主页对应章节再打开目标作品
    setCurrentCategory(null);
    setModalState(prev => ({ ...prev, isOpen: false }));

    setTimeout(() => {
      const targetStage = STAGES[categoryKey];
      if (!targetStage) return;

      let targetItem: PortfolioItem | null = null;
      let targetIndex = -1;
      let flatItems: PortfolioItem[] = [];

      if (targetStage.categories) {
        Object.values(targetStage.categories).forEach((items) => {
          items.forEach((item, _idx) => {
            if (!targetItem && item.title === itemTitle) {
              targetItem = item;
              targetIndex = flatItems.length;
            }
            flatItems.push(item);
          });
        });
      } else if (targetStage.items) {
        flatItems = targetStage.items;
        targetIndex = flatItems.findIndex((item) => item.title === itemTitle);
        if (targetIndex !== -1) targetItem = flatItems[targetIndex];
      }

      if (targetItem) {
        // 滚动到主页对应章节
        document.getElementById(`chapter-${categoryKey}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
          setModalState({
            isOpen: true,
            type: targetItem.type,
            src: targetItem.src,
            title: targetItem.title,
            fullDesc: targetItem.fullDesc || '',
            currentIndex: targetIndex,
            allItems: flatItems,
            slides: targetItem.slides,
            categoryKey
          });
        }, 550);
      }
    }, 60);
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
    <div className="relative min-h-screen w-full bg-[#090a0f] text-white selection:bg-white selection:text-zinc-950 overflow-x-hidden antialiased font-sans transition-colors duration-500">
      {/* 入场黑色帷幕：自下而上展开 */}
      <AnimatePresence>
        {!introDone && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 0% 0)' }}
            animate={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.95, delay: 0.45, ease: [0.76, 0, 0.24, 1] }}
            onAnimationComplete={() => setIntroDone(true)}
            className="fixed inset-0 z-[120] bg-[#0A0A0A] pointer-events-none flex items-center justify-center"
          >
            <motion.span
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="font-mono text-[10px] tracking-[0.5em] uppercase text-white/70"
            >
              SUBWAY — Portfolio
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Aurora Canvas */}
      <BackgroundAurora />

      {/* 顶部阅读进度条 */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[55] bg-white/70 shadow-[0_0_10px_rgba(255,255,255,0.35)]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Global Brand Header / Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#090a0f]/70 dark:bg-[#090a0f]/70 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
        <div className="max-w-[1200px] mx-auto px-6 md:px-14 h-16 flex items-center justify-between">

          {/* Logo Brand Title */}
          <button
            onClick={handleBackToMain}
            className="flex items-center gap-3 font-sans text-sm font-bold tracking-wide text-white focus:outline-none cursor-pointer group"
          >
            {/* "D" mark：白方块中的黑色半圆 */}
            <span className="relative flex items-center justify-center w-6 h-6 bg-white overflow-hidden group-hover:rotate-[-8deg] transition-transform duration-500">
              <span className="block w-2 h-4 bg-[#090a0f] rounded-r-full" />
            </span>
            <span className="font-semibold">SUBWAY</span>
            <span className="font-light text-zinc-400 hidden sm:inline">PORTFOLIO</span>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-7">
            {[
              { key: 'project', label: '项目经历', num: '01' },
              { key: 'course', label: '课程作品', num: '02' },
              { key: 'media', label: '新媒体作品', num: '03' },
              { key: 'video', label: '视频作品', num: '04' },
              { key: 'design', label: '平面作品', num: '05' },
              { key: 'photo', label: '摄影作品', num: '06' }
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToChapter(item.key as SubPageKey)}
                className="group/nav relative py-2 text-xs font-medium tracking-wider uppercase font-sans cursor-pointer transition-colors duration-300"
                style={{
                  color: currentCategory === item.key ? '#ffffff' : 'rgba(255,255,255,0.55)',
                }}
              >
                <span className="mr-1.5 font-mono text-[9px] tracking-widest text-zinc-500">{item.num}</span>
                {item.label}
                {/* 下划线擦除动效 */}
                <span
                  className="absolute left-0 -bottom-[1px] h-[1.5px] bg-white transition-transform duration-500 origin-right"
                  style={{
                    transform: currentCategory === item.key ? 'scaleX(1)' : 'scaleX(0)',
                    transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)'
                  }}
                />
                <span
                  className="absolute left-0 -bottom-[1px] h-[1.5px] bg-white scale-x-0 origin-left transition-transform duration-500 group-hover/nav:scale-x-100"
                  style={{
                    transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)'
                  }}
                />
              </button>
            ))}
          </div>

          {/* Mobile Toggle button */}
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl text-white shadow-sm cursor-pointer"
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
              className="md:hidden border-t border-white/10 bg-[#090a0f]/95 backdrop-blur-xl px-6 py-4 flex flex-col gap-1"
            >
              {[
                { key: 'project', label: '项目经历', num: '01' },
                { key: 'course', label: '课程作品', num: '02' },
                { key: 'media', label: '新媒体作品', num: '03' },
                { key: 'video', label: '视频作品', num: '04' },
                { key: 'design', label: '平面作品', num: '05' },
                { key: 'photo', label: '摄影作品', num: '06' }
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    scrollToChapter(item.key as SubPageKey);
                  }}
                  className={`w-full text-left py-3 px-3 rounded-lg flex items-center justify-between font-sans text-sm font-medium transition-all cursor-pointer border-b border-white/5 last:border-b-0 ${
                    currentCategory === item.key
                      ? 'text-white bg-white/10'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-zinc-400">{item.num}</span>
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
            <MainStage onOpenModal={handleOpenModal} />
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
              onNavigateCategory={handleNavigateCategory}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
