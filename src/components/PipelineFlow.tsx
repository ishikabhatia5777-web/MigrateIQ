import React from 'react';
import { 
  Activity, 
  FileCode, 
  GitMerge, 
  Cpu, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { PipelineStage } from '../types/migration';

interface PipelineFlowProps {
  activeStage: PipelineStage;
  onSelectStage: (stage: PipelineStage) => void;
  completedStages: Set<PipelineStage>;
  isProcessing: boolean;
  currentProcessingStage?: PipelineStage;
}

interface AgentCard {
  id: PipelineStage;
  stepNumber: string;
  name: string;
  agentRole: string;
  image: string;
  description: string;
  badge: string;
  icon: React.ElementType;
}

const AGENTS: AgentCard[] = [
  {
    id: 'diagnostic',
    stepNumber: '01',
    name: 'Diagnostic Agents',
    agentRole: 'Diagnosis Agent',
    image: 'https://images.squarespace-cdn.com/content/v1/679d89679ef8b943803f6a4a/0fe94719-cf04-4315-a70e-872ca64daf02/Assesment.png',
    description: 'Instantly scans your entire Qlik & Tableau estate, delivering a detailed, prioritized migration roadmap with complexity scores, risk flags, and accurate effort estimates in minutes.',
    badge: 'Q-T2F Assessment',
    icon: Activity,
  },
  {
    id: 'metadata',
    stepNumber: '02',
    name: 'Metadata',
    agentRole: 'Metadata Acquisition Agent',
    image: 'https://images.squarespace-cdn.com/content/v1/679d89679ef8b943803f6a4a/2482dd87-09ec-408d-9ac9-c88c382892a0/Parsing.png',
    description: 'Automatically extracts every detail from your Reports and workbooks, including data sources, calculations, LOD expressions, parameters, sets, actions, layouts, and formatting into clean structured AST JSON.',
    badge: 'Q-T2F Parsing',
    icon: FileCode,
  },
  {
    id: 'convergence',
    stepNumber: '03',
    name: 'Convergence',
    agentRole: 'Convergence Agent',
    image: 'https://images.squarespace-cdn.com/content/v1/679d89679ef8b943803f6a4a/531624d8-0055-4241-b9ea-edecafa5f07e/mapping2.png',
    description: 'Intelligently translates every element into native Power BI and Microsoft Fabric equivalents, automated DAX generation with DAX Guard, visual bindings, and confidence-scored suggestions.',
    badge: 'Combine Mapping',
    icon: GitMerge,
  },
  {
    id: 'bi_engineering',
    stepNumber: '04',
    name: 'BI Engineering',
    agentRole: 'BI Engineering Agent',
    image: 'https://images.squarespace-cdn.com/content/v1/679d89679ef8b943803f6a4a/7e0536bb-33dc-4b9e-bcd2-29b77eab67a4/Generation.png',
    description: 'Transforms your fully mapped content into production-ready Microsoft Fabric semantic models (TMDL), Direct Lake Delta tables across Bronze-Silver-Gold, and Power BI PBIR report structures with one-click publishing.',
    badge: 'Generation Engine',
    icon: Cpu,
  },
  {
    id: 'quality_assurance',
    stepNumber: '05',
    name: 'Quality Assurance',
    agentRole: 'Quality Assurance Agent',
    image: 'https://images.squarespace-cdn.com/content/v1/679d89679ef8b943803f6a4a/f715a856-bd61-4b60-b2b9-08f7a58f188c/Switchblade+-+Scr.png',
    description: 'Automated dual-engine testing verifying source metrics against Microsoft Fabric Direct Lake endpoints with zero row drift, visual layout verification, and official sign-off audit certificates.',
    badge: 'QT2F Validation',
    icon: ShieldCheck,
  },
];

export const PipelineFlow: React.FC<PipelineFlowProps> = ({
  activeStage,
  onSelectStage,
  completedStages,
  isProcessing,
  currentProcessingStage,
}) => {
  return (
    <section id="pipeline-section" className="bg-white py-20 px-6 lg:px-12 border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-cyan-600 block mb-2">
            Multi-Agent Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-950 font-display tracking-tight mb-4">
            Autonomous 5-Stage Migration Pipeline
          </h2>
          <p className="text-base text-gray-600">
            MigrateIQ deploys specialized autonomous agents moving from diagnostics to production validation
          </p>
        </div>

        {/* 5-Step Horizontal Flow Badges */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-4 mb-10 max-w-5xl mx-auto border-b border-gray-100">
          {AGENTS.map((agent, idx) => {
            const isSelected = activeStage === agent.id;
            const isCompleted = completedStages.has(agent.id);
            const isCurrent = isProcessing && currentProcessingStage === agent.id;

            return (
              <React.Fragment key={agent.id}>
                <button
                  onClick={() => onSelectStage(agent.id)}
                  className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gray-950 text-white shadow-md'
                      : isCompleted
                      ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  } ${isCurrent ? 'ring-2 ring-cyan-500 animate-pulse' : ''}`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isSelected ? 'bg-cyan-400 text-black' : 'bg-white text-gray-700'
                  }`}>
                    {agent.stepNumber}
                  </span>
                  <span>{agent.name}</span>
                </button>

                {idx < AGENTS.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-gray-300 shrink-0 hidden sm:block" />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* 5 Agent Cards Grid matching vectorlab.ai */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {AGENTS.map((agent) => {
            const Icon = agent.icon;
            const isSelected = activeStage === agent.id;
            const isCompleted = completedStages.has(agent.id);
            const isCurrent = isProcessing && currentProcessingStage === agent.id;

            return (
              <div
                key={agent.id}
                onClick={() => {
                  onSelectStage(agent.id);
                  const studio = document.getElementById('studio-section');
                  studio?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`bg-white rounded-2xl border overflow-hidden transition-all duration-300 cursor-pointer flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 ${
                  isSelected
                    ? 'border-cyan-500 ring-2 ring-cyan-500/20 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300 shadow-xs'
                } ${isCurrent ? 'ring-2 ring-cyan-500 animate-pulse' : ''}`}
              >
                {/* Image preview */}
                <div className="relative h-44 bg-slate-950 overflow-hidden border-b border-gray-100 flex items-center justify-center">
                  <img
                    src={agent.image}
                    alt={agent.name}
                    className="w-full h-full object-cover object-top opacity-90 hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>{agent.stepNumber}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded">
                        {agent.badge}
                      </span>
                      {isCompleted ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Ready</span>
                        </span>
                      ) : isCurrent ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-cyan-600 animate-pulse">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Active</span>
                        </span>
                      ) : null}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 font-display mb-1 flex items-center gap-2">
                      <Icon className="w-5 h-5 text-gray-700" />
                      <span>{agent.name}</span>
                    </h3>

                    <p className="text-xs font-semibold text-gray-500 mb-3">
                      {agent.agentRole}
                    </p>

                    <p className="text-xs text-gray-600 leading-relaxed">
                      {agent.description}
                    </p>
                  </div>

                  {/* Bottom Trigger */}
                  <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-cyan-700">
                    <span>Inspect Output & AST</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
