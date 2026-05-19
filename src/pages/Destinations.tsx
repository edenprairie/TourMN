import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { DestinationCard } from '../components/Cards';
import styles from './Pages.module.css';

type DestinationItem = {
  key: string;
  img: string;
  url: string;
};

const destinationGroups: Array<{ id: string; items: DestinationItem[] }> = [
  {
    id: 'core',
    items: [
      { key: 'stone_arch_bridge', img: '/images/stone_arch_bridge.jpg', url: 'https://www.minneapolisparks.org/parks-destinations/historical_sites/stone_arch_bridge/' },
      { key: 'st_anthony', img: '/images/st_anthony.jpg', url: 'https://en.wikipedia.org/wiki/Saint_Anthony_Falls' },
      { key: 'mill_city_museum', img: '/images/mill_city_museum.jpg', url: 'https://www.mnhs.org/millcity' },
      { key: 'guthrie', img: '/images/guthrie.jpg', url: 'https://www.guthrietheater.org/' },
      { key: 'endless_bridge', img: '/images/endless_bridge.jpg', url: 'https://www.guthrietheater.org/about/our-spaces/' },
      { key: 'amber_box', img: '/images/amber_box.jpg', url: 'https://www.guthrietheater.org/about/our-spaces/' },
      { key: 'skyway_system', img: '/images/skyway_system.jpg', url: 'https://www.minneapolis.org/map-transportation/minneapolis-skyway-guide/' },
      { key: 'sculpture_garden', img: '/images/sculpture_garden.jpg', url: 'https://www.minneapolisparks.org/parks__destinations/parks__lakes/gardens__bird_sanctuaries/minneapolis_sculpture_garden/' },
      { key: 'basilica', img: '/images/basilica.jpg', url: 'https://www.mary.org/' },
      { key: 'mia', img: '/images/mia.jpg', url: 'https://new.artsmia.org/' },
      { key: 'minnehaha_falls', img: '/images/minnehaha_falls.jpg', url: 'https://www.minneapolisparks.org/parks-destinations/parks-lakes/minnehaha_park/' },
      { key: 'moa', img: '/images/moa.jpg', url: 'https://www.mallofamerica.com/' },
      { key: 'capitol', img: '/images/capitol.jpg', url: 'https://www.mnhs.org/capitol' },
      { key: 'cathedral', img: '/images/cathedral.jpg', url: 'https://www.cathedralsaintpaul.org/' },
      { key: 'hill_house', img: '/images/hill_house.jpg', url: 'https://www.mnhs.org/hillhouse' },
      { key: 'rice_park', img: '/images/rice_park.jpg', url: 'https://www.stpaul.gov/facilities/rice-park' },
      { key: 'como', img: '/images/como.jpg', url: 'https://comozooconservatory.org/' }
    ]
  },
  {
    id: 'day_trips',
    items: [
      { key: 'wayzata_lake_street', img: '/images/wayzata_lake_street.jpg', url: 'https://www.wayzatachamber.com/dine--shop' },
      { key: 'lake_minnetonka', img: '/images/lake_minnetonka.jpg', url: 'https://www.exploreminnesota.com/profile/lake-minnetonka/2330' },
      { key: 'arboretum', img: '/images/arboretum.jpg', url: 'https://arb.umn.edu/' },
      { key: 'red_wing', img: '/images/red_wing.jpg', url: 'https://www.redwingshoes.com/heritage' },
      { key: 'lake_city', img: '/images/lake_city.jpg', url: 'https://lakecity.org/' }
    ]
  }
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
          {destinationGroups.map((group) => (
            <div key={group.id} className={styles.categorySection}>
              <h2 className={styles.categoryTitle}>{t(`destinations.groups.${group.id}`)}</h2>
              <div className={styles.grid}>
                {group.items.map((dest, index) => (
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
          ))}
        </div>
      </section>
    </div>
  );
};

export default Destinations;
