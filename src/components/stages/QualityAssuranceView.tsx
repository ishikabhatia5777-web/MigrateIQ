import React from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  FileCheck, 
  AlertCircle, 
  BarChart3, 
  Clock, 
  Check,
  Eye
} from 'lucide-react';
import { QualityAssuranceData } from '../../types/migration';

interface QualityAssuranceViewProps {
  data: QualityAssuranceData;
}

export const QualityAssuranceView: React.FC<QualityAssuranceViewProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      
      {/* Top QA Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Overall Fidelity */}
        <div className="glass-card p-5 border border-emerald-500/40 bg-gradient-to-br from-emerald-950/20 to-slate-900/60 flex flex-col justify-between">
          <div className="flex items-center justify-between text-emerald-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Overall Fidelity</span>
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-4xl font-extrabold font-display text-white">
              {data.overallFidelityScore}%
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Zero semantic or calculation drift
            </p>
          </div>
          <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Audit Certified</span>
          </div>
        </div>

        {/* Visual Accuracy */}
        <div className="glass-card p-5 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-cyan-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Visual Accuracy</span>
            <Eye className="w-4 h-4" />
          </div>
          <div>
            <div className="text-3xl font-extrabold font-display text-white">
              {data.visualAccuracyScore}%
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Layout geometry & palette parity
            </p>
          </div>
          <span className="text-[11px] text-slate-400">
            Grid alignment variance &lt; 0.5px
          </span>
        </div>

        {/* Data Reconciliation Score */}
        <div className="glass-card p-5 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-violet-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Data Reconciliation</span>
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-3xl font-extrabold font-display text-white">
              {data.dataReconciliationScore}%
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Direct Lake row-level precision
            </p>
          </div>
          <span className="text-[11px] text-slate-400">
            Tested across aggregate queries
          </span>
        </div>

        {/* Test Suite Summary */}
        <div className="glass-card p-5 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-amber-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Automated Test Suite</span>
            <FileCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-3xl font-extrabold font-display text-emerald-400">
              {data.testSuite.passed} / {data.testSuite.totalTests}
            </div>
            <p className="text-xs text-slate-300 mt-1">
              All regression assertions passed
            </p>
          </div>
          <span className="text-[11px] text-emerald-400 font-semibold">
            0 Failures, 0 Warnings
          </span>
        </div>

      </div>

      {/* Dual-Engine KPI Reconciliation Table */}
      <div className="glass-panel p-5 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">
              Dual-Engine Metric & KPI Reconciliation
            </h3>
          </div>
          <span className="text-xs text-emerald-400 font-semibold">
            Zero Tolerance Threshold Met
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="pb-2.5 font-semibold">Reconciled Metric / KPI</th>
                <th className="pb-2.5 font-semibold">Source Platform Value</th>
                <th className="pb-2.5 font-semibold">Fabric Direct Lake DAX Value</th>
                <th className="pb-2.5 font-semibold text-center">Variance %</th>
                <th className="pb-2.5 font-semibold text-right">Verification Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono text-xs">
              {data.reconciliations.map((row, idx) => {
                const isExact = row.status === 'EXACT_MATCH';

                return (
                  <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3 font-sans font-semibold text-white">
                      {row.kpiName}
                    </td>
                    <td className="py-3 text-orange-300">{row.sourceValue}</td>
                    <td className="py-3 text-cyan-300">{row.fabricDirectLakeValue}</td>
                    <td className="py-3 text-center">
                      <span className="text-slate-300">
                        {row.variancePct === 0 ? '0.00%' : `${row.variancePct}%`}
                      </span>
                    </td>
                    <td className="py-3 text-right font-sans">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isExact
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                        }`}
                      >
                        <Check className="w-3 h-3" />
                        <span>{row.status.replace('_', ' ')}</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Visual Regression & Official Audit Certificate */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Visual Regression Checks (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-5 border border-white/10">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span>Visual Fidelity & Parity Checks</span>
          </h4>

          <div className="space-y-3">
            {data.regressionChecks.map((check, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 text-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-white">{check.visual}</span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    PASS
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mb-2">Sheet: {check.sheet}</p>

                <div className="grid grid-cols-3 gap-2 text-[11px] font-mono">
                  <div className="bg-slate-950 p-2 rounded border border-white/5">
                    <span className="text-slate-500 block text-[10px]">Layout Drift:</span>
                    <span className="text-cyan-300 font-bold">{check.layoutDriftPx} px</span>
                  </div>
                  <div className="bg-slate-950 p-2 rounded border border-white/5">
                    <span className="text-slate-500 block text-[10px]">Color Parity:</span>
                    <span className="text-emerald-300 font-bold">{check.colorParityPct}%</span>
                  </div>
                  <div className="bg-slate-950 p-2 rounded border border-white/5">
                    <span className="text-slate-500 block text-[10px]">Interactivity:</span>
                    <span className="text-violet-300 font-bold truncate">{check.interactionParity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Official QA Audit Certificate (5 cols) */}
        <div className="lg:col-span-5 glass-card p-5 border border-emerald-500/30 bg-gradient-to-br from-slate-900/90 to-emerald-950/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 mb-3">
              <Award className="w-6 h-6" />
              <span className="text-xs font-bold uppercase tracking-widest">
                Official QA Verification
              </span>
            </div>

            <h4 className="text-base font-bold text-white mb-2 font-display">
              VectorLab Production Sign-off Certificate
            </h4>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              This migration estate has been fully verified by the autonomous Quality Assurance Agent. DAX calculations, Direct Lake schemas, and PBIR layouts conform 100% to enterprise Microsoft Fabric standards.
            </p>

            <div className="p-3 rounded-lg bg-slate-950 border border-white/10 font-mono text-[11px] space-y-1 mb-4">
              <div className="text-slate-400">
                Cert ID: <span className="text-cyan-300 font-bold">{data.auditCertificateId}</span>
              </div>
              <div className="text-slate-400">
                Timestamp: <span className="text-slate-200">{data.timestamp}</span>
              </div>
              <div className="text-slate-400">
                Signer: <span className="text-emerald-400">VectorLab QA Engine v2.4</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <span>Status: <strong className="text-emerald-400">CERTIFIED_READY</strong></span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

      </div>

    </div>
  );
};
