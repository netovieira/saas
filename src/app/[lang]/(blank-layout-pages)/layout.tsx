// Type Imports
import type { ChildrenType } from '@core/types'
import type { Locale } from '@configs/i18n'

// Component Imports
import BlankLayout from '@layouts/BlankLayout'

// Util Imports
import { getSystemMode } from '@core/utils/serverHelpers'

type Props = ChildrenType & {
  params: Promise<{ lang: Locale }>
}

const Layout = async ({ children }: Props) => {
  // Vars
  const systemMode = await getSystemMode()

  return (
    <BlankLayout systemMode={systemMode}>{children}</BlankLayout>
  )
}

export default Layout
