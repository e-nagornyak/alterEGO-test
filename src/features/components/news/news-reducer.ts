import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NewsItem } from 'api/types'
import {
  deleteNewsItem,
  getMoreNews,
  getNews
} from 'features/components/news/news-thunks'

export type newsDomainItem = NewsItem & { status: 'idle' | 'loading' }
const initialState = {
  news: [] as newsDomainItem[],
  page: 1
}

const slice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setNews(state, action: PayloadAction<{ news: NewsItem[] }>) {
      action.payload.news.map(n => state.news.push({ ...n, status: 'idle' }))
    },
    changeEntityStatus(state, action: PayloadAction<{ id: string }>) {
      state.news = state.news.map(e =>
        e.id === action.payload.id
          ? {
              ...e,
              status: 'loading'
            }
          : e
      )
    }
  },
  extraReducers: builder => {
    builder.addCase(deleteNewsItem.fulfilled, (state, action) => {
      state.news = state.news.filter(e => e.id !== action.payload?.id)
    })
    builder.addCase(getMoreNews.fulfilled, state => {
      state.page += 1
    })
    builder.addCase(getNews.fulfilled, (state, action) => {
      if (action.payload) {
        state.news = action.payload.map((n: NewsItem) => ({ ...n, status: 'idle' }))
      }
    })
  }
})

export const newsReducer = slice.reducer
export const { setNews, changeEntityStatus } = slice.actions
