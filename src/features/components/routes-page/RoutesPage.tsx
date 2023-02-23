import React, {FC} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import {Auth, Main, News, Page404, Profile} from "features/components/index-featues";
import {PATH} from "./routes-path";

export const RoutesPage: FC = () => {
    return <Routes>
        <Route path={PATH.MAIN} element={<Main/>}/>
        <Route path={PATH.AUTH} element={<Auth/>}/>
        <Route path={PATH.NEWS} element={<News/>}/>
        <Route path={PATH.PROFILE} element={<Profile/>}/>
        <Route path={PATH.PAGE404} element={<Page404/>}/>
        <Route path={PATH.DEFAULT} element={<Navigate to="/main"/>}/>
        <Route path={PATH.OTHER} element={<Navigate to="/404"/>}/>
    </Routes>
};

