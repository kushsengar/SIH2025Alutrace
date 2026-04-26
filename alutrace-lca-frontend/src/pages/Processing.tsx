import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Alert,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tooltip
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  CheckCircle,
  Error,
  Warning,
  Schedule,
  Speed,
  DataUsage,
  Psychology,
  AutoFixHigh,
  Refresh,
  Download,
  TrendingUp,
  Assessment
} from '@mui/icons-material';

const Processing: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [processingStatus, setProcessingStatus] = useState('running');
  
  const processingSteps = [
    {
      label: 'Data Ingestion',
      description: 'Collecting data from multiple sources',
      status: 'completed',
      progress: 100,
      metrics: { records: '125,432', time: '2.3s' }
    },
    {
      label: 'Data Validation',
      description: 'Checking data quality and consistency',
      status: 'running',
      progress: 65,
      metrics: { validated: '81,530', errors: '23' }
    },
    {
      label: 'Gap Filling',
      description: 'ML-based imputation of missing values',
      status: 'pending',
      progress: 0,
      metrics: { gaps: '1,245', filled: '0' }
    },
    {
      label: 'Normalization',
      description: 'Converting units and standardizing formats',
      status: 'pending',
      progress: 0,
      metrics: { normalized: '0', remaining: '125,432' }
    },
    {
      label: 'Quality Scoring',
      description: 'Assigning data quality scores',
      status: 'pending',
      progress: 0,
      metrics: { scored: '0', avgScore: 'N/A' }
    }
  ];

  const mlModels = [
    { name: 'XGBoost Gap Filler', status: 'active', accuracy: 94.5, lastRun: '2 min ago' },
    { name: 'Anomaly Detector', status: 'active', accuracy: 92.3, lastRun: '5 min ago' },
    { name: 'EF Predictor', status: 'idle', accuracy: 89.7, lastRun: '1 hour ago' },
    { name: 'Quality Scorer', status: 'training', accuracy: 87.2, lastRun: 'In progress' }
  ];

  const dataQualityMetrics = [
    { metric: 'Completeness', value: 95, target: 98, trend: 'up' },
    { metric: 'Accuracy', value: 92, target: 95, trend: 'stable' },
    { metric: 'Consistency', value: 88, target: 90, trend: 'up' },
    { metric: 'Timeliness', value: 97, target: 95, trend: 'up' }
  ];

  const recentJobs = [
    { id: 'JOB-2453', name: 'June Production Data', status: 'completed', duration: '4m 23s', records: '45,234' },
    { id: 'JOB-2452', name: 'Energy Consumption Q2', status: 'running', duration: '2m 15s', records: '32,456' },
    { id: 'JOB-2451', name: 'Transport Logs', status: 'failed', duration: '1m 45s', records: '12,345' },
    { id: 'JOB-2450', name: 'Emissions Data', status: 'completed', duration: '3m 12s', records: '28,901' }
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Data Processing & Validation
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Real-time data processing pipeline with ML-based validation and gap filling
      </Typography>

      {/* Processing Pipeline Status */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">Processing Pipeline</Typography>
              <Box>
                <Button
                  variant="contained"
                  startIcon={processingStatus === 'running' ? <Pause /> : <PlayArrow />}
                  onClick={() => setProcessingStatus(processingStatus === 'running' ? 'paused' : 'running')}
                  sx={{ mr: 1 }}
                >
                  {processingStatus === 'running' ? 'Pause' : 'Resume'}
                </Button>
                <IconButton color="primary">
                  <Refresh />
                </IconButton>
              </Box>
            </Box>

            <Stepper activeStep={activeStep} orientation="vertical">
              {processingSteps.map((step, index) => (
                <Step key={step.label} expanded>
                  <StepLabel
                    StepIconComponent={() => (
                      <Box sx={{ 
                        width: 32, 
                        height: 32, 
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: step.status === 'completed' ? 'success.main' : 
                                step.status === 'running' ? 'primary.main' : 'grey.300',
                        color: 'white'
                      }}>
                        {step.status === 'completed' ? <CheckCircle /> : index + 1}
                      </Box>
                    )}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {step.label}
                      </Typography>
                      <Chip 
                        label={step.status} 
                        size="small"
                        color={step.status === 'completed' ? 'success' : 
                               step.status === 'running' ? 'primary' : 'default'}
                      />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {step.description}
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <Box sx={{ mb: 2 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={step.progress} 
                        sx={{ height: 8, borderRadius: 4, mb: 1 }}
                      />
                      <Box sx={{ display: 'flex', gap: 3 }}>
                        {Object.entries(step.metrics).map(([key, value]) => (
                          <Typography key={key} variant="caption" color="text.secondary">
                            {key}: <strong>{value}</strong>
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Paper>
        </Grid>

        {/* ML Models Status */}
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              <Psychology sx={{ verticalAlign: 'middle', mr: 1 }} />
              ML Models
            </Typography>
            <List dense>
              {mlModels.map((model) => (
                <ListItem key={model.name} sx={{ px: 0 }}>
                  <ListItemIcon>
                    <Box sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: model.status === 'active' ? 'success.main' :
                               model.status === 'training' ? 'warning.main' : 'grey.400'
                    }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={model.name}
                    secondary={`Accuracy: ${model.accuracy}% • ${model.lastRun}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Data Quality Metrics */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <Assessment sx={{ verticalAlign: 'middle', mr: 1 }} />
              Data Quality
            </Typography>
            {dataQualityMetrics.map((item) => (
              <Box key={item.metric} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2">{item.metric}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" fontWeight="bold">
                      {item.value}%
                    </Typography>
                    {item.trend === 'up' && <TrendingUp sx={{ fontSize: 16, color: 'success.main' }} />}
                  </Box>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={item.value} 
                  color={item.value >= item.target ? 'success' : 'warning'}
                  sx={{ height: 6, borderRadius: 3 }}
                />
                <Typography variant="caption" color="text.secondary">
                  Target: {item.target}%
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Processing Configuration */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Processing Configuration
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Processing Mode</InputLabel>
                  <Select defaultValue="auto" label="Processing Mode">
                    <MenuItem value="auto">Automatic</MenuItem>
                    <MenuItem value="manual">Manual</MenuItem>
                    <MenuItem value="scheduled">Scheduled</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Gap Fill Method</InputLabel>
                  <Select defaultValue="ml" label="Gap Fill Method">
                    <MenuItem value="ml">ML Ensemble</MenuItem>
                    <MenuItem value="mean">Mean Imputation</MenuItem>
                    <MenuItem value="forward">Forward Fill</MenuItem>
                    <MenuItem value="interpolate">Interpolation</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Error Threshold (%)"
                  type="number"
                  defaultValue="5"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Batch Size"
                  type="number"
                  defaultValue="10000"
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="outlined" fullWidth>
                  Update Configuration
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Recent Processing Jobs */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Recent Jobs</Typography>
              <Button size="small" startIcon={<Download />}>
                Export Log
              </Button>
            </Box>
            <List>
              {recentJobs.map((job) => (
                <ListItem key={job.id} sx={{ px: 0 }}>
                  <ListItemIcon>
                    {job.status === 'completed' && <CheckCircle color="success" />}
                    {job.status === 'running' && <Schedule color="primary" />}
                    {job.status === 'failed' && <Error color="error" />}
                  </ListItemIcon>
                  <ListItemText
                    primary={`${job.id}: ${job.name}`}
                    secondary={`${job.duration} • ${job.records} records`}
                  />
                  <Chip
                    label={job.status}
                    size="small"
                    color={job.status === 'completed' ? 'success' : 
                           job.status === 'running' ? 'primary' : 'error'}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Alerts */}
        <Grid item xs={12}>
          <Alert severity="info" icon={<AutoFixHigh />}>
            <Typography variant="subtitle2" fontWeight="bold">
              Auto-optimization enabled
            </Typography>
            <Typography variant="body2">
              The system is automatically adjusting processing parameters based on data quality metrics. 
              Current optimization has improved processing speed by 23% while maintaining 95% accuracy.
            </Typography>
          </Alert>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Processing;
