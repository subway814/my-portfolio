import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StageData, ALBUM_IMAGES } from '../data';
import { PortfolioItem, SubPageKey, ItemType } from '../types';
import { ArrowLeft, Play, FileText, Layout, ExternalLink, Mail, Phone, Download, Globe, Award, Sparkles, Camera, MessageCircle } from 'lucide-react';

interface SubStageProps {
  categoryKey: SubPageKey;
  stageData: StageData;
  onBack: () => void;
  onOpenModal: (type: ItemType, src: string, title: string, fullDesc: string, idx: number, allItems: PortfolioItem[], slides?: string[], categoryKey?: SubPageKey) => void;
}

export default function SubStage({ categoryKey, stageData, onBack, onOpenModal }: SubStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [flatItems, setFlatItems] = useState<PortfolioItem[]>([]);
  const [subTitles, setSubTitles] = useState<string[]>([]);

  // Unsplash Fallbacks based on item themes
  const getFallbackImage = (item: PortfolioItem): string => {
    if (item.img && !item.img.startsWith('docs/') && !item.img.startsWith('videos/')) {
      return item.img;
    }
    
    // Choose high quality stock photo as fallback depending on type
    switch (categoryKey) {
      case 'video':
        return 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80';
      case 'design':
        return 'https://images.unsplash.com/photo-1541462608141-2f52c6f1d4b1?auto=format&fit=crop&w=800&q=80';
      case 'photo':
        return 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80';
      case 'media':
        return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80';
      default:
        return 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80';
    }
  };

  // Compile flat items mapping for the timeline and index tracker
  useEffect(() => {
    let compiled: PortfolioItem[] = [];
    let titles: string[] = [];
    if (stageData.categories) {
      titles = Object.keys(stageData.categories);
      Object.entries(stageData.categories).forEach(([catName, list]) => {
        list.forEach(item => {
          compiled.push({ ...item, category: catName });
        });
      });
    } else if (stageData.items) {
      compiled = [...stageData.items];
      titles = stageData.items.map(item => item.title);
    }
    setFlatItems(compiled);
    setSubTitles(titles);
    setActiveIndex(0);
  }, [stageData]);

  // Track scrolling to update the active category in the sidebar
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const elements = containerRef.current.querySelectorAll('.category-section');
      let closestIdx = 0;
      let minDistance = Infinity;

      elements.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top - window.innerHeight / 2.5);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = idx;
        }
      });

      setActiveIndex(closestIdx);
    };

    window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, [subTitles]);

  const scrollToSection = (index: number) => {
    if (!containerRef.current) return;
    const sections = containerRef.current.querySelectorAll('.category-section');
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveIndex(index);
    }
  };

  const onImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, item: PortfolioItem) => {
    const target = e.currentTarget;
    const baseImg = item.src ? item.src.replace(/\.(pptx?|pdf)$/i, '') : '';
    
    if (target.src.endsWith('.png') && baseImg) {
      target.src = baseImg + '.jpg'; // Try JPG format next
    } else {
      target.src = getFallbackImage(item); // Fallback to stock background
    }
  };

  // Layout Animation Variants
  const motionContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const motionCard = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#FAFAFA]/98 dark:bg-[#0A0A0C]/98 text-[#1A1A1A] dark:text-[#E4E4E7] px-6 md:px-24 py-36 z-20 flex flex-col justify-start select-none transition-colors duration-500">
      
      {/* Absolute Back Route */}
      <div className="fixed top-24 left-6 md:left-20 z-40 pointer-events-none">
        <button
          onClick={onBack}
          className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-full border border-[#E5E5E5]/70 dark:border-zinc-800/70 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl text-xs text-zinc-700 dark:text-zinc-300 shadow-sm hover:text-black dark:hover:text-white hover:bg-white/80 dark:hover:bg-zinc-800/80 transition-all duration-300 cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>返回主页</span>
        </button>
      </div>

      {/* Chapter Large Header */}
      <div className="mb-20 max-w-4xl mx-auto border-l-[3px] border-[#1A1A1A] dark:border-white pl-6 md:pl-10">
        <motion.span 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-mono text-zinc-500 text-xs md:text-sm tracking-widest uppercase"
        >
          CHAPTER {stageData.num} / {stageData.subtitle}
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold tracking-tight text-[#1A1A1A] dark:text-white mt-2"
        >
          {stageData.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm md:text-md text-zinc-500 mt-3 font-mono"
        >
          {stageData.desc}
        </motion.p>
      </div>

      {/* Dynamic Content Stages */}
      <div ref={containerRef} className="flex-1 w-full max-w-6xl mx-auto">
        
        {/* Stage 1: CONTACT EXQUISITE PANEL (COMBINED ABOUT + CONTACT) */}
        {categoryKey === 'contact' && (
          <div className="flex flex-col gap-12 md:gap-16 animate-fade-in text-zinc-600 dark:text-zinc-350">
            {/* Split layout: Intro Statement & Skills matrices */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 leading-relaxed text-sm md:text-base">
              <div className="flex flex-col gap-6">
                <h3 className="text-xl md:text-2xl font-bold text-[#1A1A1A] dark:text-white tracking-tight">
                  魏一萌 / WEI YIMENG
                </h3>

                {/* 个人信息 */}
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div className="p-4 bg-white dark:bg-zinc-900 border border-[#E5E5E5] dark:border-zinc-800 rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
                    <h4 className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono uppercase font-bold">年龄 / AGE</h4>
                    <p className="text-sm font-semibold text-[#1A1A1A] dark:text-zinc-200 mt-1">20岁</p>
                  </div>
                  <div className="p-4 bg-white dark:bg-zinc-900 border border-[#E5E5E5] dark:border-zinc-800 rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
                    <h4 className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono uppercase font-bold">院校 / SCHOOL</h4>
                    <p className="text-sm font-semibold text-[#1A1A1A] dark:text-zinc-200 mt-1">湖北大学</p>
                  </div>
                </div>

                {/* 教育背景 */}
                <div className="p-6 bg-white dark:bg-zinc-900 border border-[#E5E5E5] dark:border-zinc-800 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-[#1A1A1A] dark:text-zinc-100 font-bold text-sm">教育背景 / EDUCATION</h4>
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">2023.09 — 至今</span>
                  </div>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 font-semibold">湖北大学 · 大三 · 广告学专业</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
                    主修课程：广告创意与策划、市场营销、视听融媒体制作、市场调研与数据分析、消费者行为学等，具备完整广告营销、内容策划、数据复盘专业基础。
                  </p>
                </div>

                {/* 个人优势 */}
                <div className="p-6 bg-white dark:bg-zinc-900 border border-[#E5E5E5] dark:border-zinc-800 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                  <h4 className="text-[#1A1A1A] dark:text-zinc-100 font-bold text-sm mb-3">个人优势 / PERSONAL STRENGTHS</h4>
                  <ul className="space-y-3 text-xs text-zinc-600 dark:text-zinc-400">
                    <li className="leading-relaxed">
                      <span className="font-semibold text-[#1A1A1A] dark:text-zinc-200">内容制作能力突出：</span>
                      熟练使用剪映、Canva、PS、醒图、Office等工具，可独立完成短视频拍摄、剪辑、文案创作、封面设计；有个人账号运营经验，抖音作品累计播放1.5w+，小红书热点内容浏览1w+，具备爆款内容思维与热点捕捉能力。
                    </li>
                    <li className="leading-relaxed">
                      <span className="font-semibold text-[#1A1A1A] dark:text-zinc-200">新媒体运营经验扎实：</span>
                      拥有社群运营实战经历，擅长内容发布、数据复盘、用户维护。熟练使用AI工具辅助内容创作，借助AI创作内容单条小红书内容浏览5000+、点赞700+。
                    </li>
                    <li className="leading-relaxed">
                      <span className="font-semibold text-[#1A1A1A] dark:text-zinc-200">专业适配性强：</span>
                      广告学专业背景，熟悉营销策划、市场调研、数据分析，执行力强、学习效率高，可快速胜任新媒体运营、短视频策划、品牌推广等相关岗位。
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col gap-8">
                {/* 校园经历 */}
                <div>
                  <h3 className="text-zinc-800 dark:text-zinc-200 font-bold text-xs mb-4 uppercase tracking-wider font-mono">
                    校园经历 / CAMPUS EXPERIENCE
                  </h3>
                  <div className="space-y-3">
                    <div className="p-5 bg-white dark:bg-zinc-900 border border-[#E5E5E5] dark:border-zinc-800 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-[#1A1A1A] dark:text-zinc-100 font-bold text-sm">湖北大学记者团</h4>
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-semibold mt-0.5">视频部部员</p>
                        </div>
                        <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">2023.10 — 2025.12</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400 mt-2">
                        <li className="leading-relaxed">官方新媒体账号短视频选题、拍摄、剪辑、发布全流程工作经验，独立产出原创内容，作品累计点赞1000+。</li>
                        <li className="leading-relaxed">参与校园大型活动拍摄、剪辑、素材包装，熟练掌握镜头运用、后期剪辑与短视频内容制作。</li>
                        <li className="leading-relaxed">熟悉新媒体内容发布节奏，具备账号运营、内容产出、热点把控实操经验。</li>
                      </ul>
                    </div>

                    <div className="p-5 bg-white dark:bg-zinc-900 border border-[#E5E5E5] dark:border-zinc-800 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-[#1A1A1A] dark:text-zinc-100 font-bold text-sm">课程实践 — 青漾湖北文旅策划</h4>
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-semibold mt-0.5">数据员</p>
                        </div>
                        <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">2025.03 — 2025.06</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400 mt-2">
                        <li className="leading-relaxed">参与项目市场调研、竞品分析、KOL数据拆解、用户问卷分析，输出数据洞察与策划依据；独立负责PPT视觉设计、品牌文案撰写。</li>
                      </ul>
                    </div>

                    <div className="p-5 bg-white dark:bg-zinc-900 border border-[#E5E5E5] dark:border-zinc-800 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-[#1A1A1A] dark:text-zinc-100 font-bold text-sm">课程实践 — 《怪物》音乐剧策划</h4>
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-semibold mt-0.5">组员</p>
                        </div>
                        <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">2025.09 — 2025.12</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400 mt-2">
                        <li className="leading-relaxed">参与项目市场调研、竞品分析、独立负责PPT视觉设计、品牌文案撰写、活动方案策划与物料设计，具备完整营销策划执行能力。</li>
                        <li className="leading-relaxed">参与项目短视频选题、拍摄与剪辑，落地从策划、内容制作到成果展示的完整项目链路。</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 荣誉情况 */}
                <div className="border-t border-[#E5E5E5] dark:border-zinc-800 pt-6">
                  <h4 className="text-zinc-400 dark:text-zinc-500 font-mono text-xs uppercase font-semibold mb-3">荣誉情况 / HONORS & AWARDS</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-800 dark:bg-zinc-200" />
                      <span><span className="font-semibold text-[#1A1A1A] dark:text-zinc-200">语言证书：</span>CET-4、CET-6、普通话二级甲等</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-800 dark:bg-zinc-200" />
                      <span><span className="font-semibold text-[#1A1A1A] dark:text-zinc-200">竞赛荣誉：</span>全国大学生计算机设计大赛 · 微课赛道 三等奖</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section Divider */}
            <div className="h-px bg-[#E5E5E5] dark:bg-zinc-800 w-full My-4" />

            {/* Split layout: Contact Info */}
            <div className="grid grid-cols-1 gap-6">
              <div className="flex flex-col gap-6 text-zinc-600 dark:text-zinc-350">
                <h3 className="text-xl md:text-2xl font-bold text-[#1A1A1A] dark:text-white">
                  取得联系 / GET IN TOUCH
                </h3>
                <p className="text-sm">
                  欢迎联系
                </p>

                <div className="flex flex-col gap-4 mt-2">
                  {[
                    { icon: <Phone className="text-zinc-800 dark:text-zinc-200" size={18} />, label: "手机 / PHONE", val: "15927613421" },
                    { icon: <Mail className="text-zinc-800 dark:text-zinc-200" size={18} />, label: "邮箱 / EMAIL", val: "2979762419@qq.com" },
                    { icon: <MessageCircle className="text-zinc-800 dark:text-zinc-200" size={18} />, label: "微信 / WECHAT", val: "15927613421" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-white dark:bg-zinc-900 border border-[#E5E5E5] dark:border-zinc-800 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
                      <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-[#E5E5E5] dark:border-zinc-800 text-zinc-800 dark:text-zinc-200">{item.icon}</div>
                      <div>
                        <div className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono uppercase font-bold">{item.label}</div>
                        <div className="text-sm font-semibold text-[#1A1A1A] dark:text-zinc-200 mt-0.5">{item.val}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stage 2: VIDEOS / DETAILS GRID LISTS */}
        {categoryKey !== 'contact' && stageData.categories && (
          <div className={categoryKey === 'photo' ? 'grid grid-cols-1 md:grid-cols-2 gap-12' : 'flex flex-col gap-20'}>
            {Object.entries(stageData.categories).map(([catName, list]) => (
              <div key={catName} data-category={categoryKey} className="category-section scroll-mt-28 flex flex-col animate-fade-in">
                {catName && (
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-800 dark:bg-zinc-200" />
                    <h3 className="text-lg font-bold tracking-wider font-mono uppercase text-zinc-500 dark:text-zinc-400">
                      {catName}
                    </h3>
                  </div>
                )}

                <motion.div 
                  variants={motionContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-100px" }}
                  className={categoryKey === 'photo' ? 'grid grid-cols-1 gap-8' : 'grid grid-cols-1 md:grid-cols-2 gap-8'}
                >
                  {list.map((item) => {
                    const flatIdx = flatItems.findIndex(f => f.title === item.title);
                    const isLinkCard = item.type === 'link';
                    return (
                      <motion.div
                        key={item.title}
                        variants={motionCard}
                        onClick={() => onOpenModal(item.type, item.src, item.title, item.fullDesc || '', flatIdx, flatItems, item.slides, categoryKey)}
                        className={`portfolio-card group border border-[#E5E5E5] dark:border-zinc-800 rounded-2xl overflow-hidden cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,0.01)] transition-all duration-500 hover:border-[#1A1A1A] dark:hover:border-zinc-500 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_12px_30px_rgba(255,255,255,0.02)] ${isLinkCard ? 'bg-zinc-50 dark:bg-zinc-950' : 'bg-white dark:bg-zinc-900'}`}
                      >
                        {isLinkCard ? (
                          <div className="p-5 md:p-6 flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white dark:bg-zinc-900 border border-[#E5E5E5] dark:border-zinc-800 text-[9px] font-mono font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                                {item.platform || 'LINK'}
                              </span>
                              <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 font-semibold">
                                {item.views || ''}
                              </span>
                            </div>
                            <h4 className="text-base md:text-lg font-bold text-[#1A1A1A] dark:text-zinc-150 tracking-tight group-hover:text-black dark:group-hover:text-white transition-colors leading-tight">
                              {item.title}
                            </h4>
                            <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
                              {item.likes && <span>♥ {item.likes}</span>}
                              {item.collects && <span>☆ {item.collects}</span>}
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 dark:text-zinc-500 group-hover:text-[#1A1A1A] dark:group-hover:text-zinc-200 transition-colors mt-1">
                              <span>{item.platform === '抖音' ? '抖音视频' : (item.platform || '外链')}</span>
                              <ExternalLink size={10} />
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="relative aspect-[16/10] bg-zinc-50 dark:bg-zinc-950 border-b border-[#E5E5E5] dark:border-zinc-800/80 overflow-hidden">
                              <img
                                src={item.img}
                                onError={(e) => onImageError(e, item)}
                                alt={item.title}
                                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.01] transition-all duration-700 ease-out"
                              />
                              <div className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-zinc-800/90 rounded-full border border-[#E5E5E5] dark:border-zinc-700 shadow-sm text-zinc-800 dark:text-zinc-200 opacity-80 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                {item.type === 'video' && <Play size={10} className="text-zinc-800 dark:text-zinc-200 fill-zinc-800 dark:fill-zinc-200" />}
                                {item.type === 'image' && <Camera size={10} className="text-zinc-800 dark:text-zinc-200" />}
                                {item.type === 'web' && <Globe size={10} className="text-zinc-800 dark:text-zinc-200" />}
                                {item.type !== 'video' && item.type !== 'image' && item.type !== 'web' && item.type !== 'link' && <FileText size={10} className="text-zinc-800 dark:text-zinc-200" />}
                              </div>
                            </div>
                            <div className="p-6">
                              <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-800 dark:group-hover:text-zinc-300 transition-colors font-semibold">
                                {item.type.toUpperCase()} / {item.desc}
                              </span>
                              <h4 className="text-lg font-bold text-[#1A1A1A] dark:text-zinc-150 tracking-tight mt-1.5 group-hover:text-black dark:group-hover:text-white transition-colors">
                                {item.title}
                              </h4>
                              {item.fullDesc && (
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                                  {item.fullDesc}
                                </p>
                              )}
                              <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 dark:text-zinc-500 group-hover:text-[#1A1A1A] dark:group-hover:text-zinc-200 transition-colors mt-4">
                                <span>点击展开完整交互</span>
                                <ExternalLink size={10} />
                              </div>
                            </div>
                          </>
                        )}
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            ))}
          </div>
        )}

        {/* Single-tier projects/items structure */}
        {categoryKey !== 'contact' && !stageData.categories && stageData.items && (
          <motion.div 
            variants={motionContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {stageData.items.map((item, idx) => {
              const itemImg = item.type === 'album' ? ALBUM_IMAGES[0] : item.img;
              const isLinkCard = item.type === 'link';
              return (
                <motion.div
                  key={item.title}
                  variants={motionCard}
                  onClick={() => onOpenModal(item.type, item.src, item.title, item.fullDesc || '', idx, flatItems, item.slides, categoryKey)}
                  className={`portfolio-card category-section scroll-mt-28 group border border-[#E5E5E5] dark:border-zinc-800 rounded-2xl overflow-hidden cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,0.01)] transition-all duration-500 hover:border-[#1A1A1A] dark:hover:border-zinc-500 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_12px_30px_rgba(255,255,255,0.02)] ${isLinkCard ? 'bg-zinc-50 dark:bg-zinc-950' : 'bg-white dark:bg-zinc-900'}`}
                >
                  {isLinkCard ? (
                    <div className="p-5 md:p-6 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white dark:bg-zinc-900 border border-[#E5E5E5] dark:border-zinc-800 text-[9px] font-mono font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                          {item.platform || 'LINK'}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 font-semibold">
                          {item.views || ''}
                        </span>
                      </div>
                      <h4 className="text-base md:text-lg font-bold text-[#1A1A1A] dark:text-zinc-150 tracking-tight group-hover:text-black dark:group-hover:text-white transition-colors leading-tight">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
                        {item.likes && <span>♥ {item.likes}</span>}
                        {item.collects && <span>☆ {item.collects}</span>}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 dark:text-zinc-500 group-hover:text-[#1A1A1A] dark:group-hover:text-zinc-200 transition-colors mt-1">
                        <span>{item.platform === '抖音' ? '抖音视频' : (item.platform || '外链')}</span>
                        <ExternalLink size={10} />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="relative aspect-[16/10] bg-zinc-50 dark:bg-zinc-950 border-b border-[#E5E5E5] dark:border-zinc-800/80 overflow-hidden">
                        <img
                          src={itemImg}
                          onError={(e) => onImageError(e, item)}
                          alt={item.title}
                          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.01] transition-all duration-700 ease-out"
                        />
                        <div className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-zinc-800/90 rounded-full border border-[#E5E5E5] dark:border-zinc-700 shadow-sm text-zinc-800 dark:text-zinc-200 opacity-80 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          {item.type === 'video' && <Play size={10} className="text-zinc-800 dark:text-zinc-200 fill-zinc-800 dark:fill-zinc-200" />}
                          {item.type === 'image' && <Camera size={10} className="text-zinc-800 dark:text-zinc-200" />}
                          {item.type === 'web' && <Globe size={10} className="text-zinc-800 dark:text-zinc-200" />}
                          {item.type === 'album' && <Layout size={10} className="text-zinc-800 dark:text-zinc-200" />}
                          {item.type !== 'video' && item.type !== 'image' && item.type !== 'web' && item.type !== 'link' && item.type !== 'album' && <FileText size={10} className="text-zinc-800 dark:text-zinc-200" />}
                        </div>
                      </div>

                      <div className="p-6">
                        <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-800 dark:group-hover:text-zinc-300 transition-colors font-semibold">
                          {item.type.toUpperCase()} / {item.desc}
                        </span>
                        <h4 className="text-lg font-bold text-[#1A1A1A] dark:text-zinc-150 tracking-tight mt-1.5 group-hover:text-black dark:group-hover:text-white transition-colors">
                          {item.title}
                        </h4>
                        {item.fullDesc && (
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                            {item.fullDesc}
                          </p>
                        )}
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 dark:text-zinc-500 group-hover:text-[#1A1A1A] dark:group-hover:text-zinc-200 transition-colors mt-4">
                          <span>点击展开完整交互</span>
                          <ExternalLink size={10} />
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}

      </div>

      {/* Floating Index Dots Tracker Sidebar */}
      {subTitles.length > 1 && (
        <div className="fixed right-6 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4 items-center z-40 bg-white/90 dark:bg-zinc-950/90 p-3 rounded-full border border-[#E5E5E5] dark:border-zinc-800 shadow-sm backdrop-blur-md">
          {subTitles.map((title, idx) => (
            <button
              key={idx}
              onClick={() => scrollToSection(idx)}
              className="relative group focus:outline-none cursor-pointer"
            >
              {/* Tooltip on Hover */}
              <span className="absolute right-8 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#1A1A1A] dark:bg-zinc-100 text-[9px] font-mono text-white dark:text-black rounded whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none shadow-md">
                {title}
              </span>

              {/* Interactive Dot */}
              <div 
                className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                  idx === activeIndex 
                    ? 'bg-[#1A1A1A] dark:bg-zinc-200 scale-125 shadow-[0_2px_8px_rgba(26,26,26,0.15)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.08)]' 
                    : 'bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600'
                }`}
              />
            </button>
          ))}
        </div>
      )}

    </div>
  );
}
