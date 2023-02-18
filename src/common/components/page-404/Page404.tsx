import React, {FC} from 'react';
import {useTranslation} from "react-i18next";

export const Page404: FC = () => {
    const {t} = useTranslation()

    return <div>
        <h1>{t('404')}</h1>
    </div>
};

