import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppRootStateType} from "../../../app/store/Store";
import {newsItem} from "../../../api/Types";
import {newsAPI} from "../../../api/API";
import {setAppStatus} from "../../../app/App-reducer";
import {errorUtils} from "../../../utils/error-utils";
import {AxiosError} from "axios";


const initialState = {
    news: [] as newsItem[],
    page: 1,
}

const slice = createSlice({
    name: 'news',
    initialState: initialState,
    reducers: {
        setNews(state, action: PayloadAction<{ news: newsItem[] }>) {
            action.payload.news.map(n => state.news.push({...n, status: 'idle'}))
        },
        changeEntityStatus(state, action: PayloadAction<{ id: number }>) {
            state.news = state.news.map(e => e.id === action.payload.id ? {...e, status: 'loading'} : e)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(deleteNewsItem.fulfilled, (state, action) => {
            state.news = state.news.filter(e => e.id !== action.payload?.id)
        })
        builder.addCase(getMoreNews.fulfilled, (state) => {
            state.page = state.page + 1
        })
        builder.addCase(getNews.fulfilled, (state, action) => {
            state.news = action.payload.map((n: newsItem) => ({...n, status: 'idle'}))
        })
    }
})

export const newsReducer = slice.reducer
export const {setNews, changeEntityStatus} = slice.actions

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
