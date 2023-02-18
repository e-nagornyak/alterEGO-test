import {TypedUseSelectorHook, useSelector} from "react-redux";
import {AppRootStateType} from "../app/store/Store";

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
