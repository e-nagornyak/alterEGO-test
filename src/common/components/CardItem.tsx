import React, {FC, memo, useCallback} from 'react';
import {Card, Typography} from "@mui/material";
import {deleteNewsItem} from "features/components/news/news-thunks";
import {useAppDispatch} from "hooks/index-hooks";

type PropsType = {
    id: number,
    title: string,
    description: string
    status: string
}

export const CardItem: FC<PropsType> = memo(({title, description, id, status}) => {
    const dispatch = useAppDispatch()

    const deleteNewsHandler = useCallback(() => dispatch(deleteNewsItem(id)), [id, dispatch])

    return <Card className={'cards-wrapper'}>
        <button disabled={status === 'loading'} onClick={deleteNewsHandler}
                className={'delete-news-btn'}>X
        </button>
        <Typography gutterBottom variant="h5" component="div">
            {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {description}
        </Typography>
    </Card>
})

