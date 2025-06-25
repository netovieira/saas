// Next Imports
import type { Metadata } from 'next'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'
import FirstAccessOnboarding from '@features/authentication/presentation/components/FirstAccess'

export const metadata: Metadata = {
  title: 'Primeiro Acesso - Configuração Inicial',
  description: 'Complete sua configuração inicial para começar a usar a plataforma.'
}

const FirstAccessPage = async () => {
  // Vars
  const mode = await getServerMode()

  return <FirstAccessOnboarding mode={mode} />
}

export default FirstAccessPage
