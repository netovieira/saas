// Next Imports
import type { Metadata } from 'next'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'
import SignUpView from '@features/authentication/presentation/views/SignUpView'
import { getDictionary } from '@/utils/getDictionary'
import type { Locale } from '@configs/i18n'

export const metadata: Metadata = {
  title: 'Register',
  description: 'Register to your account'
}

const RegisterPage = async (props: { params: Promise<{ lang: Locale }> }) => {
  // Vars
  const mode = await getServerMode()
  const params = await props.params;
  const dictionary = await getDictionary(params.lang)

  return <SignUpView lang={params.lang} dictionary={dictionary} mode={mode} />
}

export default RegisterPage
