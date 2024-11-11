import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import AppRouter from './router';

ReactDOM.createRoot(document.querySelector("#root")).render(
  <React.StrictMode>
      <AppRouter />
  </React.StrictMode>
);