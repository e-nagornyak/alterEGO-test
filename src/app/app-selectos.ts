import { AppRootStateType } from 'app/store/store'

export const errorSelector = (state: AppRootStateType) => state.app.error
export const isInitializedSelector = (state: AppRootStateType) => state.app.isInitialized
