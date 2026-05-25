import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

type CursorType = 'default' | 'text' | 'view' | 'link';

interface CursorState {
  type: CursorType;
  label?: string;
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>({ type: 'default' });
  const pos = useRef({ x: 0, y: 0 });
  const isTouch = useRef(false);

  useEffect(() => {
    // Detect touch device
    isTouch.current = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch.current) return;

    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    const textEl = cursorTextRef.current;
    if (!cursor || !dot || !textEl) return;

    const handleMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;

      // Fast, responsive cursor following
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: 'power2.out',
      });

      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.05,
        ease: 'power2.out',
      });
    };

    // Detect hover targets
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.closest('[data-cursor="view"]')) {
        setState({ type: 'view', label: 'VIEW' });
      } else if (target.closest('a') || target.closest('button')) {
        setState({ type: 'link' });
      } else if (target.closest('[data-cursor="text"]')) {
        setState({ type: 'text' });
      } else {
        setState({ type: 'default' });
      }
    };

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseover', handleOver);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleOver);
    };
  }, []);

  // Animate cursor based on state
  useEffect(() => {
    if (isTouch.current) return;
    const cursor = cursorRef.current;
    if (!cursor) return;

    switch (state.type) {
      case 'view':
        gsap.to(cursor, {
          width: 80,
          height: 80,
          backgroundColor: 'var(--accent)',
          mixBlendMode: 'normal',
          duration: 0.25,
          ease: 'power2.out',
        });
        break;
      case 'link':
        gsap.to(cursor, {
          width: 48,
          height: 48,
          backgroundColor: 'rgba(232, 69, 37, 0.2)',
          borderColor: 'var(--accent)',
          mixBlendMode: 'normal',
          duration: 0.25,
          ease: 'power2.out',
        });
        break;
      case 'text':
        gsap.to(cursor, {
          width: 2,
          height: 32,
          backgroundColor: 'var(--accent)',
          borderColor: 'transparent',
          mixBlendMode: 'normal',
          duration: 0.2,
          ease: 'power2.out',
        });
        break;
      default:
        gsap.to(cursor, {
          width: 12,
          height: 12,
          backgroundColor: 'var(--accent)',
          borderColor: 'transparent',
          mixBlendMode: 'difference',
          duration: 0.2,
          ease: 'power2.out',
        });
    }
  }, [state.type]);

  // Hide on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center"
        style={{
          width: 12,
          height: 12,
          backgroundColor: 'var(--accent)',
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      >
        {/* Text label inside cursor */}
        {state.type === 'view' && (
          <span
            ref={cursorTextRef}
            className="t-mono text-white text-[9px] tracking-widest"
          >
            {state.label}
          </span>
        )}
      </div>

      {/* Trailing dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] w-1 h-1 rounded-full"
        style={{
          backgroundColor: 'var(--fg)',
          transform: 'translate(-50%, -50%)',
          opacity: 0.5,
          willChange: 'transform',
        }}
      />
    </>
  );
}
