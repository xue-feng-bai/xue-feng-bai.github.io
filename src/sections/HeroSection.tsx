import { Suspense, lazy, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SmartThreads = lazy(() => import('./SmartThreads'));

const skillCards = [
  {
    title: 'AI 产品流程',
    desc: 'Agent 角色、状态流转、Prompt 工作流设计',
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 28L14 8L18 16L28 4" />
        <circle cx="4" cy="28" r="2" /><circle cx="14" cy="8" r="2" />
        <circle cx="18" cy="16" r="2" /><circle cx="28" cy="4" r="2" />
      </svg>
    ),
    value: '6',
    unit: '种面试类型',
  },
  {
    title: 'AI Coding',
    desc: 'Claude、Codex 辅助原型验证与快速迭代',
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="8,10 2,16 8,22" />
        <polyline points="24,10 30,16 24,22" />
        <line x1="12" y1="26" x2="20" y2="6" />
      </svg>
    ),
    value: '4',
    unit: '周 MVP 上线',
  },
  {
    title: '数据驱动',
    desc: 'SQL、Python、A/B 测试、风险指标分析',
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="12" width="6" height="16" rx="1" />
        <rect x="13" y="6" width="6" height="22" rx="1" />
        <rect x="22" y="16" width="6" height="12" rx="1" />
      </svg>
    ),
    value: '24',
    unit: '项风控策略',
  },
  {
    title: '工程沟通',
    desc: '前后端、数据库、语音链路、模型路由',
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="16" cy="16" r="10" />
        <circle cx="16" cy="16" r="4" />
        <path d="M16 2V6M16 26V30M2 16H6M26 16H30" />
      </svg>
    ),
    value: '40+',
    unit: '项需求落地',
  },
];

function CountUpNumber({ target, suffix = '' }: { target: string; suffix?: string }) {
  const [display, setDisplay] = useState('0');
  const num = parseInt(target.replace(/\D/g, ''));
  const isPlus = target.includes('+');

  useEffect(() => {
    const duration = 1500;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * num).toString());
      if (progress < 1) requestAnimationFrame(animate);
    };
    const timer = setTimeout(() => requestAnimationFrame(animate), 500);
    return () => clearTimeout(timer);
  }, [num]);

  return <span>{display}{isPlus ? '+' : ''}{suffix}</span>;
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-[#fbf9f4]"
      style={{ minHeight: '85vh' }}
    >
      {/* 3D Background - confined to hero area */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <Suspense
          fallback={
            <div className="w-full h-full bg-gradient-to-br from-[#fbf9f4] via-[#f5f0e8] to-[#e8e0d4]" />
          }
        >
          <SmartThreads />
        </Suspense>
      </div>

      {/* Content */}
      <div className="relative z-10 section-container pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center" style={{ minHeight: '65vh' }}>
          {/* Left: Personal Info */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#ff7438] animate-pulse" />
                <span className="font-mono-label text-[#0d0d0c]/50">
                  求职方向：AI产品经理
                </span>
              </div>
              <h1 className="heading-display text-5xl md:text-6xl lg:text-7xl text-[#0d0d0c] mb-4">
                白雪峰
              </h1>
              <p className="text-lg text-[#0d0d0c]/60 leading-relaxed max-w-md">
                从数据分析到 AI 产品，致力于将前沿 AI 转化为直观、高效且以人为本的产品体验。在风控业务和个人 AI 项目中积累了从 0 到 1 的完整产品推进经验。
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              {['上海', '27岁', '内蒙古大学（211）'].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full border border-[#0d0d0c]/10 text-sm text-[#0d0d0c]/60"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-4 pt-2"
            >
              <a href="#skills" className="btn-pill-primary text-sm">
                探索能力
              </a>
              <a href="#projects" className="btn-pill border border-[#0d0d0c]/20 text-[#0d0d0c] hover:border-[#ff7438] hover:text-[#ff7438] text-sm transition-all duration-300">
                查看项目
              </a>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex gap-8 pt-4"
            >
              {[
                { num: '4+', label: '年工作经验' },
                { num: '2', label: '段工作经历' },
                { num: '1', label: '独立全栈项目' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl md:text-3xl font-medium text-[#0d0d0c]">
                    <CountUpNumber target={s.num} />
                  </div>
                  <div className="font-mono-label text-[#0d0d0c]/40 text-xs mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Skill Cards Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4">
              {skillCards.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + i * 0.12,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="group relative bg-white/60 backdrop-blur-sm rounded-2xl p-5 md:p-6 border border-[#0d0d0c]/5 hover:border-[#ff7438]/30 transition-all duration-500 hover:shadow-lg hover:shadow-[#ff7438]/5"
                >
                  {/* Icon */}
                  <div className="text-[#ff7438] mb-4 transition-transform duration-500 group-hover:scale-110">
                    {card.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-base md:text-lg font-medium text-[#0d0d0c] mb-2 tracking-tight">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs md:text-sm text-[#0d0d0c]/50 leading-relaxed mb-4">
                    {card.desc}
                  </p>

                  {/* Count */}
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl md:text-3xl font-medium text-[#ff7438]">
                      <CountUpNumber target={card.value} />
                    </span>
                    <span className="font-mono-label text-[#0d0d0c]/40 text-xs">
                      {card.unit}
                    </span>
                  </div>

                  {/* Hover accent line */}
                  <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-[#ff7438] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
