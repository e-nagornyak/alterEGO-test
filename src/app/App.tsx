import React, { FC, memo, useEffect } from 'react'
import { CircularProgress, createTheme, Paper, ThemeProvider } from '@mui/material'
import { isInitializedSelector } from 'app/app-selectos'
import { ErrorSnackbar } from 'common/index-common'
import { Header, RoutesPage } from 'features/components'
import { authMe } from 'features/components/auth/auth-thunks'
import { useAppDispatch, useAppSelector } from 'hooks/index'
import './app.css'

const theme = createTheme({
  palette: {
    secondary: {
      main: '#2A2A2A'
    }
  }
})

export const App: FC = memo(() => {
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector(isInitializedSelector)

  useEffect(() => {
    dispatch(authMe())
  }, [dispatch])

  if (!isInitialized) {
    return <CircularProgress className="circular-progress" size={150} />
  }

  return (
    <div className="app-wrapper">
      <ThemeProvider theme={theme}>
        <Header />
        <Paper className="app-paper">
          <RoutesPage />
        </Paper>
        <ErrorSnackbar />
      </ThemeProvider>
    </div>
  )
})
