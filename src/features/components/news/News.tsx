import React, { FC, memo, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { CardItem, OutlinedBtn } from 'common/index-common'
import { getMoreNews, getNews } from 'features/components/news/news-thunks'
import { useAppDispatch, useAppSelector } from 'hooks/index'

export const News: FC = memo(() => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const news = useAppSelector(state => state.news.news)

  const showMoreHandler = useCallback(() => dispatch(getMoreNews()), [dispatch])

  useEffect(() => {
    dispatch(getNews())
  }, [dispatch])

  return (
    <>
      <h1>{t('news-title')}</h1>
      <div className="news-box">
        {news.map(n => (
          <CardItem key={n.id} newsItem={n} />
        ))}
        {!news.length && <h1>There is no news.</h1>}
      </div>
      <OutlinedBtn title={t('download-btn')} onClick={showMoreHandler} />
    </>
  )
})
