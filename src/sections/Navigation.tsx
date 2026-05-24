import { useEffect, useState } from 'react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-20 flex items-center transition-all duration-500 ${
        scrolled
          ? 'bg-[#fbf9f4]/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="section-container w-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-lg font-medium tracking-tight text-[#0d0d0c]">
            白雪峰
          </span>
          <span className="hidden sm:inline-block font-mono-label text-[#0d0d0c]/50">
            /
          </span>
          <span className="hidden sm:inline-block font-mono-label text-[#0d0d0c]/50">
            AI产品经理
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="#contact"
            className="btn-pill-accent text-sm font-medium"
          >
            联系我
          </a>
        </div>
      </div>
    </nav>
  );
}
