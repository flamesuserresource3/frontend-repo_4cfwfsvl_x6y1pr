import { useState } from 'react';
import { Menu, X, User, Shield, Settings, Camera, Bot, Dumbbell } from 'lucide-react';

export default function HeaderNav({ onNavigate }) {
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: 'Valutazione', key: 'Valutazione', icon: Camera },
    { label: 'Esercizi', key: 'Esercizi', icon: Dumbbell },
    { label: 'AI Coach', key: 'AI Coach', icon: Bot },
    { label: 'Sicurezza', key: 'Sicurezza', icon: Shield },
  ];

  const handleNav = (key) => {
    onNavigate?.(key);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 border-b border-slate-200/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <button onClick={() => handleNav('Valutazione')} className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-500 text-white font-bold">
              PA
            </div>
            <span className="font-semibold text-slate-800">PostureAI</span>
          </button>

          <nav className="hidden md:flex items-center gap-3">
            {navItems.map((n) => (
              <button key={n.label} onClick={() => handleNav(n.key)} className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors px-3 py-2 rounded-md">
                <n.icon className="h-4 w-4" /> {n.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a href="#login" className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
              <User className="h-4 w-4" /> Accedi
            </a>
            <a href="#admin" className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-indigo-600 to-sky-600 px-3.5 py-2 text-sm font-medium text-white shadow hover:opacity-95">
              <Shield className="h-4 w-4" /> Area Clinica
            </a>
            <button className="ml-1 text-slate-500 hover:text-slate-700" aria-label="Impostazioni">
              <Settings className="h-5 w-5" />
            </button>
          </div>

          <button className="inline-flex md:hidden items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-slate-200 py-4">
            <nav className="flex flex-col gap-2">
              {navItems.map((n) => (
                <button key={n.label} onClick={() => handleNav(n.key)} className="inline-flex items-center gap-2 text-slate-700 px-2 py-2">
                  <n.icon className="h-4 w-4" /> {n.label}
                </button>
              ))}
            </nav>
            <div className="mt-4 flex items-center gap-3">
              <a href="#login" className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700">
                <User className="h-4 w-4" /> Accedi
              </a>
              <a href="#admin" className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-indigo-600 to-sky-600 px-3.5 py-2 text-sm font-medium text-white shadow">
                <Shield className="h-4 w-4" /> Area Clinica
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
