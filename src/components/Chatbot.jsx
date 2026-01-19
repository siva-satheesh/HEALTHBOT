import Avatar from "@mui/material/Avatar";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import AthenaLogo from "../assets/athena.png";
import PersonIcon from "@mui/icons-material/Person";
import { useState, useRef, useEffect } from "react";
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
  Button
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HistoryIcon from "@mui/icons-material/History";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import HealingIcon from "@mui/icons-material/Healing";
import { chatbotReply } from "../chatbot/engine";
import { typeWriter } from "../utils/typeWriter";
import ReactMarkdown from "react-markdown";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const bottomRef = useRef(null);

  const drawerWidth = sidebarOpen ? 280 : 60;

  // LOGO SIZE CONFIGURATION - Customize these values
  const logoConfig = {
    // Sidebar logo sizes
    sidebar: {
      expanded: {
        width: 50,    // Adjust this value for expanded sidebar logo width
        height: 50,   // Adjust this value for expanded sidebar logo height
        borderRadius: '12px' // Adjust border radius
      },
      collapsed: {
        width: 40,    // Adjust this value for collapsed sidebar logo width
        height: 40,   // Adjust this value for collapsed sidebar logo height
        borderRadius: '10px'
      }
    },
    // Main area logo sizes (welcome screen)
    main: {
      welcome: {
        width: 150,   // Adjust this value for main welcome screen logo width
        height: 150,  // Adjust this value for main welcome screen logo height
        borderRadius: '25px' // Adjust border radius
      }
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userText = input;
    setInput("");

    setMessages(prev => [...prev, { role: "user", text: userText }]);
    setIsTyping(true);

    const { reply } = chatbotReply(userText);

    setMessages(prev => [...prev, { role: "bot", text: "" }]);

    typeWriter(reply, 12, (partial) => {
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1].text = partial;
        return updated;
      });
    }, () => {
      setIsTyping(false);
      
      if (selectedChat === null && messages.length === 0) {
        const newChat = {
          id: Date.now(),
          title: userText.substring(0, 30) + (userText.length > 30 ? "..." : ""),
          date: "Just now",
          preview: userText.substring(0, 50) + (userText.length > 50 ? "..." : ""),
          messages: [...messages, { role: "user", text: userText }, { role: "bot", text: reply }]
        };
        setChatHistory(prev => [newChat, ...prev]);
        setSelectedChat(newChat.id);
      }
    });
  };

  const startNewChat = () => {
    setMessages([]);
    setSelectedChat(null);
    setInput("");
  };

  const loadChat = (chatId) => {
    const chat = chatHistory.find(c => c.id === chatId);
    if (chat && chat.messages) {
      setMessages(chat.messages);
      setSelectedChat(chatId);
    }
  };

  const deleteChat = (chatId, e) => {
    e.stopPropagation();
    setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
    if (selectedChat === chatId) {
      setMessages([]);
      setSelectedChat(null);
    }
  };

  const clearAllChats = () => {
    setChatHistory([]);
    setMessages([]);
    setSelectedChat(null);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#f9fafb" }}>
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
                >
                  New Conversation
                </Button>

                {chatHistory.length > 0 && (
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
                        label={chatHistory.length}
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
                      {chatHistory.map((chat) => (
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
                          >
                            <Box sx={{ flex: 1, overflow: 'hidden', mr: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                <HistoryIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                                <Typography 
                                  variant="body2" 
                                  fontWeight={500}
                                  noWrap
                                  sx={{ color: selectedChat === chat.id ? 'primary.main' : 'text.primary' }}
                                >
                                  {chat.title}
                                </Typography>
                              </Box>
                              <Typography 
                                variant="caption" 
                                color="text.secondary"
                                noWrap
                                sx={{ display: 'block', pl: 2 }}
                              >
                                {chat.preview}
                              </Typography>
                              <Typography 
                                variant="caption" 
                                color="text.secondary"
                                sx={{ 
                                  display: 'block', 
                                  mt: 0.5, 
                                  pl: 2,
                                  fontSize: '0.7rem'
                                }}
                              >
                                {chat.date}
                              </Typography>
                            </Box>
                            <Tooltip title="Delete chat">
                              <IconButton 
                                size="small" 
                                onClick={(e) => deleteChat(chat.id, e)}
                                sx={{ 
                                  color: 'text.secondary',
                                  '&:hover': { color: 'error.main' }
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
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
                          fontWeight: 500
                        }}
                        onClick={clearAllChats}
                      >
                        Clear All Chats
                      </Button>
                    </Box>
                  </Box>
                )}

                {chatHistory.length === 0 && (
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
                      bgcolor: 'primary.main',
                      color: 'white',
                      '&:hover': { bgcolor: 'primary.dark' }
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Tooltip>
                
                <Divider sx={{ width: '70%', my: 1 }} />
                
                <Box sx={{ width: '100%' }}>
                  {chatHistory.slice(0, 5).map((chat) => (
                    <Tooltip key={chat.id} title={chat.title} placement="right">
                      <IconButton 
                        sx={{ 
                          mb: 1,
                          bgcolor: selectedChat === chat.id ? 'primary.50' : 'transparent',
                          border: selectedChat === chat.id ? '1px solid' : 'none',
                          borderColor: selectedChat === chat.id ? 'primary.100' : 'transparent',
                          width: 44,
                          height: 44,
                          '&:hover': { bgcolor: 'grey.50' }
                        }}
                        onClick={() => loadChat(chat.id)}
                      >
                        <Typography 
                          variant="caption" 
                          fontWeight={600}
                          sx={{ 
                            color: selectedChat === chat.id ? 'primary.main' : 'text.secondary'
                          }}
                        >
                          {chat.title.charAt(0)}
                        </Typography>
                      </IconButton>
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
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', py: 8 }}>
                {/* Main Welcome Screen Logo - Customizable Size */}
                <Box
                  component="img"
                  src={AthenaLogo}
                  alt="Athena AI"
                  sx={{
                    width: logoConfig.main.welcome.width,
                    height: logoConfig.main.welcome.height,
                    borderRadius: logoConfig.main.welcome.borderRadius,
                    objectFit: 'contain',
                    backgroundColor: 'transparent',
                    mb: 3,
                    boxShadow: '0 4px 20px rgba(25, 118, 210, 0.3)',
                    border: '2px solid #e5e7eb'
                  }}
                />
                <Typography variant="h4" fontWeight={700} gutterBottom>
                  Welcome to Athena AI
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: 600 }}>
                  Your intelligent health companion. I'm here to provide accurate medical information, 
                  symptom analysis, and health guidance. Describe your symptoms or ask any health-related question.
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', mt: 3 }}>
                  <Chip label="Headache" variant="outlined" sx={{ fontWeight: 500 }} />
                  <Chip label="Fever & Chills" variant="outlined" sx={{ fontWeight: 500 }} />
                  <Chip label="Back Pain" variant="outlined" sx={{ fontWeight: 500 }} />
                  <Chip label="Cough & Cold" variant="outlined" sx={{ fontWeight: 500 }} />
                  <Chip label="Stomach Issues" variant="outlined" sx={{ fontWeight: 500 }} />
                  <Chip label="Skin Problems" variant="outlined" sx={{ fontWeight: 500 }} />
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
    <Paper elevation={0} sx={{ p: 2.5, maxWidth: "80%", bgcolor: "white", borderRadius: 3, border: '1px solid #e5e7eb', display: "flex", alignItems: "center", gap: 2 }}>
      <CircularProgress size={20} />
      <Typography variant="body2" color="text.secondary">Analyzing your symptoms...</Typography>
    </Paper>
  </Box>
)}
            
            <div ref={bottomRef} />
          </Box>
        </Box>

        {/* Input Area */}
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2, borderTop: '1px solid #e5e7eb', bgcolor: 'white' }}>
          <Box sx={{ width: '100%', maxWidth: '800px', display: 'flex', gap: 1 }}>
            <TextField fullWidth placeholder="Describe your symptoms or ask a health question..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()} disabled={isTyping} multiline maxRows={3} variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: '#f9fafb', '&:hover': { bgcolor: '#f3f4f6' }, '&.Mui-focused': { bgcolor: 'white', boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.1)' } } }} />
            <IconButton onClick={handleSend} disabled={isTyping || !input.trim()} sx={{ bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' }, '&.Mui-disabled': { bgcolor: 'grey.300' } }}>
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}