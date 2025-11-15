
import React from 'react';
import { PeriodData } from '../types';

interface ResultTableProps {
  data: PeriodData[];
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
}

const ResultTable: React.FC<ResultTableProps> = ({ data }) => {
  return (
    <div className="w-full max-h-96 overflow-y-auto border border-gray-200 rounded-lg shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100 sticky top-0">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mês</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Juros do Mês</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Investido</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total em Juros</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Acumulado</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.slice(1).map((row) => (
            <tr key={row.month} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.month}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatCurrency(row.interest)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatCurrency(row.totalInvested)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatCurrency(row.totalInterest)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">{formatCurrency(row.totalAccumulated)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultTable;
