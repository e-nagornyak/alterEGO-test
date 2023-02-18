import React from 'react'
import Snackbar from '@mui/material/Snackbar/Snackbar';
import Alert from '@mui/material/Alert/Alert';
import {useAppSelector} from "../../hooks/UseAppSelector";
import {useAppDispatch} from "../../hooks/UseAppDispatch";
import {setAppError} from "../../app/App-reducer";

export const ErrorSnackbar = () => {
    const error = useAppSelector(state => state.app.error)
    const dispatch = useAppDispatch()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return
        dispatch(setAppError({error: null}));
    }

    return (
        <div>
            <Snackbar open={error !== null} autoHideDuration={3000} onClose={handleClose}>
                <Alert variant="filled" severity="error" onClose={handleClose}>
                    {error}
                </Alert>
            </Snackbar>
        </div>
    )
}