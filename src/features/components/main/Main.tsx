import React, { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'

export const Main: FC = memo(() => {
  const { t } = useTranslation()

  return (
    <div className="main-wrapper">
      <h1>{t('main-text')}</h1>
    </div>
  )
})
