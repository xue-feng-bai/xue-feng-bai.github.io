import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { motion } from 'framer-motion';

const RING_TEXT = '• 卓越的产品思维 • 数据驱动决策 • 出色的跨部门协作 • AI 领域专家 ';

/* ── Text Ring 3D ── */
function TextRing3D() {
  const groupRef = useRef<THREE.Group>(null);
  const chars = RING_TEXT.split('').filter((c) => c !== ' ');
  const radius = 3.2;

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z -= delta * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {chars.map((_, i) => {
        const angle = (i / chars.length) * Math.PI * 2;
        const x = Math.sin(angle) * radius;
        const y = Math.cos(angle) * radius;

        return (
          <mesh key={i} position={[x, y, 0]} rotation={[0, 0, -angle]}>
            <planeGeometry args={[0.35, 0.45]} />
            <meshBasicMaterial
              color="#ff7438"
              transparent
              opacity={0.85}
            />
          </mesh>
        );
      })}

      {/* Inner dot ring */}
      {useMemo(() => {
        const dots = [];
        for (let i = 0; i < 40; i++) {
          const angle = (i / 40) * Math.PI * 2;
          const r = radius * 0.75;
          dots.push({
            position: [Math.sin(angle) * r, Math.cos(angle) * r, -0.3] as [number, number, number],
            opacity: 0.2 + (i % 3) * 0.1,
          });
        }
        return dots;
      }, []).map((dot, i) => (
        <mesh key={`dot-${i}`} position={dot.position}>
          <circleGeometry args={[0.04, 8]} />
          <meshBasicMaterial color="#ff7438" transparent opacity={dot.opacity} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Main Section ── */
export default function TextRingSection() {
  return (
    <section className="relative py-24 md:py-32 bg-[#fbf9f4] overflow-hidden">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-mono-label text-[#0d0d0c]/40 block mb-4"
          >
            [05] 专业背书
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="heading-section text-4xl md:text-5xl text-[#0d0d0c]"
          >
            能力标签
          </motion.h2>
        </div>

        {/* 3D Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative mx-auto"
          style={{ width: 'min(45vw, 45vh)', height: 'min(45vw, 45vh)' }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,116,56,0.06) 0%, transparent 70%)',
            }}
          />
          <Canvas
            camera={{ position: [0, 0, 8], fov: 50 }}
            gl={{ alpha: true, antialias: true }}
            style={{ background: 'transparent' }}
          >
            <TextRing3D />
          </Canvas>
        </motion.div>

        {/* Tag pills */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {[
            '产品策略', '数据驱动', '跨部门协作', 'AI 专家',
            '快速学习', '0-1 落地', '风控策略', '用户体验',
          ].map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.8 + i * 0.08 }}
              whileHover={{ y: -3, scale: 1.05, backgroundColor: '#ff7438', color: '#ffffff' }}
              className="px-5 py-2.5 rounded-full bg-[#0d0d0c]/5 text-[#0d0d0c]/70 text-sm font-medium transition-all duration-300 cursor-default"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
