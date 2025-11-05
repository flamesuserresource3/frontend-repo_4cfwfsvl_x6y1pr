export default function Footer() {
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
