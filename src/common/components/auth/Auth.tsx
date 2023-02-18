import React, {FC, useState} from 'react';
import {useAppSelector} from "../../../hooks/UseAppSelector";
import {Navigate} from "react-router-dom";
import {Button, IconButton, InputAdornment, TextField} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import {AuthSchema, FormData} from "./Auth-shema";
import {yupResolver} from "@hookform/resolvers/yup";
import {login} from "./Auth-reducer";
import {useAppDispatch} from "../../../hooks/UseAppDispatch";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useTranslation} from "react-i18next";


export const Auth: FC = () => {
    const dispatch = useAppDispatch()
    const {t} = useTranslation()

    const [showPassword, setShowPassword] = useState(false);

    const isLogged = useAppSelector(state => state.auth.isLogged)

    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver: yupResolver(AuthSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })
    const onSubmit: SubmitHandler<FormData> = (data) => dispatch(login(data))
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

    if (isLogged) {
        return <Navigate to={'/profile'}/>
    }

    return <form className={'auth-form'} onSubmit={handleSubmit(onSubmit)}>
        <TextField
            {...register('email')}
            label={t('email')}
            margin="normal"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
            id={"outlined-error-helper-text"}
        />
        <TextField
            {...register('password')}
            label={t('password')}
            margin="normal"
            fullWidth
            type={showPassword ? 'text' : 'password'}
            error={!!errors.password}
            helperText={errors.password?.message}
            id={"outlined-error-helper-text"}
            InputProps={{
                endAdornment:
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                    </InputAdornment>
            }}/>
        <Button fullWidth type={'submit'} variant={'contained'} color={'primary'}>
            {t('submit-bnt')}
        </Button>
    </form>
};

