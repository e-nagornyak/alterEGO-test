import React, {FC, useEffect} from 'react';
import './App.css';
import {Header} from "../common/components/header/Header";
import {RoutesPage} from "../common/components/routes-page/RoutesPage";
import {CircularProgress, Paper} from "@mui/material";
import {ErrorSnackbar} from "../features/components/ErrorSnackBar";
import {useAppDispatch} from "../hooks/UseAppDispatch";
import {useAppSelector} from "../hooks/UseAppSelector";
import {authMe} from "../common/components/auth/Auth-reducer";

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
