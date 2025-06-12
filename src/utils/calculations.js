// src/utils/calculations.js

/**
 * Remove formatação de moeda e converte para número
 */
// Substitua a sua função parseMoneyValue por esta
// src/utils/calculations.js

/**
 * Converte uma string de centavos para um número de valor real
 */
const parseMoneyValue = (value) => {
  if (!value) {
    return 0;
  }
  const numberValue = parseInt(String(value), 10) / 100;
  return isNaN(numberValue) ? 0 : numberValue;
};
// ==========================================================
// O RESTANTE DO SEU ARQUIVO (calculateRentability, etc.)
// PODE PERMANECER EXATAMENTE IGUAL
// ==========================================================

export const calculateRentability = (formData) => {
  // ... seu código aqui ...
};

// ... etc ...

/**
 * Calcula todos os indicadores de rentabilidade
 */
export const calculateRentability = (formData) => {
  const propertyValue = parseMoneyValue(formData.propertyValue);
  const monthlyRent = parseMoneyValue(formData.monthlyRent);
  const monthlyCosts = parseMoneyValue(formData.monthlyCosts);
  const downPayment = parseMoneyValue(formData.downPayment);

  // Validação básica
  if (propertyValue <= 0 || monthlyRent <= 0) {
    throw new Error('Valores inválidos para cálculo');
  }

  // Lucro líquido mensal
  const netMonthlyProfit = monthlyRent - monthlyCosts;

  // Rentabilidade mensal sobre o valor do imóvel
  const monthlyRentability = (netMonthlyProfit / propertyValue) * 100;

  // Rentabilidade anual
  const annualRentability = monthlyRentability * 12;

  // ROI (Return on Investment) - considerando o valor de entrada se informado
  const investmentBase = downPayment > 0 ? downPayment : propertyValue;
  const roi = ((netMonthlyProfit * 12) / investmentBase) * 100;

  // Payback - tempo para recuperar o investimento
  const paybackMonths = investmentBase / netMonthlyProfit;
  const paybackYears = paybackMonths / 12;

  // Projeções anuais
  const annualNetProfit = netMonthlyProfit * 12;
  const annualGrossProfit = monthlyRent * 12;
  const annualCosts = monthlyCosts * 12;

  return {
    // Valores principais
    propertyValue,
    monthlyRent,
    monthlyCosts,
    downPayment: downPayment || propertyValue,
    
    // Lucros
    netMonthlyProfit,
    annualNetProfit,
    annualGrossProfit,
    annualCosts,
    
    // Indicadores de rentabilidade
    monthlyRentability,
    annualRentability,
    roi,
    
    // Tempo de retorno
    paybackMonths,
    paybackYears,
    
    // Análises adicionais
    profitMargin: (netMonthlyProfit / monthlyRent) * 100,
    grossYield: (monthlyRent * 12 / propertyValue) * 100,
    netYield: (netMonthlyProfit * 12 / propertyValue) * 100,
    
    // Métricas de avaliação
    isGoodInvestment: monthlyRentability >= 0.5 && paybackYears <= 15,
    riskLevel: getRiskLevel(monthlyRentability, paybackYears),
    recommendation: getRecommendation(monthlyRentability, paybackYears, roi)
  };
};

/**
 * Determina o nível de risco do investimento
 */
const getRiskLevel = (monthlyRent, payback) => {
  if (monthlyRent >= 0.8 && payback <= 10) return 'low';
  if (monthlyRent >= 0.5 && payback <= 15) return 'medium';
  return 'high';
};

/**
 * Gera recomendação baseada nos indicadores
 */
const getRecommendation = (monthlyRent, payback, roi) => {
  if (monthlyRent >= 0.8 && payback <= 12 && roi >= 8) {
    return 'Excelente investimento! Rentabilidade alta com retorno rápido.';
  }
  
  if (monthlyRent >= 0.5 && payback <= 15 && roi >= 6) {
    return 'Bom investimento. Considere também a valorização do imóvel.';
  }
  
  if (monthlyRent >= 0.3 && payback <= 20) {
    return 'Investimento moderado. Analise outros fatores como localização.';
  }
  
  return 'Rentabilidade baixa. Considere renegociar valores ou buscar outras opções.';
};

/**
 * Calcula projeção de lucros futuros
 */
export const calculateProjection = (results, years = 5) => {
  const projection = [];
  
  for (let year = 1; year <= years; year++) {
    const cumulativeProfit = results.annualNetProfit * year;
    const roi = (cumulativeProfit / results.downPayment) * 100;
    
    projection.push({
      year,
      cumulativeProfit,
      roi,
      breakEven: year >= results.paybackYears
    });
  }
  
  return projection;
};

/**
 * Compara diferentes cenários de investimento
 */
export const compareScenarios = (scenarios) => {
  return scenarios.map(scenario => ({
    ...scenario,
    score: calculateInvestmentScore(scenario)
  })).sort((a, b) => b.score - a.score);
};

/**
 * Calcula score do investimento (0-100)
 */
const calculateInvestmentScore = (results) => {
  let score = 0;
  
  // Rentabilidade mensal (40% do score)
  if (results.monthlyRentability >= 1.0) score += 40;
  else if (results.monthlyRentability >= 0.7) score += 30;
  else if (results.monthlyRentability >= 0.5) score += 20;
  else if (results.monthlyRentability >= 0.3) score += 10;
  
  // Payback (30% do score)
  if (results.paybackYears <= 8) score += 30;
  else if (results.paybackYears <= 12) score += 22;
  else if (results.paybackYears <= 15) score += 15;
  else if (results.paybackYears <= 20) score += 8;
  
  // ROI (30% do score)
  if (results.roi >= 12) score += 30;
  else if (results.roi >= 8) score += 22;
  else if (results.roi >= 6) score += 15;
  else if (results.roi >= 4) score += 8;
  
  return Math.min(score, 100);
};