import { motion } from 'framer-motion';

export default function EducationSection() {
  return (
    <section id="education" className="relative py-20 md:py-28 bg-[#050505]">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
          {/* Left */}
          <div className="md:col-span-4">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-mono-label text-[#fbf9f4]/40 block mb-4"
            >
              [06] 教育背景
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="heading-section text-3xl md:text-4xl text-[#fbf9f4]"
            >
              学术根基
            </motion.h2>
          </div>

          {/* Right */}
          <div className="md:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="border-t border-[#fbf9f4]/10 pt-8"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-2xl md:text-3xl font-medium text-[#fbf9f4] tracking-tight">
                    内蒙古大学
                  </h3>
                  <p className="text-sm text-[#ff7438]/70 mt-1 font-mono-label">
                    211 · 双一流
                  </p>
                </div>
                <div className="md:text-right">
                  <p className="text-lg text-[#fbf9f4]/80">管理科学</p>
                  <p className="font-mono-label text-[#fbf9f4]/30 text-xs mt-1">
                    本科（学士）
                  </p>
                </div>
              </div>

              {/* Decorative line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="mt-8 h-[1px] bg-gradient-to-r from-[#ff7438]/30 via-[#ff7438]/10 to-transparent origin-left"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
