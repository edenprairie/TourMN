import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Mail, Globe } from 'lucide-react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContent}`}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <MapPin size={24} className={styles.logoIcon} />
            <span>Explore MN</span>
          </div>
          <p className={styles.tagline}>{t('hero.subtitle')}</p>
        </div>
        
        <div className={styles.social}>
          <a href="#" className={styles.socialIcon}><Globe size={20} /></a>
          <a href="#" className={styles.socialIcon}><Mail size={20} /></a>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>{t('footer.copyright')}</p>
      </div>
    </footer>
  );
};

export default Footer;
