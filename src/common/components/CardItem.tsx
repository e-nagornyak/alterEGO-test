import React, { FC, memo, useCallback } from 'react'
import { Card, CardMedia, Typography } from '@mui/material'
import { DateCreator } from '../../utils/date-creator'
import { newsDomainItem } from 'features/components/news/news-reducer'
import { deleteNewsItem } from 'features/components/news/news-thunks'
import { useAppDispatch } from 'hooks/index'

type PropsType = {
  newsItem: newsDomainItem
}

export const CardItem: FC<PropsType> = memo(({ newsItem }) => {
  const dispatch = useAppDispatch()

  const { title, description, id, created, image, status } = newsItem

  const deleteNewsHandler = useCallback(
    () => dispatch(deleteNewsItem(id)),
    [id, dispatch]
  )

  const date = DateCreator(created)

  return (
    <Card className="cards-wrapper">
      <button
        type="button"
        disabled={status === 'loading'}
        onClick={deleteNewsHandler}
        className="delete-news-btn">
        X
      </button>
      <CardMedia component="img" alt="image news" height="140" src={image} />
      <Typography gutterBottom variant="h5" component="div">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {date}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Card>
  )
})
