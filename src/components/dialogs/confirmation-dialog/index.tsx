'use client'

// React Imports
import React, { Fragment, useState } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Third-party Imports
import classnames from 'classnames'

type ConfirmationDialogProps = {
  title: string
  subtitle: string
  message: React.ReactNode | string

  open: boolean
  setOpen: (open: boolean) => void

  doubleConfirmation?: boolean
  doubleMessages?: {
    confirmed: {
      title: string
      message: string
    },
    cancelled: {
      title: string
      message: string
    }
  } | null
}

const ConfirmationDialog = (props: ConfirmationDialogProps) => {

  const { title, subtitle, message, open, setOpen, doubleConfirmation = false, doubleMessages } = props

  // States
  const [secondDialog, setSecondDialog] = useState(false)
  const [userInput, setUserInput] = useState(false)

  const handleSecondDialogClose = () => {
    setSecondDialog(false)
    setOpen(false)
  }

  const handleConfirmation = (value: boolean) => {
    setUserInput(value)
    setSecondDialog(doubleConfirmation)

    if (!doubleConfirmation) {
      setOpen(false)
    }
  }

  const getDoubleMessage = (key: keyof { title: string, message: string }): string => {

    if (doubleMessages) {
      if (userInput) {
        return doubleMessages.confirmed[key]
      } else {
        return doubleMessages.cancelled[key]
      }
    }

    return ''
  }

  return (
    <>
      <Dialog fullWidth maxWidth='xs' open={open} onClose={() => setOpen(false)} closeAfterTransition={false}>
        <DialogContent className='flex flex-col text-center sm:pbs-4 sm:pbe-6 sm:pli-4'>
          <div className='flex flex-row gap-2 items-center mb-6'>
            <i className='tabler-alert-circle text-[64px] text-warning' />
            <div className='flex flex-col items-start justify-center'>
              <Typography variant='h4'>
                {title}
              </Typography>
              <Typography color='text.primary'>{subtitle}</Typography>
            </div>
          </div>
          <div className='flex flex-row gap-2 items-center'>
            {typeof message === 'string' ? (
              <Fragment>
                <Typography color='text.primary'>{message}</Typography>
              </Fragment>
            ) : (
              message
            )}
          </div>
        </DialogContent>
        <DialogActions className='justify-end pbs-0 sm:pbe-4 sm:pli-4'>
          <Button
            variant='tonal'
            color='secondary'
            onClick={() => {
              handleConfirmation(false)
            }}
          >
            Cancelar
          </Button>
          <Button variant='contained' onClick={() => handleConfirmation(true)}>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={secondDialog} onClose={handleSecondDialogClose} closeAfterTransition={false}>
        <DialogContent className='flex items-center flex-col text-center sm:pbs-4 sm:pbe-6 sm:pli-4'>
          <i
            className={classnames('text-[88px] mbe-6', {
              'tabler-circle-check': userInput,
              'text-success': userInput,
              'tabler-circle-x': !userInput,
              'text-error': !userInput
            })}
          />
          <Typography variant='h4' className='mbe-2'>
            {getDoubleMessage('title')}
          </Typography>
          <Typography color='text.primary'>
            {getDoubleMessage('message')}
          </Typography>
        </DialogContent>
        <DialogActions className='justify-center pbs-0 sm:pbe-4 sm:pli-4'>
          <Button variant='contained' color='primary' onClick={handleSecondDialogClose}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ConfirmationDialog
