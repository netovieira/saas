// MUI Imports
import Grid from '@mui/material/Grid2'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'

// Component Imports
import DirectionalIcon from '@components/DirectionalIcon'
import CustomTextField from '@core/components/mui/TextField'

interface StepAddressInfoProps {
  handleNext: () => void
  handlePrev: () => void
  formData: any
  setFormData: (data: any) => void
  errors: any
}

const StepAddressInfo = ({ handleNext, handlePrev, formData, setFormData, errors }: StepAddressInfoProps) => {
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <>
      <div className='mbe-5'>
        <Typography variant='h4'>Endereço</Typography>
        <Typography>Onde você está localizado?</Typography>
      </div>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12 }}>
          <CustomTextField
            fullWidth
            label='Endereço'
            placeholder='Endereço'
            slotProps={{
              input: {
                startAdornment: <i className='tabler-map-pin' />
              }
            }}
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            {...(errors.address && {
              error: true,
              helperText: errors.address
            })}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomTextField
            fullWidth
            label='Cidade'
            placeholder='Cidade'
            slotProps={{
              input: {
                startAdornment: <i className='tabler-building-community' />
              }
            }}
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            {...(errors.city && {
              error: true,
              helperText: errors.city
            })}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }}>
          <CustomTextField
            select
            fullWidth
            label='Estado'
            slotProps={{
              input: {
                startAdornment: <i className='tabler-map' />
              }
            }}
            value={formData.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            {...(errors.state && {
              error: true,
              helperText: errors.state
            })}
          >
            <MenuItem value=''>Selecione</MenuItem>
            <MenuItem value='AC'>Acre</MenuItem>
            <MenuItem value='AL'>Alagoas</MenuItem>
            <MenuItem value='AP'>Amapá</MenuItem>
            <MenuItem value='AM'>Amazonas</MenuItem>
            <MenuItem value='BA'>Bahia</MenuItem>
            <MenuItem value='CE'>Ceará</MenuItem>
            <MenuItem value='DF'>Distrito Federal</MenuItem>
            <MenuItem value='ES'>Espírito Santo</MenuItem>
            <MenuItem value='GO'>Goiás</MenuItem>
            <MenuItem value='MA'>Maranhão</MenuItem>
            <MenuItem value='MT'>Mato Grosso</MenuItem>
            <MenuItem value='MS'>Mato Grosso do Sul</MenuItem>
            <MenuItem value='MG'>Minas Gerais</MenuItem>
            <MenuItem value='PA'>Pará</MenuItem>
            <MenuItem value='PB'>Paraíba</MenuItem>
            <MenuItem value='PR'>Paraná</MenuItem>
            <MenuItem value='PE'>Pernambuco</MenuItem>
            <MenuItem value='PI'>Piauí</MenuItem>
            <MenuItem value='RJ'>Rio de Janeiro</MenuItem>
            <MenuItem value='RN'>Rio Grande do Norte</MenuItem>
            <MenuItem value='RS'>Rio Grande do Sul</MenuItem>
            <MenuItem value='RO'>Rondônia</MenuItem>
            <MenuItem value='RR'>Roraima</MenuItem>
            <MenuItem value='SC'>Santa Catarina</MenuItem>
            <MenuItem value='SP'>São Paulo</MenuItem>
            <MenuItem value='SE'>Sergipe</MenuItem>
            <MenuItem value='TO'>Tocantins</MenuItem>
          </CustomTextField>
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }}>
          <CustomTextField
            fullWidth
            label='CEP'
            placeholder='CEP'

            slotProps={{
              input: {
                startAdornment: <i className='tabler-mail-code' />
              }
            }}
            value={formData.zipCode}
            onChange={(e) => handleInputChange('zipCode', e.target.value)}
            {...(errors.zipCode && {
              error: true,
              helperText: errors.zipCode
            })}
          />
        </Grid>
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

export default StepAddressInfo
