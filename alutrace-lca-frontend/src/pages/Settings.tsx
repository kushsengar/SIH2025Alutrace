import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  Stack,
  Slider,
  FormGroup,
  Tooltip,
  Badge,
  LinearProgress,
  InputAdornment,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormHelperText,
  Checkbox,
  Radio,
  RadioGroup,
  FormLabel
} from '@mui/material';
import {
  Person,
  Security,
  Notifications,
  Api,
  Storage,
  Palette,
  Language,
  Email,
  Key,
  Business,
  Edit,
  Delete,
  Add,
  Save,
  Cancel,
  Check,
  Close,
  Info,
  Warning,
  CloudUpload,
  Download,
  Refresh,
  VpnKey,
  AdminPanelSettings,
  Group,
  Settings as SettingsIcon,
  Backup,
  RestartAlt,
  Update,
  BugReport,
  HelpOutline,
  Description,
  Schedule,
  DataUsage,
  Speed,
  Memory,
  DarkMode,
  LightMode,
  Contrast,
  Factory,
  Science,
  CloudQueue,
  WaterDrop,
  ElectricBolt,
  Recycling,
  Public,
  LocalShipping,
  AccountTree,
  ExpandMore,
  Engineering,
  Policy,
  VerifiedUser,
  DataObject,
  Assessment,
  Calculate,
  TrendingUp,
  Sync,
  ErrorOutline,
  CheckCircle,
  Loop,
  PlayArrow
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer
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
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const Settings: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [apiKeyDialogOpen, setApiKeyDialogOpen] = useState(false);
  const [facilityDialogOpen, setFacilityDialogOpen] = useState(false);
  
  // Settings states
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    reports: true,
    alerts: true,
    updates: false,
    compliance: true
  });
  const [dataRetention, setDataRetention] = useState(365);
  const [autoBackup, setAutoBackup] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState('metric');
  const [calculationMethod, setCalculationMethod] = useState('ipcc2021');
  const [allocationMethod, setAllocationMethod] = useState('mass');
  const [impactMethod, setImpactMethod] = useState('recipe2016');
  const [dataQualityThreshold, setDataQualityThreshold] = useState(80);
  const [uncertaintyAnalysis, setUncertaintyAnalysis] = useState(true);

  // Aluminium-specific configuration
  const [aluminiumConfig, setAluminiumConfig] = useState({
    primaryEnergy: 'grid-mix',
    recyclingRate: 35,
    transportMode: 'combined',
    alloyComposition: true,
    byProducts: true,
    wasteRecovery: true
  });

  // Sample data
  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@alutrace.com',
      role: 'LCA Manager',
      department: 'Sustainability',
      status: 'Active',
      lastLogin: '2024-06-30 10:30',
      permissions: ['full']
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@alutrace.com',
      role: 'Environmental Analyst',
      department: 'Quality',
      status: 'Active',
      lastLogin: '2024-06-30 09:15',
      permissions: ['read', 'write']
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@alutrace.com',
      role: 'Data Analyst',
      department: 'Operations',
      status: 'Active',
      lastLogin: '2024-06-25 14:20',
      permissions: ['read']
    }
  ];

  const facilities = [
    {
      id: 1,
      name: 'Primary Smelter - North',
      type: 'Smelter',
      location: 'Quebec, Canada',
      capacity: '450,000 t/year',
      technology: 'AP30 Prebake',
      energy: 'Hydroelectric',
      status: 'operational',
      emissions: 2.1
    },
    {
      id: 2,
      name: 'Rolling Mill - East',
      type: 'Rolling Mill',
      location: 'Ohio, USA',
      capacity: '200,000 t/year',
      technology: 'Hot/Cold Rolling',
      energy: 'Grid Mix',
      status: 'operational',
      emissions: 0.8
    },
    {
      id: 3,
      name: 'Recycling Plant - West',
      type: 'Recycling',
      location: 'California, USA',
      capacity: '100,000 t/year',
      technology: 'Secondary Melting',
      energy: 'Solar + Grid',
      status: 'operational',
      emissions: 0.5
    }
  ];

  const apiKeys = [
    {
      id: 1,
      name: 'Production API',
      key: 'ak_prod_xxxxxxxxxxxx',
      scope: 'Full Access',
      created: '2024-01-15',
      lastUsed: '2024-06-30',
      status: 'active'
    },
    {
      id: 2,
      name: 'Ecoinvent Database',
      key: 'ak_eco_yyyyyyyyyyyy',
      scope: 'Read Only',
      created: '2024-03-20',
      lastUsed: '2024-06-29',
      status: 'active'
    },
    {
      id: 3,
      name: 'GaBi Integration',
      key: 'ak_gabi_zzzzzzzzzzzz',
      scope: 'Data Exchange',
      created: '2024-05-10',
      lastUsed: '2024-06-15',
      status: 'active'
    }
  ];

  const integrations = [
    {
      name: 'SAP ERP',
      status: 'connected',
      lastSync: '2024-06-30 08:00',
      dataPoints: '15,234',
      icon: <Business />,
      type: 'ERP'
    },
    {
      name: 'IoT Sensors',
      status: 'connected',
      lastSync: '2024-06-30 10:45',
      dataPoints: '8,923',
      icon: <Memory />,
      type: 'IoT'
    },
    {
      name: 'Ecoinvent 3.9',
      status: 'connected',
      lastSync: '2024-06-30 06:00',
      dataPoints: '45,678',
      icon: <DataObject />,
      type: 'Database'
    },
    {
      name: 'GaBi Database',
      status: 'connected',
      lastSync: '2024-06-29 23:00',
      dataPoints: '38,456',
      icon: <Storage />,
      type: 'Database'
    },
    {
      name: 'Weather API',
      status: 'connected',
      lastSync: '2024-06-30 11:00',
      dataPoints: '2,847',
      icon: <CloudQueue />,
      type: 'External'
    },
    {
      name: 'Energy Grid Data',
      status: 'error',
      lastSync: '2024-06-29 18:00',
      dataPoints: '0',
      icon: <ElectricBolt />,
      type: 'External'
    }
  ];

  const emissionFactors = [
    { category: 'Electricity (Grid)', value: 0.45, unit: 'kg CO2e/kWh', source: 'IEA 2023' },
    { category: 'Natural Gas', value: 2.04, unit: 'kg CO2e/m³', source: 'IPCC 2021' },
    { category: 'Bauxite Mining', value: 0.02, unit: 'kg CO2e/kg', source: 'IAI 2022' },
    { category: 'Alumina Production', value: 1.65, unit: 'kg CO2e/kg', source: 'IAI 2022' },
    { category: 'Transport (Ship)', value: 0.012, unit: 'kg CO2e/t-km', source: 'GLEC 2023' },
    { category: 'Transport (Truck)', value: 0.105, unit: 'kg CO2e/t-km', source: 'GLEC 2023' }
  ];

  const systemInfo = {
    version: '2.4.1',
    lastUpdate: '2024-06-15',
    storage: { used: 145, total: 500 },
    database: { size: 28.5, records: 2850000 },
    performance: { cpu: 35, memory: 62, uptime: 99.8 },
    dataQuality: { completeness: 95, accuracy: 98, consistency: 96 }
  };

  // Performance data
  const performanceData = [
    { time: '00:00', cpu: 25, memory: 45 },
    { time: '04:00', cpu: 20, memory: 42 },
    { time: '08:00', cpu: 45, memory: 58 },
    { time: '12:00', cpu: 65, memory: 72 },
    { time: '16:00', cpu: 55, memory: 68 },
    { time: '20:00', cpu: 35, memory: 52 },
    { time: '24:00', cpu: 30, memory: 48 }
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'LCA Manager': return 'error';
      case 'Environmental Analyst': return 'primary';
      case 'Data Analyst': return 'default';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'connected':
      case 'operational':
        return 'success';
      case 'inactive':
        return 'default';
      case 'error':
        return 'error';
      case 'maintenance':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          System Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Configure LCA platform settings, manage users, and customize aluminium production parameters
        </Typography>
      </Box>

      <Paper>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="General" icon={<SettingsIcon />} iconPosition="start" />
          <Tab label="LCA Configuration" icon={<Assessment />} iconPosition="start" />
          <Tab label="Facilities" icon={<Factory />} iconPosition="start" />
          <Tab label="Users & Access" icon={<Group />} iconPosition="start" />
          <Tab label="Integrations" icon={<Api />} iconPosition="start" />
          <Tab label="Data & Factors" icon={<Calculate />} iconPosition="start" />
          <Tab label="System" icon={<Storage />} iconPosition="start" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Organization Information
                  </Typography>
                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      label="Organization Name"
                      defaultValue="AluTrace Industries"
                      disabled={!editMode}
                      InputProps={{
                        startAdornment: <InputAdornment position="start"><Business /></InputAdornment>
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Industry Sector"
                      defaultValue="Primary Aluminium Production"
                      disabled={!editMode}
                    />
                    <FormControl fullWidth disabled={!editMode}>
                      <InputLabel>Region</InputLabel>
                      <Select defaultValue="north-america" label="Region">
                        <MenuItem value="north-america">North America</MenuItem>
                        <MenuItem value="europe">Europe</MenuItem>
                        <MenuItem value="asia-pacific">Asia Pacific</MenuItem>
                        <MenuItem value="middle-east">Middle East</MenuItem>
                        <MenuItem value="latin-america">Latin America</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      fullWidth
                      label="ASI Certification Number"
                      defaultValue="ASI-PRD-2023-0142"
                      disabled={!editMode}
                      InputProps={{
                        startAdornment: <InputAdornment position="start"><VerifiedUser /></InputAdornment>
                      }}
                    />
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      {!editMode ? (
                        <Button
                          variant="outlined"
                          startIcon={<Edit />}
                          onClick={() => setEditMode(true)}
                        >
                          Edit
                        </Button>
                      ) : (
                        <>
                          <Button
                            variant="contained"
                            startIcon={<Save />}
                            onClick={() => setEditMode(false)}
                          >
                            Save
                          </Button>
                          <Button
                            variant="outlined"
                            startIcon={<Cancel />}
                            onClick={() => setEditMode(false)}
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Display & Regional Settings
                  </Typography>
                  <Stack spacing={3}>
                    <FormControl fullWidth>
                      <InputLabel>Theme</InputLabel>
                      <Select
                        value={theme}
                        label="Theme"
                        onChange={(e) => setTheme(e.target.value)}
                      >
                        <MenuItem value="light">
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <LightMode sx={{ mr: 1 }} /> Light
                          </Box>
                        </MenuItem>
                        <MenuItem value="dark">
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <DarkMode sx={{ mr: 1 }} /> Dark
                          </Box>
                        </MenuItem>
                        <MenuItem value="auto">
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Contrast sx={{ mr: 1 }} /> Auto
                          </Box>
                        </MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel>Language</InputLabel>
                      <Select
                        value={language}
                        label="Language"
                        onChange={(e) => setLanguage(e.target.value)}
                      >
                        <MenuItem value="en">English</MenuItem>
                        <MenuItem value="es">Español</MenuItem>
                        <MenuItem value="fr">Français</MenuItem>
                        <MenuItem value="de">Deutsch</MenuItem>
                        <MenuItem value="zh">中文</MenuItem>
                        <MenuItem value="ar">العربية</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel>Unit System</InputLabel>
                      <Select
                        value={selectedUnit}
                        label="Unit System"
                        onChange={(e) => setSelectedUnit(e.target.value)}
                      >
                        <MenuItem value="metric">Metric (kg, m³, kWh)</MenuItem>
                        <MenuItem value="imperial">Imperial (lb, ft³, BTU)</MenuItem>
                        <MenuItem value="mixed">Mixed</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel>Currency</InputLabel>
                      <Select defaultValue="USD" label="Currency">
                        <MenuItem value="USD">USD - US Dollar</MenuItem>
                        <MenuItem value="EUR">EUR - Euro</MenuItem>
                        <MenuItem value="GBP">GBP - British Pound</MenuItem>
                        <MenuItem value="CNY">CNY - Chinese Yuan</MenuItem>
                        <MenuItem value="AUD">AUD - Australian Dollar</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Notification Preferences
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={notifications.email}
                              onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                            />
                          }
                          label="Email notifications"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={notifications.reports}
                              onChange={(e) => setNotifications({ ...notifications, reports: e.target.checked })}
                            />
                          }
                          label="Report generation complete"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={notifications.alerts}
                              onChange={(e) => setNotifications({ ...notifications, alerts: e.target.checked })}
                            />
                          }
                          label="System alerts and warnings"
                        />
                      </FormGroup>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={notifications.compliance}
                              onChange={(e) => setNotifications({ ...notifications, compliance: e.target.checked })}
                            />
                          }
                          label="Compliance updates"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={notifications.push}
                              onChange={(e) => setNotifications({ ...notifications, push: e.target.checked })}
                            />
                          }
                          label="Push notifications"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={notifications.updates}
                              onChange={(e) => setNotifications({ ...notifications, updates: e.target.checked })}
                            />
                          }
                          label="Product updates and news"
                        />
                      </FormGroup>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Alert severity="info" sx={{ mb: 3 }}>
                <Typography variant="subtitle2">LCA Methodology Configuration</Typography>
                <Typography variant="body2">
                  Configure calculation methods, allocation rules, and impact assessment methodologies specific to aluminium production.
                </Typography>
              </Alert>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Calculation Methods
                  </Typography>
                  <Stack spacing={3}>
                    <FormControl fullWidth>
                      <InputLabel>GHG Calculation Method</InputLabel>
                      <Select
                        value={calculationMethod}
                        label="GHG Calculation Method"
                        onChange={(e) => setCalculationMethod(e.target.value)}
                      >
                        <MenuItem value="ipcc2021">IPCC 2021 (AR6)</MenuItem>
                        <MenuItem value="ipcc2013">IPCC 2013 (AR5)</MenuItem>
                        <MenuItem value="ghgprotocol">GHG Protocol</MenuItem>
                        <MenuItem value="iso14064">ISO 14064</MenuItem>
                      </Select>
                      <FormHelperText>Methodology for GHG emissions calculation</FormHelperText>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel>Allocation Method</InputLabel>
                      <Select
                        value={allocationMethod}
                        label="Allocation Method"
                        onChange={(e) => setAllocationMethod(e.target.value)}
                      >
                        <MenuItem value="mass">Mass Allocation</MenuItem>
                        <MenuItem value="economic">Economic Allocation</MenuItem>
                        <MenuItem value="energy">Energy Content</MenuItem>
                        <MenuItem value="exergy">Exergy Content</MenuItem>
                        <MenuItem value="system-expansion">System Expansion</MenuItem>
                      </Select>
                      <FormHelperText>Method for multi-output processes</FormHelperText>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel>Impact Assessment Method</InputLabel>
                      <Select
                        value={impactMethod}
                        label="Impact Assessment Method"
                        onChange={(e) => setImpactMethod(e.target.value)}
                      >
                        <MenuItem value="recipe2016">ReCiPe 2016</MenuItem>
                        <MenuItem value="ef3.0">Environmental Footprint 3.0</MenuItem>
                        <MenuItem value="impact2002">IMPACT 2002+</MenuItem>
                        <MenuItem value="traci2.1">TRACI 2.1</MenuItem>
                        <MenuItem value="cml2001">CML 2001</MenuItem>
                      </Select>
                      <FormHelperText>Life cycle impact assessment methodology</FormHelperText>
                    </FormControl>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={uncertaintyAnalysis}
                          onChange={(e) => setUncertaintyAnalysis(e.target.checked)}
                        />
                      }
                      label="Enable Uncertainty Analysis (Monte Carlo)"
                    />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Aluminium-Specific Parameters
                  </Typography>
                  <Stack spacing={3}>
                    <FormControl fullWidth>
                      <InputLabel>Primary Energy Source</InputLabel>
                      <Select
                        value={aluminiumConfig.primaryEnergy}
                        label="Primary Energy Source"
                        onChange={(e) => setAluminiumConfig({ ...aluminiumConfig, primaryEnergy: e.target.value })}
                      >
                        <MenuItem value="hydroelectric">Hydroelectric</MenuItem>
                        <MenuItem value="coal">Coal</MenuItem>
                        <MenuItem value="natural-gas">Natural Gas</MenuItem>
                        <MenuItem value="grid-mix">Grid Mix</MenuItem>
                        <MenuItem value="renewable-mix">Renewable Mix</MenuItem>
                      </Select>
                      <FormHelperText>Primary energy for smelting process</FormHelperText>
                    </FormControl>
                    <Box>
                      <Typography variant="body2" gutterBottom>
                        Default Recycling Rate: {aluminiumConfig.recyclingRate}%
                      </Typography>
                      <Slider
                        value={aluminiumConfig.recyclingRate}
                        onChange={(e, val) => setAluminiumConfig({ ...aluminiumConfig, recyclingRate: val as number })}
                        min={0}
                        max={100}
                        marks={[
                          { value: 0, label: '0%' },
                          { value: 35, label: '35%' },
                          { value: 70, label: '70%' },
                          { value: 100, label: '100%' }
                        ]}
                        valueLabelDisplay="auto"
                      />
                      <FormHelperText>Default recycled content in products</FormHelperText>
                    </Box>
                    <FormControl fullWidth>
                      <InputLabel>Transport Mode Default</InputLabel>
                      <Select
                        value={aluminiumConfig.transportMode}
                        label="Transport Mode Default"
                        onChange={(e) => setAluminiumConfig({ ...aluminiumConfig, transportMode: e.target.value })}
                      >
                        <MenuItem value="ship">Ship</MenuItem>
                        <MenuItem value="rail">Rail</MenuItem>
                        <MenuItem value="truck">Truck</MenuItem>
                        <MenuItem value="combined">Combined</MenuItem>
                      </Select>
                    </FormControl>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={aluminiumConfig.alloyComposition}
                            onChange={(e) => setAluminiumConfig({ ...aluminiumConfig, alloyComposition: e.target.checked })}
                          />
                        }
                        label="Track Alloy Composition"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={aluminiumConfig.byProducts}
                            onChange={(e) => setAluminiumConfig({ ...aluminiumConfig, byProducts: e.target.checked })}
                          />
                        }
                        label="Include By-Products (Red Mud, SPL)"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={aluminiumConfig.wasteRecovery}
                            onChange={(e) => setAluminiumConfig({ ...aluminiumConfig, wasteRecovery: e.target.checked })}
                          />
                        }
                        label="Enable Waste Heat Recovery"
                      />
                    </FormGroup>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Data Quality Requirements
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Box>
                        <Typography variant="body2" gutterBottom>
                          Minimum Data Quality Score: {dataQualityThreshold}%
                        </Typography>
                        <Slider
                          value={dataQualityThreshold}
                          onChange={(e, val) => setDataQualityThreshold(val as number)}
                          min={0}
                          max={100}
                          marks={[
                            { value: 0, label: 'Low' },
                            { value: 50, label: 'Medium' },
                            { value: 80, label: 'High' },
                            { value: 100, label: 'Very High' }
                          ]}
                          valueLabelDisplay="auto"
                        />
                        <FormHelperText>Minimum acceptable data quality for calculations</FormHelperText>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Data Validation Rules</FormLabel>
                        <FormGroup>
                          <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="Temporal Correlation (< 5 years)"
                          />
                          <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="Geographical Correlation"
                          />
                          <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="Technological Correlation"
                          />
                        </FormGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Box sx={{ mb: 3 }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setFacilityDialogOpen(true)}
            >
              Add Facility
            </Button>
          </Box>
          <Grid container spacing={3}>
            {facilities.map((facility) => (
              <Grid item xs={12} md={6} lg={4} key={facility.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box>
                        <Typography variant="h6">
                          {facility.name}
                        </Typography>
                        <Chip
                          size="small"
                          label={facility.type}
                          color="primary"
                          sx={{ mt: 1 }}
                        />
                      </Box>
                      <Chip
                        size="small"
                        label={facility.status}
                        color={getStatusColor(facility.status) as any}
                      />
                    </Box>
                    <List dense>
                      <ListItem>
                        <ListItemIcon><Public /></ListItemIcon>
                        <ListItemText primary="Location" secondary={facility.location} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><Factory /></ListItemIcon>
                        <ListItemText primary="Capacity" secondary={facility.capacity} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><Engineering /></ListItemIcon>
                        <ListItemText primary="Technology" secondary={facility.technology} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><ElectricBolt /></ListItemIcon>
                        <ListItemText primary="Energy Source" secondary={facility.energy} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><CloudQueue /></ListItemIcon>
                        <ListItemText 
                          primary="Carbon Intensity" 
                          secondary={`${facility.emissions} kg CO₂/kg Al`} 
                        />
                      </ListItem>
                    </List>
                    <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                      <Button size="small" startIcon={<Edit />}>Edit</Button>
                      <Button size="small" startIcon={<Assessment />}>View LCA</Button>
                      <IconButton size="small" color="error">
                        <Delete />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Box sx={{ mb: 3 }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setAddUserDialogOpen(true)}
            >
              Add User
            </Button>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Permissions</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Last Login</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        <Box>
                          <Typography variant="body2">{user.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {user.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.role}
                        size="small"
                        color={getRoleColor(user.role) as any}
                      />
                    </TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={0.5}>
                        {user.permissions.map((perm) => (
                          <Chip key={perm} label={perm} size="small" variant="outlined" />
                        ))}
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.status}
                        size="small"
                        color={user.status === 'Active' ? 'success' : 'default'}
                      />
                    </TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <IconButton size="small">
                          <Edit />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <Delete />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Alert severity="success" sx={{ mb: 3 }}>
                <Typography variant="subtitle2">Integration Status</Typography>
                <Typography variant="body2">
                  5 of 6 integrations are connected and syncing data successfully.
                </Typography>
              </Alert>
            </Grid>
            {integrations.map((integration, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.light', mr: 2 }}>
                        {integration.icon}
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6">
                          {integration.name}
                        </Typography>
                        <Chip
                          size="small"
                          label={integration.type}
                          variant="outlined"
                        />
                      </Box>
                      <Chip
                        size="small"
                        label={integration.status}
                        color={getStatusColor(integration.status) as any}
                      />
                    </Box>
                    <List dense>
                      <ListItem>
                        <ListItemText
                          primary="Last Sync"
                          secondary={integration.lastSync}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Data Points"
                          secondary={integration.dataPoints}
                        />
                      </ListItem>
                    </List>
                    <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                      <Button size="small" variant="outlined">
                        Configure
                      </Button>
                      {integration.status === 'error' ? (
                        <Button size="small" variant="contained" color="error">
                          Reconnect
                        </Button>
                      ) : (
                        <Button size="small" startIcon={<Sync />}>
                          Sync Now
                        </Button>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    API Keys Management
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Key</TableCell>
                          <TableCell>Scope</TableCell>
                          <TableCell>Created</TableCell>
                          <TableCell>Last Used</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell align="right">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {apiKeys.map((key) => (
                          <TableRow key={key.id}>
                            <TableCell>{key.name}</TableCell>
                            <TableCell>
                              <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                                {key.key}
                              </Typography>
                            </TableCell>
                            <TableCell>{key.scope}</TableCell>
                            <TableCell>{key.created}</TableCell>
                            <TableCell>{key.lastUsed}</TableCell>
                            <TableCell>
                              <Chip
                                size="small"
                                label={key.status}
                                color={getStatusColor(key.status) as any}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <Stack direction="row" spacing={1} justifyContent="flex-end">
                                <IconButton size="small">
                                  <Edit />
                                </IconButton>
                                <IconButton size="small" color="error">
                                  <Delete />
                                </IconButton>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Box sx={{ mt: 2 }}>
                    <Button startIcon={<Add />} variant="outlined">
                      Generate New API Key
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={5}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Emission Factors Database
                  </Typography>
                  <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Managing {emissionFactors.length} emission factors for aluminium production
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <Button size="small" startIcon={<CloudUpload />}>
                        Import
                      </Button>
                      <Button size="small" startIcon={<Add />} variant="contained">
                        Add Factor
                      </Button>
                    </Stack>
                  </Box>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Category</TableCell>
                          <TableCell>Value</TableCell>
                          <TableCell>Unit</TableCell>
                          <TableCell>Source</TableCell>
                          <TableCell align="right">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {emissionFactors.map((factor, index) => (
                          <TableRow key={index}>
                            <TableCell>{factor.category}</TableCell>
                            <TableCell>{factor.value}</TableCell>
                            <TableCell>{factor.unit}</TableCell>
                            <TableCell>
                              <Chip label={factor.source} size="small" />
                            </TableCell>
                            <TableCell align="right">
                              <IconButton size="small">
                                <Edit />
                              </IconButton>
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
                    Database Sources
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <DataObject color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Ecoinvent 3.9"
                        secondary="45,678 data points - Updated: 2024-06-30"
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end">
                          <Sync />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <DataObject color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="GaBi Database"
                        secondary="38,456 data points - Updated: 2024-06-29"
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end">
                          <Sync />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <DataObject color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="IAI Statistics"
                        secondary="12,345 data points - Updated: 2024-06-28"
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end">
                          <Sync />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Data Quality Metrics
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Completeness</Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {systemInfo.dataQuality.completeness}%
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={systemInfo.dataQuality.completeness} 
                        sx={{ height: 8, borderRadius: 4 }} 
                      />
                    </Box>
                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Accuracy</Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {systemInfo.dataQuality.accuracy}%
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={systemInfo.dataQuality.accuracy} 
                        color="success" 
                        sx={{ height: 8, borderRadius: 4 }} 
                      />
                    </Box>
                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Consistency</Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {systemInfo.dataQuality.consistency}%
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={systemInfo.dataQuality.consistency} 
                        color="warning" 
                        sx={{ height: 8, borderRadius: 4 }} 
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    System Information
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Version"
                        secondary={systemInfo.version}
                      />
                      <Button size="small" startIcon={<Update />}>
                        Check Updates
                      </Button>
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Last Update"
                        secondary={systemInfo.lastUpdate}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="License"
                        secondary="Enterprise - Valid until Dec 2024"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="System Uptime"
                        secondary={`${systemInfo.performance.uptime}%`}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Storage
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Storage Used</Typography>
                      <Typography variant="body2">
                        {systemInfo.storage.used}GB / {systemInfo.storage.total}GB
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={(systemInfo.storage.used / systemInfo.storage.total) * 100}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" gutterBottom>
                      Database Size: {systemInfo.database.size}GB
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {systemInfo.database.records.toLocaleString()} records
                    </Typography>
                  </Box>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="body2" gutterBottom>
                        Data Retention Period
                      </Typography>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Slider
                          value={dataRetention}
                          onChange={(e, val) => setDataRetention(val as number)}
                          min={30}
                          max={730}
                          step={30}
                          sx={{ flexGrow: 1 }}
                        />
                        <Typography variant="body2">{dataRetention} days</Typography>
                      </Stack>
                    </Box>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={autoBackup}
                          onChange={(e) => setAutoBackup(e.target.checked)}
                        />
                      }
                      label="Automatic Backup"
                    />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    System Performance
                  </Typography>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <RechartsTooltip />
                      <Area type="monotone" dataKey="cpu" stroke="#8884d8" fill="#8884d8" name="CPU %" />
                      <Area type="monotone" dataKey="memory" stroke="#82ca9d" fill="#82ca9d" name="Memory %" />
                    </AreaChart>
                  </ResponsiveContainer>
                  <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                    <Button size="small" startIcon={<RestartAlt />}>
                      Restart
                    </Button>
                    <Button size="small" startIcon={<BugReport />}>
                      Diagnostics
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Maintenance
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<Backup />}
                      >
                        Backup Now
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<CloudUpload />}
                      >
                        Export Data
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<Download />}
                      >
                        Download Logs
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<Refresh />}
                      >
                        Clear Cache
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>

      {/* Dialogs */}
      <Dialog open={addUserDialogOpen} onClose={() => setAddUserDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField fullWidth label="Full Name" />
            <TextField fullWidth label="Email" type="email" />
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select label="Role">
                <MenuItem value="lca-manager">LCA Manager</MenuItem>
                <MenuItem value="env-analyst">Environmental Analyst</MenuItem>
                <MenuItem value="data-analyst">Data Analyst</MenuItem>
                <MenuItem value="viewer">Viewer</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Department</InputLabel>
              <Select label="Department">
                <MenuItem value="sustainability">Sustainability</MenuItem>
                <MenuItem value="operations">Operations</MenuItem>
                <MenuItem value="quality">Quality</MenuItem>
                <MenuItem value="management">Management</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Send invitation email"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddUserDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setAddUserDialogOpen(false)}>
            Add User
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={facilityDialogOpen} onClose={() => setFacilityDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New Facility</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField fullWidth label="Facility Name" />
            <FormControl fullWidth>
              <InputLabel>Facility Type</InputLabel>
              <Select label="Facility Type">
                <MenuItem value="bauxite-mine">Bauxite Mine</MenuItem>
                <MenuItem value="alumina-refinery">Alumina Refinery</MenuItem>
                <MenuItem value="smelter">Aluminium Smelter</MenuItem>
                <MenuItem value="rolling-mill">Rolling Mill</MenuItem>
                <MenuItem value="extrusion">Extrusion Plant</MenuItem>
                <MenuItem value="recycling">Recycling Facility</MenuItem>
              </Select>
            </FormControl>
            <TextField fullWidth label="Location" />
            <TextField fullWidth label="Annual Capacity" placeholder="e.g., 500,000 t/year" />
            <FormControl fullWidth>
              <InputLabel>Technology</InputLabel>
              <Select label="Technology">
                <MenuItem value="prebake">Prebake (Point Feed)</MenuItem>
                <MenuItem value="soderberg">Söderberg</MenuItem>
                <MenuItem value="hall-heroult">Hall-Héroult</MenuItem>
                <MenuItem value="bayer">Bayer Process</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Primary Energy Source</InputLabel>
              <Select label="Primary Energy Source">
                <MenuItem value="hydroelectric">Hydroelectric</MenuItem>
                <MenuItem value="coal">Coal</MenuItem>
                <MenuItem value="natural-gas">Natural Gas</MenuItem>
                <MenuItem value="renewable-mix">Renewable Mix</MenuItem>
                <MenuItem value="grid-mix">Grid Mix</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFacilityDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setFacilityDialogOpen(false)}>
            Add Facility
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Settings;
