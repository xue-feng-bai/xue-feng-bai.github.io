import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LoadingScreen from '../components/LoadingScreen';
import CustomCursor from '../components/CustomCursor';
import Navigation from '../sections/Navigation';
import HeroSection from '../sections/HeroSection';
import SkillsSection from '../sections/SkillsSection';
import ExperienceSection from '../sections/ExperienceSection';
import ProjectSection from '../sections/ProjectSection';
import FooterSection from '../sections/FooterSection';

gsap.registerPlugin(ScrollTrigger);

export default function DesktopLayout() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) return;
    const timer = setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => clearTimeout(timer);
  }, [loaded]);

  return (
    <>
      <CustomCursor />
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <div className={`grain transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <Navigation />
        <main>
          <HeroSection />
          <SkillsSection />
          <ExperienceSection />
          <ProjectSection />
          <FooterSection />
        </main>
      </div>
    </>
  );
}
