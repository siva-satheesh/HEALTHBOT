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
  useMediaQuery
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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("info");
  const [currentChatId, setCurrentChatId] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const bottomRef = useRef(null);
  
  // Add refs for typing control
  const isMountedRef = useRef(true);
  const currentTypingIdRef = useRef(null);
  const currentTypeWriterStopRef = useRef(null);

  const drawerWidth = sidebarOpen ? 280 : 60;

  // LOGO SIZE CONFIGURATION - Customize these values
  const logoConfig = {
    sidebar: {
      expanded: {
        width: 50,
        height: 50,
        borderRadius: '12px'
      },
      collapsed: {
        width: 40,
        height: 40,
        borderRadius: '10px'
      }
    },
    main: {
      welcome: {
        width: 150,
        height: 150,
        borderRadius: '25px'
      }
    }
  };

  // Common symptom quick actions
  const quickActions = [
   
  ];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

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
      setLastUpdate(Date.now()); // Trigger re-render to update timeAgo
    }, 1000); // Update every second for smooth transitions
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true;
    
    return () => {
      isMountedRef.current = false;
      stopTypingAnimation();
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
    
    setIsTyping(false);
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
    if (!userText.trim() || isTyping) return;

    setInput("");
    
    // Add user message immediately
    const userMessageObj = { role: "user", text: userText, timestamp: Date.now() };
    setMessages(prev => [...prev, userMessageObj]);
    setIsTyping(true);

    const { reply } = chatbotReply(userText);

    // Add empty bot message for typing animation
    setMessages(prev => [...prev, { role: "bot", text: "", timestamp: Date.now() }]);

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
  };

  const handleQuickAction = (query) => {
    if (isTyping) {
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
    if (isTyping) {
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
    if (isTyping) {
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
    if (isTyping) {
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
    if (isTyping) {
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

  // Sort chat history by timestamp (newest first)
  const sortedChatHistory = [...chatHistory].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#f9fafb" }}>
      {/* Alert Snackbar */}
      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseAlert} severity={alertSeverity} sx={{ width: '100%' }}>
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
            bgcolor: '#ffffff',
            transition: 'width 0.3s ease',
            boxShadow: '0 0 20px rgba(255, 46, 46, 0.05)',
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Top Logo Section */}
          <Box sx={{ 
            p: sidebarOpen ? 2.5 : 1.5,
            borderBottom: '1px solid',
            borderColor: 'divider',
            minHeight: '80px',
            display: 'flex',
            flexDirection: sidebarOpen ? 'row' : 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: sidebarOpen ? 0 : 1
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
                      border: '1px solid #e5e7eb'
                    }}
                  />
                  <Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #1976d2 0%, #21CBF3 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        fontSize: '1.1rem'
                      }}
                    >
                      Athena AI
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: 'text.secondary',
                        display: 'block',
                        lineHeight: 1.2,
                        fontSize: '0.75rem'
                      }}
                    >
                      Medical Intelligence
                    </Typography>
                  </Box>
                </Box>
                
                <Tooltip title="Collapse sidebar">
                  <IconButton 
                    onClick={() => setSidebarOpen(false)} 
                    size="small"
                    sx={{ 
                      bgcolor: 'action.hover',
                      '&:hover': { bgcolor: 'action.selected' }
                    }}
                  >
                    <ChevronLeftIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              // Collapsed Sidebar Logo
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
                    mb: 1
                  }}
                />
                <Tooltip title="Expand sidebar" placement="right">
                  <IconButton onClick={() => setSidebarOpen(true)} size="small">
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
                    '&:hover': { 
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)'
                    }
                  }}
                  onClick={startNewChat}
                  disabled={isTyping}
                >
                  New Conversation
                </Button>

                {/* Stop Generation Button (only shown when typing) */}
                {isTyping && (
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
                      '&:hover': { 
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 12px rgba(255, 152, 0, 0.2)',
                        borderColor: '#f57c00',
                        bgcolor: 'rgba(255, 152, 0, 0.04)'
                      }
                    }}
                    onClick={handleStopGeneration}
                  >
                    Stop Generation
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
                          color: 'text.secondary', 
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          fontSize: '0.75rem',
                          fontWeight: 600
                        }}
                      >
                        Recent Chats
                      </Typography>
                      <Chip 
                        label={sortedChatHistory.length}
                        size="small"
                        sx={{ 
                          bgcolor: 'primary.50',
                          color: 'primary.main',
                          fontWeight: 600,
                          height: 20
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
                            bgcolor: selectedChat === chat.id ? 'primary.50' : 'transparent',
                            border: selectedChat === chat.id ? '1px solid' : '1px solid transparent',
                            borderColor: selectedChat === chat.id ? 'primary.100' : 'transparent',
                            transition: 'all 0.2s',
                            '&:hover': { 
                              bgcolor: selectedChat === chat.id ? 'primary.50' : 'grey.50',
                              borderColor: selectedChat === chat.id ? 'primary.100' : 'grey.200'
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
                            disabled={isTyping}
                          >
                            <Box sx={{ flex: 1, overflow: 'hidden', mr: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                <HistoryIcon sx={{ fontSize: 14, color: isTyping ? 'text.disabled' : 'text.secondary' }} />
                                <Typography 
                                  variant="body2" 
                                  fontWeight={500}
                                  noWrap
                                  sx={{ 
                                    color: isTyping ? 'text.disabled' : 
                                           (selectedChat === chat.id ? 'primary.main' : 'text.primary') 
                                  }}
                                >
                                  {chat.title}
                                </Typography>
                              </Box>
                              <Typography 
                                variant="caption" 
                                sx={{ 
                                  color: isTyping ? 'text.disabled' : 'text.secondary',
                                  display: 'block', 
                                  pl: 2 
                                }}
                                noWrap
                              >
                                {chat.preview || chat.lastMessage}
                              </Typography>
                              <Typography 
                                variant="caption" 
                                sx={{ 
                                  color: isTyping ? 'text.disabled' : 'text.secondary',
                                  display: 'block', 
                                  mt: 0.5, 
                                  pl: 2,
                                  fontSize: '0.7rem',
                                  fontWeight: 500
                                }}
                              >
                                {timeAgo(chat.timestamp)}
                              </Typography>
                            </Box>
                            <Tooltip title={isTyping ? "Stop generation first" : "Delete chat"}>
                              <span> {/* Wrap with span for disabled tooltip */}
                                <IconButton 
                                  size="small" 
                                  onClick={(e) => deleteChat(chat.id, e)}
                                  sx={{ 
                                    color: isTyping ? 'text.disabled' : 'text.secondary',
                                    '&:hover': { 
                                      color: isTyping ? 'text.disabled' : 'error.main' 
                                    }
                                  }}
                                  disabled={isTyping}
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
                          borderColor: isTyping ? 'grey.300' : 'error.main',
                          color: isTyping ? 'grey.500' : 'error.main',
                          '&:hover': {
                            borderColor: isTyping ? 'grey.300' : 'error.dark',
                            bgcolor: isTyping ? 'transparent' : 'rgba(244, 67, 54, 0.04)'
                          }
                        }}
                        onClick={clearAllChats}
                        disabled={isTyping}
                      >
                        Clear All Chats
                      </Button>
                    </Box>
                  </Box>
                )}

                {sortedChatHistory.length === 0 && (
                  <Box sx={{ textAlign: 'center', py: 4, px: 2, color: 'text.secondary' }}>
                    <HistoryIcon sx={{ fontSize: 48, opacity: 0.3, mb: 2 }} />
                    <Typography variant="body2">No conversations yet</Typography>
                    <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
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
                      bgcolor: isTyping ? 'grey.300' : 'primary.main',
                      color: 'white',
                      '&:hover': { 
                        bgcolor: isTyping ? 'grey.300' : 'primary.dark',
                        transform: isTyping ? 'none' : 'scale(1.1)'
                      },
                      transition: 'all 0.2s'
                    }}
                    disabled={isTyping}
                  >
                    <AddIcon />
                  </IconButton>
                </Tooltip>
                
                {/* Stop Generation Button in collapsed sidebar */}
                {isTyping && (
                  <Tooltip title="Stop Generation" placement="right">
                    <IconButton 
                      onClick={handleStopGeneration}
                      sx={{ 
                        bgcolor: '#ff9800',
                        color: 'white',
                        '&:hover': { 
                          bgcolor: '#f57c00',
                          transform: 'scale(1.1)'
                        },
                        transition: 'all 0.2s'
                      }}
                    >
                      <StopIcon />
                    </IconButton>
                  </Tooltip>
                )}
                
                <Divider sx={{ width: '70%', my: 1 }} />
                
                <Box sx={{ width: '100%' }}>
                  {sortedChatHistory.slice(0, 5).map((chat) => (
                    <Tooltip key={chat.id} title={chat.title} placement="right">
                      <span> {/* Wrap with span for disabled tooltip */}
                        <IconButton 
                          sx={{ 
                            mb: 1,
                            bgcolor: selectedChat === chat.id ? 'primary.50' : 'transparent',
                            border: selectedChat === chat.id ? '1px solid' : 'none',
                            borderColor: selectedChat === chat.id ? 'primary.100' : 'transparent',
                            width: 44,
                            height: 44,
                            '&:hover': { 
                              bgcolor: isTyping ? 'transparent' : 'grey.50',
                              transform: isTyping ? 'none' : 'scale(1.05)'
                            },
                            transition: 'all 0.2s',
                            opacity: isTyping ? 0.6 : 1
                          }}
                          onClick={() => loadChat(chat.id)}
                          disabled={isTyping}
                        >
                          <Typography 
                            variant="caption" 
                            fontWeight={600}
                            sx={{ 
                              color: selectedChat === chat.id ? 'primary.main' : 'text.secondary',
                              opacity: isTyping ? 0.6 : 1
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
        </Box>
      </Drawer>

      {/* Main Chat Area */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          bgcolor: '#f9fafb',
          ml: `${drawerWidth}px`,
          width: `calc(100% - ${drawerWidth}px)`,
          transition: 'margin-left 0.3s ease'
        }}
      >
        <Box sx={{ flex: 1, overflow: 'auto', display: 'flex', justifyContent: 'center', bgcolor: '#f9fafb' }}>
          <Box sx={{ width: '100%', maxWidth: '800px', height: '100%', display: 'flex', flexDirection: 'column', p: { xs: 1, sm: 2, md: 3 } }}>
            {/* Welcome message when no messages */}
            {messages.length === 0 && !isTyping && (
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', py: { xs: 4, sm: 6, md: 8 } }}>
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
                    boxShadow: '0 4px 20px rgba(25, 118, 210, 0.3)',
                    border: '2px solid #e5e7eb'
                  }}
                />
                <Typography variant={isMobile ? "h5" : "h4"} fontWeight={700} gutterBottom>
                  Welcome to Athena AI
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: 600, px: { xs: 2, sm: 0 } }}>
                  Your intelligent health companion. I'm here to provide accurate medical information, 
                  symptom analysis, and health guidance. Describe your symptoms or ask any health-related question.
                </Typography>
                
                {/* Responsive Quick Actions Grid */}
                <Box sx={{ width: '100%', mt: 4, px: { xs: 1, sm: 2 } }}>
                  <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2, textAlign: 'left' }}>
                    Common Symptoms:
                  </Typography>
                  <Grid container spacing={1.5}>
                    {quickActions.map((action, index) => (
                      <Grid item xs={6} sm={4} md={3} key={index}>
                        <Button
                          variant="outlined"
                          fullWidth
                          onClick={() => handleQuickAction(action.query)}
                          disabled={isTyping}
                          sx={{
                            py: { xs: 1, sm: 1.5 },
                            px: { xs: 1, sm: 2 },
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 500,
                            fontSize: { xs: '0.8rem', sm: '0.9rem' },
                            borderColor: '#e0e0e0',
                            color: 'text.primary',
                            backgroundColor: 'white',
                            '&:hover': {
                              borderColor: 'primary.main',
                              backgroundColor: 'primary.50',
                              transform: 'translateY(-2px)',
                              boxShadow: '0 4px 12px rgba(25, 118, 210, 0.15)'
                            },
                            transition: 'all 0.2s ease-in-out',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {action.label}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                  
                  {/* Additional quick actions for larger screens */}
                  {!isMobile && (
                    <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                      <Chip 
                        label="Headache" 
                        variant="outlined" 
                        onClick={() => handleQuickAction("I have a severe headache and feeling nauseous")}
                        sx={{ 
                          '&:hover': { 
                            bgcolor: 'primary.50', 
                            borderColor: 'primary.main' 
                          } 
                        }}
                      />
                      <Chip 
                        label="Fever & Chills" 
                        variant="outlined"
                        onClick={() => handleQuickAction("I have fever with chills and body aches")}
                        sx={{ 
                          '&:hover': { 
                            bgcolor: 'primary.50', 
                            borderColor: 'primary.main' 
                          } 
                        }}
                      />
                      <Chip 
                        label="Back Pain" 
                        variant="outlined"
                        onClick={() => handleQuickAction("I'm experiencing lower back pain that radiates to my legs")}
                        sx={{ 
                          '&:hover': { 
                            bgcolor: 'primary.50', 
                            borderColor: 'primary.main' 
                          } 
                        }}
                      />
                      <Chip 
                        label="Cough & Cold" 
                        variant="outlined"
                        onClick={() => handleQuickAction("I have a persistent cought")}
                        sx={{ 
                          '&:hover': { 
                            bgcolor: 'primary.50', 
                            borderColor: 'primary.main' 
                          } 
                        }}
                      />
                      <Chip 
                        label="Stomach Issues" 
                        variant="outlined"
                        onClick={() => handleQuickAction("I have stomach pain, bloating, and indigestion")}
                        sx={{ 
                          '&:hover': { 
                            bgcolor: 'primary.50', 
                            borderColor: 'primary.main' 
                          } 
                        }}
                      />
                    </Box>
                  )}
                </Box>
              </Box>
            )}

            {/* Chat Messages */}
            {messages.map((m, i) => (
              <Box key={i} sx={{ display: "flex", alignItems: "flex-start", justifyContent: m.role === "user" ? "flex-end" : "flex-start", mb: 2.5, gap: 2 }}>
                {m.role === "bot" && (
                  <Avatar
                    src={AthenaLogo}
                    alt="Athena AI"
                    sx={{ 
                      width: 36, 
                      height: 36, 
                      display: { xs: 'none', sm: 'flex' }, 
                      boxShadow: '0 2px 8px rgba(46, 125, 50, 0.2)',
                      bgcolor: 'transparent',
                      p: 0.5
                    }}
                  />
                )}

                <Paper elevation={0} sx={{ p: 2.5, maxWidth: "87%", bgcolor: m.role === "user" ? "primary.main" : "white", color: m.role === "user" ? "white" : "text.primary", borderRadius: 3, border: m.role === "user" ? 'none' : '1px solid #e5e7eb', boxShadow: m.role === "user" ? '0 2px 12px rgba(25, 118, 210, 0.2)' : '0 1px 3px rgba(0, 0, 0, 0.05)', overflowWrap: "break-word", wordBreak: "break-word", minHeight: m.role === "bot" && m.text === "" ? "50px" : "auto", display: "flex", alignItems: m.role === "bot" && m.text === "" ? "center" : "flex-start" }}>
                  {m.role === "user" ? (
                    <Typography sx={{ whiteSpace: "pre-line", lineHeight: 1.7 }}>{m.text}</Typography>
                  ) : (
                    <>
                      {m.text === "" ? (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <CircularProgress size={20} />
                          <Typography variant="body2" color="text.secondary">Analyzing symptoms...</Typography>
                        </Box>
                      ) : (
                        <Typography component="div" sx={{ lineHeight: 1.7, fontFamily: 'inherit', '& strong': { fontWeight: 700, color: '#2c3e50', backgroundColor: 'rgba(52, 152, 219, 0.1)', padding: '2px 6px', borderRadius: '4px' }, '& h1, & h2, & h3, & h4': { color: '#2c3e50', marginTop: '20px', marginBottom: '12px', paddingBottom: '6px', borderBottom: '2px solid #ecf0f1' }, '& ul, & ol': { marginLeft: '24px', marginBottom: '16px' }, '& li': { marginBottom: '8px' }, '& code': { backgroundColor: '#f8f9fa', padding: '3px 8px', borderRadius: '4px', fontFamily: "'Courier New', monospace", color: '#e74c3c', fontSize: '0.9em' } }}>
                          <ReactMarkdown>{m.text}</ReactMarkdown>
                        </Typography>
                      )}
                    </>
                  )}
                </Paper>

                {m.role === "user" && (
                  <Avatar sx={{ bgcolor: "primary.main", width: 36, height: 36, display: { xs: 'none', sm: 'flex' } }}>
                    <PersonIcon />
                  </Avatar>
                )}
              </Box>
            ))}
            
            {/* Typing indicator with Stop button */}
            {isTyping && messages.length > 0 && (
              <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-start", mb: 2.5, gap: 2 }}>
                <Avatar
                  src={AthenaLogo}
                  alt="Athena AI"
                  sx={{ 
                    width: 36, 
                    height: 36, 
                    display: { xs: 'none', sm: 'flex' },
                    bgcolor: 'transparent',
                    p: 0.5
                  }}
                />
                <Paper elevation={0} sx={{ p: 2.5, maxWidth: "80%", bgcolor: "white", borderRadius: 3, border: '1px solid #e5e7eb', display: "flex", alignItems: "center", gap: 2, flexWrap: 'wrap' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                    <CircularProgress size={20} />
                    <Typography variant="body2" color="text.secondary">
                      Analyzing your symptoms...
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
                      '&:hover': {
                        borderColor: '#f57c00',
                        bgcolor: 'rgba(255, 152, 0, 0.04)'
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

        {/* Input Area with Stop button and quick actions for mobile */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          p: { xs: 1.5, sm: 2 }, 
          borderTop: '1px solid #e5e7eb', 
          bgcolor: 'white'
        }}>
          {/* Quick action chips for mobile when no messages */}
          {isMobile && messages.length === 0 && !isTyping && (
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
                  disabled={isTyping}
                  sx={{
                    flexShrink: 0,
                    bgcolor: '#f5f5f5',
                    '&:hover': { bgcolor: 'primary.50', color: 'primary.main' }
                  }}
                />
              ))}
            </Box>
          )}
          
          <Box sx={{ width: '100%', maxWidth: '800px', mx: 'auto', display: 'flex', gap: 1, alignItems: 'center' }}>
            <TextField 
              fullWidth 
              placeholder={isMobile ? "Type a message..." : "Describe your symptoms or ask a health question..."} 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()} 
              disabled={isTyping} 
              multiline 
              maxRows={3} 
              variant="outlined" 
              size={isMobile ? "small" : "medium"}
              sx={{ 
                '& .MuiOutlinedInput-root': { 
                  borderRadius: 2, 
                  bgcolor: '#f9fafb', 
                  '&:hover': { bgcolor: '#f3f4f6' }, 
                  '&.Mui-focused': { bgcolor: 'white', boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.1)' } 
                } 
              }} 
            />
            
            {isTyping ? (
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
                  '&:hover': { 
                    borderColor: '#f57c00',
                    bgcolor: 'rgba(255, 152, 0, 0.04)',
                    transform: 'translateY(-1px)'
                  },
                  transition: 'all 0.2s',
                  minWidth: isMobile ? '70px' : '100px'
                }}
              >
                Stop
              </Button>
            ) : (
              <IconButton 
                onClick={handleSend} 
                disabled={!input.trim()} 
                size={isMobile ? "small" : "medium"}
                sx={{ 
                  bgcolor: !input.trim() ? 'grey.300' : 'primary.main', 
                  color: 'white', 
                  height: isMobile ? '40px' : '56px',
                  width: isMobile ? '40px' : '56px',
                  '&:hover': { bgcolor: !input.trim() ? 'grey.300' : 'primary.dark' }, 
                  '&.Mui-disabled': { bgcolor: 'grey.300' } 
                }}
              >
                <SendIcon fontSize={isMobile ? "small" : "medium"} />
              </IconButton>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}