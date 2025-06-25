// Type Imports
import ThemeProvider from '@components/theme'
import { SettingsProvider } from '@core/contexts/settingsContext'

import type { ChildrenType } from '@core/types'
import type { Locale } from '@configs/i18n';
import { i18n } from '@configs/i18n'

// HOC Imports
import GuestOnlyRoute from '@/hocs/GuestOnlyRoute'
import { getMode, getSettingsFromCookie, getSystemMode } from '@core/utils/serverHelpers'

const Layout = async (props: ChildrenType & { params: Promise<{ lang: Locale }> }) => {
  const params = await props.params;

  const { children } = props

  const direction = i18n.langDirection[params.lang]
  const systemMode = await getSystemMode()

  const mode = await getMode()
  const settingsCookie = await getSettingsFromCookie()

  return <GuestOnlyRoute lang={params.lang}>
    <SettingsProvider settingsCookie={settingsCookie} mode={mode}>
      <ThemeProvider direction={direction} systemMode={systemMode}>
        {children}
      </ThemeProvider>
    </SettingsProvider>
  </GuestOnlyRoute>
}

export default Layout
