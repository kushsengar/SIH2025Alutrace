import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  Stack,
} from '@mui/material';

interface HelpOverlayProps {
  open: boolean;
  onClose: () => void;
}

const HelpOverlay: React.FC<HelpOverlayProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>AI Pipeline Help</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Overview
            </Typography>
            <Typography variant="body2" color="text.secondary">
              The AI Pipeline Explorer allows you to visualize and interact with the 13 ML models
              that power the LCA analysis. You can adjust scenario parameters, run the pipeline,
              and observe how data flows through each model.
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              How to Use
            </Typography>
            <Typography variant="body2" color="text.secondary" component="ul">
              <li>Select a scenario or create a new one</li>
              <li>Adjust parameters using the sliders</li>
              <li>Click "Run Pipeline" to execute all models</li>
              <li>Click on individual models to see details</li>
              <li>Monitor progress and results in real-time</li>
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Model Categories
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              <Chip label="Data Processing" size="small" sx={{ bgcolor: '#3b82f620' }} />
              <Chip label="Process Surrogates" size="small" sx={{ bgcolor: '#10b98120' }} />
              <Chip label="Circularity" size="small" sx={{ bgcolor: '#14b8a620' }} />
              <Chip label="Forecasting" size="small" sx={{ bgcolor: '#636df120' }} />
              <Chip label="Optimization" size="small" sx={{ bgcolor: '#f59e0b20' }} />
              <Chip label="Intelligence" size="small" sx={{ bgcolor: '#a855f720' }} />
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Keyboard Shortcuts
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Space</strong>: Run/Stop Pipeline<br />
              <strong>R</strong>: Reset Pipeline<br />
              <strong>Tab</strong>: Switch Between Tabs<br />
              <strong>?</strong>: Show This Help
            </Typography>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default HelpOverlay;
