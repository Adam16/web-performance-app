/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { GlobalOverview } from './components/GlobalOverview';
import { BudgetEnforcer } from './components/BudgetEnforcer';
import { AssetBreakdown } from './components/AssetBreakdown';
import { TrendAnalysis } from './components/TrendAnalysis';
import { Screen } from './types';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('overview');

  const renderScreen = () => {
    switch (activeScreen) {
      case 'overview': return <GlobalOverview />;
      case 'budget': return <BudgetEnforcer />;
      case 'assets': return <AssetBreakdown />;
      case 'trends': return <TrendAnalysis />;
      default: return <GlobalOverview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background-light">
      <Sidebar activeScreen={activeScreen} onScreenChange={setActiveScreen} />
      
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {renderScreen()}
        </div>
      </main>
    </div>
  );
}
