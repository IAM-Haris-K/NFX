import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import NetworkTraffic from './pages/NetworkTraffic';
import PacketAnalysis from './pages/PacketAnalysis';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/network" element={<NetworkTraffic />} />
          <Route path="/packets" element={<PacketAnalysis />} />
          {/* Other routes would be added here */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;