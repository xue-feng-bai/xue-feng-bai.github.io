import { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture, Environment } from '@react-three/drei';
import * as THREE from 'three';

/* ── Skill Data ── */
const skills = [
  {
    title: 'AI 产品流程设计',
    desc: '围绕用户痛点拆解产品场景，将面试训练流程抽象为 Agent 角色、状态流转、Prompt 工作流和用户交互闭环',
    percent: 95,
    detail: '面搭子：6种面试类型 x 4种面试官性格产品矩阵，4周完成MVP',
  },
  {
    title: 'AI Coding 原型验证',
    desc: '使用 Claude、Codex 辅助完成产品 Demo 开发、需求验证、联调测试和问题定位',
    percent: 90,
    detail: '面搭子全栈开发 20000+ 行代码、67+ 单元测试',
  },
  {
    title: '0 到 1 项目推进',
    desc: '在风控业务和个人 AI 项目中积累了需求调研、方案设计、上线验证、跨团队协作和迭代复盘经验',
    percent: 92,
    detail: '主导 24 项风控策略从 0 到 1，推动 40+ 项业务需求落地',
  },
  {
    title: '工程理解与技术沟通',
    desc: '理解前后端、数据库、异步任务、语音链路、状态管理和模型路由的基本作用',
    percent: 88,
    detail: 'WebRTC P2P 语音延迟降至 < 200ms，LangGraph 5 Agent 协作',
  },
  {
    title: '数据驱动与业务抽象',
    desc: '熟悉 SQL、Python、A/B 测试、风险指标、看板监控和经营分析',
    percent: 93,
    detail: '新客策略优化、报表制作时间缩短 30%、3 篇报告推动战略调整',
  },
  {
    title: '快速学习与产品验证',
    desc: '持续跟踪 AI 新技术与产品动态，通过小实验快速验证工具适用性',
    percent: 90,
    detail: 'LLM 调用成本降低 5-10 倍，持续学习并迁移到项目迭代',
  },
];

/* ── Animated Counter ── */
function AnimatedCounter({ value, suffix = '%' }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1200;
    const start = Date.now();
    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, value]);

  return <span ref={ref}>{display}{suffix}</span>;
}

/* ── Circular Progress ── */
function CircularProgress({ percent, delay }: { percent: number; delay: number }) {
  const circumference = 2 * Math.PI * 45;
  const ref = useRef<SVGCircleElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });

  return (
    <div className="relative w-24 h-24 md:w-28 md:h-28 flex-shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50" cy="50" r="45"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="4"
        />
        {/* Progress circle */}
        <motion.circle
          ref={ref}
          cx="50" cy="50" r="45"
          fill="none"
          stroke="#ff7438"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={isInView ? { strokeDashoffset: circumference * (1 - percent / 100) } : {}}
          transition={{ duration: 1.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg md:text-xl font-medium text-[#fbf9f4]">
          <AnimatedCounter value={percent} />
        </span>
      </div>
    </div>
  );
}

/* ── Star Burst Transition ── */
function StarBurst({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.5 }}
          transition={{ duration: 0.4 }}
          className="absolute -top-2 -right-2 pointer-events-none"
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[2px] h-3 bg-[#ff7438] rounded-full"
              style={{
                originX: '50%',
                originY: '50%',
                transform: `rotate(${i * 45}deg) translateY(-10px)`,
              }}
              initial={{ opacity: 1, scaleY: 1 }}
              animate={{ opacity: 0, scaleY: 2, translateY: '-20px' }}
              transition={{ duration: 0.5, delay: i * 0.02 }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Skill Card with Spring Scale ── */
function SkillCard({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative"
    >
      <motion.div
        animate={{
          scale: hovered ? 1.03 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="glass-card rounded-2xl p-6 md:p-8 h-full"
      >
        <StarBurst active={hovered} />

        <div className="flex items-start gap-4 md:gap-6">
          {/* Circular Progress */}
          <CircularProgress percent={skill.percent} delay={index * 0.15} />

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg md:text-xl font-medium text-[#fbf9f4] mb-2 tracking-tight">
              {skill.title}
            </h3>
            <p className="text-sm text-[#fbf9f4]/50 leading-relaxed mb-3">
              {skill.desc}
            </p>

            {/* Detail tag */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: hovered ? 1 : 0, height: hovered ? 'auto' : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <span className="inline-block px-3 py-1 rounded-full bg-[#ff7438]/10 text-xs text-[#ff7438] border border-[#ff7438]/20">
                {skill.detail}
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── 3D Background Scene ── */
function BackgroundScene() {
  const texture = useTexture('/images/data-center.jpg');
  const groupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouseRef.current.x * 0.08,
        0.04
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouseRef.current.y * 0.05,
        0.04
      );
    }
  });

  return (
    <group ref={groupRef}>
      <Environment preset="city" />
      <mesh>
        <planeGeometry args={[20, 12, 1, 1]} />
        <meshBasicMaterial map={texture} transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

/* ── Tilted Grid Background Decoration ── */
function TiltedGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: 'perspective(1000px) rotateX(60deg) translateY(-100px) scale(2)',
          transformOrigin: 'center top',
        }}
      />
    </div>
  );
}

/* ── Main Section ── */
export default function SkillsSection() {
  return (
    <section id="skills" className="relative bg-[#050505] overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-60">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          gl={{ alpha: true, antialias: true }}
          style={{ background: 'transparent' }}
        >
          <BackgroundScene />
        </Canvas>
      </div>

      {/* Tilted Grid */}
      <TiltedGrid />

      {/* Content */}
      <div className="relative z-10 py-28 md:py-36">
        <div className="section-container">
          {/* Section Header */}
          <div className="mb-16 md:mb-20">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-mono-label text-[#fbf9f4]/40 block mb-4"
            >
              [02] 核心能力
            </motion.span>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="heading-section text-4xl md:text-5xl lg:text-6xl text-[#fbf9f4]"
              >
                六大核心能力
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-[#fbf9f4]/40 text-sm max-w-sm"
              >
                从数据洞察到 AI 产品落地的全链路能力栈
              </motion.p>
            </div>
          </div>

          {/* Skills Grid - 2 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {skills.map((skill, i) => (
              <SkillCard key={skill.title} skill={skill} index={i} />
            ))}
          </div>

          {/* Tech tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-14 flex flex-wrap gap-3"
          >
            {[
              'LangGraph', 'FastAPI', 'React 19', 'PostgreSQL', 'Redis',
              'WebRTC', 'LLM 路由', 'A/B 测试', '风控策略', 'Docker', 'Python', 'SQL',
            ].map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-4 py-2 rounded-full border border-[#fbf9f4]/10 text-sm text-[#fbf9f4]/50 transition-all duration-300 hover:border-[#ff7438]/50 hover:text-[#ff7438] cursor-default"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
