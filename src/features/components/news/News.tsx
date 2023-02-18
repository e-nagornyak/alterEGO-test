import React, {FC, useCallback, useEffect} from 'react';
import {OutlinedBtn} from "../../../common/components/OutlinedBtn";
import {CardItem} from "../../../common/components/CardItem";
import {useAppSelector} from "../../../hooks/UseAppSelector";
import {useAppDispatch} from "../../../hooks/UseAppDispatch";
import {getMoreNews, getNews} from "./News-reducer";
import {useTranslation} from "react-i18next";

export const News: FC = () => {
    const dispatch = useAppDispatch()
    const {t} = useTranslation()

    const news = useAppSelector(state => state.news.news)

    const showMoreHandler = useCallback(() => {
        dispatch(getMoreNews())
    }, [dispatch])

    useEffect(() => {
        dispatch(getNews())
    }, [dispatch])

    return <>
        <h1>{t('news-title')}</h1>
        <div className={'news-box'}>{news.map(n =>
            <CardItem key={n.id} status={n.status} id={n.id} title={n.title} description={n.body}/>)}
        </div>
        <OutlinedBtn title={t('download-btn')} onClick={showMoreHandler}/>
    </>
};

