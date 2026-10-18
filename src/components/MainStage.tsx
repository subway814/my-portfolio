import React from 'react';
import { motion } from 'motion/react';
import { STAGES } from '../data';
import { SubPageKey, PortfolioItem, ItemType } from '../types';
import { ArrowDown, ArrowUpRight, Phone, Mail, MessageCircle, GraduationCap, Briefcase, Trophy } from 'lucide-react';
import StageSection from './StageSection';

interface MainStageProps {
  onOpenModal: (type: ItemType, src: string, title: string, fullDesc: string, idx: number, allItems: PortfolioItem[], slides?: string[], categoryKey?: SubPageKey) => void;
}

// 章节顺序：项目经历 → 课程作品 → 新媒体 → 视频 → 平面 → 摄影
const CHAPTERS: SubPageKey[] = ['project', 'course', 'media', 'video', 'design', 'photo'];

const CONTACT_ROWS = [
  { icon: Phone, label: '手机 / PHONE', val: '15927613421' },
  { icon: Mail, label: '邮箱 / EMAIL', val: '2979762419@qq.com' },
  { icon: MessageCircle, label: '微信 / WECHAT', val: '15927613421' }
];

// 透明毛玻璃卡片
const GLASS_CARD = 'bg-white/[0.06] border border-white/10 backdrop-blur-md rounded-xl';
const GLASS_BTN =
  'inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/25 text-white text-xs font-mono tracking-[0.25em] uppercase hover:bg-white/20 transition-colors duration-300 cursor-pointer';

