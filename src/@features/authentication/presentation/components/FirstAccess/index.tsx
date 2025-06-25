'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Stepper from '@mui/material/Stepper'
import MuiStep from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import type { StepProps } from '@mui/material/Step'

// Third-party Imports
import classnames from 'classnames'

// Type Imports
import type { SystemMode } from '@core/types'
import type { Locale } from '@configs/i18n'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'
import DirectionalIcon from '@components/DirectionalIcon'
import Logo from '@components/layout/shared/Logo'
import StepperWrapper from '@core/styles/stepper'
import StepPersonalInfo from './FormSteps/StepPersonalInfo'
import StepAddressInfo from './FormSteps/StepAddressInfo'
import StepPlanSelection from './FormSteps/StepPlanSelection'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

// Use Cases Imports (você precisa descomentar e ajustar os paths)
// import { setName } from '@features/authentication/use_cases/setName'

// Styled Custom Components
const RegisterIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  maxBlockSize: 550,
  marginBlock: theme.spacing(12)
}))

const MaskImg = styled('img')({
  blockSize: 'auto',
  maxBlockSize: 250,
  inlineSize: '100%',
  position: 'absolute',
  insetBlockEnd: 0,
  zIndex: -1
})

// Vars
const steps = [
  {
    title: 'Seus dados',
    icon: 'tabler-user',
  },
  {
    title: 'Endereço',
    icon: 'tabler-map-pin',
  },
  {
    title: 'Plano',
    icon: 'tabler-credit-card',
  }
]

const Step = styled(MuiStep)<StepProps>(({ theme }) => ({
  paddingInline: theme.spacing(7),
  paddingBlock: theme.spacing(1),
  '& + i': {
    color: 'var(--mui-palette-text-secondary)'
  },
  '&:first-of-type': {
    paddingInlineStart: 0
  },
  '&:last-of-type': {
    paddingInlineEnd: 0
  },
  '& .MuiStepLabel-iconContainer': {
    display: 'none'
  },
  '&.Mui-completed .step-title, &.Mui-completed .step-subtitle': {
    color: 'var(--mui-palette-text-disabled)'
  },
  '&.Mui-completed + i': {
    color: 'var(--mui-palette-primary-main)'
  },
  [theme.breakpoints.down('md')]: {
    padding: 0,
    ':not(:last-of-type)': {
      marginBlockEnd: theme.spacing(6)
    }
  }
}))

