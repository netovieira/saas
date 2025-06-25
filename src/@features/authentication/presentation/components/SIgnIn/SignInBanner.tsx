'use client'

// Type Imports
import type { SystemMode } from '@core/types'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'

const SignInBanner = ({ mode }: { mode: SystemMode }) => {

  // Vars
  const darkIllustration = '/images/illustrations/auth/v2-signIn-dark.png'
  const lightIllustration = '/images/illustrations/auth/v2-signIn-light.png'
  const borderedDarkIllustration = '/images/illustrations/auth/v2-signIn-dark-border.png'
  const borderedLightIllustration = '/images/illustrations/auth/v2-signIn-light-border.png'

  const characterIllustration = useImageVariant(
    mode,
    lightIllustration,
    darkIllustration,
    borderedLightIllustration,
    borderedDarkIllustration
  )

  return (
    <img width="100%" height="100%" className="w-full h-full object-cover" src={characterIllustration} alt='character-illustration' />
  )
}

export default SignInBanner
