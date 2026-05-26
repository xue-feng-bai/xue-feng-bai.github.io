import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { title: 'AI 产品流程设计', desc: 'Agent 角色、状态流转、Prompt 工作流设计，6种面试类型×4种性格矩阵' },
  { title: 'AI Coding 原型验证', desc: 'Claude/Codex 辅助，4周完成全栈 MVP，20000+ 行代码' },
  { title: '0 到 1 项目推进', desc: '主导24项风控策略，推动40+项业务需求落地' },
  { title: '工程理解与技术沟通', desc: 'WebRTC P2P语音延迟<200ms，LangGraph 5 Agent协作' },
  { title: '数据驱动与业务抽象', desc: 'SQL/Python/A/B测试，报表缩短30%，3篇报告推动战略调整' },
  { title: '快速学习与产品验证', desc: 'LLM调用成本降低5-10倍，持续跟踪新技术' },
];

const experiences = [
  {
    company: '君航微金科技有限公司',
    title: '数据分析师（策略分析）',
    time: '2024.05 — 至今',
    points: ['主导24项风控策略从0到1', '直接向副总经理汇报经营分析', '推动40+项业务需求跨部门落地'],
  },
  {
    company: '北京江融信科技有限公司',
    title: '数据分析师',
    time: '2022.05 — 2024.05',
    points: ['报表制作时间缩短30%', '3篇报告直接推动策略调整', '搭建风险监控预警体系'],
  },
];

const tags = ['LangGraph', 'FastAPI', 'React 19', 'PostgreSQL', 'WebRTC', 'LLM路由', 'A/B测试', 'Docker', 'Python', 'SQL'];

