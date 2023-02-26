import React, { ChangeEvent, FC, memo, useCallback } from 'react'
import { AppBar, Box, LinearProgress, Switch, Toolbar } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { OutlinedBtn } from 'common/index-common'
import { logout } from 'features/components/auth/auth-thunks'
import { PATH } from 'features/components/routes-page/routes-path'
import { useAppDispatch, useAppSelector } from 'hooks/index'

export const Header: FC = memo(() => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()

  const isLogged = useAppSelector(state => state.auth.isLogged)
  const status = useAppSelector(state => state.app.status)

  const logoutHandler = useCallback(() => dispatch(logout()), [dispatch])
  const changeLangHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      i18n.changeLanguage(e.target.checked ? 'en' : 'ua'),
    [i18n]
  )
  const navigateToMainHandler = useCallback(() => navigate(PATH.MAIN), [navigate])
  const navigateToNewsHandler = useCallback(() => navigate(PATH.NEWS), [navigate])
  const navigateToProfileHandler = useCallback(() => navigate(PATH.PROFILE), [navigate])
  const navigateToAuthHandler = useCallback(() => navigate(PATH.AUTH), [navigate])

  return (
    <Box>
      <AppBar color="secondary" position="fixed">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <span>UA</span>
            <Switch onChange={changeLangHandler} color="default" />
            <span>ENG</span>
          </Box>
          <Box sx={{ display: 'flex' }} gap="15px">
            <OutlinedBtn title={t('main-btn')} onClick={navigateToMainHandler} />
            <OutlinedBtn title={t('news-btn')} onClick={navigateToNewsHandler} />
            {isLogged ? (
              <OutlinedBtn title={t('profile-btn')} onClick={navigateToProfileHandler} />
            ) : (
              <OutlinedBtn title={t('login-btn')} onClick={navigateToAuthHandler} />
            )}
            {isLogged && <OutlinedBtn title={t('logout-btn')} onClick={logoutHandler} />}
          </Box>
        </Toolbar>
        {status === 'loading' && <LinearProgress color="warning" />}
      </AppBar>
    </Box>
  )
})
