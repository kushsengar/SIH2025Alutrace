import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Alert,
  LinearProgress,
  Tooltip,
  Fade,
  Zoom
} from '@mui/material';
import {
  CloudUpload,
  Assessment,
  Storage,
  Api,
  Dashboard,
  CheckCircle,
  DataObject,
  Security,
  Speed,
  Timeline,
  ArrowForward,
  Factory,
  Recycling,
  WaterDrop,
  Co2,
  ElectricBolt,
  LocalShipping,
  Engineering,
  AutoGraph,
  FileDownload,
  Share,
  VerifiedUser,
  IntegrationInstructions,
  ModelTraining,
  Analytics
} from '@mui/icons-material';

interface StageData {
  title: string;
  description: string;
  icon: React.ReactElement;
  color: string;
  inputs: string[];
  outputs: string[];
  technologies: string[];
  apiEndpoints?: string[];
  metrics?: { label: string; value: string }[];
}

const SystemFlow: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [expandedStage, setExpandedStage] = useState<number | null>(0);

  const stages: StageData[] = [
    {
      title: 'Stage 1: Data Capture & Input',
      description: 'Collection of raw data from multiple sources including plant operations, supply chain, and external databases',
      icon: <CloudUpload />,
      color: '#4CAF50',
      inputs: [
        'ERP/SCADA Systems',
        'CSV/Excel Files',
        'IoT Sensors',
        'Manual Entry Forms',
        'API Integrations'
      ],
      outputs: [
        'Structured Data Sets',
        'Metadata Tags',
        'Timestamp Records',
        'Source Attribution'
      ],
      technologies: ['Apache Airflow', 'Pandas', 'REST APIs', 'WebSockets'],
      apiEndpoints: ['/api/upload', '/api/import', '/api/stream'],
      metrics: [
        { label: 'Data Points/Day', value: '1M+' },
        { label: 'Sources', value: '15+' },
        { label: 'Latency', value: '<100ms' }
      ]
    },
    {
      title: 'Stage 2: Processing & Validation',
      description: 'Data cleaning, normalization, validation, and enrichment with ML-based gap filling',
      icon: <Assessment />,
      color: '#2196F3',
      inputs: [
        'Raw Data Streams',
        'Business Rules',
        'Quality Thresholds',
        'Historical Patterns'
      ],
      outputs: [
        'Validated Data',
        'Quality Scores',
        'Anomaly Reports',
        'Gap-Filled Values'
      ],
      technologies: ['XGBoost', 'Scikit-learn', 'NumPy', 'TensorFlow'],
      apiEndpoints: ['/api/validate', '/api/gapfill', '/api/normalize'],
      metrics: [
        { label: 'Accuracy', value: '95%+' },
        { label: 'Coverage', value: '98%' },
        { label: 'Processing', value: '<2s' }
      ]
    },
    {
      title: 'Stage 3: Storage & Management',
      description: 'Secure, scalable data storage with versioning, indexing, and blockchain verification',
      icon: <Storage />,
      color: '#FF9800',
      inputs: [
        'Processed Data',
        'Metadata',
        'Relationships',
        'Audit Logs'
      ],
      outputs: [
        'Indexed Records',
        'Query Results',
        'Data Snapshots',
        'Compliance Reports'
      ],
      technologies: ['PostgreSQL', 'Redis', 'S3', 'Blockchain'],
      apiEndpoints: ['/api/store', '/api/query', '/api/audit'],
      metrics: [
        { label: 'Storage', value: '10TB+' },
        { label: 'Queries/sec', value: '1000+' },
        { label: 'Uptime', value: '99.9%' }
      ]
    },
    {
      title: 'Stage 4: APIs & Integrations',
      description: 'RESTful APIs, real-time connections with external systems and third-party services',
      icon: <Api />,
      color: '#9C27B0',
      inputs: [
        'API Requests',
        'Authentication Tokens',
        'Query Parameters',
        'Webhooks'
      ],
      outputs: [
        'JSON Responses',
        'Event Streams',
        'Notifications',
        'Integration Status'
      ],
      technologies: ['FastAPI', 'GraphQL', 'WebSockets', 'OAuth2'],
      apiEndpoints: ['/api/emission-factors', '/api/lca/run', '/api/scenarios'],
      metrics: [
        { label: 'Endpoints', value: '50+' },
        { label: 'Response', value: '<200ms' },
        { label: 'Rate Limit', value: '1000/min' }
      ]
    },
    {
      title: 'Stage 5: Output & User Experience',
      description: 'Interactive dashboards, visualizations, reports, and actionable insights',
      icon: <Dashboard />,
      color: '#F44336',
      inputs: [
        'Calculated Results',
        'User Preferences',
        'Report Templates',
        'Export Formats'
      ],
      outputs: [
        'Interactive Dashboards',
        'PDF Reports',
        'Excel Exports',
        'API Responses',
        'Email Notifications'
      ],
      technologies: ['React', 'D3.js', 'Chart.js', 'Material-UI'],
      apiEndpoints: ['/api/dashboard', '/api/export', '/api/share'],
      metrics: [
        { label: 'Load Time', value: '<1s' },
        { label: 'Visualizations', value: '20+' },
        { label: 'Export Formats', value: '5+' }
      ]
    }
  ];

  const processFlows = [
    { from: 'Mining', to: 'Refining', impact: 'High Energy', color: '#FF5722' },
    { from: 'Refining', to: 'Smelting', impact: 'High Emissions', color: '#F44336' },
    { from: 'Smelting', to: 'Fabrication', impact: 'Medium Energy', color: '#FF9800' },
    { from: 'Fabrication', to: 'Use Phase', impact: 'Low Impact', color: '#4CAF50' },
    { from: 'Use Phase', to: 'Recycling', impact: 'Recovery', color: '#2196F3' }
  ];

  const handleStepClick = (step: number) => {
    setActiveStep(step);
    setExpandedStage(expandedStage === step ? null : step);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          mb: 4,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}
      >
        <Typography variant="h3" gutterBottom fontWeight="bold">
          AluTrace System Flow
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9 }}>
          End-to-End Life Cycle Assessment Platform for Aluminium Industry
        </Typography>
        <Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Chip 
            icon={<Factory />} 
            label="Mining → Recycling" 
            sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
          />
          <Chip 
            icon={<Co2 />} 
            label="Carbon Tracking" 
            sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
          />
          <Chip 
            icon={<Analytics />} 
            label="AI-Powered" 
            sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
          />
          <Chip 
            icon={<VerifiedUser />} 
            label="ISO 14040/44" 
            sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
          />
        </Box>
      </Paper>

      {/* Process Flow Visualization */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Aluminium Lifecycle Process
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 3 }}>
          {processFlows.map((flow, index) => (
            <React.Fragment key={index}>
              <Card 
                sx={{ 
                  minWidth: 150, 
                  textAlign: 'center',
                  borderTop: `4px solid ${flow.color}`
                }}
              >
                <CardContent>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {flow.from}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {flow.impact}
                  </Typography>
                </CardContent>
              </Card>
              {index < processFlows.length - 1 && (
                <ArrowForward sx={{ color: flow.color, fontSize: 30 }} />
              )}
            </React.Fragment>
          ))}
        </Box>
      </Paper>

      {/* Main System Flow Stages */}
      <Grid container spacing={3}>
        {/* Left Sidebar - Quick Navigation */}
        <Grid item xs={12} md={3}>
          <Paper elevation={2} sx={{ p: 2, position: 'sticky', top: 20 }}>
            <Typography variant="h6" gutterBottom>
              System Stages
            </Typography>
            <List>
              {stages.map((stage, index) => (
                <ListItem 
                  key={index}
                  button
                  selected={activeStep === index}
                  onClick={() => handleStepClick(index)}
                  sx={{
                    borderRadius: 1,
                    mb: 1,
                    '&.Mui-selected': {
                      bgcolor: `${stage.color}20`,
                      borderLeft: `4px solid ${stage.color}`
                    }
                  }}
                >
                  <ListItemIcon sx={{ color: stage.color }}>
                    {stage.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={`Stage ${index + 1}`}
                    secondary={stage.title.split(':')[1]}
                    primaryTypographyProps={{ fontSize: '0.9rem' }}
                    secondaryTypographyProps={{ fontSize: '0.8rem' }}
                  />
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" gutterBottom>
              Key Metrics
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="caption">System Uptime</Typography>
                <Typography variant="caption" fontWeight="bold">99.9%</Typography>
              </Box>
              <LinearProgress variant="determinate" value={99.9} sx={{ mb: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="caption">Data Completeness</Typography>
                <Typography variant="caption" fontWeight="bold">95%</Typography>
              </Box>
              <LinearProgress variant="determinate" value={95} color="success" />
            </Box>
          </Paper>
        </Grid>

        {/* Main Content - Stage Details */}
        <Grid item xs={12} md={9}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {stages.map((stage, index) => (
              <Step key={index} expanded={expandedStage === index}>
                <StepLabel
                  onClick={() => handleStepClick(index)}
                  sx={{ cursor: 'pointer' }}
                  StepIconComponent={() => (
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: activeStep >= index ? stage.color : '#e0e0e0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        transition: 'all 0.3s'
                      }}
                    >
                      {React.cloneElement(stage.icon, { fontSize: 'small' })}
                    </Box>
                  )}
                >
                  <Typography variant="h6" fontWeight="bold">
                    {stage.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stage.description}
                  </Typography>
                </StepLabel>
                <StepContent>
                  <Fade in={expandedStage === index}>
                    <Box>
                      <Grid container spacing={3} sx={{ mt: 1 }}>
                        {/* Inputs */}
                        <Grid item xs={12} md={4}>
                          <Card sx={{ height: '100%', bgcolor: '#f5f5f5' }}>
                            <CardContent>
                              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                <DataObject sx={{ verticalAlign: 'middle', mr: 1 }} />
                                Inputs
                              </Typography>
                              <List dense>
                                {stage.inputs.map((input, i) => (
                                  <ListItem key={i}>
                                    <ListItemIcon>
                                      <CheckCircle fontSize="small" sx={{ color: stage.color }} />
                                    </ListItemIcon>
                                    <ListItemText primary={input} />
                                  </ListItem>
                                ))}
                              </List>
                            </CardContent>
                          </Card>
                        </Grid>

                        {/* Processing */}
                        <Grid item xs={12} md={4}>
                          <Card sx={{ height: '100%' }}>
                            <CardContent>
                              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                <Engineering sx={{ verticalAlign: 'middle', mr: 1 }} />
                                Processing
                              </Typography>
                              <Box sx={{ mb: 2 }}>
                                <Typography variant="caption" color="text.secondary">
                                  Technologies
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                                  {stage.technologies.map((tech, i) => (
                                    <Chip 
                                      key={i} 
                                      label={tech} 
                                      size="small"
                                      sx={{ bgcolor: `${stage.color}20` }}
                                    />
                                  ))}
                                </Box>
                              </Box>
                              {stage.apiEndpoints && (
                                <Box>
                                  <Typography variant="caption" color="text.secondary">
                                    API Endpoints
                                  </Typography>
                                  {stage.apiEndpoints.map((endpoint, i) => (
                                    <Typography key={i} variant="body2" sx={{ fontFamily: 'monospace', mt: 0.5 }}>
                                      {endpoint}
                                    </Typography>
                                  ))}
                                </Box>
                              )}
                            </CardContent>
                          </Card>
                        </Grid>

                        {/* Outputs */}
                        <Grid item xs={12} md={4}>
                          <Card sx={{ height: '100%', bgcolor: '#f5f5f5' }}>
                            <CardContent>
                              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                <AutoGraph sx={{ verticalAlign: 'middle', mr: 1 }} />
                                Outputs
                              </Typography>
                              <List dense>
                                {stage.outputs.map((output, i) => (
                                  <ListItem key={i}>
                                    <ListItemIcon>
                                      <ArrowForward fontSize="small" sx={{ color: stage.color }} />
                                    </ListItemIcon>
                                    <ListItemText primary={output} />
                                  </ListItem>
                                ))}
                              </List>
                            </CardContent>
                          </Card>
                        </Grid>

                        {/* Metrics */}
                        {stage.metrics && (
                          <Grid item xs={12}>
                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2 }}>
                              {stage.metrics.map((metric, i) => (
                                <Paper key={i} sx={{ p: 2, textAlign: 'center', minWidth: 120 }}>
                                  <Typography variant="h5" fontWeight="bold" sx={{ color: stage.color }}>
                                    {metric.value}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {metric.label}
                                  </Typography>
                                </Paper>
                              ))}
                            </Box>
                          </Grid>
                        )}
                      </Grid>
                    </Box>
                  </Fade>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Grid>
      </Grid>

      {/* Integration Points */}
      <Paper elevation={2} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          <IntegrationInstructions sx={{ verticalAlign: 'middle', mr: 1 }} />
          External Integration Points
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" fontWeight="bold" color="primary">
                  ERP Systems
                </Typography>
                <Typography variant="body2">SAP, Oracle, MS Dynamics</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" fontWeight="bold" color="secondary">
                  SCADA/IoT
                </Typography>
                <Typography variant="body2">Real-time sensor data</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" fontWeight="bold" color="success.main">
                  Databases
                </Typography>
                <Typography variant="body2">IPCC, CEA, ecoinvent</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" fontWeight="bold" color="warning.main">
                  Blockchain
                </Typography>
                <Typography variant="body2">Tamper-proof audit trail</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* Key Features */}
      <Paper elevation={2} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Key Platform Features
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {[
            { icon: <Co2 />, title: 'Carbon Footprint', desc: '80% reduction in assessment time' },
            { icon: <Recycling />, title: 'Circularity Metrics', desc: 'MCI, recycled content tracking' },
            { icon: <WaterDrop />, title: 'Water Management', desc: 'Full water footprint analysis' },
            { icon: <ElectricBolt />, title: 'Energy Optimization', desc: 'Real-time energy monitoring' },
            { icon: <LocalShipping />, title: 'Supply Chain', desc: 'End-to-end traceability' },
            { icon: <ModelTraining />, title: 'AI/ML Models', desc: 'Gap-filling & predictions' },
            { icon: <Security />, title: 'Security', desc: 'ISO 27001 compliant' },
            { icon: <Speed />, title: 'Performance', desc: '<200ms response time' }
          ].map((feature, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Card sx={{ height: '100%', textAlign: 'center' }}>
                <CardContent>
                  <Box sx={{ color: 'primary.main', mb: 1 }}>
                    {React.cloneElement(feature.icon, { fontSize: 'large' })}
                  </Box>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Call to Action */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Alert severity="success" sx={{ mb: 3 }}>
          <Typography variant="h6">
            Ready for Production Deployment
          </Typography>
          <Typography variant="body2">
            The AluTrace platform is fully integrated and ready to transform your aluminium LCA process
          </Typography>
        </Alert>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button 
            variant="contained" 
            size="large"
            startIcon={<Dashboard />}
            sx={{ 
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              color: 'white'
            }}
          >
            View Live Demo
          </Button>
          <Button 
            variant="outlined" 
            size="large"
            startIcon={<FileDownload />}
          >
            Download Documentation
          </Button>
          <Button 
            variant="outlined" 
            size="large"
            startIcon={<Share />}
            color="secondary"
          >
            Share Platform
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SystemFlow;
