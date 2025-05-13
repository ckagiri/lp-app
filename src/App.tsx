import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="/admin/*" element={<AppFrame />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
