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
  Slide,
  Avatar,
  Chip,
  Divider,
  Paper,
  Stack
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
  Analytics,
  Speed,
  Shield,
  SupportAgent,
  Verified,
  TrendingUp,
  MedicalServices,
  Biotech,
  Timeline,
  Groups,
  Message,
  CheckCircle,
  Lightbulb,
  EmojiObjects
} from '@mui/icons-material';
import AthenaLogo from '../assets/athena.png';

export default function HomePage() {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);

  const handleEnterChat = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate('/chat');
    }, 600);
  };

  const features = [
   
  ];

  const symptoms = [
    { name: 'Headache & Migraine', icon: <Psychology />, color: '#f44336' },
    { name: 'Fever & Chills', icon: <LocalHospital />, color: '#ff9800' },
    { name: 'Digestive Issues', icon: <MedicalServices />, color: '#4caf50' },
    { name: 'Respiratory Problems', icon: <Biotech />, color: '#2196f3' },
    { name: 'Skin Conditions', icon: <HealthAndSafety />, color: '#9c27b0' },
    { name: 'Muscle & Joint Pain', icon: <Favorite />, color: '#e91e63' },
    { name: 'Anxiety & Stress', icon: <Psychology />, color: '#673ab7' },
    { name: 'Sleep Disorders', icon: <Timeline />, color: '#3f51b5' },
    { name: 'Allergies', icon: <MedicalServices />, color: '#00acc1' }
  ];

  const stats = [
    
  ];

  const testimonials = [
    
  ];

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #3957d8 0%, #764ba2 100%)',
      position: 'relative',
      overflow: 'hidden',
      opacity: isExiting ? 0 : 1,
      transform: isExiting ? 'scale(0.95)' : 'scale(1)',
      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      {/* Animated background elements */}
      <Box sx={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: 300,
        height: 300,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
        animation: 'float 20s infinite ease-in-out'
      }} />
      <Box sx={{
        position: 'absolute',
        bottom: '20%',
        right: '5%',
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%)',
        animation: 'float 25s infinite ease-in-out reverse'
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Slide in={true} direction="down" timeout={800}>
          <Paper
            elevation={0}
            sx={{
              py: 2,
              px: 3,
              my: 3,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: 4,
              border: '1px solid rgba(255,255,255,0.2)'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                src={AthenaLogo}
                alt="Athena AI"
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: 'white',
                  boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)'
                }}
              />
              <Box>
                <Typography variant="h5" fontWeight={800}>
                  <Box component="span" sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    Athena AI
                  </Box>
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Your Intelligent Health Companion
                </Typography>
              </Box>
            </Box>
            
            <Stack direction="row" spacing={2} alignItems="center">
             
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
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 25px rgba(102, 126, 234, 0.4)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Launch Chat
              </Button>
            </Stack>
          </Paper>
        </Slide>

        {/* Hero Section */}
        <Grid container spacing={6} sx={{ py: 4, alignItems: 'center' }}>
          <Grid item xs={12} md={7}>
            <Fade in={true} timeout={1000}>
              <Box>
                <Chip
                  icon={<SmartToy />}
                  label="AI-Powered Health Assistant"
                  sx={{
                    mb: 3,
                    bgcolor: alpha('#ffffff', 0.15),
                    color: 'white',
                    fontWeight: 600,
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                />
                
                <Typography variant="h1" sx={{
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  fontWeight: 800,
                  lineHeight: 1.2,
                  mb: 3,
                  color: 'white'
                }}>
                  Your Intelligent{' '}
                  <Box component="span" sx={{
                    background: 'linear-gradient(135deg, #fff 0%, #e0e0ff 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block'
                  }}>
                    Health Companion
                  </Box>
                </Typography>
                
                <Typography variant="h6" sx={{ mb: 4, color: alpha('#ffffff', 0.9), maxWidth: 600 }}>
                  Get instant, accurate medical guidance powered by advanced AI. 
                  Describe your symptoms and receive personalized health insights in seconds.
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
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
                      fontWeight: 700,
                      background: 'white',
                      color: '#667eea',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                      '&:hover': {
                        background: 'white',
                        transform: 'translateY(-3px)',
                        boxShadow: '0 12px 40px rgba(0,0,0,0.3)'
                      }
                    }}
                  >
                    Start Free Consultation
                  </Button>
                  
                 <Button
  size="large"
  onClick={() => navigate('/about')} // Navigate to About page
  sx={{
    px: 6,
    py: 2,
    borderRadius: 3,
    fontSize: '1.1rem',
    textTransform: 'none',
    fontWeight: 600,
    color: 'white',
    border: '2px solid rgba(255,255,255,0.3)',
    '&:hover': {
      border: '2px solid white',
      background: alpha('#ffffff', 0.1)
    }
  }}
