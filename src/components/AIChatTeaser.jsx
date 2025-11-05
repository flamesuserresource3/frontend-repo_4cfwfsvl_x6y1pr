import { Bot, AlertCircle, Send } from 'lucide-react';
import { useState } from 'react';

export default function AIChatTeaser() {
  const [message, setMessage] = useState('');
  const exampleReply = 'Questo consiglio è informativo. Per una diagnosi personalizzata contatta il tuo professionista.';

  return (
    <section id="aicoach" className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200">
              <Bot className="h-3.5 w-3.5" /> AI Coach
            </span>
            <h3 className="mt-3 text-2xl sm:text-3xl font-semibold text-slate-900">Dialoga in modo semplice e sicuro</h3>
            <p className="mt-2 text-slate-600">Triage guidato, raccolta anamnesi e promemoria di aderenza. I casi rilevanti vengono inoltrati a un clinico.</p>
            <div className="mt-4 inline-flex items-start gap-2 text-xs text-slate-500">
              <AlertCircle className="h-4 w-4 mt-0.5" />
              <span>Questo consiglio è informativo. Per una diagnosi personalizzata contatta il tuo professionista.</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="h-64 overflow-y-auto rounded-lg border border-slate-200 p-3 bg-slate-50">
              <div className="mb-3 text-xs text-slate-500 text-center">Esempio di conversazione</div>
              <div className="mb-2 flex items-start gap-2">
                <div className="mt-1 rounded-md bg-slate-900 text-white p-2 text-xs">Ciao! Dove avverti più tensione oggi?</div>
              </div>
              {message && (
                <div className="mb-2 flex items-start gap-2 justify-end">
                  <div className="mt-1 rounded-md bg-white ring-1 ring-slate-200 p-2 text-xs max-w-[70%]">{message}</div>
                </div>
              )}
              <div className="mb-2 flex items-start gap-2">
                <div className="mt-1 rounded-md bg-white ring-1 ring-slate-200 p-2 text-xs max-w-[80%]">{exampleReply}</div>
              </div>
            </div>
            <form className="mt-3 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Scrivi un messaggio…"
                className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900"
              />
              <button className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-3 py-2 text-white text-sm hover:bg-slate-800">
                <Send className="h-4 w-4" />
                Invia
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
