import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App.jsx';
import { LangProvider } from './context/LangContext.jsx';
import { StoreProvider } from './context/StoreContext.jsx';
import { fetchContent } from './api.js';
import { applyContent } from './lib/content.js';
import './styles.css';

// Keep hash navigation for the downloadable HTML and existing bookmarked URLs.
const Router = location.protocol === 'file:' || location.hash.startsWith('#/') ? HashRouter : BrowserRouter;

async function boot() {
  // Load the content the owner published from the admin dashboard before painting the site.
  try { applyContent(await fetchContent()); } catch { /* keep the built-in content */ }

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Router>
        <LangProvider>
          <StoreProvider>
            <App />
          </StoreProvider>
        </LangProvider>
      </Router>
    </React.StrictMode>
  );
}

boot();
