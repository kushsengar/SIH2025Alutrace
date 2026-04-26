export type ModelStatus = 'idle' | 'running' | 'success' | 'error';

export type ModelId = 
  | 'gap-filling'
  | 'ef-selector'
  | 'surrogate-refining'
  | 'surrogate-smelting'
  | 'surrogate-recycling'
  | 'circularity'
  | 'forecast-demand'
  | 'forecast-grid'
  | 'forecast-renewable'
  | 'anomaly'
  | 'optimizer'
  | 'rag';

export interface ModelMetrics {
  processingTime?: number;
  confidence?: number;
  accuracy?: number;
  completeness?: number;
}

export interface ModelNode {
  id: ModelId;
  title: string;
  description: string;
  category: string;
  status: ModelStatus;
  metrics?: ModelMetrics;
  position: { x: number; y: number };
  color: string;
}

export interface ScenarioParameters {
  recycledContent: number; // 0-100%
  electricityKwhPerT: number;
  gridRenewablePct: number; // 0-100%
  productionTonnes: number;
  region: string;
  year: number;
  wasteKgPerT?: number;
  transportKm?: number;
}

export interface Scenario {
  id: string;
  name: string;
  description?: string;
  parameters: ScenarioParameters;
  createdAt: string;
  modifiedAt: string;
}

export interface RequestPayload {
  model: ModelId;
  scenario: Scenario;
  parameters?: Record<string, any>;
}

export interface ResponsePayload {
  model: ModelId;
  status: 'success' | 'error';
  data?: any;
  error?: string;
  processingTimeMs?: number;
  confidence?: number;
}

export interface PipelineState {
  selectedScenarioId: string;
  scenarios: Scenario[];
  activeModelId: ModelId | null;
  flowStatus: 'idle' | 'running' | 'complete' | 'error';
  compareMode: boolean;
  compareScenarioId?: string;
  request?: RequestPayload;
  response?: ResponsePayload;
  metrics: {
    totalProcessingTime: number;
    modelsCompleted: number;
    dataPoints: number;
    confidenceScore: number;
  };
  errors: string[];
}

// Model Metadata with centered and aligned positions
export const MODEL_METADATA: Record<ModelId, Omit<ModelNode, 'status' | 'metrics'>> = {
  'gap-filling': {
    id: 'gap-filling',
    title: 'Gap-Filling Ensemble',
    description: 'Predicts missing LCI parameters using XGBoost, Random Forest, and Neural Network ensemble',
    category: 'Data Processing',
    position: { x: 150, y: 300 },
    color: '#3b82f6'
  },
  'ef-selector': {
    id: 'ef-selector',
    title: 'Emission Factor Selector',
    description: 'Selects optimal emission factors using multi-criteria decision analysis',
    category: 'Factors',
    position: { x: 380, y: 300 },
    color: '#10b981'
  },
  'surrogate-refining': {
    id: 'surrogate-refining',
    title: 'Alumina Refining',
    description: 'Fast ML surrogate for Bayer process simulation',
    category: 'Process Surrogates',
    position: { x: 610, y: 180 },
    color: '#f97316'
  },
  'surrogate-smelting': {
    id: 'surrogate-smelting',
    title: 'Hall-Héroult Smelting',
    description: 'Fast ML surrogate for aluminium smelting process',
    category: 'Process Surrogates',
    position: { x: 610, y: 300 },
    color: '#8b5cf6'
  },
  'surrogate-recycling': {
    id: 'surrogate-recycling',
    title: 'Recycling Remelt',
    description: 'Fast ML surrogate for secondary aluminium production',
    category: 'Process Surrogates',
    position: { x: 610, y: 420 },
    color: '#10b981'
  },
  'circularity': {
    id: 'circularity',
    title: 'Circularity Metrics',
    description: 'Calculates Material Circularity Indicator and related metrics',
    category: 'Circularity',
    position: { x: 840, y: 300 },
    color: '#14b8a6'
  },
  'forecast-demand': {
    id: 'forecast-demand',
    title: 'Demand Forecast',
    description: 'Time-series forecasting for aluminium demand',
    category: 'Forecasting',
    position: { x: 380, y: 420 },
    color: '#6366f1'
  },
  'forecast-grid': {
    id: 'forecast-grid',
    title: 'Grid CO₂ Forecast',
    description: 'Regional grid carbon intensity predictions',
    category: 'Forecasting',
    position: { x: 380, y: 520 },
    color: '#6366f1'
  },
  'forecast-renewable': {
    id: 'forecast-renewable',
    title: 'Renewable Mix',
    description: 'Renewable energy share forecasting',
    category: 'Forecasting',
    position: { x: 150, y: 470 },
    color: '#6366f1'
  },
  'anomaly': {
    id: 'anomaly',
    title: 'Anomaly Checker',
    description: 'Detects data quality issues and anomalies',
    category: 'Validation',
    position: { x: 1070, y: 200 },
    color: '#ef4444'
  },
  'optimizer': {
    id: 'optimizer',
    title: 'Multi-Objective Optimizer',
    description: 'Bayesian optimization for sustainability targets',
    category: 'Optimization',
    position: { x: 1070, y: 350 },
    color: '#f59e0b'
  },
  'rag': {
    id: 'rag',
    title: 'RAG Assistant',
    description: 'Retrieval-Augmented Generation for validation and citations',
    category: 'Intelligence',
    position: { x: 1070, y: 500 },
    color: '#a855f7'
  }
};

// Sample scenarios based on the HTML demo
export const DEFAULT_SCENARIOS: Scenario[] = [
  {
    id: 'default',
    name: 'Default (India Aluminium)',
    description: 'Standard aluminium production in India with mixed grid',
    parameters: {
      recycledContent: 35,
      electricityKwhPerT: 14200,
      gridRenewablePct: 28,
      productionTonnes: 120000,
      region: 'IN',
      year: 2025,
      wasteKgPerT: 430,
      transportKm: 200
    },
    createdAt: new Date().toISOString(),
    modifiedAt: new Date().toISOString()
  },
  {
    id: 'high-recycling',
    name: 'High Recycling (90%)',
    description: 'Optimized for maximum recycled content',
    parameters: {
      recycledContent: 90,
      electricityKwhPerT: 12500,
      gridRenewablePct: 35,
      productionTonnes: 120000,
      region: 'EU',
      year: 2025,
      wasteKgPerT: 180,
      transportKm: 150
    },
    createdAt: new Date().toISOString(),
    modifiedAt: new Date().toISOString()
  },
  {
    id: 'renewable-grid',
    name: '100% Renewable Grid',
    description: 'Production with fully renewable electricity',
    parameters: {
      recycledContent: 50,
      electricityKwhPerT: 14200,
      gridRenewablePct: 100,
      productionTonnes: 100000,
      region: 'NO',
      year: 2025,
      wasteKgPerT: 290,
      transportKm: 100
    },
    createdAt: new Date().toISOString(),
    modifiedAt: new Date().toISOString()
  }
];
