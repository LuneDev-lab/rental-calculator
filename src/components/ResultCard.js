// src/components/ResultCard.js
import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const ResultCard = ({ title, value, description, color, trend = 'neutral' }) => {
  
  // ===================== A FUNÇÃO ESTÁ DE VOLTA AQUI =====================
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-400" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };
  // ======================================================================

  return (
    <div className="group relative">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
        {/* Background Gradient Effect */}
        <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-blue-200 uppercase tracking-wide">
              {title}
            </h4>
            {/* A chamada da função está aqui, por isso ela precisa existir */}
            {getTrendIcon()} 
          </div>
          
          <div className="mb-2">
            <p className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-blue-200 transition-all duration-300">
              {value}
            </p>
          </div>
          
          <p className="text-xs text-blue-300/80">
            {description}
          </p>
        </div>

        {/* Decorative Border */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl`}></div>
      </div>
    </div>
  );
};

export default ResultCard;