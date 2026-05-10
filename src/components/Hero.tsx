import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const welcomeMessage = t('hero.welcome');
  const welcomeItems = Array.from({ length: 3 }, (_, index) => (
    <span key={`${welcomeMessage}-${index}`} className={styles.marqueeItem}>
      {welcomeMessage}
    </span>
  ));

  return (
    <div className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={`container ${styles.content}`}>
        <div className={styles.textContent}>
          <div className={`${styles.welcomeBanner} animate-fade-in`}>
            <div className={styles.marqueeTrack}>
              {welcomeItems}
              {welcomeItems}
            </div>
          </div>
          <h1 className="animate-fade-in">{t('hero.title')}</h1>
          <p className="animate-fade-in delay-100">{t('hero.subtitle')}</p>
          <div className={`${styles.actions} animate-fade-in delay-200`}>
            <Link to="/destinations" className={styles.primaryBtn}>
              {t('hero.cta')}
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
