import React from 'react';
import { motion } from 'motion/react';
import { STAGES } from '../data';
import { SubPageKey, PortfolioItem, ItemType } from '../types';
import { ArrowDown, ArrowUpRight, Phone, Mail, MessageCircle, GraduationCap, Briefcase, Trophy, Sparkles } from 'lucide-react';
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
const GLASS_CARD = 'bg-white/[0.08] border border-white/10 rounded-xl';
const GLASS_BTN =
  'inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/25 text-white text-xs font-mono tracking-[0.25em] uppercase hover:bg-white/20 transition-colors duration-300 cursor-pointer';

export default function MainStage({ onOpenModal }: MainStageProps) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="relative w-full">
      {/* ═══ HERO / 完整个人介绍 ═══ */}
      <section className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-14 lg:px-24 pt-24 pb-16">
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
            {/* 左列：求职意向 / 教育背景 / 实习经历 / 校园经历 / 荣誉情况 */}
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
                  相关课程：广告创意与策划、市场营销、市场调查与数据分析、消费者行为学、视听新媒体制作等。
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
                      <h5 className="text-sm text-white font-bold">拾刻互动 · 内容运营</h5>
                      <span className="text-[10px] text-zinc-400 font-mono">2026.06 — 2026.10</span>
                    </div>
                    <ul className="mt-2 space-y-2 text-xs text-zinc-400 leading-relaxed list-none">
                      <li><span className="font-semibold text-zinc-300">内容策划：</span>持续扩大品牌平台种草声量、强化产品差异化表达并促进用户转化，负责小红书平台 KOL / UGC 内容策划、撰写及稿件优化，围绕产品卖点、用户痛点与平台调性进行选题及表达调整，参与 100+ 篇达人笔记生产，累计获得 1346万+ 曝光、153万+ 阅读、13.5万+ 互动，40+ 篇达成爆文，爆文率超 40%。</li>
                      <li><span className="font-semibold text-zinc-300">撰写 Brief 与稿件：</span>基于 Tracking 数据调整下一季度内容方向，撰写并优化 Brief，提供选题、文案、创作方向及视觉 demo，让达人创作稿件时有明确参考，使内容更软性、卖点正确并符合客户需求；其中趣味日常向爆文率超 95%，单篇最高 230万+ 曝光、3.7万+ 互动。</li>
                      <li><span className="font-semibold text-zinc-300">追踪数据迭代内容：</span>持续 Tracking 曝光、互动、关注及站外行为等指标，参与内容复盘与选题迭代，累计带来 2360+ 新增关注、3300+ 站外活跃行为 UV、1400+ 意向行为 UV，实现从内容曝光、用户种草到转化的链路追踪。</li>
                    </ul>
                  </div>
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
                  <ul className="space-y-2 text-xs text-zinc-400 mt-2 leading-relaxed list-none">
                    <li><span className="font-semibold text-zinc-300">挖掘热点选题：</span>持续观察抖音等平台热门内容的传播表现，将高互动内容形式迁移至校园场景，结合学生兴趣进行选题改造，挖掘具有传播潜力的校园内容。</li>
                    <li><span className="font-semibold text-zinc-300">视频全流程产出：</span>负责选题、拍摄、剪辑及视觉包装，并参与校园大型活动拍摄、剪辑；在官方账号下发十余篇署名视频，累计点赞量 1万+。</li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-white/10 pt-5">
                <h4 className="text-zinc-400 font-mono text-xs uppercase font-semibold mb-3">荣誉情况 / HONORS & AWARDS</h4>
                <div className="space-y-2 text-xs text-zinc-400">
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                    <span><span className="font-semibold text-white">竞赛荣誉：</span>全国大学生广告艺术大赛 · 国家一等奖；计算机设计大赛 · 省三等奖</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                    <span><span className="font-semibold text-white">语言证书：</span>CET-6、普通话二级甲等</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-5">
                <h4 className="text-zinc-400 font-mono text-xs uppercase font-semibold mb-3 flex items-center gap-2">
                  <GraduationCap size={14} /> 技能标签 / SKILLS
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['内容策划', '品牌营销', 'KOL 运营', '小红书运营', '短视频剪辑', '平面设计', '数据分析', 'Photoshop', 'Canva', '剪映', 'Excel', 'AI 辅助创作'].map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded-full border border-white/15 bg-white/10 text-[11px] font-mono text-zinc-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 右列：项目经历 / 个人优势 */}
            <div className="flex flex-col gap-5">
              <div>
                <h4 className="text-zinc-300 font-bold text-xs mb-3 uppercase tracking-wider font-mono flex items-center gap-2">
                  <Trophy size={13} /> 项目经历 / PROJECTS
                </h4>
                <div className={`${GLASS_CARD} p-5 space-y-4`}>
                  <div>
                    <div className="flex items-start justify-between">
                      <h5 className="text-sm text-white font-bold">全国大学生广告艺术大赛 · HBN 场景营销策划（队长）</h5>
                      <span className="text-[10px] text-zinc-400 font-mono">2026.05 — 2026.09</span>
                    </div>
                    <ul className="mt-2 space-y-2 text-xs text-zinc-400 leading-relaxed list-none">
                      <li><span className="font-semibold text-zinc-300">项目成果：</span>获得国家一等奖，HBN 品牌赛道第一名。</li>
                      <li><span className="font-semibold text-zinc-300">调研痛点 & 提炼洞察：</span>针对线上消费缺乏真实体验、品牌要打出"真功效"的问题，通过行业报告、消费者需求及竞品研究提炼核心洞察：以高频飞行人群为核心场景，探索产品功效与飞行场景的营销连接。</li>
                      <li><span className="font-semibold text-zinc-300">延展概念与创意：</span>基于消费者洞察提出核心概念，将眼霜功效与飞行场景强绑定，并进一步提出主题航班、空中-地面联动活动及富士全民打卡创意，获得品牌方高度认可。</li>
                      <li><span className="font-semibold text-zinc-300">活动策划：</span>将线上线下触点、主题航班、线上社群传播及互动活动串联，推动品牌从产品功效传播延伸至飞行场景中的体验与互动。</li>
                      <li><span className="font-semibold text-zinc-300">提案视觉设计：</span>负责整案提案 PPT 视觉设计，最终进入全国现场决赛参与现场提案。</li>
                    </ul>
                  </div>
                  <div>
                    <div className="flex items-start justify-between">
                      <h5 className="text-sm text-white font-bold">联创艺空间 · 《怪物》音乐剧整合营销策划（组长）</h5>
                      <span className="text-[10px] text-zinc-400 font-mono">2025.09 — 2025.12</span>
                    </div>
                    <ul className="mt-2 space-y-2 text-xs text-zinc-400 leading-relaxed list-none">
                      <li><span className="font-semibold text-zinc-300">项目成果：</span>团队获"优秀团队"，官方小红书账号单月曝光量提升 50%，粉丝量提升 80%。</li>
                      <li><span className="font-semibold text-zinc-300">整合营销策划：</span>针对音乐剧提升学生群体传播声量及购票转化的需求，确定目标受众，分析同类演出竞品，制定线上线下传播策略打出差异化；并主导活动策划、宣传物料设计及短视频创意、拍摄与剪辑，两条短视频共提升 50% 曝光。</li>
                    </ul>
                  </div>
                  <div>
                    <div className="flex items-start justify-between">
                      <h5 className="text-sm text-white font-bold">青漾湖北 · 武汉文旅产品策划（数据员）</h5>
                      <span className="text-[10px] text-zinc-400 font-mono">2025.02 — 2025.05</span>
                    </div>
                    <ul className="mt-2 space-y-2 text-xs text-zinc-400 leading-relaxed list-none">
                      <li><span className="font-semibold text-zinc-300">项目成果：</span>团队获"最佳文旅推荐官"，文旅产品上线平台。</li>
                      <li><span className="font-semibold text-zinc-300">设计文旅产品：</span>平台需推出面向大学生的文旅产品，小组开展市场调研，结合大学生偏好设计旅游路线；主导调研数据分析、平台数据分析、旅游路线规划和提案 PPT 设计。</li>
                    </ul>
                  </div>
                  <div>
                    <div className="flex items-start justify-between">
                      <h5 className="text-sm text-white font-bold">网易云音乐 · 音乐账号运营（个人运营）</h5>
                      <span className="text-[10px] text-zinc-400 font-mono">2024.04 — 2026.08</span>
                    </div>
                    <ul className="mt-2 space-y-2 text-xs text-zinc-400 leading-relaxed list-none">
                      <li><span className="font-semibold text-zinc-300">内容创作：</span>持续观察音乐社区及社交平台的音乐审美、情绪表达与内容趋势，将用户偏好转化为个人创作选题方向，并独立完成歌曲创作包装、发布排期及持续运营；累计播放量 5万+，单曲播放量最高 5万+。</li>
                      <li><span className="font-semibold text-zinc-300">歌单运营：</span>根据目标听众的音乐偏好进行选曲及歌单策划，并通过关键词布局提升搜索触达，累计获得 5万+ 播放、1000+ 收藏。</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-zinc-300 font-bold text-xs mb-3 uppercase tracking-wider font-mono flex items-center gap-2">
                  <Sparkles size={13} /> 个人优势 / STRENGTHS
                </h4>
                <div className={`${GLASS_CARD} p-5 space-y-3`}>
                  <div>
                    <h5 className="text-sm text-white font-bold">证书与荣誉</h5>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">全国大学生广告艺术大赛国家一等奖、计算机设计大赛省三等奖、CET-6、普通话二级甲等。</p>
                  </div>
                  <div>
                    <h5 className="text-sm text-white font-bold">完整营销策划能力</h5>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">熟悉市场洞察、消费者洞察、创意构思及活动策划全流程，具备整合营销策划到线下提案经验。</p>
                  </div>
                  <div>
                    <h5 className="text-sm text-white font-bold">品牌内容运营能力</h5>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">熟悉小红书内容生产流程，可独立完成内容拆解、选题策划、达人 Brief 及稿件审核优化。</p>
                  </div>
                  <div>
                    <h5 className="text-sm text-white font-bold">新媒体内容创作能力</h5>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">可独立完成选题、拍摄、剪辑，熟练使用 Photoshop、Canva、剪映、美图、Excel 等工具。</p>
                  </div>
                  <div>
                    <h5 className="text-sm text-white font-bold">AI 辅助创作能力</h5>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">熟练使用 ChatGPT、豆包、TRAE、WorkBuddy、即梦等工具，辅助完成内容、视觉创作及网页开发。</p>
                  </div>
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
