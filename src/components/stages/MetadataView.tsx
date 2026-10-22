import React, { useState } from 'react';
import { 
  FileCode, 
  Database, 
  Folder, 
  FolderOpen, 
  ChevronRight, 
  ChevronDown, 
  Search, 
  Code2, 
  Layers, 
  Table2,
  Cpu
} from 'lucide-react';
import { MetadataData, AstNode } from '../../types/migration';

interface MetadataViewProps {
  data: MetadataData;
}

export const MetadataView: React.FC<MetadataViewProps> = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    ast_ds: true,
    ast_dash: true,
    ast_calc: true,
    ast_param: true,
    q_ds: true,
    q_sheets: true,
    q_master: true,
  });

  const toggleNode = (id: string) => {
    setExpandedNodes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredCalcs = data.extractedCalculations.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.rawExpression.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Search & Overview Topbar */}
      <div className="glass-panel p-4 border border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-bold text-white">Extracted Metadata AST Catalog</span>
          <span className="text-xs text-slate-400">
            ({data.dataSources.length} Sources, {data.extractedCalculations.length} Calculations, {data.visualContainers.length} Visuals)
          </span>
        </div>

        <div className="relative min-w-[260px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search calculations or fields..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
      </div>

      {/* Main 2-column view: Left AST Tree, Right Data Sources & Calculations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: AST Tree Explorer (4 cols) */}
        <div className="lg:col-span-4 glass-panel p-4 border border-white/10">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Abstract Syntax Tree (AST)</span>
          </h4>

          <div className="space-y-1 font-mono text-xs">
            {data.astTree.map((category) => {
              const isExpanded = expandedNodes[category.id];

              return (
                <div key={category.id} className="select-none">
                  <div
                    onClick={() => toggleNode(category.id)}
                    className="flex items-center gap-1.5 p-1.5 rounded-lg hover:bg-slate-800/60 cursor-pointer text-slate-200"
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    )}
                    {isExpanded ? (
                      <FolderOpen className="w-3.5 h-3.5 text-cyan-400" />
                    ) : (
                      <Folder className="w-3.5 h-3.5 text-cyan-400" />
                    )}
                    <span className="font-semibold text-slate-200">{category.name}</span>
                  </div>

                  {isExpanded && category.children && (
                    <div className="pl-6 space-y-1 my-1 border-l border-white/10 ml-3">
                      {category.children.map((child) => (
                        <div
                          key={child.id}
                          className="flex items-center gap-2 py-1 px-2 rounded hover:bg-slate-800/40 text-slate-300 text-[11px]"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
                          <span className="truncate">{child.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Data Sources & Calculations (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Direct Lake Data Sources */}
          <div className="glass-panel p-5 border border-white/10">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>Fabric Direct Lake Mapped Data Sources</span>
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400">
                    <th className="pb-2 font-semibold">Source Extract</th>
                    <th className="pb-2 font-semibold">Source Type</th>
                    <th className="pb-2 font-semibold">Direct Lake Target</th>
                    <th className="pb-2 font-semibold text-right">Estimated Rows</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {data.dataSources.map((ds, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-2.5 font-mono text-cyan-300 font-medium">{ds.name}</td>
                      <td className="py-2.5 text-slate-300">{ds.type}</td>
                      <td className="py-2.5 font-mono text-emerald-300">{ds.targetFabricDirectLake}</td>
                      <td className="py-2.5 text-right font-mono text-slate-300">{ds.rowCountEstimate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Extracted Calculations */}
          <div className="glass-panel p-5 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Code2 className="w-3.5 h-3.5 text-violet-400" />
                <span>Extracted Calculation Expressions</span>
              </h4>
              <span className="text-xs text-slate-400">
                {filteredCalcs.length} of {data.extractedCalculations.length} displayed
              </span>
            </div>

            <div className="space-y-3">
              {filteredCalcs.map((calc, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-bold text-white font-mono">{calc.name}</span>
                    <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-violet-500/10 text-violet-300 border border-violet-500/30">
                      {calc.datatype}
                    </span>
                  </div>

                  <div className="code-box text-cyan-300 text-xs mb-2">
                    {calc.rawExpression}
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-300">Dependencies:</span>
                    {calc.dependencies.map((dep, dIdx) => (
                      <span
                        key={dIdx}
                        className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]"
                      >
                        {dep}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Extracted Visual Containers */}
          <div className="glass-panel p-5 border border-white/10">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Table2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Extracted Visual Containers & Geometry</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.visualContainers.map((vc) => (
                <div key={vc.id} className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-white">{vc.title}</span>
                    <span className="text-[10px] text-cyan-400 font-mono">{vc.type}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mb-2">Sheet: {vc.sheet}</p>
                  
                  <div className="text-[11px] space-y-1">
                    <div className="text-slate-300">
                      <span className="text-slate-500">Dims: </span>
                      {vc.dimensions.join(', ') || 'None'}
                    </div>
                    <div className="text-slate-300">
                      <span className="text-slate-500">Measures: </span>
                      {vc.measures.join(', ') || 'None'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
