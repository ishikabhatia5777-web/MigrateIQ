import React from 'react';
import { 
  X, 
  Layers, 
  Database, 
  Cpu, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Server,
  Zap
} from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel border border-cyan-500/30 p-6 sm:p-8 bg-slate-950/95 shadow-2xl shadow-cyan-500/20">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-2.5 mb-2">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display text-white">
              Microsoft Fabric Direct Lake Architecture Blueprint
            </h2>
            <p className="text-xs text-slate-400">
              Autonomous Medallion Lakehouse & TMDL Semantic Model Compilation
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed my-4">
          VectorLab eliminates traditional slow DirectQuery and import refresh cycles by transforming Qlik QVDs and Tableau Hyper extracts into native <strong>Delta Lake Parquet tables</strong> in Microsoft Fabric OneLake, powering instant <strong>Direct Lake</strong> semantic models.
        </p>

        {/* 3-Tier Medallion Pipeline Visual */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          
          {/* Bronze Tier */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-500/20 relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                BRONZE LAYER
              </span>
              <Database className="w-4 h-4 text-amber-400" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Raw Extracted Ingestion</h4>
            <p className="text-xs text-slate-400 leading-snug">
              Ingests raw Tableau Hyper extracts, Oracle custom SQL, and Qlik QVD files into OneLake Delta Parquet tables without alteration.
            </p>
            <div className="mt-3 text-[10px] font-mono text-slate-500">
              Format: Delta Parquet (Raw)
            </div>
          </div>

          {/* Silver Tier */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/20 relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                SILVER LAYER
              </span>
              <Server className="w-4 h-4 text-cyan-400" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Cleaned & Partitioned</h4>
            <p className="text-xs text-slate-400 leading-snug">
              Convergence Kernel resolves date dimensions, normalizes hierarchies, and enforces partition pruning on high-volume tables.
            </p>
            <div className="mt-3 text-[10px] font-mono text-cyan-400">
              Format: Delta Parquet (Partitioned)
            </div>
          </div>

          {/* Gold Tier */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-emerald-500/30 bg-gradient-to-br from-emerald-950/20 to-slate-900 relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                GOLD LAYER (DIRECT LAKE)
              </span>
              <Zap className="w-4 h-4 text-emerald-400" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">V-Order Semantic Models</h4>
            <p className="text-xs text-slate-400 leading-snug">
              Direct Lake semantic models read columnar Parquet files straight from OneLake memory with zero ETL latency or data movement.
            </p>
            <div className="mt-3 text-[10px] font-mono text-emerald-400">
              Mode: Direct Lake (Sub-second DAX)
            </div>
          </div>

        </div>

        {/* Technical Highlights list */}
        <div className="space-y-2.5 p-4 rounded-xl bg-slate-900/50 border border-white/5 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span><strong>Zero Data Duplication:</strong> Direct Lake mode accesses Delta files directly from OneLake without caching imports.</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span><strong>TMDL Native:</strong> Generates standard Git-friendly Tabular Model Definition Language files for CI/CD automation.</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span><strong>PBIR Compatibility:</strong> Generates modern Power BI Enhanced Report Format with declarative JSON visual containers.</span>
          </div>
        </div>

        {/* Modal footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="btn-primary text-xs px-5 py-2"
          >
            Got It
          </button>
        </div>

      </div>
    </div>
  );
};
