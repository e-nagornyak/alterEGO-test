import React, {FC, useEffect} from 'react';
import {CircularProgress, Paper} from "@mui/material";
import {authMe} from "features/components/auth/auth-thunks";
import {useAppDispatch, useAppSelector} from "hooks/index-hooks";
import {Header, RoutesPage} from "features/components/index-featues";
import {ErrorSnackbar} from "common/index-common";
import './app.css';
import {isInitializedSelector} from "app/app-selectos";

export const App: FC = () => {
    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(isInitializedSelector)

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
