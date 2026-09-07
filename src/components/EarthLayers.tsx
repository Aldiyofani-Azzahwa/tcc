import { useMemo } from 'react';
import * as THREE from 'three';
import {
  CRUST_RADIUS,
  MANTLE_RADIUS,
  OUTER_CORE_RADIUS,
  INNER_CORE_RADIUS,
  EARTH_LAYERS,
} from '../constants/earthLayers';

interface EarthLayersProps {
  clippingPlanes: THREE.Plane[];
}

export function EarthLayers({ clippingPlanes }: EarthLayersProps) {
  // Geometri penampang 1/8 (seperdelapan lingkaran = kuadran 90 derajat, theta = PI/2)
  const geometries = useMemo(() => {
    return {
      // Dinding penampang datar (Quarter Rings dari radius Inti Dalam ke Kerak)
      outerCoreCap: new THREE.RingGeometry(INNER_CORE_RADIUS, OUTER_CORE_RADIUS, 32, 1, 0, Math.PI / 2),
      mantleCap: new THREE.RingGeometry(OUTER_CORE_RADIUS, MANTLE_RADIUS, 32, 1, 0, Math.PI / 2),
      crustCap: new THREE.RingGeometry(MANTLE_RADIUS, CRUST_RADIUS, 32, 1, 0, Math.PI / 2),

      // Bola konsentris 3D
      crustSphere: new THREE.SphereGeometry(CRUST_RADIUS, 64, 64),
      mantleSphere: new THREE.SphereGeometry(MANTLE_RADIUS, 64, 64),
      outerCoreSphere: new THREE.SphereGeometry(OUTER_CORE_RADIUS, 64, 64),
      // Inti Dalam (Tetap bulat utuh tanpa potongan)
      innerCoreSphere: new THREE.SphereGeometry(INNER_CORE_RADIUS, 64, 64),
    };
  }, []);

  const crust = EARTH_LAYERS.find((l) => l.id === 'crust')!;
  const mantle = EARTH_LAYERS.find((l) => l.id === 'mantle')!;
  const outerCore = EARTH_LAYERS.find((l) => l.id === 'outer-core')!;
  const innerCore = EARTH_LAYERS.find((l) => l.id === 'inner-core')!;

  return (
    <group name="EarthLayers">
      {/* ============================================================ */}
      {/* 1. BOLA KONSENTRIS 3D INTERNAL                              */}
      {/* ============================================================ */}

      {/* Kerak Bumi (Dipotong 1/8) */}
      <mesh geometry={geometries.crustSphere}>
        <meshStandardMaterial
          color={crust.color}
          roughness={crust.roughness}
          metalness={crust.metalness}
          side={THREE.DoubleSide}
          clippingPlanes={clippingPlanes}
          clipIntersection={true}
          clipShadows={true}
        />
      </mesh>

      {/* Mantel Bumi (Dipotong 1/8) */}
      <mesh geometry={geometries.mantleSphere}>
        <meshStandardMaterial
          color={mantle.color}
          emissive={mantle.emissive}
          emissiveIntensity={mantle.emissiveIntensity}
          roughness={mantle.roughness}
          metalness={mantle.metalness}
          side={THREE.DoubleSide}
          clippingPlanes={clippingPlanes}
          clipIntersection={true}
          clipShadows={true}
        />
      </mesh>

      {/* Inti Luar (Dipotong 1/8) */}
      <mesh geometry={geometries.outerCoreSphere}>
        <meshStandardMaterial
          color={outerCore.color}
          emissive={outerCore.emissive}
          emissiveIntensity={outerCore.emissiveIntensity}
          roughness={outerCore.roughness}
          metalness={outerCore.metalness}
          side={THREE.DoubleSide}
          clippingPlanes={clippingPlanes}
          clipIntersection={true}
          clipShadows={true}
        />
      </mesh>

      {/* ============================================================ */}
      {/* 2. INTI DALAM (UTUH BULAT & BERSINAR DI PUSAT BUMI)         */}
      {/* Tidak diberikan clippingPlanes agar bentuknya tetap bola     */}
      {/* ============================================================ */}
      <mesh geometry={geometries.innerCoreSphere}>
        <meshStandardMaterial
          color={innerCore.color}
          emissive={innerCore.emissive}
          emissiveIntensity={innerCore.emissiveIntensity}
          roughness={innerCore.roughness}
          metalness={innerCore.metalness}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* ============================================================ */}
      {/* 3. DINDING PENAMPANG GEOLOGIS (3 SISI IRISAN 1/8)            */}
      {/* Memperlihatkan ketebalan lapisan mengelilingi inti bulat      */}
      {/* ============================================================ */}

      {/* Dinding 1: Bidang Vertikal Belakang (Z = 0) */}
      <group position={[0, 0, 0.001]}>
        <mesh geometry={geometries.crustCap}>
          <meshStandardMaterial color={crust.color} roughness={crust.roughness} side={THREE.DoubleSide} />
        </mesh>
        <mesh geometry={geometries.mantleCap}>
          <meshStandardMaterial
            color={mantle.color}
            emissive={mantle.emissive}
            emissiveIntensity={mantle.emissiveIntensity}
            roughness={mantle.roughness}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh geometry={geometries.outerCoreCap}>
          <meshStandardMaterial
            color={outerCore.color}
            emissive={outerCore.emissive}
            emissiveIntensity={outerCore.emissiveIntensity}
            roughness={outerCore.roughness}
            metalness={outerCore.metalness}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Dinding 2: Bidang Vertikal Samping (X = 0) */}
      <group position={[0.001, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh geometry={geometries.crustCap}>
          <meshStandardMaterial color={crust.color} roughness={crust.roughness} side={THREE.DoubleSide} />
        </mesh>
        <mesh geometry={geometries.mantleCap}>
          <meshStandardMaterial
            color={mantle.color}
            emissive={mantle.emissive}
            emissiveIntensity={mantle.emissiveIntensity}
            roughness={mantle.roughness}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh geometry={geometries.outerCoreCap}>
          <meshStandardMaterial
            color={outerCore.color}
            emissive={outerCore.emissive}
            emissiveIntensity={outerCore.emissiveIntensity}
            roughness={outerCore.roughness}
            metalness={outerCore.metalness}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Dinding 3: Lantai Horisontal Khatulistiwa (Y = 0) */}
      <group position={[0, 0.001, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh geometry={geometries.crustCap}>
          <meshStandardMaterial color={crust.color} roughness={crust.roughness} side={THREE.DoubleSide} />
        </mesh>
        <mesh geometry={geometries.mantleCap}>
          <meshStandardMaterial
            color={mantle.color}
            emissive={mantle.emissive}
            emissiveIntensity={mantle.emissiveIntensity}
            roughness={mantle.roughness}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh geometry={geometries.outerCoreCap}>
          <meshStandardMaterial
            color={outerCore.color}
            emissive={outerCore.emissive}
            emissiveIntensity={outerCore.emissiveIntensity}
            roughness={outerCore.roughness}
            metalness={outerCore.metalness}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
}
