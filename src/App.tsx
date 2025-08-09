import React from 'react';
import './App.css';
import { AppProvider } from './context/AppContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import RepoPage from './pages/RepoPage';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app-container">
          <header className="app-header">
            <h1>GitHub Project Viewer</h1>
          </header>
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/user/:username" element={<UserPage />} />
              <Route path="/user/:username/:repo" element={<RepoPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
