import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import DashboardLayout from './components/Layout/DashboardLayout';
import Overview from './pages/Dashboard/Overview';
import Subscription from './pages/Dashboard/Subscription';
import Reservations from './pages/Dashboard/FrontOffice/Reservations';
import Billing from './pages/Dashboard/FrontOffice/Billing';
import Inventory from './pages/Dashboard/Store/Inventory';
import ChannelManager from './pages/Dashboard/ChannelManager';
import KitchenPOS from './pages/Dashboard/KitchenPOS';
import GuestManagement from './pages/Dashboard/FrontOffice/GuestManagement';
import { 
  FrontOffice as FrontOfficePlaceholder, 
  Store, 
  ChannelManager as ChannelManagerPlaceholder, 
  KitchenPOS as KitchenPlaceholder 
} from './pages/Dashboard/Placeholders';
import StayOverview from './pages/Dashboard/FrontOffice/StayOverview';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      
      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<Overview />} />
        
        {/* Front Office Sub-routes */}
        <Route path="front-office">
          <Route path="user" element={<GuestManagement />} />
          <Route path="stay" element={<StayOverview />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="billing" element={<Billing />} />
        </Route>

        {/* Store Sub-routes */}
        <Route path="store">
          <Route path="under" element={<Store />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="moveable" element={<Store />} />
          <Route path="immovable" element={<Store />} />
        </Route>

        <Route path="subscription" element={<Subscription />} />
        <Route path="channel-manager" element={<ChannelManager />} />
        <Route path="kitchen-pos" element={<KitchenPOS />} />
      </Route>

      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
