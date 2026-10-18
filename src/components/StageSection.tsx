import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { StageData, ALBUM_IMAGES } from '../data';
import { PortfolioItem, SubPageKey, ItemType } from '../types';
import { Play, Camera, Globe, Layout, FileText, ArrowUpRight } from 'lucide-react';

interface StageSectionProps {
  id: string;
  categoryKey: SubPageKey;
  stage: StageData;
  onOpenModal: (type: ItemType, src: string, title: string, fullDesc: string, idx: number, allItems: PortfolioItem[], slides?: string[], categoryKey?: SubPageKey) => void;
}

const FALLBACK = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80';

// 透明毛玻璃卡片（深色）
const GLASS_CARD =
  'group border border-white/10 rounded-xl overflow-hidden cursor-pointer bg-white/[0.08] transition-all duration-500 hover:border-white/40 hover:shadow-[0_16px_40px_rgba(0,0,0,0.45)]';

/**
 * 章节（普通流式布局，非全屏）：
 * 展示该章节的全部作品卡片，卡片随滚动逐张展开（whileInView + 错峰延迟），
 * 标题大数字在进入视口时升起。
 */
export default function StageSection({ id, categoryKey, stage, onOpenModal }: StageSectionProps) {
  const flatItems = useMemo<PortfolioItem[]>(() => {
    const compiled: PortfolioItem[] = [];
    if (stage.categories) {
      Object.values(stage.categories).forEach(list => list.forEach(item => compiled.push(item)));
    } else if (stage.items) {
      compiled.push(...stage.items);
    }
    return compiled;
  }, [stage]);

  const many = flatItems.length > 4;
  const gridClass = many
    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6'
    : 'grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6';

  const onImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    if (target.src.endsWith('.png')) {
      target.src = target.src.replace(/\.png$/i, '.jpg');
    } else {
      target.src = FALLBACK;
    }
  };

  return (
    <section id={id} className="relative w-full scroll-mt-24">
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-14 lg:px-24 py-16 md:py-24">
        {/* 章节头部：巨型幽灵数字 + 标题（错峰揭示） */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ staggerChildren: 0.12 }}
          className="flex items-start gap-5 md:gap-10 mb-10 md:mb-14"
        >
          <motion.span
            variants={{
              hidden: { opacity: 0, x: -40, clipPath: 'inset(0 100% 0 0)' },
              show: { opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0)' }
            }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/25 font-bold leading-none text-[clamp(64px,10vw,150px)] shrink-0 mt-[-0.08em]"
          >
            {stage.num}
          </motion.span>
          <div className="pt-3 md:pt-6 min-w-0">
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="block font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-zinc-400"
            >
              {stage.subtitle} / Chapter {stage.num}
            </motion.span>
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-6xl font-bold tracking-tight text-white mt-1 leading-tight"
            >
              {stage.title}
            </motion.h2>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm md:text-base text-zinc-400 mt-3 max-w-xl leading-relaxed"
            >
              {stage.desc}
            </motion.p>
          </div>
        </motion.div>

        {/* 全部作品卡片：随滚动逐张展开 */}
        <div className={gridClass}>
          {flatItems.map((item, i) => (
            <React.Fragment key={`${item.title}-${i}`}>
              <RevealCard
                item={item}
                i={i}
                categoryKey={categoryKey}
                flatItems={flatItems}
                onOpenModal={onOpenModal}
                onImageError={onImageError}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

interface RevealCardProps {
  item: PortfolioItem;
  i: number;
  categoryKey: SubPageKey;
  flatItems: PortfolioItem[];
  onOpenModal: (type: ItemType, src: string, title: string, fullDesc: string, idx: number, allItems: PortfolioItem[], slides?: string[], categoryKey?: SubPageKey) => void;
  onImageError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

function RevealCard({ item, i, categoryKey, flatItems, onOpenModal, onImageError }: RevealCardProps) {
  const isLinkCard = item.type === 'link';
  const itemImg = item.img || ALBUM_IMAGES[0];
  const flatIdx = flatItems.findIndex(f => f.title === item.title);

  return (
    <motion.div
      initial={{ opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: Math.min(i, 6) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onOpenModal(item.type, item.src, item.title, item.fullDesc || '', flatIdx, flatItems, item.slides, categoryKey)}
      className={GLASS_CARD}
    >
      {isLinkCard ? (
        <div className="p-5 md:p-6 flex flex-col gap-3 h-full">
          <div className="flex items-center justify-between">
            <span className="inline-flex px-2 py-0.5 rounded-full border border-white/10 text-[9px] font-mono font-semibold uppercase tracking-wider text-zinc-300">
              {item.platform || 'LINK'}
            </span>
            {item.views && <span className="text-[10px] font-mono text-zinc-400 font-semibold">{item.views}</span>}
          </div>
          <h4 className="text-base md:text-lg font-bold text-white tracking-tight leading-snug">
            {item.title}
          </h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            {item.desc}
          </p>
          <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-400 mt-auto">
            {item.likes && <span>♥ {item.likes}</span>}
            {item.collects && <span>☆ {item.collects}</span>}
            <span className="flex items-center gap-1 ml-auto text-zinc-400 group-hover:text-white transition-colors">
              {item.platform || '外链'} <ArrowUpRight size={11} />
            </span>
          </div>
        </div>
      ) : (
        <>
          <div className="relative aspect-[16/10] bg-zinc-900 overflow-hidden">
            <img
              src={itemImg}
              onError={onImageError}
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
            />
            <div className="absolute top-4 right-4 p-2 bg-black/60 rounded-full border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              {item.type === 'video' && <Play size={10} className="fill-white" />}
              {item.type === 'image' && <Camera size={10} />}
              {item.type === 'web' && <Globe size={10} />}
              {item.type === 'album' && <Layout size={10} />}
              {item.type !== 'video' && item.type !== 'image' && item.type !== 'web' && item.type !== 'link' && item.type !== 'album' && <FileText size={10} />}
            </div>
          </div>
          <div className="p-4 md:p-5">
            <span className="text-[10px] font-mono text-zinc-400 font-semibold tracking-wider uppercase">
              {item.type} / {item.platform || item.desc}
            </span>
            <h4 className="text-base md:text-lg font-bold text-white tracking-tight mt-1.5 leading-snug">
              {item.title}
            </h4>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 mt-2.5 transition-colors group-hover:text-white">
              <span>点击查看详情</span>
              <ArrowUpRight size={11} />
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}
