import { useEffect, useMemo, useRef, useState } from 'react';
import { Camera, Bot, Dumbbell, Shield, Filter, Send, Sparkles, PauseCircle, PlayCircle, RotateCcw } from 'lucide-react';

function Chip({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm ring-1 transition-colors ${
        active ? 'bg-slate-900 text-white ring-slate-900' : 'bg-white text-slate-700 ring-slate-200 hover:bg-slate-50'
      }`}
    >
      {children}
    </button>
  );
}

function SectionHeader({ icon: Icon, title, subtitle, action }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
      <div>
        <div className="inline-flex items-center gap-2 rounded-md bg-slate-900 text-white px-3 py-1 text-xs">
          <Icon className="h-3.5 w-3.5" />
          <span>{title}</span>
        </div>
        {subtitle && <p className="mt-2 text-slate-600 max-w-2xl">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

function PostureAssessment() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const canvasRef = useRef(null);
  const [running, setRunning] = useState(false);
  const [snapshots, setSnapshots] = useState([]);
  const [error, setError] = useState('');

  const startCamera = async () => {
    setError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        streamRef.current = stream;
        setRunning(true);
      }
    } catch (e) {
      setError('Impossibile accedere alla fotocamera. Controlla i permessi del browser.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
    }
    if (videoRef.current) videoRef.current.srcObject = null;
    setRunning(false);
  };

  useEffect(() => {
    return () => {
      // cleanup on unmount
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const takeSnapshot = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const data = canvas.toDataURL('image/png');
    setSnapshots((prev) => [{ url: data, ts: new Date().toISOString() }, ...prev]);
  };

  return (
    <div id="valutazione" className="rounded-2xl border border-slate-200 bg-white p-5">
      <SectionHeader
        icon={Camera}
        title="Valutazione posturale"
        subtitle="Avvia lo screening con la fotocamera. Acquisisci immagini di riferimento (fronte/profilo) e genera un pre-report locale."
        action={
          <div className="flex items-center gap-2">
            <Chip active={!running} onClick={!running ? startCamera : undefined}>
              <PlayCircle className="h-4 w-4" /> Avvia
            </Chip>
            <Chip active={running} onClick={running ? stopCamera : undefined}>
              <PauseCircle className="h-4 w-4" /> Stop
            </Chip>
            <Chip active={false} onClick={takeSnapshot}>
              <Sparkles className="h-4 w-4" /> Scatta
            </Chip>
          </div>
        }
      />

      {error && (
        <div className="mb-4 rounded-md bg-rose-50 text-rose-700 ring-1 ring-rose-200 px-3 py-2 text-sm">{error}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <div className="aspect-video w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            <video ref={videoRef} playsInline muted className="h-full w-full object-cover" />
          </div>
          <canvas ref={canvasRef} className="hidden" />
          <p className="mt-3 text-sm text-slate-600">Suggerimento: posizionati a 2m, pieno corpo nell'inquadratura, luce uniforme. Scatta fronte e profilo.</p>
        </div>
        <div className="lg:col-span-1">
          <h4 className="font-medium text-slate-900 mb-2">Acquisizioni</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3">
            {snapshots.length === 0 && (
              <div className="col-span-full text-sm text-slate-500">Nessuna immagine ancora. Premi Scatta per creare un frame.</div>
            )}
            {snapshots.map((s, i) => (
              <div key={i} className="group relative overflow-hidden rounded-lg border border-slate-200">
                <img src={s.url} alt={`snapshot-${i}`} className="h-28 w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-1 left-1 right-1 text-[10px] text-white/90">{new Date(s.ts).toLocaleTimeString()}</div>
              </div>
            ))}
          </div>
          {snapshots.length > 0 && (
            <button
              className="mt-3 inline-flex items-center gap-2 rounded-md bg-slate-900 text-white px-3 py-2 text-sm"
              onClick={() => setSnapshots([])}
            >
              <RotateCcw className="h-4 w-4" /> Resetta
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function ExerciseCatalog() {
  const all = useMemo(
    () => [
      { id: 1, name: 'Mobilità toracica', tags: ['mobilità', 'colonna'], level: 'base', duration: '6 min' },
      { id: 2, name: 'Stretching cat-camel', tags: ['stretching', 'colonna'], level: 'base', duration: '5 min' },
      { id: 3, name: 'Ponte glutei', tags: ['forza', 'anca'], level: 'intermedio', duration: '8 min' },
      { id: 4, name: 'Y-T-W scapole', tags: ['stabilità', 'spalle'], level: 'intermedio', duration: '7 min' },
      { id: 5, name: 'Respirazione diaframmatica', tags: ['respirazione', 'rilassamento'], level: 'base', duration: '4 min' },
    ],
    []
  );
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState('');

  const filtered = all.filter((e) => {
    const matchQuery = [e.name, ...e.tags].join(' ').toLowerCase().includes(query.toLowerCase());
    const matchLevel = !level || e.level === level;
    return matchQuery && matchLevel;
  });

  return (
    <div id="esercizi" className="rounded-2xl border border-slate-200 bg-white p-5">
      <SectionHeader
        icon={Dumbbell}
        title="Banca dati esercizi"
        subtitle="Sfoglia e filtra esercizi per tag e livello. Aggiungi facilmente ai programmi."
        action={
          <div className="flex items-center gap-2">
            <div className="relative">
              <Filter className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cerca esercizi..."
                className="pl-9 pr-3 py-2 rounded-md ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm"
              />
            </div>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="rounded-md ring-1 ring-slate-200 px-3 py-2 text-sm bg-white"
            >
              <option value="">Tutti i livelli</option>
              <option value="base">Base</option>
              <option value="intermedio">Intermedio</option>
            </select>
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((ex) => (
          <div key={ex.id} className="rounded-xl border border-slate-200 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium text-slate-900">{ex.name}</h4>
                <p className="text-xs text-slate-500 capitalize">{ex.level} • {ex.duration}</p>
              </div>
              <Dumbbell className="h-5 w-5 text-slate-400" />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {ex.tags.map((t) => (
                <span key={t} className="text-xs rounded-full bg-slate-100 text-slate-700 px-2 py-1">#{t}</span>
              ))}
            </div>
            <button className="mt-4 w-full rounded-md bg-slate-900 text-white py-2 text-sm">Aggiungi al programma</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AICoachBot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Ciao! Sono il tuo AI Coach posturale. Descrivimi il fastidio e ti guiderò in sicurezza.' },
  ]);

  const reply = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes('lomb') || lower.includes('schiena')) return 'Per dolore lombare lieve: mobilità cat-camel 2x10, ponte glutei 2x12, respirazione diaframmatica 3 min. Se dolore acuto o irradiato, contatta un clinico.';
    if (lower.includes('collo') || lower.includes('cerv')) return 'Per tensione cervicale: respirazione nasale 2 min, retrazioni cervicali 2x10, Y-T-W scapolari 2x8. Evita posizioni statiche prolungate.';
    return 'Ricevuto! Posso suggerire una routine base di mobilità e respirazione. Vuoi un programma da 10 minuti?';
  };

  const send = () => {
    if (!input.trim()) return;
    const user = { role: 'user', content: input.trim() };
    setMessages((m) => [...m, user]);
    setInput('');
    setTimeout(() => {
      setMessages((m) => [...m, { role: 'assistant', content: reply(user.content) }]);
    }, 400);
  };

  return (
    <div id="aicoach" className="rounded-2xl border border-slate-200 bg-white p-5">
      <SectionHeader
        icon={Bot}
        title="AI Coach"
        subtitle="Conversazione guidata per consigli posturali. Non sostituisce la valutazione clinica."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <div className="h-[320px] overflow-y-auto rounded-xl border border-slate-200 p-4 bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`mb-3 flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`${m.role === 'user' ? 'bg-slate-900 text-white' : 'bg-white text-slate-800'} max-w-[80%] rounded-lg px-3 py-2 text-sm ring-1 ring-slate-200`}>
                  {m.content}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Scrivi qui il tuo messaggio..."
              className="flex-1 rounded-md ring-1 ring-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
            <button onClick={send} className="inline-flex items-center gap-2 rounded-md bg-slate-900 text-white px-3 py-2 text-sm">
              <Send className="h-4 w-4" /> Invia
            </button>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-slate-200 p-4">
            <h4 className="font-medium text-slate-900">Suggerimenti rapidi</h4>
            <ul className="mt-2 text-sm list-disc list-inside text-slate-600 space-y-1">
              <li>Dolore lombare lieve? Scrivi "lombare" per una routine sicura.</li>
              <li>Tensione cervicale? Prova "collo" o "cervicale".</li>
              <li>Evita esercizi in caso di dolore acuto o perdita di forza.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function SecurityCompliance() {
  return (
    <div id="sicurezza" className="rounded-2xl border border-slate-200 bg-white p-5">
      <SectionHeader
        icon={Shield}
        title="Sicurezza e Compliance"
        subtitle="Crittografia, consenso informato, ruoli e audit trail per un utilizzo conforme al GDPR."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { t: 'GDPR & Privacy', d: 'Dati cifrati in transito e a riposo. Controlli granulari sui permessi.' },
          { t: 'Audit trail', d: 'Tutte le azioni critiche vengono registrate con timestamp e ruolo.' },
          { t: 'Ruoli', d: 'Ospite, Paziente, Clinico, Admin con policy e accessi dedicati.' },
        ].map((c) => (
          <div key={c.t} className="rounded-xl border border-slate-200 p-4 hover:shadow-sm">
            <h4 className="font-medium text-slate-900">{c.t}</h4>
            <p className="mt-1 text-sm text-slate-600">{c.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ModuleTabs({ selected, onSelect }) {
  const tabs = [
    { key: 'Valutazione', icon: Camera },
    { key: 'Esercizi', icon: Dumbbell },
    { key: 'AI Coach', icon: Bot },
    { key: 'Sicurezza', icon: Shield },
  ];

  return (
    <section className="py-10 sm:py-14" aria-label="Moduli principali">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <Chip key={t.key} active={selected === t.key} onClick={() => onSelect(t.key)}>
              <t.icon className="h-4 w-4" /> {t.key}
            </Chip>
          ))}
        </div>

        <div className="space-y-8">
          {selected === 'Valutazione' && <PostureAssessment />}
          {selected === 'Esercizi' && <ExerciseCatalog />}
          {selected === 'AI Coach' && <AICoachBot />}
          {selected === 'Sicurezza' && <SecurityCompliance />}
        </div>
      </div>
    </section>
  );
}
