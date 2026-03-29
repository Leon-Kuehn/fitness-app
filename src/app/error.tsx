'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] px-4">
      <div className="text-center space-y-4 max-w-md">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ef4444]/10">
            <AlertTriangle className="h-8 w-8 text-[#ef4444]" />
          </div>
        </div>
        <h1 className="text-xl font-bold text-[#f5f5f5]">Etwas ist schiefgelaufen</h1>
        <p className="text-sm text-[#737373]">
          Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut oder gehe zurück.
        </p>
        <div className="flex gap-3 justify-center">
          <Button onClick={reset} variant="outline" className="text-sm">
            Erneut versuchen
          </Button>
          <Link href="/plans">
            <Button className="text-sm">
              Zurück zu Plans
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
