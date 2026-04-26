import React from 'react';
import {
  Box,
  Slider,
  Typography,
  Grid,
  Paper,
  Tooltip,
  Chip,
} from '@mui/material';
import { Info, Recycling, Bolt, Factory, LocalShipping } from '@mui/icons-material';
import { ScenarioParameters } from '../../state/aipipeline/types';

interface ParameterSlidersProps {
  parameters: ScenarioParameters;
  onParameterChange: (param: keyof ScenarioParameters, value: number) => void;
  disabled?: boolean;
}

interface SliderConfig {
  label: string;
  icon: React.ReactNode;
  min: number;
  max: number;
  step: number;
  unit: string;
  color: string;
  tooltip: string;
}

const SLIDER_CONFIGS: Record<keyof Pick<ScenarioParameters, 'recycledContent' | 'gridRenewablePct' | 'electricityKwhPerT' | 'productionTonnes'>, SliderConfig> = {
  recycledContent: {
    label: 'Recycled Content',
    icon: <Recycling />,
    min: 0,
    max: 100,
    step: 5,
    unit: '%',
    color: '#10b981',
    tooltip: 'Percentage of recycled aluminum in the production mix',
  },
  gridRenewablePct: {
    label: 'Grid Renewable Energy',
    icon: <Bolt />,
    min: 0,
    max: 100,
    step: 5,
    unit: '%',
    color: '#3b82f6',
    tooltip: 'Percentage of renewable energy in the electricity grid',
  },
  electricityKwhPerT: {
    label: 'Electricity Consumption',
    icon: <Bolt />,
    min: 10000,
    max: 20000,
    step: 100,
    unit: 'kWh/t',
    color: '#f59e0b',
    tooltip: 'Electricity consumption per tonne of aluminum produced',
  },
  productionTonnes: {
    label: 'Annual Production',
    icon: <Factory />,
    min: 10000,
    max: 500000,
    step: 10000,
    unit: 't/year',
    color: '#8b5cf6',
    tooltip: 'Total annual aluminum production capacity',
  },
};

const ParameterSliders: React.FC<ParameterSlidersProps> = ({
  parameters,
  onParameterChange,
  disabled = false,
}) => {
  const formatValue = (value: number, unit: string) => {
    if (unit === 't/year' || unit === 'kWh/t') {
      return value.toLocaleString();
    }
    return value.toString();
  };

  const getImpactColor = (param: keyof ScenarioParameters, value: number) => {
    if (param === 'recycledContent' || param === 'gridRenewablePct') {
      if (value >= 75) return '#10b981';
      if (value >= 50) return '#f59e0b';
      return '#ef4444';
    }
    if (param === 'electricityKwhPerT') {
      if (value <= 12000) return '#10b981';
      if (value <= 14000) return '#f59e0b';
      return '#ef4444';
    }
    return '#6b7280';
  };

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
        Process Parameters
      </Typography>
      
      <Grid container spacing={2}>
        {(Object.keys(SLIDER_CONFIGS) as Array<keyof typeof SLIDER_CONFIGS>).map((param) => {
          const config = SLIDER_CONFIGS[param];
          const value = parameters[param];
          const impactColor = getImpactColor(param, value);

          return (
            <Grid item xs={12} sm={6} key={param}>
              <Paper
                sx={{
                  p: 2,
                  borderLeft: `3px solid ${config.color}`,
                  opacity: disabled ? 0.6 : 1,
                }}
                elevation={0}
                variant="outlined"
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ color: config.color, mr: 1 }}>
                    {config.icon}
                  </Box>
                  <Typography variant="body2" sx={{ flexGrow: 1 }}>
                    {config.label}
                  </Typography>
                  <Tooltip title={config.tooltip}>
                    <Info fontSize="small" color="action" />
                  </Tooltip>
                </Box>

                <Box sx={{ px: 1 }}>
                  <Slider
                    value={value}
                    onChange={(_, newValue) => 
                      onParameterChange(param, newValue as number)
                    }
                    min={config.min}
                    max={config.max}
                    step={config.step}
                    disabled={disabled}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(v) => `${formatValue(v, config.unit)} ${config.unit}`}
                    sx={{
                      color: config.color,
                      '& .MuiSlider-thumb': {
                        backgroundColor: impactColor,
                      },
                    }}
                  />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" color="text.secondary">
                    {formatValue(config.min, config.unit)}
                  </Typography>
                  <Chip
                    label={`${formatValue(value, config.unit)} ${config.unit}`}
                    size="small"
                    sx={{
                      bgcolor: `${impactColor}20`,
                      color: impactColor,
                      fontWeight: 600,
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {formatValue(config.max, config.unit)}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      {/* Additional Parameters Display */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="caption" color="text.secondary">
          Additional Parameters (Fixed)
        </Typography>
        <Grid container spacing={1} sx={{ mt: 0.5 }}>
          <Grid item>
            <Chip
              size="small"
              label={`Transport: ${parameters.transportKm || 200} km`}
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <Chip
              size="small"
              label={`Waste: ${parameters.wasteKgPerT || 430} kg/t`}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ParameterSliders;
