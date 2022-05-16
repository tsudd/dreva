import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { DrevaProvider } from './providers/DrevaProvider';


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(

  <React.StrictMode>
    <DrevaProvider>
      <App />
    </DrevaProvider>
  </React.StrictMode>
);
