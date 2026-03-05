import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./contexts/ThemeContext"; // Import ThemeProvider

import Chatbot from "./components/Chatbot";
import Home from "./components/Home";
import "./styles/theme.css"; // Import theme CSS
import About from "./components/About";

function App() {
  return (
    <ThemeProvider> {/* Wrap everything with ThemeProvider */}
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chatbot />} />
            <Route path="/about" element={<About/>} />
          </Routes>
        </AnimatePresence>
      </Router>
    </ThemeProvider>
  );
}

export default App;