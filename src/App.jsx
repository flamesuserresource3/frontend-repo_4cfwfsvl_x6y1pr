import { useState } from 'react';
import HeaderNav from './components/HeaderNav';
import HeroSpline from './components/HeroSpline';
import ModuleTabs from './components/ModuleTabs';
import Footer from './components/Footer';

export default function App() {
  const [selectedTab, setSelectedTab] = useState('Valutazione');

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <HeaderNav onNavigate={(key) => setSelectedTab(key)} />
      <main>
        <HeroSpline onStartAssessment={() => setSelectedTab('Valutazione')} onTryBot={() => setSelectedTab('AI Coach')} />
        <ModuleTabs selected={selectedTab} onSelect={setSelectedTab} />
      </main>
      <Footer />
    </div>
  );
}
