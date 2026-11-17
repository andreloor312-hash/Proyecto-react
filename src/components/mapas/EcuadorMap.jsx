import { useEffect, useRef, useState } from 'react';
import { ActionIcon, Alert, Box, Text, Tooltip } from '@mantine/core';
import {
  IconFocusCentered,
  IconMapOff,
  IconMinus,
  IconPlus,
} from '@tabler/icons-react';
import * as maplibregl from 'maplibre-gl';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import 'maplibre-gl/dist/maplibre-gl.css';
import { ECUADOR_VIEW, MAP_STYLE, getTileInfo } from '../../lib/pmtiles';

// MapLibre v6 con Vite necesita la URL del worker configurada una sola vez.
maplibregl.setWorkerUrl(workerUrl);

/** Mapa de Ecuador continental con los destinos del planificador. */
export default function EcuadorMap({ destinos, selectedId, onSelect, onTileClick }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef(new Map());
  const onSelectRef = useRef(onSelect);
  const onTileClickRef = useRef(onTileClick);
  const [loaded, setLoaded] = useState(false);
  const [mapError, setMapError] = useState(null);

  useEffect(() => {
    onSelectRef.current = onSelect;
    onTileClickRef.current = onTileClick;
  }, [onSelect, onTileClick]);

  useEffect(() => {
    if (!containerRef.current) return undefined;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: MAP_STYLE,
      center: ECUADOR_VIEW.center,
      zoom: ECUADOR_VIEW.zoom,
      maxBounds: ECUADOR_VIEW.maxBounds,
    });

    const markers = markersRef.current;
    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl(), 'top-right');
    map.addControl(new maplibregl.ScaleControl({ maxWidth: 120, unit: 'metric' }), 'bottom-left');

    destinos.forEach((destino) => {
      const content = document.createElement('div');
      const title = document.createElement('strong');
      title.textContent = destino.nombre;
      const detail = document.createElement('div');
      detail.style.cssText = 'font-size:12px;margin-top:4px;';
      detail.textContent = `${destino.region} · $${destino.precioBase} USD`;
      content.append(title, detail);

      const marker = new maplibregl.Marker({ color: '#228be6' })
        .setLngLat([destino.lon, destino.lat])
        .setPopup(new maplibregl.Popup({ offset: 24 }).setDOMContent(content))
        .addTo(map);

      marker.getElement().addEventListener('click', () => onSelectRef.current?.(destino.id));
      markers.set(destino.id, marker);
    });

    // El evento `load` a veces tarda si el mapa base responde lento; el overlay
    // no debe bloquear la interacción de forma indefinida.
    const loadingFallback = setTimeout(() => setLoaded(true), 1500);
    map.on('load', () => setLoaded(true));

    map.on('error', (event) => {
      setMapError(event?.error?.message ?? 'No se pudo cargar el mapa base.');
    });

    map.on('click', (event) => {
      const tile = getTileInfo(event.lngLat.lng, event.lngLat.lat, map.getZoom());
      const popupContent = document.createElement('div');
      const title = document.createElement('strong');
      title.textContent = 'Tile seleccionado';
      const coords = document.createElement('div');
      coords.style.cssText = 'font-size:12px;margin-top:4px;';
      coords.textContent = `z${tile.z} / x${tile.x} / y${tile.y}`;
      const id = document.createElement('div');
      id.style.cssText = 'font-size:11px;color:#666;';
      id.textContent = `ID Hilbert: ${tile.tileId}`;
      popupContent.append(title, coords, id);

      new maplibregl.Popup({ maxWidth: '240px' })
        .setLngLat(event.lngLat)
        .setDOMContent(popupContent)
        .addTo(map);

      onTileClickRef.current?.(tile);
    });

    return () => {
      clearTimeout(loadingFallback);
      map.remove();
      mapRef.current = null;
      markers.clear();
    };
  }, [destinos]);

  useEffect(() => {
    if (!selectedId || !mapRef.current) return;
    const destino = destinos.find((item) => item.id === selectedId);
    if (!destino) return;

    mapRef.current.flyTo({
      center: [destino.lon, destino.lat],
      zoom: 11,
      essential: true,
    });
    markersRef.current.get(destino.id)?.togglePopup();
  }, [selectedId, destinos]);

  const resetView = () => {
    mapRef.current?.flyTo({
      center: ECUADOR_VIEW.center,
      zoom: ECUADOR_VIEW.zoom,
      essential: true,
    });
  };

  return (
    <Box
      ref={containerRef}
      style={{
        height: 520,
        borderRadius: 'var(--mantine-radius-md)',
        overflow: 'hidden',
        position: 'relative',
        border: '1px solid var(--mantine-color-gray-3)',
      }}
    >
      <Box
        style={{
          position: 'absolute',
          top: 12,
          left: 12,
          zIndex: 5,
          display: 'flex',
          gap: 6,
        }}
      >
        <Tooltip label="Acercar" withArrow>
          <ActionIcon
            variant="default"
            bg="white"
            aria-label="Acercar"
            disabled={!loaded}
            onClick={() => mapRef.current?.zoomIn()}
          >
            <IconPlus size={17} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Alejar" withArrow>
          <ActionIcon
            variant="default"
            bg="white"
            aria-label="Alejar"
            disabled={!loaded}
            onClick={() => mapRef.current?.zoomOut()}
          >
            <IconMinus size={17} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Ver todo Ecuador" withArrow>
          <ActionIcon
            variant="default"
            bg="white"
            aria-label="Ver todo Ecuador"
            disabled={!loaded}
            onClick={resetView}
          >
            <IconFocusCentered size={17} />
          </ActionIcon>
        </Tooltip>
      </Box>

      {!loaded && !mapError && (
        <Box
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 4,
            display: 'grid',
            placeItems: 'center',
            background: 'rgba(255,255,255,0.7)',
          }}
        >
          <Text c="dimmed" size="sm">Cargando mapa de Ecuador…</Text>
        </Box>
      )}

      {mapError && (
        <Box style={{ position: 'absolute', top: 12, right: 12, zIndex: 6, maxWidth: 360 }}>
          <Alert
            icon={<IconMapOff size={18} />}
            color="red"
            title="Error del mapa"
            withCloseButton
            onClose={() => setMapError(null)}
          >
            <Text size="xs">{mapError}</Text>
          </Alert>
        </Box>
      )}
    </Box>
  );
}
