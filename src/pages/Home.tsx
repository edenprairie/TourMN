import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';
import { DestinationCard, BrandCard } from '../components/Cards';
import TwinCitiesEvents from '../components/TwinCitiesEvents';
import styles from './Pages.module.css';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="page-wrapper">
      <Hero />
      
      <section className={`section ${styles.homeIntro}`}>
        <div className={`container ${styles.introContent}`}>
          <h2 className="animate-fade-in">{t('home.intro_title')}</h2>
          <p className="animate-fade-in delay-100">{t('home.intro_desc')}</p>
        </div>
      </section>

      <TwinCitiesEvents />

      <section className={`section ${styles.homeSection} bg-light`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>{t('home.featured_destinations')}</h2>
            <Link to="/destinations" className={styles.viewAll}>
              {t('home.view_all')} <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className={styles.grid}>
            <DestinationCard 
              name={t('destinations.places.sculpture_garden.name')}
              description={t('destinations.places.sculpture_garden.description')}
              imageUrl="/images/sculpture_garden.jpg"
              websiteUrl="https://www.minneapolisparks.org/parks__destinations/parks__lakes/gardens__bird_sanctuaries/minneapolis_sculpture_garden/"
            />
            <DestinationCard 
              name={t('destinations.places.moa.name')}
              description={t('destinations.places.moa.description')}
              imageUrl="/images/moa.jpg"
              websiteUrl="https://www.mallofamerica.com/"
            />
            <DestinationCard 
              name={t('destinations.places.lake_city.name')}
              description={t('destinations.places.lake_city.description')}
              imageUrl="/images/lake_city.jpg"
              websiteUrl="https://lakecity.org/"
            />
          </div>
        </div>
      </section>

      <section className={`section ${styles.homeSection}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>{t('home.famous_brands')}</h2>
            <Link to="/brands" className={styles.viewAll}>
              {t('home.view_all')} <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className={styles.brandGrid}>
            <BrandCard 
              name={t('brands.companies.target.name')}
              description={t('brands.companies.target.description')}
            />
            <BrandCard 
              name={t('brands.companies.3m.name')}
              description={t('brands.companies.3m.description')}
            />
            <BrandCard 
              name={t('brands.companies.mayo_clinic.name')}
              description={t('brands.companies.mayo_clinic.description')}
            />
            <BrandCard 
              name={t('brands.companies.general_mills.name')}
              description={t('brands.companies.general_mills.description')}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
