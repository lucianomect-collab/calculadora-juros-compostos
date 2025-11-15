import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PeriodData } from '../types';

interface ResultChartProps {
  data: PeriodData[];
}

const formatCurrencyForAxis = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
    return value.toString();
};

const ResultChart: React.FC<ResultChartProps> = ({ data }) => {
  // A custom dot renderer to show dots only at significant points
  const renderCustomDot = (props: any) => {
    const { cx, cy, stroke, payload, index } = props;
    const isFirst = index === 0;
    const isLast = index === data.length - 1;
    const isYearMarker = payload.label.toString().startsWith('Ano');

    if (isFirst || isLast || isYearMarker) {
        return <circle cx={cx} cy={cy} r={4} stroke={stroke} fill="#fff" strokeWidth={2} />;
    }
    return null;
  };

  return (
    <div className="w-full h-80 md:h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="label" tick={{ fill: '#4b5563' }} interval="preserveStartEnd" />
          <YAxis tickFormatter={formatCurrencyForAxis} tick={{ fill: '#4b5563' }} />
          <Tooltip
            formatter={(value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}
            labelStyle={{ color: '#1f2937' }}
            itemStyle={{ fontWeight: 'bold' }}
          />
          <Legend />
          <Line type="monotone" dataKey="totalInvested" name="Valor Investido" stroke="#374151" strokeWidth={2} dot={renderCustomDot} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="totalAccumulated" name="Total Acumulado" stroke="#2C3FA5" strokeWidth={2} dot={renderCustomDot} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResultChart;