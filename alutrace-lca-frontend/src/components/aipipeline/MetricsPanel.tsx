import React from 'react';
import { Box, Typography, Grid, Paper, LinearProgress } from '@mui/material';
import { Speed, DataUsage, TrendingUp, Loop } from '@mui/icons-material';

interface MetricsPanelProps {
  metrics: {
    totalProcessingTime: number;
    modelsCompleted: number;
    dataPoints: number;
    confidenceScore: number;
    emissionFactor: number;
    circularityIndex: number;
  };
}

const MetricsPanel: React.FC<MetricsPanelProps> = ({ metrics }) => {
  const metricItems = [
    {
      label: 'Processing Time',
      value: `${metrics.totalProcessingTime.toFixed(0)} ms`,
      icon: <Speed />,
      color: '#3b82f6',
    },
    {
      label: 'Models Completed',
      value: `${metrics.modelsCompleted}/10`,
      icon: <DataUsage />,
      color: '#10b981',
      progress: (metrics.modelsCompleted / 10) * 100,
    },
    {
      label: 'Data Points',
      value: metrics.dataPoints.toLocaleString(),
      icon: <TrendingUp />,
      color: '#8b5cf6',
    },
    {
      label: 'Confidence Score',
      value: `${metrics.confidenceScore.toFixed(1)}%`,
      icon: <TrendingUp />,
      color: '#f59e0b',
      progress: metrics.confidenceScore,
    },
    {
      label: 'CO₂ Emission Factor',
      value: `${metrics.emissionFactor.toFixed(1)} tCO₂/t`,
      icon: <Loop />,
      color: '#ef4444',
    },
    {
      label: 'Circularity Index',
      value: metrics.circularityIndex.toFixed(2),
      icon: <Loop />,
      color: '#14b8a6',
      progress: metrics.circularityIndex * 100,
    },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Pipeline Metrics
      </Typography>
      
      <Grid container spacing={2}>
        {metricItems.map((item) => (
          <Grid item xs={12} sm={6} key={item.label}>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                borderLeft: `3px solid ${item.color}`,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box sx={{ color: item.color, mr: 1 }}>
                  {item.icon}
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {item.label}
                </Typography>
              </Box>
              
              <Typography variant="h6" sx={{ color: item.color }}>
                {item.value}
              </Typography>
              
              {item.progress !== undefined && (
                <LinearProgress
                  variant="determinate"
                  value={item.progress}
                  sx={{
                    mt: 1,
                    bgcolor: `${item.color}20`,
                    '& .MuiLinearProgress-bar': {
                      bgcolor: item.color,
                    },
                  }}
                />
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MetricsPanel;
