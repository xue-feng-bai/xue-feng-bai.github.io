import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const project = {
  name: '面搭子',
  subtitle: 'AI 面试教练',
  role: '独立全栈项目',
  period: '2026.05 — 至今',
  link: 'https://www.miandazi.com',
  image: '/images/project-miandazi.jpg',
  description: '面向在职跳槽者的 AI 面试训练 SaaS 平台。核心定位是"能深度理解用户、记住用户、针对性追问的 AI 面试官"。独立负责从产品定义到生产部署的全栈开发，4 周完成 MVP 并上线。',
  highlights: [
    { label: '架构', value: 'LangGraph 多 Agent 协作，5 个独立子图' },
    { label: '成本', value: 'Pro/Lite 模型路由，LLM 调用成本降低 5-10 倍' },
    { label: '语音', value: 'WebRTC P2P 实时语音对话，延迟从 300-800ms 降至 < 200ms' },
    { label: '记忆', value: '三层记忆架构：Redis 工作记忆 + PostgreSQL 会话记忆 + pgvector 长期记忆' },
    { label: '评估', value: '6 维度评分体系 + 深度追问引擎，实现对话式面试体验' },
    { label: '部署', value: 'Docker 容器化 + Nginx 反向代理，支持 100 人并发' },
  ],
  tags: ['React 19', 'FastAPI', 'LangGraph', 'WebRTC', 'PostgreSQL', 'Redis', 'Docker'],
  metrics: [
    { num: '20K+', label: '行代码' },
    { num: '67+', label: '单元测试' },
    { num: '4', label: '周 MVP' },
    { num: '<2s', label: '语音延迟' },
  ],
};

export default function ProjectSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [showImage, setShowImage] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (imageRef.current && showImage) {
        gsap.to(imageRef.current, {
          x: e.clientX + 20,
          y: e.clientY - 100,
          duration: 0.4,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [showImage]);

  useEffect(() => {
    if (!imageRef.current) return;
    if (showImage) {
      gsap.to(imageRef.current, { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' });
    } else {
      gsap.to(imageRef.current, { opacity: 0, scale: 0.9, duration: 0.2, ease: 'power2.in' });
    }
  }, [showImage]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.proj-header > *', {
        y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.proj-header', start: 'top 80%' },
      });

      gsap.from('.proj-image-container', {
        y: 60, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.proj-image-container', start: 'top 85%' },
      });

      gsap.utils.toArray<HTMLElement>('.proj-highlight').forEach((el, i) => {
        gsap.from(el, {
          x: -20, opacity: 0, duration: 0.5, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
          delay: i * 0.06,
        });
      });

      gsap.utils.toArray<HTMLElement>('.proj-metric').forEach((el, i) => {
        gsap.from(el, {
          y: 20, opacity: 0, duration: 0.5, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
          delay: i * 0.1,
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="py-28 md:py-36 relative">
      {/* Hover floating image */}
      <div
        ref={imageRef}
        className="fixed top-0 left-0 pointer-events-none z-50 opacity-0"
        style={{ width: 320, transform: 'scale(0.9)' }}
      >
        <img
          src={project.image}
          alt={project.name}
          className="w-full rounded-lg shadow-2xl"
          style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8)' }}
        />
      </div>

      <div className="l-container">
        {/* Header */}
        <div className="proj-header mb-16 md:mb-20">
          <span className="t-mono block mb-4" style={{ color: 'var(--accent)' }}>FEATURED PROJECT</span>
          <h2 className="t-title" style={{ color: 'var(--fg)' }}>项目展示</h2>
        </div>

        <div className="c-line-accent mb-12" />

        {/* Project */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Image + Meta */}
          <div className="lg:col-span-5">
            <div
              className="proj-image-container overflow-hidden rounded-sm mb-8"
              onMouseEnter={() => setShowImage(true)}
              onMouseLeave={() => setShowImage(false)}
            >
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-auto hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="space-y-4 mb-8">
              <div>
                <span className="t-mono block mb-1" style={{ color: 'var(--accent)' }}>PERIOD</span>
                <span className="text-sm" style={{ color: 'var(--fg)' }}>{project.period}</span>
              </div>
              <div>
                <span className="t-mono block mb-1" style={{ color: 'var(--accent)' }}>ROLE</span>
                <span className="text-sm" style={{ color: 'var(--fg)' }}>{project.role}</span>
              </div>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm mt-2 group"
                  style={{ color: 'var(--accent)' }}
                  onMouseEnter={() => setShowImage(true)}
                  onMouseLeave={() => setShowImage(false)}
                >
                  <span className="relative">
                    访问 miandazi.com
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />
                  </span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M1 11L11 1M11 1H3M11 1V9" />
                  </svg>
                </a>
              )}
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4">
              {project.metrics.map((m) => (
                <div key={m.label} className="proj-metric">
                  <span className="block text-2xl md:text-3xl font-bold tracking-tight" style={{ color: 'var(--accent)' }}>
                    {m.num}
                  </span>
                  <span className="t-mono mt-1 block">{m.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Description + Highlights */}
          <div className="lg:col-span-7">
            <h3
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: 'var(--fg)' }}
              onMouseEnter={() => setShowImage(true)}
              onMouseLeave={() => setShowImage(false)}
            >
              {project.name}
            </h3>
            <p className="t-mono mb-6" style={{ color: 'var(--accent)' }}>{project.subtitle}</p>

            <p className="t-body mb-10 text-base">{project.description}</p>

            {/* Highlights */}
            <div className="mb-10">
              <span className="t-mono block mb-4" style={{ color: 'var(--accent)' }}>KEY HIGHLIGHTS</span>
              <div className="c-line mb-0" />
              {project.highlights.map((h, i) => (
                <div key={i} className="proj-highlight">
                  <div className="c-line" />
                  <div className="flex gap-4 py-3">
                    <span className="t-mono flex-shrink-0 w-12" style={{ color: 'var(--accent)' }}>{h.label}</span>
                    <span className="t-body text-sm">{h.value}</span>
                  </div>
                </div>
              ))}
              <div className="c-line" />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="c-tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
