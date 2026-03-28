'use client';
import { useState, useEffect } from 'react';
import { X, Download } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('installPromptDismissed') === 'true') return;
    if (!window.matchMedia('(max-width: 768px)').matches) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShow(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      localStorage.setItem('installPromptDismissed', 'true');
    }
    setShow(false);
  };

  const handleDismiss = () => {
    localStorage.setItem('installPromptDismissed', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 shadow-lg flex items-center gap-3 lg:hidden">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#6366f1] shrink-0">
        <Download className="h-5 w-5 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#f5f5f5]">FitTrack installieren</p>
        <p className="text-xs text-[#737373]">Für schnellen Zugriff auf dem Homescreen</p>
      </div>
      <button
        onClick={handleInstall}
        className="shrink-0 bg-[#6366f1] text-white text-xs font-medium px-3 py-1.5 rounded-lg"
      >
        Installieren
      </button>
      <button
        onClick={handleDismiss}
        className="shrink-0 text-[#737373] hover:text-[#f5f5f5]"
        aria-label="Schließen"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