const FirstAccessOnboarding = ({ mode }: { mode: SystemMode }) => {
  // States
  const [activeStep, setActiveStep] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [errorServerMessage, setErrorServerMessage] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    selectedPlan: 'free'
  })
  const [errors, setErrors] = useState<any>({})

  // Vars
  const darkImg = '/images/pages/auth-reg-multi-mask-dark.png'
  const lightImg = '/images/pages/auth-reg-multi-mask-light.png'

  // Hooks
  const { settings } = useSettings()
  const theme = useTheme()
  const { lang: locale } = useParams()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))
  const authBackground = useImageVariant(mode, lightImg, darkImg)

  // Validation
  const validateStep = (step: number) => {
    const newErrors: any = {}

    switch (step) {
      case 0:
        if (!formData.firstName.trim()) newErrors.firstName = 'Nome é obrigatório'
        if (!formData.lastName.trim()) newErrors.lastName = 'Sobrenome é obrigatório'
        break
      case 1:
        if (!formData.address.trim()) newErrors.address = 'Endereço é obrigatório'
        if (!formData.city.trim()) newErrors.city = 'Cidade é obrigatória'
        if (!formData.state) newErrors.state = 'Estado é obrigatório'
        if (!formData.zipCode.trim()) newErrors.zipCode = 'CEP é obrigatório'
        break
      case 2:
        if (!formData.selectedPlan) newErrors.selectedPlan = 'Selecione um plano'
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle Stepper
  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep(activeStep + 1)
      setErrors({}) // Clear errors when moving to next step
    }
  }

  const handlePrev = () => {
    if (activeStep !== 0) {
      setActiveStep(activeStep - 1)
      setErrors({}) // Clear errors when moving to previous step
    }
  }

  // Use Cases Functions
  const setUserName = async (firstName: string, lastName: string) => {
    try {
      // Descomente e ajuste o path para usar seu use case real
      // const result = await setName(`${firstName} ${lastName}`)

      // Simulação por enquanto
      console.log('Definindo nome:', `${firstName} ${lastName}`)
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simula delay da API

      return {
        isSuccess: true,
        message: 'Nome definido com sucesso'
      }
    } catch (error) {
      console.error('Erro ao definir nome:', error)
      return {
        isSuccess: false,
        message: 'Erro ao salvar nome'
      }
    }
  }

  const saveUserAddress = async (addressData: any) => {
    try {
      // TODO: Criar use case para salvar endereço
      console.log('Endereço a ser salvo:', addressData)
      await new Promise(resolve => setTimeout(resolve, 500)) // Simula delay da API

      return {
        isSuccess: true,
        message: 'Endereço salvo com sucesso'
      }
    } catch (error) {
      console.error('Erro ao salvar endereço:', error)
      return {
        isSuccess: false,
        message: 'Erro ao salvar endereço'
      }
    }
  }

  const saveUserPlan = async (planData: any) => {
    try {
      // TODO: Criar use case para salvar plano
      console.log('Plano a ser salvo:', planData)
      await new Promise(resolve => setTimeout(resolve, 300)) // Simula delay da API

      return {
        isSuccess: true,
        message: 'Plano salvo com sucesso'
      }
    } catch (error) {
      console.error('Erro ao salvar plano:', error)
      return {
        isSuccess: false,
        message: 'Erro ao salvar plano'
      }
    }
  }

  const handleSubmit = async () => {
    if (!validateStep(2)) return

    setLoading(true)
    setErrorServerMessage(null)

    try {
      // 1. Definir nome do usuário
      const nameResult = await setUserName(formData.firstName, formData.lastName)
      if (!nameResult.isSuccess) {
        setErrorServerMessage(nameResult.message)
        return
      }

      // 2. Salvar endereço
      const addressResult = await saveUserAddress({
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode
      })

      if (!addressResult.isSuccess) {
        console.warn('Falha ao salvar endereço:', addressResult.message)
      }

      // 3. Salvar plano
      const planResult = await saveUserPlan({
        plan: formData.selectedPlan
      })

      if (!planResult.isSuccess) {
        console.warn('Falha ao salvar plano:', planResult.message)
      }

      // Sucesso - redirecionar para dashboard
      alert('Configuração inicial concluída! Bem-vindo!')
      console.log('Dados salvos:', formData)

      // TODO: Redirecionar para o dashboard
      // router.push('/dashboard')

    } catch (error) {
      console.error('Erro na configuração inicial:', error)
      setErrorServerMessage('Erro interno do servidor')
    } finally {
      setLoading(false)
    }
  }

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <StepPersonalInfo
            handleNext={handleNext}
            handlePrev={handlePrev}
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        )
      case 1:
        return (
          <StepAddressInfo
            handleNext={handleNext}
            handlePrev={handlePrev}
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        )
      case 2:
        return (
          <StepPlanSelection
            handlePrev={handlePrev}
            handleSubmit={handleSubmit}
            formData={formData}
            setFormData={setFormData}
            loading={loading}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className='flex bs-full justify-between items-center'>
      <div
        className={classnames(
          'flex bs-full items-center justify-center is-[23.75rem] lg:is-[28.125rem] relative p-6 max-lg:hidden',
          {
            'border-ie': settings.skin === 'bordered'
          }
        )}
      >
        <RegisterIllustration
          src='/images/illustrations/characters/7.png'
          alt='character-illustration'
          className={classnames({ 'scale-x-[-1]': theme.direction === 'rtl' })}
        />
        {!isSmallScreen && (
          <MaskImg
            alt='mask'
            src={authBackground}
            className={classnames({ 'scale-x-[-1]': theme.direction === 'rtl' })}
          />
        )}
      </div>
      <div className='flex flex-1 justify-center items-center bs-full bg-backgroundPaper'>
        <Link
          href={getLocalizedUrl('/', locale as Locale)}
          className='absolute block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px]'
        >
          <Logo />
        </Link>
        <StepperWrapper className='p-6 sm:p-8 max-is-[46.25rem] mbs-11 sm:mbs-14 lg:mbs-0'>
          {/* Error Message */}
          {errorServerMessage && (
            <div className='p-4 mb-6 text-red-700 bg-red-50 border border-red-200 rounded-lg'>
              {errorServerMessage}
            </div>
          )}

          <Stepper
            activeStep={activeStep}
            connector={
              !isSmallScreen ? (
                <DirectionalIcon
                  ltrIconClass='tabler-chevron-right'
                  rtlIconClass='tabler-chevron-left'
                  className='text-xl'
                />
              ) : null
            }
            className='mbe-6 md:mbe-12'
          >
            {steps.map((step, index) => {
              return (
                <Step key={index}>
                  <StepLabel>
                    <div className='step-label'>
                      <CustomAvatar
                        variant='rounded'
                        skin={activeStep === index ? 'filled' : 'light'}
                        {...(activeStep >= index && { color: 'primary' })}
                        {...(activeStep === index && { className: 'shadow-primarySm' })}
                        size={38}
                      >
                        <i className={classnames(step.icon, 'text-[22px]')} />
                      </CustomAvatar>
                      <div>
                        <Typography className='step-title'>{step.title}</Typography>
                        <Typography className='step-subtitle'>{step.subtitle}</Typography>
                      </div>
                    </div>
                  </StepLabel>
                </Step>
              )
            })}
          </Stepper>
          {getStepContent(activeStep)}
        </StepperWrapper>
      </div>
    </div>
  )
}

export default FirstAccessOnboarding
