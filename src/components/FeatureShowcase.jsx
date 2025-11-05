import { Camera, Activity, Database, ClipboardCheck, Users, Lock, Calendar, Award, MessageSquare } from 'lucide-react';

const features = [
  {
    icon: Camera,
    title: 'Valutazione posturale con cam',
    desc: 'Pose estimation 2D, misure automatiche, controllo qualità e report PDF.',
    anchor: 'valutazione',
  },
  {
    icon: Database,
    title: 'Banca dati esercizi',
    desc: 'Catalogo ricco con foto/video, cue respiratori, livelli e controindicazioni.',
    anchor: 'esercizi',
  },
  {
    icon: MessageSquare,
    title: 'AI Coach e triage',
    desc: 'Chatbot per anamnesi, promemoria di aderenza e inoltro a clinico quando necessario.',
    anchor: 'aicoach',
  },
  {
    icon: Lock,
    title: 'Sicurezza & compliance',
    desc: 'Consenso informato digitale, audit trail, crittografia at-rest e in-transit.',
    anchor: 'sicurezza',
  },
  {
    icon: Users,
    title: 'Ruoli e dashboard',
    desc: 'Ospite, Paziente, Clinico e Admin con permessi e viste dedicate.',
  },
  {
    icon: ClipboardCheck,
    title: 'Screening multidisciplinare',
    desc: 'Nutrizione, ergonomia ufficio, area psicologica e test motori di base.',
  },
  {
    icon: Activity,
    title: 'Tracking e progressi',
    desc: 'Programmi personalizzati, calendario, confronto pre/post e trend.',
  },
  {
    icon: Award,
    title: 'Engagement efficace',
    desc: 'Badge e progress bar per migliorare la compliance nel tempo.',
  },
  {
    icon: Calendar,
    title: 'Teleconsulto e follow-up',
    desc: 'Pianificazione visite, note cliniche e messaggistica protetta.',
  },
];

export default function FeatureShowcase() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">Tutto ciò che serve a cliniche e professionisti</h2>
          <p className="mt-2 text-slate-600">Dalla valutazione al delivery degli esercizi, in sicurezza e con esperienza medico-professionale.</p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc, anchor }) => (
            <a key={title} href={anchor ? `#${anchor}` : undefined} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-slate-900 text-white p-3">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-slate-900/90">{title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{desc}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
