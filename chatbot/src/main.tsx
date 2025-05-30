import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'next-themes';
import { HeroUIProvider } from '@heroui/react';

import { AiChatApp } from './app';
import './index.css';

// Ensure theme is set immediately
if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('data-theme', 'light');
}

const root = document.getElementById('openassistant-root');

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <HeroUIProvider>
        <ThemeProvider attribute="data-theme" defaultTheme="light">
          <AiChatApp />
        </ThemeProvider>
      </HeroUIProvider>
    </React.StrictMode>
  );
}
