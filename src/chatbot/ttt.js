import Avatar from "@mui/material/Avatar";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
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
  ListItemIcon,
  ListItemText,
  Divider,
  Toolbar,
  AppBar,
  Tooltip,
  Chip,
  Badge,
  Collapse
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HistoryIcon from "@mui/icons-material/History";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { chatbotReply } from "../chatbot/engine";
import { typeWriter } from "../utils/typeWriter";
import ReactMarkdown from "react-markdown";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chatHistory, setChatHistory] = useState([
    { id: 1, title: "Headache Consultation", date: "Today", preview: "I have a severe headache..." },
    { id: 2, title: "Back Pain", date: "Yesterday", preview: "Lower back pain for 3 days..." },
    { id: 3, title: "Fever Symptoms", date: "Jan 15", preview: "Fever and cough..." },
  ]);
  const [selectedChat, setSelectedChat] = useState(null);
  const bottomRef = useRef(null);

  const drawerWidth = sidebarOpen ? 280 : 60;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userText = input;
    setInput("");

    // Add user message
    setMessages(prev => [...prev, { role: "user", text: userText }]);
    
    // Set typing indicator
    setIsTyping(true);

    // Get bot reply
    const { reply } = chatbotReply(userText);

    // Add empty bot message placeholder
    setMessages(prev => [...prev, { role: "bot", text: "" }]);

    // Typewriter effect for bot reply
    typeWriter(reply, 12, (partial) => {
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1].text = partial;
        return updated;
      });
    }, () => {
      // Callback when typing is complete
      setIsTyping(false);
      
      // Save to chat history if it's a new conversation
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
            borderRight: '1px solid #e5e7eb',
            bgcolor: '#ffffff',
            transition: 'width 0.3s ease',
          },
        }}
      >
        <Toolbar sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          minHeight: '64px !important',
          borderBottom: '1px solid #e5e7eb'
        }}>
          {sidebarOpen ? (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <SmartToyIcon sx={{ color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Athena AI
                </Typography>
              </Box>
              <IconButton onClick={() => setSidebarOpen(false)} size="small">
                <CloseIcon fontSize="small" />
              </IconButton>
            </>
          ) : (
            <IconButton onClick={() => setSidebarOpen(true)}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>

        <Box sx={{ 
          overflow: 'auto', 
          flexGrow: 1,
          p: sidebarOpen ? 2 : 1 
        }}>
          {sidebarOpen ? (
            <>
              {/* New Chat Button */}
              <Paper 
                sx={{ 
                  mb: 2, 
                  p: 2, 
                  bgcolor: 'primary.main', 
                  color: 'white',
                  borderRadius: 2,
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'primary.dark' }
                }}
                onClick={startNewChat}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AddIcon />
                  <Typography variant="body1" fontWeight={500}>
                    New Chat
                  </Typography>
                </Box>
              </Paper>

              {/* Chat History */}
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  color: 'text.secondary', 
                  mb: 1, 
                  px: 1,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontSize: '0.75rem'
                }}
              >
                Recent Chats
              </Typography>
              
              <List dense sx={{ p: 0 }}>
                {chatHistory.map((chat) => (
                  <ListItem 
                    key={chat.id} 
                    disablePadding
                    sx={{ 
                      mb: 1,
                      borderRadius: 2,
                      bgcolor: selectedChat === chat.id ? 'action.selected' : 'transparent',
                      '&:hover': { bgcolor: 'action.hover' }
                    }}
                  >
                    <ListItemButton 
                      onClick={() => loadChat(chat.id)}
                      sx={{ 
                        borderRadius: 2,
                        py: 1.5,
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Box sx={{ flex: 1, overflow: 'hidden' }}>
                        <Typography 
                          variant="body2" 
                          fontWeight={500}
                          noWrap
                        >
                          {chat.title}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          color="text.secondary"
                          noWrap
                        >
                          {chat.preview}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          color="text.secondary"
                          sx={{ display: 'block', mt: 0.5 }}
                        >
                          {chat.date}
                        </Typography>
                      </Box>
                      <IconButton 
                        size="small" 
                        onClick={(e) => deleteChat(chat.id, e)}
                        sx={{ ml: 1 }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>

              {chatHistory.length > 0 && (
                <Box sx={{ mt: 2, px: 1 }}>
                  <Chip 
                    label="Clear All" 
                    onClick={clearAllChats}
                    color="error"
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                  />
                </Box>
              )}
            </>
          ) : (
            // Collapsed sidebar
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <Tooltip title="New Chat">
                <IconButton onClick={startNewChat} sx={{ mt: 2 }}>
                  <AddIcon />
                </IconButton>
              </Tooltip>
              <Divider sx={{ width: '80%' }} />
              {chatHistory.slice(0, 3).map((chat, index) => (
                <Tooltip key={chat.id} title={chat.title} placement="right">
                  <Avatar 
                    sx={{ 
                      bgcolor: selectedChat === chat.id ? 'primary.main' : 'grey.300',
                      cursor: 'pointer',
                      width: 40,
                      height: 40
                    }}
                    onClick={() => loadChat(chat.id)}
                  >
                    {index + 1}
                  </Avatar>
                </Tooltip>
              ))}
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
          bgcolor: '#f9fafb',
          ml: `${drawerWidth}px`,
          width: `calc(100% - ${drawerWidth}px)`,
          transition: 'margin-left 0.3s ease'
        }}
      >
        {/* Header */}
        <AppBar 
          position="static" 
          elevation={0}
          sx={{ 
            bgcolor: 'white', 
            borderBottom: '1px solid #e5e7eb',
            height: 64
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between', px: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {!sidebarOpen && (
                <IconButton onClick={() => setSidebarOpen(true)}>
                  <MenuIcon />
                </IconButton>
              )}
              <Typography variant="h6" fontWeight={600} color="text.primary">
                {selectedChat ? chatHistory.find(c => c.id === selectedChat)?.title : "Health Assistant"}
              </Typography>
              {selectedChat && (
                <Chip 
                  label="Active Chat" 
                  size="small" 
                  color="primary" 
                  variant="outlined"
                />
              )}
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar sx={{ bgcolor: 'success.main', width: 32, height: 32 }}>
                <HealthAndSafetyIcon fontSize="small" />
              </Avatar>
              <Typography variant="body2" color="text.secondary">
                Medical AI Assistant
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Chat Messages Container - Centered */}
        <Box 
          sx={{ 
            flex: 1, 
            overflow: 'auto', 
            display: 'flex',
            justifyContent: 'center',
            bgcolor: '#f9fafb'
          }}
        >
          <Box 
            sx={{ 
              width: '100%',
              maxWidth: '800px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              p: { xs: 1, sm: 2, md: 3 }
            }}
          >
            {/* Welcome message when no messages */}
            {messages.length === 0 && !isTyping && (
              <Box 
                sx={{ 
                  flex: 1, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  textAlign: 'center',
                  py: 8
                }}
              >
                <Avatar 
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    bgcolor: 'success.main',
                    mb: 3
                  }}
                >
                  <HealthAndSafetyIcon sx={{ fontSize: 40 }} />
                </Avatar>
                <Typography variant="h4" fontWeight={600} gutterBottom>
                  Welcome to Athena AI
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: 600 }}>
                  I'm here to provide medical information and guidance. Describe your symptoms, 
                  ask health questions, or get information about medical conditions.
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', mt: 3 }}>
                  <Chip label="Headache" variant="outlined" />
                  <Chip label="Fever" variant="outlined" />
                  <Chip label="Back Pain" variant="outlined" />
                  <Chip label="Cough" variant="outlined" />
                  <Chip label="Stomach Pain" variant="outlined" />
                  <Chip label="Skin Rash" variant="outlined" />
                </Box>
              </Box>
            )}

            {/* Chat Messages */}
            {messages.map((m, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                  mb: 2.5,
                  gap: 2
                }}
              >
                {m.role === "bot" && (
                  <Avatar sx={{ 
                    bgcolor: "success.main", 
                    width: 36, 
                    height: 36,
                    display: { xs: 'none', sm: 'flex' }
                  }}>
                    <HealthAndSafetyIcon />
                  </Avatar>
                )}

                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    maxWidth: "80%",
                    bgcolor: m.role === "user" ? "primary.main" : "white",
                    color: m.role === "user" ? "white" : "text.primary",
                    borderRadius: 3,
                    border: m.role === "user" ? 'none' : '1px solid #e5e7eb',
                    boxShadow: m.role === "user" ? '0 2px 8px rgba(25, 118, 210, 0.2)' : '0 1px 3px rgba(0, 0, 0, 0.05)',
                    overflowWrap: "break-word",
                    wordBreak: "break-word",
                    minHeight: m.role === "bot" && m.text === "" ? "50px" : "auto",
                    display: "flex",
                    alignItems: m.role === "bot" && m.text === "" ? "center" : "flex-start"
                  }}
                >
                  {m.role === "user" ? (
                    <Typography sx={{ whiteSpace: "pre-line", lineHeight: 1.7 }}>
                      {m.text}
                    </Typography>
                  ) : (
                    <>
                      {m.text === "" ? (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <CircularProgress size={20} />
                          <Typography variant="body2" color="text.secondary">
                            Analyzing symptoms...
                          </Typography>
                        </Box>
                      ) : (
                        <Typography 
                          component="div"
                          sx={{ 
                            lineHeight: 1.7,
                            fontFamily: 'inherit',
                            '& strong': {
                              fontWeight: 700,
                              color: '#2c3e50',
                              backgroundColor: 'rgba(52, 152, 219, 0.1)',
                              padding: '2px 6px',
                              borderRadius: '4px',
                            },
                            '& h1, & h2, & h3, & h4': {
                              color: '#2c3e50',
                              marginTop: '20px',
                              marginBottom: '12px',
                              paddingBottom: '6px',
                              borderBottom: '2px solid #ecf0f1',
                            },
                            '& ul, & ol': {
                              marginLeft: '24px',
                              marginBottom: '16px',
                            },
                            '& li': {
                              marginBottom: '8px',
                            },
                            '& code': {
                              backgroundColor: '#f8f9fa',
                              padding: '3px 8px',
                              borderRadius: '4px',
                              fontFamily: "'Courier New', monospace",
                              color: '#e74c3c',
                              fontSize: '0.9em',
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
                  <Avatar sx={{ 
                    bgcolor: "primary.main", 
                    width: 36, 
                    height: 36,
                    display: { xs: 'none', sm: 'flex' }
                  }}>
                    <PersonIcon />
                  </Avatar>
                )}
              </Box>
            ))}
            
            {/* Typing indicator */}
            {isTyping && messages.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  mb: 2.5,
                  gap: 2
                }}
              >
                <Avatar sx={{ 
                  bgcolor: "success.main", 
                  width: 36, 
                  height: 36,
                  display: { xs: 'none', sm: 'flex' }
                }}>
                  <HealthAndSafetyIcon />
                </Avatar>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    maxWidth: "80%",
                    bgcolor: "white",
                    borderRadius: 3,
                    border: '1px solid #e5e7eb',
                    display: "flex",
                    alignItems: "center",
                    gap: 2
                  }}
                >
                  <CircularProgress size={20} />
                  <Typography variant="body2" color="text.secondary">
                    Medical AI is thinking...
                  </Typography>
                </Paper>
              </Box>
            )}
            
            <div ref={bottomRef} />
          </Box>
        </Box>

        {/* Input Area - Centered */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            p: 2,
            borderTop: '1px solid #e5e7eb',
            bgcolor: 'white'
          }}
        >
          <Box 
            sx={{ 
              width: '100%',
              maxWidth: '800px',
              display: 'flex',
              gap: 1
            }}
          >
            <TextField
              fullWidth
              placeholder="Describe your health concern..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
              disabled={isTyping}
              multiline
              maxRows={3}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: '#f9fafb',
                  '&:hover': {
                    bgcolor: '#f3f4f6',
                  }
                }
              }}
            />
            <IconButton 
              onClick={handleSend} 
              disabled={isTyping || !input.trim()}
              sx={{ 
                bgcolor: 'primary.main', 
                color: 'white',
                '&:hover': { bgcolor: 'primary.dark' },
                '&.Mui-disabled': { bgcolor: 'grey.300' }
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}