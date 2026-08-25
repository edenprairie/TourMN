import React, { useCallback, useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import styles from './Pages.module.css';

const unhImages = [
  'unh1.jpeg',
  'unh2.jpeg',
  'unh3.jpeg',
  'unh4.jpeg',
  'unh5.jpeg',
  'unh6.jpeg',
  'unh7.jpeg',
  'unh8.jpeg',
  'unh9.jpeg',
  'unh10.jpeg',
  'unh11.jpeg',
  'unh12.jpeg',
  'unh13.jpeg',
  'unh14.jpeg',
  'unh15.jpeg',
  'unh16.jpeg',
  'unh17.jpeg',
  'unh18.jpeg',
  'unh19.jpeg',
  'unh20.jpeg',
  'unh21.jpeg',
  'unh22.jpeg',
  'unh23.jpeg',
  'unh24.jpeg',
  'unh25.jpeg',
  'unh26.jpeg',
  'unh27.jpeg',
];

const Unh: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const closeLightbox = useCallback(() => {
    const closingIndex = selectedIndex;
    setSelectedIndex(null);

    if (closingIndex !== null) {
      window.requestAnimationFrame(() => triggerRefs.current[closingIndex]?.focus());
    }
  }, [selectedIndex]);

  useEffect(() => {
    if (selectedIndex === null) {
      return undefined;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeLightbox();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [closeLightbox, selectedIndex]);

  return (
    <section className={styles.unhPage}>
      <div className="container">
        <header className={styles.unhHeader}>
          <p>Visual Collection</p>
          <h1>UNH Gallery</h1>
          <span>Our good friend Jixiang visits UNH - September 14, 2024.</span>
        </header>

        <div className={styles.unhGrid}>
          {unhImages.map((imageName, index) => (
            <button
              aria-label={`Enlarge UNH gallery photo ${index + 1}`}
              className={styles.unhCard}
              key={imageName}
              onClick={() => setSelectedIndex(index)}
              ref={(element) => {
                triggerRefs.current[index] = element;
              }}
              type="button"
            >
              <img
                alt={`UNH gallery photo ${index + 1}`}
                loading={index < 4 ? 'eager' : 'lazy'}
                src={`/images/unh/${imageName}`}
              />
            </button>
          ))}
        </div>
      </div>

      {selectedIndex !== null && (
        <div
          aria-label="Enlarged UNH gallery photo"
          aria-modal="true"
          className={styles.unhLightbox}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeLightbox();
            }
          }}
          role="dialog"
        >
          <button
            aria-label="Close enlarged photo"
            className={styles.unhLightboxClose}
            onClick={closeLightbox}
            type="button"
          >
            <X aria-hidden="true" size={24} />
          </button>
          <img
            alt={`Enlarged UNH gallery photo ${selectedIndex + 1}`}
            className={styles.unhLightboxImage}
            src={`/images/unh/${unhImages[selectedIndex]}`}
          />
        </div>
      )}
    </section>
  );
};

export default Unh;
