import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// capture app container and create root component
const container = document.getElementById('root');
const root = createRoot(container);

// render app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
