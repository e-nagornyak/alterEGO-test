import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {login, logout} from "features/components/auth/auth-thunks";

const slice = createSlice({
    name: 'auth',
    initialState: {isLogged: false},
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



