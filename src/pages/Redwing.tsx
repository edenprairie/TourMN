import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import styles from './Pages.module.css';

const redwingImages = [
  'redwing1.jpeg',
  'redwing2.jpeg',
  'redwing3.jpeg',
  'redwing5.jpeg',
  'redwing6.jpeg',
  'redwing7.jpeg',
  'redwing8.jpeg',
  'reding8.jpeg',
  'redwing9.jpeg',
  'redwing10.jpeg',
  'redwing11.jpeg',
  'redwing12.jpeg',
  'redwing13.jpeg',
  'redwing14.jpeg',
  'redwing15.jpeg',
  'redwing16.jpeg',
  'redwing17.jpeg',
  'redwing18.jpeg',
  'redwing19.jpeg',
  'redwing20.jpeg',
  'redwing21.jpeg',
  'redwing22.jpeg',
  'redwing23.jpeg',
  'redwing4.jpeg',
];

const Redwing: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const closeLightbox = useCallback(() => {
    const closingIndex = selectedIndex;
    setSelectedIndex(null);

    if (closingIndex !== null) {
      window.requestAnimationFrame(() => triggerRefs.current[closingIndex]?.focus());
    }
  }, [selectedIndex]);

  const moveImage = useCallback((direction: number) => {
    setSelectedIndex((currentIndex) => {
      if (currentIndex === null) {
        return currentIndex;
      }

      return (currentIndex + direction + redwingImages.length) % redwingImages.length;
    });
  }, []);

  useEffect(() => {
    if (selectedIndex === null) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeLightbox();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        moveImage(-1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        moveImage(1);
      }
    };

    const previousBodyOverflow = document.body.style.overflow;
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [closeLightbox, moveImage, selectedIndex]);

  return (
    <section className={styles.redwingPage}>
      <div className="container">
        <div className={styles.redwingHeader}>
          <p>Private Collection</p>
          <h1>Red Wing Shoes</h1>
          <span>An enduring collection of Red Wing craftsmanship</span>
        </div>

        <div className={styles.redwingGrid}>
          {redwingImages.map((imageName, index) => (
            <button
              className={styles.redwingCard}
              key={imageName}
              type="button"
              onClick={() => setSelectedIndex(index)}
              ref={(element) => {
                triggerRefs.current[index] = element;
              }}
              aria-label={`Enlarge Red Wing shoes collection photo ${index + 1}`}
            >
              <img
                src={`/images/redwing/${imageName}`}
                alt={`Red Wing shoes collection photo ${index + 1}`}
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      {selectedIndex !== null && (
        <div
          className={styles.redwingLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged Red Wing shoes collection photo"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeLightbox();
            }
          }}
        >
          <button
            className={styles.redwingLightboxNav}
            type="button"
            onClick={() => moveImage(-1)}
            aria-label="Previous Red Wing photo"
          >
            <ChevronLeft size={30} aria-hidden="true" />
          </button>
          <button
            className={styles.redwingLightboxClose}
            type="button"
            onClick={closeLightbox}
            aria-label="Close enlarged photo"
          >
            <X size={24} aria-hidden="true" />
          </button>
          <button
            className={styles.redwingLightboxNav}
            type="button"
            onClick={() => moveImage(1)}
            aria-label="Next Red Wing photo"
          >
            <ChevronRight size={30} aria-hidden="true" />
          </button>
          <img
            className={styles.redwingLightboxImage}
            src={`/images/redwing/${redwingImages[selectedIndex]}`}
            alt={`Enlarged Red Wing shoes collection photo ${selectedIndex + 1}`}
          />
        </div>
      )}
    </section>
  );
};

export default Redwing;
