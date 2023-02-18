import React, {FC} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import {Auth} from "../auth/Auth";
import {Profile} from "../profile/Profile";
import {Page404} from "../page-404/Page404";
import {News} from "../news/News";
import {Main} from "../main/Main";

export const RoutesPage: FC = () => {
    return <Routes>
        <Route path={'/main'} element={<Main/>}/>
        <Route path={'/auth'} element={<Auth/>}/>
        <Route path={'/news'} element={<News/>}/>
        <Route path={'/profile'} element={<Profile/>}/>
        <Route path={'/404'} element={<Page404/>}/>
        <Route path={"/"} element={<Navigate to="/main"/>}/>
        <Route path={"*"} element={<Navigate to="/404"/>}/>
    </Routes>
};

