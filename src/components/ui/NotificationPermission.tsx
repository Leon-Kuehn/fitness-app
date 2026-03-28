'use client';
import { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function NotificationPermission() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof Notification === 'undefined') return;
    if (Notification.permission === 'granted') return;
    if (localStorage.getItem('notificationsEnabled') === 'true') return;
    if (localStorage.getItem('notificationsDismissed') === 'true') return;
    setShow(true);
  }, []);

  const handleEnable = async () => {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      localStorage.setItem('notificationsEnabled', 'true');
    }
    setShow(false);
  };

  const handleDismiss = () => {
    localStorage.setItem('notificationsDismissed', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <Card className="border-[#6366f1]/30 bg-[#6366f1]/5">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6366f1]/20 shrink-0">
            <Bell className="h-4 w-4 text-[#6366f1]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#f5f5f5]">Benachrichtigungen aktivieren</p>
            <p className="text-xs text-[#737373] mt-0.5">Erhalte Erinnerungen für dein Training und tägliche Ziele</p>
            <div className="flex gap-2 mt-3">
              <Button size="sm" onClick={handleEnable} className="text-xs h-7">
                Aktivieren
              </Button>
              <Button size="sm" variant="ghost" onClick={handleDismiss} className="text-xs h-7 text-[#737373]">
                Später
              </Button>
            </div>
          </div>
          <button onClick={handleDismiss} className="text-[#737373] hover:text-[#f5f5f5] shrink-0" aria-label="Schließen">
            <X className="h-4 w-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
