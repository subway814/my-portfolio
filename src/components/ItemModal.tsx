import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PortfolioItem, ItemType, SubPageKey } from '../types';
import { getBilibiliEmbedUrl, getDouyinEmbedUrl, ALBUM_IMAGES } from '../data';
import { X, Play, Pause, Volume2, Maximize, ChevronLeft, ChevronRight, Download, FileText, Layout, ArrowRight, BookOpen } from 'lucide-react';

interface ItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: ItemType;
  src: string;
  title: string;
  fullDesc: string;
  currentIndex: number;
  allItems: PortfolioItem[];
  onNavigate: (direction: number) => void;
  slides?: string[];
  categoryKey?: SubPageKey;
  onNavigateCategory?: (categoryKey: SubPageKey, itemTitle: string) => void;
}

export default function ItemModal({
  isOpen,
  onClose,
  type,
  src,
  title,
  fullDesc,
  currentIndex,
  allItems,
  onNavigate,
  slides,
  categoryKey,
  onNavigateCategory
}: ItemModalProps) {
  // Video player custom controls states
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Album slide states
  const [albumIndex, setAlbumIndex] = useState(0);

  // Lightbox (fullscreen image zoom) state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Lightbox images collection (re-computed based on type)
  const getLightboxImages = (): string[] => {
    if (type === 'album') {
      return slides && slides.length > 0 ? slides : ALBUM_IMAGES;
    }
    if (type === 'image') {
      return [src];
    }
    return [];
  };

  // Reset states when item changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setAlbumIndex(0);
    setLightboxOpen(false);
    setLightboxIndex(0);
  }, [currentIndex, src, slides]);

  // Video metadata & time hooks
  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(err => console.log("Autoplay blocked:", err));
    }
    setIsPlaying(!isPlaying);
  };

  const onTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const onLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const seekTime = Number(e.target.value);
    videoRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const vol = Number(e.target.value);
    videoRef.current.volume = vol;
    setVolume(vol);
  };

  const toggleFullscreen = () => {
    const player = videoRef.current?.parentElement;
    if (!player) return;
    
    if (!document.fullscreenElement) {
      player.requestFullscreen().then(() => setIsFullscreen(true)).catch(err => console.log(err));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Safe navigation keyboard overrides
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        if (lightboxOpen) {
          setLightboxOpen(false);
        } else {
          onClose();
        }
        return;
      }
      if (lightboxOpen) {
        const imgs = getLightboxImages();
        if (imgs.length > 1) {
          if (e.key === 'ArrowLeft') {
            setLightboxIndex((prev) => {
              const newIdx = (prev - 1 + imgs.length) % imgs.length;
              if (type === 'album') setAlbumIndex(newIdx);
              return newIdx;
            });
            return;
          }
          if (e.key === 'ArrowRight') {
            setLightboxIndex((prev) => {
              const newIdx = (prev + 1) % imgs.length;
              if (type === 'album') setAlbumIndex(newIdx);
              return newIdx;
            });
            return;
          }
        }
      }
      if (e.key === 'ArrowLeft') onNavigate(-1);
      if (e.key === 'ArrowRight') onNavigate(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onNavigate, onClose, lightboxOpen]);

  // If closed, return nothing
  if (!isOpen) return null;

  // Render correct body depending on type
  const renderItemMedia = () => {
    if (type === 'video') {
      const douyinEmbed = getDouyinEmbedUrl(src);
      
      if (douyinEmbed) {
        return (
          <div className="flex flex-col gap-4 w-full animate-fade-in">
            <div className="flex flex-col gap-4">
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-zinc-800 shadow-md">
                <iframe
                  src={douyinEmbed}
                  width="1920"
                  height="1080"
                  frameBorder="0"
                  className="absolute inset-0 w-full h-full"
                  referrerPolicy="unsafe-url"
                  allowFullScreen
                  title={title}
                />
              </div>
              <div className="flex items-center justify-between flex-wrap gap-2 px-1">
                <span className="text-xs text-zinc-500 font-mono">Douyin Player (Embedded)</span>
                <a 
                  href={src} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-[#00f2ea] hover:bg-[#00d9d2] text-black rounded-full transition-colors"
                >
                  <span>直接打开抖音播放页</span>
                  <ArrowRight size={12} />
                </a>
              </div>
            </div>
          </div>
        );
      }
      
      const bvidEmbed = getBilibiliEmbedUrl(src);
      
      if (bvidEmbed) {
        return (
          <div className="flex flex-col gap-4 w-full">
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-zinc-800 shadow-md">
              <iframe
                src={bvidEmbed}
                className="absolute inset-0 w-full h-full"
                allowFullScreen
                scrolling="no"
                title={title}
              />
            </div>
            <div className="flex items-center justify-between flex-wrap gap-2 px-1">
              <span className="text-xs text-zinc-500 font-mono">Bilibili Player (Embedded)</span>
              <a 
                href={src} 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-[#ff5f5f] hover:bg-[#ff4444] text-white rounded-full transition-colors"
              >
                <span>直接打开 B 站 播放页</span>
                <ArrowRight size={12} />
              </a>
            </div>
          </div>
        );
      } else {
        // Custom Styled Local Video Player
        return (
          <div className="relative group/player w-full bg-black rounded-xl border border-[#E5E5E5] overflow-hidden shadow-md aspect-video">
            <video
              ref={videoRef}
              src={src}
              onTimeUpdate={onTimeUpdate}
              onLoadedMetadata={onLoadedMetadata}
              onClick={handlePlayPause}
              className="w-full h-full object-contain"
            />
            
            {/* Custom Video Overlay Controls */}
            <div className="absolute inset-x-0 bottom-0 py-4 px-6 bg-gradient-to-t from-black/95 to-black/0 flex flex-col gap-3 opacity-0 group-hover/player:opacity-100 transition-opacity duration-300">
              
              {/* Progress Bar slider */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-zinc-400">{formatTime(currentTime)}</span>
                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="flex-1 accent-white h-1 bg-white/20 rounded cursor-pointer"
                />
                <span className="text-xs font-mono text-zinc-400">{formatTime(duration)}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-4">
                  <button onClick={handlePlayPause} className="p-1.5 hover:text-zinc-300 transition-colors cursor-pointer">
                    {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                  </button>
                  <div className="flex items-center gap-2">
                    <Volume2 size={16} className="text-zinc-400" />
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.1}
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-16 accent-white h-1 bg-white/20 rounded cursor-pointer"
                    />
                  </div>
                </div>
                <button onClick={toggleFullscreen} className="p-1.5 hover:text-zinc-300 transition-colors cursor-pointer">
                  <Maximize size={16} />
                </button>
              </div>
            </div>
          </div>
        );
      }
    }

    if (type === 'album') {
      const images = slides && slides.length > 0 ? slides : ALBUM_IMAGES;

      // 平面作品(design)：一次一张大图切换浏览
      if (categoryKey === 'design') {
        const handleAlbumPrev = () => {
          setAlbumIndex((prev) => (prev - 1 + images.length) % images.length);
        };
        const handleAlbumNext = () => {
          setAlbumIndex((prev) => (prev + 1) % images.length);
        };
        return (
          <div className="flex flex-col gap-4 w-full animate-fade-in">
            <div className="relative w-full flex items-center justify-center gap-3">
              {images.length > 1 && (
                <button
                  onClick={handleAlbumPrev}
                  className="p-2.5 md:p-3 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/10 text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors shadow-sm cursor-pointer shrink-0"
                >
                  <ChevronLeft size={22} />
                </button>
              )}
              <div className="flex-1 relative rounded-xl overflow-hidden bg-white/[0.05] backdrop-blur-md border border-white/10 shadow-sm flex items-center justify-center group">
                <img
                  src={images[albumIndex]}
                  alt={`${title} - ${albumIndex + 1}`}
                  onClick={() => { setLightboxIndex(albumIndex); setLightboxOpen(true); }}
                  className="max-h-[560px] w-auto h-auto object-contain cursor-zoom-in hover:scale-[1.01] transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-zinc-600 dark:text-zinc-400 text-[10px] font-mono font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 pointer-events-none shadow-sm">
                  <Maximize size={10} />
                  <span>点击放大全屏浏览</span>
                </div>
                {images.length > 1 && (
                  <div className="absolute bottom-4 right-4 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-zinc-600 dark:text-zinc-400 text-[10px] font-mono font-semibold shadow-sm">
                    {albumIndex + 1} / {images.length}
                  </div>
                )}
              </div>
              {images.length > 1 && (
                <button
                  onClick={handleAlbumNext}
                  className="p-2.5 md:p-3 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/10 text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors shadow-sm cursor-pointer shrink-0"
                >
                  <ChevronRight size={22} />
                </button>
              )}
            </div>
            <div className="w-full mt-2">
              <input
                type="range"
                min={0}
                max={images.length - 1}
                value={albumIndex}
                onChange={(e) => setAlbumIndex(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full appearance-none cursor-pointer accent-zinc-900 dark:accent-white transition-colors"
              />
              <div className="flex items-center justify-between text-[10px] text-zinc-500 dark:text-zinc-400 font-mono mt-2">
                <span>Progress / 进度 · 拖动切换</span>
                <span>{albumIndex + 1} / {images.length}</span>
              </div>
            </div>
            <div className="flex items-center justify-between flex-wrap gap-2 px-1">
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">Slideshow / 幻灯片浏览</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">← → 切换 · 点击图片全屏查看</span>
            </div>
          </div>
        );
      }

      // 项目经历(project)：左侧大图瀑布流，右侧文字分层
      if (categoryKey === 'project') {
        return (
          <div className="w-full flex flex-col items-center gap-3 animate-fade-in">
            {/* 标题 + 说明 */}
            <div className="w-full flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <Layout size={14} className="text-zinc-600 dark:text-zinc-400" />
                <span className="text-xs font-bold text-[#1A1A1A] dark:text-white">策划案部分内容</span>
              </div>
              <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">共 {images.length} 张 · 滚轮浏览 · 点击放大</span>
            </div>

            {/* 大图垂直滚动容器 */}
            <div className="w-full max-h-[520px] overflow-y-auto overflow-x-hidden custom-scrollbar rounded-2xl border border-[#E5E5E5] dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 shadow-sm">
              <div className="flex flex-col gap-3 p-3">
                {images.map((img, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    onClick={() => { setLightboxIndex(index); setLightboxOpen(true); }}
                    className="relative w-full rounded-xl overflow-hidden bg-white/10 border border-white/15 cursor-pointer group hover:border-zinc-500 dark:hover:border-zinc-600 transition-all hover:shadow-lg"
                  >
                    <img
                      src={img}
                      alt={`${title} - ${index + 1}`}
                      className="w-full h-auto object-contain group-hover:scale-[1.01] transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <Maximize size={24} className="text-white drop-shadow-xl" />
                    </div>

                  </motion.div>
                ))}
              </div>
            </div>

            {/* 滚动提示 */}
            <div className="flex items-center gap-2 text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">
              <span>↓</span>
              <span>向下滚动查看更多</span>
              <span>↓</span>
            </div>

            {/* 查看完整策划案按钮 */}
            {onNavigateCategory && (
              <div className="w-full mt-2">
                <button
                  onClick={() => onNavigateCategory('design', title)}
                  className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-xl text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <BookOpen size={14} />
                  <span>查看完整策划案</span>
                  <ArrowRight size={12} className="text-zinc-300 dark:text-zinc-600" />
                </button>
                <p className="text-[9px] text-zinc-400 dark:text-zinc-500 font-mono text-center mt-2">→ 平面作品 · 完整32张 PPT</p>
              </div>
            )}
          </div>
        );
      }

      // 摄影作品(photo)：网格平铺展示
      return (
        <div className="flex flex-col gap-6 w-full animate-fade-in">
          <div className="bg-white/[0.06] backdrop-blur-md border border-white/10 p-5 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Layout size={16} className="text-zinc-800 dark:text-zinc-200" />
              <div>
                <span className="text-sm font-bold text-[#1A1A1A] dark:text-white">{title}</span>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono mt-0.5">共 {images.length} 张图片 · 点击图片查看全屏大图 · 支持滚轮滑动浏览</p>
              </div>
            </div>
            
            {/* Grid layout for thumbnail preview */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {images.map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  onClick={() => { setLightboxIndex(index); setLightboxOpen(true); }}
                  className="relative aspect-square rounded-xl overflow-hidden bg-white/[0.08] border border-white/15 cursor-pointer group hover:border-zinc-400 dark:hover:border-zinc-600 transition-all hover:shadow-md"
                >
                  <img
                    src={img}
                    alt={`${title} - ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Maximize size={20} className="text-white" />
                  </div>
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.5 text-[8px] font-mono bg-black/60 text-white rounded">
                    {index + 1}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (type === 'ppt') {
      const absoluteSrc = src && /^https?:\/\//.test(src) ? src : src;
      const officeViewer = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(window.location.origin + '/' + absoluteSrc)}`;

      return (
        <div className="flex flex-col gap-4 w-full">
          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-white/[0.05] backdrop-blur-md border border-white/10 shadow-sm flex items-center justify-center">
            {/* Real office embed */}
            <iframe
              src={officeViewer}
              className="absolute inset-0 w-full h-full"
              allowFullScreen
              title={title}
              onError={(e) => console.log('iframe error:', e)}
            />
            {/* Visual Back Up indicator if Microsoft viewer gets blocked */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-white/95 dark:from-zinc-950/95 via-white/40 dark:via-zinc-900/40 to-transparent flex flex-col justify-end p-8 text-left">
              <span className="text-[10px] font-mono text-zinc-700 dark:text-zinc-300 font-bold tracking-widest flex items-center gap-1.5 mb-1 bg-zinc-100 dark:bg-zinc-900 w-fit px-2 py-0.5 rounded border border-[#E5E5E5] dark:border-zinc-800">
                OFFICE LIVE ONLINE PRIVACY SECURED
              </span>
              <p className="text-xs text-zinc-500 dark:text-zinc-450 max-w-md">在线预览框架已加载。如果当前策略拦截，可以直接点击下方超级链接下载学业成果幻灯片。</p>
            </div>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <FileText size={14} className="text-zinc-400 dark:text-zinc-500" />
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono italic">{src}</span>
            </div>
            
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); alert("策划案正在下载中...\n(Simulated file acquisition)"); }}
              className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-xl rounded-lg transition-colors shadow-sm"
            >
              <Download size={12} />
              <span>下载 PPTX 完整原档</span>
            </a>
          </div>
        </div>
      );
    }

    if (type === 'pdf') {
      return (
        <div className="flex flex-col gap-4 w-full h-[650px]">
          <iframe
            src={src}
            className="w-full h-full rounded-xl border border-[#E5E5E5] dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-sm"
            title={title}
          />
          <div className="flex items-center justify-between flex-wrap gap-3 mt-1">
            <span className="text-xs text-zinc-400 dark:text-zinc-500 font-mono">Academic Report (PDF Document Node)</span>
            <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 bg-white/10 border border-white/15 px-3 py-1.5 rounded-lg shadow-sm">
              文档在线预览 · 可滚动浏览
            </span>
          </div>
        </div>
      );
    }

    if (type === 'html') {
      if (src === 'html_media_1') {
        return (
          <div className="w-full bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6 text-zinc-650 dark:text-zinc-300 shadow-[0_1px_3px_rgba(0,0,0,0.01)] text-left animate-fade-in">
            <div className="border-b border-[#E5E5E5] dark:border-zinc-800 pb-4">
              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-bold">Campaign Operations Audit / 战役复盘</span>
              <h3 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mt-1">数码桌搭爆款冷启动 · 拆机报告</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "点击赞同总量", val: "52,102", unit: "Loves" },
                { label: "干货收藏汇总", val: "32,911", unit: "Saves" },
                { label: "精准引流商域", val: "15.4%", unit: "Conv Rate" },
                { label: "爆款复盘产出", val: "100W+", unit: "Impressions" }
              ].map((m, i) => (
                <div key={i} className="p-4 bg-white/[0.05] backdrop-blur-md border border-white/10 rounded-xl text-left">
                  <div className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono tracking-wider font-semibold">{m.label}</div>
                  <div className="text-xl md:text-2xl font-extrabold text-[#1A1A1A] dark:text-white mt-1">{m.val}</div>
                  <div className="text-[9px] text-zinc-500 dark:text-zinc-400 font-mono mt-0.5 font-bold">{m.unit}</div>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-xs md:text-sm mt-2 leading-relaxed">
              <h4 className="text-[#1A1A1A] dark:text-zinc-200 font-bold">三板斧突围公式：</h4>
              <ul className="list-disc pl-5 space-y-2 text-zinc-500 dark:text-zinc-400">
                <li><strong className="text-[#1A1A1A] dark:text-zinc-200 font-semibold">去装饰化视觉心智：</strong>封面摒弃大红大紫营销字体，改用极致冷淡灰阶、严格的 12 列网格卡片进行功能分区，营造极高信噪比。</li>
                <li><strong className="text-[#1A1A1A] dark:text-zinc-200 font-semibold">结构干货输出：</strong>痛点分类清晰。以 “桌搭三大难（走线、光环境、人体工学）” 为抓手切片，提高内容利他属性。</li>
                <li><strong className="text-[#1A1A1A] dark:text-zinc-200 font-semibold">评论引导机制：</strong>在首条评论利用抽奖配机福利进行用户沉淀，促发权重飞轮运转。</li>
              </ul>
            </div>
          </div>
        );
      }

      if (src === 'html_project_1') {
        return (
          <div className="w-full bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6 text-zinc-650 dark:text-zinc-300 shadow-[0_1px_3px_rgba(0,0,0,0.01)] text-left animate-fade-in">
            <div className="border-b border-[#E5E5E5] dark:border-zinc-800 pb-4">
              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-bold">ByteDance Internship Journey / 字节运营实践</span>
              <h3 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mt-1">大厂视觉与内容运营实践项目</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-bold">CORE FOCUS / 职责版图</h4>
                <div className="space-y-2 text-xs md:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  <p><strong>1. 矩阵美学规范统一：</strong>搭建官方新媒体账号矩阵的设计组件系统。定义主色及严格的黑白卡片网格构架，保证跨端品牌一致性。</p>
                  <p><strong>2. 主体活动策划：</strong>主导两期大型线上流量裂变活动，利用高信噪比冷淡排版和趣味模版，吸引超 30w 创作者主动投稿。</p>
                </div>
              </div>

              <div className="p-5 bg-white/[0.05] backdrop-blur-md border border-white/10 rounded-xl space-y-3 text-left">
                <h4 className="text-xs font-mono text-zinc-400 dark:text-zinc-500 uppercase font-bold">Tracked Metrics / 沉淀产出</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline border-b border-[#E5E5E5] dark:border-zinc-800 pb-1.5">
                    <span className="text-xs text-zinc-400 dark:text-zinc-500">活动大盘曝光</span>
                    <span className="text-sm font-extrabold text-[#1A1A1A] dark:text-white">1000 万+ Exposure</span>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-[#E5E5E5] dark:border-zinc-800 pb-1.5">
                    <span className="text-xs text-zinc-400 dark:text-zinc-500">裂变参与峰值</span>
                    <span className="text-sm font-extrabold text-[#1A1A1A] dark:text-white">+230% MoM</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-zinc-400 dark:text-zinc-500">官方模板复用</span>
                    <span className="text-sm font-extrabold text-[#1A1A1A] dark:text-white">5 万+ Downloads</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }

    if (type === 'image') {
      return (
        <div className="flex flex-col gap-4 w-full animate-fade-in justify-center items-center">
          <div className="relative aspect-auto max-h-[600px] w-full rounded-xl overflow-hidden bg-white/[0.05] backdrop-blur-md border border-white/10 shadow-sm flex items-center justify-center group">
            <img
              src={src}
              alt={title}
              onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }}
              referrerPolicy="no-referrer"
              className="max-h-[580px] w-auto h-auto object-contain rounded-lg shadow-sm cursor-zoom-in hover:scale-[1.01] transition-transform duration-500"
            />
            <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-zinc-600 dark:text-zinc-400 text-[10px] font-mono font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 pointer-events-none shadow-sm">
              <Maximize size={10} />
              <span>点击图片放大浏览</span>
            </div>
          </div>
          <span className="text-xs text-zinc-400 dark:text-zinc-500 font-mono">Photography Work / 摄影视觉原片展示</span>
        </div>
      );
    }

    if (type === 'web') {
      return (
        <div className="flex flex-col gap-3 w-full animate-fade-in">
          <div className="relative mx-auto w-full aspect-[9/16] max-w-[360px] h-[560px] max-h-[80vh] md:max-w-[400px] md:aspect-[10/16] md:h-[620px] rounded-[1.75rem] overflow-hidden bg-[#0A0A0A] dark:bg-[#0A0A0A] border border-zinc-200 dark:border-zinc-800 shadow-[0_20px_60px_rgba(0,0,0,0.25)] ring-1 ring-black/5">
            <iframe
              src={src}
              className="absolute inset-0 w-full h-full"
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          </div>
          <div className="flex items-center justify-between flex-wrap gap-2 px-1">
            <span className="text-xs text-zinc-500 dark:text-zinc-450 font-mono">Interactive Webview (Iframe Sandboxed)</span>
            <a
              href={src}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-xl rounded-full transition-colors cursor-pointer"
            >
              <span>在新标签页中独立打开网页</span>
              <ArrowRight size={12} />
            </a>
          </div>
        </div>
      );
    }

    if (type === 'link') {
      const currentItem = allItems[currentIndex];
      // 抖音平台：使用嵌入播放器
      if (currentItem?.platform === '抖音') {
        const douyinEmbed = getDouyinEmbedUrl(src);
        return (
          <div className="flex flex-col gap-4 w-full animate-fade-in">
            <div className="flex flex-col gap-4">
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-zinc-800 shadow-md">
                <iframe
                  src={douyinEmbed || src}
                  width="1920"
                  height="1080"
                  frameBorder="0"
                  className="absolute inset-0 w-full h-full"
                  referrerPolicy="unsafe-url"
                  allowFullScreen
                  title={title}
                />
              </div>
              <div className="flex items-center justify-between flex-wrap gap-2 px-1">
                <span className="text-xs text-zinc-500 font-mono">Douyin Player (Embedded)</span>
                <a
                  href={src}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-[#00f2ea] hover:bg-[#00d9d2] text-black rounded-full transition-colors"
                >
                  <span>直接打开抖音播放页</span>
                  <ArrowRight size={12} />
                </a>
              </div>
            </div>
          </div>
        );
      }
      // 小红书：平台禁止 iframe 嵌入，隐藏左侧媒体区域，跳转按钮放在右侧元数据面板底部
      if (allItems[currentIndex]?.platform === '小红书') {
        return null;
      }
      // 其他外链：移动端 iframe 展示
      return (
        <div className="flex flex-col gap-3 w-full animate-fade-in">
          <div className="relative mx-auto w-full aspect-[9/16] max-w-[380px] h-[580px] max-h-[80vh] md:max-w-[420px] md:aspect-[10/16] md:h-[640px] rounded-[1.75rem] overflow-hidden bg-[#0A0A0A] dark:bg-[#0A0A0A] border border-zinc-200 dark:border-zinc-800 shadow-[0_20px_60px_rgba(0,0,0,0.25)] ring-1 ring-black/5">
            <iframe
              src={src}
              className="absolute inset-0 w-full h-full"
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />
          </div>
          <div className="flex items-center justify-between flex-wrap gap-2 px-1">
            <span className="text-xs text-zinc-500 dark:text-zinc-450 font-mono">
              {currentItem?.platform ? `${currentItem.platform} · ` : ''}External Link
            </span>
            <a
              href={src}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-xl rounded-full transition-colors cursor-pointer"
            >
              <span>在新标签页中独立打开</span>
              <ArrowRight size={12} />
            </a>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-[#090a0f]/70 backdrop-blur-xl border border-white/10 z-100 flex justify-center items-center p-6 md:p-12 overflow-y-auto transition-colors duration-500">
      
      {/* Immersive Modal Close Button */}
      <button
        onClick={onClose}
        className="absolute top-8 right-8 p-3 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/10 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-all shadow-sm z-110 cursor-pointer hover:scale-105"
      >
        <X size={18} />
      </button>

      {/* Floating Bottom Navigator dots */}
      {allItems.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-white/[0.06] backdrop-blur-md border border-white/10 px-6 py-3 rounded-full shadow-sm backdrop-blur-md z-110">
          <button
            onClick={() => onNavigate(-1)}
            className="text-zinc-400 hover:text-black dark:text-zinc-500 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ChevronLeft size={18} />
          </button>
          
          <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 tracking-widest whitespace-nowrap font-semibold">
            WORK {currentIndex + 1} / {allItems.length}
          </span>

          <button
            onClick={() => onNavigate(1)}
            className="text-zinc-400 hover:text-black dark:text-zinc-500 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* Primary Container Grid */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className={`w-full max-w-7xl flex flex-col md:flex-row gap-8 items-stretch pt-12 pb-16 outline-none ${allItems[currentIndex]?.platform === '小红书' ? 'md:justify-center' : ''}`}
      >
        {/* Left Half: Embedded Medium content */}
        <div className={`flex-[3] flex items-center justify-center min-w-0 ${allItems[currentIndex]?.platform === '小红书' ? 'md:hidden' : ''}`}>
          {renderItemMedia()}
        </div>

        {/* Right Half: Details Metapanel */}
        <div className={`w-full md:w-[380px] shrink-0 flex flex-col justify-between gap-6 border-t border-[#E5E5E5] dark:border-zinc-800 pt-6 ${allItems[currentIndex]?.platform === '小红书' ? '' : 'md:border-t-0 md:border-l md:pl-8'} text-zinc-650 dark:text-zinc-350`}>
          <div className="space-y-4">
            <span className="inline-block px-2.5 py-1 bg-white/10 border border-white/15 text-zinc-700 dark:text-zinc-300 font-mono text-[9px] font-bold rounded uppercase">
              {type} FILE IN-USE
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-[#1A1A1A] dark:text-white tracking-tight leading-tight">
              {title}
            </h2>
            {categoryKey === 'project' ? (
              <div className="max-h-[420px] overflow-y-auto custom-scrollbar space-y-4 mt-4 pr-1">
                {/* 项目详情标签 */}
                <div className="flex items-center gap-2 mb-2">
                  <FileText size={12} className="text-zinc-600 dark:text-zinc-400" />
                  <span className="text-[10px] font-mono text-zinc-450 dark:text-zinc-500 font-bold uppercase tracking-wider">项目详情 / PROJECT DETAILS</span>
                </div>
                {/* 分层内容 */}
                <div className="space-y-3">
                  {(() => {
                    const sections: Array<{level: number; title?: string; content: string[]}> = [];
                    const lines = (fullDesc || '').split('\n');
                    let currentSection: typeof sections[0] | null = null;
                    lines.forEach((line) => {
                      const trimmed = line.trim();
                      if (!trimmed) {
                        if (currentSection) sections.push(currentSection);
                        currentSection = null;
                        return;
                      }
                      const mainMatch = trimmed.match(/^[一二三四五六]、(.+)/);
                      if (mainMatch) {
                        if (currentSection) sections.push(currentSection);
                        currentSection = { level: 1, title: mainMatch[1], content: [] };
                        return;
                      }
                      const subMatch = trimmed.match(/^(\d+)\.(.+)/);
                      if (subMatch) {
                        if (currentSection) currentSection.content.push(`**${subMatch[1]}. ${subMatch[2]}`);
                        return;
                      }
                      if (currentSection) currentSection.content.push(trimmed.replace(/^#+\s*/, ''));
                    });
                    if (currentSection) sections.push(currentSection);
                    return sections.map((section, sIdx) => (
                      <div key={sIdx}>
                        <h4 className="text-sm font-bold text-[#1A1A1A] dark:text-white mb-1.5 flex items-center gap-2">
                          <span className="w-1 h-4 bg-zinc-800 dark:bg-zinc-200 rounded-full shrink-0" />
                          {section.title}
                        </h4>
                        <div className="pl-3 space-y-1">
                          {section.content.map((para, pIdx) => {
                            if (para.startsWith('**')) {
                              const clean = para.replace(/^\*\*/, '').replace(/\*\*/g, '');
                              return (
                                <p key={pIdx} className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 mt-1">{clean}</p>
                              );
                            }
                            return (
                              <p key={pIdx} className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{para}</p>
                            );
                          })}
                        </div>
                      </div>
                    ));
                  })()}
                </div>

                {/* 查看完整策划案按钮已移至左侧图片下方 */}
              </div>
            ) : (
              <div className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed space-y-2 mt-4 font-normal">
              <p>{fullDesc}</p>
            </div>
            )}
            {type === 'video' && allItems[currentIndex]?.tags && allItems[currentIndex].tags.length > 0 && (
              <div className="mt-4">
                <span className="text-[10px] font-mono text-zinc-450 dark:text-zinc-500 font-bold uppercase tracking-wider">职责 / ROLE</span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {allItems[currentIndex].tags.map((tag, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-white/10 border border-white/15 text-zinc-700 dark:text-zinc-300 text-[11px] font-medium rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 外链作品：突出展示点赞/收藏/浏览数据 */}
            {type === 'link' && allItems[currentIndex] && (
              <div className="mt-6">
                <span className="text-[10px] font-mono text-zinc-450 dark:text-zinc-500 font-bold uppercase tracking-wider">互动数据 / ENGAGEMENT</span>
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {allItems[currentIndex].likes && (
                    <div className="p-3 rounded-xl bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-950/40 dark:to-rose-900/20 border border-rose-200/60 dark:border-rose-900/40 text-center shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                      <div className="text-lg font-extrabold text-rose-600 dark:text-rose-400 leading-none">{allItems[currentIndex].likes}</div>
                      <div className="text-[9px] font-mono text-zinc-500 dark:text-zinc-400 mt-1.5 font-semibold">点赞 / LIKES</div>
                    </div>
                  )}
                  {allItems[currentIndex].collects && (
                    <div className="p-3 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/40 dark:to-amber-900/20 border border-amber-200/60 dark:border-amber-900/40 text-center shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                      <div className="text-lg font-extrabold text-amber-600 dark:text-amber-400 leading-none">{allItems[currentIndex].collects}</div>
                      <div className="text-[9px] font-mono text-zinc-500 dark:text-zinc-400 mt-1.5 font-semibold">收藏 / COLLECTS</div>
                    </div>
                  )}
                  {allItems[currentIndex].views && (
                    <div className="p-3 rounded-xl bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-950/40 dark:to-sky-900/20 border border-sky-200/60 dark:border-sky-900/40 text-center shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                      <div className="text-lg font-extrabold text-sky-600 dark:text-sky-400 leading-none">{allItems[currentIndex].views}</div>
                      <div className="text-[9px] font-mono text-zinc-500 dark:text-zinc-400 mt-1.5 font-semibold">浏览 / VIEWS</div>
                    </div>
                  )}
                </div>
                {allItems[currentIndex].platform && (
                  <div className="mt-3 flex items-center gap-1.5 text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-zinc-500 dark:bg-zinc-400" />
                    <span className="font-semibold uppercase tracking-wider">{allItems[currentIndex].platform}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="space-y-3 border-t border-[#E5E5E5] dark:border-zinc-800 pt-4">
            <div className="text-[10px] font-mono text-zinc-450 dark:text-zinc-500 font-bold uppercase tracking-wider">PROJECT METADATA / 归档属性</div>
            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span className="text-zinc-400 dark:text-zinc-500 block font-semibold">Category</span>
                <span className="text-zinc-800 dark:text-zinc-300 mt-0.5 block font-medium">{type.toUpperCase()} DOCUMENT</span>
              </div>
              <div>
                <span className="text-zinc-400 dark:text-zinc-500 block font-semibold">Archive ID</span>
                <span className="text-zinc-800 dark:text-zinc-300 mt-0.5 block font-medium">#A-00{currentIndex + 1}</span>
              </div>
            </div>

            {/* 小红书专属：底部跳转按钮 */}
            {allItems[currentIndex]?.platform === '小红书' && (
              <div className="mt-6">
                <a
                  href={src}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-xl text-sm font-bold shadow-sm transition-colors cursor-pointer"
                >
                  <span>在小红书网页版中打开</span>
                  <ArrowRight size={14} />
                </a>
                <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 text-center mt-3 leading-relaxed">
                  小红书平台禁止第三方页面 iframe 直接嵌入，请点击上方按钮跳转官方页面浏览原帖
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Lightbox - Fullscreen Image Viewer */}
      {lightboxOpen && (() => {
        const imgs = getLightboxImages();
        if (imgs.length === 0) return null;
        const hasMultiple = imgs.length > 1;
        const imgSrc = imgs[lightboxIndex];
        const handlePrev = (e: React.MouseEvent) => {
          e.stopPropagation();
          setLightboxIndex((prev) => {
            const newIdx = (prev - 1 + imgs.length) % imgs.length;
            if (type === 'album') setAlbumIndex(newIdx);
            return newIdx;
          });
        };
        const handleNext = (e: React.MouseEvent) => {
          e.stopPropagation();
          setLightboxIndex((prev) => {
            const newIdx = (prev + 1) % imgs.length;
            if (type === 'album') setAlbumIndex(newIdx);
            return newIdx;
          });
        };
        return (
          <div
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center animate-fade-in"
            onClick={() => setLightboxOpen(false)}
          >
            <div className="relative flex items-center justify-center w-full h-full px-4 md:px-8" onClick={(e) => e.stopPropagation()}>
              {/* Left Arrow */}
              {hasMultiple && (
                <button
                  onClick={handlePrev}
                  className="absolute left-4 md:left-8 z-10 p-3 md:p-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors cursor-pointer backdrop-blur-md shadow-lg"
                >
                  <ChevronLeft size={24} />
                </button>
              )}

              {/* Main Image */}
              <div className="flex flex-col items-center gap-5 max-w-[100%]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={lightboxIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    src={imgSrc}
                    alt={`${title} - ${lightboxIndex + 1}`}
                    className="max-w-[85vw] max-h-[80vh] object-contain rounded-xl shadow-2xl"
                  />
                </AnimatePresence>
              </div>

              {/* Right Arrow */}
              {hasMultiple && (
                <button
                  onClick={handleNext}
                  className="absolute right-4 md:right-8 z-10 p-3 md:p-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors cursor-pointer backdrop-blur-md shadow-lg"
                >
                  <ChevronRight size={24} />
                </button>
              )}
            </div>

            {/* Top-right title + close */}
            <div className="absolute top-6 right-6 flex items-center gap-3 z-[210]">
              <span className="text-zinc-400 text-[11px] font-mono tracking-widest font-semibold hidden md:block">{title}</span>
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Bottom: page counter + hint */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-[210]">
              {hasMultiple && (
                <span className="px-4 py-2 rounded-full bg-white/10 text-white text-[11px] font-mono font-semibold border border-white/20 tracking-wider">
                  {lightboxIndex + 1} / {imgs.length}
                </span>
              )}
              <span className="px-4 py-2 rounded-full bg-white/10 text-zinc-300 text-[10px] font-mono font-semibold border border-white/20 tracking-wider">
                {hasMultiple ? '← → 切换图片 · 点击空白或 ESC 关闭' : '点击空白或按 ESC 关闭'}
              </span>
            </div>
          </div>
        );
      })()}

    </div>
  );
}
