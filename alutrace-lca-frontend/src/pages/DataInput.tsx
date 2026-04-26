import React from 'react';
import { Box, Typography, Paper, Button, Grid, Card, CardContent, Chip, LinearProgress } from '@mui/material';
import { CloudUpload, Description, CheckCircle, Error, Schedule } from '@mui/icons-material';

const DataInput: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Data Input & Collection
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Upload and manage your LCA data from various sources
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Upload Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Quick Upload
            </Typography>
            <Box
              sx={{
                border: '2px dashed #667eea',
                borderRadius: 2,
                p: 4,
                textAlign: 'center',
                bgcolor: '#f8f9fa',
                cursor: 'pointer',
                '&:hover': { bgcolor: '#e8eaf6' },
              }}
            >
              <CloudUpload sx={{ fontSize: 48, color: '#667eea', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Drag & Drop Files Here
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Or click to browse files
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Supported formats: CSV, XLSX, JSON, XML
              </Typography>
            </Box>
            <Button variant="contained" fullWidth sx={{ mt: 2 }}>
              Select Files
            </Button>
          </Paper>
        </Grid>

        {/* Data Sources */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Connected Data Sources
            </Typography>
            <Box sx={{ mt: 2 }}>
              {[
                { name: 'ERP System', status: 'connected', lastSync: '2 hours ago' },
                { name: 'SCADA', status: 'connected', lastSync: '5 minutes ago' },
                { name: 'IoT Sensors', status: 'syncing', lastSync: 'In progress' },
                { name: 'Manual Entry', status: 'disconnected', lastSync: '1 day ago' },
              ].map((source, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body1">{source.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Last sync: {source.lastSync}
                    </Typography>
                  </Box>
                  <Chip
                    label={source.status}
                    size="small"
                    color={
                      source.status === 'connected' ? 'success' :
                      source.status === 'syncing' ? 'warning' : 'default'
                    }
                  />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Recent Uploads */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Data Uploads
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {[
                { name: 'Production_Data_June.csv', size: '2.5 MB', status: 'completed', date: '2024-06-15' },
                { name: 'Energy_Consumption.xlsx', size: '1.8 MB', status: 'processing', date: '2024-06-14' },
                { name: 'Emissions_Q2.json', size: '3.2 MB', status: 'completed', date: '2024-06-13' },
                { name: 'Transport_Logs.csv', size: '1.1 MB', status: 'error', date: '2024-06-12' },
              ].map((file, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                        <Description sx={{ color: '#667eea', mr: 1 }} />
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="body2" noWrap>
                            {file.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {file.size} • {file.date}
                          </Typography>
                        </Box>
                      </Box>
                      {file.status === 'processing' ? (
                        <LinearProgress variant="indeterminate" />
                      ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {file.status === 'completed' && <CheckCircle sx={{ color: '#4CAF50', fontSize: 18, mr: 1 }} />}
                          {file.status === 'error' && <Error sx={{ color: '#F44336', fontSize: 18, mr: 1 }} />}
                          <Typography variant="caption" color={file.status === 'completed' ? '#4CAF50' : '#F44336'}>
                            {file.status}
                          </Typography>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DataInput;
