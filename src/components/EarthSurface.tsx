import { useGLTF } from '@react-three/drei';
import { useMemo, useEffect } from 'react';
import * as THREE from 'three';

interface EarthSurfaceProps {
  modelPath: string;
  clippingPlanes?: THREE.Plane[];
}

export function EarthSurface({ modelPath, clippingPlanes }: EarthSurfaceProps) {
  const { scene } = useGLTF(modelPath);

  // Compute exact scale factor and center offset synchronously using useMemo
  const { scaleFactor, offset, originalSize } = useMemo(() => {
    // Clone scene to avoid sharing mutated state across potential reloads
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);

    const maxDim = Math.max(size.x, size.y, size.z);
    // Scale so Earth radius is exactly 1.0 (diameter = 2.0)
    const scale = maxDim > 0 ? 2.0 / maxDim : 0.002;

    return {
      scaleFactor: scale,
      offset: [-center.x * scale, -center.y * scale, -center.z * scale] as [number, number, number],
      originalSize: size,
    };
  }, [scene]);

  // Ensure materials receive light properly and log diagnostics
  useEffect(() => {
    if (scene) {
      console.log('--- GLB DIAGNOSTICS: NASA Earth ---');
      let meshCount = 0;
      const materials: string[] = [];

      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          meshCount++;
          if (mesh.material) {
            const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            mats.forEach((m) => {
              materials.push(m.name || 'Unnamed Material');
              if (clippingPlanes && clippingPlanes.length > 0) {
                m.clippingPlanes = clippingPlanes;
                m.clipIntersection = true;
                m.clipShadows = true;
                m.side = THREE.DoubleSide;
              }
              m.needsUpdate = true;
            });
          }
        }
      });

      console.log(`Jumlah Mesh: ${meshCount}`);
      console.log(`Bahan/Material:`, materials);
      console.log(`Original Bounding Box: X=${originalSize.x.toFixed(1)}, Y=${originalSize.y.toFixed(1)}, Z=${originalSize.z.toFixed(1)}`);
      console.log(`Applied Uniform Scale: ${scaleFactor.toFixed(6)} (Radius set to ~1.0)`);
      console.log(`Clipping Planes Attached: ${clippingPlanes ? clippingPlanes.length : 0}`);
      console.log('NASA Earth Model siap ditampilkan!');
      console.log('-----------------------------------');
    }
  }, [scene, scaleFactor, offset, originalSize, clippingPlanes]);

  return (
    <group position={offset} scale={scaleFactor}>
      <primitive object={scene} />
    </group>
  );
}

// Preload the model to prevent popping in
useGLTF.preload('/models/Earth_1_12756.glb');
