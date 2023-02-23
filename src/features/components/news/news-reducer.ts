import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {newsItem} from "api/types";
import {deleteNewsItem, getMoreNews, getNews} from "features/components/news/news-thunks";


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

