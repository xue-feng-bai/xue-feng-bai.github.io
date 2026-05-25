export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="l-container flex items-center justify-between h-20">
        <a href="#" className="t-mono" style={{ color: 'var(--fg)' }}>
          XF.BAI
        </a>
        <div className="flex items-center gap-8">
          <a href="#skills" className="t-mono hidden sm:inline hover:text-[var(--accent)] transition-colors duration-300">
            SKILLS
          </a>
          <a href="#experience" className="t-mono hidden sm:inline hover:text-[var(--accent)] transition-colors duration-300">
            EXP
          </a>
          <a href="#projects" className="t-mono hidden sm:inline hover:text-[var(--accent)] transition-colors duration-300">
            WORK
          </a>
          <a href="#contact" className="t-mono hover:text-[var(--accent)] transition-colors duration-300">
            CONTACT
          </a>
        </div>
      </div>
    </nav>
  );
}
