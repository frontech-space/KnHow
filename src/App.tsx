import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <main className="container mx-auto px-4 py-8">
        <Routes></Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
