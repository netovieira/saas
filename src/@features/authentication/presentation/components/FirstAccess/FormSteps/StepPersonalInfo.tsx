// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// Component Imports
import DirectionalIcon from '@components/DirectionalIcon'
import CustomTextField from '@core/components/mui/TextField'
import InputAdornment from '@mui/material/InputAdornment'

interface StepPersonalInfoProps {
  handleNext: () => void
  handlePrev: () => void
  formData: any
  setFormData: (data: any) => void
  errors: any
}

const StepPersonalInfo = ({ handleNext, formData, setFormData, errors }: StepPersonalInfoProps) => {
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <>
      <div className='mbe-5'>
        <Typography variant='h4'>Informações Pessoais</Typography>
        <Typography>Como você gostaria de ser chamado?</Typography>
      </div>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomTextField
            fullWidth
            label='Nome'
            placeholder='Nome'
            slotProps={{
              input: {
                startAdornment: <i className='tabler-user' />
              }
            }}
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            {...(errors.firstName && {
              error: true,
              helperText: errors.firstName
            })}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomTextField
            fullWidth
            label='Sobrenome'
            placeholder='Sobrenome'
            slotProps={{
              input: {
                startAdornment: <i className='tabler-user-check' />
              }
            }}
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            {...(errors.lastName && {
              error: true,
              helperText: errors.lastName
            })}
          />
        </Grid>
        <Grid size={{ xs: 12 }} className='flex justify-between'>
          <Button
            disabled
            variant='tonal'
            color='secondary'
            startIcon={<DirectionalIcon ltrIconClass='tabler-arrow-left' rtlIconClass='tabler-arrow-right' />}
          >
            Anterior
          </Button>
          <Button
            variant='contained'
            onClick={handleNext}
            endIcon={<DirectionalIcon ltrIconClass='tabler-arrow-right' rtlIconClass='tabler-arrow-left' />}
          >
            Próximo
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default StepPersonalInfo
