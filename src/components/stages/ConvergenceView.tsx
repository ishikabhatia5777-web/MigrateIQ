import React, { useState } from 'react';
import { 
  GitMerge, 
  CheckCircle2, 
  ShieldCheck, 
  Copy, 
  Check, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Network,
  Share2
} from 'lucide-react';
import { ConvergenceData, DaxTranslationItem } from '../../types/migration';

interface ConvergenceViewProps {
  data: ConvergenceData;
}

export const ConvergenceView: React.FC<ConvergenceViewProps> = ({ data }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyDax = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Convergence Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-4 border border-violet-500/30 bg-gradient-to-br from-violet-950/20 to-slate-900/60">
          <div className="flex items-center justify-between text-violet-400 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Semantic Kernel Confidence</span>
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-3xl font-extrabold font-display text-white mt-1">
            {data.averageConfidence}%
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Validated by DAX Guard syntax compiler
          </p>
        </div>

        <div className="glass-card p-4 border border-white/10">
          <div className="flex items-center justify-between text-cyan-400 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Direct Lake Architecture</span>
            <Layers className="w-4 h-4" />
          </div>
          <div className="text-lg font-bold text-white mt-1">
            {data.directLakeStrategy}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            OneLake Delta Parquet with Direct Lake mode
          </p>
        </div>

        <div className="glass-card p-4 border border-white/10">
          <div className="flex items-center justify-between text-emerald-400 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Model Relationships</span>
            <Network className="w-4 h-4" />
          </div>
          <div className="text-3xl font-extrabold font-display text-emerald-400 mt-1">
            {data.relationships.length} Active
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Star-schema dimensional graph constructed
          </p>
        </div>
      </div>

      {/* Side-by-Side DAX Translation Workbench */}
      <div className="glass-panel p-5 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <GitMerge className="w-4 h-4 text-violet-400" />
            <h3 className="text-sm font-bold text-white">
              Semantic Kernel: Source to Fabric DAX Translation
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            {data.daxTranslations.length} complex expressions synthesized
          </span>
        </div>

        <div className="space-y-4">
          {data.daxTranslations.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-slate-900/70 border border-white/10 hover:border-violet-500/40 transition-all space-y-3"
            >
              {/* Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-violet-300">
                    {item.id}
                  </span>
                  <span className="text-xs font-bold text-white">
                    {item.sourceField}
                  </span>
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {item.sourceType.replace('_', ' ')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-500/10 text-violet-300 border border-violet-500/30">
                    Rule: {item.ruleApplied}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    <ShieldCheck className="w-3 h-3" />
                    <span>{item.daxGuardStatus}</span>
                  </span>
                  <span className="text-xs font-bold text-cyan-400 font-mono">
                    {item.confidence}% Match
                  </span>
                </div>
              </div>

              {/* Side-by-Side Diff Comparison */}
              <div className="code-diff-container">
                
                {/* Left: Source Formula */}
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5 font-medium">
                    <span>Source Platform Expression</span>
                    <span className="text-orange-400 font-mono text-[10px]">ORIGINAL</span>
                  </div>
                  <div className="code-box text-orange-300 bg-slate-950/80 border-orange-500/20 min-h-[90px]">
                    {item.sourceFormula}
                  </div>
                </div>

                {/* Right: Generated DAX */}
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5 font-medium">
                    <span>Generated Microsoft Fabric DAX</span>
                    <button
                      onClick={() => handleCopyDax(item.id, item.targetDax)}
                      className="inline-flex items-center gap-1 text-[10px] text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy DAX</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="code-box text-cyan-300 bg-slate-950/80 border-cyan-500/30 min-h-[90px]">
                    {item.targetDax}
                  </div>
                </div>

              </div>

              {/* Intermediate Representation & AI Rationale */}
              <div className="p-2.5 rounded-lg bg-slate-950/50 border border-white/5 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="text-slate-400 text-[11px] leading-relaxed">
                  <span className="text-slate-300 font-semibold">DAX Guard Synthesis: </span>
                  {item.explanation}
                </div>
                <div className="text-[10px] font-mono text-slate-500 shrink-0">
                  IR: <span className="text-slate-400">{item.intermediateRepresentation}</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Visual Type Mapping Matrix */}
      <div className="glass-panel p-5 border border-white/10">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>Visual Type & Field Role Bindings</span>
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="pb-2 font-semibold">Source Visual Type</th>
                <th className="pb-2 font-semibold">Target Power BI / Fabric Visual</th>
                <th className="pb-2 font-semibold">Field Role Bindings</th>
                <th className="pb-2 font-semibold text-right">Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.visualMappings.map((vm) => (
                <tr key={vm.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-2.5 text-white font-medium">{vm.sourceVisual}</td>
                  <td className="py-2.5 font-mono text-cyan-300">{vm.targetFabricVisual}</td>
                  <td className="py-2.5 text-slate-300 text-[11px]">
                    {Object.entries(vm.fieldRolesMapped).map(([role, field]) => (
                      <span key={role} className="inline-block mr-2 px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                        {role}: <span className="text-cyan-300">{field}</span>
                      </span>
                    ))}
                  </td>
                  <td className="py-2.5 text-right font-mono text-emerald-400 font-bold">{vm.confidence}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Model Relationships */}
      <div className="glass-panel p-5 border border-white/10">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Share2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Synthesized Model Relationships</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {data.relationships.map((rel, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-white/5 text-xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-cyan-300 font-semibold">{rel.fromTable}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                <span className="font-mono text-emerald-300 font-semibold">{rel.toTable}</span>
              </div>
              <div className="text-[11px] text-slate-400">
                Key: <span className="text-slate-300 font-mono">{rel.fromColumn} = {rel.toColumn}</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-1 uppercase font-semibold">
                Cardinality: {rel.cardinality} (Active)
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
