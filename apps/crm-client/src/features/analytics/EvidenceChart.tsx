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
import { Session } from '../../lib/types';

interface EvidenceChartProps {
  sessions: Session[];
}

export const EvidenceChart: React.FC<EvidenceChartProps> = ({ sessions }) => {
  // 1. Transform sessions into Chart Data
  // Filter only sessions with scores, sort by date ascending
  const normalizedData = sessions
    .filter((s) => s.scores && s.scores.length > 0 && !s.isAbsent)
    .map((s) => {
      // Robust Date Normalization
      let dateObj: Date;
      try {
        if (s.date.includes('/')) {
          // Legacy DD/MM/YYYY
          const parts = s.date.split('/');
          if (parts.length === 3) {
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1; // 0-indexed
            const year = parseInt(parts[2], 10);
            dateObj = new Date(year, month, day);
          } else {
            dateObj = new Date(s.date);
          }
        } else {
          // ISO YYYY-MM-DD or other
          dateObj = new Date(s.date);
        }

        // Fallback for invalid dates
        if (isNaN(dateObj.getTime())) {
          dateObj = new Date(); // Emergency fallback
        }
      } catch {
        dateObj = new Date();
      }

      return { ...s, dateObj, timestamp: dateObj.getTime() };
    })
    .sort((a, b) => a.timestamp - b.timestamp);

  const data = normalizedData.map((s) => {
    // Calculate Average Score
    const average = s.scores!.reduce((a, b) => a + b, 0) / s.scores!.length;

    return {
      date: s.dateObj.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' }), // '30/01'
      fullDate: s.dateObj.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      score: Number(average.toFixed(1)), // 0.0 - 3.0
      rawDate: s.dateObj,
    };
  });

  // 2. Handle Empty State Gracefully
  if (data.length === 0) {
    return (
      <div className="h-64 flex flex-col items-center justify-center bg-slate-50 border border-slate-200 border-dashed rounded-2xl p-6 text-center">
        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
          <span className="text-2xl">📊</span>
        </div>
        <p className="text-slate-500 font-medium">Aún no hay datos de evolución.</p>
        <p className="text-xs text-slate-400 mt-1">
          Registre sesiones con valoración para ver la curva.
        </p>
      </div>
    );
  }

  // 3. Handle Single Data Point (Fake a second point for nice rendering or just show start)
  // Actually, AreaChart works with 1 point but looks weird. Let's ensure range.

  interface CustomTooltipProps {
    active?: boolean;
    payload?: { value: number; payload: { fullDate: string } }[];
    label?: string;
  }

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-pink-100 ring-1 ring-pink-50">
          <p className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">{label}</p>
          <p className="text-lg font-black text-slate-800 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-pink-500"></span>
            Índice: {payload[0].value}
          </p>
          <p className="text-[10px] text-slate-500 mt-2 italic capitalize">
            {payload[0].payload.fullDate}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full min-h-[300px] font-sans relative group">
      {/* Premium Background Glow */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-pink-50/50 to-transparent pointer-events-none" />

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EC4899" stopOpacity={0.4} /> {/* Pink 500 */}
              <stop offset="95%" stopColor="#EC4899" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="colorStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#8B5CF6" /> {/* Violent gradient stroke */}
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
            padding={{ left: 20, right: 20 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            stroke="#64748B"
            fontSize={11}
            domain={[0, 3]}
            ticks={[0, 1, 2, 3]}
            fontWeight={600}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: '#EC4899', strokeWidth: 2, strokeDasharray: '4 4' }}
          />
          <ReferenceLine
            y={1.5}
            stroke="#CBD5E1"
            strokeDasharray="3 3"
            label={{ value: 'Objetivo', position: 'insideRight', fill: '#94A3B8', fontSize: 10 }}
          />
          <Area
            type="monotone"
            dataKey="score"
            stroke="url(#colorStroke)" // Gradient Stroke
            strokeWidth={4}
            fillOpacity={1}
            fill="url(#colorScore)"
            animationDuration={2000}
            animationEasing="ease-out"
            activeDot={{ r: 8, fill: '#EC4899', stroke: '#fff', strokeWidth: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
