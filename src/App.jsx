import HeaderNav from './components/HeaderNav';
import HeroSpline from './components/HeroSpline';
import FeatureShowcase from './components/FeatureShowcase';
import AIChatTeaser from './components/AIChatTeaser';

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} PostureAI — Piattaforma clinica per la postura.</p>
          <div className="flex items-center gap-4 text-sm text-slate-600">
            <a href="#" className="hover:text-slate-900">Informativa privacy</a>
            <a href="#" className="hover:text-slate-900">Consenso informato</a>
            <a href="#" className="hover:text-slate-900">Disclaimer medico</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <HeaderNav />
      <main>
        <HeroSpline />
        <section id="valutazione" className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="order-2 lg:order-1">
                <img
                  src="https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?q=80&w=1600&auto=format&fit=crop"
                  alt="Valutazione posturale"
                  className="w-full rounded-2xl border border-slate-200 shadow-sm"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-2xl sm:text-3xl font-semibold">Valutazione guidata e report chiari</h2>
                <p className="mt-2 text-slate-600">Onboarding semplice, controllo qualità di ambiente/abbigliamento e misure automatiche. Al termine ottieni un report con immagini e spiegazioni comprensibili.</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700 list-disc list-inside">
                  <li>Pose estimation 2D markerless</li>
                  <li>Inclinazioni, asimmetrie, ROM stimato</li>
                  <li>Confronto pre/post e trend progressivi</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <FeatureShowcase />
        <AIChatTeaser />
      </main>
      <Footer />
    </div>
  );
}
