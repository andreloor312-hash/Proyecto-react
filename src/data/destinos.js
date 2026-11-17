/**
 * Destinos compartidos entre el planificador y el mapa de Ecuador.
 * Las coordenadas se usan para ubicar los marcadores en el mapa.
 */
export const DESTINOS_ECUADOR = [
  // Sierra
  {
    id: 1,
    nombre: 'Baños de Agua Santa',
    region: 'Sierra',
    precioBase: 120,
    proveedores: '3 agencias verificadas',
    descripcion: 'Aguas termales, cataratas y aventura en los Andes.',
    lon: -78.4366,
    lat: -1.3963,
  },
  {
    id: 4,
    nombre: 'Quito histórico y Mitad del Mundo',
    region: 'Sierra',
    precioBase: 95,
    proveedores: '4 operadores locales',
    descripcion: 'Centro histórico, teleférico y la línea ecuatorial.',
    lon: -78.4678,
    lat: -0.1807,
  },
  {
    id: 5,
    nombre: 'Cuenca',
    region: 'Sierra',
    precioBase: 110,
    proveedores: '3 agencias verificadas',
    descripcion: 'Arquitectura colonial, ríos y cultura cañari.',
    lon: -79.0059,
    lat: -2.9001,
  },

  // Costa
  {
    id: 2,
    nombre: 'Puerto López / Isla de la Plata',
    region: 'Costa',
    precioBase: 185,
    proveedores: '5 operadores locales',
    descripcion: 'Playas, avistamiento de ballenas e Isla de la Plata.',
    lon: -80.8069,
    lat: -1.5544,
  },
  {
    id: 6,
    nombre: 'Guayaquil y Las Peñas',
    region: 'Costa',
    precioBase: 85,
    proveedores: '6 operadores locales',
    descripcion: 'Malecón, barrio de Las Peñas y gastronomía costeña.',
    lon: -79.9192,
    lat: -2.1895,
  },
  {
    id: 7,
    nombre: 'Montañita',
    region: 'Costa',
    precioBase: 140,
    proveedores: '4 hostales verificados',
    descripcion: 'Surf, playa y vida nocturna en la costa central.',
    lon: -80.7583,
    lat: -1.8231,
  },

  // Amazonía
  {
    id: 3,
    nombre: 'Cuyabeno Lodge',
    region: 'Amazonía',
    precioBase: 310,
    proveedores: '2 eco-lodges directos',
    descripcion: 'Ecoalojes, ríos y fauna en la Amazonía ecuatoriana.',
    lon: -75.8739,
    lat: -0.0086,
  },
  {
    id: 8,
    nombre: 'Tena y el río Napo',
    region: 'Amazonía',
    precioBase: 160,
    proveedores: '5 operadores locales',
    descripcion: 'Rafting, aguas termales y puerta de entrada al Oriente.',
    lon: -77.832,
    lat: -0.9889,
  },
  {
    id: 9,
    nombre: 'Parque Nacional Yasuní',
    region: 'Amazonía',
    precioBase: 295,
    proveedores: '3 eco-lodges directos',
    descripcion: 'Selva protegida, navegación en canoa y avistamiento de aves.',
    lon: -75.98,
    lat: -0.83,
  },
];
