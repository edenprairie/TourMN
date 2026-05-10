import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BrandCard } from '../components/Cards';
import styles from './Pages.module.css';

const brandCategories = [
  {
    id: 'food',
    companies: ['spam', 'general_mills', 'pillsbury', 'land_o_lakes']
  },
  {
    id: 'dining',
    companies: ['dairy_queen', 'buffalo_wild_wings']
  },
  {
    id: 'retail',
    companies: ['target', 'best_buy', 'red_wing_shoes']
  },
  {
    id: 'healthcare',
    companies: ['mayo_clinic', 'medtronic', 'unitedhealth']
  },
  {
    id: 'agriculture',
    companies: ['cargill']
  },
  {
    id: 'industry',
    companies: ['3m', 'polaris', 'toro', 'ecolab']
  },
  {
    id: 'finance',
    companies: ['us_bank', 'ameriprise', 'thrivent']
  }
];

const LocalBrands: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-wrapper">
      <header className={styles.pageHeader}>
        <div className="container">
          <h1 className="animate-fade-in">{t('brands.title')}</h1>
          <p className="animate-fade-in delay-100">{t('brands.subtitle')}</p>
        </div>
      </header>
      
      <section className="section">
        <div className="container">
          {brandCategories.map((category) => (
            <div key={category.id} className={styles.categorySection}>
              <h2 className={styles.categoryTitle}>{t(`brands.categories.${category.id}`)}</h2>
              <div className={styles.brandGrid}>
                {category.companies.map((company) => (
                  <BrandCard 
                    key={company}
                    name={t(`brands.companies.${company}.name`)}
                    description={t(`brands.companies.${company}.description`)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LocalBrands;
