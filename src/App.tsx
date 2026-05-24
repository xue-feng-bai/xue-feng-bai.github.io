import { useLenis } from './hooks/useLenis';
import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import PhilosophySection from './sections/PhilosophySection';
import SkillsSection from './sections/SkillsSection';
import ExperienceSection from './sections/ExperienceSection';
import ProjectsSection from './sections/ProjectsSection';
import TextRingSection from './sections/TextRingSection';
import EducationSection from './sections/EducationSection';
import FooterSection from './sections/FooterSection';

export default function App() {
  useLenis();

  return (
    <div className="relative">
      <Navigation />
      <main>
        {/* 浅色 - Hero: 个人简介 + 技能卡片 */}
        <HeroSection />

        {/* 浅色 - 理念宣言 */}
        <PhilosophySection />

        {/* 深色 - 核心能力: 计数器 + 环形进度 + 弹性缩放 + 星芒 + 倾斜网格 */}
        <SkillsSection />

        {/* 深色 - 工作经历: SVG路径 + 雷达图 */}
        <ExperienceSection />

        {/* 深色 - 项目展示: 3D翻转卡片 + 粒子 */}
        <ProjectsSection />

        {/* 浅色 - 旋转文字环 */}
        <TextRingSection />

        {/* 深色 - 教育背景 */}
        <EducationSection />
      </main>
      {/* 深色 - 联系方式: 微磨砂卡片 + 信封动画 */}
      <FooterSection />
    </div>
  );
}
