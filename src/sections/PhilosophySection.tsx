import { useScrollReveal } from '../hooks/useScrollReveal';
import { motion } from 'framer-motion';

const words = [
  '我', '相信', '优秀的', '产品经理', '不仅仅是', '管理需求', '，', '更是', '翻译未来', '。',
  '通过', '将', '复杂的', '技术语言', '转化为', '用户友好的', '解决方案', '，',
  '我', '致力于', '在', 'AI', '与', '人性', '之间', '架设桥梁', '，',
  '创造出', '既强大', '又温暖的', '技术体验', '。'
];

export default function PhilosophySection() {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section
      id="philosophy"
      className="relative py-24 md:py-32 bg-[#fbf9f4]"
    >
      <div ref={ref} className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          {/* Left Label */}
          <div className="md:col-span-4">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="font-mono-label text-[#0d0d0c]/40"
            >
              [01] 核心理念
            </motion.span>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isVisible ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-12 h-[2px] bg-[#ff7438] mt-4 origin-left"
            />
          </div>

          {/* Right Content */}
          <div className="md:col-span-8">
            <p className="text-body-lg md:text-2xl lg:text-3xl text-[#0d0d0c] leading-relaxed">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.04,
                    ease: 'easeOut',
                  }}
                  className={`inline-block mr-[0.3em] ${
                    ['翻译未来', 'AI', '架设桥梁'].includes(word)
                      ? 'text-[#ff7438] font-medium'
                      : ''
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
