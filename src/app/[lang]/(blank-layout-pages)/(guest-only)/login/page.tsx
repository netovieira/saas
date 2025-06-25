// Next Imports
import type { Metadata } from 'next'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'
import type { Locale } from '@configs/i18n'
import SignInView from '@features/authentication/presentation/views/SignInView'
import { getDictionary } from '@/utils/getDictionary'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account'
}

const LoginPage = async (props: { params: Promise<{ lang: Locale }> }) => {
  // Vars
  const mode = await getServerMode()
  const params = await props.params;
  const dictionary = await getDictionary(params.lang)

  return <SignInView lang={params.lang} dictionary={dictionary} mode={mode} />
}

export default LoginPage
