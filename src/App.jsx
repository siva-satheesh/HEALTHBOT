import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Chatbot from "./components/Chatbot";
import Home from "./components/Home";



function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
        
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chatbot />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
