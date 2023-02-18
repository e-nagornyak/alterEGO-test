import {useDispatch} from "react-redux";
import {AppDispatch} from "../app/store/Store";

export const useAppDispatch = () => useDispatch<AppDispatch>()
