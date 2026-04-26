import React from 'react';
import { Grid, Paper, Typography, Box, Card, CardContent, LinearProgress } from '@mui/material';
import { Factory, Co2, WaterDrop, ElectricBolt, Recycling, TrendingUp, Warning, CheckCircle } from '@mui/icons-material';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard: React.FC = () => {
  // Sample data for charts
  const monthlyData = [
    { month: 'Jan', emissions: 12000, energy: 14500, water: 9500 },
    { month: 'Feb', emissions: 11500, energy: 14200, water: 9200 },
    { month: 'Mar', emissions: 11800, energy: 14800, water: 9800 },
    { month: 'Apr', emissions: 11200, energy: 14000, water: 9000 },
    { month: 'May', emissions: 10800, energy: 13500, water: 8800 },
    { month: 'Jun', emissions: 10500, energy: 13200, water: 8500 },
  ];

  const processData = [
    { name: 'Mining', value: 15, color: '#FF5722' },
    { name: 'Refining', value: 20, color: '#F44336' },
    { name: 'Smelting', value: 45, color: '#FF9800' },
    { name: 'Fabrication', value: 12, color: '#4CAF50' },
    { name: 'Transport', value: 8, color: '#2196F3' },
  ];

  const metrics = [
    { title: 'Carbon Footprint', value: '11.8', unit: 'kg CO₂/kg Al', icon: <Co2 />, color: '#F44336', trend: -5.2 },
    { title: 'Energy Intensity', value: '155.2', unit: 'GJ/t', icon: <ElectricBolt />, color: '#FF9800', trend: -3.1 },
    { title: 'Water Usage', value: '95', unit: 'm³/t', icon: <WaterDrop />, color: '#2196F3', trend: -2.8 },
    { title: 'Recycled Content', value: '35', unit: '%', icon: <Recycling />, color: '#4CAF50', trend: 8.5 },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Real-time monitoring of your aluminium LCA metrics
      </Typography>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ p: 1, borderRadius: 2, bgcolor: `${metric.color}20`, color: metric.color, mr: 2 }}>
                    {metric.icon}
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      {metric.title}
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      {metric.value}
                    </Typography>
                    <Typography variant="caption">
                      {metric.unit}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUp sx={{ fontSize: 16, color: metric.trend > 0 ? '#4CAF50' : '#F44336', mr: 0.5 }} />
                  <Typography variant="caption" sx={{ color: metric.trend > 0 ? '#4CAF50' : '#F44336' }}>
                    {Math.abs(metric.trend)}% vs last month
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Monthly Trends */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Monthly Trends
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="emissions" stroke="#F44336" name="Emissions (kg CO₂)" />
                <Line type="monotone" dataKey="energy" stroke="#FF9800" name="Energy (kWh)" />
                <Line type="monotone" dataKey="water" stroke="#2196F3" name="Water (m³)" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Process Contribution */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Process Contribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={processData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {processData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* System Status */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              System Status
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Data Completeness</Typography>
                  <Typography variant="body2" fontWeight="bold">95%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={95} sx={{ height: 8, borderRadius: 4 }} />
              </Box>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Model Accuracy</Typography>
                  <Typography variant="body2" fontWeight="bold">92%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={92} color="success" sx={{ height: 8, borderRadius: 4 }} />
              </Box>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">System Performance</Typography>
                  <Typography variant="body2" fontWeight="bold">98%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={98} color="primary" sx={{ height: 8, borderRadius: 4 }} />
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Recent Alerts */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Alerts
            </Typography>
            <Box sx={{ mt: 2 }}>
              {[
                { type: 'success', message: 'LCA calculation completed for Batch #2453', time: '2 hours ago' },
                { type: 'warning', message: 'Missing emission factor for transport segment', time: '5 hours ago' },
                { type: 'success', message: 'Data import successful - 15,000 records', time: '1 day ago' },
                { type: 'info', message: 'New ML model deployed with 95% accuracy', time: '2 days ago' },
              ].map((alert, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  {alert.type === 'success' ? (
                    <CheckCircle sx={{ color: '#4CAF50', mr: 1, fontSize: 20 }} />
                  ) : (
                    <Warning sx={{ color: '#FF9800', mr: 1, fontSize: 20 }} />
                  )}
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body2">{alert.message}</Typography>
                    <Typography variant="caption" color="text.secondary">{alert.time}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
