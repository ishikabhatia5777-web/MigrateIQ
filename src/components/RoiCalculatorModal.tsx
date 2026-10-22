import React, { useState } from 'react';
import { 
  X, 
  Calculator, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface RoiCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoiCalculatorModal: React.FC<RoiCalculatorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [reportCount, setReportCount] = useState<number>(45);
  const [calcsPerReport, setCalcsPerReport] = useState<number>(30);
  const [hourlyRate, setHourlyRate] = useState<number>(150);

  if (!isOpen) return null;

  // Estimation formulas:
  // Manual migration: avg 12 days (96 hours) per report/app
  const manualHoursPerReport = 96;
  const totalManualHours = reportCount * manualHoursPerReport;
  const totalManualCost = totalManualHours * hourlyRate;

  // VectorLab Agentic: ~2.5 hours review per report (97.4% reduction)
  const agenticHoursPerReport = 2.5;
  const totalAgenticHours = reportCount * agenticHoursPerReport;
  const totalAgenticCost = totalAgenticHours * hourlyRate + reportCount * 80; // plus platform cost

  const netHoursSaved = totalManualHours - totalAgenticHours;
  const netSavingsUsd = totalManualCost - totalAgenticCost;
  const savingsPercent = Math.round((netSavingsUsd / totalManualCost) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-panel border border-amber-500/30 p-6 sm:p-8 bg-slate-950/95 shadow-2xl shadow-amber-500/10">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-2.5 mb-2">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display text-white">
              Estate Migration ROI & Cost Acceleration Calculator
            </h2>
            <p className="text-xs text-slate-400">
              Estimate cost and time savings across your Qlik & Tableau estate
            </p>
          </div>
        </div>

        {/* Interactive Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 my-6 p-4 rounded-xl bg-slate-900/60 border border-white/5">
          
          {/* Reports Count */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-300 font-medium">Estate Reports</span>
              <span className="font-mono text-cyan-400 font-bold">{reportCount}</span>
            </div>
            <input
              type="range"
              min="5"
              max="250"
              step="5"
              value={reportCount}
              onChange={(e) => setReportCount(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <span className="text-[10px] text-slate-500">Total workbooks or Qlik apps</span>
          </div>

          {/* Calcs per report */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-300 font-medium">Avg Calcs / Report</span>
              <span className="font-mono text-violet-400 font-bold">{calcsPerReport}</span>
            </div>
            <input
              type="range"
              min="10"
              max="80"
              step="5"
              value={calcsPerReport}
              onChange={(e) => setCalcsPerReport(Number(e.target.value))}
              className="w-full accent-violet-400 cursor-pointer"
            />
            <span className="text-[10px] text-slate-500">Calculated fields / Set Analysis</span>
          </div>

          {/* Hourly Rate */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-300 font-medium">Engineering Rate</span>
              <span className="font-mono text-emerald-400 font-bold">${hourlyRate}/hr</span>
            </div>
            <input
              type="range"
              min="80"
              max="250"
              step="10"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
            <span className="text-[10px] text-slate-500">BI developer blended hourly cost</span>
          </div>

        </div>

        {/* Results Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="glass-card p-4 border border-emerald-500/30 bg-emerald-950/20 text-center">
            <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
              Net Cost Savings
            </span>
            <div className="text-3xl font-extrabold font-display text-white">
              ${netSavingsUsd.toLocaleString()}
            </div>
            <span className="text-xs text-emerald-400 font-bold mt-1 inline-block">
              {savingsPercent}% Cost Reduction
            </span>
          </div>

          <div className="glass-card p-4 border border-cyan-500/30 bg-cyan-950/20 text-center">
            <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider block mb-1">
              Engineering Hours Saved
            </span>
            <div className="text-3xl font-extrabold font-display text-white">
              {netHoursSaved.toLocaleString()} hrs
            </div>
            <span className="text-xs text-cyan-300 mt-1 inline-block">
              {(netHoursSaved / 8).toFixed(0)} engineering days recovered
            </span>
          </div>

          <div className="glass-card p-4 border border-violet-500/30 bg-violet-950/20 text-center">
            <span className="text-[11px] font-semibold text-violet-400 uppercase tracking-wider block mb-1">
              Project Timeline
            </span>
            <div className="text-3xl font-extrabold font-display text-white">
              {(totalAgenticHours / 40).toFixed(1)} wks
            </div>
            <span className="text-xs text-slate-400 mt-1 inline-block">
              vs {(totalManualHours / 40).toFixed(0)} wks manual rewrite
            </span>
          </div>
        </div>

        {/* Comparison Details */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 text-xs text-slate-300 space-y-2">
          <div className="flex justify-between py-1 border-b border-white/5">
            <span>Manual Migration Baseline Cost:</span>
            <span className="font-mono text-slate-400 line-through">${totalManualCost.toLocaleString()}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-white/5">
            <span>VectorLab Agentic Pipeline Cost:</span>
            <span className="font-mono text-emerald-400 font-bold">${totalAgenticCost.toLocaleString()}</span>
          </div>
          <div className="flex justify-between py-1 pt-2 font-bold text-white">
            <span>Total Value Generated:</span>
            <span className="font-mono text-cyan-400">${netSavingsUsd.toLocaleString()}</span>
          </div>
        </div>

        {/* Modal footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="btn-primary text-xs px-5 py-2"
          >
            Close Calculator
          </button>
        </div>

      </div>
    </div>
  );
};
