import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Html, Bounds } from '@react-three/drei';
import './ModelViewer.css';

function GlbModel({ url }) {
  const { scene } = useGLTF(url);
  return (
    <Bounds fit clip observe margin={1.3}>
      <primitive object={scene} />
    </Bounds>
  );
}

function LoadingIndicator() {
  return (
    <Html center>
      <div className="model-viewer-loading">GLB 模型加载中…</div>
    </Html>
  );
}

export default function ModelViewer({ url }) {
  return (
    <div className="model-viewer-wrap">
      <div className="model-viewer">
        <Canvas camera={{ position: [4, 3, 6], fov: 45 }} dpr={[1, 2]}>
          <color attach="background" args={['#0a0e17']} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[8, 12, 6]} intensity={1.2} />
          <directionalLight position={[-6, 4, -4]} intensity={0.35} />
          <Suspense fallback={<LoadingIndicator />}>
            <GlbModel url={url} />
            <Environment preset="city" />
          </Suspense>
          <OrbitControls
            makeDefault
            enableDamping
            dampingFactor={0.06}
            minDistance={0.5}
            maxDistance={200}
          />
        </Canvas>
      </div>
      <span className="model-viewer-hint">拖拽旋转 · 滚轮缩放</span>
    </div>
  );
}
