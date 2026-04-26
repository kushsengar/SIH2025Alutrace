import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Tab,
  Tabs,
  Button,
  Chip,
  Alert,
  Stack,
  IconButton,
  Tooltip,
  CircularProgress,
  LinearProgress,
  Divider,
} from '@mui/material';
import {
  Timeline,
  PlayArrow,
  Refresh,
  Share,
  Download,
  Help,
  Speed,
  CheckCircle,
  Error as ErrorIcon,
  AutoAwesome,
  Psychology,
  Loop,
} from '@mui/icons-material';
import { 
  ModelId, 
  Scenario, 
  DEFAULT_SCENARIOS,
  MODEL_METADATA,
  ModelStatus,
  ScenarioParameters
} from '../state/aipipeline/types';
import PipelineGraph from '../components/aipipeline/PipelineGraph';
import ScenarioSelector from '../components/aipipeline/ScenarioSelector';
import ParameterSliders from '../components/aipipeline/ParameterSliders';
import ModelDetails from '../components/aipipeline/ModelDetails';
import JSONPanel from '../components/aipipeline/JSONPanel';
import MetricsPanel from '../components/aipipeline/MetricsPanel';
import HelpOverlay from '../components/aipipeline/HelpOverlay';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`pipeline-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </div>
  );
}

const AIPipeline: React.FC = () => {
  // State management
  const [scenarios, setScenarios] = useState<Scenario[]>(DEFAULT_SCENARIOS);
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('default');
  const [activeModelId, setActiveModelId] = useState<ModelId | null>('gap-filling');
  const [tabValue, setTabValue] = useState(0);
  const [pipelineRunning, setPipelineRunning] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [modelStatuses, setModelStatuses] = useState<Record<ModelId, ModelStatus>>({} as Record<ModelId, ModelStatus>);
  const [progress, setProgress] = useState(0);
  
  // Metrics state
  const [metrics, setMetrics] = useState({
    totalProcessingTime: 0,
    modelsCompleted: 0,
    dataPoints: 0,
    confidenceScore: 0,
    emissionFactor: 0,
    circularityIndex: 0,
  });

  // Initialize model statuses
  useEffect(() => {
    const initialStatuses: Record<ModelId, ModelStatus> = {} as Record<ModelId, ModelStatus>;
    Object.keys(MODEL_METADATA).forEach((modelId) => {
      initialStatuses[modelId as ModelId] = 'idle';
    });
    setModelStatuses(initialStatuses);
  }, []);

  const selectedScenario = scenarios.find(s => s.id === selectedScenarioId) || scenarios[0];

  const handleScenarioChange = (scenarioId: string) => {
    setSelectedScenarioId(scenarioId);
  };

  const handleParameterUpdate = (param: keyof ScenarioParameters, value: number) => {
    setScenarios(prev => prev.map(s => 
      s.id === selectedScenarioId 
        ? {
            ...s,
            parameters: { ...s.parameters, [param]: value },
            modifiedAt: new Date().toISOString()
          }
        : s
    ));
  };

  const handleModelClick = (modelId: ModelId) => {
    setActiveModelId(modelId);
    if (tabValue === 0) {
      setTabValue(1); // Switch to details tab
    }
  };

  const runPipeline = async () => {
    if (pipelineRunning) return;
    
    setPipelineRunning(true);
    setProgress(0);
    setMetrics({
      totalProcessingTime: 0,
      modelsCompleted: 0,
      dataPoints: 0,
      confidenceScore: 0,
      emissionFactor: 0,
      circularityIndex: 0,
    });

    const modelSequence: ModelId[] = [
      'gap-filling',
      'ef-selector',
      'surrogate-refining',
      'surrogate-smelting',
      'surrogate-recycling',
      'circularity',
      'forecast-demand',
      'forecast-grid',
      'anomaly',
      'optimizer',
      'rag'
    ];

    for (let i = 0; i < modelSequence.length; i++) {
      const modelId = modelSequence[i];
      
      // Update status to running
      setModelStatuses(prev => ({ ...prev, [modelId]: 'running' }));
      setActiveModelId(modelId);
      
      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
      
      // Update status to success
      setModelStatuses(prev => ({ ...prev, [modelId]: 'success' }));
      
      // Update metrics
      setMetrics(prev => ({
        ...prev,
        totalProcessingTime: prev.totalProcessingTime + 100 + Math.random() * 200,
        modelsCompleted: prev.modelsCompleted + 1,
        dataPoints: prev.dataPoints + Math.floor(Math.random() * 1000),
        confidenceScore: 75 + Math.random() * 20,
        emissionFactor: selectedScenario.parameters.recycledContent > 50 ? 8.5 : 11.8,
        circularityIndex: 0.3 + selectedScenario.parameters.recycledContent * 0.005,
      }));
      
      setProgress((i + 1) / modelSequence.length * 100);
    }
    
    setPipelineRunning(false);
  };

  const resetPipeline = () => {
    const resetStatuses: Record<ModelId, ModelStatus> = {} as Record<ModelId, ModelStatus>;
    Object.keys(MODEL_METADATA).forEach((modelId) => {
      resetStatuses[modelId as ModelId] = 'idle';
    });
    setModelStatuses(resetStatuses);
    setProgress(0);
    setMetrics({
      totalProcessingTime: 0,
      modelsCompleted: 0,
      dataPoints: 0,
      confidenceScore: 0,
      emissionFactor: 0,
      circularityIndex: 0,
    });
  };

  const getStatusIcon = (status: ModelStatus) => {
    switch (status) {
      case 'running':
        return <Loop sx={{ animation: 'spin 1s linear infinite' }} />;
      case 'success':
        return <CheckCircle color="success" />;
      case 'error':
        return <ErrorIcon color="error" />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <AutoAwesome sx={{ fontSize: 32, color: 'primary.main' }} />
            <Box>
              <Typography variant="h4" fontWeight="bold">
                AI/ML Pipeline Explorer
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Interactive LCA analysis pipeline with 13 ML models
              </Typography>
            </Box>
          </Box>
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              startIcon={pipelineRunning ? <Loop /> : <PlayArrow />}
              onClick={runPipeline}
              disabled={pipelineRunning}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5569d8 0%, #6a4190 100%)',
                }
              }}
            >
              {pipelineRunning ? 'Running...' : 'Run Pipeline'}
            </Button>
            <IconButton onClick={resetPipeline} disabled={pipelineRunning}>
              <Refresh />
            </IconButton>
            <IconButton onClick={() => setHelpOpen(true)}>
              <Help />
            </IconButton>
            <IconButton>
              <Share />
            </IconButton>
            <IconButton>
              <Download />
            </IconButton>
          </Stack>
        </Box>

        {/* Progress Bar */}
        {pipelineRunning && (
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ 
              height: 8, 
              borderRadius: 4,
              background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
              '& .MuiLinearProgress-bar': {
                background: 'linear-gradient(90deg, #10b981, #14b8a6)',
              }
            }}
          />
        )}
      </Box>

      {/* Scenario and Parameters */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <ScenarioSelector
              scenarios={scenarios}
              selectedScenarioId={selectedScenarioId}
              onScenarioChange={handleScenarioChange}
              onAddScenario={() => {}}
              disabled={pipelineRunning}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <ParameterSliders
              parameters={selectedScenario.parameters}
              onParameterChange={handleParameterUpdate}
              disabled={pipelineRunning}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Main Content Area - Full Size Pipeline */}
      <Paper sx={{ p: 3, mb: 3, height: 'calc(100vh - 380px)', minHeight: '600px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            Pipeline Flow
          </Typography>
          <Stack direction="row" spacing={1}>
            <Chip 
              size="small" 
              icon={<Speed />} 
              label={`${metrics.totalProcessingTime.toFixed(0)}ms`} 
            />
            <Chip 
              size="small" 
              icon={<Psychology />} 
              label={`${metrics.modelsCompleted}/11 models`} 
            />
          </Stack>
        </Box>
        <Box sx={{ height: 'calc(100% - 50px)' }}>
          <PipelineGraph
            models={MODEL_METADATA}
            activeModelId={activeModelId}
            modelStatuses={modelStatuses}
            onModelClick={handleModelClick}
          />
        </Box>
      </Paper>

      {/* Bottom: Details Panel */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ height: '400px', overflow: 'hidden' }}>
            <Tabs 
              value={tabValue} 
              onChange={(_, v) => setTabValue(v)}
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab label="Overview" />
              <Tab label="Model Details" />
              <Tab label="JSON I/O" />
              <Tab label="Metrics" />
            </Tabs>

            <Box sx={{ height: 'calc(100% - 48px)', overflow: 'auto' }}>
              <TabPanel value={tabValue} index={0}>
                <Box sx={{ p: 2 }}>
                  <Alert severity="info" sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Current Scenario: {selectedScenario.name}
                    </Typography>
                    <Typography variant="body2">
                      {selectedScenario.description}
                    </Typography>
                  </Alert>
                  
                  <Typography variant="h6" gutterBottom>
                    Key Parameters
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Recycled Content
                      </Typography>
                      <Typography variant="h6">
                        {selectedScenario.parameters.recycledContent}%
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Grid Renewable
                      </Typography>
                      <Typography variant="h6">
                        {selectedScenario.parameters.gridRenewablePct}%
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Electricity Use
                      </Typography>
                      <Typography variant="h6">
                        {selectedScenario.parameters.electricityKwhPerT.toLocaleString()} kWh/t
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Production
                      </Typography>
                      <Typography variant="h6">
                        {selectedScenario.parameters.productionTonnes.toLocaleString()} t/year
                      </Typography>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="h6" gutterBottom>
                    Pipeline Status
                  </Typography>
                  {Object.entries(modelStatuses).slice(0, 5).map(([modelId, status]) => {
                    const model = MODEL_METADATA[modelId as ModelId];
                    return (
                      <Box 
                        key={modelId}
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 1, 
                          mb: 1,
                          p: 1,
                          borderRadius: 1,
                          bgcolor: activeModelId === modelId ? 'action.selected' : 'transparent',
                          cursor: 'pointer',
                          '&:hover': { bgcolor: 'action.hover' }
                        }}
                        onClick={() => handleModelClick(modelId as ModelId)}
                      >
                        {getStatusIcon(status)}
                        <Typography variant="body2" sx={{ flexGrow: 1 }}>
                          {model.title}
                        </Typography>
                        <Chip 
                          size="small" 
                          label={model.category}
                          sx={{ bgcolor: `${model.color}20`, color: model.color }}
                        />
                      </Box>
                    );
                  })}
                </Box>
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                {activeModelId && (
                  <ModelDetails
                    model={MODEL_METADATA[activeModelId]}
                    scenario={selectedScenario}
                    status={modelStatuses[activeModelId]}
                  />
                )}
              </TabPanel>

              <TabPanel value={tabValue} index={2}>
                <JSONPanel
                  request={{
                    model: activeModelId || 'gap-filling',
                    scenario: selectedScenario,
                  }}
                  response={{
                    model: activeModelId || 'gap-filling',
                    status: 'success',
                    data: {
                      confidence: metrics.confidenceScore / 100,
                      processingTimeMs: metrics.totalProcessingTime,
                    }
                  }}
                />
              </TabPanel>

              <TabPanel value={tabValue} index={3}>
                <MetricsPanel metrics={metrics} />
              </TabPanel>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Help Overlay */}
      <HelpOverlay open={helpOpen} onClose={() => setHelpOpen(false)} />
    </Container>
  );
};

export default AIPipeline;