export default function MainStage({ onOpenModal }: MainStageProps) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="relative w-full">
      {/* ═══ HERO / 完整个人介绍 ═══ */}
      <section className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-14 lg:px-24 pt-24 pb-16">
          {/* 顶部分隔线 + 章节标签 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hairline w-full mb-10 md:mb-12 flex items-center justify-between font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-zinc-400"
          >
            <span className="bg-transparent pr-4">00 / ABOUT</span>
            <span className="bg-transparent pl-4 hidden md:inline">SUBWAY · PORTFOLIO</span>
          </motion.div>

          {/* 姓名区 */}
          <div className="relative leading-none">
            <motion.h1
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="text-outline text-[clamp(48px,9vw,132px)] font-bold tracking-tight"
            >
              WEI YIMENG
            </motion.h1>
            <motion.span
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
              className="block mt-1 text-[clamp(22px,4.6vw,62px)] font-bold tracking-[0.08em] uppercase text-white/60"
            >
              魏一萌 · PORTFOLIO 2026
            </motion.span>
          </div>

          {/* ═══ 完整个人介绍（依据简历更新） ═══ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 leading-relaxed text-sm md:text-base text-zinc-300"
          >
            {/* 左列：个人信息 / 教育背景 / 实习经历 / 个人优势 */}
            <div className="flex flex-col gap-5">
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                魏一萌 / WEI YIMENG
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className={`${GLASS_CARD} p-4`}>
                  <h4 className="text-[10px] text-zinc-400 font-mono uppercase font-bold">求职意向 / TARGET</h4>
                  <p className="text-sm font-semibold text-white mt-1">内容营销 · 内容运营 · 品牌策划</p>
                </div>
                <div className={`${GLASS_CARD} p-4`}>
                  <h4 className="text-[10px] text-zinc-400 font-mono uppercase font-bold">院校 / SCHOOL</h4>
                  <p className="text-sm font-semibold text-white mt-1">湖北大学 · 广告学</p>
                </div>
              </div>

              <div className={`${GLASS_CARD} p-6`}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-bold text-sm">教育背景 / EDUCATION</h4>
                  <span className="text-[10px] text-zinc-400 font-mono">2023.09 — 2027.06</span>
                </div>
                <p className="text-sm text-zinc-200 font-semibold">湖北大学 · 广告学专业 · 本科</p>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  主修课程：广告创意与策划、市场营销、市场调查与数据分析、消费者行为学、视听新媒体制作等，具备完整广告营销、内容策划、数据复盘专业基础。
                </p>
              </div>

              <div className={`${GLASS_CARD} p-6`}>
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase size={14} className="text-zinc-400" />
                  <h4 className="text-white font-bold text-sm">实习经历 / INTERNSHIP</h4>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-start justify-between">
                      <h5 className="text-sm text-white font-bold">拾刻互动 · 内容策划</h5>
                      <span className="text-[10px] text-zinc-400 font-mono">2026.06 — 2026.10</span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      负责小红书 KOL / UGC 内容策划与数据追踪，跟进内容发布节奏，输出可复用内容模板与复盘结论。
                    </p>
                  </div>
                  <div>
                    <div className="flex items-start justify-between">
                      <h5 className="text-sm text-white font-bold">联创艺空间 · 《怪物》音乐剧整合营销（组长）</h5>
                      <span className="text-[10px] text-zinc-400 font-mono">2025.09 — 2025.12</span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      统筹小红书账号内容策划与跨平台整合营销执行，负责内容选题、物料设计与发布落地。
                    </p>
                  </div>
                  <div>
                    <div className="flex items-start justify-between">
                      <h5 className="text-sm text-white font-bold">青漫湖北 · 武汉文旅产品策划（数据员）</h5>
                      <span className="text-[10px] text-zinc-400 font-mono">2025.02 — 2025.05</span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      参与文旅产品策划、竞品调研与数据分析，输出用户问卷分析与数据洞察，支持策划决策。
                    </p>
                  </div>
                </div>
              </div>

              <div className={`${GLASS_CARD} p-6`}>
                <h4 className="text-white font-bold text-sm mb-3">个人优势 / PERSONAL STRENGTHS</h4>
                <ul className="space-y-3 text-xs text-zinc-400">
                  <li className="leading-relaxed">
                    <span className="font-semibold text-white">完整营销策划能力：</span>
                    可独立完成市场调研、竞品分析、创意策划、物料设计与执行复盘的全链路方案；参与项目获大广赛国家一等奖。
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-semibold text-white">品牌内容运营能力：</span>
                    具备 KOL / UGC 内容策划与账号运营经验，熟悉内容发布节奏与数据追踪，能用数据反哺内容迭代。
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-semibold text-white">新媒体内容创作能力：</span>
                    熟练使用剪映、Photoshop、Canva 等工具，可独立完成短视频拍摄、剪辑、文案与封面设计，作品累计浏览量 1w+。
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-semibold text-white">AI 辅助创作能力：</span>
                    熟练运用 ChatGPT、豆包、TRAE、WorkBuddy 等 AI 工具辅助内容生产与效率提升，单条 AI 辅助内容浏览 5000+、点赞 700+。
                  </li>
                </ul>
              </div>
            </div>

            {/* 右列：项目经历 / 校园经历 / 荣誉情况 / 技能标签 */}
            <div className="flex flex-col gap-5">
              <div>
                <h4 className="text-zinc-300 font-bold text-xs mb-3 uppercase tracking-wider font-mono flex items-center gap-2">
                  <Trophy size={13} /> 项目经历 / PROJECTS
                </h4>
                <div className={`${GLASS_CARD} p-5`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-white font-bold text-sm">全国大学生广告艺术大赛 · HBN 场景营销策划</h4>
                      <p className="text-[11px] text-zinc-400 font-semibold mt-0.5">队长</p>
                    </div>
                    <span className="text-[10px] text-zinc-400 font-mono">2026.05 — 2026.09</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-zinc-400 mt-2">
                    <li className="leading-relaxed">负责行业调研报告与创意策划执行，统筹团队分工与提案呈现，作品获国家一等奖。</li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="text-zinc-300 font-bold text-xs mb-3 uppercase tracking-wider font-mono">
                  校园经历 / CAMPUS EXPERIENCE
                </h4>
                <div className={`${GLASS_CARD} p-5`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-white font-bold text-sm">湖北大学记者团 · 视频部部长</h4>
                      <p className="text-[11px] text-zinc-400 font-semibold mt-0.5">短视频策划 · 拍摄 · 剪辑</p>
                    </div>
                    <span className="text-[10px] text-zinc-400 font-mono">2023.10 — 2025.12</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-zinc-400 mt-2">
                    <li className="leading-relaxed">负责校园视频内容策划与拍摄制作，统筹部门产出，累计产出 1w+ 浏览量。</li>
                    <li className="leading-relaxed">熟悉新媒体发布节奏，具备账号运营、内容产出、热点把控实操经验。</li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-white/10 pt-5">
                <h4 className="text-zinc-400 font-mono text-xs uppercase font-semibold mb-3">荣誉情况 / HONORS & AWARDS</h4>
                <div className="space-y-2 text-xs text-zinc-400">
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                    <span><span className="font-semibold text-white">竞赛荣誉：</span>全国大学生广告艺术大赛 · 国家一等奖</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                    <span><span className="font-semibold text-white">竞赛荣誉：</span>计算机设计大赛 · 省三等奖</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                    <span><span className="font-semibold text-white">语言证书：</span>CET-6、普通话二级甲等</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-5">
                <h4 className="text-zinc-300 font-mono text-xs uppercase font-semibold mb-3 flex items-center gap-2">
                  <GraduationCap size={14} /> 技能标签 / SKILLS
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['内容策划', '品牌营销', 'KOL 运营', '小红书运营', '短视频剪辑', '平面设计', '摄影', '数据分析', 'AI 辅助创作', 'PPT / Excel'].map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded-full border border-white/15 bg-white/10 backdrop-blur-md text-[11px] font-mono text-zinc-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* 下滑提示 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1 }}
            className="mt-14 flex items-center gap-4 text-zinc-400"
          >
            <ArrowDown size={15} className="animate-bounce" />
            <span className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase">Scroll to explore — 01 项目经历</span>
            <span className="hairline flex-1" />
          </motion.div>
        </div>
      </section>

      {/* ═══ 章节：全部作品内容 ═══ */}
      {CHAPTERS.map((key) => (
        <React.Fragment key={key}>
          <StageSection
            id={`chapter-${key}`}
            categoryKey={key}
            stage={STAGES[key]}
            onOpenModal={onOpenModal}
          />
        </React.Fragment>
      ))}

      {/* ═══ 结尾 / 联系 ═══ */}
      <section className="relative w-full border-t border-white/10">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-14 lg:px-24 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white">
              取得联系 / GET IN TOUCH
            </h2>

            <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-4">
              {CONTACT_ROWS.map((row, index) => (
                <div key={index} className={`${GLASS_CARD} flex items-center gap-3 px-4 py-3`}>
                  <row.icon size={16} className="text-zinc-300" />
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">{row.label}</span>
                  <span className="text-sm font-semibold text-white font-mono">{row.val}</span>
                </div>
              ))}
            </div>

            <button
              onClick={scrollToTop}
              className={`${GLASS_BTN} group mt-8`}
            >
              回到顶部 · 查看完整个人介绍
              <ArrowUpRight size={13} className="rotate-45 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
