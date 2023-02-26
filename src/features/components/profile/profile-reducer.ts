import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Profile } from 'api/types'
import { fetchProfile } from 'features/components/profile/profile-thunks'

const initialState = {
  id: '',
  name: '',
  email: '',
  avatar: '',
  status: '',
  about: ''
}

const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfileInfo(state, action: PayloadAction<{ profile: Profile }>) {
      return action.payload.profile
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchProfile.fulfilled, (state, action) => action.payload)
  }
})

export const profileReducer = slice.reducer
export const { updateProfileInfo } = slice.actions
