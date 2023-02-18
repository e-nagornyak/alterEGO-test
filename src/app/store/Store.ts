import {AnyAction, combineReducers} from "redux";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {configureStore} from "@reduxjs/toolkit";
import {appReducer} from "../App-reducer";
import {newsReducer} from "../../common/components/news/News-reducer";
import {profileReducer} from "../../common/components/profile/Profile-reducer";
import {authReducer} from "../../common/components/auth/Auth-reducer";


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