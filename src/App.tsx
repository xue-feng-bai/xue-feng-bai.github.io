import { useDeviceDetect } from './hooks/useDeviceDetect';
import DesktopLayout from './layouts/DesktopLayout';
import MobileLayout from './layouts/MobileLayout';

export default function App() {
  const device = useDeviceDetect();

  // 默认显示桌面版（SEO + 首屏），检测到手机切换
  if (device === 'mobile') {
    return <MobileLayout />;
  }

  return <DesktopLayout />;
}
