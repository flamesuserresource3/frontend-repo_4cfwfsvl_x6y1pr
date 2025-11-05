import Spline from '@splinetool/react-spline';
import { ArrowRight, ShieldCheck, Camera, Bot } from 'lucide-react';

export default function HeroSpline({ onStartAssessment, onTryBot }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/Zn7XRxnnbSat5OJG/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-28 sm:pb-28">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              Clinicamente orientata — GDPR-ready
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              PostureAI: valutazione posturale e riabilitazione guidata
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Analisi posturale con fotocamera, banca esercizi e AI Coach. Design professionale, performance e accessibilità.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button onClick={onStartAssessment} className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-900 px-5 py-3 text-white shadow hover:bg-slate-800">
                <Camera className="h-4 w-4" /> Avvia screening con camera
              </button>
              <button onClick={onTryBot} className="inline-flex items-center justify-center gap-2 rounded-md bg-white/90 ring-1 ring-slate-200 px-5 py-3 text-slate-900 hover:bg-white">
                <Bot className="h-4 w-4" /> Prova AI Coach <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-white/95 to-transparent"></div>
    </section>
  );
}
