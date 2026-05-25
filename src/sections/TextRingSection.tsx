import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const RING_TEXT = '• 卓越的产品思维 • 数据驱动决策 • 出色的跨部门协作 • AI 领域专家 ';

function TextRing3D() {
  const groupRef = useRef<THREE.Group>(null);
  const chars = RING_TEXT.split('').filter((c) => c !== ' ');
  const radius = 3.2;

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z -= delta * 0.3;
    }
  });

  // Pre-compute dot positions
  const dots = [];
  for (let i = 0; i < 40; i++) {
    const angle = (i / 40) * Math.PI * 2;
    const r = radius * 0.75;
    dots.push({ x: Math.sin(angle) * r, y: Math.cos(angle) * r, z: -0.3, opacity: 0.2 + (i % 3) * 0.1 });
  }

  return (
    <group ref={groupRef}>
      {chars.map((_, i) => {
        const angle = (i / chars.length) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.sin(angle) * radius, Math.cos(angle) * radius, 0]} rotation={[0, 0, -angle]}>
            <planeGeometry args={[0.32, 0.42]} />
            <meshBasicMaterial color="#ff7438" transparent opacity={0.8} />
          </mesh>
        );
      })}
      {dots.map((dot, i) => (
        <mesh key={`dot-${i}`} position={[dot.x, dot.y, dot.z]}>
          <circleGeometry args={[0.035, 8]} />
          <meshBasicMaterial color="#ff7438" transparent opacity={dot.opacity} />
        </mesh>
      ))}
    </group>
  );
}

export default function TextRingSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.ring-header > *', {
        y: 40, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.ring-header', start: 'top 80%' },
      });

      gsap.from('.ring-canvas', {
        scale: 0.7, opacity: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.ring-canvas', start: 'top 80%' },
      });

      gsap.from('.ring-tag', {
        y: 20, opacity: 0, scale: 0.8, duration: 0.5, stagger: 0.06, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: '.ring-tags', start: 'top 85%' },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28 md:py-36 bg-[#fbf9f4] overflow-hidden">
      <div className="section-container">
        {/* Header */}
        <div className="ring-header text-center mb-12">
          <span className="font-mono-label text-[#0d0d0c]/35 block mb-4">[05] 专业背书</span>
          <h2 className="heading-section text-4xl md:text-5xl text-[#0d0d0a]">能力标签</h2>
        </div>

        {/* 3D Canvas */}
        <div className="ring-canvas relative mx-auto" style={{ width: 'min(45vw, 45vh)', height: 'min(45vw, 45vh)' }}>
          <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,116,56,0.05) 0%, transparent 70%)' }} />
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }} gl={{ alpha: true, antialias: true }} style={{ background: 'transparent' }}>
            <TextRing3D />
          </Canvas>
        </div>

        {/* Tags */}
        <div className="ring-tags mt-12 flex flex-wrap justify-center gap-3">
          {['产品策略', '数据驱动', '跨部门协作', 'AI 专家', '快速学习', '0-1 落地', '风控策略', '用户体验'].map((tag) => (
            <span key={tag} className="ring-tag px-5 py-2.5 rounded-full bg-[#0d0d0c]/[0.04] text-[#0d0d0c]/60 text-sm font-medium hover:bg-[#ff7438] hover:text-white transition-all duration-300 cursor-default hover:-translate-y-0.5">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
