// React Imports
import { useState } from 'react'
import type { ChangeEvent } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import type { TypographyProps } from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

// Component Imports
import CustomInputVertical from '@core/components/custom-inputs/Vertical'
import DirectionalIcon from '@components/DirectionalIcon'
import type { CustomInputVerticalData } from '@core/components/custom-inputs/types'

// Styled Components
const Content = styled(Typography, {
  name: 'MuiCustomInputVertical',
  slot: 'content'
})<TypographyProps>(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center'
}))

// Vars
const customInputData: CustomInputVerticalData[] = [
  {
    title: 'Gratuito',
    value: 'free',
    content: (
      <Content component='div' className='flex flex-col justify-center items-center bs-full gap-2'>
        <Typography>Perfeito para começar</Typography>
        <div className='flex items-baseline'>
          <Typography component='sup' className='self-start' color='primary.main'>
            R$
          </Typography>
          <Typography component='span' variant='h3' color='primary.main'>
            0
          </Typography>
          <Typography component='sub' className='self-baseline text-textDisabled'>
            /mês
          </Typography>
        </div>
      </Content>
    ),
    isSelected: true
  },
  {
    title: 'Profissional',
    value: 'pro',
    content: (
      <Content component='div' className='flex flex-col justify-center items-center bs-full gap-2'>
        <Typography>Para profissionais</Typography>
        <div className='flex items-baseline'>
          <Typography component='sup' className='self-start' color='primary.main'>
            R$
          </Typography>
          <Typography component='span' variant='h3' color='primary.main'>
            29
          </Typography>
          <Typography component='sub' className='self-baseline text-textDisabled'>
            /mês
          </Typography>
        </div>
        <Typography variant='caption' className='text-textDisabled'>
          Em breve
        </Typography>
      </Content>
    ),
    isDisabled: true
  },
  {
    title: 'Empresarial',
    value: 'enterprise',
    content: (
      <Content component='div' className='flex flex-col justify-center items-center bs-full gap-2'>
        <Typography>Para empresas</Typography>
        <div className='flex items-baseline'>
          <Typography component='sup' className='self-start' color='primary.main'>
            R$
          </Typography>
          <Typography component='span' variant='h3' color='primary.main'>
            99
          </Typography>
          <Typography component='sub' className='self-baseline text-textDisabled'>
            /mês
          </Typography>
        </div>
        <Typography variant='caption' className='text-textDisabled'>
          Em breve
        </Typography>
      </Content>
    ),
    isDisabled: true
  }
]

interface StepPlanSelectionProps {
  handlePrev: () => void
  handleSubmit: () => void
  formData: any
  setFormData: (data: any) => void
  loading: boolean
}

const StepPlanSelection = ({ handlePrev, handleSubmit, formData, setFormData, loading }: StepPlanSelectionProps) => {
  const initialSelectedOption: string = customInputData.filter(item => item.isSelected)[
  customInputData.filter(item => item.isSelected).length - 1
    ].value

  // States
  const [selectedOption, setSelectedOption] = useState<string>(initialSelectedOption)

  const handleOptionChange = (prop: string | ChangeEvent<HTMLInputElement>) => {
    if (typeof prop === 'string') {
      setSelectedOption(prop)
      setFormData((prev: any) => ({
        ...prev,
        selectedPlan: prop
      }))
    } else {
      setSelectedOption((prop.target as HTMLInputElement).value)
      setFormData((prev: any) => ({
        ...prev,
        selectedPlan: (prop.target as HTMLInputElement).value
      }))
    }
  }

  return (
    <>
      <div className='mbe-5'>
        <Typography variant='h4'>Escolha seu Plano</Typography>
        <Typography>Selecione o plano que melhor atende suas necessidades</Typography>
      </div>
      <Grid container spacing={5}>
        {customInputData.map((item, index) => (
          <CustomInputVertical
            type='radio'
            key={index}
            data={item}
            gridProps={{ size: { xs: 12, sm: 4 } }}
            selected={selectedOption}
            name='custom-radios-plans'

            handleChange={handleOptionChange}
          />
        ))}
      </Grid>
      <Grid container spacing={6} className='mbs-6'>
        <Grid size={{ xs: 12 }} className='flex justify-between'>
          <Button
            variant='tonal'
            color='secondary'
            onClick={handlePrev}
            startIcon={<DirectionalIcon ltrIconClass='tabler-arrow-left' rtlIconClass='tabler-arrow-right' />}
          >
            Anterior
          </Button>
          <Button
            variant='contained'
            color='success'
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Processando...' : 'Finalizar'}
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default StepPlanSelection
