import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  alpha,
  Fade,
  Grow,
  Zoom,
  Slide
} from '@mui/material';
import {
  HealthAndSafety,
  SmartToy,
  LocalHospital,
  AccessTime,
  Security,
  ArrowForward,
  Favorite,
  Psychology,
  Analytics
} from '@mui/icons-material';
import AthenaLogo from '../assets/athena.png';

export default function HomePage() {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);

  const handleEnterChat = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate('/chat');
    }, 600); // Match animation duration
  };

  const features = [
  
    {
      icon: <AccessTime sx={{ fontSize: 30 }} />,
      title: '24/7 Availability',
      description: 'Get medical guidance anytime, anywhere'
    },
    {
      icon: <Security sx={{ fontSize: 30 }} />,
      title: 'Privacy First',
      description: 'Your health data is encrypted and never shared'
    },
    {
      icon: <LocalHospital sx={{ fontSize: 30 }} />,
      title: 'Professional Insights',
      description: 'Based on medical guidelines and research'
    }
  ];

  const symptoms = [
    'Headache & Migraine',
    'Fever & Chills',
    'Digestive Issues',
    'Respiratory Problems',
    'Skin Conditions',
    'Muscle & Joint Pain'
  ];

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      position: 'relative',
      overflow: 'hidden',
      opacity: isExiting ? 0 : 1,
      transform: isExiting ? 'scale(0.95)' : 'scale(1)',
      transition: 'all 0.6s ease-in-out'
    }}>
      {/* Animated background elements */}
      <Box sx={{
        position: 'absolute',
        top: -100,
        right: -100,
        width: 300,
        height: 300,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(33, 203, 243, 0.1) 100%)',
        animation: 'float 20s infinite ease-in-out'
      }} />
      <Box sx={{
        position: 'absolute',
        bottom: -50,
        left: -50,
        width: 200,
        height: 200,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(46, 125, 50, 0.1) 0%, rgba(76, 175, 80, 0.1) 100%)',
        animation: 'float 25s infinite ease-in-out reverse'
      }} />

      <Container maxWidth="lg">
        {/* Header */}
        <Slide in={true} direction="down" timeout={800}>
          <Box sx={{
            py: 4,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                component="img"
                src={AthenaLogo}
                alt="Athena AI"
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(25, 118, 210, 0.3)'
                }}
              />
              <Typography variant="h4" fontWeight={800}>
                <Box component="span" sx={{
                  background: 'linear-gradient(135deg, #1976d2 0%, #21CBF3 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Athena AI
                </Box>
              </Typography>
            </Box>
            <Button
              variant="contained"
              onClick={handleEnterChat}
              endIcon={<ArrowForward />}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 3,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                boxShadow: '0 4px 20px rgba(25, 118, 210, 0.3)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 25px rgba(25, 118, 210, 0.4)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Launch Chat
            </Button>
          </Box>
        </Slide>

        {/* Hero Section */}
        <Grid container spacing={4} sx={{ py: 8, alignItems: 'center' }}>
          <Grid item xs={12} md={6}>
            <Fade in={true} timeout={1000}>
              <Box>
                <Typography variant="h1" sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 800,
                  lineHeight: 1.2,
                  mb: 3
                }}>
                  Your Intelligent{' '}
                  <Box component="span" sx={{
                    background: 'linear-gradient(135deg, #1976d2 0%, #21CBF3 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    Health Companion
                  </Box>
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600 }}>
                  Get instant, accurate medical guidance powered by artificial intelligence. 
                  Describe your symptoms and receive personalized health insights.
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleEnterChat}
                  endIcon={<ArrowForward />}
                  sx={{
                    px: 6,
                    py: 2,
                    borderRadius: 3,
                    fontSize: '1.1rem',
                    textTransform: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(25, 118, 210, 0.4)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Start Free Consultation
                </Button>
              </Box>
            </Fade>
          </Grid>
         
        </Grid>

        {/* Features Section */}
        <Box sx={{ py: 8 }}>
          <Typography variant="h2" textAlign="center" sx={{ mb: 6, fontWeight: 700 }}>
            Why Choose Athena AI?
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Grow in={true} timeout={(index + 1) * 300}>
                  <Card sx={{
                    height: '100%',
                    borderRadius: 3,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 20px 40px rgba(25, 118, 210, 0.2)'
                    }
                  }}>
                    <CardContent sx={{ textAlign: 'center', p: 4 }}>
                      <Box sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(33, 203, 243, 0.1) 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 24px',
                        color: 'primary.main'
                      }}>
                        {feature.icon}
                      </Box>
                      <Typography variant="h5" gutterBottom fontWeight={600}>
                        {feature.title}
                      </Typography>
                      <Typography color="text.secondary">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Symptoms Section */}
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h2" sx={{ mb: 3, fontWeight: 700 }}>
            Common Symptoms We Analyze
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}>
            Athena AI can help you understand and manage various health concerns
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {symptoms.map((symptom, index) => (
              <Grid item key={index}>
                <Fade in={true} timeout={(index + 1) * 200}>
                  <Box sx={{
                    px: 4,
                    py: 2,
                    borderRadius: 3,
                    bgcolor: alpha('#1976d2', 0.1),
                    border: '2px solid',
                    borderColor: alpha('#1976d2', 0.2),
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: alpha('#1976d2', 0.2),
                      transform: 'translateY(-3px)',
                      borderColor: alpha('#1976d2', 0.4)
                    }
                  }}>
                    <Typography fontWeight={500} color="primary.dark">
                      {symptom}
                    </Typography>
                  </Box>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* CTA Section */}
        <Box sx={{
          py: 12,
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(33, 203, 243, 0.05) 100%)',
          borderRadius: 5,
          mb: 8
        }}>
          <SmartToy sx={{ fontSize: 80, color: 'primary.main', mb: 3 }} />
          <Typography variant="h2" sx={{ mb: 3, fontWeight: 800 }}>
            Ready to Take Control of Your Health?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}>
            Start your free health assessment now. No appointments needed.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleEnterChat}
            endIcon={<ArrowForward />}
            sx={{
              px: 8,
              py: 2.5,
              borderRadius: 3,
              fontSize: '1.2rem',
              textTransform: 'none',
              fontWeight: 700,
              boxShadow: '0 8px 30px rgba(25, 118, 210, 0.4)',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 12px 40px rgba(25, 118, 210, 0.5)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Enter Athena AI Chat
          </Button>
        </Box>

        {/* Footer */}
        <Box sx={{ py: 4, textAlign: 'center', color: 'text.secondary' }}>
          <Typography variant="body2">
            ⚕️ Athena AI provides health guidance based on AI analysis. Always consult a healthcare professional for medical diagnosis.
          </Typography>
        </Box>
      </Container>

      {/* Animation keyframes */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
      `}</style>
    </Box>
  );
}