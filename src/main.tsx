import 'core-js/stable';
import 'regenerator-runtime/runtime';
import ResizeObserver from 'resize-observer-polyfill';
import 'intersection-observer';

window.ResizeObserver = window.ResizeObserver || ResizeObserver;

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
 <StrictMode>
 <App />
 </StrictMode>,
);
