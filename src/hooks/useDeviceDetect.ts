import { useState, useEffect } from 'react';

type DeviceType = 'mobile' | 'desktop' | 'unknown';

export function useDeviceDetect(): DeviceType {
  const [device, setDevice] = useState<DeviceType>('unknown');

  useEffect(() => {
    const detect = () => {
      const width = window.innerWidth;
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isCoarse = window.matchMedia('(pointer: coarse)').matches;

      // 综合判断：小屏或触摸设备 → 手机
      if (width < 768 || (isTouch && isCoarse) || (isTouch && width < 1024)) {
        setDevice('mobile');
      } else {
        setDevice('desktop');
      }
    };

    detect();
    window.addEventListener('resize', detect);
    return () => window.removeEventListener('resize', detect);
  }, []);

  return device;
}
