'use client'; // Use Client Components no App Directory

import { useState, useEffect } from 'react';

export default function PwaButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: any) => {
      // Previne o navegador de exibir o prompt automaticamente
      event.preventDefault();
      console.log('aaaaaaa')

      // Salva o evento para ser disparado mais tarde
      setDeferredPrompt(event);
      setIsInstallable(true); // Mostra o botão de instalação
    };

    // Escuta o evento 'beforeinstallprompt'
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Exibe o prompt de instalação

      deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Usuário aceitou instalar o PWA!')
        } else {
          console.log('Usuário recusou instalar o PWA.')
        }

        setDeferredPrompt(null) // Redefine após o uso
      })
    }
  };

  if (!isInstallable) return null; // Não exibe o botão se o PWA não for instalável

  return (
    <a
      onClick={handleInstallClick}
    >
      Instalar o App
    </a>
  );
}
