import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: '君航微金科技有限公司',
    title: '数据分析师（策略分析）',
    period: '2024.05 — 至今',
    location: '北京',
    points: [
      '主导 24 项风控策略从 0 到 1 的设计、上线与迭代',
      '独立负责新客业务经营分析复盘，直接向副总经理汇报',
      '推动 40+ 项风控业务需求跨部门落地',
      '搭建内部风控撞库配置系统，实现策略配置自动化',
    ],
  },
  {
    company: '北京江融信科技有限公司',
    title: '数据分析师',
    period: '2022.05 — 2024.05',
    location: '北京',
    points: [
      '优化数据处理流程，缩短报表制作时间 30%',
      '撰写分析报告 10 余篇，3 篇直接推动策略调整',
      '搭建风险监控预警体系，保障业务稳健发展',
      '负责模型上线后的监控和维护，保障模型稳定性',
    ],
  },
];

function ExpItem({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const [open, setOpen] = useState(index === 0);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(el, {
        y: 30, opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
        delay: index * 0.1,
      });
    });

    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={itemRef} className="exp-item">
      <div className="c-line" />
      <div
        className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 md:py-10 cursor-pointer group"
        onClick={() => setOpen(!open)}
      >
        {/* Period */}
        <div className="md:col-span-3">
          <span className="t-mono block mb-1" style={{ color: 'var(--accent)' }}>{exp.period}</span>
          <span className="t-mono" style={{ color: 'var(--fg-muted)' }}>{exp.location}</span>
        </div>

        {/* Content */}
        <div className="md:col-span-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3
                className="text-lg md:text-xl font-bold transition-colors duration-300 group-hover:text-[var(--accent)]"
                style={{ color: 'var(--fg)' }}
              >
                {exp.company}
              </h3>
              <p className="t-body text-sm mt-1">{exp.title}</p>
            </div>
            <span
              className="t-mono text-xl flex-shrink-0 transition-transform duration-300"
              style={{ color: 'var(--accent)', transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
            >
              +
            </span>
          </div>

          {/* Expandable */}
          <div
            className="overflow-hidden transition-all duration-500"
            style={{
              maxHeight: open ? '300px' : '0px',
              opacity: open ? 1 : 0,
              marginTop: open ? '1rem' : '0px',
            }}
          >
            <ul className="space-y-2">
              {exp.points.map((p, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span style={{ color: 'var(--accent)', fontSize: '10px', marginTop: '6px' }}>—</span>
                  <span className="t-body text-sm">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Index */}
        <div className="md:col-span-2 flex md:justify-end">
          <span className="t-mono" style={{ color: 'var(--line)' }}>0{index + 1}</span>
        </div>
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.exp-header > *', {
        y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.exp-header', start: 'top 80%' },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="py-28 md:py-36">
      <div className="l-container">
        {/* Header */}
        <div className="exp-header mb-16 md:mb-20">
          <span className="t-mono block mb-4" style={{ color: 'var(--accent)' }}>EXPERIENCE</span>
          <h2 className="t-title" style={{ color: 'var(--fg)' }}>工作经历</h2>
          <p className="t-body mt-3 max-w-md">数据分析师到 AI 产品经理的转型之路</p>
        </div>

        <div className="c-line" />

        {/* Experience list */}
        {experiences.map((exp, i) => (
          <ExpItem key={exp.company} exp={exp} index={i} />
        ))}
        <div className="c-line" />
      </div>
    </section>
  );
}
