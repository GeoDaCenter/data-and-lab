import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'next-themes';
import { HeroUIProvider } from '@heroui/react';
import { AiChat } from './assistant';
import './index.css';

// Ensure theme is set immediately
if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('data-theme', 'light');
}

const root = document.getElementById('openassistant-root');

// get the attribute data-geojson
const geojsonUrl = root?.getAttribute('data-geojson');

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <HeroUIProvider>
        <ThemeProvider attribute="data-theme" defaultTheme="light">
          <AiChat geojsonUrl={geojsonUrl} />
        </ThemeProvider>
      </HeroUIProvider>
    </React.StrictMode>
  );
}
