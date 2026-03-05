import Avatar from "@mui/material/Avatar";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import AthenaLogo from "../assets/athena.png";
import PersonIcon from "@mui/icons-material/Person";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  CircularProgress,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Divider,
  Toolbar,
  AppBar,
  Tooltip,
  Chip,
  Button,
  Alert,
  Snackbar,
  Grid,
  useTheme,
  useMediaQuery,
  Switch,
  FormControlLabel,
  alpha,
  Fade
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HistoryIcon from "@mui/icons-material/History";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import HealingIcon from "@mui/icons-material/Healing";
import StopIcon from "@mui/icons-material/Stop";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import BiotechIcon from "@mui/icons-material/Biotech";
import { chatbotReply } from "../chatbot/engine";
import { typeWriter } from "../utils/typeWriter";
import ReactMarkdown from "react-markdown";

// Helper function to format time ago
const timeAgo = (timestamp) => {
  const now = Date.now();
  const diffInSeconds = Math.floor((now - timestamp) / 1000);
  
  if (diffInSeconds < 60) {
    return 'Just now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  }
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} ${diffInWeeks === 1 ? 'week' : 'weeks'} ago`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
  }
  
  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
};

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false); // New state for analyzing phase
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("info");
  const [currentChatId, setCurrentChatId] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [darkMode, setDarkMode] = useState(false);
  const bottomRef = useRef(null);
  
  // Add refs for typing control
  const isMountedRef = useRef(true);
  const currentTypingIdRef = useRef(null);
  const currentTypeWriterStopRef = useRef(null);
  const analyzingTimeoutRef = useRef(null); // Ref for analyzing timeout

  const drawerWidth = sidebarOpen ? 300 : 72;

  // LOGO SIZE CONFIGURATION - Customize these values
  const logoConfig = {
    sidebar: {
      expanded: {
        width: 48,
        height: 48,
        borderRadius: '14px'
      },
      collapsed: {
        width: 40,
        height: 40,
        borderRadius: '12px'
      }
    },
    main: {
      welcome: {
        width: 140,
        height: 140,
        borderRadius: '24px'
      }
    }
  };

  // Common symptom quick actions - expanded for better UX
  const quickActions = [
    { label: "🤕 Headache", query: "I have a severe headache with sensitivity to light" },
    { label: "🌡️ Fever", query: "I have fever with chills and body aches" },
    { label: "🤢 Nausea", query: "I feel nauseous and have stomach pain" },
    { label: "😷 Cough", query: "I have a persistent cough with phlegm" },
    { label: "💤 Fatigue", query: "I'm experiencing extreme fatigue and weakness" },
    { label: "🦷 Tooth Pain", query: "I have severe tooth pain" },
    { label: "🩺 Chest Pain", query: "I have chest tightness and discomfort" },
    { label: "🦴 Back Pain", query: "I have lower back pain" },
    { label: "😰 Anxiety", query: "I'm experiencing anxiety and panic attacks" },
    { label: "💧 Allergy", query: "I have allergy symptoms like sneezing and itchy eyes" },
    { label: "🩹 Rash", query: "I have a skin rash that's itchy" },
    { label: "🩸 Blood Pressure", query: "I have high blood pressure symptoms" }
  ];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('chatTheme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('chatTheme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Load chat history from localStorage on initial render
  useEffect(() => {
    const savedHistory = localStorage.getItem('chatHistory');
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        setChatHistory(parsed);
      } catch (e) {
        console.error('Failed to load chat history', e);
      }
    }
  }, []);

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    } else {
      localStorage.removeItem('chatHistory');
    }
  }, [chatHistory]);

  // Update timestamps every second for real-time "Just now" to "1 minute ago" transition
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(Date.now());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, isAnalyzing]);

  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true;
    
    return () => {
      isMountedRef.current = false;
      stopTypingAnimation();
      if (analyzingTimeoutRef.current) {
        clearTimeout(analyzingTimeoutRef.current);
      }
    };
  }, []);

  // Function to stop any ongoing typing animation
  const stopTypingAnimation = useCallback(() => {
    if (currentTypeWriterStopRef.current) {
      currentTypeWriterStopRef.current();
      currentTypeWriterStopRef.current = null;
    }
    
    if (currentTypingIdRef.current) {
      clearTimeout(currentTypingIdRef.current);
      currentTypingIdRef.current = null;
    }
    
    if (analyzingTimeoutRef.current) {
      clearTimeout(analyzingTimeoutRef.current);
      analyzingTimeoutRef.current = null;
    }
    
    setIsTyping(false);
    setIsAnalyzing(false);
  }, []);

  // Function to show alert
  const showAlertMessage = useCallback((message, severity = "info") => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setShowAlert(true);
  }, []);

  // Update existing chat with new messages
  const updateExistingChat = useCallback((userMessage, botReply) => {
    const timestamp = Date.now();
    const updatedMessages = [...messages];
    
    setChatHistory(prev => {
      const updated = prev.map(chat => 
        chat.id === currentChatId 
          ? { 
              ...chat, 
              messages: updatedMessages,
              title: chat.messages[0]?.text.substring(0, 30) + (chat.messages[0]?.text.length > 30 ? "..." : ""),
              preview: userMessage.substring(0, 50) + (userMessage.length > 50 ? "..." : ""),
              timestamp: timestamp,
              lastMessage: botReply.substring(0, 50) + (botReply.length > 50 ? "..." : "")
            }
          : chat
      );
      return updated;
    });
  }, [messages, currentChatId]);

  // Create new chat
  const createNewChat = useCallback((userMessage, botReply) => {
    const timestamp = Date.now();
    const newMessages = [
      { role: "user", text: userMessage, timestamp },
      { role: "bot", text: botReply, timestamp }
    ];
    
    const newChat = {
      id: timestamp,
      title: userMessage.substring(0, 30) + (userMessage.length > 30 ? "..." : ""),
      timestamp: timestamp,
      preview: userMessage.substring(0, 50) + (userMessage.length > 50 ? "..." : ""),
      lastMessage: botReply.substring(0, 50) + (botReply.length > 50 ? "..." : ""),
      messages: newMessages
    };
    
    setChatHistory(prev => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
    setSelectedChat(newChat.id);
  }, []);

  const handleSend = (customMessage = null) => {
    const userText = customMessage || input;
    if (!userText.trim() || isTyping || isAnalyzing) return;

    setInput("");
    
    // Add user message immediately
    const userMessageObj = { role: "user", text: userText, timestamp: Date.now() };
    setMessages(prev => [...prev, userMessageObj]);
    
    // Set analyzing state (loading phase)
    setIsAnalyzing(true);
    
    // Add empty bot message for analyzing animation
    setMessages(prev => [...prev, { role: "bot", text: "", timestamp: Date.now() }]);

    const { reply } = chatbotReply(userText);

    // Clear any existing timeout
    if (analyzingTimeoutRef.current) {
      clearTimeout(analyzingTimeoutRef.current);
    }

    // Set timeout for 2 seconds analyzing phase
    analyzingTimeoutRef.current = setTimeout(() => {
      if (!isMountedRef.current) return;
      
      setIsAnalyzing(false);
      setIsTyping(true);

      // Generate a unique ID for this typing session
      const typingId = Date.now();
      currentTypingIdRef.current = typingId;

      // Store the stop function from typeWriter
      const stopFunction = typeWriter(
        reply,
        12,
        (partial) => {
          // Only update if component is still mounted and this is the current typing session
          if (isMountedRef.current && currentTypingIdRef.current === typingId) {
            setMessages(prev => {
              const updated = [...prev];
              // Make sure the bot message exists
              if (updated.length > 0 && updated[updated.length - 1].role === "bot") {
                updated[updated.length - 1].text = partial;
              }
              return updated;
            });
          }
        },
        () => {
          // Only complete if component is still mounted and this is the current typing session
          if (isMountedRef.current && currentTypingIdRef.current === typingId) {
            setIsTyping(false);
            currentTypingIdRef.current = null;
            currentTypeWriterStopRef.current = null;
            
            // Update the final bot message with complete reply
            setMessages(prev => {
              const updated = [...prev];
              const lastMessage = updated[updated.length - 1];
              if (lastMessage && lastMessage.role === "bot") {
                lastMessage.text = reply;
                lastMessage.timestamp = Date.now();
              }
              return updated;
            });
            
            // Check if this is a new chat or continuing existing one
            if (currentChatId) {
              // Update existing chat with all messages
              updateExistingChat(userText, reply);
            } else {
              // Create new chat
              createNewChat(userText, reply);
            }
          }
        }
      );

      currentTypeWriterStopRef.current = stopFunction;
    }, 2000); // 2 second delay
  };

  const handleQuickAction = (query) => {
    if (isTyping || isAnalyzing) {
      showAlertMessage("Please wait for the current response to complete", "warning");
      return;
    }
    handleSend(query);
  };

  const handleStopGeneration = () => {
    stopTypingAnimation();
    showAlertMessage("Response generation stopped", "warning");
    
    // If we have a partial bot message, mark it as incomplete
    setMessages(prev => {
      const updated = [...prev];
      const lastMessage = updated[updated.length - 1];
      if (lastMessage && lastMessage.role === "bot" && lastMessage.text) {
        // Add a note that generation was stopped
        const incompleteText = `${lastMessage.text}\n\n*(Response generation was stopped by user)*`;
        lastMessage.text = incompleteText;
        lastMessage.timestamp = Date.now();
      }
      return updated;
    });
  };

  const startNewChat = () => {
    // Show alert if interrupting a response
    if (isTyping || isAnalyzing) {
      showAlertMessage("Please stop the current response generation first", "warning");
      return;
    }
    
    setMessages([]);
    setSelectedChat(null);
    setCurrentChatId(null);
    setInput("");
  };

  const loadChat = (chatId) => {
    // Show alert if interrupting a response
    if (isTyping || isAnalyzing) {
      showAlertMessage("Please stop the current response generation first", "warning");
      return;
    }
    
    const chat = chatHistory.find(c => c.id === chatId);
    if (chat && chat.messages) {
      setMessages(chat.messages);
      setSelectedChat(chatId);
      setCurrentChatId(chatId);
    }
  };

  const deleteChat = (chatId, e) => {
    e.stopPropagation();
    
    // Show alert if trying to delete during response generation
    if (isTyping || isAnalyzing) {
      showAlertMessage("Please stop the current response generation first", "warning");
      return;
    }
    
    setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
    if (selectedChat === chatId) {
      setMessages([]);
      setSelectedChat(null);
      setCurrentChatId(null);
    }
  };

  const clearAllChats = () => {
    // Show alert if trying to clear during response generation
    if (isTyping || isAnalyzing) {
      showAlertMessage("Please stop the current response generation first", "warning");
      return;
    }
    
    setChatHistory([]);
    setMessages([]);
    setSelectedChat(null);
    setCurrentChatId(null);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  // Sort chat history by timestamp (newest first)
  const sortedChatHistory = [...chatHistory].sort((a, b) => b.timestamp - a.timestamp);

  // Theme-based colors
  const colors = {
    light: {
      bg: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      sidebarBg: '#ffffff',
      mainBg: '#f9fafb',
      cardBg: '#ffffff',
      textPrimary: '#2c3e50',
      textSecondary: '#64748b',
      border: '#e5e7eb',
      inputBg: '#f9fafb',
      userMessageBg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      userMessageText: '#ffffff',
      botMessageBg: '#ffffff',
      botMessageBorder: '#e5e7eb',
      iconColor: '#667eea',
      hoverBg: '#f8fafc'
    },
    dark: {
      bg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      sidebarBg: '#0f172a',
      mainBg: '#0b1120',
      cardBg: '#1e293b',
      textPrimary: '#f1f5f9',
      textSecondary: '#94a3b8',
      border: '#334155',
      inputBg: '#1e293b',
      userMessageBg: 'linear-gradient(135deg, #818cf8 0%, #a78bfa 100%)',
      userMessageText: '#ffffff',
      botMessageBg: '#1e293b',
      botMessageBorder: '#334155',
      iconColor: '#818cf8',
      hoverBg: '#2d3a4f'
    }
  };

  const currentColors = darkMode ? colors.dark : colors.light;

  return (
    <Box sx={{ 
      display: "flex", 
      height: "100vh", 
      background: currentColors.bg,
      position: 'relative',
      transition: 'all 0.3s ease'
    }}>
      {/* Animated background elements */}
      <Box sx={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: 300,
        height: 300,
        borderRadius: '50%',
        background: darkMode 
          ? 'radial-gradient(circle, rgba(129, 140, 248, 0.1) 0%, rgba(167, 139, 250, 0) 70%)'
          : 'radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0) 70%)',
        animation: 'float 20s infinite ease-in-out'
      }} />
      <Box sx={{
        position: 'absolute',
        bottom: '20%',
        right: '5%',
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: darkMode
          ? 'radial-gradient(circle, rgba(167, 139, 250, 0.08) 0%, rgba(129, 140, 248, 0) 70%)'
          : 'radial-gradient(circle, rgba(118, 75, 162, 0.08) 0%, rgba(102, 126, 234, 0) 70%)',
        animation: 'float 25s infinite ease-in-out reverse'
      }} />

      {/* Alert Snackbar */}
      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseAlert} 
          severity={alertSeverity} 
          sx={{ 
            width: '100%',
            bgcolor: darkMode ? '#1e293b' : 'white',
            color: darkMode ? '#f1f5f9' : 'inherit',
            border: `1px solid ${currentColors.border}`
          }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>

      {/* Sidebar/Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: 'none',
            bgcolor: currentColors.sidebarBg,
            transition: 'width 0.3s ease, background-color 0.3s ease',
            boxShadow: darkMode 
              ? '0 0 30px rgba(0, 0, 0, 0.5)'
              : '0 0 30px rgba(102, 126, 234, 0.1)',
            background: darkMode
              ? 'linear-gradient(135deg, #0f172a 0%, #1e1e3f 100%)'
              : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Top Logo Section with Theme Toggle */}
          <Box sx={{ 
            p: sidebarOpen ? 2.5 : 1.5,
            borderBottom: `1px solid ${currentColors.border}`,
            minHeight: '90px',
            display: 'flex',
            flexDirection: sidebarOpen ? 'row' : 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: sidebarOpen ? 0 : 1,
            background: darkMode
              ? 'linear-gradient(135deg, rgba(129, 140, 248, 0.1) 0%, rgba(167, 139, 250, 0.05) 100%)'
              : 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.02) 100%)'
          }}>
            {sidebarOpen ? (
              <>
                {/* Expanded Sidebar Logo */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box
                    component="img"
                    src={AthenaLogo}
                    alt="Athena AI"
                    sx={{
                      width: logoConfig.sidebar.expanded.width,
                      height: logoConfig.sidebar.expanded.height,
                      borderRadius: logoConfig.sidebar.expanded.borderRadius,
                      objectFit: 'contain',
                      backgroundColor: 'transparent',
                      border: `2px solid ${currentColors.border}`,
                      boxShadow: darkMode
                        ? '0 4px 15px rgba(129, 140, 248, 0.3)'
                        : '0 4px 15px rgba(102, 126, 234, 0.2)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: darkMode
                          ? '0 6px 20px rgba(129, 140, 248, 0.4)'
                          : '0 6px 20px rgba(102, 126, 234, 0.3)'
                      }
                    }}
                  />
                  <Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 700,
                        background: darkMode
                          ? 'linear-gradient(135deg, #818cf8 0%, #a78bfa 100%)'
                          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        fontSize: '1.1rem',
                        letterSpacing: '-0.5px'
                      }}
                    >
                      Athena AI
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: currentColors.textSecondary,
                        display: 'block',
                        lineHeight: 1.2,
                        fontSize: '0.7rem',
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}
                    >
                      Medical Intelligence
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {/* Theme Toggle Button */}
                  <Tooltip title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
                    <IconButton 
                      onClick={handleThemeToggle}
                      size="small"
                      sx={{ 
                        bgcolor: darkMode ? alpha('#818cf8', 0.2) : alpha('#667eea', 0.1),
                        color: darkMode ? '#818cf8' : '#667eea',
                        '&:hover': { 
                          bgcolor: darkMode ? alpha('#818cf8', 0.3) : alpha('#667eea', 0.2),
                          transform: 'scale(1.1)'
                        },
                        transition: 'all 0.2s',
                        width: 36,
                        height: 36
                      }}
                    >
                      {darkMode ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
                    </IconButton>
                  </Tooltip>
                  
                  <Tooltip title="Collapse sidebar">
                    <IconButton 
                      onClick={() => setSidebarOpen(false)} 
                      size="small"
                      sx={{ 
                        bgcolor: darkMode ? alpha('#818cf8', 0.2) : alpha('#667eea', 0.1),
                        color: darkMode ? '#818cf8' : '#667eea',
                        '&:hover': { 
                          bgcolor: darkMode ? alpha('#818cf8', 0.3) : alpha('#667eea', 0.2),
                          transform: 'scale(1.1)'
                        },
                        transition: 'all 0.2s'
                      }}
                    >
                      <ChevronLeftIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </>
            ) : (
              // Collapsed Sidebar Logo with Theme Toggle
              <>
                <Box
                  component="img"
                  src={AthenaLogo}
                  alt="Athena AI"
                  sx={{
                    width: logoConfig.sidebar.collapsed.width,
                    height: logoConfig.sidebar.collapsed.height,
                    borderRadius: logoConfig.sidebar.collapsed.borderRadius,
                    objectFit: 'contain',
                    backgroundColor: 'transparent',
                    mb: 1,
                    border: `2px solid ${currentColors.border}`,
                    boxShadow: darkMode
                      ? '0 4px 15px rgba(129, 140, 248, 0.3)'
                      : '0 4px 15px rgba(102, 126, 234, 0.2)',
                    transition: 'all 0.3s ease'
                  }}
                />
                
                {/* Theme Toggle in collapsed sidebar */}
                <Tooltip title={darkMode ? "Light Mode" : "Dark Mode"} placement="right">
                  <IconButton 
                    onClick={handleThemeToggle}
                    size="small"
                    sx={{ 
                      bgcolor: darkMode ? alpha('#818cf8', 0.2) : alpha('#667eea', 0.1),
                      color: darkMode ? '#818cf8' : '#667eea',
                      mb: 1,
                      '&:hover': { 
                        bgcolor: darkMode ? alpha('#818cf8', 0.3) : alpha('#667eea', 0.2),
                        transform: 'scale(1.1)'
                      },
                      transition: 'all 0.2s',
                      width: 40,
                      height: 40
                    }}
                  >
                    {darkMode ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
                  </IconButton>
                </Tooltip>
                
                <Tooltip title="Expand sidebar" placement="right">
                  <IconButton onClick={() => setSidebarOpen(true)} size="small" sx={{ color: currentColors.textSecondary }}>
                    <MenuIcon />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </Box>

          {/* Main Content Area */}
          <Box sx={{ flex: 1, overflow: 'auto', p: sidebarOpen ? 2 : 1 }}>
            {sidebarOpen ? (
              <>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  fullWidth
                  sx={{ 
                    mb: 3, 
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    background: darkMode
                      ? 'linear-gradient(135deg, #818cf8 0%, #a78bfa 100%)'
                      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: darkMode
                      ? '0 4px 12px rgba(129, 140, 248, 0.3)'
                      : '0 4px 12px rgba(102, 126, 234, 0.2)',
                    '&:hover': { 
                      transform: 'translateY(-2px)',
                      boxShadow: darkMode
                        ? '0 6px 16px rgba(129, 140, 248, 0.4)'
                        : '0 6px 16px rgba(102, 126, 234, 0.3)',
                      background: darkMode
                        ? 'linear-gradient(135deg, #a78bfa 0%, #818cf8 100%)'
                        : 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                  onClick={startNewChat}
                  disabled={isTyping || isAnalyzing}
                >
                  New Conversation
                </Button>

                {/* Stop Generation Button (only shown when typing or analyzing) */}
                {(isTyping || isAnalyzing) && (
                  <Button
                    variant="outlined"
                    color="warning"
                    startIcon={<StopIcon />}
                    fullWidth
                    sx={{ 
                      mb: 3, 
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      borderColor: '#ff9800',
                      color: '#ff9800',
                      bgcolor: darkMode ? alpha('#ff9800', 0.1) : 'transparent',
                      '&:hover': { 
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 12px rgba(255, 152, 0, 0.2)',
                        borderColor: '#f57c00',
                        bgcolor: darkMode ? alpha('#ff9800', 0.2) : alpha('#ff9800', 0.04)
                      },
                      transition: 'all 0.2s'
                    }}
                    onClick={handleStopGeneration}
                  >
                    {isAnalyzing ? 'Cancel Analysis' : 'Stop Generation'}
                  </Button>
                )}

                {sortedChatHistory.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      mb: 1.5,
                      px: 0.5
                    }}>
                      <Typography 
                        variant="subtitle2" 
                        sx={{ 
                          color: currentColors.textSecondary, 
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          fontSize: '0.7rem',
                          fontWeight: 700
                        }}
                      >
                        Recent Chats
                      </Typography>
                      <Chip 
                        label={sortedChatHistory.length}
                        size="small"
                        sx={{ 
                          bgcolor: darkMode ? alpha('#818cf8', 0.2) : alpha('#667eea', 0.1),
                          color: darkMode ? '#818cf8' : '#667eea',
                          fontWeight: 600,
                          height: 20,
                          fontSize: '0.65rem'
                        }}
                      />
                    </Box>
                    
                    <List dense sx={{ p: 0 }}>
                      {sortedChatHistory.map((chat) => (
                        <ListItem 
                          key={chat.id} 
                          disablePadding
                          sx={{ 
                            mb: 1,
                            borderRadius: 2,
                            bgcolor: selectedChat === chat.id 
                              ? (darkMode ? alpha('#818cf8', 0.15) : alpha('#667eea', 0.1))
                              : 'transparent',
                            border: `1px solid ${selectedChat === chat.id 
                              ? (darkMode ? alpha('#818cf8', 0.3) : alpha('#667eea', 0.2))
                              : currentColors.border}`,
                            transition: 'all 0.2s',
                            '&:hover': { 
                              bgcolor: selectedChat === chat.id 
                                ? (darkMode ? alpha('#818cf8', 0.2) : alpha('#667eea', 0.15))
                                : (darkMode ? alpha('#ffffff', 0.05) : alpha('#667eea', 0.05)),
                              borderColor: selectedChat === chat.id 
                                ? (darkMode ? alpha('#818cf8', 0.4) : alpha('#667eea', 0.3))
                                : (darkMode ? '#818cf8' : '#667eea')
                            }
                          }}
                        >
                          <ListItemButton 
                            onClick={() => loadChat(chat.id)}
                            sx={{ 
                              borderRadius: 2,
                              py: 1.5,
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'flex-start'
                            }}
                            disabled={isTyping || isAnalyzing}
                          >
                            <Box sx={{ flex: 1, overflow: 'hidden', mr: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                <HistoryIcon sx={{ 
                                  fontSize: 14, 
                                  color: (isTyping || isAnalyzing)
                                    ? (darkMode ? '#475569' : '#94a3b8')
                                    : currentColors.iconColor
                                }} />
                                <Typography 
                                  variant="body2" 
                                  fontWeight={600}
                                  noWrap
                                  sx={{ 
                                    color: (isTyping || isAnalyzing)
                                      ? (darkMode ? '#475569' : '#94a3b8')
                                      : (selectedChat === chat.id 
                                        ? (darkMode ? '#818cf8' : '#667eea')
                                        : currentColors.textPrimary
                                      )
                                  }}
                                >
                                  {chat.title}
                                </Typography>
                              </Box>
                              <Typography 
                                variant="caption" 
                                sx={{ 
                                  color: (isTyping || isAnalyzing)
                                    ? (darkMode ? '#475569' : '#94a3b8')
                                    : currentColors.textSecondary,
                                  display: 'block', 
                                  pl: 2,
                                  opacity: (isTyping || isAnalyzing) ? 0.6 : 1
                                }}
                                noWrap
                              >
                                {chat.preview || chat.lastMessage}
                              </Typography>
                              <Typography 
                                variant="caption" 
                                sx={{ 
                                  color: (isTyping || isAnalyzing)
                                    ? (darkMode ? '#475569' : '#94a3b8')
                                    : currentColors.textSecondary,
                                  display: 'block', 
                                  mt: 0.5, 
                                  pl: 2,
                                  fontSize: '0.6rem',
                                  fontWeight: 500
                                }}
                              >
                                {timeAgo(chat.timestamp)}
                              </Typography>
                            </Box>
                            <Tooltip title={(isTyping || isAnalyzing) ? "Stop generation first" : "Delete chat"}>
                              <span>
                                <IconButton 
                                  size="small" 
                                  onClick={(e) => deleteChat(chat.id, e)}
                                  sx={{ 
                                    color: (isTyping || isAnalyzing)
                                      ? (darkMode ? '#475569' : '#94a3b8')
                                      : currentColors.textSecondary,
                                    '&:hover': { 
                                      color: (isTyping || isAnalyzing)
                                        ? (darkMode ? '#475569' : '#94a3b8')
                                        : '#ef4444',
                                      bgcolor: (isTyping || isAnalyzing) ? 'transparent' : (darkMode ? alpha('#ef4444', 0.1) : alpha('#ef4444', 0.05))
                                    }
                                  }}
                                  disabled={isTyping || isAnalyzing}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </span>
                            </Tooltip>
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>

                    <Box sx={{ mt: 3, px: 0.5 }}>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        fullWidth
                        sx={{ 
                          borderRadius: 1.5,
                          textTransform: 'none',
                          fontWeight: 500,
                          borderColor: (isTyping || isAnalyzing)
                            ? (darkMode ? '#475569' : '#e2e8f0')
                            : '#ef4444',
                          color: (isTyping || isAnalyzing)
                            ? (darkMode ? '#475569' : '#94a3b8')
                            : '#ef4444',
                          '&:hover': {
                            borderColor: (isTyping || isAnalyzing)
                              ? (darkMode ? '#475569' : '#e2e8f0')
                              : '#dc2626',
                            bgcolor: (isTyping || isAnalyzing)
                              ? 'transparent'
                              : (darkMode ? alpha('#ef4444', 0.1) : alpha('#ef4444', 0.04))
                          }
                        }}
                        onClick={clearAllChats}
                        disabled={isTyping || isAnalyzing}
                      >
                        Clear All Chats
                      </Button>
                    </Box>
                  </Box>
                )}

                {sortedChatHistory.length === 0 && (
                  <Box sx={{ textAlign: 'center', py: 4, px: 2, color: currentColors.textSecondary }}>
                    <HistoryIcon sx={{ fontSize: 48, opacity: 0.3, mb: 2, color: currentColors.iconColor }} />
                    <Typography variant="body2" fontWeight={600}>No conversations yet</Typography>
                    <Typography variant="caption" sx={{ display: 'block', mt: 1, color: currentColors.textSecondary }}>
                      Start a new chat to see history here
                    </Typography>
                  </Box>
                )}
              </>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, pt: 2 }}>
                <Tooltip title="New Conversation" placement="right">
                  <IconButton 
                    onClick={startNewChat} 
                    sx={{ 
                      bgcolor: (isTyping || isAnalyzing)
                        ? (darkMode ? '#475569' : '#cbd5e1')
                        : (darkMode ? '#818cf8' : '#667eea'),
                      color: 'white',
                      '&:hover': { 
                        bgcolor: (isTyping || isAnalyzing)
                          ? (darkMode ? '#475569' : '#cbd5e1')
                          : (darkMode ? '#a78bfa' : '#764ba2'),
                        transform: (isTyping || isAnalyzing) ? 'none' : 'scale(1.1)'
                      },
                      transition: 'all 0.2s',
                      width: 44,
                      height: 44
                    }}
                    disabled={isTyping || isAnalyzing}
                  >
                    <AddIcon />
                  </IconButton>
                </Tooltip>
                
                {/* Stop Generation Button in collapsed sidebar */}
                {(isTyping || isAnalyzing) && (
                  <Tooltip title={isAnalyzing ? "Cancel Analysis" : "Stop Generation"} placement="right">
                    <IconButton 
                      onClick={handleStopGeneration}
                      sx={{ 
                        bgcolor: '#ff9800',
                        color: 'white',
                        '&:hover': { 
                          bgcolor: '#f57c00',
                          transform: 'scale(1.1)'
                        },
                        transition: 'all 0.2s',
                        width: 44,
                        height: 44
                      }}
                    >
                      <StopIcon />
                    </IconButton>
                  </Tooltip>
                )}
                
                <Divider sx={{ width: '70%', my: 1, borderColor: currentColors.border }} />
                
                <Box sx={{ width: '100%' }}>
                  {sortedChatHistory.slice(0, 5).map((chat) => (
                    <Tooltip key={chat.id} title={chat.title} placement="right">
                      <span>
                        <IconButton 
                          sx={{ 
                            mb: 1,
                            bgcolor: selectedChat === chat.id 
                              ? (darkMode ? alpha('#818cf8', 0.2) : alpha('#667eea', 0.1))
                              : 'transparent',
                            border: selectedChat === chat.id 
                              ? `2px solid ${darkMode ? '#818cf8' : '#667eea'}`
                              : 'none',
                            width: 44,
                            height: 44,
                            '&:hover': { 
                              bgcolor: (isTyping || isAnalyzing)
                                ? 'transparent'
                                : (darkMode ? alpha('#818cf8', 0.1) : alpha('#667eea', 0.05)),
                              transform: (isTyping || isAnalyzing) ? 'none' : 'scale(1.05)'
                            },
                            transition: 'all 0.2s',
                            opacity: (isTyping || isAnalyzing) ? 0.6 : 1,
                            color: selectedChat === chat.id 
                              ? (darkMode ? '#818cf8' : '#667eea')
                              : currentColors.textSecondary
                          }}
                          onClick={() => loadChat(chat.id)}
                          disabled={isTyping || isAnalyzing}
                        >
                          <Typography 
                            variant="caption" 
                            fontWeight={700}
                            sx={{ 
                              fontSize: '1rem'
                            }}
                          >
                            {chat.title.charAt(0)}
                          </Typography>
                        </IconButton>
                      </span>
                    </Tooltip>
                  ))}
                </Box>
              </Box>
            )}
          </Box>

          {/* Bottom Section with Theme Info */}
          {sidebarOpen && (
            <Box sx={{ 
              p: 2, 
              borderTop: `1px solid ${currentColors.border}`,
              bgcolor: darkMode ? alpha('#1e293b', 0.3) : alpha('#f8fafc', 0.5)
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  component="img"
                  src={AthenaLogo}
                  alt="Athena AI"
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '6px',
                    opacity: 0.7
                  }}
                />
                <Typography variant="caption" sx={{ color: currentColors.textSecondary }}>
                  Athena AI v1.0 • Medical Intelligence
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Drawer>

      {/* Main Chat Area */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          bgcolor: currentColors.mainBg,
          ml: `${drawerWidth}px`,
          width: `calc(100% - ${drawerWidth}px)`,
          transition: 'margin-left 0.3s ease, background-color 0.3s ease',
          position: 'relative',
          zIndex: 1
        }}
      >
        <Box sx={{ 
          flex: 1, 
          overflow: 'auto', 
          display: 'flex', 
          justifyContent: 'center', 
          bgcolor: 'transparent',
          position: 'relative'
        }}>
          <Box sx={{ 
            width: '100%', 
            maxWidth: '900px', 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            p: { xs: 1, sm: 2, md: 3 } 
          }}>
            {/* Welcome message when no messages */}
            {messages.length === 0 && !isTyping && !isAnalyzing && (
              <Box sx={{ 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                textAlign: 'center', 
                py: { xs: 4, sm: 6, md: 8 } 
              }}>
                <Box
                  component="img"
                  src={AthenaLogo}
                  alt="Athena AI"
                  sx={{
                    width: { xs: 100, sm: 130, md: logoConfig.main.welcome.width },
                    height: { xs: 100, sm: 130, md: logoConfig.main.welcome.height },
                    borderRadius: logoConfig.main.welcome.borderRadius,
                    objectFit: 'contain',
                    backgroundColor: 'transparent',
                    mb: 3,
                    boxShadow: darkMode
                      ? '0 10px 30px rgba(129, 140, 248, 0.3)'
                      : '0 10px 30px rgba(102, 126, 234, 0.2)',
                    border: `3px solid ${currentColors.border}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: darkMode
                        ? '0 15px 40px rgba(129, 140, 248, 0.4)'
                        : '0 15px 40px rgba(102, 126, 234, 0.3)'
                    }
                  }}
                />
                <Typography 
                  variant={isMobile ? "h5" : "h4"} 
                  fontWeight={800} 
                  gutterBottom
                  sx={{
                    background: darkMode
                      ? 'linear-gradient(135deg, #818cf8 0%, #a78bfa 100%)'
                      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: '-0.5px'
                  }}
                >
                  Welcome to Athena AI
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: currentColors.textSecondary,
                    maxWidth: 600, 
                    px: { xs: 2, sm: 0 },
                    mb: 3,
                    lineHeight: 1.8
                  }}
                >
                  Your intelligent health companion. I'm here to provide accurate medical information, 
                  symptom analysis, and health guidance. Describe your symptoms or ask any health-related question.
                </Typography>
                
                {/* Quick action chips for immediate responses */}
                <Box sx={{ 
                  width: '100%', 
                  mt: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 1,
                  justifyContent: 'center'
                }}>
                  {quickActions.slice(0, 6).map((action, index) => (
                    <Chip
                      key={index}
                      label={action.label}
                      onClick={() => handleQuickAction(action.query)}
                      disabled={isTyping || isAnalyzing}
                      sx={{
                        bgcolor: darkMode ? alpha('#818cf8', 0.1) : alpha('#667eea', 0.05),
                        color: currentColors.textPrimary,
                        border: `1px solid ${darkMode ? alpha('#818cf8', 0.2) : alpha('#667eea', 0.1)}`,
                        '&:hover': {
                          bgcolor: darkMode ? alpha('#818cf8', 0.2) : alpha('#667eea', 0.1),
                          transform: 'translateY(-2px)',
                          borderColor: darkMode ? '#818cf8' : '#667eea'
                        },
                        transition: 'all 0.2s',
                        fontWeight: 500,
                        py: 2
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )}

            {/* Chat Messages */}
            {messages.map((m, i) => (
              <Box key={i} sx={{ 
                display: "flex", 
                alignItems: "flex-start", 
                justifyContent: m.role === "user" ? "flex-end" : "flex-start", 
                mb: 2.5, 
                gap: 2 
              }}>
                {m.role === "bot" && (
                  <Avatar
                    src={AthenaLogo}
                    alt="Athena AI"
                    sx={{ 
                      width: 40, 
                      height: 40, 
                      display: { xs: 'none', sm: 'flex' }, 
                      boxShadow: darkMode
                        ? '0 4px 12px rgba(129, 140, 248, 0.3)'
                        : '0 4px 12px rgba(102, 126, 234, 0.2)',
                      bgcolor: 'transparent',
                      p: 0.5,
                      border: `2px solid ${darkMode ? alpha('#818cf8', 0.3) : alpha('#667eea', 0.2)}`
                    }}
                  />
                )}

                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 2.5, 
                    maxWidth: "87%", 
                    bgcolor: m.role === "user" 
                      ? (darkMode ? '#818cf8' : '#667eea')
                      : currentColors.botMessageBg,
                    color: m.role === "user" 
                      ? 'white' 
                      : currentColors.textPrimary,
                    borderRadius: 3, 
                    border: m.role === "user" 
                      ? 'none' 
                      : `1px solid ${currentColors.border}`,
                    boxShadow: m.role === "user" 
                      ? (darkMode
                        ? '0 4px 15px rgba(129, 140, 248, 0.3)'
                        : '0 4px 15px rgba(102, 126, 234, 0.2)')
                      : (darkMode
                        ? '0 2px 8px rgba(0, 0, 0, 0.2)'
                        : '0 2px 8px rgba(0, 0, 0, 0.05)'),
                    overflowWrap: "break-word", 
                    wordBreak: "break-word", 
                    minHeight: m.role === "bot" && m.text === "" ? "50px" : "auto", 
                    display: "flex", 
                    alignItems: m.role === "bot" && m.text === "" ? "center" : "flex-start",
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: m.role === "user"
                        ? (darkMode
                          ? '0 6px 20px rgba(129, 140, 248, 0.4)'
                          : '0 6px 20px rgba(102, 126, 234, 0.3)')
                        : (darkMode
                          ? '0 4px 15px rgba(0, 0, 0, 0.3)'
                          : '0 4px 15px rgba(0, 0, 0, 0.1)')
                    }
                  }}
                >
                  {m.role === "user" ? (
                    <Typography sx={{ whiteSpace: "pre-line", lineHeight: 1.7, fontWeight: 500 }}>
                      {m.text}
                    </Typography>
                  ) : (
                    <>
                      {m.text === "" && isAnalyzing ? (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <CircularProgress size={20} sx={{ color: darkMode ? '#818cf8' : '#667eea' }} />
                          <Typography variant="body2" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
                            Athena is analyzing your symptoms...
                          </Typography>
                        </Box>
                      ) : m.text === "" && isTyping ? (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <CircularProgress size={20} sx={{ color: darkMode ? '#818cf8' : '#667eea' }} />
                          <Typography variant="body2" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
                            Typing response...
                          </Typography>
                        </Box>
                      ) : (
                        <Typography 
                          component="div" 
                          sx={{ 
                            lineHeight: 1.7, 
                            fontFamily: 'inherit',
                            color: currentColors.textPrimary,
                            '& strong': { 
                              fontWeight: 700, 
                              color: darkMode ? '#818cf8' : '#667eea',
                              backgroundColor: darkMode ? alpha('#818cf8', 0.1) : alpha('#667eea', 0.1),
                              padding: '2px 6px', 
                              borderRadius: '4px' 
                            },
                            '& h1, & h2, & h3, & h4': { 
                              color: darkMode ? '#f1f5f9' : '#2c3e50', 
                              marginTop: '20px', 
                              marginBottom: '12px', 
                              paddingBottom: '6px', 
                              borderBottom: `2px solid ${currentColors.border}` 
                            },
                            '& ul, & ol': { 
                              marginLeft: '24px', 
                              marginBottom: '16px' 
                            },
                            '& li': { 
                              marginBottom: '8px' 
                            },
                            '& code': { 
                              backgroundColor: darkMode ? '#1e293b' : '#f8f9fa',
                              padding: '3px 8px', 
                              borderRadius: '4px', 
                              fontFamily: "'Courier New', monospace", 
                              color: darkMode ? '#f87171' : '#e74c3c', 
                              fontSize: '0.9em',
                              border: `1px solid ${currentColors.border}`
                            }
                          }}
                        >
                          <ReactMarkdown>{m.text}</ReactMarkdown>
                        </Typography>
                      )}
                    </>
                  )}
                </Paper>

                {m.role === "user" && (
                  <Avatar 
                    sx={{ 
                      bgcolor: darkMode ? '#818cf8' : '#667eea', 
                      width: 40, 
                      height: 40, 
                      display: { xs: 'none', sm: 'flex' },
                      boxShadow: darkMode
                        ? '0 4px 12px rgba(129, 140, 248, 0.3)'
                        : '0 4px 12px rgba(102, 126, 234, 0.2)'
                    }}
                  >
                    <PersonIcon />
                  </Avatar>
                )}
              </Box>
            ))}
            
            {/* Analyzing indicator (when first message is loading) */}
            {isAnalyzing && messages.length === 1 && (
              <Fade in={true}>
                <Box sx={{ 
                  display: "flex", 
                  alignItems: "flex-start", 
                  justifyContent: "flex-start", 
                  mb: 2.5, 
                  gap: 2 
                }}>
                  <Avatar
                    src={AthenaLogo}
                    alt="Athena AI"
                    sx={{ 
                      width: 40, 
                      height: 40, 
                      display: { xs: 'none', sm: 'flex' },
                      bgcolor: 'transparent',
                      p: 0.5,
                      border: `2px solid ${darkMode ? alpha('#818cf8', 0.3) : alpha('#667eea', 0.2)}`
                    }}
                  />
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 3, 
                      maxWidth: "80%", 
                      bgcolor: currentColors.botMessageBg,
                      borderRadius: 3, 
                      border: `1px solid ${currentColors.border}`,
                      display: "flex", 
                      flexDirection: 'column',
                      alignItems: "center", 
                      gap: 2,
                      boxShadow: darkMode ? '0 2px 8px rgba(0, 0, 0, 0.2)' : '0 1px 3px rgba(0, 0, 0, 0.05)'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <BiotechIcon sx={{ color: darkMode ? '#818cf8' : '#667eea', fontSize: 28 }} />
                      <Typography variant="h6" fontWeight={600} sx={{ color: currentColors.textPrimary }}>
                        Athena is Analyzing
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, my: 1 }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <CircularProgress 
                          size={40} 
                          sx={{ color: darkMode ? '#818cf8' : '#667eea', mb: 1 }} 
                          variant="indeterminate"
                        />
                        <Typography variant="caption" sx={{ color: currentColors.textSecondary }}>
                          Processing
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Box sx={{ 
                          width: 40, 
                          height: 40, 
                          borderRadius: '50%', 
                          bgcolor: darkMode ? alpha('#818cf8', 0.2) : alpha('#667eea', 0.1),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 1
                        }}>
                          <Typography variant="body2" fontWeight={700} sx={{ color: darkMode ? '#818cf8' : '#667eea' }}>
                            2s
                          </Typography>
                        </Box>
                        <Typography variant="caption" sx={{ color: currentColors.textSecondary }}>
                          Delay
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Box sx={{ 
                          width: 40, 
                          height: 40, 
                          borderRadius: '50%', 
                          bgcolor: darkMode ? alpha('#22c55e', 0.2) : alpha('#22c55e', 0.1),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 1
                        }}>
                          <SmartToyIcon sx={{ color: '#22c55e', fontSize: 24 }} />
                        </Box>
                        <Typography variant="caption" sx={{ color: currentColors.textSecondary }}>
                          Response
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Typography variant="body2" sx={{ color: currentColors.textSecondary, textAlign: 'center' }}>
                      Please wait while I analyze your symptoms and prepare a comprehensive response...
                    </Typography>
                    
                    <Button
                      variant="outlined"
                      color="warning"
                      size="small"
                      startIcon={<StopIcon />}
                      onClick={handleStopGeneration}
                      sx={{ 
                        mt: 1,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 500,
                        borderColor: '#ff9800',
                        color: '#ff9800',
                        bgcolor: darkMode ? alpha('#ff9800', 0.1) : 'transparent',
                        '&:hover': {
                          borderColor: '#f57c00',
                          bgcolor: darkMode ? alpha('#ff9800', 0.2) : alpha('#ff9800', 0.04)
                        }
                      }}
                    >
                      Cancel Analysis
                    </Button>
                  </Paper>
                </Box>
              </Fade>
            )}
            
            {/* Typing indicator for subsequent messages */}
            {isTyping && messages.length > 0 && messages[messages.length - 1].role === "bot" && messages[messages.length - 1].text === "" && !isAnalyzing && (
              <Box sx={{ 
                display: "flex", 
                alignItems: "flex-start", 
                justifyContent: "flex-start", 
                mb: 2.5, 
                gap: 2 
              }}>
                <Avatar
                  src={AthenaLogo}
                  alt="Athena AI"
                  sx={{ 
                    width: 40, 
                    height: 40, 
                    display: { xs: 'none', sm: 'flex' },
                    bgcolor: 'transparent',
                    p: 0.5,
                    border: `2px solid ${darkMode ? alpha('#818cf8', 0.3) : alpha('#667eea', 0.2)}`
                  }}
                />
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 2.5, 
                    maxWidth: "80%", 
                    bgcolor: currentColors.botMessageBg,
                    borderRadius: 3, 
                    border: `1px solid ${currentColors.border}`,
                    display: "flex", 
                    alignItems: "center", 
                    gap: 2, 
                    flexWrap: 'wrap',
                    boxShadow: darkMode ? '0 2px 8px rgba(0, 0, 0, 0.2)' : '0 1px 3px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                    <CircularProgress size={20} sx={{ color: darkMode ? '#818cf8' : '#667eea' }} />
                    <Typography variant="body2" sx={{ color: currentColors.textSecondary }}>
                      Typing response...
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    color="warning"
                    size="small"
                    startIcon={<StopIcon />}
                    onClick={handleStopGeneration}
                    sx={{ 
                      ml: 1,
                      borderRadius: 1.5,
                      textTransform: 'none',
                      fontWeight: 500,
                      fontSize: '0.8rem',
                      borderColor: '#ff9800',
                      color: '#ff9800',
                      bgcolor: darkMode ? alpha('#ff9800', 0.1) : 'transparent',
                      '&:hover': {
                        borderColor: '#f57c00',
                        bgcolor: darkMode ? alpha('#ff9800', 0.2) : alpha('#ff9800', 0.04)
                      }
                    }}
                  >
                    Stop
                  </Button>
                </Paper>
              </Box>
            )}
            
            <div ref={bottomRef} />
          </Box>
        </Box>

        {/* Input Area */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          p: { xs: 1.5, sm: 2 }, 
          borderTop: `1px solid ${currentColors.border}`, 
          bgcolor: darkMode ? alpha('#1e293b', 0.8) : 'white',
          backdropFilter: 'blur(10px)',
          boxShadow: darkMode
            ? '0 -4px 20px rgba(0, 0, 0, 0.3)'
            : '0 -4px 20px rgba(0, 0, 0, 0.05)'
        }}>
          {/* Quick action chips for mobile when no messages */}
          {isMobile && messages.length === 0 && !isTyping && !isAnalyzing && (
            <Box sx={{ 
              display: 'flex', 
              overflowX: 'auto', 
              pb: 1.5, 
              mb: 1.5,
              gap: 1,
              '&::-webkit-scrollbar': { display: 'none' },
              scrollbarWidth: 'none'
            }}>
              {quickActions.slice(0, 6).map((action, index) => (
                <Chip
                  key={index}
                  label={action.label}
                  onClick={() => handleQuickAction(action.query)}
                  disabled={isTyping || isAnalyzing}
                  sx={{
                    flexShrink: 0,
                    bgcolor: darkMode ? alpha('#818cf8', 0.1) : '#f5f5f5',
                    color: currentColors.textPrimary,
                    border: `1px solid ${currentColors.border}`,
                    '&:hover': { 
                      bgcolor: darkMode ? alpha('#818cf8', 0.2) : alpha('#667eea', 0.1),
                      color: darkMode ? '#818cf8' : '#667eea'
                    }
                  }}
                />
              ))}
            </Box>
          )}
          
          <Box sx={{ width: '100%', maxWidth: '900px', mx: 'auto', display: 'flex', gap: 1, alignItems: 'center' }}>
            <TextField 
              fullWidth 
              placeholder={isMobile ? "Type a message..." : "Describe your symptoms or ask a health question..."} 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()} 
              disabled={isTyping || isAnalyzing} 
              multiline 
              maxRows={3} 
              variant="outlined" 
              size={isMobile ? "small" : "medium"}
              sx={{ 
                '& .MuiOutlinedInput-root': { 
                  borderRadius: 2, 
                  bgcolor: currentColors.inputBg,
                  color: currentColors.textPrimary,
                  '&:hover': { 
                    bgcolor: darkMode ? alpha('#1e293b', 0.9) : '#f3f4f6',
                    borderColor: darkMode ? '#818cf8' : '#667eea'
                  },
                  '&.Mui-focused': { 
                    bgcolor: darkMode ? '#1e293b' : 'white',
                    boxShadow: darkMode
                      ? '0 0 0 2px rgba(129, 140, 248, 0.2)'
                      : '0 0 0 2px rgba(102, 126, 234, 0.1)',
                    borderColor: darkMode ? '#818cf8' : '#667eea'
                  },
                  '& fieldset': {
                    borderColor: currentColors.border
                  }
                },
                '& .MuiInputBase-input::placeholder': {
                  color: currentColors.textSecondary,
                  opacity: 0.7
                }
              }} 
            />
            
            {(isTyping || isAnalyzing) ? (
              <Button
                variant="outlined"
                color="warning"
                startIcon={<StopIcon />}
                onClick={handleStopGeneration}
                size={isMobile ? "small" : "medium"}
                sx={{ 
                  height: isMobile ? '40px' : '56px',
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  borderColor: '#ff9800',
                  color: '#ff9800',
                  bgcolor: darkMode ? alpha('#ff9800', 0.1) : 'transparent',
                  '&:hover': { 
                    borderColor: '#f57c00',
                    bgcolor: darkMode ? alpha('#ff9800', 0.2) : alpha('#ff9800', 0.04),
                    transform: 'translateY(-1px)'
                  },
                  transition: 'all 0.2s',
                  minWidth: isMobile ? '70px' : '100px'
                }}
              >
                {isAnalyzing ? 'Cancel' : 'Stop'}
              </Button>
            ) : (
              <IconButton 
                onClick={handleSend} 
                disabled={!input.trim()} 
                size={isMobile ? "small" : "medium"}
                sx={{ 
                  bgcolor: !input.trim() 
                    ? (darkMode ? '#475569' : '#cbd5e1')
                    : (darkMode ? '#818cf8' : '#667eea'),
                  color: 'white',
                  height: isMobile ? '40px' : '56px',
                  width: isMobile ? '40px' : '56px',
                  '&:hover': { 
                    bgcolor: !input.trim() 
                      ? (darkMode ? '#475569' : '#cbd5e1')
                      : (darkMode ? '#a78bfa' : '#764ba2'),
                    transform: 'scale(1.05)'
                  },
                  '&.Mui-disabled': { 
                    bgcolor: darkMode ? '#475569' : '#cbd5e1',
                    color: darkMode ? '#94a3b8' : '#ffffff'
                  },
                  transition: 'all 0.2s',
                  boxShadow: !input.trim()
                    ? 'none'
                    : (darkMode
                      ? '0 4px 12px rgba(129, 140, 248, 0.3)'
                      : '0 4px 12px rgba(102, 126, 234, 0.2)')
                }}
              >
                <SendIcon fontSize={isMobile ? "small" : "medium"} />
              </IconButton>
            )}
          </Box>
        </Box>
      </Box>

      {/* Animation keyframes */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(5deg);
          }
        }
      `}</style>
    </Box>
  );
}