import {useAppSelector} from "./UseAppSelector";

export const useAppStatusSelector = () => useAppSelector(state => state.app.status)

