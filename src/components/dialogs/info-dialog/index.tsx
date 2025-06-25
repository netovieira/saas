'use client'

// React Imports
import { Fragment } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

type ConfirmationDialogProps = {
  title: string
  subtitle: string
  message: React.ReactNode
  open: boolean
  setOpen: (open: boolean) => void
}

const InfoDialog = ({ message, title, subtitle, open, setOpen }: ConfirmationDialogProps) => {
  return (
    <>
      <Dialog fullWidth maxWidth='lg' open={open} onClose={() => setOpen(false)} closeAfterTransition={false}>
        <DialogContent className='flex flex-col text-center sm:pbs-4 sm:pbe-6 sm:pli-4'>
          <div className='flex flex-row gap-2 items-center mb-6'>
            <i className='tabler-alert-square-rounded-filled text-[64px] text-primary' />
            <div className='flex flex-col items-start justify-center'>
              <Typography variant='h4'>
                {title}
              </Typography>
              <Typography color='text.secondary'>{subtitle}</Typography>
            </div>
          </div>
          <div className='flex flex-row gap-2 items-center justify-start text-justify'>
            {typeof message === 'string' ? (
              <Typography>{message}</Typography>
            ) : (
              message
            )}
          </div>
        </DialogContent>
        <DialogActions className='justify-end pbs-0 sm:pbe-4 sm:pli-4'>
          <Button variant='contained' onClick={() => setOpen(false)}>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default InfoDialog
