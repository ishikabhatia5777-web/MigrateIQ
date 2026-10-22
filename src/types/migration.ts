export type Platform = 'tableau' | 'qlik';

export type PipelineStage = 
  | 'diagnostic'
  | 'metadata'
  | 'convergence'
  | 'bi_engineering'
  | 'quality_assurance';

export interface BlockerItem {
  id: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  component: string;
  description: string;
  recommendedResolution: string;
}

export interface DiagnosticData {
  appName: string;
  sourceFormat: string;
  readinessScore: number; // 0 - 100
  complexityScore: number; // 0 - 100
  complexityBand: 'Simple' | 'Moderate' | 'Complex' | 'Enterprise Heavy';
  stats: {
    totalSheets: number;
    dashboards: number;
    calculatedFields: number;
    parameters: number;
    lodOrSetExpressions: number;
    dataSourcesCount: number;
    customSqlCount: number;
  };
  blockers: BlockerItem[];
  effort: {
    manualDays: number;
    agenticMinutes: number;
    hoursSaved: number;
    estimatedCostSavingsUsd: number;
  };
}

export interface AstNode {
  id: string;
  name: string;
  type: 'datasource' | 'worksheet' | 'dashboard' | 'calculated_field' | 'parameter' | 'filter';
  children?: AstNode[];
  details?: Record<string, any>;
}

export interface MetadataData {
  appName: string;
  astTree: AstNode[];
  dataSources: {
    name: string;
    type: string;
    targetFabricDirectLake: string;
    tableCount: number;
    columnsCount: number;
    rowCountEstimate: string;
  }[];
  extractedCalculations: {
    name: string;
    datatype: string;
    rawExpression: string;
    dependencies: string[];
  }[];
  visualContainers: {
    id: string;
    title: string;
    type: string;
    sheet: string;
    dimensions: string[];
    measures: string[];
  }[];
}

export interface DaxTranslationItem {
  id: string;
  sourceField: string;
  sourceType: 'tableau_lod' | 'qlik_set_analysis' | 'calculated_field' | 'window_function';
  sourceFormula: string;
  intermediateRepresentation: string;
  targetDax: string;
  confidence: number; // 0 - 100
  daxGuardStatus: 'PASSED' | 'VERIFIED' | 'SYNTAX_OPTIMIZED';
  ruleApplied: string;
  explanation: string;
}

export interface VisualMappingItem {
  id: string;
  sourceVisual: string;
  targetFabricVisual: string;
  fieldRolesMapped: {
    category?: string;
    values?: string;
    series?: string;
    tooltips?: string;
  };
  confidence: number;
}

export interface ConvergenceData {
  semanticModelName: string;
  directLakeStrategy: 'Direct Lake (Bronze -> Silver -> Gold)' | 'Direct Lake Hybrid';
  daxTranslations: DaxTranslationItem[];
  visualMappings: VisualMappingItem[];
  relationships: {
    fromTable: string;
    fromColumn: string;
    toTable: string;
    toColumn: string;
    cardinality: 'oneToMany' | 'manyToOne' | 'oneToOne';
    isActive: boolean;
  }[];
  averageConfidence: number;
}

export interface BiEngineeringData {
  pbirDefinition: {
    version: string;
    datasetReference: {
      byPath: {
        path: string;
      };
      byConnection: any;
    };
    visualContainers: Array<{
      id: string;
      name: string;
      visualType: string;
      config: Record<string, any>;
    }>;
  };
  tmdlFiles: Record<string, string>;
  deltaSchemas: {
    layer: 'Bronze' | 'Silver' | 'Gold';
    tableName: string;
    format: string;
    partitionColumn?: string;
    storageUrl: string;
  }[];
  deploymentTarget: {
    workspace: string;
    lakehouse: string;
    sqlEndpoint: string;
    directLakeStatus: 'READY_TO_SYNC' | 'DEPLOYED';
  };
  bundleSizeKb: number;
}

export interface ReconciliationRow {
  kpiName: string;
  sourceValue: string | number;
  fabricDirectLakeValue: string | number;
  variancePct: number;
  status: 'EXACT_MATCH' | 'WITHIN_TOLERANCE' | 'REVIEW';
}

export interface QualityAssuranceData {
  overallFidelityScore: number;
  visualAccuracyScore: number;
  dataReconciliationScore: number;
  status: 'CERTIFIED_READY' | 'CONDITIONAL_PASS';
  reconciliations: ReconciliationRow[];
  testSuite: {
    totalTests: number;
    passed: number;
    warned: number;
    failed: number;
  };
  regressionChecks: {
    sheet: string;
    visual: string;
    layoutDriftPx: number;
    colorParityPct: number;
    interactionParity: '100% Native' | 'Direct Lake Equivalent';
  }[];
  auditCertificateId: string;
  timestamp: string;
}

export interface TelemetryLog {
  id: string;
  timestamp: string;
  agent: 'Diagnostic Agent' | 'Metadata Parser' | 'Convergence Kernel' | 'BI Engineering' | 'Quality Assurance' | 'Orchestrator';
  level: 'INFO' | 'SUCCESS' | 'AGENT_THOUGHT' | 'WARN';
  message: string;
}

export interface ProjectData {
  id: string;
  name: string;
  platform: Platform;
  sourceFile: string;
  sourceSize: string;
  diagnostic: DiagnosticData;
  metadata: MetadataData;
  convergence: ConvergenceData;
  biEngineering: BiEngineeringData;
  qualityAssurance: QualityAssuranceData;
}
