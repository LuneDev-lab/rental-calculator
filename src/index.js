// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa a nova API de renderização do React 18
import App from './App'; // Seu componente principal
import reportWebVitals from './reportWebVitals'; // Opcional, para monitorar performance

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Se você quiser começar a medir a performance na sua aplicação,
// passe uma função para logar os resultados (ex: reportWebVitals(console.log))
// ou enviar para um endpoint de análise. Saiba mais: https://bit.ly/CRA-vitals
reportWebVitals();