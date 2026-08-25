import React from 'react';
import styles from './Pages.module.css';

const redwingImages = [
  'redwing1.jpeg',
  'redwing2.jpeg',
  'redwing3.jpeg',
  'redwing4.jpeg',
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
];

const Redwing: React.FC = () => {
  return (
    <section className={styles.redwingPage}>
      <div className="container">
        <div className={styles.redwingHeader}>
          <p>Private Collection</p>
          <h1>Red Wing Shoes</h1>
          <span>{redwingImages.length} pairs and details</span>
        </div>

        <div className={styles.redwingGrid}>
          {redwingImages.map((imageName, index) => (
            <figure className={styles.redwingCard} key={imageName}>
              <img
                src={`/images/redwing/${imageName}`}
                alt={`Red Wing shoes collection photo ${index + 1}`}
                loading="lazy"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Redwing;
