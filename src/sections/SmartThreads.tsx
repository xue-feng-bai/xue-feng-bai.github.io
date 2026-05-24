import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ── utils ── */
const getRandomFloat = (min: number, max: number) => min + (max - min) * Math.random();

/* ── constants ── */
const COLORS = {
  background: '#fbf9f4',
  globe: '#fbf9f4',
  globeLines: '#e0ddd5',
  arcLines: '#ff7438',
  dots: '#0d0d0c',
};

const RAD = 3.8;

/* ── fibonacci sphere points ── */
function getFibonacciSpherePoints(count: number, radius: number) {
  const points: { x: number; y: number; z: number }[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    points.push({
      x: Math.cos(theta) * r * radius,
      y: y * radius,
      z: Math.sin(theta) * r * radius,
    });
  }
  return points;
}

const spherePoints = getFibonacciSpherePoints(450, RAD);

/* ── text to coordinates ── */
function convertTextToCoordinates(text: string, size = 8, density = 10) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  canvas.width = size * 8;
  canvas.height = size * 8;
  ctx.fillStyle = 'black';
  ctx.font = `bold ${size * 2}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const coordinates: { x: number; y: number; z: number }[] = [];
  const { width, height } = canvas;
  for (let y = 0; y < height; y += density) {
    for (let x = 0; x < width; x += density) {
      const index = (y * width + x) * 4;
      if (imageData.data[index + 3] > 0) {
        coordinates.push({
          x: (x - width / 2) / 12,
          y: (height / 2 - y) / 12,
          z: 0,
        });
      }
    }
  }
  return coordinates;
}

/* ── visible points ── */
const visiblePoints: { x: number; y: number; z: number }[] = [
  ...spherePoints,
  ...convertTextToCoordinates('AI', 20, 6).map((gp) => ({
    x: gp.x - 0.6,
    y: gp.y + 0,
    z: 1.5,
  })),
  { x: 2.5, y: 1.2, z: 1.5 },
  ...convertTextToCoordinates('PM', 20, 6).map((gp) => ({
    x: gp.x + 3.2,
    y: gp.y + 0,
    z: 1.5,
  })),
];

/* ── distance helper ── */
function distanceTo(
  a: { x: number; y: number; z: number },
  b: { x: number; y: number; z: number }
) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = a.z - b.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

/* ── line generator ── */
function getRandomStartEnd(
  radius: number,
  linesCount: number,
  points: { x: number; y: number; z: number }[]
) {
  const startPoints: THREE.Vector3[] = [];
  for (let i = 0; i < linesCount; i++) {
    const pt = points[Math.floor(Math.random() * points.length)];
    const r = 0.5 + Math.random() * 0.5;
    startPoints.push(new THREE.Vector3(pt.x * r, pt.y * r, pt.z * r));
  }

  const lines: THREE.Vector3[][] = [];
  const sampleCount = 15;
  const searchCount = 3;
  const maxRadius = 1.3 * radius;

  for (let lineIndex = 0; lineIndex < linesCount; lineIndex++) {
    const curve: THREE.Vector3[] = [];
    const currentPos = startPoints[lineIndex].clone();
    curve.push(currentPos.clone());

    let endPos = new THREE.Vector3(
      getRandomFloat(-radius, radius),
      getRandomFloat(-radius, radius),
      getRandomFloat(-radius, radius)
    );
    let maxLen = Infinity;

    for (let u = 0; u < 300; u++) {
      // Find closest points
      const candidates = points
        .map((p) => ({
          point: p,
          dist: distanceTo(currentPos, p),
        }))
        .sort((a, b) => a.dist - b.dist)
        .slice(0, sampleCount);

      // Average direction
      const avgDir = new THREE.Vector3(0, 0, 0);
      for (let k = 0; k < Math.min(searchCount, candidates.length); k++) {
        const dir = new THREE.Vector3(
          candidates[k].point.x - currentPos.x,
          candidates[k].point.y - currentPos.y,
          candidates[k].point.z - currentPos.z
        ).normalize();
        avgDir.add(dir);
      }
      if (avgDir.length() > 0) {
        avgDir.normalize();
      }

      // Step forward
      const stepSize = getRandomFloat(0.05, 0.2);
      currentPos.add(avgDir.multiplyScalar(stepSize));

      // Apply noise
      currentPos.addScalar(getRandomFloat(-0.02, 0.02));

      // Push outward if too far
      const distFromOrigin = currentPos.length();
      if (distFromOrigin > maxRadius) {
        currentPos.normalize().multiplyScalar(maxRadius);
      }

      curve.push(currentPos.clone());

      if (u > 8 && distanceTo(currentPos, endPos) < 0.35) {
        maxLen = u;
      }

      if (u === maxLen - 1) break;
    }

    if (curve.length > 15) {
      lines.push(curve);
    }
  }

  return lines;
}

/* ── Line Component ── */
function Line({ curve }: { curve: THREE.Vector3[] }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { geometry, opacityAttribute } = useMemo(() => {
    const curveObj = new THREE.CatmullRomCurve3(curve, false, 'catmullrom', 0.25);
    const pts = curveObj.getPoints(300);
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(pts.length * 3);
    const colors = new Float32Array(pts.length * 3);
    const opacityArray = new Float32Array(pts.length);

    for (let i = 0; i < pts.length; i++) {
      positions[i * 3] = pts[i].x;
      positions[i * 3 + 1] = pts[i].y;
      positions[i * 3 + 2] = pts[i].z;

      const t = i / pts.length;
      const c = new THREE.Color(COLORS.arcLines);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
      opacityArray[i] = Math.sin(t * Math.PI) * 0.6 + 0.1;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    const opacityAttr = new THREE.BufferAttribute(opacityArray, 1);
    geo.setAttribute('aOpacity', opacityAttr);

    return { geometry: geo, opacityAttribute: opacityAttr };
  }, [curve]);

  useEffect(() => {
    geometry.setAttribute('aOpacity', opacityAttribute);
  }, [geometry, opacityAttribute]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (materialRef.current) {
        materialRef.current.uniforms.uTime.value += 0.01;
      }
    }, 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <lineSegments>
      <primitive object={geometry} attach="geometry" />
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        vertexColors
        uniforms={{
          uTime: { value: 0 },
          uTravelLength: { value: 400 },
        }}
        vertexShader={`
          attribute vec3 aColor;
          attribute float aOpacity;
          varying vec3 vColor;
          varying float vOpacity;
          void main() {
            vColor = aColor;
            vOpacity = aOpacity;
            vec3 transformed = vec3(position);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform float uTravelLength;
          varying vec3 vColor;
          varying float vOpacity;
          void main() {
            gl_FragColor = vec4(vColor, vOpacity);
          }
        `}
      />
    </lineSegments>
  );
}

/* ── Dot Component ── */
function Dot({
  curve,
  speed,
  max,
  delay,
}: {
  curve: THREE.Vector3[];
  speed: number;
  max: number;
  delay: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  const points = useMemo(() => {
    return new THREE.CatmullRomCurve3(curve).getPoints(400);
  }, [curve]);

  useEffect(() => {
    if (!meshRef.current || points.length === 0) return;
    meshRef.current.position.copy(points[0]);
  }, [points]);

  useFrame(() => {
    if (!meshRef.current || points.length === 0) return;
    const i = Math.floor((Date.now() * 0.1 * speed + delay) % max);
    const point = points[Math.min(i, points.length - 1)];
    if (point) {
      meshRef.current.position.copy(point);
      const nextPoint = points[Math.min(i + 1, points.length - 1)];
      if (nextPoint) {
        meshRef.current.lookAt(nextPoint);
      }
      meshRef.current.scale.setScalar(0.8);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshBasicMaterial color="#ff7438" />
    </mesh>
  );
}

/* ── Main Threads Container ── */
function SmartThreadsGroup() {
  const lines = useMemo(() => {
    return getRandomStartEnd(RAD, 150, visiblePoints);
  }, []);

  return (
    <group>
      {lines.map((l, i) => (
        <group key={i}>
          <Line curve={l} />
          <Dot curve={l} speed={1.1} max={400} delay={i * 0.5} />
        </group>
      ))}
    </group>
  );
}

/* ── Scene Wrapper ── */
export default function SmartThreads() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
        dpr={Math.min(window.devicePixelRatio, 2)}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <SmartThreadsGroup />
      </Canvas>
    </div>
  );
}
