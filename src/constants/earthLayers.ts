/**
 * Konfigurasi Skala dan Material Lapisan Internal Bumi (GeoDepth AI)
 * 
 * Standar koordinat:
 * Earth Radius = 1.0 (permukaan model NASA)
 */

export interface LayerConfig {
  id: string;
  name: string;
  indonesianName: string;
  depthKm: string;
  outerRadius: number;
  innerRadius: number;
  color: string;
  emissive?: string;
  emissiveIntensity?: number;
  roughness: number;
  metalness: number;
  description: string;
}

export const EARTH_RADIUS = 1.0;
export const CRUST_RADIUS = 0.99;        // ~0 - 70 km
export const MANTLE_RADIUS = 0.82;       // ~70 - 2,890 km (Mantel Atas & Bawah)
export const OUTER_CORE_RADIUS = 0.52;   // ~2,890 - 5,150 km (Inti Luar Cair)
export const INNER_CORE_RADIUS = 0.25;   // ~5,150 - 6,371 km (Inti Dalam Padat)

export const EARTH_LAYERS: LayerConfig[] = [
  {
    id: 'crust',
    name: 'Crust',
    indonesianName: 'Kerak Bumi',
    depthKm: '0 - 70 km',
    outerRadius: EARTH_RADIUS,
    innerRadius: CRUST_RADIUS,
    color: '#5c483e', // Batuan basalt & granit gelap
    roughness: 0.9,
    metalness: 0.1,
    description: 'Lapisan terluar Bumi berupa batuan padat, tempat kehidupan berada.',
  },
  {
    id: 'mantle',
    name: 'Mantle',
    indonesianName: 'Mantel Bumi',
    depthKm: '70 - 2,890 km',
    outerRadius: CRUST_RADIUS,
    innerRadius: OUTER_CORE_RADIUS,
    color: '#c8501e', // Silikat kaya besi & magnesium berpijar
    emissive: '#3d1204',
    emissiveIntensity: 0.4,
    roughness: 0.65,
    metalness: 0.2,
    description: 'Lapisan tebal batuan semi-plastis dan magma bersuhu tinggi.',
  },
  {
    id: 'outer-core',
    name: 'Outer Core',
    indonesianName: 'Inti Luar',
    depthKm: '2,890 - 5,150 km',
    outerRadius: OUTER_CORE_RADIUS,
    innerRadius: INNER_CORE_RADIUS,
    color: '#ff9100', // Logam besi-nikel cair membara
    emissive: '#5c2b00',
    emissiveIntensity: 0.8,
    roughness: 0.35,
    metalness: 0.5,
    description: 'Fluida besi dan nikel cair yang menghasilkan medan magnet Bumi.',
  },
  {
    id: 'inner-core',
    name: 'Inner Core',
    indonesianName: 'Inti Dalam',
    depthKm: '5,150 - 6,371 km',
    outerRadius: INNER_CORE_RADIUS,
    innerRadius: 0.0,
    color: '#fff3b0', // Logam padat bersuhu >5.500°C berpijar kuat
    emissive: '#ffa000',
    emissiveIntensity: 1.2,
    roughness: 0.25,
    metalness: 0.6,
    description: 'Bola padat kristal besi-nikel bertekanan ekstrem sepanas permukaan Matahari.',
  },
];
