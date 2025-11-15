import React, { useState, useCallback } from 'react';
import { PeriodUnit, RatePeriod, type CalculationResult, type PeriodData } from './types';
import ResultChart from './components/ResultChart';
import ResultTable from './components/ResultTable';
import InfoSection from './components/InfoSection';

const calculateCompoundInterest = (
    initialValue: number,
    monthlyValue: number,
    interestRate: number,
    ratePeriod: RatePeriod,
    period: number,
    periodUnit: PeriodUnit
): CalculationResult => {
    const monthlyRate = ratePeriod === RatePeriod.Annual ? Math.pow(1 + interestRate / 100, 1 / 12) - 1 : interestRate / 100;
    const totalMonths = periodUnit === PeriodUnit.Years ? period * 12 : period;

    let accumulated = initialValue;
    let totalInvested = initialValue;
    let totalInterest = 0;
    const data: PeriodData[] = [{
        month: 0,
        label: 'Início',
        interest: 0,
        totalInvested: initialValue,
        totalInterest: 0,
        totalAccumulated: initialValue
    }];

    for (let m = 1; m <= totalMonths; m++) {
        const interestForMonth = accumulated * monthlyRate;
        accumulated += interestForMonth + monthlyValue;
        totalInvested += monthlyValue;
        totalInterest += interestForMonth;
        
        const isYearMarker = totalMonths > 24 && m % 12 === 0;
        data.push({
            month: m,
            label: isYearMarker ? `Ano ${m/12}` : `${m}`,
            interest: interestForMonth,
            totalInvested: totalInvested,
            totalInterest: totalInterest,
            totalAccumulated: accumulated
        });
    }

    return {
        finalAmount: accumulated,
        totalInvested: totalInvested,
        totalInterest: totalInterest,
        data: data
    };
};

const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
};

const formatCentsToCurrency = (cents: string): string => {
    if (cents === '') return '';
    const numericValue = parseInt(cents, 10);
    if (isNaN(numericValue)) return '0,00';
    
    const valueInReais = numericValue / 100;

    return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(valueInReais);
};


const ResultCard: React.FC<{ title: string; value: string; highlight?: boolean }> = ({ title, value, highlight = false }) => (
    <div className={`p-4 rounded-lg flex flex-col items-center justify-center text-center ${highlight ? 'bg-brand-blue-600 text-white' : 'bg-white shadow-sm'}`}>
        <span className={`text-sm ${highlight ? 'text-brand-blue-100' : 'text-gray-500'}`}>{title}</span>
        <span className={`text-2xl font-bold ${highlight ? 'text-white' : 'text-gray-800'}`}>{value}</span>
    </div>
);

