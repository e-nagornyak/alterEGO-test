import React, { FC, memo } from 'react'
import Alert from '@mui/material/Alert/Alert'
import Snackbar from '@mui/material/Snackbar/Snackbar'
import { setAppError } from 'app/app-reducer'
import { errorSelector } from 'app/app-selectos'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'

export const ErrorSnackbar: FC = memo(() => {
  const error = useAppSelector(errorSelector)
  const dispatch = useAppDispatch()

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return
    dispatch(setAppError({ error: null }))
  }

  return (
    <div>
      <Snackbar open={error !== null} autoHideDuration={3000} onClose={handleClose}>
        <Alert variant="filled" severity="error" onClose={handleClose}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  )
})
