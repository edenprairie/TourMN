import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Globe, Menu, X, MapPin, Moon, Sun } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLang);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/destinations', label: t('nav.destinations') },
    { path: '/events', label: t('nav.events') },
    { path: '/food-drink', label: t('nav.food_drink') },
    { path: '/itineraries', label: t('nav.itineraries') },
    { path: '/brands', label: t('nav.brands') },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        <Link to="/" className={styles.logo}>
          <MapPin size={28} className={styles.logoIcon} />
          <span className="text-gradient">Explore MN by Jun Wang</span>
        </Link>

        {/* Desktop Nav */}
        <div className={styles.desktopNav}>
          <div className={styles.links}>
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`${styles.navLink} ${location.pathname === link.path ? styles.active : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center" style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={toggleTheme} className={styles.langBtn} aria-label="Toggle theme">
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={toggleLanguage} className={styles.langBtn}>
              <Globe size={18} />
              <span>{t('nav.language')}</span>
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={styles.mobileToggle} 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className={styles.mobileNav}>
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`${styles.mobileNavLink} ${location.pathname === link.path ? styles.mobileActive : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ display: 'flex', gap: '0.5rem', width: '100%' }}>
            <button 
              onClick={() => { toggleTheme(); setMobileMenuOpen(false); }} 
              className={styles.mobileLangBtn} 
              style={{ flex: 1 }}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
            <button 
              onClick={() => { toggleLanguage(); setMobileMenuOpen(false); }} 
              className={styles.mobileLangBtn}
              style={{ flex: 1 }}
            >
              <Globe size={18} />
              <span>{t('nav.language')}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
