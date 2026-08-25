import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedImage) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedImage]);

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
              onClick={() => setSelectedImage(imageName)}
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

      {selectedImage && (
        <div
          className={styles.redwingLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged Red Wing shoes collection photo"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedImage(null);
            }
          }}
        >
          <button
            className={styles.redwingLightboxClose}
            type="button"
            onClick={() => setSelectedImage(null)}
            aria-label="Close enlarged photo"
          >
            <X size={24} aria-hidden="true" />
          </button>
          <img
            className={styles.redwingLightboxImage}
            src={`/images/redwing/${selectedImage}`}
            alt="Enlarged Red Wing shoes collection photo"
          />
        </div>
      )}
    </section>
  );
};

export default Redwing;