export default function MobileLayout() {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.m-reveal').forEach((el) => {
        gsap.from(el, {
          y: 30, opacity: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
        });
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="min-h-[100dvh] pb-20" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      {/* ===== HERO ===== */}
      <section className="pt-28 pb-16 px-6">
        <div className="m-reveal mb-6">
          <span className="t-mono" style={{ color: 'var(--accent)' }}>AI PRODUCT MANAGER</span>
        </div>
        <h1 className="m-reveal text-5xl font-bold mb-4" style={{ letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          白雪峰
        </h1>
        <div className="m-reveal w-16 h-px mb-6" style={{ background: 'var(--accent)' }} />
        <p className="m-reveal text-base leading-relaxed mb-8" style={{ color: 'var(--fg-muted)' }}>
          从数据分析到 AI 产品，致力于将前沿人工智能转化为以人为本的产品体验
        </p>

        {/* Meta pills */}
        <div className="m-reveal flex flex-wrap gap-2 mb-8">
          {['上海', '27岁', '内蒙古大学(211)', '求职中'].map((tag) => (
            <span key={tag} className="px-4 py-2 rounded-full text-sm" style={{ border: '1px solid var(--line)', color: 'var(--fg-muted)' }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Contact buttons */}
        <div className="m-reveal flex flex-col gap-3">
          <a href="tel:19271150203" className="flex items-center justify-between py-4 border-b" style={{ borderColor: 'var(--line)' }}>
            <span className="text-sm">19271150203</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 1L14 8L3 15V1Z" /></svg>
          </a>
          <a href="mailto:xuefeng.work@foxmail.com" className="flex items-center justify-between py-4 border-b" style={{ borderColor: 'var(--line)' }}>
            <span className="text-sm">xuefeng.work@foxmail.com</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 1L14 8L3 15V1Z" /></svg>
          </a>
          <a href="https://github.com/xue-feng-bai" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between py-4 border-b" style={{ borderColor: 'var(--line)' }}>
            <span className="text-sm">github.com/xue-feng-bai</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 1L14 8L3 15V1Z" /></svg>
          </a>
          <button
            onClick={() => {
              fetch('/resume.pdf')
                .then((res) => res.blob())
                .then((blob) => {
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = '白雪峰_简历.pdf';
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  window.URL.revokeObjectURL(url);
                  if (typeof gtag !== 'undefined') {
                    gtag('event', 'download_resume', { event_category: 'engagement', event_label: 'resume_pdf' });
                  }
                });
            }}
            className="flex items-center justify-between py-4 border-b w-full text-left"
            style={{ borderColor: 'var(--line)' }}
          >
            <span className="text-sm" style={{ color: 'var(--accent)' }}>下载简历 (PDF)</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 1V15M8 15L1 8M8 15L15 8" /></svg>
          </button>
        </div>
      </section>

      {/* ===== SKILLS ===== */}
      <section id="skills" className="py-16 px-6">
        <div className="m-reveal mb-2">
          <span className="t-mono" style={{ color: 'var(--accent)' }}>CORE SKILLS</span>
        </div>
        <h2 className="m-reveal text-3xl font-bold mb-10">核心能力</h2>

        {skills.map((s, i) => (
          <div key={s.title} className="m-reveal py-6 border-b" style={{ borderColor: 'var(--line)' }}>
            <span className="t-mono block mb-2">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="text-lg font-bold mb-2">{s.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>{s.desc}</p>
          </div>
        ))}

        <div className="m-reveal flex flex-wrap gap-2 mt-8">
          {tags.map((tag) => (
            <span key={tag} className="px-3 py-1.5 rounded-full text-xs" style={{ border: '1px solid var(--line)', color: 'var(--fg-muted)' }}>
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* ===== EXPERIENCE ===== */}
      <section id="experience" className="py-16 px-6">
        <div className="m-reveal mb-2">
          <span className="t-mono" style={{ color: 'var(--accent)' }}>EXPERIENCE</span>
        </div>
        <h2 className="m-reveal text-3xl font-bold mb-10">工作经历</h2>

        {experiences.map((exp) => (
          <div key={exp.company} className="m-reveal py-6 border-b" style={{ borderColor: 'var(--line)' }}>
            <span className="t-mono block mb-1" style={{ color: 'var(--accent)' }}>{exp.time}</span>
            <h3 className="text-lg font-bold mb-1">{exp.company}</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--fg-muted)' }}>{exp.title}</p>
            <ul className="space-y-2">
              {exp.points.map((p, j) => (
                <li key={j} className="flex items-start gap-2 text-sm" style={{ color: 'var(--fg-muted)' }}>
                  <span style={{ color: 'var(--accent)', marginTop: '2px' }}>—</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* ===== PROJECT ===== */}
      <section id="projects" className="py-16 px-6">
        <div className="m-reveal mb-2">
          <span className="t-mono" style={{ color: 'var(--accent)' }}>FEATURED</span>
        </div>
        <h2 className="m-reveal text-3xl font-bold mb-2">项目展示</h2>
        <p className="m-reveal text-sm mb-8" style={{ color: 'var(--fg-muted)' }}>独立全栈项目</p>

        {/* Project Image */}
        <div className="m-reveal rounded-lg overflow-hidden mb-8">
          <img src="/images/project-miandazi.jpg" alt="面搭子" className="w-full h-auto" />
        </div>

        {/* Project Info */}
        <div className="m-reveal">
          <h3 className="text-2xl font-bold mb-2">面搭子</h3>
          <p className="text-sm mb-1" style={{ color: 'var(--accent)' }}>AI 面试教练 · www.miandazi.com</p>
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--fg-muted)' }}>
            面向在职跳槽者的 AI 面试训练 SaaS 平台。核心定位是"能深度理解用户、记住用户、针对性追问的 AI 面试官"。4 周完成全栈 MVP 并上线。
          </p>

          {/* Highlights */}
          <div className="space-y-3 mb-8">
            {[
              ['架构', 'LangGraph 多 Agent 协作，5 个独立子图'],
              ['成本', 'Pro/Lite 模型路由，LLM 成本降低 5-10 倍'],
              ['语音', 'WebRTC P2P 实时语音，延迟 < 200ms'],
              ['记忆', 'Redis + PostgreSQL + pgvector 三层记忆'],
              ['评估', '6 维度评分 + 深度追问引擎'],
            ].map(([label, value]) => (
              <div key={label} className="flex gap-3">
                <span className="t-mono flex-shrink-0 w-12" style={{ color: 'var(--accent)' }}>{label}</span>
                <span className="text-sm" style={{ color: 'var(--fg-muted)' }}>{value}</span>
              </div>
            ))}
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[
              { num: '20K+', label: '代码' },
              { num: '67+', label: '测试' },
              { num: '4周', label: 'MVP' },
              { num: '<2s', label: '延迟' },
            ].map((m) => (
              <div key={m.label} className="text-center">
                <span className="block text-xl font-bold" style={{ color: 'var(--accent)' }}>{m.num}</span>
                <span className="t-mono mt-1 block">{m.label}</span>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {['React 19', 'FastAPI', 'LangGraph', 'WebRTC', 'PostgreSQL', 'Redis', 'Docker'].map((tag) => (
              <span key={tag} className="px-3 py-1.5 rounded-full text-xs" style={{ border: '1px solid var(--line)', color: 'var(--fg-muted)' }}>{tag}</span>
            ))}
          </div>

          {/* Visit link */}
          <a href="https://www.miandazi.com" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium"
            style={{ background: 'var(--accent)', color: '#fff' }}>
            访问项目
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 7H13M13 7L7 1M13 7L7 13" /></svg>
          </a>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <section id="contact" className="py-16 px-6">
        <div className="m-reveal w-full h-px mb-10" style={{ background: 'var(--accent)' }} />
        <h2 className="m-reveal text-3xl font-bold mb-2">
          让我们一起
          <br />
          <span style={{ color: 'var(--accent)' }}>构建未来</span>
        </h2>
        <p className="m-reveal text-sm mb-8" style={{ color: 'var(--fg-muted)' }}>
          如果您对 AI 产品有任何想法，欢迎随时联系
        </p>

        <a href="mailto:xuefeng.work@foxmail.com"
          className="m-reveal inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium mb-12"
          style={{ background: 'var(--accent)', color: '#fff' }}>
          发送邮件
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 7H13M13 7L7 1M13 7L7 13" /></svg>
        </a>

        {/* Bottom links */}
        <div className="m-reveal space-y-4 pt-6 border-t" style={{ borderColor: 'var(--line)' }}>
          {[
            { label: 'PHONE', value: '19271150203', href: 'tel:19271150203' },
            { label: 'EMAIL', value: 'xuefeng.work@foxmail.com', href: 'mailto:xuefeng.work@foxmail.com' },
            { label: 'GITHUB', value: 'github.com/xue-feng-bai', href: 'https://github.com/xue-feng-bai' },
          ].map((link) => (
            <a key={link.label} href={link.href} className="flex items-center justify-between py-2">
              <div>
                <span className="t-mono block mb-0.5">{link.label}</span>
                <span className="text-sm">{link.value}</span>
              </div>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 1L14 8L3 15V1Z" /></svg>
            </a>
          ))}
        </div>

        <div className="m-reveal mt-12 pt-6 border-t flex justify-between" style={{ borderColor: 'var(--line)' }}>
          <span className="t-mono text-xs">&copy; 2025 白雪峰</span>
          <span className="t-mono text-xs">AI PM · SHANGHAI</span>
        </div>
      </section>
    </main>
  );
}
