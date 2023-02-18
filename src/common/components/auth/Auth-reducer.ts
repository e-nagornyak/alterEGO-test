import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setAppStatus, setInitialized} from "../../../app/App-reducer";
import {FormData} from "./Auth-shema";
import {errorUtils} from "../../../utils/error-utils";
import {AxiosError} from "axios";


const initialState = {
    isLogged: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setLogged(state, action: PayloadAction<{ isLogged: boolean }>) {
            state.isLogged = action.payload.isLogged
        }
    },
    extraReducers: (builder) => {
        builder.addCase(logout.fulfilled, (state) => {
            state.isLogged = false
        })
        builder.addCase(login.fulfilled, (state) => {
            state.isLogged = true
        })
    }
})

export const authReducer = slice.reducer
export const {setLogged} = slice.actions


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

