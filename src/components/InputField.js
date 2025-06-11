// src/components/InputField.js
import React, { useCallback } from 'react';

const InputField = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  icon, 
  required = false, 
  helperText 
}) => {

  const formatToCurrencyDisplay = useCallback((centsString) => {
    if (!centsString) return '';
    const numberValue = parseInt(centsString, 10) / 100;
    if (isNaN(numberValue)) return '';
    return numberValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }, []);

  const formattedPlaceholder = React.useMemo(() => {
    return formatToCurrencyDisplay(placeholder);
  }, [placeholder, formatToCurrencyDisplay]);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    const digitsOnly = inputValue.replace(/\D/g, '');
    onChange(digitsOnly); 
  };

  return (
    <div className="relative">
      <label className="block text-sm font-semibold text-white mb-2">
        {label}
        {required && <span className="text-pink-400 ml-1">*</span>}
      </label>
      
      {/* Container que precisa ser 'relative' para o ícone funcionar */}
      <div className="relative">
      
        {/* ======================= CÓDIGO EDITADO E FINAL ======================= */}

        {/* 1. O CAMPO DE INPUT com padding à direita */}
        <input
          type="text"
          value={formatToCurrencyDisplay(value)} 
          onChange={handleChange}
          placeholder={formattedPlaceholder}
          // Usando estilo inline para garantir o padding
          style={{ paddingRight: '3rem' }} // Equivalente a pr-12
          className="w-full pl-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
        />
        
        {/* 2. O ÍCONE com posicionamento via estilo inline */}
        <div 
          // Usando estilo inline para garantir o posicionamento
          style={{ 
            position: 'absolute', 
            right: '1rem', // Equivalente a 'right-4'
            top: '50%',
            transform: 'translateY(-50%)' 
          }}
          className="text-blue-300" // Mantém a cor do ícone
        >
          {icon}
        </div>

        {/* ======================= FIM DO CÓDIGO EDITADO ======================= */}
      </div>
      
      {helperText && (
        <p className="mt-2 text-sm text-blue-300/80">{helperText}</p>
      )}
    </div>
  );
};

export default InputField;