import { Alert, Snackbar } from '@mui/material'
import React from 'react'

const SnackbarComponent = ({open,message,handleClose}) => {
  return (
    <div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
  <Alert onClose={handleClose} variant='filled' severity="success" sx={{ width: '100%' }}>
    {message}
  </Alert>
</Snackbar>
    </div>
  )
}

export default SnackbarComponent