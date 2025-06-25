'use client'

import { useState } from 'react'

import { redirect, useParams, useRouter, useSearchParams } from 'next/navigation'

import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'

import { CircularProgress } from '@mui/material'

import { Controller, useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { email, object, minLength, string, pipe, nonEmpty, boolean, custom, forward } from 'valibot'
import type { SubmitHandler } from 'react-hook-form'
import type { InferInput } from 'valibot'
import { signIn } from 'next-auth/react'

import InfoDialog from '@components/dialogs/info-dialog'
import type { getDictionary } from '@/utils/getDictionary'
import { useT } from '@core/helpers/t'
import CustomTextField from '@core/components/mui/TextField'
import { getLocalizedUrl } from '@/utils/i18n'
import type { Locale } from '@configs/i18n'
import { onSignUp } from '@features/authentication/use_cases/onSignUp'

const SignUpForm = ({ dictionary }: { dictionary: Awaited<ReturnType<typeof getDictionary>> }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false)
  const [isTermsOpened, setIsTermsOpened] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [errorServerMessage, setErrorServerMessage] = useState<string | null>(null)

  const router = useRouter()
  const t = useT(dictionary)
  const { lang: locale } = useParams()
  const searchParams = useSearchParams()

  // Password validation functions
  const hasUppercase = (password: string) => /[A-Z]/.test(password)
  const hasLowercase = (password: string) => /[a-z]/.test(password)
  const hasSpecialChar = (password: string) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)

  // Schema with all validations
  const schema = pipe(
    object({
      email: pipe(
        string(),
        minLength(1, t('validation.required')),
        email(t('validation.email.invalid'))
      ),
      password: pipe(
        string(),
        nonEmpty(t('validation.required')),
        minLength(8, t('validation.password.minLength')),
        // custom((password: string) => hasUppercase(password), t('validation.password.uppercase')),
        // custom((password: string) => hasLowercase(password), t('validation.password.lowercase')),
        // custom((password: string) => hasSpecialChar(password), t('validation.password.special'))
      ),
      confirmPassword: pipe(
        string(),
        nonEmpty(t('validation.required'))
      ),
      acceptTerms: pipe(
        boolean(),
        // custom((value: boolean) => value === true, t('validation.required'))
      )
    }),
    // forward(
    //   // custom(
    //   //   (data) => data.password === data.confirmPassword,
    //   //   t('validation.password.mismatch')
    //   // ),
    //   ['confirmPassword']
    // )
  )

  type FormData = InferInput<typeof schema>

  const handleClickShowPassword = () => setIsPasswordShown(prev => !prev)
  const handleClickShowConfirmPassword = () => setIsConfirmPasswordShown(prev => !prev)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: valibotResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false
    }
  })

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    console.log('submitting', data)
    setLoading(true)

    try{
      const res = await onSignUp({
        email: data.email,
        password: data.password,
        autoLogin: true
      })

      if (!res.isSuccess) {
        if (res?.message) {
          setErrorServerMessage(res?.message)
        }
      }

      redirect(`/${locale}/first-access`)
    } catch (error) {
      console.error(error)
    }
  finally {
      setLoading(false);
    }
  }

  const TermsDialog = ({open, setOpen}: {open: boolean, setOpen: (open: boolean) => void}) => {
    return (
      <InfoDialog
        title={t('terms.title')}
        subtitle={t('terms.subtitle')}
        message={"Criar arquivos com os termos para cada lingua disponivel e exibir seus conteudos aqui!"}
        open={open}
        setOpen={setOpen}
      />
    )
  }

  return (
    <form
      noValidate
      autoComplete='off'
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-5'
    >
      <Controller
        name='email'
        control={control}
        render={({ field }) => (
          <CustomTextField
            {...field}
            autoFocus
            fullWidth
            type='email'
            label={t('fields.email.label', true)}
            placeholder={t('fields.email.placeholder')}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position='start'>
                    <i className='tabler-mail' />
                  </InputAdornment>
                )
              }
            }}
            {...(errors.email && {
              error: true,
              helperText: errors.email.message
            })}
          />
        )}
      />

      <Controller
        name='password'
        control={control}
        render={({ field }) => (
          <CustomTextField
            {...field}
            fullWidth
            label={t('fields.password.label', true)}
            placeholder={t('fields.password.placeholder')}
            id='signup-password'
            type={isPasswordShown ? 'text' : 'password'}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position='start'>
                    <i className='tabler-lock-password' />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton edge='end' onClick={handleClickShowPassword}>
                      <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                    </IconButton>
                  </InputAdornment>
                )
              }
            }}
            {...(errors.password && {
              error: true,
              helperText: errors.password.message
            })}
          />
        )}
      />

      <Controller
        name='confirmPassword'
        control={control}
        render={({ field }) => (
          <CustomTextField
            {...field}
            fullWidth
            label={t('fields.confirmPassword.label', true)}
            placeholder={t('fields.confirmPassword.placeholder')}
            id='signup-confirm-password'
            type={isConfirmPasswordShown ? 'text' : 'password'}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position='start'>
                    <i className='tabler-lock-password' />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton edge='end' onClick={handleClickShowConfirmPassword}>
                      <i className={isConfirmPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                    </IconButton>
                  </InputAdornment>
                )
              }
            }}
            {...(errors.confirmPassword && {
              error: true,
              helperText: errors.confirmPassword.message
            })}
          />
        )}
      />

      <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
        <Controller
          name='acceptTerms'
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox
                  {...field}
                  checked={field.value || false}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              }
              label={
                <div className='flex flex-row w-full gap-2 items-center'>
                  <span>{t('terms.labelPrefix', true)}</span>
                  <Button
                    variant='text'
                    className={'hover:underline underline-offset-3 hover:bg-transparent px-0'}
                    onClick={() => setIsTermsOpened(true)}
                  >
                    {t('terms.label')}
                  </Button>
                </div>
              }
            />
          )}
        />
        {errors.acceptTerms && (
          <div className='w-full text-red-500 text-sm mt-1'>
            {errors.acceptTerms.message}
          </div>
        )}
        <div className='w-full flex justify-end'></div>
      </div>

      <Button fullWidth variant='contained' type='submit' disabled={loading}>
        {loading ? <CircularProgress size={12} color={'white'} /> : t('pages.signUp.submit', true)}
      </Button>

      <TermsDialog open={isTermsOpened} setOpen={setIsTermsOpened} />
    </form>
  )
}

export default SignUpForm
