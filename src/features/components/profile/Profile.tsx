import React, { FC, memo, useCallback, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import defaultAvatar from '../../../assets/images/avatar.png'
import { EditableSpan } from 'common/components/EditableSpan'
import { fetchProfile, updateProfile } from 'features/components/profile/profile-thunks'
import { PATH } from 'features/components/routes-page/routes-path'
import { useAppDispatch, useAppSelector } from 'hooks/index'

export const Profile: FC = memo(() => {
  const dispatch = useAppDispatch()
  const isLogged = useAppSelector(state => state.auth.isLogged)
  const { about, status, name, avatar, email } = useAppSelector(state => state.profile)

  useEffect(() => {
    dispatch(fetchProfile())
  }, [dispatch])

  const changeName = useCallback(
    (newName: string) => dispatch(updateProfile({ name: newName })),
    [dispatch]
  )
  const changeStatus = useCallback(
    (newStatus: string) => dispatch(updateProfile({ status: newStatus })),
    [dispatch]
  )

  if (!isLogged) {
    return <Navigate to={PATH.AUTH} />
  }

  return (
    <div className="profile-wrapper">
      <div>
        <img className="profile-avatar" src={avatar || defaultAvatar} alt="avatar" />
      </div>
      <div>
        <EditableSpan textLimit={30} onChange={changeName} title={name} />
        <p>{email}</p>
        <EditableSpan textLimit={100} withIcon={false} onChange={changeStatus} title={status} />
        <p>{about}</p>
      </div>
    </div>
  )
})
