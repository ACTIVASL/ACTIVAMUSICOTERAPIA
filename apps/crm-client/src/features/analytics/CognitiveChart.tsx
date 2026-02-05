import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { EvaluationRecord } from '../../lib/types';

interface CognitiveChartProps {
  history: EvaluationRecord[];
}

export const CognitiveChart: React.FC<CognitiveChartProps> = ({ history }) => {
  // 1. Transform history into Chart Data
  const data = history
    .map((h) => {
      // Parse "30/30" string to number
      const parseScore = (str?: string) => {
        if (!str) return 0;
        // Handle "25/30" or just "25"
        const val = parseInt(str.split('/')[0], 10);
        return isNaN(val) ? 0 : val;
      };

      const moca = parseScore(h.results?.moca);
      const mmse = parseScore(h.results?.mmse);

      // Date parsing
      let dateObj = new Date();
      if (h.date.includes('/')) {
        const [d, m, y] = h.date.split('/');
        dateObj = new Date(Number(y), Number(m) - 1, Number(d));
      } else {
        dateObj = new Date(h.date);
      }

      return {
        id: h.id,
        date: h.date, // "30/01/2025"
        timestamp: dateObj.getTime(),
        moca,
        mmse,
        fullDate: dateObj.toLocaleDateString('es-ES', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      };
    })
    .sort((a, b) => a.timestamp - b.timestamp);

  if (data.length === 0) {
    return (
      <div className="h-64 flex flex-col items-center justify-center bg-slate-50 border border-slate-200 border-dashed rounded-2xl p-6 text-center">
        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
          <span className="text-2xl">🧠</span>
        </div>
        <p className="text-slate-500 font-medium">Sin historial cognitivo.</p>
        <p className="text-xs text-slate-400 mt-1">Archive evaluaciones para ver la curva.</p>
      </div>
    );
  }

  interface CustomTooltipProps {
    active?: boolean;
    payload?: { name: string; value: number; payload: { date: string } }[];
    label?: string;
  }

  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-xl border border-pink-100">
          <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
            {payload[0].payload.date}
          </p>
          {payload.map((entry) => (
            <div key={entry.name} className="flex items-center gap-2 mb-1">
              <span
                className={`w-2 h-2 rounded-full ${entry.name === 'MOCA' ? 'bg-pink-500' : 'bg-indigo-500'}`}
              />
              <span className="font-bold text-slate-700">{entry.name}:</span>
              <span className="font-black text-lg">{entry.value}</span>
              <span className="text-xs text-slate-400">/30</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full min-h-[300px] font-sans relative">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorMoca" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EC4899" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#EC4899" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="colorMmse" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            stroke="#64748B"
            fontSize={11}
            tickMargin={15}
            fontWeight={600}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            stroke="#64748B"
            fontSize={11}
            domain={[0, 30]}
            ticks={[0, 10, 20, 25, 30]} // Relevant clinical thresholds
            fontWeight={600}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '4 4' }}
          />

          {/* Clinical Cutoffs */}
          <ReferenceLine
            y={26}
            stroke="#10b981"
            strokeDasharray="3 3"
            label={{ value: 'Normal', position: 'insideRight', fill: '#10b981', fontSize: 10 }}
          />

          <Area
            type="monotone"
            dataKey="moca"
            name="MOCA"
            stroke="#EC4899"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorMoca)"
            activeDot={{ r: 6, fill: '#EC4899', stroke: '#fff', strokeWidth: 2 }}
          />
          <Area
            type="monotone"
            dataKey="mmse"
            name="MMSE"
            stroke="#6366f1"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorMmse)"
            activeDot={{ r: 6, fill: '#6366f1', stroke: '#fff', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
