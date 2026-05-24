import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const contactLinks = [
  {
    title: '联系方式',
    items: [
      { label: 'xuefeng.work@foxmail.com', href: 'mailto:xuefeng.work@foxmail.com', icon: '✉️' },
    ],
  },
  {
    title: '社交链接',
    items: [
      { label: 'github.com/xue-feng-bai', href: 'https://github.com/xue-feng-bai', icon: '💻' },
      { label: 'miandazi.com', href: 'https://www.miandazi.com', icon: '🚀' },
    ],
  },
  {
    title: '个人标签',
    items: [
      { label: '上海', href: null, icon: '📍' },
      { label: '27岁', href: null, icon: '🎂' },
      { label: '内蒙古大学（211）', href: null, icon: '🎓' },
    ],
  },
];

/* ── Envelope Animation ── */
function EnvelopeAnimation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center">
      {/* Envelope */}
      <motion.div
        className="relative w-48 h-32 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Envelope body */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0c] border border-[#fbf9f4]/10 overflow-hidden">
          {/* Envelope pattern */}
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(255,116,56,0.3) 10px,
                rgba(255,116,56,0.3) 11px
              )`,
            }}
          />
        </div>

        {/* Envelope flap */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-16 origin-top"
          style={{
            background: 'linear-gradient(to bottom, #2a2a2a, #1a1a1a)',
            clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}
          animate={{
            rotateX: isOpen ? -180 : 0,
          }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        />

        {/* Letter */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: -60, opacity: 1 }}
              exit={{ y: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="absolute bottom-2 left-2 right-2 h-28 bg-[#fbf9f4] rounded-md p-4 shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-[#ff7438]/10 flex items-center justify-center">
                  <span className="text-xs">👋</span>
                </div>
                <span className="text-xs font-medium text-[#0d0d0c]">期待与您合作</span>
              </div>
              <p className="text-xs text-[#0d0d0c]/50 leading-relaxed">
                如果您对 AI 产品有任何想法，欢迎随时联系我探讨合作可能。
              </p>
              <a
                href="mailto:xuefeng.work@foxmail.com"
                className="inline-block mt-2 text-xs text-[#ff7438] hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                发送邮件 →
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Seal */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          animate={{ scale: isOpen ? 0 : 1, opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-8 h-8 rounded-full bg-[#ff7438] flex items-center justify-center shadow-lg shadow-[#ff7438]/30">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2">
              <path d="M2 8L6 12L14 4" />
            </svg>
          </div>
        </motion.div>
      </motion.div>

      <p className="text-xs text-[#fbf9f4]/30 font-mono-label mt-4">
        {isOpen ? '点击信封收起' : '点击打开信封'}
      </p>
    </div>
  );
}

/* ── Frosted Glass Card ── */
function GlassCard({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
      className="glass-card rounded-2xl p-6 transition-shadow duration-500 hover:shadow-lg hover:shadow-[#ff7438]/5"
    >
      {children}
    </motion.div>
  );
}

/* ── Main Section ── */
export default function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="relative bg-[#050505] pt-28 pb-8 overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,116,56,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 section-container">
        {/* Top Section: CTA + Envelope */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          {/* Left: CTA */}
          <div className="lg:col-span-7">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-mono-label text-[#fbf9f4]/40 block mb-4"
            >
              [06] 联系方式
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="heading-section text-4xl md:text-5xl text-[#fbf9f4] mb-6"
            >
              让我们一起
              <br />
              <span className="text-[#ff7438]">构建未来</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-[#fbf9f4]/50 text-sm leading-relaxed max-w-md mb-8"
            >
              如果您对我的经历感兴趣，或想探讨 AI 产品的可能性，欢迎随时联系我。
              我期待与志同道合的人一起创造有价值的产品。
            </motion.p>

            {/* Contact Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {contactLinks.map((group, gi) => (
                <GlassCard key={group.title} delay={0.2 + gi * 0.1}>
                  <h3 className="font-mono-label text-[#fbf9f4]/30 mb-4 text-xs">
                    {group.title}
                  </h3>
                  <ul className="space-y-3">
                    {group.items.map((item) => (
                      <li key={item.label}>
                        {item.href ? (
                          <a
                            href={item.href}
                            target={item.href.startsWith('http') ? '_blank' : undefined}
                            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="text-sm text-[#fbf9f4]/60 hover:text-[#ff7438] transition-colors duration-300 flex items-center gap-2"
                          >
                            <span>{item.icon}</span>
                            <span className="truncate">{item.label}</span>
                          </a>
                        ) : (
                          <span className="text-sm text-[#fbf9f4]/60 flex items-center gap-2">
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Right: Envelope Animation */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <EnvelopeAnimation />
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="h-[1px] bg-[#fbf9f4]/8 mb-8 origin-left"
        />

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-[#fbf9f4]/20 text-xs font-mono-label">
            &copy; 2025 白雪峰. 保留所有权利。
          </p>
          <p className="text-[#fbf9f4]/15 text-xs font-mono-label">
            用 ❤️ 和 AI 构建
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
