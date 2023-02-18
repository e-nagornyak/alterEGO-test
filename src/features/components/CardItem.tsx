import React, {FC} from 'react';
import {Card, Typography} from "@mui/material";
import {useAppDispatch} from "../../hooks/UseAppDispatch";
import {deleteNewsItem} from "../../common/components/news/News-reducer";

type PropsType = {
    id: number,
    title: string,
    description: string
    status: string
}

export const CardItem: FC<PropsType> = ({title, description, id, status}) => {
    const dispatch = useAppDispatch()

    const deleteNewsHandler = () => dispatch(deleteNewsItem(id))


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
};

