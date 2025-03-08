import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import AIAssessmentQuiz from './AIAssessmentQuiz';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/assessment" element={<AIAssessmentQuiz />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;