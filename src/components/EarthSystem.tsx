import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EarthSurface } from './EarthSurface';
import { EarthLayers } from './EarthLayers';

export function EarthSystem() {
  const earthGroupRef = useRef<THREE.Group>(null);

  // 1. Tiga bidang potong lokal (Local Clipping Planes) untuk memotong 1/8 bola:
  //    Normal (-1, 0, 0), (0, -1, 0), dan (0, 0, -1).
  //    Dengan clipIntersection = true, hanya kuadran (X > 0 && Y > 0 && Z > 0)
  //    yang dipotong (tepat 1/8 bagian bola di belahan utara depan).
  const localPlane1 = useMemo(() => new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0), []);
  const localPlane2 = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, -1), 0), []);
  const localPlane3 = useMemo(() => new THREE.Plane(new THREE.Vector3(0, -1, 0), 0), []);

  // 2. Bidang potong dalam World Space
  const worldPlane1 = useMemo(() => new THREE.Plane(), []);
  const worldPlane2 = useMemo(() => new THREE.Plane(), []);
  const worldPlane3 = useMemo(() => new THREE.Plane(), []);
  const clippingPlanes = useMemo(
    () => [worldPlane1, worldPlane2, worldPlane3],
    [worldPlane1, worldPlane2, worldPlane3]
  );

  // 3. Sinkronisasi bidang potong dengan rotasi EarthSystem secara realtime
  useFrame(() => {
    if (earthGroupRef.current) {
      earthGroupRef.current.updateMatrixWorld();
      worldPlane1.copy(localPlane1).applyMatrix4(earthGroupRef.current.matrixWorld);
      worldPlane2.copy(localPlane2).applyMatrix4(earthGroupRef.current.matrixWorld);
      worldPlane3.copy(localPlane3).applyMatrix4(earthGroupRef.current.matrixWorld);
    }
  });

  return (
    <group ref={earthGroupRef} name="EarthSystem">
      {/* 1. Permukaan Luar NASA GLB (Dipotong 1/8) */}
      <EarthSurface modelPath="/models/Earth_1_12756.glb" clippingPlanes={clippingPlanes} />

      {/* 2. Struktur Internal: Kerak, Mantel, Inti Luar dipotong 1/8, Inti Dalam utuh bulat */}
      <EarthLayers clippingPlanes={clippingPlanes} />
    </group>
  );
}
