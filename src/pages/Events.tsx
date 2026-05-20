import React from 'react';
import { useTranslation } from 'react-i18next';
import TwinCitiesEvents from '../components/TwinCitiesEvents';
import styles from './Pages.module.css';

const Events: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="page-wrapper">
      <header className={styles.pageHeader}>
        <div className="container">
          <h1>{t('events.page_title')}</h1>
          <p>{t('events.page_subtitle')}</p>
        </div>
      </header>

      <TwinCitiesEvents />
    </div>
  );
};

export default Events;
