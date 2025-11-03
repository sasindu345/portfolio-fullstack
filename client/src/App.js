import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './Pages/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
import Project from './Pages/Project/Project';
import Login from './Pages/Login/Login';
import { AuthProvider } from './context/AuthContext';
import Admin from './Pages/Admin/Admin';

import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import BubbleBackground from './components/BubbleBackground/BubbleBackground';
import './styles/theme.css';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            {/* Admin routes - NO Header/Footer */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />

            {/* Public routes - WITH Header/Footer */}
            <Route path="/*" element={
              <>
                <BubbleBackground />
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path='/contact' element={<Contact />} />
                  <Route path="/projects" element={<Project />} />
                </Routes>
                <Footer />
                <ThemeToggle />
              </>
            } />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;