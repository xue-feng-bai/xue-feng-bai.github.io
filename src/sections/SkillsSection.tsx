import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { index: '01', title: 'AI 产品流程设计', desc: '围绕用户痛点拆解产品场景，将面试训练流程抽象为 Agent 角色、状态流转、Prompt 工作流和用户交互闭环。面搭子项目中设计了 6 种面试类型 × 4 种面试官性格的完整产品矩阵。' },
  { index: '02', title: 'AI Coding 原型验证', desc: '使用 Claude、Codex 辅助完成产品 Demo 开发、需求验证、联调测试和问题定位。面搭子项目独立完成前后端共 20000+ 行代码、67+ 单元测试，4 周内完成 MVP 上线。' },
  { index: '03', title: '0 到 1 项目推进', desc: '在风控业务和个人 AI 项目中积累了需求调研、方案设计、上线验证、跨团队协作和迭代复盘经验。主导 24 项风控策略从 0 到 1，推动 40+ 项业务需求跨部门落地。' },
  { index: '04', title: '工程理解与技术沟通', desc: '理解前后端、数据库、异步任务、语音链路、状态管理和模型路由的基本作用。面搭子项目中独立实现 WebRTC P2P 语音链路，基于 LangGraph 落地 5 Agent 协作系统。' },
  { index: '05', title: '数据驱动与业务抽象', desc: '熟悉 SQL、Python、A/B 测试、风险指标、看板监控和经营分析。通过数据洞察优化新客策略，报表制作时间缩短 30%，3 篇分析报告直接推动战略调整。' },
  { index: '06', title: '快速学习与产品验证', desc: '持续跟踪 AI 新技术与产品动态，通过小实验快速验证工具适用性并迁移到项目迭代。面搭子项目通过 Pro/Lite 模型路由策略将 LLM 调用成本降低 5-10 倍。' },
];

const tags = ['LangGraph', 'FastAPI', 'React 19', 'PostgreSQL', 'Redis', 'WebRTC', 'LLM 路由', 'A/B 测试', '风控策略', 'Docker', 'Python', 'SQL', '向量检索'];

const scrambleChars = '!<>-_\\/[]{}--=+*^?#________';

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const scramble = useCallback((el: HTMLSpanElement, finalText: string) => {
    const length = finalText.length;
    let frame = 0;
    const totalFrames = 90; // 1.5s at 60fps

    const update = () => {
      let output = '';
      const progress = frame / totalFrames;

      for (let i = 0; i < length; i++) {
        const charProgress = (progress * length - i) / 2.5;
        if (charProgress >= 1) {
          output += finalText[i];
        } else if (charProgress > 0) {
          output += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        } else {
          output += '\u00A0';
        }
      }

      el.textContent = output;
      frame++;
      if (frame <= totalFrames) requestAnimationFrame(update);
      else el.textContent = finalText;
    };

    requestAnimationFrame(update);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header
      gsap.from('.skills-header > *', {
        y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.skills-header', start: 'top 80%' },
      });

      // Skill rows
      gsap.utils.toArray<HTMLElement>('.skill-row').forEach((row, i) => {
        gsap.from(row, {
          y: 40, opacity: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 85%' },
          delay: i * 0.05,
        });
      });

      // Tags
      gsap.from('.skill-tag', {
        y: 15, opacity: 0, duration: 0.4, stagger: 0.04, ease: 'power3.out',
        scrollTrigger: { trigger: '.skill-tags', start: 'top 90%' },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (index: number) => {
    const el = titleRefs.current[index];
    if (el) scramble(el, skills[index].title);
  };

  return (
    <section ref={sectionRef} id="skills" className="py-28 md:py-36">
      <div className="l-container">
        {/* Header */}
        <div className="skills-header mb-16 md:mb-20">
          <span className="t-mono block mb-4" style={{ color: 'var(--accent)' }}>CORE SKILLS</span>
          <h2 className="t-title" style={{ color: 'var(--fg)' }}>六大核心能力</h2>
          <p className="t-body mt-3 max-w-md">从数据洞察到 AI 产品落地的全链路能力栈</p>
        </div>

        <div className="c-line mb-0" />

        {/* Skills */}
        {skills.map((skill, i) => (
          <div
            key={skill.index}
            className="skill-row group"
            onMouseEnter={() => handleMouseEnter(i)}
          >
            <div className="c-line" />
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 md:py-10 cursor-default">
              {/* Index */}
              <div className="md:col-span-2">
                <span className="t-mono" style={{ color: 'var(--accent)' }}>{skill.index}</span>
              </div>

              {/* Title + Desc */}
              <div className="md:col-span-7">
                <h3
                  className="text-lg md:text-xl font-bold mb-3 transition-colors duration-300 group-hover:text-[var(--accent)]"
                  style={{ color: 'var(--fg)' }}
                >
                  <span
                    ref={(el) => { titleRefs.current[i] = el; }}
                  >
                    {skill.title}
                  </span>
                </h3>
                <p className="t-body text-sm md:text-base">{skill.desc}</p>
              </div>

              {/* Arrow */}
              <div className="md:col-span-3 flex md:justify-end items-start">
                <span
                  className="t-mono text-2xl transition-all duration-300 group-hover:translate-x-2 group-hover:text-[var(--accent)]"
                  style={{ color: 'var(--line)' }}
                >
                  →
                </span>
              </div>
            </div>
          </div>
        ))}
        <div className="c-line" />

        {/* Tags */}
        <div className="skill-tags mt-12 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="skill-tag c-tag">{tag}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
