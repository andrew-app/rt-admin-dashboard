import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Auth0Provider } from '@auth0/auth0-react';
import { getConfig } from "./config";

const config = getConfig();


const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  authorizationParams: {
    redirect_uri: 'http://localhost:3000/authorize',
    ...(config.audience ? { audience: config.audience } : null),
  },
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Auth0Provider
    {...providerConfig}
  >
    <App />
    </Auth0Provider>
  </React.StrictMode>

  ,
)
