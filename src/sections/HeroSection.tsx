import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '../components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const scrambleChars = '!<>-_\\/[]{}--=+*^?#________';

function scrambleText(
  el: HTMLElement,
  finalText: string,
  duration: number = 1.5
) {
  const length = finalText.length;
  let frame = 0;
  const totalFrames = duration * 60;

  const update = () => {
    let output = '';
    const progress = frame / totalFrames;

    for (let i = 0; i < length; i++) {
      const charProgress = (progress * length - i) / 3;
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

    if (frame <= totalFrames) {
      requestAnimationFrame(update);
    } else {
      el.textContent = finalText;
    }
  };

  requestAnimationFrame(update);
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Scramble text for role
      if (roleRef.current) {
        scrambleText(roleRef.current, 'AI PRODUCT MANAGER', 2);
      }

      // Name entrance
      gsap.from(nameRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.5,
      });

      // Description
      gsap.from(descRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.9,
      });

      // Meta items stagger
      gsap.from('.hero-meta-item', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 1.1,
      });

      // CTA buttons
      gsap.from('.hero-cta', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        delay: 1.4,
      });

      // Scroll parallax on name
      gsap.to(nameRef.current, {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden"
    >
      {/* Background gradient orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="l-container relative z-10">
        {/* Role with scramble */}
        <div className="mb-6">
          <span
            ref={roleRef}
            className="t-mono block"
            style={{ color: 'var(--accent)' }}
          >
            {'\u00A0'}
          </span>
        </div>

        {/* Name */}
        <h1
          ref={nameRef}
          className="t-display mb-8"
          style={{ color: 'var(--fg)' }}
        >
          白雪峰
        </h1>

        {/* Separator */}
        <div className="c-line mb-8 max-w-md" />

        {/* Description */}
        <p
          ref={descRef}
          className="t-body max-w-lg mb-10 text-base md:text-lg"
        >
          从数据分析到 AI 产品，致力于将前沿人工智能转化为直观、高效且以人为本的产品体验。在风控业务与个人 AI 项目中积累了从 0 到 1 的完整产品推进经验。
        </p>

        {/* Meta grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mb-10 max-w-2xl">
          {[
            { label: 'LOCATION', value: '上海' },
            { label: 'AGE', value: '27 岁' },
            { label: 'EDUCATION', value: '内蒙古大学' },
            { label: 'STATUS', value: '求职中' },
          ].map((item) => (
            <div key={item.label} className="hero-meta-item">
              <span className="t-mono block mb-1.5" style={{ color: 'var(--fg-muted)' }}>
                {item.label}
              </span>
              <span className="text-sm" style={{ color: 'var(--fg)' }}>
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* CTAs with magnetic */}
        <div className="hero-cta flex items-center gap-6">
          <MagneticButton strength={0.4}>
            <a
              href="#skills"
              className="inline-flex items-center gap-3 px-8 py-4 text-sm transition-all duration-300"
              style={{
                background: 'var(--accent)',
                color: '#fff',
                borderRadius: '100px',
              }}
            >
              <span className="t-mono" style={{ color: '#fff' }}>探索能力</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 7H13M13 7L7 1M13 7L7 13" />
              </svg>
            </a>
          </MagneticButton>

          <MagneticButton strength={0.3}>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 text-sm transition-all duration-300 hover:gap-4"
              style={{ color: 'var(--fg-muted)' }}
            >
              <span className="t-mono">查看项目</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 11L11 1M11 1H3M11 1V9" />
              </svg>
            </a>
          </MagneticButton>

          <MagneticButton strength={0.3}>
            <a
              href="/resume.pdf"
              download
              onClick={() => {
                if (typeof gtag !== 'undefined') {
                  gtag('event', 'download_resume', { event_category: 'engagement', event_label: 'resume_pdf' });
                }
              }}
              className="inline-flex items-center gap-2 text-sm transition-all duration-300 hover:gap-4"
              style={{ color: 'var(--accent)' }}
            >
              <span className="t-mono">下载简历</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 1V11M6 11L1 6M6 11L11 6" />
              </svg>
            </a>
          </MagneticButton>
        </div>
      </div>

      {/* Bottom scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="t-mono" style={{ color: 'var(--fg-muted)' }}>SCROLL</span>
        <div className="w-px h-8 relative overflow-hidden" style={{ background: 'var(--line)' }}>
          <div
            className="absolute top-0 left-0 w-full h-3"
            style={{ background: 'var(--accent)', animation: 'scrollDown 2s ease-in-out infinite' }}
          />
        </div>
      </div>

      <style>{`
        @keyframes scrollDown {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(200%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
}
