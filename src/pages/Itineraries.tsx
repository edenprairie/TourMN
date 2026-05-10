import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, Map, Calendar, Navigation } from 'lucide-react';
import pageStyles from './Pages.module.css';
import styles from './Itineraries.module.css';

const Itineraries: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-wrapper">
      <header className={pageStyles.pageHeader}>
        <div className="container">
          <h1 className="animate-fade-in">{t('itineraries.title')}</h1>
          <p className="animate-fade-in delay-100">{t('itineraries.subtitle')}</p>
        </div>
      </header>

      <section className="section bg-light">
        <div className="container" style={{ maxWidth: '900px' }}>
          
          {/* 1-Day Itinerary */}
          <div className={`${styles.itineraryCard} animate-fade-in delay-200`}>
            <div className={styles.itineraryHeader}>
              <h2 className={styles.itineraryTitle}>
                <Clock size={28} className="inline-block mr-2" style={{ marginRight: '10px', verticalAlign: 'text-bottom' }} />
                {t('itineraries.one_day.title')}
              </h2>
              <p className={styles.itineraryDesc}>{t('itineraries.one_day.desc')}</p>
            </div>
            
            <div className={styles.timeline}>
              <div className={styles.timelineItem}>
                <div className={styles.timelineDot}><Map size={16} /></div>
                <div className={styles.timelineContent}>
                  <h3 className={styles.timeLabel}>{t('itineraries.one_day.morning.time')}</h3>
                  <p className={styles.activity}>{t('itineraries.one_day.morning.activity')}</p>
                </div>
              </div>
              <div className={styles.timelineItem}>
                <div className={styles.timelineDot}><Navigation size={16} /></div>
                <div className={styles.timelineContent}>
                  <h3 className={styles.timeLabel}>{t('itineraries.one_day.afternoon.time')}</h3>
                  <p className={styles.activity}>{t('itineraries.one_day.afternoon.activity')}</p>
                </div>
              </div>
              <div className={styles.timelineItem}>
                <div className={styles.timelineDot}><Map size={16} /></div>
                <div className={styles.timelineContent}>
                  <h3 className={styles.timeLabel}>{t('itineraries.one_day.evening.time')}</h3>
                  <p className={styles.activity}>{t('itineraries.one_day.evening.activity')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 3-Day Itinerary */}
          <div className={`${styles.itineraryCard} animate-fade-in delay-300`}>
            <div className={styles.itineraryHeader}>
              <h2 className={styles.itineraryTitle}>
                <Calendar size={28} className="inline-block mr-2" style={{ marginRight: '10px', verticalAlign: 'text-bottom' }} />
                {t('itineraries.three_day.title')}
              </h2>
              <p className={styles.itineraryDesc}>{t('itineraries.three_day.desc')}</p>
            </div>
            
            <div className={styles.timeline}>
              <div className={styles.timelineItem}>
                <div className={styles.timelineDot}>1</div>
                <div className={styles.timelineContent}>
                  <h3 className={styles.timeLabel}>{t('itineraries.three_day.day_1.time')}</h3>
                  <p className={styles.activity}>{t('itineraries.three_day.day_1.activity')}</p>
                </div>
              </div>
              <div className={styles.timelineItem}>
                <div className={styles.timelineDot}>2</div>
                <div className={styles.timelineContent}>
                  <h3 className={styles.timeLabel}>{t('itineraries.three_day.day_2.time')}</h3>
                  <p className={styles.activity}>{t('itineraries.three_day.day_2.activity')}</p>
                </div>
              </div>
              <div className={styles.timelineItem}>
                <div className={styles.timelineDot}>3</div>
                <div className={styles.timelineContent}>
                  <h3 className={styles.timeLabel}>{t('itineraries.three_day.day_3.time')}</h3>
                  <p className={styles.activity}>{t('itineraries.three_day.day_3.activity')}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Itineraries;
