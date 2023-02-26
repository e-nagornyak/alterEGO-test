import {createAsyncThunk} from "@reduxjs/toolkit";
import {setAppStatus} from "app/app-reducer";
import {errorUtils} from "../../../utils/error-utils";
import {AxiosError} from "axios";
import {profileAPI} from "api/API";
import {UpdateProfile} from "api/types";
import {updateProfileInfo} from "features/components/profile/profile-reducer";

export const updateProfile = createAsyncThunk('profile/update', async (param: UpdateProfile, {dispatch}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await profileAPI.updateProfile(param)
        dispatch(updateProfileInfo({profile: res.data}))
        dispatch(setAppStatus({status: 'succeeded'}))
    } catch (error) {
        errorUtils(error as AxiosError, dispatch)
    }
})

export const fetchProfile = createAsyncThunk('profile/fetch', async (param, {dispatch}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await profileAPI.getProfile()
        dispatch(setAppStatus({status: 'succeeded'}))
        return res.data
    } catch (error) {
        errorUtils(error as AxiosError, dispatch)
    }
})