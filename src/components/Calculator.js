// src/components/Calculator.js
import React, { useState } from 'react';
import { Calculator as CalcIcon, DollarSign, TrendingUp, Clock, BarChart3 } from 'lucide-react';
import InputField from './InputField';
import ResultCard from './ResultCard';
import { calculateRentability } from '../utils/calculations';

const Calculator = () => {
  const [formData, setFormData] = useState({
    propertyValue: '',
    monthlyRent: '',
    monthlyCosts: '',
    downPayment: ''
  });

  const [results, setResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCalculate = () => {
    if (!formData.propertyValue || !formData.monthlyRent) {
      alert('Por favor, preencha pelo menos o valor do imóvel e o aluguel mensal.');
      return;
    }

    setIsCalculating(true);
    
    setTimeout(() => {
      const calculatedResults = calculateRentability(formData);
      setResults(calculatedResults);
      setIsCalculating(false);
    }, 800);
  };

  const handleReset = () => {
    setFormData({
      propertyValue: '',
      monthlyRent: '',
      monthlyCosts: '',
      downPayment: ''
    });
    setResults(null);
  };

  const isFormValid = formData.propertyValue && formData.monthlyRent;

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Input Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl">
              <CalcIcon className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Dados do Investimento</h2>
          </div>

          <div className="space-y-6">
            <InputField
              label="Valor do Imóvel"
              value={formData.propertyValue}
              onChange={(value) => handleInputChange('propertyValue', value)}
              placeholder="R$ 500.000"
              icon={<DollarSign className="w-5 h-5" />}
              required
            />

            <InputField
              label="Aluguel Mensal"
              value={formData.monthlyRent}
              onChange={(value) => handleInputChange('monthlyRent', value)}
              placeholder="250000" // Corrigido: R$ 2.500,00 -> 250000 centavos
              icon={<TrendingUp className="w-5 h-5" />}
              required
            />

             <InputField
              label="Custos Mensais"
              value={formData.monthlyCosts}
              onChange={(value) => handleInputChange('monthlyCosts', value)}
              placeholder="30000" // Corrigido: R$ 300,00 -> 30000 centavos
              icon={<BarChart3 className="w-5 h-5" />}
              helperText="Condomínio, IPTU, taxa de administração, etc."
            />


             <InputField
              label="Valor de Entrada"
              value={formData.downPayment}
              onChange={(value) => handleInputChange('downPayment', value)}
              placeholder="10000000" // Corrigido: R$ 100.000,00 -> 10000000 centavos
              icon={<Clock className="w-5 h-5" />}
              helperText="Capital inicial investido (se financiado)"
            />
          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={handleCalculate}
              disabled={!isFormValid || isCalculating}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold py-4 px-6 rounded-2xl hover:from-cyan-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isCalculating ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Calculando...
                </div>
              ) : (
                'Calcular Rentabilidade'
              )}
            </button>

            <button
              onClick={handleReset}
              className="px-6 py-4 border-2 border-white/30 text-white font-semibold rounded-2xl hover:bg-white/10 transition-all duration-300"
            >
              Limpar
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {results ? (
            <>
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  Resultados da Análise
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <ResultCard
                    title="Rent. Mensal"
                    value={`${results.monthlyRentability.toFixed(2)}%`}
                    description="Retorno mensal"
                    color="from-green-500 to-emerald-500"
                    trend={results.monthlyRentability > 0.5 ? 'up' : 'neutral'}
                  />

                  <ResultCard
                    title="Rent. Anual"
                    value={`${results.annualRentability.toFixed(2)}%`}
                    description="Retorno anual"
                    color="from-blue-500 to-cyan-500"
                    trend={results.annualRentability > 6 ? 'up' : 'neutral'}
                  />

                  <ResultCard
                    title="ROI"
                    value={`${results.roi.toFixed(2)}%`}
                    description="Return on Investment"
                    color="from-purple-500 to-pink-500"
                    trend={results.roi > 10 ? 'up' : 'neutral'}
                  />

                  <ResultCard
                    title="Payback"
                    value={`${results.paybackYears.toFixed(1)} anos`}
                    description="Retorno do investimento"
                    color="from-orange-500 to-red-500"
                    trend={results.paybackYears < 15 ? 'up' : 'neutral'}
                  />
                </div>

                <div className="mt-6 p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-500/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-200 text-sm font-medium">Lucro Líquido Mensal</p>
                      <p className="text-2xl font-bold text-white">
                        {results.netMonthlyProfit.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        })}
                      </p>
                    </div>
                    <div className="p-3 bg-green-500/30 rounded-xl">
                      <DollarSign className="w-6 h-6 text-green-300" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Analysis Summary */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-4">💡 Análise do Investimento</h3>
                <div className="space-y-3 text-blue-100">
                  {results.monthlyRentability >= 0.8 ? (
                    <p className="text-green-300">✅ Excelente rentabilidade mensal! Este investimento tem potencial muito bom.</p>
                  ) : results.monthlyRentability >= 0.5 ? (
                    <p className="text-yellow-300">⚠️ Rentabilidade moderada. Considere outros fatores como valorização.</p>
                  ) : (
                    <p className="text-red-300">❌ Rentabilidade baixa. Revise os valores ou considere outras opções.</p>
                  )}
                  
                  {results.paybackYears <= 12 ? (
                    <p className="text-green-300">✅ Tempo de retorno atrativo (menos de 12 anos).</p>
                  ) : (
                    <p className="text-yellow-300">⚠️ Tempo de retorno longo. Avalie a valorização esperada do imóvel.</p>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-full flex items-center justify-center">
                <CalcIcon className="w-10 h-10 text-cyan-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Pronto para calcular?</h3>
              <p className="text-blue-200">
                Preencha os dados do investimento para ver a análise completa de rentabilidade.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculator;