import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { LoginProvider } from './Context/loginContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <LoginProvider>
    <App />
  </LoginProvider>
);
