import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ── Experience Data ── */
const experiences = [
  {
    company: '君航微金科技有限公司',
    title: '数据分析师（策略分析）',
    time: '2024.05 — 至今',
    location: '北京',
    highlights: [
      '主导 24 项风控策略从 0 到 1 的设计、上线与迭代',
      '独立负责新客业务经营分析复盘，直接向副总经理汇报',
      '推动 40+ 项风控业务需求跨部门落地',
      '搭建内部风控撞库配置系统，实现策略配置自动化',
    ],
    skills: { product: 90, data: 95, strategy: 92, collaboration: 88 },
  },
  {
    company: '北京江融信科技有限公司',
    title: '数据分析师',
    time: '2022.05 — 2024.05',
    location: '北京',
    highlights: [
      '优化数据处理流程，缩短报表制作时间 30%',
      '撰写分析报告 10 余篇，3 篇直接推动策略调整',
      '搭建风险监控预警体系，保障业务稳健发展',
      '负责模型上线后的监控和维护，保障模型稳定性',
    ],
    skills: { product: 70, data: 88, strategy: 80, collaboration: 85 },
  },
];

const radarLabels = ['产品思维', '数据分析', '策略设计', '跨部门协作'];
const radarKeys = ['product', 'data', 'strategy', 'collaboration'] as const;

/* ── SVG Path Drawing Timeline ── */
function TimelinePath({ index }: { index: number }) {
  const ref = useRef<SVGPathElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <svg
      className="absolute left-[19px] md:left-[27px] top-12 w-[2px] h-[calc(100%-48px)] overflow-visible"
      preserveAspectRatio="none"
    >
      <motion.path
        ref={ref}
        d="M1 0 L1 1000"
        fill="none"
        stroke="rgba(255,116,56,0.3)"
        strokeWidth="2"
        strokeDasharray="6 4"
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.5, delay: index * 0.3, ease: 'easeInOut' }}
      />
    </svg>
  );
}

/* ── Radar Chart ── */
function RadarChart({ skills, delay }: { skills: Record<string, number>; delay: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const size = 160;
  const center = size / 2;
  const radius = 55;
  const levels = 4;

  const getPoint = (i: number, value: number) => {
    const angle = (Math.PI * 2 * i) / 4 - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const points = radarKeys.map((key, i) => getPoint(i, skills[key]));
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <svg ref={ref} width={size} height={size} className="flex-shrink-0">
      {/* Grid */}
      {[...Array(levels)].map((_, level) => {
        const r = ((level + 1) / levels) * radius;
        const gridPoints = [...Array(4)].map((_, i) => {
          const angle = (Math.PI * 2 * i) / 4 - Math.PI / 2;
          return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
        }).join(' ');
        return (
          <polygon
            key={level}
            points={gridPoints}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
        );
      })}

      {/* Axis lines */}
      {[...Array(4)].map((_, i) => {
        const angle = (Math.PI * 2 * i) / 4 - Math.PI / 2;
        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);
        return (
          <line
            key={i}
            x1={center} y1={center}
            x2={x} y2={y}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
        );
      })}

      {/* Data area */}
      <motion.path
        d={pathD}
        fill="rgba(255,116,56,0.15)"
        stroke="#ff7438"
        strokeWidth="2"
        strokeLinejoin="round"
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ transformOrigin: `${center}px ${center}px` }}
      />

      {/* Points */}
      {points.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x} cy={p.y} r="4"
          fill="#ff7438"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: delay + 0.3 + i * 0.1 }}
        />
      ))}

      {/* Labels */}
      {radarLabels.map((label, i) => {
        const angle = (Math.PI * 2 * i) / 4 - Math.PI / 2;
        const labelRadius = radius + 18;
        const x = center + labelRadius * Math.cos(angle);
        const y = center + labelRadius * Math.sin(angle);
        return (
          <text
            key={label}
            x={x} y={y}
            textAnchor="middle"
            dominantBaseline="central"
            fill="rgba(255,255,255,0.5)"
            fontSize="9"
            fontFamily="Space Mono, monospace"
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
}

/* ── Experience Item ── */
function ExperienceItem({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative"
    >
      <TimelinePath index={index} />

      <div className="flex gap-5 md:gap-8">
        {/* Timeline dot */}
        <div className="relative z-10 flex-shrink-0">
          <motion.div
            whileInView={{ scale: [0, 1.2, 1] }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#ff7438]/10 border-2 border-[#ff7438]/30 flex items-center justify-center"
          >
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#ff7438]" />
          </motion.div>
        </div>

        {/* Content card */}
        <div className="flex-1 pb-12">
          <motion.div
            whileHover={{ x: 8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={() => setExpanded(!expanded)}
            className="cursor-pointer group"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
              <div>
                <h3 className="text-xl md:text-2xl font-medium text-[#fbf9f4] tracking-tight group-hover:text-[#ff7438] transition-colors duration-300">
                  {exp.company}
                </h3>
                <p className="text-sm text-[#fbf9f4]/50 mt-1">
                  {exp.title}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="font-mono-label text-[#ff7438]/70 text-xs">
                  {exp.time}
                </span>
                <span className="font-mono-label text-[#fbf9f4]/30 text-xs ml-3">
                  {exp.location}
                </span>
              </div>
            </div>

            {/* Radar + Highlights */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <RadarChart skills={exp.skills} delay={index * 0.3 + 0.2} />

              <div className="flex-1 space-y-2">
                {exp.highlights.map((h, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.15 + j * 0.08 }}
                    className="text-sm text-[#fbf9f4]/60 flex items-start gap-2"
                  >
                    <span className="text-[#ff7438] mt-1 flex-shrink-0">◆</span>
                    {h}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Section ── */
export default function ExperienceSection() {
  return (
    <section id="experience" className="relative py-28 md:py-36 bg-[#050505]">
      <div className="section-container">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-mono-label text-[#fbf9f4]/40 block mb-4"
          >
            [03] 工作经历
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="heading-section text-4xl md:text-5xl lg:text-6xl text-[#fbf9f4]"
          >
            职业轨迹
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {experiences.map((exp, i) => (
            <ExperienceItem key={exp.company} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
