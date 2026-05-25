import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [nameText, setNameText] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const name = '白雪峰';
  const nameEn = 'XUEFENG.BAI';

  useEffect(() => {
    // Counter animation 0 → 100
    const counterObj = { val: 0 };
    gsap.to(counterObj, {
      val: 100,
      duration: 2.2,
      ease: 'power2.inOut',
      onUpdate: () => setCount(Math.floor(counterObj.val)),
    });

    // Typewriter effect for name
    let charIndex = 0;
    const typeTimer = setInterval(() => {
      if (charIndex <= name.length) {
        setNameText(name.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeTimer);
      }
    }, 250);

    // Exit animation
    const exitTimer = setTimeout(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      tl.to('.loading-counter', {
        y: -30,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
      })
      .to('.loading-name', {
        y: -20,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      }, '-=0.2')
      .to('.loading-line', {
        scaleX: 1,
        duration: 0.6,
        ease: 'power3.inOut',
        transformOrigin: 'left',
      }, '-=0.1')
      .to(containerRef.current, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.8,
        ease: 'power3.inOut',
      });
    }, 3000);

    return () => {
      clearInterval(typeTimer);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: 'var(--bg)' }}
    >
      {/* Counter */}
      <div className="loading-counter mb-8">
        <span
          className="font-mono text-[8rem] md:text-[12rem] font-bold leading-none tracking-tighter"
          style={{ color: 'var(--line)', fontFamily: 'Space Mono' }}
        >
          {count.toString().padStart(3, '0')}
        </span>
      </div>

      {/* Name typewriter */}
      <div className="loading-name flex items-center gap-3">
        <span className="t-display" style={{ color: 'var(--fg)', fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
          {nameText}
        </span>
        <span
          className={`w-[3px] h-[1em] bg-[var(--accent)] animate-blink ${nameText.length >= name.length ? 'opacity-0' : ''}`}
        />
      </div>

      {/* English name */}
      <div className="loading-name mt-3">
        <span className="t-mono" style={{ color: 'var(--fg-muted)' }}>{nameEn}</span>
      </div>

      {/* Exit line (hidden initially) */}
      <div
        className="loading-line absolute bottom-0 left-0 right-0 h-full"
        style={{ background: 'var(--accent)', transform: 'scaleX(0)', transformOrigin: 'left' }}
      />
    </div>
  );
}
