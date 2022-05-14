import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { Auth } from './components/Auth';
import { Plant } from './components/Plant';
import { Profile } from './components/Profile';
import { Stats } from './components/Stats';
import { AUTH_ROOT, PLANTING_ROOT, PROFILE_ROOT, STATS_ROOT } from "./constants/roots"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index path={PLANTING_ROOT} element={<Plant />} />
          <Route path={AUTH_ROOT} element={<Auth />} />
          <Route path={PROFILE_ROOT} element={<Profile />} />
          <Route path={STATS_ROOT} element={<Stats />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
