// Next Imports
import { headers } from 'next/headers';

// MUI Imports
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css';

import type { ChildrenType } from '@core/types';
import type { Locale } from '@configs/i18n';

// Component Imports

// HOC Imports
import TranslationWrapper from '@/hocs/TranslationWrapper';

// Config Imports
import { i18n } from '@configs/i18n';

// Util Imports
import { getSystemMode } from '@core/utils/serverHelpers';

// Style Imports
import '@/app/globals.css';

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css';
import PageLoaderWrapper from '@core/components/page-loader/PageLoaderWrapper'
import Providers from '@components/Providers'

export const metadata = {
  title: 'POWERP',
  description: 'POWERP - Dê poder à sua gestão com o POWERP.',
  manifest: '/manifest.json', // Adicionado para referência ao manifesto
};

// Função para registrar o Service Worker
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');

      console.log('Service Worker registrado com sucesso:', registration.scope);
    } catch (error) {
      console.error('Erro ao registrar o Service Worker:', error);
    }
  }
};

const RootLayout = async (props: ChildrenType & { params: Promise<{ lang: Locale }> }) => {
  const params = await props.params;

  const { children } = props;

  // Vars
  const headersList = await headers();
  const systemMode = await getSystemMode();
  const direction = i18n.langDirection[params.lang];

  // Registra o Service Worker no lado do cliente
  if (typeof window !== 'undefined') {
    registerServiceWorker();
  }

  return (
    <TranslationWrapper headersList={headersList} lang={params.lang}>
      <html id="__next" lang={params.lang} dir={direction} suppressHydrationWarning>
      <body className="flex is-full min-bs-full flex-auto flex-col">
      <InitColorSchemeScript attribute="data" defaultMode={systemMode} />
      <Providers direction={direction}>
        <PageLoaderWrapper />
        {children}
      </Providers>
      </body>
      </html>
    </TranslationWrapper>
  );
};

export default RootLayout;
