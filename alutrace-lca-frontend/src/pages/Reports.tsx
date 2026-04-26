import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Stack,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Divider,
  LinearProgress,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Tab,
  Tabs,
  Badge,
  Avatar,
  Box as MuiBox,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  FormGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  Description,
  PictureAsPdf,
  TableChart,
  Assessment,
  Schedule,
  Download,
  Share,
  Edit,
  Delete,
  Add,
  Search,
  FilterList,
  Print,
  Email,
  CloudDownload,
  Visibility,
  CalendarToday,
  Timer,
  CheckCircle,
  Warning,
  Error as ErrorIcon,
  AutoGraph,
  BarChart,
  DonutLarge,
  Timeline,
  Groups,
  Business,
  Public,
  LocalShipping,
  Folder,
  Star,
  StarBorder,
  Factory,
  CloudQueue,
  WaterDrop,
  ElectricBolt,
  Recycling,
  Nature,
  AccountTree,
  ExpandMore,
  FilePresent,
  Loop,
  PlayArrow,
  Pause,
  Stop,
  MoreVert,
  AttachFile,
  Language,
  Security,
  VerifiedUser,
  EmojiEvents,
  TrendingUp,
  TrendingDown
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart
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
      id={`reports-tabpanel-${index}`}
      aria-labelledby={`reports-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const Reports: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [reportType, setReportType] = useState('');
  const [reportFormat, setReportFormat] = useState('pdf');
  const [timeRange, setTimeRange] = useState('month');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedStages, setSelectedStages] = useState<string[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  // Report templates specific to aluminium LCA
  const reportTemplates = [
    {
      id: 1,
      name: 'ISO 14040 LCA Report',
      description: 'Comprehensive LCA report following ISO 14040/14044 standards',
      icon: <VerifiedUser />,
      category: 'Compliance',
      fields: ['Goal & Scope', 'Inventory Analysis', 'Impact Assessment', 'Interpretation'],
      favorite: true,
      tags: ['ISO', 'Standard', 'Compliance']
    },
    {
      id: 2,
      name: 'Carbon Footprint Report',
      description: 'Detailed carbon emissions analysis for aluminium production',
      icon: <CloudQueue />,
      category: 'Environmental',
      fields: ['GHG Emissions', 'Scope 1/2/3', 'Carbon Intensity', 'Reduction Opportunities'],
      favorite: true,
      tags: ['Carbon', 'GHG', 'Emissions']
    },
    {
      id: 3,
      name: 'EPD Report',
      description: 'Environmental Product Declaration for aluminium products',
      icon: <EmojiEvents />,
      category: 'Product',
      fields: ['Product Info', 'LCA Results', 'Environmental Impact', 'Verification'],
      favorite: false,
      tags: ['EPD', 'Product', 'Declaration']
    },
    {
      id: 4,
      name: 'Circular Economy Report',
      description: 'Material circularity and recycling performance metrics',
      icon: <Recycling />,
      category: 'Sustainability',
      fields: ['MCI Score', 'Recycled Content', 'End-of-Life', 'Material Flow'],
      favorite: true,
      tags: ['Circular', 'Recycling', 'MCI']
    },
    {
      id: 5,
      name: 'Supply Chain Report',
      description: 'Upstream emissions and supplier sustainability assessment',
      icon: <LocalShipping />,
      category: 'Supply Chain',
      fields: ['Supplier Data', 'Transport Emissions', 'Raw Materials', 'Traceability'],
      favorite: false,
      tags: ['Supply Chain', 'Upstream', 'Suppliers']
    },
    {
      id: 6,
      name: 'Water Impact Assessment',
      description: 'Water footprint and usage analysis across production',
      icon: <WaterDrop />,
      category: 'Environmental',
      fields: ['Water Consumption', 'Water Stress', 'Quality Impact', 'Treatment'],
      favorite: false,
      tags: ['Water', 'Footprint', 'Usage']
    },
    {
      id: 7,
      name: 'Energy Performance Report',
      description: 'Energy consumption and renewable energy metrics',
      icon: <ElectricBolt />,
      category: 'Energy',
      fields: ['Energy Intensity', 'Renewable %', 'Grid Mix', 'Efficiency'],
      favorite: false,
      tags: ['Energy', 'Renewable', 'Efficiency']
    },
    {
      id: 8,
      name: 'ASI Performance Standard',
      description: 'Aluminium Stewardship Initiative compliance report',
      icon: <Security />,
      category: 'Compliance',
      fields: ['Governance', 'Environmental', 'Social', 'Performance'],
      favorite: true,
      tags: ['ASI', 'Stewardship', 'Standard']
    }
  ];

  // Recent reports with aluminium-specific data
  const recentReports = [
    {
      id: 1,
      name: 'Q2 2024 Carbon Footprint - Primary Aluminium',
      type: 'Carbon Footprint',
      date: '2024-06-30',
      size: '3.2 MB',
      status: 'completed',
      author: 'Environmental Team',
      format: 'PDF',
      metrics: { carbon: 11.8, water: 95, energy: 155.2 },
      badge: 'verified'
    },
    {
      id: 2,
      name: 'EPD - Aluminium Sheet Products',
      type: 'EPD Report',
      date: '2024-06-28',
      size: '4.5 MB',
      status: 'completed',
      author: 'Product Team',
      format: 'PDF',
      metrics: { carbon: 4.2, recycled: 35, mci: 0.68 },
      badge: 'certified'
    },
    {
      id: 3,
      name: 'ISO 14040 LCA - Extrusion Process',
      type: 'ISO 14040 LCA',
      date: '2024-06-25',
      size: '7.8 MB',
      status: 'processing',
      author: 'LCA Team',
      format: 'PDF',
      metrics: { completion: 85 },
      badge: null
    },
    {
      id: 4,
      name: 'Monthly Circular Economy Metrics',
      type: 'Circular Economy',
      date: '2024-06-24',
      size: '2.1 MB',
      status: 'completed',
      author: 'Sustainability Team',
      format: 'Excel',
      metrics: { recycled: 78, waste: 342, recovery: 92 },
      badge: null
    },
    {
      id: 5,
      name: 'ASI Performance Standard Audit',
      type: 'ASI Standard',
      date: '2024-06-20',
      size: '5.6 MB',
      status: 'review',
      author: 'Compliance Team',
      format: 'PDF',
      metrics: { compliance: 94 },
      badge: 'pending'
    }
  ];

  // Scheduled reports
  const scheduledReports = [
    {
      id: 1,
      name: 'Monthly Carbon Footprint Report',
      template: 'Carbon Footprint',
      frequency: 'Monthly',
      nextRun: '2024-07-01',
      recipients: ['sustainability@company.com', 'management@company.com'],
      products: ['All Products'],
      status: 'active'
    },
    {
      id: 2,
      name: 'Quarterly EPD Update',
      template: 'EPD Report',
      frequency: 'Quarterly',
      nextRun: '2024-07-15',
      recipients: ['product@company.com', 'customers@company.com'],
      products: ['Sheet', 'Extrusions'],
      status: 'active'
    },
    {
      id: 3,
      name: 'Annual ASI Compliance Report',
      template: 'ASI Standard',
      frequency: 'Annually',
      nextRun: '2024-12-31',
      recipients: ['compliance@company.com', 'board@company.com'],
      products: ['All Facilities'],
      status: 'active'
    }
  ];

  // Performance metrics for dashboard
  const performanceMetrics = [
    { month: 'Jan', reports: 42, automated: 35, manual: 7, accuracy: 96 },
    { month: 'Feb', reports: 38, automated: 32, manual: 6, accuracy: 97 },
    { month: 'Mar', reports: 45, automated: 39, manual: 6, accuracy: 95 },
    { month: 'Apr', reports: 41, automated: 36, manual: 5, accuracy: 98 },
    { month: 'May', reports: 48, automated: 43, manual: 5, accuracy: 97 },
    { month: 'Jun', reports: 52, automated: 48, manual: 4, accuracy: 99 }
  ];

  // Report generation steps
  const reportSteps = [
    { label: 'Select Template', description: 'Choose report type and template' },
    { label: 'Configure Parameters', description: 'Set time range, products, and facilities' },
    { label: 'Data Validation', description: 'Verify data completeness and quality' },
    { label: 'Generate Report', description: 'Process data and create report' },
    { label: 'Review & Export', description: 'Review results and export' }
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleCreateReport = () => {
    setCreateDialogOpen(true);
    setActiveStep(0);
  };

  const handleScheduleReport = () => {
    setScheduleDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'processing': return 'info';
      case 'review': return 'warning';
      case 'failed': return 'error';
      case 'active': return 'success';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle />;
      case 'processing': return <Loop />;
      case 'review': return <Timer />;
      case 'failed': return <ErrorIcon />;
      default: return null;
    }
  };

  const getBadgeColor = (badge: string | null) => {
    switch (badge) {
      case 'verified': return 'success';
      case 'certified': return 'primary';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // Product lines for aluminium
  const productLines = [
    'Primary Aluminium',
    'Aluminium Sheet',
    'Aluminium Extrusions',
    'Aluminium Foil',
    'Cast Aluminium',
    'Recycled Aluminium'
  ];

  // Life cycle stages
  const lifeCycleStages = [
    'Bauxite Mining',
    'Alumina Refining',
    'Aluminium Smelting',
    'Casting',
    'Rolling/Extrusion',
    'Fabrication',
    'Use Phase',
    'End-of-Life/Recycling'
  ];

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          LCA Reports & Documentation
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Generate, schedule, and manage environmental impact reports for aluminium production
        </Typography>
      </Box>

      {/* Quick Actions */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          <TextField
            size="small"
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
            }}
            sx={{ minWidth: 300 }}
          />
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
          <IconButton>
            <FilterList />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            variant="outlined"
            startIcon={<Schedule />}
            onClick={handleScheduleReport}
          >
            Schedule Report
          </Button>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleCreateReport}
          >
            Create Report
          </Button>
        </Stack>
      </Box>

      {/* Report Statistics */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Reports
                  </Typography>
                  <Typography variant="h4">
                    248
                  </Typography>
                  <Typography variant="caption" color="success.main">
                    +12% from last month
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.light', width: 56, height: 56 }}>
                  <Description fontSize="large" />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Verified Reports
                  </Typography>
                  <Typography variant="h4">
                    156
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    63% verification rate
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'success.light', width: 56, height: 56 }}>
                  <VerifiedUser fontSize="large" />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Scheduled
                  </Typography>
                  <Typography variant="h4">
                    12
                  </Typography>
                  <Typography variant="caption" color="info.main">
                    3 running today
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'info.light', width: 56, height: 56 }}>
                  <Schedule fontSize="large" />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Compliance Rate
                  </Typography>
                  <Typography variant="h4">
                    94%
                  </Typography>
                  <Typography variant="caption" color="success.main">
                    Above target
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'warning.light', width: 56, height: 56 }}>
                  <EmojiEvents fontSize="large" />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content Tabs */}
      <Paper>
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab label="Templates" icon={<AccountTree />} iconPosition="start" />
          <Tab label="Recent Reports" icon={<Description />} iconPosition="start" />
          <Tab label="Scheduled" icon={<Schedule />} iconPosition="start" />
          <Tab label="Analytics" icon={<AutoGraph />} iconPosition="start" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            {reportTemplates.map((template) => (
              <Grid item xs={12} sm={6} md={4} key={template.id}>
                <Card sx={{ height: '100%', position: 'relative' }}>
                  {template.favorite && (
                    <IconButton
                      size="small"
                      sx={{ position: 'absolute', top: 8, right: 8 }}
                    >
                      <Star color="warning" />
                    </IconButton>
                  )}
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.light', mr: 2 }}>
                        {template.icon}
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6">
                          {template.name}
                        </Typography>
                        <Chip label={template.category} size="small" sx={{ mt: 1 }} />
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {template.description}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="caption" color="text.secondary">
                        Includes:
                      </Typography>
                      <Stack direction="row" spacing={0.5} sx={{ mt: 1, flexWrap: 'wrap' }}>
                        {template.fields.map((field) => (
                          <Chip
                            key={field}
                            label={field}
                            size="small"
                            variant="outlined"
                            sx={{ mb: 0.5 }}
                          />
                        ))}
                      </Stack>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                      <Stack direction="row" spacing={0.5} flexWrap="wrap">
                        {template.tags.map((tag) => (
                          <Chip
                            key={tag}
                            label={`#${tag}`}
                            size="small"
                            color="primary"
                            variant="outlined"
                            sx={{ mb: 0.5 }}
                          />
                        ))}
                      </Stack>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button size="small" startIcon={<Assessment />}>
                      Use Template
                    </Button>
                    <Button size="small" startIcon={<Edit />}>
                      Customize
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Report Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Key Metrics</TableCell>
                  <TableCell>Date Created</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentReports.map((report) => (
                  <TableRow key={report.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {report.format === 'PDF' && <PictureAsPdf sx={{ mr: 1, color: 'error.main' }} />}
                        {report.format === 'Excel' && <TableChart sx={{ mr: 1, color: 'success.main' }} />}
                        <Box>
                          <Typography variant="body2">
                            {report.name}
                          </Typography>
                          {report.badge && (
                            <Chip
                              size="small"
                              label={report.badge}
                              color={getBadgeColor(report.badge) as any}
                              sx={{ mt: 0.5 }}
                            />
                          )}
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{report.type}</TableCell>
                    <TableCell>
                      {report.metrics && (
                        <Stack direction="row" spacing={1}>
                          {report.metrics.carbon && (
                            <Chip
                              size="small"
                              label={`CO₂: ${report.metrics.carbon} kg/kg`}
                              icon={<CloudQueue />}
                            />
                          )}
                          {report.metrics.recycled && (
                            <Chip
                              size="small"
                              label={`Recycled: ${report.metrics.recycled}%`}
                              icon={<Recycling />}
                            />
                          )}
                          {report.metrics.compliance && (
                            <Chip
                              size="small"
                              label={`Compliance: ${report.metrics.compliance}%`}
                              icon={<VerifiedUser />}
                            />
                          )}
                          {report.metrics.completion && (
                            <LinearProgress
                              variant="determinate"
                              value={report.metrics.completion}
                              sx={{ width: 100 }}
                            />
                          )}
                        </Stack>
                      )}
                    </TableCell>
                    <TableCell>{report.date}</TableCell>
                    <TableCell>{report.author}</TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={report.status}
                        color={getStatusColor(report.status) as any}
                        icon={getStatusIcon(report.status) as any}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Tooltip title="View">
                          <IconButton size="small">
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Download">
                          <IconButton size="small">
                            <Download />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Share">
                          <IconButton size="small">
                            <Share />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="More">
                          <IconButton size="small">
                            <MoreVert />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Alert severity="info" sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Automated Reporting Active
                </Typography>
                <Typography variant="body2">
                  {scheduledReports.length} reports are scheduled to run automatically. Next report generation in 2 hours.
                </Typography>
              </Alert>
            </Grid>
            {scheduledReports.map((schedule) => (
              <Grid item xs={12} md={6} lg={4} key={schedule.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box>
                        <Typography variant="h6">
                          {schedule.name}
                        </Typography>
                        <Chip
                          size="small"
                          label={schedule.status}
                          color={getStatusColor(schedule.status) as any}
                          sx={{ mt: 1 }}
                        />
                      </Box>
                      <IconButton size="small">
                        <Edit />
                      </IconButton>
                    </Box>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <AccountTree />
                        </ListItemIcon>
                        <ListItemText
                          primary="Template"
                          secondary={schedule.template}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <Schedule />
                        </ListItemIcon>
                        <ListItemText
                          primary="Frequency"
                          secondary={schedule.frequency}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CalendarToday />
                        </ListItemIcon>
                        <ListItemText
                          primary="Next Run"
                          secondary={schedule.nextRun}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <Factory />
                        </ListItemIcon>
                        <ListItemText
                          primary="Products"
                          secondary={schedule.products.join(', ')}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <Email />
                        </ListItemIcon>
                        <ListItemText
                          primary="Recipients"
                          secondary={`${schedule.recipients.length} recipients`}
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                  <CardActions>
                    <Button size="small" startIcon={<PlayArrow />}>Run Now</Button>
                    <Button size="small" startIcon={<Pause />}>Pause</Button>
                    <Button size="small" color="error" startIcon={<Delete />}>Remove</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Report Generation Trends
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={performanceMetrics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Area type="monotone" dataKey="automated" stackId="1" stroke="#8884d8" fill="#8884d8" name="Automated" />
                      <Area type="monotone" dataKey="manual" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Manual" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Report Quality Metrics
                  </Typography>
                  <Box sx={{ mt: 3 }}>
                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Data Accuracy</Typography>
                        <Typography variant="body2" fontWeight="bold">98%</Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={98} sx={{ height: 8, borderRadius: 4 }} />
                    </Box>
                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Completeness</Typography>
                        <Typography variant="body2" fontWeight="bold">95%</Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={95} color="success" sx={{ height: 8, borderRadius: 4 }} />
                    </Box>
                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Timeliness</Typography>
                        <Typography variant="body2" fontWeight="bold">92%</Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={92} color="warning" sx={{ height: 8, borderRadius: 4 }} />
                    </Box>
                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Compliance</Typography>
                        <Typography variant="body2" fontWeight="bold">94%</Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={94} color="primary" sx={{ height: 8, borderRadius: 4 }} />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Popular Report Types
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsBarChart
                      data={[
                        { type: 'Carbon Footprint', count: 85 },
                        { type: 'ISO 14040 LCA', count: 62 },
                        { type: 'EPD Report', count: 48 },
                        { type: 'Circular Economy', count: 41 },
                        { type: 'ASI Standard', count: 35 },
                        { type: 'Water Impact', count: 28 },
                        { type: 'Energy Performance', count: 24 }
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="type" angle={-45} textAnchor="end" height={100} />
                      <YAxis />
                      <RechartsTooltip />
                      <Bar dataKey="count" fill="#667eea" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>

      {/* Create Report Dialog */}
      <Dialog open={createDialogOpen} onClose={() => setCreateDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h6">Create New Report</Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {reportSteps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel>
                    <Typography variant="subtitle1">{step.label}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {step.description}
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    {index === 0 && (
                      <Box sx={{ mb: 2 }}>
                        <FormControl fullWidth sx={{ mb: 2 }}>
                          <InputLabel>Report Template</InputLabel>
                          <Select
                            value={selectedTemplate}
                            label="Report Template"
                            onChange={(e) => setSelectedTemplate(e.target.value)}
                          >
                            {reportTemplates.map((template) => (
                              <MenuItem key={template.id} value={template.name}>
                                {template.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <FormControl fullWidth>
                          <InputLabel>Output Format</InputLabel>
                          <Select
                            value={reportFormat}
                            label="Output Format"
                            onChange={(e) => setReportFormat(e.target.value)}
                          >
                            <MenuItem value="pdf">PDF Document</MenuItem>
                            <MenuItem value="excel">Excel Spreadsheet</MenuItem>
                            <MenuItem value="html">Interactive HTML</MenuItem>
                            <MenuItem value="json">JSON Data</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    )}
                    {index === 1 && (
                      <Box sx={{ mb: 2 }}>
                        <FormControl fullWidth sx={{ mb: 2 }}>
                          <InputLabel>Time Period</InputLabel>
                          <Select
                            value={timeRange}
                            label="Time Period"
                            onChange={(e) => setTimeRange(e.target.value)}
                          >
                            <MenuItem value="week">Last Week</MenuItem>
                            <MenuItem value="month">Last Month</MenuItem>
                            <MenuItem value="quarter">Last Quarter</MenuItem>
                            <MenuItem value="year">Last Year</MenuItem>
                            <MenuItem value="custom">Custom Range</MenuItem>
                          </Select>
                        </FormControl>
                        <Typography variant="subtitle2" gutterBottom>
                          Products to Include
                        </Typography>
                        <FormGroup>
                          {productLines.map((product) => (
                            <FormControlLabel
                              key={product}
                              control={
                                <Checkbox
                                  checked={selectedProducts.includes(product)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedProducts([...selectedProducts, product]);
                                    } else {
                                      setSelectedProducts(selectedProducts.filter(p => p !== product));
                                    }
                                  }}
                                />
                              }
                              label={product}
                            />
                          ))}
                        </FormGroup>
                      </Box>
                    )}
                    {index === 2 && (
                      <Box sx={{ mb: 2 }}>
                        <Alert severity="success" sx={{ mb: 2 }}>
                          <Typography variant="subtitle2">Data Validation Results</Typography>
                          <Typography variant="body2">All required data is available and validated</Typography>
                        </Alert>
                        <List dense>
                          <ListItem>
                            <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                            <ListItemText primary="Emission factors: 100% complete" />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                            <ListItemText primary="Activity data: 98% complete" />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                            <ListItemText primary="Supply chain data: 95% complete" />
                          </ListItem>
                        </List>
                      </Box>
                    )}
                    {index === 3 && (
                      <Box sx={{ mb: 2 }}>
                        <Alert severity="info" sx={{ mb: 2 }}>
                          <Typography variant="subtitle2">Processing Report</Typography>
                          <Typography variant="body2">Estimated time: 2-3 minutes</Typography>
                        </Alert>
                        <LinearProgress sx={{ mb: 2 }} />
                        <Typography variant="body2" color="text.secondary">
                          Calculating environmental impacts...
                        </Typography>
                      </Box>
                    )}
                    {index === 4 && (
                      <Box sx={{ mb: 2 }}>
                        <Alert severity="success" sx={{ mb: 2 }}>
                          <Typography variant="subtitle2">Report Generated Successfully</Typography>
                        </Alert>
                        <Card variant="outlined">
                          <CardContent>
                            <Typography variant="subtitle2" gutterBottom>
                              Report Summary
                            </Typography>
                            <List dense>
                              <ListItem>
                                <ListItemText primary="Carbon Footprint" secondary="11.8 kg CO₂e/kg Al" />
                              </ListItem>
                              <ListItem>
                                <ListItemText primary="Water Usage" secondary="95 m³/t" />
                              </ListItem>
                              <ListItem>
                                <ListItemText primary="Recycled Content" secondary="35%" />
                              </ListItem>
                            </List>
                          </CardContent>
                        </Card>
                      </Box>
                    )}
                    <Box sx={{ mb: 2 }}>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {index === reportSteps.length - 1 ? 'Finish' : 'Continue'}
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeStep === reportSteps.length && (
              <Paper square elevation={0} sx={{ p: 3 }}>
                <Typography>All steps completed - report is ready</Typography>
                <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                  Create Another
                </Button>
              </Paper>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
          {activeStep === reportSteps.length && (
            <>
              <Button startIcon={<Download />} variant="outlined">
                Download
              </Button>
              <Button startIcon={<Share />} variant="contained">
                Share
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>

      {/* Schedule Report Dialog */}
      <Dialog open={scheduleDialogOpen} onClose={() => setScheduleDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Schedule Automated Report</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Report Name"
              placeholder="e.g., Weekly Carbon Footprint Report"
            />
            <FormControl fullWidth>
              <InputLabel>Report Template</InputLabel>
              <Select label="Report Template">
                {reportTemplates.map((template) => (
                  <MenuItem key={template.id} value={template.name}>
                    {template.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Frequency</InputLabel>
              <Select label="Frequency">
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="quarterly">Quarterly</MenuItem>
                <MenuItem value="annually">Annually</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Recipients"
              placeholder="Enter email addresses separated by commas"
              multiline
              rows={2}
            />
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>Advanced Settings</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2}>
                  <Typography variant="subtitle2">Include Products</Typography>
                  <FormGroup>
                    {productLines.slice(0, 3).map((product) => (
                      <FormControlLabel
                        key={product}
                        control={<Checkbox />}
                        label={product}
                      />
                    ))}
                  </FormGroup>
                  <Typography variant="subtitle2">Life Cycle Stages</Typography>
                  <FormGroup>
                    {lifeCycleStages.slice(0, 3).map((stage) => (
                      <FormControlLabel
                        key={stage}
                        control={<Checkbox />}
                        label={stage}
                      />
                    ))}
                  </FormGroup>
                </Stack>
              </AccordionDetails>
            </Accordion>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setScheduleDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setScheduleDialogOpen(false)}>
            Schedule Report
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Reports;
