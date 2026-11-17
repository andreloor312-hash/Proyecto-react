import { zxyToTileId, tileIdToZxy } from 'pmtiles';

/**
 * Utilidades de la librería PMTiles usadas en el mapa de Ecuador.
 * Solo se emplean las funciones de conversión de tiles: no se cargan archivos .pmtiles.
 */

/** Vista centrada en Ecuador continental (incluye los 3 destinos del planificador). */
export const ECUADOR_VIEW = {
  center: [-78.6, -1.6],
  zoom: 6.2,
  maxBounds: [
    [-82.5, -5.8],
    [-74.0, 2.2],
  ],
};

/**
 * Mapa base raster público de OpenStreetMap.
 * No requiere API key: CARTO pasó a exigirla en `basemaps.cartocdn.com`.
 */
export const MAP_STYLE = {
  version: 8,
  sources: {
    basemap: {
      type: 'raster',
      tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
      maxzoom: 19,
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
    },
  },
  layers: [{ id: 'basemap', type: 'raster', source: 'basemap' }],
};

/** Convierte longitud/latitud + zoom en coordenadas de tile (XYZ). */
export function lonLatToTile(lon, lat, zoom) {
  const z = Math.max(0, Math.min(26, Math.floor(zoom)));
  const n = 2 ** z;
  const latRad = (lat * Math.PI) / 180;
  const rawX = ((lon + 180) / 360) * n;
  const rawY =
    ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n;
  const clamp = (value) => Math.max(0, Math.min(n - 1, Math.floor(value)));
  return { z, x: clamp(rawX), y: clamp(rawY) };
}

/** Centro geográfico de un tile XYZ. */
export function tileToLonLat(z, x, y) {
  const n = 2 ** z;
  const lon = (x / n) * 360 - 180;
  const lat = (Math.atan(Math.sinh(Math.PI * (1 - (2 * y) / n))) * 180) / Math.PI;
  return [lon, lat];
}

/** Información de tile (XYZ + ID Hilbert + centro) para un punto, usando PMTiles. */
export function getTileInfo(lon, lat, zoom) {
  const tile = lonLatToTile(lon, lat, zoom);
  return {
    ...tile,
    tileId: zxyToTileId(tile.z, tile.x, tile.y),
    center: tileToLonLat(tile.z, tile.x, tile.y),
  };
}

/** Información de tile para un destino, usando PMTiles. */
export function getDestinationTile(destino, zoom = 10) {
  return getTileInfo(destino.lon, destino.lat, zoom);
}

/** Utilidad inversa: ID Hilbert -> z/x/y. */
export function tileIdToCoordinates(tileId) {
  return tileIdToZxy(tileId);
}
