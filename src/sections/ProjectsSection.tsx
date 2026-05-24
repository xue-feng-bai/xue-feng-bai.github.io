import { useRef, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Project Data ── */
const projects = [
  {
    name: '面搭子 (Mian Dazi)',
    role: '独立全栈项目',
    time: '2026.05 — 至今',
    desc: '面向在职跳槽者的 AI 面试训练 SaaS 平台。核心定位是"能深度理解用户、记住用户、针对性追问的 AI 面试官"。独立负责从产品定义到生产部署的全栈开发，4 周完成 MVP 并上线。',
    details: [
      'LangGraph 多 Agent 协作系统：5 个独立子图，LLM 成本降低 5-10 倍',
      'WebRTC P2P 实时语音：延迟从 300-800ms 降至 < 200ms',
      '三层记忆架构：Redis + PostgreSQL + pgvector 长期记忆',
      '6 维度评分体系 + 深度追问引擎',
    ],
    image: '/images/project-miandazi.jpg',
    tags: ['React 19', 'FastAPI', 'LangGraph', 'WebRTC', 'PostgreSQL', 'Docker'],
    link: 'https://www.miandazi.com',
    stats: { users: '100+', code: '20K+', tests: '67+' },
  },
  {
    name: 'GitHub 开源项目',
    role: '个人维护',
    time: '2025 — 至今',
    desc: '在 GitHub 上维护了 9 个开源仓库，涵盖 AI 工具、浏览器扩展、Skills 脚本等方向，持续迭代中。',
    details: [
      'claude-viewer-extension：Chrome 扩展，可视化查看 Claude Code 聊天历史',
      'openclaw-multi-agent-setup：OpenClaw 多 Agent 配置交互式教程',
      'xiaohongshu-card-builder-collection：Markdown 转小红书卡片生成器',
      'resume-skills、jd2resume-skill 等 6+ 个开源 Skills 脚本',
    ],
    image: '/images/project-knowledge.jpg',
    tags: ['Chrome Extension', 'AI Workflow', 'Open Source'],
    link: 'https://github.com/xue-feng-bai',
    stats: { repos: '9+', skills: '6+', updates: '持续' },
  },
];

/* ── 3D Flip Card ── */
function FlipCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      className="group"
      style={{ perspective: '1200px' }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        onClick={() => setFlipped(!flipped)}
        className="relative cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div
          className="relative rounded-2xl overflow-hidden bg-[#0d0d0c] border border-[#fbf9f4]/8"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0c] via-[#0d0d0c]/30 to-transparent" />

            {/* Stats overlay */}
            <div className="absolute top-4 right-4 flex gap-3">
              {Object.entries(project.stats).map(([key, val]) => (
                <span
                  key={key}
                  className="px-3 py-1 rounded-full bg-[#0d0d0c]/60 backdrop-blur-sm text-xs font-mono-label text-[#ff7438] border border-[#ff7438]/20"
                >
                  {val} {key}
                </span>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl md:text-2xl font-medium text-[#fbf9f4] tracking-tight group-hover:text-[#ff7438] transition-colors duration-300">
                {project.name}
              </h3>
              <span className="font-mono-label text-[#fbf9f4]/30 text-xs">
                点击翻转
              </span>
            </div>
            <p className="text-xs text-[#fbf9f4]/40 font-mono-label mb-3">
              {project.role} · {project.time}
            </p>
            <p className="text-sm text-[#fbf9f4]/60 leading-relaxed">
              {project.desc}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-mono-label border border-[#fbf9f4]/10 text-[#fbf9f4]/40"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Link */}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 mt-4 text-sm text-[#ff7438] hover:underline"
              >
                访问项目
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 4H12V10M12 4L4 12" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-br from-[#ff7438]/10 to-[#0d0d0c] border border-[#ff7438]/20 p-6 md:p-8 flex flex-col justify-center"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <h4 className="text-lg font-medium text-[#ff7438] mb-4">技术亮点</h4>
          <ul className="space-y-3">
            {project.details.map((d, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={flipped ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
                className="text-sm text-[#fbf9f4]/70 flex items-start gap-2"
              >
                <span className="text-[#ff7438] mt-0.5 flex-shrink-0">▸</span>
                {d}
              </motion.li>
            ))}
          </ul>
          <p className="text-xs text-[#fbf9f4]/30 mt-6 font-mono-label">
            点击返回正面
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Particle System ── */
function Particles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 60;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return [...Array(count)].map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4
      ),
      speed: 0.2 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    particles.forEach((p, i) => {
      dummy.position.copy(p.position);
      dummy.position.y += Math.sin(t * p.speed + p.phase) * 0.3;
      dummy.position.x += Math.cos(t * p.speed * 0.5 + p.phase) * 0.15;
      const scale = 0.03 + Math.sin(t * 2 + p.phase) * 0.01;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <circleGeometry args={[1, 6]} />
      <meshBasicMaterial color="#ff7438" transparent opacity={0.4} />
    </instancedMesh>
  );
}

/* ── Main Section ── */
export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-28 md:py-36 bg-[#0d0d0c] overflow-hidden">
      {/* Particle Background */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 60 }}
          gl={{ alpha: true, antialias: true }}
          style={{ background: 'transparent' }}
        >
          <Particles />
        </Canvas>
      </div>

      <div className="relative z-10 section-container">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-mono-label text-[#fbf9f4]/40 block mb-4"
          >
            [04] 项目展示
          </motion.span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="heading-section text-4xl md:text-5xl lg:text-6xl text-[#fbf9f4]"
            >
              Featured Works
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-[#fbf9f4]/40 text-sm"
            >
              点击卡片查看技术详情
            </motion.p>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <FlipCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
