import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Alert,
  TextField,
  InputAdornment
} from '@mui/material';
import {
  Storage as StorageIcon,
  Cloud,
  Security,
  Speed,
  DataUsage,
  Backup,
  RestoreFromTrash,
  Search,
  FilterList,
  Download,
  Upload,
  Delete,
  Lock,
  VpnKey,
  CheckCircle,
  Warning,
  FolderOpen,
  Description,
  Code,
  Image,
  TableChart
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const Storage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const storageMetrics = [
    { label: 'Total Storage', value: '10 TB', used: '6.5 TB', percentage: 65, icon: <StorageIcon /> },
    { label: 'Database', value: '4 TB', used: '2.8 TB', percentage: 70, icon: <DataUsage /> },
    { label: 'File Storage', value: '3 TB', used: '2.1 TB', percentage: 70, icon: <FolderOpen /> },
    { label: 'Backup', value: '3 TB', used: '1.6 TB', percentage: 53, icon: <Backup /> }
  ];

  const databases = [
    { name: 'PostgreSQL Primary', status: 'online', size: '2.1 TB', connections: 145, latency: '12ms', uptime: '99.9%' },
    { name: 'PostgreSQL Replica', status: 'online', size: '2.1 TB', connections: 45, latency: '15ms', uptime: '99.8%' },
    { name: 'Redis Cache', status: 'online', size: '256 GB', connections: 892, latency: '2ms', uptime: '100%' },
    { name: 'TimescaleDB', status: 'maintenance', size: '450 GB', connections: 0, latency: 'N/A', uptime: '98.5%' }
  ];

  const recentFiles = [
    { name: 'production_data_2024_06.csv', type: 'csv', size: '125 MB', modified: '2024-06-15 14:30', status: 'verified' },
    { name: 'emissions_report_q2.pdf', type: 'pdf', size: '2.5 MB', modified: '2024-06-14 09:15', status: 'verified' },
    { name: 'energy_consumption.xlsx', type: 'excel', size: '45 MB', modified: '2024-06-13 16:45', status: 'processing' },
    { name: 'transport_logs.json', type: 'json', size: '18 MB', modified: '2024-06-12 11:20', status: 'verified' },
    { name: 'lca_results_batch_2453.zip', type: 'archive', size: '234 MB', modified: '2024-06-11 08:00', status: 'verified' }
  ];

  const blockchainRecords = [
    { id: 'BLK-2453', hash: '0x7f8a9...3e2d', timestamp: '2024-06-15 14:32', type: 'LCA Report', status: 'verified' },
    { id: 'BLK-2452', hash: '0x3d4c1...8f9b', timestamp: '2024-06-14 09:18', type: 'Emission Data', status: 'verified' },
    { id: 'BLK-2451', hash: '0x9e2a7...4c1d', timestamp: '2024-06-13 16:47', type: 'Production Log', status: 'pending' },
    { id: 'BLK-2450', hash: '0x2f8d3...7a9e', timestamp: '2024-06-12 11:23', type: 'Audit Trail', status: 'verified' }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'csv':
      case 'excel':
        return <TableChart color="success" />;
      case 'pdf':
        return <Description color="error" />;
      case 'json':
        return <Code color="primary" />;
      case 'image':
        return <Image color="info" />;
      default:
        return <Description />;
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Storage & Data Management
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Secure, scalable storage with blockchain verification and real-time monitoring
      </Typography>

      {/* Storage Metrics */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {storageMetrics.map((metric) => (
          <Grid item xs={12} sm={6} md={3} key={metric.label}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ 
                    p: 1, 
                    borderRadius: 2, 
                    bgcolor: 'primary.light', 
                    color: 'white',
                    mr: 2 
                  }}>
                    {metric.icon}
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      {metric.label}
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                      {metric.used} / {metric.value}
                    </Typography>
                  </Box>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={metric.percentage} 
                  sx={{ height: 8, borderRadius: 4 }}
                  color={metric.percentage > 80 ? 'warning' : 'primary'}
                />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                  {metric.percentage}% utilized
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Tabs for different storage sections */}
      <Paper sx={{ mt: 3 }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="Databases" icon={<DataUsage />} iconPosition="start" />
          <Tab label="File Storage" icon={<FolderOpen />} iconPosition="start" />
          <Tab label="Blockchain" icon={<Lock />} iconPosition="start" />
          <Tab label="Backup & Recovery" icon={<Backup />} iconPosition="start" />
        </Tabs>

        {/* Databases Tab */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Database</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Size</TableCell>
                      <TableCell>Connections</TableCell>
                      <TableCell>Latency</TableCell>
                      <TableCell>Uptime</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {databases.map((db) => (
                      <TableRow key={db.name}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <StorageIcon sx={{ mr: 1, color: 'text.secondary' }} />
                            {db.name}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={db.status} 
                            size="small"
                            color={db.status === 'online' ? 'success' : 'warning'}
                          />
                        </TableCell>
                        <TableCell>{db.size}</TableCell>
                        <TableCell>{db.connections}</TableCell>
                        <TableCell>{db.latency}</TableCell>
                        <TableCell>{db.uptime}</TableCell>
                        <TableCell>
                          <IconButton size="small">
                            <Speed />
                          </IconButton>
                          <IconButton size="small">
                            <Backup />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Query Performance
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Avg Response Time</Typography>
                    <Typography variant="body2" fontWeight="bold">15ms</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Queries/sec</Typography>
                    <Typography variant="body2" fontWeight="bold">1,245</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Cache Hit Rate</Typography>
                    <Typography variant="body2" fontWeight="bold">94%</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Storage Optimization
                </Typography>
                <Alert severity="success" sx={{ mt: 2 }}>
                  Automatic vacuum and indexing saved 450GB last week
                </Alert>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        {/* File Storage Tab */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <FilterList />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>File Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell>Modified</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentFiles.map((file) => (
                  <TableRow key={file.name}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {getFileIcon(file.type)}
                        <Typography sx={{ ml: 1 }}>{file.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{file.type.toUpperCase()}</TableCell>
                    <TableCell>{file.size}</TableCell>
                    <TableCell>{file.modified}</TableCell>
                    <TableCell>
                      <Chip 
                        label={file.status} 
                        size="small"
                        color={file.status === 'verified' ? 'success' : 'warning'}
                        icon={file.status === 'verified' ? <CheckCircle /> : <Warning />}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton size="small">
                        <Download />
                      </IconButton>
                      <IconButton size="small">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" startIcon={<Upload />}>
              Upload New Files
            </Button>
          </Box>
        </TabPanel>

        {/* Blockchain Tab */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Alert severity="info" icon={<Security />} sx={{ mb: 3 }}>
                All critical data is secured with blockchain verification for tamper-proof audit trails
              </Alert>
            </Grid>
            <Grid item xs={12}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Block ID</TableCell>
                      <TableCell>Hash</TableCell>
                      <TableCell>Timestamp</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {blockchainRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>{record.id}</TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                            {record.hash}
                          </Typography>
                        </TableCell>
                        <TableCell>{record.timestamp}</TableCell>
                        <TableCell>{record.type}</TableCell>
                        <TableCell>
                          <Chip 
                            label={record.status} 
                            size="small"
                            color={record.status === 'verified' ? 'success' : 'warning'}
                            icon={record.status === 'verified' ? <Lock /> : <VpnKey />}
                          />
                        </TableCell>
                        <TableCell>
                          <Button size="small">Verify</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Backup & Recovery Tab */}
        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  <Backup sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Backup Status
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Daily Backup"
                      secondary="Last: 2024-06-15 02:00 AM - Success"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Weekly Backup"
                      secondary="Last: 2024-06-13 03:00 AM - Success"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Monthly Backup"
                      secondary="Last: 2024-06-01 04:00 AM - Success"
                    />
                  </ListItem>
                </List>
                <Button variant="outlined" fullWidth startIcon={<Backup />}>
                  Trigger Manual Backup
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  <RestoreFromTrash sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Recovery Options
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText 
                      primary="Recovery Point Objective (RPO)"
                      secondary="24 hours"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Recovery Time Objective (RTO)"
                      secondary="4 hours"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Backup Retention"
                      secondary="30 days (Daily), 12 weeks (Weekly), 12 months (Monthly)"
                    />
                  </ListItem>
                </List>
                <Button variant="outlined" fullWidth startIcon={<RestoreFromTrash />}>
                  Restore from Backup
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Alert severity="success">
                All backups are encrypted and stored in geographically distributed locations for maximum resilience
              </Alert>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default Storage;
