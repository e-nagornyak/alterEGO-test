import React, {FC, memo, useCallback, useEffect} from 'react';
import {Navigate} from "react-router-dom";
import default_avatar from '../../../assets/images/avatar.png'
import {PATH} from "features/components/routes-page/routes-path";
import {useAppDispatch, useAppSelector} from "hooks/index";
import {fetchProfile, updateProfile} from "features/components/profile/profile-thunks";
import {EditableSpan} from "common/components/EditableSpan";

export const Profile: FC = memo(() => {
    const dispatch = useAppDispatch()
    const isLogged = useAppSelector(state => state.auth.isLogged)
    const {about, status, name, avatar, email} = useAppSelector(state => state.profile)

    useEffect(() => {
        dispatch(fetchProfile())
    }, [dispatch])
    const changeName = useCallback((name: string) => dispatch(updateProfile({name})), [dispatch])
    const changeStatus = useCallback((status: string) => dispatch(updateProfile({status})), [dispatch])

    if (!isLogged) {
        return <Navigate to={PATH.AUTH}/>
    }

    return <div className={'profile-wrapper'}>
        <div>
            <img className={'profile-avatar'}
                 src={avatar || default_avatar}
                 alt={'avatar'}/>
        </div>
        <div>
            <EditableSpan onChange={changeName} title={name}/>
            <p>{email}</p>
            <EditableSpan withIcon={false} onChange={changeStatus} title={status}/>
            <p>{about}</p>
        </div>
    </div>
});

