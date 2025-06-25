const CACHE_NAME = 'pwa-cache-v1';

const ASSETS_TO_CACHE = [
  '/',                // Página inicial
  '/manifest.json',   // Manifesto
  '/icon.ico',     // Ícones
  '/icon-1.png',      // Ícone menor
  '/icon-2.png',      // Ícone maior
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker instalado');

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Cache criado');

      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Ativação do Service Worker e limpeza de caches antigos
self.addEventListener('activate', (event) => {
  console.log('Service Worker ativado');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log(`Cache antigo removido: ${cacheName}`);

            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptação de requisições
self.addEventListener('fetch', (event) => {
  console.log('Interceptando requisição:', event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Retorna o cache se disponível, senão faz a requisição para a rede
      return response || fetch(event.request);
    })
  );
});
