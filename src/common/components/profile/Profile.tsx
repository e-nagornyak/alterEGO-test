import React, {FC} from 'react';
import {useAppSelector} from "../../../hooks/UseAppSelector";
import {Navigate} from "react-router-dom";
import avatar from '../../../assets/images/avatar.png'

export const Profile: FC = () => {
    const name = useAppSelector(state => state.profile.name)
    const email = useAppSelector(state => state.profile.email)
    const status = useAppSelector(state => state.profile.status)
    const isLogged = useAppSelector(state => state.auth.isLogged)

    if (!isLogged) {
        return <Navigate to={'/auth'}/>
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

