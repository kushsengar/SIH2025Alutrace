import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  IconButton,
  Chip,
  Stack,
} from '@mui/material';
import { Add, Edit, ContentCopy } from '@mui/icons-material';
import { Scenario } from '../../state/aipipeline/types';

interface ScenarioSelectorProps {
  scenarios: Scenario[];
  selectedScenarioId: string;
  onScenarioChange: (scenarioId: string) => void;
  onAddScenario?: () => void;
  onEditScenario?: (scenarioId: string) => void;
  onDuplicateScenario?: (scenarioId: string) => void;
  disabled?: boolean;
}

const ScenarioSelector: React.FC<ScenarioSelectorProps> = ({
  scenarios,
  selectedScenarioId,
  onScenarioChange,
  onAddScenario,
  onEditScenario,
  onDuplicateScenario,
  disabled = false,
}) => {
  const selectedScenario = scenarios.find(s => s.id === selectedScenarioId);

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
        Scenario Selection
      </Typography>
      
      <FormControl fullWidth size="small" disabled={disabled}>
        <InputLabel>Active Scenario</InputLabel>
        <Select
          value={selectedScenarioId}
          label="Active Scenario"
          onChange={(e) => onScenarioChange(e.target.value)}
        >
          {scenarios.map((scenario) => (
            <MenuItem key={scenario.id} value={scenario.id}>
              <Box sx={{ width: '100%' }}>
                <Typography variant="body2">{scenario.name}</Typography>
                {scenario.description && (
                  <Typography variant="caption" color="text.secondary">
                    {scenario.description}
                  </Typography>
                )}
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
        {onAddScenario && (
          <IconButton 
            size="small" 
            onClick={onAddScenario}
            disabled={disabled}
            title="Add new scenario"
          >
            <Add fontSize="small" />
          </IconButton>
        )}
        {onEditScenario && selectedScenario && (
          <IconButton
            size="small"
            onClick={() => onEditScenario(selectedScenarioId)}
            disabled={disabled}
            title="Edit scenario"
          >
            <Edit fontSize="small" />
          </IconButton>
        )}
        {onDuplicateScenario && selectedScenario && (
          <IconButton
            size="small"
            onClick={() => onDuplicateScenario(selectedScenarioId)}
            disabled={disabled}
            title="Duplicate scenario"
          >
            <ContentCopy fontSize="small" />
          </IconButton>
        )}
      </Stack>

      {selectedScenario && (
        <Box sx={{ mt: 2 }}>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip
              size="small"
              label={`Region: ${selectedScenario.parameters.region}`}
              variant="outlined"
            />
            <Chip
              size="small"
              label={`Year: ${selectedScenario.parameters.year}`}
              variant="outlined"
            />
            <Chip
              size="small"
              label={`${selectedScenario.parameters.productionTonnes.toLocaleString()} t/year`}
              variant="outlined"
              color="primary"
            />
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default ScenarioSelector;