const App: React.FC = () => {
    const [initialValue, setInitialValue] = useState('100000');
    const [monthlyValue, setMonthlyValue] = useState('100000');
    const [interestRate, setInterestRate] = useState('8');
    const [period, setPeriod] = useState('10');
    const [ratePeriod, setRatePeriod] = useState<RatePeriod>(RatePeriod.Annual);
    const [periodUnit, setPeriodUnit] = useState<PeriodUnit>(PeriodUnit.Years);
    const [result, setResult] = useState<CalculationResult | null>(null);
    
    const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
        const rawValue = e.target.value.replace(/\D/g, '');
        setter(rawValue);
    };

    const handleCalculate = useCallback(() => {
        const calculatedResult = calculateCompoundInterest(
            (parseFloat(initialValue) || 0) / 100,
            (parseFloat(monthlyValue) || 0) / 100,
            parseFloat(interestRate) || 0,
            ratePeriod,
            parseInt(period) || 0,
            periodUnit
        );
        setResult(calculatedResult);
    }, [initialValue, monthlyValue, interestRate, ratePeriod, period, periodUnit]);
    
    const handleClear = useCallback(() => {
        setInitialValue('0');
        setMonthlyValue('0');
        setInterestRate('0');
        setPeriod('0');
        setRatePeriod(RatePeriod.Annual);
        setPeriodUnit(PeriodUnit.Years);
        setResult(null);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            <main className="max-w-4xl mx-auto">
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-brand-blue-600">Simulador de Juros Compostos</h1>
                    <p className="text-gray-600 mt-2">Planeje seu futuro financeiro e veja o poder dos juros a seu favor.</p>
                </header>

                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Initial Value */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Valor inicial</label>
                            <div className="flex items-center rounded-md border border-gray-300 focus-within:ring-2 focus-within:ring-brand-blue-500 focus-within:border-brand-blue-500">
                                <span className="bg-gray-100 px-3 py-2 text-gray-500 border-r border-gray-300">R$</span>
                                <input type="text" value={formatCentsToCurrency(initialValue)} onChange={(e) => handleCurrencyChange(e, setInitialValue)} onFocus={() => { if (initialValue === '0') setInitialValue(''); }} onBlur={() => { if (initialValue === '') setInitialValue('0'); }} className="w-full p-2 border-none rounded-r-md outline-none bg-white" placeholder="0,00" />
                            </div>
                        </div>
                        {/* Monthly Value */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Valor mensal</label>
                            <div className="flex items-center rounded-md border border-gray-300 focus-within:ring-2 focus-within:ring-brand-blue-500 focus-within:border-brand-blue-500">
                                <span className="bg-gray-100 px-3 py-2 text-gray-500 border-r border-gray-300">R$</span>
                                <input type="text" value={formatCentsToCurrency(monthlyValue)} onChange={(e) => handleCurrencyChange(e, setMonthlyValue)} onFocus={() => { if (monthlyValue === '0') setMonthlyValue(''); }} onBlur={() => { if (monthlyValue === '') setMonthlyValue('0'); }} className="w-full p-2 border-none rounded-r-md outline-none bg-white" placeholder="0,00" />
                            </div>
                        </div>
                        {/* Interest Rate */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Taxa de juros</label>
                            <div className="flex items-center rounded-md border border-gray-300 focus-within:ring-2 focus-within:ring-brand-blue-500 focus-within:border-brand-blue-500">
                                <span className="bg-gray-100 px-3 py-2 text-gray-500 border-r border-gray-300">%</span>
                                <input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} onFocus={(e) => { if (e.target.value === '0') setInterestRate(''); }} onBlur={(e) => { if (e.target.value === '') setInterestRate('0'); }} className="w-full p-2 border-none outline-none bg-white" placeholder="0" />
                                <select value={ratePeriod} onChange={(e) => setRatePeriod(e.target.value as RatePeriod)} className="bg-gray-100 p-2 border-l border-gray-300 rounded-r-md outline-none">
                                    <option value={RatePeriod.Annual}>anual</option>
                                    <option value={RatePeriod.Monthly}>mensal</option>
                                </select>
                            </div>
                        </div>
                        {/* Period */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Período</label>
                            <div className="flex items-center rounded-md border border-gray-300 focus-within:ring-2 focus-within:ring-brand-blue-500 focus-within:border-brand-blue-500">
                                <input type="number" value={period} onChange={(e) => setPeriod(e.target.value)} onFocus={(e) => { if (e.target.value === '0') setPeriod(''); }} onBlur={(e) => { if (e.target.value === '') setPeriod('0'); }} className="w-full p-2 border-none rounded-l-md outline-none bg-white" placeholder="0" />
                                <select value={periodUnit} onChange={(e) => setPeriodUnit(e.target.value as PeriodUnit)} className="bg-gray-100 p-2 border-l border-gray-300 rounded-r-md outline-none">
                                    <option value={PeriodUnit.Years}>ano(s)</option>
                                    <option value={PeriodUnit.Months}>mes(es)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                        <button onClick={handleCalculate} className="bg-brand-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-brand-blue-700 transition duration-300 shadow-md">
                            Calcular
                        </button>
                        <button onClick={handleClear} className="text-gray-600 hover:text-brand-blue-600 font-medium transition duration-300">
                            Limpar
                        </button>
                    </div>
                </div>

                {result && (
                    <div id="result-section" className="mt-8 space-y-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-brand-blue-600">Resultado da Simulação</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                           <ResultCard title="Valor total final" value={formatCurrency(result.finalAmount)} highlight />
                           <ResultCard title="Valor total investido" value={formatCurrency(result.totalInvested)} />
                           <ResultCard title="Total em juros" value={formatCurrency(result.totalInterest)} />
                        </div>
                        <div>
                           <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Gráfico de Evolução</h3>
                           <ResultChart data={result.data} />
                        </div>
                         <div>
                           <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Tabela de Projeção</h3>
                           <ResultTable data={result.data} />
                        </div>
                    </div>
                )}
                
                <InfoSection />
            </main>
        </div>
    );
};

export default App;