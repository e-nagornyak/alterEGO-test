import {createAsyncThunk} from "@reduxjs/toolkit";
import {setAppStatus} from "app/app-reducer";
import {newsAPI} from "api/API";
import {errorUtils} from "../../../utils/error-utils";
import {AxiosError} from "axios";
import {AppRootStateType} from "app/store/store";
import {changeEntityStatus, setNews} from "features/components/news/news-reducer";

export const getNews = createAsyncThunk('news/getNews', async (params, {dispatch}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await newsAPI.getNews()
        dispatch(setAppStatus({status: 'succeeded'}))
        return res.data
    } catch (error) {
        errorUtils(error as AxiosError, dispatch)
    }
})

export const getMoreNews = createAsyncThunk('news/getMoreNews', async (params, {dispatch, getState}) => {
    dispatch(setAppStatus({status: 'loading'}))
    const state = getState() as AppRootStateType
    const {page} = state.news
    try {
        const res = await newsAPI.getNews(page + 1)
        dispatch(setNews({news: res.data}))
        dispatch(setAppStatus({status: 'succeeded'}))
    } catch (error) {
        errorUtils(error as AxiosError, dispatch)
    }
})

// This is an imitation of deleting a news item
export const deleteNewsItem = createAsyncThunk('news/deleteNewsItem', async (id: number, {dispatch}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        dispatch(changeEntityStatus({id}))
        await newsAPI.deleteNews(id)
        dispatch(setAppStatus({status: 'succeeded'}))
        return {id}
    } catch (error) {
        errorUtils(error as AxiosError, dispatch)
    }
})