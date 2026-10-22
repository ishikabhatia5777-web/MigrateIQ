import React, { useState, useRef } from 'react';
import { 
  Play, 
  Terminal, 
  Download, 
  UploadCloud, 
  FileCheck, 
  Sparkles, 
  Filter, 
  RotateCw,
  FolderOpen,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ProjectData, PipelineStage, TelemetryLog } from '../types/migration';
import { DiagnosticView } from './stages/DiagnosticView';
import { MetadataView } from './stages/MetadataView';
import { ConvergenceView } from './stages/ConvergenceView';
import { BiEngineeringView } from './stages/BiEngineeringView';
import { QualityAssuranceView } from './stages/QualityAssuranceView';

interface MigrationStudioProps {
  project: ProjectData;
  activeStage: PipelineStage;
  onSelectStage: (stage: PipelineStage) => void;
  logs: TelemetryLog[];
  isProcessing: boolean;
  onRunMigration: () => void;
  onDownloadBundle: () => void;
  onSelectProject: (projectId: string) => void;
}

export const MigrationStudio: React.FC<MigrationStudioProps> = ({
  project,
  activeStage,
  onSelectStage,
  logs,
  isProcessing,
  onRunMigration,
  onDownloadBundle,
  onSelectProject,
}) => {
  const [logFilter, setLogFilter] = useState<'ALL' | 'AGENT_THOUGHT' | 'SUCCESS'>('ALL');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredLogs = logs.filter((log) => {
    if (logFilter === 'ALL') return true;
    if (logFilter === 'AGENT_THOUGHT') return log.level === 'AGENT_THOUGHT';
    if (logFilter === 'SUCCESS') return log.level === 'SUCCESS';
    return true;
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const isQlik = file.name.endsWith('.qvf') || file.name.endsWith('.qvs');
      onSelectProject(isQlik ? 'qlik_supply_chain' : 'tableau_sales');
      // Trigger execution
      onRunMigration();
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const isQlik = file.name.endsWith('.qvf') || file.name.endsWith('.qvs');
      onSelectProject(isQlik ? 'qlik_supply_chain' : 'tableau_sales');
      onRunMigration();
    }
  };

  return (
    <section id="studio-section" className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-16">
      
      {/* Workbench Header & Source Selector Card */}
      <div className="glass-panel p-5 border border-white/10 mb-8">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Active File & Project Card */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-cyan-500/30 flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/10">
              <FolderOpen className="w-6 h-6 text-cyan-400" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  {project.platform.toUpperCase()} ESTATE
                </span>
                <span className="text-xs text-slate-400">{project.sourceSize}</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white font-display mt-0.5">
                {project.name}
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                {project.sourceFile} &rarr; Microsoft Fabric Direct Lake
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            
            {/* Upload Custom File button */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              accept=".twbx,.twb,.qvf,.qvs,.json"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn-secondary text-xs px-3.5 py-2"
              title="Upload .twbx, .twb, .qvf, or .qvs file"
            >
              <UploadCloud className="w-4 h-4 text-cyan-400" />
              <span>Upload Custom App</span>
            </button>

            {/* Run Migration CTA */}
            <button
              onClick={onRunMigration}
              disabled={isProcessing}
              className="btn-primary text-xs px-4 py-2"
            >
              <Play className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin' : ''}`} />
              <span>{isProcessing ? 'Agents Running Pipeline...' : 'Run Pipeline'}</span>
            </button>

            {/* Download Bundle button */}
            <button
              onClick={onDownloadBundle}
              className="btn-secondary text-xs px-3.5 py-2"
              title="Download compiled Fabric artifacts"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Fabric Bundle (.zip)</span>
            </button>

          </div>

        </div>

        {/* Drag and drop hint strip */}
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`mt-4 py-2.5 px-4 rounded-lg border border-dashed text-xs text-center transition-all ${
            isDragging
              ? 'border-cyan-400 bg-cyan-500/10 text-cyan-300'
              : 'border-white/10 text-slate-500 hover:border-white/20'
          }`}
        >
          <span>Drag & drop any Tableau (<code>.twbx</code>, <code>.twb</code>) or Qlik (<code>.qvf</code>, <code>.qvs</code>) file here to initiate multi-agent conversion</span>
        </div>
      </div>

      {/* Main Studio Grid: Top Live Telemetry Console, Bottom Stage Deep-Dive */}
      <div className="space-y-8">
        
        {/* Real-time Agent Telemetry Terminal */}
        <div className="terminal-window">
          
          <div className="terminal-header">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <Terminal className="w-3.5 h-3.5 text-cyan-400 ml-2" />
              <span className="text-xs font-mono font-bold text-slate-300">
                VectorLab Agent Telemetry Console
              </span>
              {isProcessing && (
                <span className="inline-flex items-center gap-1 text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded animate-pulse">
                  <Sparkles className="w-3 h-3" />
                  <span>Streaming Agent Thoughts...</span>
                </span>
              )}
            </div>

            {/* Filter controls */}
            <div className="flex items-center gap-1 text-[11px]">
              <span className="text-slate-500 mr-1 hidden sm:inline">Filter:</span>
              <button
                onClick={() => setLogFilter('ALL')}
                className={`px-2 py-0.5 rounded font-mono ${
                  logFilter === 'ALL' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setLogFilter('AGENT_THOUGHT')}
                className={`px-2 py-0.5 rounded font-mono ${
                  logFilter === 'AGENT_THOUGHT' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                Thoughts
              </button>
              <button
                onClick={() => setLogFilter('SUCCESS')}
                className={`px-2 py-0.5 rounded font-mono ${
                  logFilter === 'SUCCESS' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                Success
              </button>
            </div>
          </div>

          <div className="terminal-body space-y-1.5 font-mono text-[11px]">
            {filteredLogs.map((log) => {
              const isThought = log.level === 'AGENT_THOUGHT';
              const isSuccess = log.level === 'SUCCESS';
              const isWarn = log.level === 'WARN';

              return (
                <div key={log.id} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-slate-600 shrink-0 font-mono text-[10px]">
                    {log.timestamp}
                  </span>
                  <span
                    className={`shrink-0 font-semibold text-[10px] uppercase px-1.5 py-0.2 rounded ${
                      isThought
                        ? 'bg-violet-500/20 text-violet-300'
                        : isSuccess
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : isWarn
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {log.agent}
                  </span>
                  <span
                    className={
                      isThought
                        ? 'text-violet-200'
                        : isSuccess
                        ? 'text-emerald-200 font-semibold'
                        : isWarn
                        ? 'text-amber-200'
                        : 'text-slate-300'
                    }
                  >
                    {log.message}
                  </span>
                </div>
              );
            })}
          </div>

        </div>

        {/* Stage Inspector Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider text-cyan-400">
              Active Inspector
            </span>
            <span className="text-slate-600">&bull;</span>
            <h3 className="text-lg font-bold text-white capitalize font-display">
              {activeStage.replace('_', ' ')} Stage Deep-Dive
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Stage {
              activeStage === 'diagnostic' ? '1 of 5' :
              activeStage === 'metadata' ? '2 of 5' :
              activeStage === 'convergence' ? '3 of 5' :
              activeStage === 'bi_engineering' ? '4 of 5' : '5 of 5'
            }</span>
          </div>
        </div>

        {/* Dynamic Stage Deep-Dive View */}
        <div>
          {activeStage === 'diagnostic' && (
            <DiagnosticView data={project.diagnostic} />
          )}

          {activeStage === 'metadata' && (
            <MetadataView data={project.metadata} />
          )}

          {activeStage === 'convergence' && (
            <ConvergenceView data={project.convergence} />
          )}

          {activeStage === 'bi_engineering' && (
            <BiEngineeringView
              data={project.biEngineering}
              onDownloadBundle={onDownloadBundle}
            />
          )}

          {activeStage === 'quality_assurance' && (
            <QualityAssuranceView data={project.qualityAssurance} />
          )}
        </div>

      </div>

    </section>
  );
};
