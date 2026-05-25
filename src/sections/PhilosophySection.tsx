import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const words = [
  { text: '我相信', highlight: false },
  { text: '优秀的', highlight: false },
  { text: '产品经理', highlight: false },
  { text: '不仅仅是', highlight: false },
  { text: '管理需求', highlight: false },
  { text: '，', highlight: false },
  { text: '更是', highlight: false },
  { text: '翻译未来', highlight: true },
  { text: '。', highlight: false },
  { text: '通过将复杂的', highlight: false },
  { text: '技术语言', highlight: false },
  { text: '转化为', highlight: false },
  { text: '用户友好的', highlight: false },
  { text: '解决方案，', highlight: false },
  { text: '我致力于在', highlight: false },
  { text: 'AI', highlight: true },
  { text: '与人性之间', highlight: false },
  { text: '架设桥梁', highlight: true },
  { text: '，', highlight: false },
  { text: '创造出既强大', highlight: false },
  { text: '又温暖的', highlight: false },
  { text: '技术体验。', highlight: false },
];

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Label animation
      gsap.from('.phil-label', {
        x: -30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
        },
      });

      gsap.from('.phil-line', {
        scaleX: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.3,
        transformOrigin: 'left',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
        },
      });

      // Word-by-word reveal
      wordsRef.current.forEach((word, i) => {
        if (!word) return;
        gsap.from(word, {
          opacity: 0,
          y: 15,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          },
          delay: 0.3 + i * 0.04,
        });
      });

      // Parallax on the whole text block
      gsap.to('.phil-text-block', {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative py-28 md:py-40 bg-[#fbf9f4] overflow-hidden"
    >
      {/* Subtle decorative circle */}
      <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[#0d0d0c]/[0.03] pointer-events-none" />
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-[#0d0d0c]/[0.05] pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          {/* Left Label */}
          <div className="md:col-span-3">
            <span className="phil-label font-mono-label text-[#0d0d0c]/40 block">
              [01] 核心理念
            </span>
            <div className="phil-line w-12 h-[2px] bg-[#ff7438] mt-4" />
          </div>

          {/* Right Content */}
          <div className="md:col-span-9">
            <p className="phil-text-block text-2xl md:text-3xl lg:text-4xl text-[#0d0d0c] leading-[1.6] md:leading-[1.7] font-light">
              {words.map((word, i) => (
                <span
                  key={i}
                  ref={(el) => { wordsRef.current[i] = el; }}
                  className={`inline-block mr-[0.35em] ${
                    word.highlight ? 'text-[#ff7438] font-medium' : ''
                  }`}
                >
                  {word.text}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
