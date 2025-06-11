// src/App.js
import React from 'react';
import Calculator from './components/Calculator';
import './styles/globals.css';

function App() {
  // Mova a URL do SVG para uma variável para facilitar a leitura
  const backgroundPatternSvg = `url('data:image/svg+xml,%3Csvg width="20" height="20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Ccircle cx="10" cy="10" r="1"/%3E%3C/g%3E%3C/svg%3E')`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="relative min-h-screen">
        {/* Background Pattern - AGORA COMO ESTILO INLINE */}
        <div
          className="absolute inset-0"
          style={{ backgroundImage: backgroundPatternSvg }} // Aplica como estilo inline
        ></div>
        
        {/* Header */}
        <header className="relative z-10 pt-8 pb-4">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Calculadora de
              </span>
              <br />
              <span className="text-white">Rentabilidade</span>
            </h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto leading-relaxed">
              Analise o potencial de retorno do seu investimento imobiliário com precisão
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative z-10 pb-12">
          <Calculator />
        </main>

        {/* Footer */}
        <footer className="relative z-10 py-8 text-center text-blue-300">
          <p>© 2025 Calculadora de Rentabilidade. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;