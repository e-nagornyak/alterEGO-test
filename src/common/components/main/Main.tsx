import React, {FC} from 'react';
import {useTranslation} from "react-i18next";

export const Main: FC = () => {
    const {t} = useTranslation();

    return <div className={'main-wrapper'}>
        <h1>{t('main-text')}</h1>
    </div>

};

