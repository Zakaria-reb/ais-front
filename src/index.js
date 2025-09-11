import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './main.js';
import { BrowserRouter } from 'react-router-dom';

// Force dark mode at startup so Tailwind `.dark` variants apply
document.documentElement.classList.add('dark');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </React.StrictMode>
);

