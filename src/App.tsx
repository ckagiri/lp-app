import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppFrame />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
