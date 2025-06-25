'use client'

import { useState } from 'react'

import { useParams, useRouter, useSearchParams } from 'next/navigation'

import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'

import { signIn } from 'next-auth/react'

import { Controller, useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { email, object, minLength, string, pipe, nonEmpty } from 'valibot'
import type { SubmitHandler } from 'react-hook-form'
import type { InferInput } from 'valibot'

import Switch from '@mui/material/Switch'

import CustomTextField from '@core/components/mui/TextField'
import { useT } from '@core/helpers/t'
import type { getDictionary } from '@/utils/getDictionary'
import { getLocalizedUrl } from '@/utils/i18n'
import type { Locale } from '@/configs/i18n'
import { CircularProgress } from '@mui/material'

const SignInForm = ({ dictionary }: { dictionary: Awaited<ReturnType<typeof getDictionary>> }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [errorServerMessage, setErrorServerMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()
  const { lang: locale } = useParams()
  const searchParams = useSearchParams()
  const t = useT(dictionary)

  // Schema with translated messages
  const schema = object({
    email: pipe(
      string(),
      minLength(1, t('validation.required')),
      email(t('validation.email.invalid'))
    ),
    password: pipe(
      string(),
      nonEmpty(t('validation.required')),
      minLength(8, t('validation.password.minLength'))
    )
  })

  type FormData = InferInput<typeof schema>

  const handleClickShowPassword = () => setIsPasswordShown(prev => !prev)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: valibotResolver(schema),
  })

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    console.log('submitting', data)
    setLoading(true);

    try{
      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false
      })

      console.log('res', res)

      if (res && res.ok && res.error === null) {
        // Vars
        const redirectURL = searchParams.get('redirectTo') ?? '/'

        router.replace(getLocalizedUrl(redirectURL, locale as Locale))
      } else {
        if (res?.error) {
          setErrorServerMessage(res.error)
        }
      }
    } catch (error) {
      console.error(error)
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <form
      noValidate
      autoComplete='off'
      action={() => {}}
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-6'
    >
      <Controller
        name='email'
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <CustomTextField
            {...field}
            autoFocus
            fullWidth
            type='email'
            label={t('fields.email.label', true)}
            placeholder={t('fields.email.placeholder')}
            onChange={e => {
              field.onChange(e.target.value)
              errorServerMessage !== null && setErrorServerMessage(null)
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position='start'>
                    <i className='tabler-mail' />
                  </InputAdornment>
                )
              }
            }}
            {...((errors.email || errorServerMessage !== null) && {
              error: true,
              helperText: errors?.email?.message || errorServerMessage
            })}
          />
        )}
      />

      <Controller
        name='password'
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <CustomTextField
            {...field}
            fullWidth
            label={t('fields.password.label', true)}
            placeholder={t('fields.password.placeholder')}
            id='login-password'
            type={isPasswordShown ? 'text' : 'password'}
            onChange={e => {
              field.onChange(e.target.value)
              errorServerMessage !== null && setErrorServerMessage(null)
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position='start'>
                    <i className='tabler-lock-password' />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                      <i className={isPasswordShown ? 'tabler-eye' : 'tabler-eye-off'} />
                    </IconButton>
                  </InputAdornment>
                )
              }
            }}
            {...(errors.password && { error: true, helperText: errors.password.message })}
          />
        )}
      />

      <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
        <FormControlLabel control={<Switch name='rememberMe' />} label={t('pages.signIn.remember', true)} />
        <Button variant='text' color='secondary'>
          {t('pages.signIn.forgotPassword', true)}?
        </Button>
      </div>

      <Button fullWidth variant='contained' type='submit' disabled={loading}>
        {loading ? <CircularProgress size={22} color={'white'} /> : t('pages.signIn.submit', true)}
      </Button>
    </form>
  )
}

export default SignInForm
