import React, {FC, memo, useCallback} from 'react';
import {Card, Typography} from "@mui/material";
import {useAppDispatch} from "../../hooks/UseAppDispatch";
import {deleteNewsItem} from "../../features/components/news/News-reducer";

type PropsType = {
    id: number,
    title: string,
    description: string
    status: string
}

export const CardItem: FC<PropsType> = memo(({title, description, id, status}) => {
    const dispatch = useAppDispatch()

    const deleteNewsHandler = useCallback(() => dispatch(deleteNewsItem(id)), [id])


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

