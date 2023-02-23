import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    name: 'Evhen Nahorniak',
    email: 'test@gmail.com',
    status: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, perferendis!'
}

const slice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        changeName(state, action: PayloadAction<{ name: string }>) {
            state.name = action.payload.name
        },
        emailEmail(state, action: PayloadAction<{ email: string }>) {
            state.email = action.payload.email
        },
        emailStatus(state, action: PayloadAction<{ status: string }>) {
            state.status = action.payload.status
        },
    }
})

export const profileReducer = slice.reducer
export const {changeName, emailEmail, emailStatus} = slice.actions
