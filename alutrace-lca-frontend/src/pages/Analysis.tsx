import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Tab,
  Tabs,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Tooltip,
  LinearProgress,
  Alert,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  FormControlLabel,
  Badge,
  Avatar,
  Box as MuiBox,
  CircularProgress
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Assessment,
  Park, // Replaced Eco
  LocalShipping,
  Factory,
  WaterDrop,
  Air,
  Terrain,
  ElectricBolt,
  Download,
  Share,
  Refresh,
  FilterList,
  Timeline,
  PieChart,
  BarChart,
  ShowChart,
  CompareArrows,
  Info,
  Warning,
  CheckCircle,
  Recycling,
  SolarPower, // Replaced EnergySavingsLeaf
  CloudQueue, // Replaced Co2
  Analytics,
  Thermostat, // Replaced ThermostatAuto
  Nature,
  Star,
  Remove
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  Treemap,
  ComposedChart,
  Scatter
} from 'recharts';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`analysis-tabpanel-${index}`}
      aria-labelledby={`analysis-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const Analysis: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [timeRange, setTimeRange] = useState('month');
  const [comparisonMode, setComparisonMode] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('carbon');
  const [selectedProduct, setSelectedProduct] = useState('all');

  // Sample data for environmental impact metrics
  const impactMetrics = [
    {
      category: 'Carbon Footprint',
      value: 2847,
      unit: 'tCO2e',
      change: -12.5,
      status: 'improving',
      icon: <CloudQueue />,
      color: '#4CAF50',
      target: 2500,
      description: 'Total greenhouse gas emissions'
    },
    {
      category: 'Water Usage',
      value: 15234,
      unit: 'm³',
      change: -8.3,
      status: 'improving',
      icon: <WaterDrop />,
      color: '#2196F3',
      target: 14000,
      description: 'Total water consumption'
    },
    {
      category: 'Energy Consumption',
      value: 8923,
      unit: 'MWh',
      change: -15.2,
      status: 'improving',
      icon: <ElectricBolt />,
      color: '#FF9800',
      target: 8000,
      description: 'Total energy usage'
    },
    {
      category: 'Waste Generation',
      value: 342,
      unit: 'tons',
      change: 5.1,
      status: 'worsening',
      icon: <Terrain />,
      color: '#F44336',
      target: 300,
      description: 'Total waste produced'
    },
    {
      category: 'Recycling Rate',
      value: 78,
      unit: '%',
      change: 3.2,
      status: 'improving',
      icon: <Recycling />,
      color: '#9C27B0',
      target: 85,
      description: 'Material recycling percentage'
    },
    {
      category: 'Renewable Energy',
      value: 45,
      unit: '%',
      change: 8.7,
      status: 'improving',
      icon: <SolarPower />,
      color: '#00BCD4',
      target: 60,
      description: 'Renewable energy usage'
    }
  ];

  // Life Cycle stages data
  const lifeCycleData = [
    { 
      stage: 'Raw Material Extraction', 
      carbon: 850, 
      water: 6400, 
      energy: 2500, 
      waste: 51,
      percentage: 35,
      details: 'Bauxite mining and processing'
    },
    { 
      stage: 'Manufacturing', 
      carbon: 712, 
      water: 2743, 
      energy: 2854, 
      waste: 96,
      percentage: 25,
      details: 'Smelting and refining processes'
    },
    { 
      stage: 'Transportation', 
      carbon: 427, 
      water: 1219, 
      energy: 1070, 
      waste: 34,
      percentage: 15,
      details: 'Logistics and distribution'
    },
    { 
      stage: 'Use Phase', 
      carbon: 512, 
      water: 3808, 
      energy: 1785, 
      waste: 120,
      percentage: 18,
      details: 'Product utilization period'
    },
    { 
      stage: 'End of Life', 
      carbon: 199, 
      water: 1064, 
      energy: 714, 
      waste: 41,
      percentage: 7,
      details: 'Recycling and disposal'
    }
  ];

  // Trend data for the last 6 months
  const trendData = [
    { month: 'Jan', carbon: 3200, water: 18000, energy: 9500, waste: 380, recycling: 72 },
    { month: 'Feb', carbon: 3100, water: 17500, energy: 9200, waste: 375, recycling: 73 },
    { month: 'Mar', carbon: 2950, water: 16800, energy: 8900, waste: 360, recycling: 74 },
    { month: 'Apr', carbon: 2900, water: 16200, energy: 8700, waste: 355, recycling: 75 },
    { month: 'May', carbon: 2850, water: 15800, energy: 8500, waste: 350, recycling: 76 },
    { month: 'Jun', carbon: 2847, water: 15234, energy: 8923, waste: 342, recycling: 78 }
  ];

  // Hotspot analysis data
  const hotspotData = [
    { name: 'Smelting Process', value: 45, impact: 'Critical', color: '#F44336' },
    { name: 'Electrolysis', value: 28, impact: 'High', color: '#FF9800' },
    { name: 'Transport', value: 12, impact: 'Medium', color: '#FFC107' },
    { name: 'Raw Material Extraction', value: 8, impact: 'Medium', color: '#4CAF50' },
    { name: 'Waste Treatment', value: 7, impact: 'Low', color: '#2196F3' }
  ];

  // Product-specific analysis
  const productAnalysis = [
    { 
      product: 'Aluminum Sheet', 
      carbon: 4.2, 
      water: 25, 
      energy: 15, 
      score: 82,
      trend: 'improving'
    },
    { 
      product: 'Aluminum Extrusions', 
      carbon: 5.1, 
      water: 28, 
      energy: 18, 
      score: 78,
      trend: 'stable'
    },
    { 
      product: 'Aluminum Foil', 
      carbon: 3.8, 
      water: 22, 
      energy: 12, 
      score: 85,
      trend: 'improving'
    },
    { 
      product: 'Cast Aluminum', 
      carbon: 6.2, 
      water: 32, 
      energy: 22, 
      score: 72,
      trend: 'worsening'
    }
  ];

  // Comparison data for benchmarking
  const comparisonData = [
    { metric: 'Carbon Efficiency', current: 85, industry: 70, best: 95 },
    { metric: 'Water Efficiency', current: 78, industry: 65, best: 90 },
    { metric: 'Energy Efficiency', current: 72, industry: 60, best: 88 },
    { metric: 'Waste Reduction', current: 68, industry: 55, best: 85 },
    { metric: 'Recycling Rate', current: 78, industry: 60, best: 95 }
  ];

  // Improvement recommendations
  const recommendations = [
    {
      title: 'Optimize Smelting Temperature',
      impact: 'High',
      savings: '15% CO2 reduction',
      effort: 'Medium',
      status: 'new',
      roi: '8 months',
      category: 'Process'
    },
    {
      title: 'Implement Water Recycling System',
      impact: 'High',
      savings: '30% water reduction',
      effort: 'High',
      status: 'in-progress',
      roi: '14 months',
      category: 'Infrastructure'
    },
    {
      title: 'Switch to Renewable Energy',
      impact: 'Very High',
      savings: '40% carbon reduction',
      effort: 'High',
      status: 'planned',
      roi: '24 months',
      category: 'Energy'
    },
    {
      title: 'Improve Material Recovery',
      impact: 'Medium',
      savings: '20% waste reduction',
      effort: 'Low',
      status: 'completed',
      roi: '6 months',
      category: 'Waste'
    }
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Critical': return '#F44336';
      case 'High': return '#FF9800';
      case 'Medium': return '#FFC107';
      case 'Low': return '#4CAF50';
      default: return '#9E9E9E';
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Environmental Impact Analysis
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Comprehensive life cycle assessment and environmental impact metrics for aluminium production
        </Typography>
      </Box>

      {/* Quick Actions Bar */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeRange}
              label="Time Range"
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <MenuItem value="week">Last Week</MenuItem>
              <MenuItem value="month">Last Month</MenuItem>
              <MenuItem value="quarter">Last Quarter</MenuItem>
              <MenuItem value="year">Last Year</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Product Line</InputLabel>
            <Select
              value={selectedProduct}
              label="Product Line"
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              <MenuItem value="all">All Products</MenuItem>
              <MenuItem value="sheet">Aluminum Sheet</MenuItem>
              <MenuItem value="extrusions">Extrusions</MenuItem>
              <MenuItem value="foil">Aluminum Foil</MenuItem>
              <MenuItem value="cast">Cast Aluminum</MenuItem>
            </Select>
          </FormControl>

          <FormControlLabel
            control={
              <Switch
                checked={comparisonMode}
                onChange={(e) => setComparisonMode(e.target.checked)}
              />
            }
            label="Comparison Mode"
          />
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Button startIcon={<Refresh />} onClick={() => {}}>
            Refresh
          </Button>
          <Button variant="outlined" startIcon={<Download />}>
            Export
          </Button>
          <Button variant="contained" startIcon={<Share />}>
            Share
          </Button>
        </Stack>
      </Box>

      {/* Key Impact Metrics */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {impactMetrics.map((metric) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={metric.category}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ pb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: `${metric.color}20`,
                      color: metric.color,
                      mr: 1
                    }}
                  >
                    {metric.icon}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="caption" color="text.secondary" display="block">
                      {metric.category}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                      {metric.value.toLocaleString()}
                      <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                        {metric.unit}
                      </Typography>
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ mb: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption" color="text.secondary">
                      Target: {metric.target} {metric.unit}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {Math.round((metric.value / metric.target) * 100)}%
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={Math.min((metric.value / metric.target) * 100, 100)}
                    sx={{ 
                      height: 4, 
                      borderRadius: 2,
                      bgcolor: 'grey.200',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: metric.color
                      }
                    }}
                  />
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {metric.change < 0 ? (
                    <TrendingDown sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }} />
                  ) : (
                    <TrendingUp sx={{ fontSize: 16, color: 'error.main', mr: 0.5 }} />
                  )}
                  <Typography
                    variant="caption"
                    sx={{
                      color: metric.status === 'improving' ? 'success.main' : 'error.main',
                      fontWeight: 500
                    }}
                  >
                    {Math.abs(metric.change)}% vs last period
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Main Analysis Tabs */}
      <Paper elevation={1}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          sx={{ borderBottom: 1, borderColor: 'divider' }}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Life Cycle Assessment" icon={<Timeline />} iconPosition="start" />
          <Tab label="Environmental Trends" icon={<ShowChart />} iconPosition="start" />
          <Tab label="Hotspot Analysis" icon={<PieChart />} iconPosition="start" />
          <Tab label="Product Analysis" icon={<Assessment />} iconPosition="start" />
          <Tab label="Benchmarking" icon={<CompareArrows />} iconPosition="start" />
          <Tab label="Recommendations" icon={<Park />} iconPosition="start" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Life Cycle Impact Distribution
                  </Typography>
                  <ResponsiveContainer width="100%" height={400}>
                    <ComposedChart data={lifeCycleData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="stage" angle={-45} textAnchor="end" height={80} />
                      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                      <RechartsTooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="carbon" fill="#8884d8" name="Carbon (tCO2e)" />
                      <Bar yAxisId="left" dataKey="energy" fill="#ffc658" name="Energy (MWh)" />
                      <Line yAxisId="right" type="monotone" dataKey="percentage" stroke="#ff7300" name="Impact %" strokeWidth={2} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} lg={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Stage Impact Breakdown
                  </Typography>
                  <List dense>
                    {lifeCycleData.map((stage, index) => (
                      <React.Fragment key={stage.stage}>
                        <ListItem>
                          <ListItemIcon>
                            <Factory sx={{ color: COLORS[index % COLORS.length] }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={stage.stage}
                            secondary={
                              <React.Fragment>
                                <Typography variant="caption" display="block">
                                  {stage.details}
                                </Typography>
                                <LinearProgress 
                                  variant="determinate" 
                                  value={stage.percentage} 
                                  sx={{ 
                                    mt: 1, 
                                    height: 6, 
                                    borderRadius: 3,
                                    bgcolor: 'grey.200',
                                    '& .MuiLinearProgress-bar': {
                                      bgcolor: COLORS[index % COLORS.length]
                                    }
                                  }}
                                />
                              </React.Fragment>
                            }
                          />
                          <Chip 
                            label={`${stage.percentage}%`} 
                            size="small" 
                            sx={{ 
                              bgcolor: `${COLORS[index % COLORS.length]}20`,
                              color: COLORS[index % COLORS.length],
                              fontWeight: 600
                            }}
                          />
                        </ListItem>
                        {index < lifeCycleData.length - 1 && <Divider variant="inset" component="li" />}
                      </React.Fragment>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Resource Consumption by Life Cycle Stage
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={lifeCycleData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="stage" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Area type="monotone" dataKey="water" stackId="1" stroke="#2196F3" fill="#2196F3" fillOpacity={0.6} name="Water (m³)" />
                      <Area type="monotone" dataKey="waste" stackId="1" stroke="#F44336" fill="#F44336" fillOpacity={0.6} name="Waste (tons)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">
                      Environmental Metrics Trend (6 Months)
                    </Typography>
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                      <InputLabel>Metric</InputLabel>
                      <Select
                        value={selectedMetric}
                        label="Metric"
                        onChange={(e) => setSelectedMetric(e.target.value)}
                      >
                        <MenuItem value="carbon">Carbon Emissions</MenuItem>
                        <MenuItem value="water">Water Usage</MenuItem>
                        <MenuItem value="energy">Energy Consumption</MenuItem>
                        <MenuItem value="waste">Waste Generation</MenuItem>
                        <MenuItem value="recycling">Recycling Rate</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={trendData}>
                      <defs>
                        <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <RechartsTooltip />
                      <Area
                        type="monotone"
                        dataKey={selectedMetric}
                        stroke="#8884d8"
                        fillOpacity={1}
                        fill="url(#colorMetric)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Multi-Metric Comparison
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Line type="monotone" dataKey="carbon" stroke="#8884d8" name="Carbon" strokeWidth={2} />
                      <Line type="monotone" dataKey="energy" stroke="#82ca9d" name="Energy" strokeWidth={2} />
                      <Line type="monotone" dataKey="waste" stroke="#ffc658" name="Waste" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Performance Summary
                  </Typography>
                  <Stack spacing={2}>
                    <Alert severity="success">
                      Carbon emissions reduced by 12.5% compared to last period
                    </Alert>
                    <Alert severity="info">
                      Energy efficiency improved by 15.2% through process optimization
                    </Alert>
                    <Alert severity="warning">
                      Waste generation increased by 5.1% - attention needed
                    </Alert>
                    <Box>
                      <Typography variant="subtitle2" gutterBottom>
                        Key Achievements:
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        <Chip label="Water -8.3%" color="success" size="small" icon={<CheckCircle />} />
                        <Chip label="Recycling +3.2%" color="success" size="small" icon={<CheckCircle />} />
                        <Chip label="Renewable +8.7%" color="success" size="small" icon={<CheckCircle />} />
                      </Stack>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Environmental Hotspots
                  </Typography>
                  <ResponsiveContainer width="100%" height={350}>
                    <RechartsPieChart>
                      <Pie
                        data={hotspotData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.name}: ${entry.value}%`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {hotspotData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Process Impact Analysis
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Process</TableCell>
                          <TableCell align="center">Impact</TableCell>
                          <TableCell align="right">Contribution</TableCell>
                          <TableCell align="center">Priority</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {hotspotData.map((process) => (
                          <TableRow key={process.name} hover>
                            <TableCell>{process.name}</TableCell>
                            <TableCell align="center">
                              <Chip
                                size="small"
                                label={process.impact}
                                sx={{
                                  bgcolor: `${getImpactColor(process.impact)}20`,
                                  color: getImpactColor(process.impact),
                                  fontWeight: 600
                                }}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Box sx={{ width: 60, mr: 1 }}>
                                  <LinearProgress
                                    variant="determinate"
                                    value={process.value}
                                    sx={{
                                      height: 6,
                                      borderRadius: 3,
                                      bgcolor: 'grey.200',
                                      '& .MuiLinearProgress-bar': {
                                        bgcolor: process.color,
                                        borderRadius: 3
                                      }
                                    }}
                                  />
                                </Box>
                                <Typography variant="body2" sx={{ minWidth: 35 }}>
                                  {process.value}%
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell align="center">
                              {process.value > 30 && <Badge badgeContent="!" color="error"><Warning color="error" /></Badge>}
                              {process.value > 15 && process.value <= 30 && <Warning color="warning" />}
                              {process.value <= 15 && <CheckCircle color="success" />}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  
                  <Box sx={{ mt: 3 }}>
                    <Alert severity="info">
                      <Typography variant="subtitle2" gutterBottom>
                        Focus Areas:
                      </Typography>
                      <Typography variant="body2">
                        Smelting process accounts for 45% of total environmental impact. 
                        Immediate optimization opportunities identified.
                      </Typography>
                    </Alert>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Impact Distribution Heat Map
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <Treemap
                      data={hotspotData}
                      dataKey="value"
                      aspectRatio={4 / 3}
                      stroke="#fff"
                      fill="#8884d8"
                    >
                      <RechartsTooltip />
                    </Treemap>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Product Environmental Performance
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Product</TableCell>
                          <TableCell align="center">Carbon (kg CO2/kg)</TableCell>
                          <TableCell align="center">Water (L/kg)</TableCell>
                          <TableCell align="center">Energy (kWh/kg)</TableCell>
                          <TableCell align="center">Eco-Score</TableCell>
                          <TableCell align="center">Trend</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {productAnalysis.map((product) => (
                          <TableRow key={product.product} hover>
                            <TableCell>
                              <Typography variant="body2" fontWeight={500}>
                                {product.product}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">{product.carbon}</TableCell>
                            <TableCell align="center">{product.water}</TableCell>
                            <TableCell align="center">{product.energy}</TableCell>
                            <TableCell align="center">
                              <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                <CircularProgress
                                  variant="determinate"
                                  value={product.score}
                                  size={40}
                                  thickness={4}
                                  sx={{
                                    color: product.score > 80 ? 'success.main' : product.score > 60 ? 'warning.main' : 'error.main'
                                  }}
                                />
                                <Box
                                  sx={{
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    position: 'absolute',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}
                                >
                                  <Typography variant="caption" component="div" color="text.secondary">
                                    {product.score}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell align="center">
                              {product.trend === 'improving' && <TrendingDown color="success" />}
                              {product.trend === 'stable' && <Remove color="action" />}
                              {product.trend === 'worsening' && <TrendingUp color="error" />}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Product Comparison
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsBarChart data={productAnalysis}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="product" angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Bar dataKey="carbon" fill="#8884d8" name="Carbon" />
                      <Bar dataKey="water" fill="#82ca9d" name="Water" />
                      <Bar dataKey="energy" fill="#ffc658" name="Energy" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Eco-Score Distribution
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={productAnalysis}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="product" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar name="Eco-Score" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Industry Benchmarking
                  </Typography>
                  <ResponsiveContainer width="100%" height={400}>
                    <RadarChart data={comparisonData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="metric" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar
                        name="Your Performance"
                        dataKey="current"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.6}
                      />
                      <Radar
                        name="Industry Average"
                        dataKey="industry"
                        stroke="#82ca9d"
                        fill="#82ca9d"
                        fillOpacity={0.3}
                      />
                      <Radar
                        name="Best in Class"
                        dataKey="best"
                        stroke="#ffc658"
                        fill="#ffc658"
                        fillOpacity={0.3}
                      />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} lg={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Benchmark Summary
                  </Typography>
                  <Stack spacing={2}>
                    <Alert severity="success">
                      Above industry average in 4 out of 5 metrics
                    </Alert>
                    
                    <Box>
                      <Typography variant="subtitle2" gutterBottom>
                        Performance vs Industry:
                      </Typography>
                      {comparisonData.map((item) => (
                        <Box key={item.metric} sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                            <Typography variant="body2">{item.metric}</Typography>
                            <Typography variant="body2" fontWeight={600}>
                              {item.current > item.industry ? '+' : ''}
                              {((item.current - item.industry) / item.industry * 100).toFixed(1)}%
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={(item.current / item.best) * 100}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              bgcolor: 'grey.200',
                              '& .MuiLinearProgress-bar': {
                                bgcolor: item.current > item.industry ? 'success.main' : 'warning.main'
                              }
                            }}
                          />
                        </Box>
                      ))}
                    </Box>
                    
                    <Divider />
                    
                    <Box>
                      <Typography variant="subtitle2" gutterBottom>
                        Gap to Best in Class:
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        <Chip label="Carbon: -10%" size="small" color="warning" />
                        <Chip label="Water: -12%" size="small" color="warning" />
                        <Chip label="Energy: -16%" size="small" color="error" />
                      </Stack>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={5}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Alert severity="info" sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  AI-Powered Recommendations
                </Typography>
                <Typography variant="body2">
                  Based on your current performance data and industry best practices, we've identified {recommendations.length} opportunities for improvement.
                </Typography>
              </Alert>
            </Grid>
            
            {recommendations.map((rec, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          {rec.title}
                        </Typography>
                        <Stack direction="row" spacing={1}>
                          <Chip
                            size="small"
                            label={rec.category}
                            color="primary"
                            variant="outlined"
                          />
                          <Chip
                            size="small"
                            label={`Impact: ${rec.impact}`}
                            color={
                              rec.impact === 'Very High' ? 'error' :
                              rec.impact === 'High' ? 'warning' :
                              'default'
                            }
                          />
                          {rec.status === 'completed' && (
                            <Chip
                              size="small"
                              label="Completed"
                              color="success"
                              icon={<CheckCircle />}
                            />
                          )}
                          {rec.status === 'in-progress' && (
                            <Chip
                              size="small"
                              label="In Progress"
                              color="info"
                            />
                          )}
                          {rec.status === 'new' && (
                            <Chip
                              size="small"
                              label="New"
                              color="secondary"
                            />
                          )}
                        </Stack>
                      </Box>
                      <IconButton size="small">
                        <Info />
                      </IconButton>
                    </Box>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">
                          Potential Savings
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          {rec.savings}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">
                          ROI Period
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          {rec.roi}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">
                          Implementation Effort
                        </Typography>
                        <Typography variant="body1">
                          {rec.effort}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">
                          Priority Score
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              sx={{
                                fontSize: 16,
                                color: star <= (rec.impact === 'Very High' ? 5 : rec.impact === 'High' ? 4 : 3) ? 'warning.main' : 'grey.300'
                              }}
                            />
                          ))}
                        </Box>
                      </Grid>
                    </Grid>
                    
                    <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                      <Stack direction="row" spacing={1}>
                        <Button size="small" variant="contained">
                          View Details
                        </Button>
                        <Button size="small" variant="outlined">
                          Create Task
                        </Button>
                      </Stack>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default Analysis;
