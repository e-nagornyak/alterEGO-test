import React, {FC} from 'react';
import {useAppSelector} from "hooks/useAppSelector";
import {Navigate} from "react-router-dom";
import avatar from '../../../assets/images/avatar.png'
import {PATH} from "features/components/routes-page/routes-path";

export const Profile: FC = () => {
    const status = useAppSelector(state => state.profile.status)
    const name = useAppSelector(state => state.profile.name)
    const email = useAppSelector(state => state.profile.email)
    const isLogged = useAppSelector(state => state.auth.isLogged)

    if (!isLogged) {
        return <Navigate to={PATH.AUTH}/>
    }

    return <div className={'profile-wrapper'}>
        <div>
            <img className={'profile-avatar'} src={avatar} alt={'avatar'}/>
        </div>
        <div>
            <h3>{name}</h3>
            <p>{email}</p>
            <p>{status}</p>
        </div>
    </div>
};

