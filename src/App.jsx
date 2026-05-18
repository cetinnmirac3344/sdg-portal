import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import GoalsList from './pages/GoalsList';
import StoriesList from './pages/StoriesList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="goals" element={<GoalsList />} />
          <Route path="stories" element={<StoriesList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
