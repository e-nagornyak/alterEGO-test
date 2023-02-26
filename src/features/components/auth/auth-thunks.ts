import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { errorUtils } from '../../../utils/error-utils'
import { setAppStatus, setInitialized } from 'app/app-reducer'
import { setLogged } from 'features/components/auth/auth-reducer'
import { FormData } from 'features/components/auth/auth-shema'

export const authMe = createAsyncThunk('auth/me', async (param, { dispatch }) => {
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    const authKey = await localStorage.getItem('auth')
    if (authKey) {
      const data = JSON.parse(authKey)
      if (data.email === 'admin' && data.password === '12345') {
        dispatch(setLogged({ isLogged: true }))
      }
    }
    dispatch(setAppStatus({ status: 'succeeded' }))
  } catch (error) {
    errorUtils(error as AxiosError, dispatch)
  } finally {
    dispatch(setInitialized({ isInitialized: true }))
  }
})

export const login = createAsyncThunk(
  'auth/login',
  async (param: FormData, { dispatch }) => {
    dispatch(setAppStatus({ status: 'loading' }))
    const authData = JSON.stringify(param)
    try {
      await localStorage.setItem('auth', authData)
      dispatch(setAppStatus({ status: 'succeeded' }))
    } catch (error) {
      errorUtils(error as AxiosError, dispatch)
    }
  }
)

export const logout = createAsyncThunk('auth/logout', async (param, { dispatch }) => {
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    await localStorage.removeItem('auth')
    dispatch(setAppStatus({ status: 'succeeded' }))
  } catch (error) {
    errorUtils(error as AxiosError, dispatch)
  }
})
