import {createAsyncThunk} from "@reduxjs/toolkit";
import {setAppStatus, setInitialized} from "app/app-reducer";
import {errorUtils} from "../../../utils/error-utils";
import {AxiosError} from "axios";
import {FormData} from "features/components/auth/auth-shema";
import {setLogged} from "features/components/auth/auth-reducer";

export const authMe = createAsyncThunk('auth/me', async (param, {dispatch}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        let authKey = await localStorage.getItem('auth')
        if (authKey) {
            const data = JSON.parse(authKey)
            if (data.email === 'admin' && data.password === '12345') {
                dispatch(setLogged({isLogged: true}))
            }
        }
        dispatch(setAppStatus({status: 'succeeded'}))
    } catch (error) {
        errorUtils(error as AxiosError, dispatch)
    } finally {
        dispatch(setInitialized({isInitialized: true}))
    }
})

export const login = createAsyncThunk('auth/login', async (param: FormData, {dispatch}) => {
    dispatch(setAppStatus({status: 'loading'}))
    const authData = JSON.stringify(param)
    try {
        await localStorage.setItem('auth', authData)
        dispatch(setAppStatus({status: 'succeeded'}))
    } catch (error) {
        errorUtils(error as AxiosError, dispatch)
    }
})

export const logout = createAsyncThunk('auth/logout', async (param, {dispatch}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        await localStorage.removeItem('auth')
        dispatch(setAppStatus({status: 'succeeded'}))
    } catch (error) {
        errorUtils(error as AxiosError, dispatch)
    }
})
