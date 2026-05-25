import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.edu-left > *', {
        x: -40, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.edu-left', start: 'top 80%' },
      });

      gsap.from('.edu-right', {
        x: 40, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.2,
        scrollTrigger: { trigger: '.edu-right', start: 'top 80%' },
      });

      gsap.from('.edu-line', {
        scaleX: 0, duration: 1, ease: 'power3.out', delay: 0.4, transformOrigin: 'left',
        scrollTrigger: { trigger: '.edu-line', start: 'top 85%' },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="education" ref={sectionRef} className="relative py-24 md:py-28 bg-[#0a0a0a]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#fbf9f4]/8 to-transparent" />

      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
          {/* Left */}
          <div className="edu-left md:col-span-4">
            <span className="font-mono-label text-[#fbf9f4]/30 block mb-4">[06] 教育背景</span>
            <h2 className="heading-section text-3xl md:text-4xl text-[#fbf9f4]">学术根基</h2>
          </div>

          {/* Right */}
          <div className="edu-right md:col-span-8">
            <div className="border-t border-[#fbf9f4]/8 pt-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-2xl md:text-3xl font-medium text-[#fbf9f4] tracking-tight">内蒙古大学</h3>
                  <p className="text-sm text-[#ff7438]/60 mt-1 font-mono-label">211 · 双一流</p>
                </div>
                <div className="md:text-right">
                  <p className="text-lg text-[#fbf9f4]/70">管理科学</p>
                  <p className="font-mono-label text-[#fbf9f4]/25 text-xs mt-1">本科（学士）</p>
                </div>
              </div>
              <div className="edu-line mt-8 h-[1px] bg-gradient-to-r from-[#ff7438]/25 via-[#ff7438]/8 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
