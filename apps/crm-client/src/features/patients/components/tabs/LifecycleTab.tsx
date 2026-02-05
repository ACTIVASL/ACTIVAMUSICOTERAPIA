import React, { useMemo } from 'react';
import { Patient, Session } from '../../../../lib/types';
import {
  AlertTriangle,
  Calendar,
  Clock,
  HeartPulse,
  History,
  PauseCircle,
  PlayCircle,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@monorepo/ui-system';
import { addWeeks, format } from 'date-fns';
import { es } from 'date-fns/locale';

interface LifecycleTabProps {
  patient: Patient;
  activeSessions: Session[];
  onUpdate: (updated: Patient) => void;
}

export const LifecycleTab: React.FC<LifecycleTabProps> = ({
  patient,
  activeSessions,
  onUpdate,
}) => {
  // --- 1. HEALTH SCORE CALCULATION ---
  const healthScore = useMemo(() => {
    let score = 100;
    const deductions: { reason: string; points: number }[] = [];

    // A. Attendance (Last 10 sessions)
    const recentSessions = activeSessions.slice(0, 10);
    const absences = recentSessions.filter((s) => s.isAbsent).length;
    if (absences > 0) {
      const pen = absences * 5;
      score -= pen;
      deductions.push({ reason: 'Absentismo Reciente', points: pen });
    }

    // B. Financial Health
    const unpaid = activeSessions.filter((s) => !s.paid && !s.isAbsent).length;
    if (unpaid > 3) {
      const pen = 15;
      score -= pen;
      deductions.push({ reason: 'Pagos Pendientes (>3)', points: pen });
    }

    // C. Clinical Freshness (Eval < 6 months)
    const lastEvalDate = patient.cognitiveScores?.lastEvalDate; // Assume this field exists or we check generic date
    if (!lastEvalDate) {
      score -= 10;
      deductions.push({ reason: 'Sin Evaluación Reciente', points: 10 });
    }

    return { value: Math.max(0, score), deductions };
  }, [activeSessions, patient.cognitiveScores]);

  // --- 2. CYCLE ANALYTICS ---
  const cycleMetrics = useMemo(() => {
    const CYCLE_LENGTH = 20;
    const validSessionsCount = activeSessions.filter((s) => !s.isAbsent).length;
    const currentCycle = Math.floor(validSessionsCount / CYCLE_LENGTH) + 1;
    const progressInCycle = validSessionsCount % CYCLE_LENGTH;
    const progressPercent = (progressInCycle / CYCLE_LENGTH) * 100;
    const sessionsRemaining = CYCLE_LENGTH - progressInCycle;

    // Prediction
    // Avg frequency: Let's assume 1 week for now or calculate diff between last 5 sessions
    // Quick math: 1 week per session remaining
    const now = new Date();
    const estimatedEndDate = addWeeks(now, sessionsRemaining);

    return {
      currentCycle,
      progressInCycle,
      progressPercent,
      sessionsRemaining,
      estimatedEndDate,
      validSessionsCount,
    };
  }, [activeSessions]);

  // --- 3. LIFECYCLE STATE ---
  const isPaused = patient.status === 'paused'; // Need to support this status or simulated

  const handleTogglePause = () => {
    const newStatus = isPaused ? 'active' : 'paused';
    onUpdate({ ...patient, status: newStatus });
  };

  const handleDischarge = () => {
    if (
      confirm('¿Confirmar Alta Terapéutica?\nEsto archivará al paciente y cerrará el ciclo actual.')
    ) {
      onUpdate({ ...patient, status: 'archived', dischargeDate: new Date().toISOString() });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* --- TOP: HEALTH SCORE --- */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <HeartPulse size={120} />
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
          {/* Score Ring */}
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#f1f5f9"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke={
                  healthScore.value > 80
                    ? '#10b981'
                    : healthScore.value > 50
                      ? '#f59e0b'
                      : '#ef4444'
                }
                strokeWidth="3"
                strokeDasharray={`${healthScore.value}, 100`}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-black text-slate-800">{healthScore.value}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Salud</span>
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-bold text-slate-800 mb-2">Estado del Expediente</h2>
            <p className="text-slate-500 mb-4 max-w-lg">
              El Health Score indica la viabilidad clínica y administrativa. Mantén este índice alto
              asegurando asistencia regular y pagos al día.
            </p>
            <div className="flex gap-2 flex-wrap">
              {healthScore.deductions.map((d, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-lg border border-red-100"
                >
                  -{d.points} {d.reason}
                </span>
              ))}
              {healthScore.deductions.length === 0 && (
                <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-lg border border-emerald-100 flex items-center gap-1">
                  <ShieldCheck size={12} /> Expediente Impecable
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- MIDDLE: CYCLE ENGINE --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active Cycle Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <TrendingUp className="text-indigo-600" size={20} />
                  Ciclo Clínico #{cycleMetrics.currentCycle}
                </h3>
                <p className="text-sm text-slate-400 font-medium">Bloque de Objetivos Actual</p>
              </div>
              <div className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-black">
                {cycleMetrics.validSessionsCount} SESIONES TOTALES
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-2 flex justify-between text-xs font-bold text-slate-500">
              <span>Progreso del Ciclo</span>
              <span>{cycleMetrics.progressInCycle} / 20</span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden mb-6">
              <div
                className="h-full bg-indigo-500 transition-all duration-700"
                style={{ width: `${cycleMetrics.progressPercent}%` }}
              />
            </div>

            <div className="flex items-center gap-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
              <Clock size={16} className="text-indigo-400" />
              <span>
                Fin de ciclo estimado:{' '}
                <strong>
                  {format(cycleMetrics.estimatedEndDate, "d 'de' MMMM", { locale: es })}
                </strong>
              </span>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <Button
              variant="secondary"
              className="flex-1"
              icon={isPaused ? PlayCircle : PauseCircle}
              onClick={handleTogglePause}
            >
              {isPaused ? 'Reanudar' : 'Pausar Tratamiento'}
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              icon={History}
              onClick={() => alert('Próximamente: Histórico de Ciclos')}
            >
              Ver Historial
            </Button>
          </div>
        </div>

        {/* Admission & Discharge Card */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Calendar className="text-slate-500" size={20} />
            Línea de Tiempo
          </h3>

          <div className="relative pl-4 border-l-2 border-slate-200 space-y-8 ml-2">
            {/* Start */}
            <div className="relative">
              <div className="absolute -left-[21px] top-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" />
              <h4 className="text-sm font-bold text-slate-800">Inicio del Tratamiento</h4>
              <p className="text-xs text-slate-500 mt-1">
                {patient.createdAt
                  ? format(new Date(patient.createdAt), 'PPP', { locale: es })
                  : 'Fecha desconocida'}
              </p>
            </div>

            {/* Current Status */}
            <div className="relative">
              <div
                className={`absolute -left-[21px] top-1 w-4 h-4 rounded-full border-2 border-white animate-pulse ${isPaused ? 'bg-amber-400' : 'bg-indigo-500'}`}
              />
              <h4 className="text-sm font-bold text-slate-800">
                {isPaused ? 'Tratamiento Pausado' : 'En Curso (Activo)'}
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Gestionando Ciclo {cycleMetrics.currentCycle}
              </p>
            </div>

            {/* Future/End */}
            <div className="relative">
              <div className="absolute -left-[21px] top-1 w-4 h-4 rounded-full bg-slate-300 border-2 border-white" />
              <h4 className="text-sm font-bold text-slate-400">Alta Terapéutica</h4>
              <p className="text-xs text-slate-400 mt-1">Futuro</p>
            </div>
          </div>

          <div className="mt-auto pt-8">
            <Button
              variant="danger"
              className="w-full justify-center shadow-lg shadow-red-100 hover:shadow-red-200"
              icon={AlertTriangle}
              onClick={handleDischarge}
            >
              Tramitar Alta Definitiva
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
