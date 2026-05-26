import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '../components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const links = [
  { label: 'PHONE', value: '19271150203', href: 'tel:19271150203' },
  { label: 'EMAIL', value: 'xuefeng.work@foxmail.com', href: 'mailto:xuefeng.work@foxmail.com' },
  { label: 'GITHUB', value: 'github.com/xue-feng-bai', href: 'https://github.com/xue-feng-bai' },
  { label: 'PROJECT', value: 'miandazi.com', href: 'https://www.miandazi.com' },
  { label: 'RESUME', value: '下载简历 (PDF)', href: '/resume.pdf' },
];

export default function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.footer-cta > *', {
        y: 50, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.footer-cta', start: 'top 80%' },
      });

      gsap.from('.footer-link', {
        y: 20, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.footer-links', start: 'top 90%' },
      });

      gsap.from('.footer-bottom', {
        y: 10, opacity: 0, duration: 0.5, ease: 'power3.out',
        scrollTrigger: { trigger: '.footer-bottom', start: 'top 95%' },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={sectionRef} id="contact" className="py-28 md:py-36">
      <div className="l-container">
        {/* Top accent line */}
        <div className="c-line-accent mb-16 md:mb-20" />

        {/* CTA */}
        <div className="footer-cta mb-20 md:mb-24">
          <span className="t-mono block mb-6" style={{ color: 'var(--accent)' }}>CONTACT</span>
          <h2
            className="font-bold mb-8"
            style={{
              color: 'var(--fg)',
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}
          >
            让我们一起
            <br />
            <span style={{ color: 'var(--accent)' }}>构建未来</span>
          </h2>
          <p className="t-body max-w-md mb-8 text-base">
            如果您对 AI 产品有任何想法，或想探讨合作的可能，欢迎随时联系。
          </p>

          <MagneticButton strength={0.5}>
            <a
              href="mailto:xuefeng.work@foxmail.com"
              className="inline-flex items-center gap-3 px-10 py-5 text-sm transition-all duration-300"
              style={{
                background: 'var(--accent)',
                color: '#fff',
                borderRadius: '100px',
              }}
            >
              <span className="t-mono" style={{ color: '#fff' }}>SEND EMAIL</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 7H13M13 7L7 1M13 7L7 13" />
              </svg>
            </a>
          </MagneticButton>
        </div>

        {/* Links */}
        <div className="footer-links grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {links.map((link) => (
            <div key={link.label} className="footer-link">
              <span className="t-mono block mb-2">{link.label}</span>
              <MagneticButton strength={0.3}>
                <a
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-sm transition-opacity duration-300 hover:opacity-60"
                  style={{ color: 'var(--fg)' }}
                >
                  {link.value}
                </a>
              </MagneticButton>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="footer-bottom c-line mb-6" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span className="t-mono" style={{ color: 'var(--fg-muted)' }}>&copy; 2025 白雪峰</span>
          <span className="t-mono" style={{ color: 'var(--fg-muted)' }}>AI PRODUCT MANAGER &middot; SHANGHAI</span>
        </div>
      </div>
    </footer>
  );
}
