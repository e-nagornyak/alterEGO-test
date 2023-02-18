import React, {ChangeEvent, FC} from 'react';
import {AppBar, Box, LinearProgress, Switch, Toolbar} from "@mui/material";
import {useAppSelector} from "../../../hooks/UseAppSelector";
import {useNavigate} from "react-router-dom";
import {OutlinedBtn} from "../../../features/components/OutlinedBtn";
import {useAppDispatch} from "../../../hooks/UseAppDispatch";
import {logout} from "../auth/Auth-reducer";
import {useTranslation} from "react-i18next";
import {useAppStatusSelector} from "../../../hooks/Selectors";


export const Header: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {t, i18n} = useTranslation();

    const isLogged = useAppSelector(state => state.auth.isLogged)
    const status = useAppStatusSelector()


    const logoutHandler = () => dispatch(logout())
    const changeLangHandler = (e: ChangeEvent<HTMLInputElement>) => i18n.changeLanguage(e.target.checked ? 'en' : 'ua')

    return <Box>
        <AppBar position="fixed">
            <Toolbar>
                <Box sx={{flexGrow: 1}}>
                    <span>UA</span>
                    <Switch onChange={changeLangHandler} color={'default'}/>
                    <span>ENG</span>
                </Box>
                <Box sx={{display: 'flex'}} gap={'15px'}>
                    <OutlinedBtn title={t('main-btn')} onClick={() => navigate('/main')}/>
                    <OutlinedBtn title={t('news-btn')} onClick={() => navigate('/news')}/>
                    {isLogged
                        ? <OutlinedBtn title={t('profile-btn')} onClick={() => navigate('/profile')}/>
                        : <OutlinedBtn title={t('login-btn')} onClick={() => navigate('/auth')}/>
                    }
                    {isLogged && <OutlinedBtn title={t('logout-btn')} onClick={logoutHandler}/>}
                </Box>
            </Toolbar>
            {status === 'loading' && <LinearProgress color={'primary'}/>}
        </AppBar>
    </Box>
};

