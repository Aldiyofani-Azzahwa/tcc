import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import { EarthSystem } from './components/EarthSystem';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css';

function App() {
  return (
    <ErrorBoundary>
      <div className="ui-container">
        <h1 className="ui-title">GEODEPTH AI</h1>
        <h2 className="ui-subtitle">3D EARTH PROTOTYPE &bull; CUTAWAY</h2>

        <div className="ui-legend">
          <div className="ui-legend-item">
            <span className="dot" style={{ backgroundColor: '#5c483e' }} />
            <span>Kerak Bumi (0 - 70 km)</span>
          </div>
          <div className="ui-legend-item">
            <span className="dot" style={{ backgroundColor: '#c8501e' }} />
            <span>Mantel Bumi (70 - 2.890 km)</span>
          </div>
          <div className="ui-legend-item">
            <span className="dot" style={{ backgroundColor: '#ff9100' }} />
            <span>Inti Luar (2.890 - 5.150 km)</span>
          </div>
          <div className="ui-legend-item">
            <span className="dot" style={{ backgroundColor: '#fff3b0' }} />
            <span>Inti Dalam (5.150 - 6.371 km)</span>
          </div>
        </div>
      </div>

      <Canvas
        camera={{ position: [2.2, 1.3, 2.2], fov: 45 }}
        gl={{ antialias: true, alpha: false, localClippingEnabled: true }}
        onCreated={({ gl }) => {
          gl.localClippingEnabled = true;
        }}
      >
        <color attach="background" args={['#050505']} />
        
        {/* Reliable Self-Contained Scientific Lighting (no external downloads needed) */}
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 3, 5]} intensity={2.5} />
        <directionalLight position={[-5, -2, -5]} intensity={0.8} color="#88aaff" />
        <directionalLight position={[0, 5, -2]} intensity={0.5} />

        {/* Orbit Controls for Interaction */}
        <OrbitControls 
          enablePan={false}
          enableDamping={true}
          dampingFactor={0.05}
          minDistance={1.2}
          maxDistance={10}
        />

        <Suspense fallback={
          <mesh>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial color="#224488" wireframe />
          </mesh>
        }>
          <EarthSystem />
        </Suspense>
      </Canvas>
    </ErrorBoundary>
  );
}

export default App;
