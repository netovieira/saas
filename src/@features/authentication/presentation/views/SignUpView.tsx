'use client'

import Divider from '@mui/material/Divider'

import Button from '@mui/material/Button'

import { capitalize } from '@mui/material'

import { Th } from '@core/components/Th'

import Link from '@components/Link'
import Logo from '@components/layout/shared/Logo'


import themeConfig from '@configs/themeConfig'
import type { SystemMode } from '@core/types'
import type { getDictionary } from '@/utils/getDictionary'

import HeroSection from '@features/authentication/presentation/components/SIgnIn/HeroSection/HeroSection'
import type { Locale } from '@configs/i18n'
import { getLocalizedUrl } from '@/utils/i18n'
import SignUpForm from '@features/authentication/presentation/components/SignUp/SignUpForm'


const SignUpView = ({ lang, mode, dictionary }: { lang: Locale, mode: SystemMode, dictionary: Awaited<ReturnType<typeof getDictionary>> }) => {

  return (
    <div className='flex bs-full justify-center'>

      <div
        className='flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden'
      >
        <HeroSection mode={mode} />
      </div>

      <div className='flex justify-center h-screen items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        <Link className='absolute block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px]'>
          <Logo />
        </Link>
        <div className='flex flex-col justify-center gap-6 is-full sm:max-is-[400px] mbs-11 sm:mbs-14 md:mbs-0 h-screen'>

          <div className='flex flex-col gap-1'>
            <Th variant='h4'>{capitalize(dictionary.pages.signUp.title)} <b>{themeConfig.templateName}</b>! 👋🏻</Th>
            <Th>{capitalize(dictionary.pages.signUp.subtitle)}</Th>
          </div>
          <SignUpForm dictionary={dictionary} />
          <Divider>{dictionary.actions.or}</Divider>
          <Button href={getLocalizedUrl('/login', lang)}>{dictionary.actions.alreadyAccount}</Button>

        </div>
      </div>
    </div>
  )
}

export default SignUpView
