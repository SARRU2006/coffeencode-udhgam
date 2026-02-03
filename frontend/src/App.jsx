import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProfileInput from './pages/ProfileInput';
import Dashboard from './pages/Dashboard';
import SchemeDetail from './pages/SchemeDetail';
import Explorer from './pages/Explorer';
import FraudProtection from './pages/FraudProtection';
import PDFUploader from './pages/PDFUploader';
import { UserProvider } from './context/UserContext';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<ProfileInput />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/explorer" element={<Explorer />} />
            <Route path="/safety" element={<FraudProtection />} />
            <Route path="/upload-pdf" element={<PDFUploader />} />
            <Route path="/scheme/:id" element={<SchemeDetail />} />
          </Routes>
        </Router>
      </UserProvider>
    </LanguageProvider>
  );
}

export default App;