>
  Learn More
</Button>
                </Stack>

                {/* Stats Row */}
                <Grid container spacing={3} sx={{ mt: 4 }}>
                  {stats.map((stat, index) => (
                    <Grid item xs={6} sm={3} key={index}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Avatar sx={{ 
                          bgcolor: alpha('#ffffff', 0.15), 
                          color: 'white',
                          margin: '0 auto 8px',
                          width: 48,
                          height: 48
                        }}>
                          {stat.icon}
                        </Avatar>
                        <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
                          {stat.value}
                        </Typography>
                        <Typography variant="caption" sx={{ color: alpha('#ffffff', 0.8) }}>
                          {stat.label}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Fade>
          </Grid>
          
          <Grid item xs={12} md={5}>
            <Zoom in={true} timeout={1000}>
              <Box sx={{
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: -20,
                  left: -20,
                  right: -20,
                  bottom: -20,
                  background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)',
                  borderRadius: '50%',
                  zIndex: 0
                }
              }}>
                <Box
                  component="img"
                  src="https://via.placeholder.com/500x600?text=Health+AI+Illustration"
                  alt="AI Health Assistant"
                  sx={{
                    width: '100%',
                    maxWidth: 500,
                    height: 'auto',
                    borderRadius: 4,
                    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                    position: 'relative',
                    zIndex: 1,
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.02)'
                    }
                  }}
                />
              </Box>
            </Zoom>
          </Grid>
        </Grid>

        {/* Features Section */}
        <Box sx={{ py: 8 }}>
         

          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Grow in={true} timeout={(index + 1) * 200}>
                  <Card sx={{
                    height: '100%',
                    borderRadius: 3,
                    background: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    border: '1px solid rgba(255,255,255,0.2)',
                    '&:hover': {
                      transform: 'translateY(-10px) scale(1.02)',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
                      '& .feature-icon': {
                        transform: 'scale(1.1) rotate(5deg)'
                      }
                    }
                  }}>
                    <CardContent sx={{ p: 4 }}>
                      <Avatar
                        className="feature-icon"
                        sx={{
                          width: 70,
                          height: 70,
                          bgcolor: alpha(feature.color, 0.1),
                          color: feature.color,
                          margin: '0 auto 24px',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {feature.icon}
                      </Avatar>
                      <Typography variant="h5" gutterBottom fontWeight={700} align="center">
                        {feature.title}
                      </Typography>
                      <Typography color="text.secondary" align="center" sx={{ lineHeight: 1.6 }}>
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
      
        {/* Testimonials Section */}
       

        {/* CTA Section */}
      

        {/* Footer */}
        <Box sx={{ py: 4, textAlign: 'center' }}>
          <Divider sx={{ borderColor: alpha('#ffffff', 0.2), mb: 4 }} />
          <Grid container spacing={3} justifyContent="center">
            <Grid item>
              <Typography variant="body2" sx={{ color: alpha('#ffffff', 0.7) }}>
                © 2024 Athena AI. All rights reserved.
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" sx={{ color: alpha('#ffffff', 0.7) }}>
                • Privacy Policy
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" sx={{ color: alpha('#ffffff', 0.7) }}>
                • Terms of Service
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="caption" sx={{ color: alpha('#ffffff', 0.5), display: 'block', mt: 2 }}>
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
            transform: translateY(-40px) rotate(10deg);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
      `}</style>
    </Box>
  );
}