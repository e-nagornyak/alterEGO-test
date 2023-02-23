import {AnyAction, combineReducers} from "redux";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {configureStore} from "@reduxjs/toolkit";
import {appReducer} from "../app-reducer";
import {newsReducer} from "features/components/news/news-reducer";
import {profileReducer} from "features/components/profile/profile-reducer";
import {authReducer} from "features/components/auth/auth-reducer";


const rootReducer = combineReducers({
    app: appReducer,
    news: newsReducer,
    profile: profileReducer,
    auth: authReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>

// @ts-ignore
window.store = store;