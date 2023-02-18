import React, {FC, useEffect} from 'react';
import {useAppDispatch} from "../hooks/UseAppDispatch";
import {useAppSelector} from "../hooks/UseAppSelector";
import {ErrorSnackbar} from "../common/components/ErrorSnackBar";
import {RoutesPage} from "../features/components/routes-page/RoutesPage";
import {Header} from "../features/components/header/Header";
import {authMe} from "../features/components/auth/Auth-reducer";
import {CircularProgress, Paper} from "@mui/material";

import './App.css';

export const App: FC = () => {
    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(state => state.app.isInitialized)

    useEffect(() => {
        dispatch(authMe())
    }, [dispatch])

    if (!isInitialized) {
        return <CircularProgress className={'circular-progress'} size={150}/>
    }

    return <div className={'app-wrapper'}>
        <Header/>
        <Paper className={'app-paper'}>
            <RoutesPage/>
        </Paper>
        <ErrorSnackbar/>
    </div>
}
