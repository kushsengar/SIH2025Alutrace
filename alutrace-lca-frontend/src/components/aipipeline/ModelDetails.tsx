import React from 'react';
import { Box, Typography, Chip, Stack, Paper, Grid } from '@mui/material';
import { ModelNode, Scenario, ModelStatus } from '../../state/aipipeline/types';

interface ModelDetailsProps {
  model: Omit<ModelNode, 'status' | 'metrics'>;
  scenario: Scenario;
  status: ModelStatus;
}

const ModelDetails: React.FC<ModelDetailsProps> = ({ model, scenario, status }) => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        {model.title}
      </Typography>
      
      <Typography variant="body2" color="text.secondary" paragraph>
        {model.description}
      </Typography>
      
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Chip label={model.category} size="small" color="primary" />
        <Chip label={status} size="small" variant="outlined" />
      </Stack>
      
      <Typography variant="subtitle2" gutterBottom>
        Input Parameters
      </Typography>
      <Paper variant="outlined" sx={{ p: 1, mb: 2 }}>
        <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
          {JSON.stringify(scenario.parameters, null, 2)}
        </Typography>
      </Paper>
    </Box>
  );
};

export default ModelDetails;
