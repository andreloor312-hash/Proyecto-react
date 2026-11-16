import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import App from './App';

const theme = createTheme({
  colors: {
    wine: [
      '#fbe9ec',
      '#f2c2ca',
      '#e48b99',
      '#d55268',
      '#c62641',
      '#b81d33',
      '#8e1326',
      '#720e1e',
      '#520915',
      '#33050c',
    ],
    gold: [
      '#fdf9ee', // 0: Marfil / Oro muy claro (ideal para párrafos principales)
      '#f7eccb', // 1: Champagne suave
      '#eed897', // 2: Oro pálido
      '#e4c163', // 3: Dorado luminoso (ideal para títulos y precios)
      '#d4af37', // 4: Dorado clásico metálico
      '#b89225', // 5: Oro viejo
      '#96741b', // 6: Bronce dorado
      '#735713', // 7
      '#523d0c', // 8
      '#332506', // 9
    ],
    dark: [
      '#f7eccb', // 0: Texto base en tono champagne cálido
      '#d9cbb0', // 1: Texto secundario
      '#a69880', // 2: Texto tenue
      '#6e5d60', // 3: Bordes sutiles
      '#3a2d30', // 4: Bordes de tarjetas
      '#261c1f', // 5: Superficie elevada
      '#1a1315', // 6: Tarjetas / Modales
      '#120d0e', // 7: Fondo principal
      '#0b0809', // 8: Negro profundo
      '#050304', // 9: Negro absoluto
    ],
  },
  primaryColor: 'wine',
  primaryShade: 6,
  defaultRadius: 'md',
  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  headings: {
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    fontWeight: '700',
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <MantineProvider theme={theme} defaultColorScheme="dark">
    <App />
  </MantineProvider>
);