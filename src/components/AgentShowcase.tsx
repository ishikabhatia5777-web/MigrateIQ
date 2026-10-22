import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PipelineStage } from '../types/migration';

interface AgentShowcaseProps {
  onSelectStage: (stage: PipelineStage) => void;
}

export const AgentShowcase: React.FC<AgentShowcaseProps> = ({ onSelectStage }) => {
  return (
    <section className="bg-white py-16 lg:py-24 px-6 lg:px-12 border-b border-gray-100">
      <div className="max-w-6xl mx-auto space-y-24 lg:space-y-32">

        {/* ── 1. Diagnosis Agent ── Text Left, Image Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 block mb-2">
              01 · Diagnostic Stage
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-950 font-display mb-4">
              Diagnosis Agent
            </h3>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
              The Diagnosis Agent performs a full estate scan of your Qlik or Tableau environment. It connects directly to Qlik Cloud APIs or Tableau Server to enumerate every application, workbook, sheet, and field. It calculates a <strong>complexity score</strong> per report — counting KPIs, pages, datasets, calculated fields, LOD expressions, and Set Analysis patterns — and flags high-risk items that may require human review.
            </p>
            <ul className="text-sm text-gray-600 space-y-1 mb-6 list-disc list-inside">
              <li>Scans KPIs, pages, datasets, and total fields per workbook</li>
              <li>Flags documentation quality and data sensitivity risks</li>
              <li>Produces a prioritized migration roadmap with effort estimates</li>
              <li>Outputs a structured <code className="bg-gray-100 px-1 rounded text-xs">Assessment Results</code> JSON to MongoDB</li>
            </ul>
            <button
              onClick={() => onSelectStage('diagnostic')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 hover:text-cyan-900 transition-colors cursor-pointer"
            >
              <span>Explore Diagnostic Output</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white">
              {/* Mocked Assessment Results UI */}
              <div className="bg-white p-5">
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  {/* Card header */}
                  <div className="bg-slate-50 px-5 py-3 border-b border-gray-200">
                    <h4 className="text-sm font-bold text-gray-800">Assessment Results</h4>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Application Name</p>
                        <p className="text-sm font-bold text-gray-900">City Hospital Analysis</p>
                        <p className="text-[10px] text-gray-400">Qlik Sense</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Power BI Migration</p>
                        <p className="text-sm font-bold text-emerald-600">Replicable</p>
                        <p className="text-[10px] text-gray-400">Migration feasibility</p>
                      </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-0 border-b border-gray-200 mb-4 text-[11px] font-semibold">
                      {['Summary', 'Volumetrics', 'Detailed Analysis', 'Challenges'].map((tab, i) => (
                        <span key={tab} className={`px-3 py-1.5 cursor-pointer ${i === 0 ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}>{tab}</span>
                      ))}
                    </div>

                    <p className="text-[11px] font-bold text-gray-700 mb-1">Assessment Overview</p>
                    <p className="text-[10px] text-gray-400 mb-3">Summary of the assessment</p>

                    <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                      <div>
                        <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-2">Key Metrics</p>
                        {[
                          { label: 'KPIs', value: 13, width: '75%' },
                          { label: 'Pages', value: 14, width: '82%' },
                          { label: 'Datasets', value: 5, width: '30%' },
                          { label: 'Total Fields', value: 50, width: '95%' },
                        ].map(({ label, value, width }) => (
                          <div key={label} className="mb-2">
                            <div className="flex justify-between text-[10px] text-gray-600 mb-0.5">
                              <span>{label}</span><span className="font-bold">{value}</span>
                            </div>
                            <div className="h-1.5 bg-gray-100 rounded-full">
                              <div className="h-1.5 bg-blue-500 rounded-full" style={{ width }} />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-2">Assessment Results</p>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] text-gray-600">Documentation Quality</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-yellow-100 text-yellow-700">Medium</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-gray-600">Data Sensitivity</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-700">High</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 2. Metadata Acquisition Agent ── Image Left, Text Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 order-1">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white">
              <div className="bg-white p-5">
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-50 px-5 py-3 border-b border-gray-200">
                    <h4 className="text-sm font-bold text-gray-800">Parsing Results</h4>
                  </div>
                  <div className="p-5">
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div>
                        <p className="text-[10px] text-gray-400 mb-0.5">Application Name</p>
                        <p className="text-xs font-bold text-gray-900">City Hospital Analysis</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 mb-0.5">Data Model</p>
                        <p className="text-xs font-bold text-gray-900">Dimensional (star-like)</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 mb-0.5">Dimensional Model</p>
                        <p className="text-xs font-bold text-gray-900">Star Schema</p>
                        <p className="text-[10px] text-gray-400">3 Tables, 2 Dimensions</p>
                      </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-0 border-b border-gray-200 mb-4 text-[11px] font-semibold">
                      {['Data Sources', 'Tables/Entities', 'Dimensions', 'Measures', 'Calculations and Filters', 'Renamed Fields'].map((tab, i) => (
                        <span key={tab} className={`px-2 py-1.5 cursor-pointer whitespace-nowrap ${i === 2 ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50 rounded-t' : 'text-gray-400 hover:text-gray-600'}`}>{tab}</span>
                      ))}
                    </div>

                    <p className="text-[11px] font-bold text-gray-800 mb-0.5">Dimensions</p>
                    <p className="text-[10px] text-gray-400 mb-3">Dimensions used in this report</p>

                    <table className="w-full text-[10px]">
                      <thead>
                        <tr className="text-gray-400 border-b border-gray-100">
                          <th className="text-left py-1 font-semibold">Field Name</th>
                          <th className="text-left py-1 font-semibold">Expression</th>
                          <th className="text-left py-1 font-semibold">Table</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { field: 'Specialization', expr: '=Capitalize([SPECIALIZATION])', table: 'DOCTORS' },
                          { field: 'Unpaid Balance', expr: '=TOTAL_AMOUNT-INSURANCE_COVERED', table: 'BILLS' },
                          { field: 'ExperienceLevel', expr: 'IF(EXPERIENCE_YEARS <= 2, \'Entry\'...)', table: 'DOCTORS' },
                        ].map(({ field, expr, table }) => (
                          <tr key={field} className="border-b border-gray-50 hover:bg-gray-50">
                            <td className="py-1.5 font-medium text-gray-800">{field}</td>
                            <td className="py-1.5 text-gray-500 font-mono truncate max-w-[140px]">{expr}</td>
                            <td className="py-1.5 text-blue-600 font-semibold">{table}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <button className="mt-4 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-[10px] font-semibold">
                      Download Visualizations JSON
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 order-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 block mb-2">
              02 · Metadata Stage
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-950 font-display mb-4">
              Metadata Acquisition Agent
            </h3>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
              A unified microservice that connects live to Qlik Cloud APIs or reads Tableau XML and Hyper extracts. It enriches, normalises, and persists a complete structured AST — data sources, tables, dimensions, measures, LOD expressions, calculations, filters, renamed fields, and layout metadata — into MongoDB.
            </p>
            <ul className="text-sm text-gray-600 space-y-1 mb-6 list-disc list-inside">
              <li>Parses Qlik QVS load scripts and Tableau XML into a unified AST</li>
              <li>Extracts data model type: star schema, snowflake, or dimensional</li>
              <li>Captures Set Analysis, LOD expressions, and parameter logic</li>
              <li>Persists extracted metadata to MongoDB for downstream agents</li>
            </ul>
            <button
              onClick={() => onSelectStage('metadata')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 hover:text-cyan-900 transition-colors cursor-pointer"
            >
              <span>Inspect Extracted AST Tree</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── 3. Convergence Agent ── Text Left, Image Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 block mb-2">
              03 · Convergence Stage
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-950 font-display mb-4">
              Convergence Agent
            </h3>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
              The Convergence Agent is backed by Azure OpenAI or Groq. It reads the parsed AST, translates every Qlik measure and Tableau calculated field into optimised DAX, then passes each result through <strong>DAX Guard™</strong> — a static validator that rejects unbalanced parentheses, hallucinated table names, forbidden functions, and missing return clauses.
            </p>
            <ul className="text-sm text-gray-600 space-y-1 mb-6 list-disc list-inside">
              <li>Converts Qlik Set Analysis &amp; LOD expressions to DAX measures</li>
              <li>DAX Guard™ validates every expression before acceptance</li>
              <li>Maps visuals, connections, relationships, and dimensions</li>
              <li>Produces confidence scores and diagnostic info per measure</li>
            </ul>
            <button
              onClick={() => onSelectStage('convergence')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 hover:text-cyan-900 transition-colors cursor-pointer"
            >
              <span>View DAX Guard Translations</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white">
              <div className="bg-white p-5">
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-50 px-5 py-3 border-b border-gray-200 flex justify-between items-center">
                    <h4 className="text-sm font-bold text-gray-800">Mapping Results</h4>
                    <div className="text-[10px] text-gray-400">
                      <span className="font-semibold text-gray-700">Application Name:</span> City Hospital Analysis V2 &nbsp;·&nbsp;
                      <span className="font-semibold text-gray-700">Mapped Fields:</span> 14
                    </div>
                  </div>
                  <div className="p-4">
                    {/* Tabs */}
                    <div className="flex gap-0 border-b border-gray-200 mb-4 text-[11px] font-semibold">
                      {['Overview', 'Tables/Fields', 'Measures', 'Relationships', 'Visualisations', 'Calculated Columns'].map((tab, i) => (
                        <span key={tab} className={`px-2.5 py-1.5 cursor-pointer ${i === 2 ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}>{tab}</span>
                      ))}
                    </div>

                    <table className="w-full text-[10px]">
                      <thead>
                        <tr className="text-gray-400 border-b border-gray-100 text-left">
                          <th className="py-1 font-semibold">Table</th>
                          <th className="py-1 font-semibold">Fields</th>
                          <th className="py-1 font-semibold">Qlik</th>
                          <th className="py-1 font-semibold">Power BI</th>
                          <th className="py-1 font-semibold">Confidence</th>
                          <th className="py-1 font-semibold">Info</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { table: 'BILLS', field: 'Insurance Covered', qlik: 'Sum(INSURANCE_CO VERED)', pbi: 'SUM(BILLS[INSURAN CE_COVERED])', conf: 99 },
                          { table: 'BILLS', field: 'Total Revenue', qlik: 'Sum(TOTAL_AMOUNT)', pbi: 'SUM(BILLS[TOTAL_A MOUNT])', conf: 98 },
                          { table: 'BILLS', field: 'Total Billing Amount', qlik: 'Sum(INSURANCE_CO VERED + ...)', pbi: 'Complex DAX...', conf: 95 },
                          { table: 'BILLS', field: 'Total Bill', qlik: 'Count(BILL_ID)', pbi: 'COUNTBILLS[BILL_])', conf: 97 },
                        ].map(({ table, field, qlik, pbi, conf }) => (
                          <tr key={field} className="border-b border-gray-50 hover:bg-gray-50">
                            <td className="py-1.5 font-medium text-gray-700">{table}</td>
                            <td className="py-1.5 text-gray-600">{field}</td>
                            <td className="py-1.5 font-mono text-gray-500 text-[9px]">{qlik}</td>
                            <td className="py-1.5 font-mono text-gray-500 text-[9px]">{pbi}</td>
                            <td className="py-1.5">
                              <span className={`inline-flex items-center justify-center w-7 h-5 rounded text-[9px] font-bold ${conf >= 97 ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700'}`}>{conf}</span>
                            </td>
                            <td className="py-1.5 text-blue-500 text-[10px] cursor-pointer">Details</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 4. BI Engineering Agent ── Image Left, Text Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 order-1">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white">
              <div className="bg-white p-5">
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-50 px-5 py-3 border-b border-gray-200">
                    <div className="flex gap-4 text-[11px] font-semibold">
                      {['Configurations', 'Results'].map((tab, i) => (
                        <span key={tab} className={`pb-0.5 cursor-pointer ${i === 1 ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-400'}`}>{tab}</span>
                      ))}
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-[11px] font-bold text-gray-700 mb-1">Processing Results</p>
                    <p className="text-[10px] text-gray-400 mb-3">Select Application: City Hospital Analysis V2</p>

                    <div className="flex gap-3 text-[10px] font-semibold mb-4 border-b border-gray-100 pb-2">
                      {['Assessment Results', 'Parsing Results', 'Mapping Results', 'Report Generation Results'].map((tab, i) => (
                        <span key={tab} className={`cursor-pointer pb-1 ${i === 3 ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-400'}`}>{tab}</span>
                      ))}
                    </div>

                    <p className="text-xs font-bold text-blue-600 mb-4">Report Generation Results</p>

                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div>
                        <p className="text-[10px] text-gray-400 mb-0.5">Application Name</p>
                        <p className="text-xs font-bold text-gray-900">City Hospital Analysis V2</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 mb-0.5">Workspace Name</p>
                        <p className="text-xs font-bold text-gray-900">Healthcare</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 mb-0.5">Generated Status</p>
                        <p className="text-xs font-bold text-emerald-600">Success</p>
                      </div>
                    </div>

                    <div className="flex gap-4 text-[10px] font-semibold border-b border-gray-100 mb-3 pb-1">
                      {['Summary', 'Transformations'].map((tab, i) => (
                        <span key={tab} className={`cursor-pointer ${i === 0 ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-400'}`}>{tab}</span>
                      ))}
                    </div>

                    <p className="text-[11px] font-bold text-gray-700 mb-2">Generation Summary</p>
                    <div className="flex items-start gap-2 bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                      <div className="w-4 h-4 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <span className="text-white text-[8px] font-bold">✓</span>
                      </div>
                      <p className="text-[10px] text-gray-700 leading-relaxed">
                        <strong>Generation Status:</strong> Report ready. The migrated data is saved in the folder <span className="font-mono text-blue-600">City_Hospital_Analysis_V2_20200916_204000</span> which is deployed to the workspace <strong>Healthcare</strong>.
                        <br /><span className="text-blue-500 cursor-pointer">View Report in Microsoft Fabric →</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 order-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 block mb-2">
              04 · BI Engineering Stage
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-950 font-display mb-4">
              BI Engineering Agent
            </h3>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
              The BI Engineering Agent reads the validated mapping from MongoDB and compiles production-ready Microsoft Fabric artefacts: <strong>TMDL semantic models</strong>, Direct Lake Delta table schemas across Bronze-Silver-Gold layers, and <strong>PBIR report definitions</strong>. It then performs an atomic GitHub Git Data API push (blobs → tree → commit → ref) directly into the target Fabric workspace folder with zero partial commits.
            </p>
            <ul className="text-sm text-gray-600 space-y-1 mb-6 list-disc list-inside">
              <li>Generates TMDL semantic models and PBIR visual definitions</li>
              <li>Deploys atomically to GitHub / Microsoft Fabric via Git API</li>
              <li>Supports Qlik inline mapping and Tableau MongoDB retrieval modes</li>
              <li>Returns workspace name, folder path, and generation status</li>
            </ul>
            <button
              onClick={() => onSelectStage('bi_engineering')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 hover:text-cyan-900 transition-colors cursor-pointer"
            >
              <span>Inspect Compiled TMDL &amp; PBIR</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── 5. Quality Assurance Agent ── Text Left, Image Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 block mb-2">
              05 · Quality Assurance Stage
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-950 font-display mb-4">
              Quality Assurance Agent
            </h3>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
              The Quality Assurance Agent runs a dual-engine validation combining isolated Qlik and Tableau validators. It executes row-level metric reconciliation between source and Microsoft Fabric Direct Lake endpoints, checks visual fidelity, layout accuracy, and DAX semantic correctness, and issues a signed audit certificate on zero-drift verification.
            </p>
            <ul className="text-sm text-gray-600 space-y-1 mb-6 list-disc list-inside">
              <li>Dual-engine: isolated Qlik and Tableau validators in one service</li>
              <li>Row-level metric reconciliation against Fabric Direct Lake</li>
              <li>Checks visual layout, formatting, and interactivity fidelity</li>
              <li>Issues official audit certificate on successful verification</li>
            </ul>
            <button
              onClick={() => onSelectStage('quality_assurance')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 hover:text-cyan-900 transition-colors cursor-pointer"
            >
              <span>View Validation Report</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white">
              <div className="bg-white p-5">
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-50 px-5 py-3 border-b border-gray-200">
                    <h4 className="text-sm font-bold text-gray-800">Validation Report</h4>
                  </div>
                  <div className="p-5">
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div>
                        <p className="text-[10px] text-gray-400 mb-0.5">Application</p>
                        <p className="text-xs font-bold text-gray-900">City Hospital Analysis V2</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 mb-0.5">Platform</p>
                        <p className="text-xs font-bold text-gray-900">Qlik → Microsoft Fabric</p>
                      </div>
                    </div>

                    {/* Validation checks */}
                    <div className="space-y-2 mb-4">
                      {[
                        { label: 'Row-level metric reconciliation', status: 'Pass', drift: '0 rows drift' },
                        { label: 'DAX semantic correctness (DAX Guard)', status: 'Pass', drift: '14/14 measures valid' },
                        { label: 'Visual layout fidelity check', status: 'Pass', drift: 'Pixel-accurate match' },
                        { label: 'Direct Lake endpoint connectivity', status: 'Pass', drift: 'Latency: 42ms' },
                        { label: 'Interactivity & filter propagation', status: 'Pass', drift: 'All slicers verified' },
                      ].map(({ label, status, drift }) => (
                        <div key={label} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                          <div>
                            <p className="text-[10px] font-semibold text-gray-700">{label}</p>
                            <p className="text-[9px] text-gray-400">{drift}</p>
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">{status}</span>
                        </div>
                      ))}
                    </div>

                    {/* Audit cert */}
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold">✓</span>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-emerald-800">Audit Certificate Issued</p>
                        <p className="text-[10px] text-emerald-600">28/28 assertions verified · Zero drift · Fabric Direct Lake Ready</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
