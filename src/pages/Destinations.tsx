import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { DestinationCard } from '../components/Cards';
import styles from './Pages.module.css';

const destinationData = [
  { key: 'sculpture_garden', img: '/images/sculpture_garden.jpg', url: 'https://www.minneapolisparks.org/parks__destinations/parks__lakes/gardens__bird_sanctuaries/minneapolis_sculpture_garden/' },
  { key: 'moa', img: '/images/moa.jpg', url: 'https://www.mallofamerica.com/' },
  { key: 'red_wing', img: '/images/red_wing.jpg', url: 'https://www.redwingshoes.com/heritage' },
  { key: 'lake_city', img: '/images/lake_city.jpg', url: 'https://lakecity.org/' },
  { key: 'basilica', img: '/images/basilica.jpg', url: 'https://www.mary.org/' },
  { key: 'guthrie', img: '/images/guthrie.jpg', url: 'https://www.guthrietheater.org/' },
  { key: 'st_anthony', img: '/images/st_anthony.jpg', url: 'https://en.wikipedia.org/wiki/Saint_Anthony_Falls' },
  { key: 'mia', img: '/images/mia.jpg', url: 'https://new.artsmia.org/' },
  { key: 'capitol', img: '/images/capitol.jpg', url: 'https://www.mnhs.org/capitol' },
  { key: 'arboretum', img: '/images/arboretum.jpg', url: 'https://arb.umn.edu/' },
  { key: 'como', img: '/images/como.jpg', url: 'https://comozooconservatory.org/' },
  { key: 'hill_house', img: '/images/hill_house.jpg', url: 'https://www.mnhs.org/hillhouse' },
  { key: 'cathedral', img: '/images/cathedral.jpg', url: 'https://www.cathedralsaintpaul.org/' }
];

const Destinations: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-wrapper">
      <header className={styles.pageHeader}>
        <div className="container">
          <h1 className="animate-fade-in">{t('destinations.title')}</h1>
          <p className="animate-fade-in delay-100">{t('destinations.subtitle')}</p>
        </div>
      </header>
      
      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {destinationData.map((dest, index) => (
              <div key={dest.key} className={`animate-fade-in delay-${(index % 3) * 100}`}>
                <DestinationCard 
                  name={t(`destinations.places.${dest.key}.name`)}
                  description={t(`destinations.places.${dest.key}.description`)}
                  imageUrl={dest.img}
                  websiteUrl={dest.url}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Destinations;
