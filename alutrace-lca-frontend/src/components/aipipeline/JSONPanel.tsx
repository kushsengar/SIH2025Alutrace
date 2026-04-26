import React from 'react';
import { Box, Typography, Paper, IconButton, Stack } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';

interface JSONPanelProps {
  request: any;
  response: any;
}

const JSONPanel: React.FC<JSONPanelProps> = ({ request, response }) => {
  const copyToClipboard = (data: any) => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
  };

  return (
    <Box sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle2">Request</Typography>
            <IconButton size="small" onClick={() => copyToClipboard(request)}>
              <ContentCopy fontSize="small" />
            </IconButton>
          </Box>
          <Paper variant="outlined" sx={{ p: 2, bgcolor: '#f8fafc' }}>
            <Typography 
              variant="body2" 
              component="pre" 
              sx={{ 
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                overflow: 'auto',
                maxHeight: 200
              }}
            >
              {JSON.stringify(request, null, 2)}
            </Typography>
          </Paper>
        </Box>

        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle2">Response</Typography>
            <IconButton size="small" onClick={() => copyToClipboard(response)}>
              <ContentCopy fontSize="small" />
            </IconButton>
          </Box>
          <Paper variant="outlined" sx={{ p: 2, bgcolor: '#f0fdf4' }}>
            <Typography 
              variant="body2" 
              component="pre" 
              sx={{ 
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                overflow: 'auto',
                maxHeight: 200
              }}
            >
              {JSON.stringify(response, null, 2)}
            </Typography>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
};

export default JSONPanel;
