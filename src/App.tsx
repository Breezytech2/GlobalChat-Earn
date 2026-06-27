/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { DeviceFrame } from './components/DeviceFrame';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DiscoveryFeed } from './components/DiscoveryFeed';
import { CountryExplorer } from './components/CountryExplorer';
import { SessionsView } from './components/SessionsView';
import { EarningsView } from './components/EarningsView';
import { TeacherDashboard } from './components/TeacherDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { TeacherDetailModal } from './components/TeacherDetailModal';
import { ChatModal } from './components/ChatModal';
import { LiveCallModal } from './components/LiveCallModal';
import { AuthModal, PremiumModal } from './components/Modals';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <>
      {activeTab === 'discovery' && <DiscoveryFeed />}
      {activeTab === 'explorer' && <CountryExplorer />}
      {activeTab === 'sessions' && <SessionsView />}
      {activeTab === 'earnings' && <EarningsView />}
      {activeTab === 'teacher_dashboard' && <TeacherDashboard />}
      {activeTab === 'admin' && <AdminDashboard />}
    </>
  );
};

const AppContent: React.FC = () => {
  return (
    <DeviceFrame>
      <div className="flex flex-col h-full w-full bg-[#050B18] text-white font-sans overflow-hidden">
        <Header />
        
        <main className="flex-1 flex overflow-hidden min-h-0">
          <MainContent />
        </main>
        
        <Footer />

        {/* Floating Modals */}
        <TeacherDetailModal />
        <ChatModal />
        <LiveCallModal />
        <AuthModal />
        <PremiumModal />
      </div>
    </DeviceFrame>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

