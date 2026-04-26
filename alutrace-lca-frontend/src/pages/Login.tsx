import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  Checkbox,
  FormControlLabel,
  Link,
  Divider,
  Grid
} from '@mui/material';
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Factory,
  Co2,
  Recycling,
  Analytics
} from '@mui/icons-material';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState('demo@alutrace.com');
  const [password, setPassword] = useState('demo123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (email && password) {
        login(
          {
            id: '1',
            email: email,
            name: 'Demo User',
            role: 'admin'
          },
          'demo-token-123'
        );
        navigate('/dashboard');
      } else {
        setError('Please enter valid credentials');
      }
      setLoading(false);
    }, 1000);
  };

  const features = [
    { icon: <Co2 />, title: 'Carbon Tracking', desc: '80% faster assessment' },
    { icon: <Recycling />, title: 'Circularity Metrics', desc: 'MCI & recycled content' },
    { icon: <Analytics />, title: 'AI-Powered', desc: '95% data completeness' },
    { icon: <Factory />, title: 'End-to-End', desc: 'Mining to recycling' }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Grid container sx={{ flex: 1 }}>
        {/* Left Panel - Login Form */}
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 400, p: 4 }}>
            {/* Logo and Title */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  margin: '0 auto 20px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Factory sx={{ fontSize: 40, color: 'white' }} />
              </Box>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Welcome to MetaTrace
              </Typography>
              <Typography variant="body2" color="text.secondary">
                AI-Driven Life Cycle Assessment Platform
              </Typography>
            </Box>

            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="action" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Remember me"
                />
                <Link href="#" variant="body2" sx={{ textDecoration: 'none' }}>
                  Forgot password?
                </Link>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  py: 1.5,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5569d8 0%, #6a4190 100%)',
                  },
                }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>

              <Divider sx={{ my: 3 }}>OR</Divider>

              <Button
                fullWidth
                variant="outlined"
                size="large"
                onClick={() => {
                  setEmail('demo@alutrace.com');
                  setPassword('demo123');
                }}
                sx={{ py: 1.5 }}
              >
                Use Demo Account
              </Button>

              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{' '}
                  <Link href="#" sx={{ textDecoration: 'none', fontWeight: 600 }}>
                    Request Access
                  </Link>
                </Typography>
              </Box>
            </form>
          </Box>
        </Grid>

        {/* Right Panel - Features */}
        <Grid
          item
          xs={12}
          md={7}
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            p: 4,
          }}
        >
          <Box sx={{ maxWidth: 600 }}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Transform Your LCA Process
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Reduce assessment time by 80% with AI-powered automation and real-time insights
            </Typography>

            <Grid container spacing={3}>
              {features.map((feature, index) => (
                <Grid item xs={6} key={index}>
                  <Paper
                    sx={{
                      p: 3,
                      background: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: 'white',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {React.cloneElement(feature.icon, { sx: { fontSize: 32, mr: 2 } })}
                      <Typography variant="h6" fontWeight="600">
                        {feature.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      {feature.desc}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mt: 4 }}>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Trusted by leading aluminium manufacturers worldwide
              </Typography>
              <Box sx={{ display: 'flex', gap: 3, mt: 2 }}>
                <Typography variant="h6" fontWeight="bold">60+ Plants</Typography>
                <Typography variant="h6" fontWeight="bold">•</Typography>
                <Typography variant="h6" fontWeight="bold">15+ Countries</Typography>
                <Typography variant="h6" fontWeight="bold">•</Typography>
                <Typography variant="h6" fontWeight="bold">99.9% Uptime</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
