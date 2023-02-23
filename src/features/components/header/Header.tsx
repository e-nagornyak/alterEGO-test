import React, {ChangeEvent, FC, memo, useCallback} from 'react';
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {OutlinedBtn} from "common/index-common";

import {AppBar, Box, LinearProgress, Switch, Toolbar} from "@mui/material";
import {useAppDispatch, useAppSelector} from "hooks/index-hooks";
import {logout} from "features/components/auth/auth-thunks";

export const Header: FC = memo(() => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {t, i18n} = useTranslation();

    const isLogged = useAppSelector(state => state.auth.isLogged)
    const status = useAppSelector(state => state.app.status)

    const logoutHandler = useCallback(() => dispatch(logout()), [dispatch])
    const changeLangHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => i18n.changeLanguage(e.target.checked ? 'en' : 'ua'), [i18n])
    const navigateToMainHandler = useCallback(() => navigate('/main'), [navigate])
    const navigateToNewsHandler = useCallback(() => navigate('/news'), [navigate])
    const navigateToProfileHandler = useCallback(() => navigate('/profile'), [navigate])
    const navigateToAuthHandler = useCallback(() => navigate('/auth'), [navigate])

    return <Box>
        <AppBar position="fixed">
            <Toolbar>
                <Box sx={{flexGrow: 1}}>
                    <span>UA</span>
                    <Switch onChange={changeLangHandler} color={'default'}/>
                    <span>ENG</span>
                </Box>
                <Box sx={{display: 'flex'}} gap={'15px'}>
                    <OutlinedBtn title={t('main-btn')} onClick={navigateToMainHandler}/>
                    <OutlinedBtn title={t('news-btn')} onClick={navigateToNewsHandler}/>
                    {isLogged
                        ? <OutlinedBtn title={t('profile-btn')} onClick={navigateToProfileHandler}/>
                        : <OutlinedBtn title={t('login-btn')} onClick={navigateToAuthHandler}/>
                    }
                    {isLogged && <OutlinedBtn title={t('logout-btn')} onClick={logoutHandler}/>}
                </Box>
            </Toolbar>
            {status === 'loading' && <LinearProgress color={'primary'}/>}
        </AppBar>
    </Box>
});

