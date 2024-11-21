import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Page } from '@utrecht/component-library-react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Page>
      <App />
    </Page>
  </React.StrictMode>
);
