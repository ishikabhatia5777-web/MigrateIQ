import React from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  FileText, 
  Layers, 
  Code2, 
  Sliders,
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';
import { DiagnosticData } from '../../types/migration';

interface DiagnosticViewProps {
  data: DiagnosticData;
}

export const DiagnosticView: React.FC<DiagnosticViewProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      
      {/* Top Banner / Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Readiness Score */}
        <div className="glass-card p-5 border border-cyan-500/30 bg-gradient-to-br from-cyan-950/30 to-slate-900/60 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
              Migration Readiness
            </span>
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          </div>
          <div className="my-2">
            <div className="text-4xl font-extrabold font-display text-white">
              {data.readinessScore}%
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Autonomous conversion readiness
            </p>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden mt-2">
            <div
              className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full transition-all duration-1000"
              style={{ width: `${data.readinessScore}%` }}
            />
          </div>
        </div>

        {/* Complexity Band */}
        <div className="glass-card p-5 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              Estate Complexity
            </span>
            <Layers className="w-4 h-4 text-amber-400" />
          </div>
          <div className="my-2">
            <div className="text-3xl font-extrabold font-display text-white">
              {data.complexityScore}
              <span className="text-sm font-normal text-slate-400"> / 100</span>
            </div>
            <span className="inline-block px-2.5 py-0.5 mt-2 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
              {data.complexityBand} Tier
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            Based on LODs, nested calcs, and table models
          </p>
        </div>

        {/* Hours Saved */}
        <div className="glass-card p-5 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Time Acceleration
            </span>
            <Clock className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="my-2">
            <div className="text-3xl font-extrabold font-display text-emerald-400">
              {data.effort.hoursSaved} hrs
            </div>
            <p className="text-xs text-slate-300 mt-1">
              {data.effort.manualDays} days manual &rarr; {data.effort.agenticMinutes} min agentic
            </p>
          </div>
          <p className="text-[11px] text-slate-400">
            98.5% faster deployment velocity
          </p>
        </div>

        {/* Cost Savings */}
        <div className="glass-card p-5 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider">
              Estimated Savings
            </span>
            <DollarSign className="w-4 h-4 text-violet-400" />
          </div>
          <div className="my-2">
            <div className="text-3xl font-extrabold font-display text-white">
              ${data.effort.estimatedCostSavingsUsd.toLocaleString()}
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Engineering rework eliminated
            </p>
          </div>
          <p className="text-[11px] text-slate-400">
            Calculated at enterprise rate $150/hr
          </p>
        </div>

      </div>

      {/* Asset Inventory Breakdown */}
      <div className="glass-panel p-5 border border-white/10">
        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <FileText className="w-4 h-4 text-cyan-400" />
          <span>Extracted Asset Inventory</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="bg-slate-900/60 p-3 rounded-xl border border-white/5">
            <span className="text-xs text-slate-400">Worksheets</span>
            <div className="text-xl font-bold text-white mt-1">{data.stats.totalSheets}</div>
          </div>
          <div className="bg-slate-900/60 p-3 rounded-xl border border-white/5">
            <span className="text-xs text-slate-400">Dashboards</span>
            <div className="text-xl font-bold text-white mt-1">{data.stats.dashboards}</div>
          </div>
          <div className="bg-slate-900/60 p-3 rounded-xl border border-white/5">
            <span className="text-xs text-slate-400">Calculated Fields</span>
            <div className="text-xl font-bold text-white mt-1">{data.stats.calculatedFields}</div>
          </div>
          <div className="bg-slate-900/60 p-3 rounded-xl border border-white/5">
            <span className="text-xs text-slate-400">LOD / Set Analysis</span>
            <div className="text-xl font-bold text-cyan-400 mt-1">{data.stats.lodOrSetExpressions}</div>
          </div>
          <div className="bg-slate-900/60 p-3 rounded-xl border border-white/5">
            <span className="text-xs text-slate-400">Parameters</span>
            <div className="text-xl font-bold text-white mt-1">{data.stats.parameters}</div>
          </div>
          <div className="bg-slate-900/60 p-3 rounded-xl border border-white/5">
            <span className="text-xs text-slate-400">Data Sources</span>
            <div className="text-xl font-bold text-emerald-400 mt-1">{data.stats.dataSourcesCount}</div>
          </div>
        </div>
      </div>

      {/* Risk & Blocker Matrix */}
      <div className="glass-panel p-5 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white">
              Identified Blockers & AI Resolution Roadmap
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            {data.blockers.length} issues automatically resolved
          </span>
        </div>

        <div className="space-y-3">
          {data.blockers.map((blocker) => {
            const isHigh = blocker.severity === 'HIGH' || blocker.severity === 'CRITICAL';
            const isMed = blocker.severity === 'MEDIUM';

            return (
              <div
                key={blocker.id}
                className="p-4 rounded-xl bg-slate-900/60 border border-white/5 hover:border-white/15 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                        isHigh
                          ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                          : isMed
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          : 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                      }`}
                    >
                      {blocker.severity} RISK
                    </span>
                    <span className="text-xs font-bold text-white font-mono">
                      {blocker.id}
                    </span>
                    <span className="text-xs font-semibold text-slate-200">
                      {blocker.component}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 mb-2.5">
                  {blocker.description}
                </p>

                <div className="flex items-start gap-2 p-2.5 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-cyan-300 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-cyan-200">AI Convergence Strategy: </span>
                    <span>{blocker.recommendedResolution}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
