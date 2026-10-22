import React, { useState } from 'react';
import { 
  Cpu, 
  Database, 
  FileCode, 
  Download, 
  Copy, 
  Check, 
  ExternalLink, 
  Layers, 
  CheckCircle2,
  HardDrive
} from 'lucide-react';
import { BiEngineeringData } from '../../types/migration';

interface BiEngineeringViewProps {
  data: BiEngineeringData;
  onDownloadBundle: () => void;
}

export const BiEngineeringView: React.FC<BiEngineeringViewProps> = ({
  data,
  onDownloadBundle,
}) => {
  const [selectedFile, setSelectedFile] = useState<string>('model.tmdl');
  const [copied, setCopied] = useState(false);

  // Available files: TMDL files + PBIR definition
  const fileOptions = [
    ...Object.keys(data.tmdlFiles),
    'definition.pbir',
  ];

  const currentContent =
    selectedFile === 'definition.pbir'
      ? JSON.stringify(data.pbirDefinition, null, 2)
      : data.tmdlFiles[selectedFile] || '';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Deployment & Target Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="glass-card p-4 border border-blue-500/30 bg-gradient-to-br from-blue-950/20 to-slate-900/60">
          <div className="flex items-center justify-between text-blue-400 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Target Fabric Workspace</span>
            <Layers className="w-4 h-4" />
          </div>
          <div className="text-lg font-bold text-white mt-1">
            {data.deploymentTarget.workspace}
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Lakehouse: <span className="font-mono text-cyan-300">{data.deploymentTarget.lakehouse}</span>
          </p>
        </div>

        <div className="glass-card p-4 border border-white/10">
          <div className="flex items-center justify-between text-emerald-400 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Direct Lake Sync Status</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <div className="text-lg font-bold text-emerald-400 mt-1">
            {data.deploymentTarget.directLakeStatus.replace('_', ' ')}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            SQL Endpoint: <span className="font-mono text-slate-300">{data.deploymentTarget.sqlEndpoint}</span>
          </p>
        </div>

        <div className="glass-card p-4 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-cyan-400 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Artifact Package Size</span>
            <HardDrive className="w-4 h-4" />
          </div>
          <div className="text-2xl font-extrabold font-display text-white mt-1">
            {data.bundleSizeKb} KB
          </div>
          <button
            onClick={onDownloadBundle}
            className="mt-2 text-xs text-cyan-400 hover:text-cyan-300 font-semibold inline-flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Migration ZIP</span>
          </button>
        </div>

      </div>

      {/* Live TMDL & PBIR File Inspector */}
      <div className="glass-panel border border-white/10 overflow-hidden">
        
        {/* Terminal / Code Header with Tabs */}
        <div className="terminal-header flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900 border-b border-white/10">
          <div className="flex items-center gap-2 overflow-x-auto">
            <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="text-xs font-bold text-white mr-2 shrink-0">Compiled Artifacts:</span>

            {fileOptions.map((fileName) => (
              <button
                key={fileName}
                onClick={() => setSelectedFile(fileName)}
                className={`px-3 py-1 rounded-md text-xs font-mono font-medium transition-all shrink-0 ${
                  selectedFile === fileName
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {fileName}
              </button>
            ))}
          </div>

          <button
            onClick={handleCopyCode}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-white/5 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>

        {/* Code View Area */}
        <div className="p-4 bg-slate-950/90 max-h-[380px] overflow-y-auto">
          <pre className="font-mono text-xs text-cyan-200/90 leading-relaxed whitespace-pre overflow-x-auto">
            {currentContent}
          </pre>
        </div>

      </div>

      {/* Delta Lakehouse Table Schemas (Bronze, Silver, Gold) */}
      <div className="glass-panel p-5 border border-white/10">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Database className="w-3.5 h-3.5 text-emerald-400" />
          <span>OneLake Delta Table Storage Schemas</span>
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="pb-2 font-semibold">Medallion Layer</th>
                <th className="pb-2 font-semibold">Delta Table Name</th>
                <th className="pb-2 font-semibold">Format & Optimization</th>
                <th className="pb-2 font-semibold">Storage Path (OneLake)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono text-[11px]">
              {data.deltaSchemas.map((schema, idx) => {
                const isGold = schema.layer === 'Gold';
                const isSilver = schema.layer === 'Silver';

                return (
                  <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-2.5 font-sans font-bold">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] ${
                          isGold
                            ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                            : isSilver
                            ? 'bg-slate-700 text-slate-200'
                            : 'bg-orange-500/10 text-orange-400'
                        }`}
                      >
                        {schema.layer}
                      </span>
                    </td>
                    <td className="py-2.5 text-white font-semibold">{schema.tableName}</td>
                    <td className="py-2.5 text-slate-300">{schema.format}</td>
                    <td className="py-2.5 text-slate-400 truncate max-w-[280px]">
                      {schema.storageUrl}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
