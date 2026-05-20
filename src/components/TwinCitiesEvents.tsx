import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, ExternalLink, MapPin } from 'lucide-react';
import { twinCitiesEventMonths, twinCitiesEvents } from '../data/twinCitiesEvents';
import styles from './TwinCitiesEvents.module.css';

interface TwinCitiesEventsProps {
  variant?: 'preview' | 'full';
}

const TwinCitiesEvents: React.FC<TwinCitiesEventsProps> = ({ variant = 'full' }) => {
  const { t, i18n } = useTranslation();
  const [activeMonth, setActiveMonth] = useState('All');
  const language = i18n.language.startsWith('zh') ? 'zh' : 'en';
  const isPreview = variant === 'preview';

  const filteredEvents = useMemo(() => {
    if (isPreview) {
      return twinCitiesEvents.slice(0, 6);
    }

    if (activeMonth === 'All') {
      return twinCitiesEvents;
    }

    return twinCitiesEvents.filter((event) => event.month === activeMonth);
  }, [activeMonth, isPreview]);

  return (
    <section className={`section ${styles.eventsSection}`} id="twin-cities-events">
      <div className="container">
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>{t('events.eyebrow')}</p>
            <h2>{isPreview ? t('events.preview_title') : t('events.title')}</h2>
          </div>
          <p>{isPreview ? t('events.preview_subtitle') : t('events.subtitle')}</p>
        </div>

        {!isPreview && (
          <div className={styles.monthTabs} aria-label={t('events.month_filter')}>
            <button
              type="button"
              className={`${styles.monthTab} ${activeMonth === 'All' ? styles.monthTabActive : ''}`}
              onClick={() => setActiveMonth('All')}
            >
              {t('events.all_months')}
            </button>
            {twinCitiesEventMonths.map((month) => (
              <button
                type="button"
                key={month}
                className={`${styles.monthTab} ${activeMonth === month ? styles.monthTabActive : ''}`}
                onClick={() => setActiveMonth(month)}
              >
                {t(`events.months.${month.toLowerCase()}`)}
              </button>
            ))}
          </div>
        )}

        <div className={styles.eventGrid}>
          {filteredEvents.map((event) => (
            <article className={styles.eventCard} key={event.id}>
              <div className={styles.eventDate}>
                <CalendarDays size={18} />
                <span>{event.date}</span>
              </div>
              <div className={styles.eventBody}>
                <div className={styles.eventTopline}>
                  <span>{event.category}</span>
                  <span>{event.month}</span>
                </div>
                <h3>{event.name}</h3>
                <p>{event.description[language]}</p>
              </div>
              <div className={styles.eventFooter}>
                <span className={styles.location}>
                  <MapPin size={16} />
                  {event.location}
                </span>
                <a href={event.sourceUrl} target="_blank" rel="noopener noreferrer">
                  {event.sourceName} <ExternalLink size={15} />
                </a>
              </div>
            </article>
          ))}
        </div>

        {isPreview ? (
          <div className={styles.previewAction}>
            <Link to="/events">
              {t('events.preview_cta')} <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <p className={styles.sourceNote}>{t('events.source_note')}</p>
        )}
      </div>
    </section>
  );
};

export default TwinCitiesEvents;
