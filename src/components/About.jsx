import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  Avatar,
  Divider,
  Stack,
  useTheme,
  useMediaQuery,
  alpha
} from '@mui/material';
import {
  ArrowBack,
  HealthAndSafety,
  SmartToy,
  Security,
  Science,
  MedicalServices,
  Groups,
  CheckCircle,
  Email,
  Facebook,
  Twitter,
  LinkedIn,
  Instagram
} from '@mui/icons-material';
import AthenaLogo from '../assets/athena.png';

export default function About() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleBack = () => {
    navigate('/');
  };

  const handleStartChat = () => {
    navigate('/chat');
  };

  // Team members (simplified)
  const team = [
   
  ];

  // Statistics (simplified)
  const stats = [
   
  ];

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      overflow: 'auto',
      py: 4
    }}>
      {/* Back Button */}
      <Container maxWidth="lg">
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBack}
          sx={{
            color: 'white',
            mb: 2,
            '&:hover': {
              backgroundColor: alpha('#ffffff', 0.1)
            }
          }}
        >
          Back to Home
        </Button>
      </Container>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header Section */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            mb: 4,
            borderRadius: 4,
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)',
            textAlign: 'center'
          }}
        >
          <Box
            component="img"
            src={AthenaLogo}
            alt="Athena AI"
            sx={{
              width: 100,
              height: 100,
              borderRadius: '20px',
              mb: 2,
              border: '3px solid #667eea'
            }}
          />
          
          <Typography variant="h3" fontWeight={800} gutterBottom>
            About <span style={{ color: '#667eea' }}>Athena AI</span>
          </Typography>
          
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', mb: 3 }}>
            Your intelligent health companion, powered by advanced AI to provide accurate medical guidance.
          </Typography>

          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              onClick={handleStartChat}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              }}
            >
              Start Chat
            </Button>
            <Button
              variant="outlined"
              onClick={handleBack}
              sx={{ px: 4, py: 1.5, borderRadius: 3 }}
            >
              Home
            </Button>
          </Stack>
        </Paper>

        {/* Stats Section */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(10px)',
                  textAlign: 'center'
                }}
              >
                <Avatar sx={{ bgcolor: '#667eea', margin: '0 auto 8px', width: 56, height: 56 }}>
                  {stat.icon}
                </Avatar>
                <Typography variant="h5" fontWeight={700}>{stat.value}</Typography>
                <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Mission & Vision */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 3,
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(10px)',
                height: '100%'
              }}
            >
              <Typography variant="h5" fontWeight={700} gutterBottom color="#667eea">
                Our Mission
              </Typography>
              <Typography variant="body1" color="text.secondary">
                To democratize healthcare by providing accessible, accurate, and personalized medical guidance to everyone, anytime, anywhere.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 3,
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(10px)',
                height: '100%'
              }}
            >
              <Typography variant="h5" fontWeight={700} gutterBottom color="#764ba2">
                Our Vision
              </Typography>
              <Typography variant="body1" color="text.secondary">
                A world where quality health information is available to everyone, empowering individuals to make informed decisions about their wellbeing.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Team Section */}
       

        {/* Contact Section */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)',
            textAlign: 'center'
          }}
        >
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Get in Touch
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Have questions? We'd love to hear from you.
          </Typography>

        

          <Divider sx={{ my: 3 }} />

          <Typography variant="body2" color="text.secondary">
            © 2024 Athena AI. All rights reserved. | Version 1.0.0
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
            ⚕️ For medical emergencies, please call emergency services immediately.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}