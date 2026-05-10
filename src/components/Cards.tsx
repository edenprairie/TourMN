import React from 'react';
import { ExternalLink } from 'lucide-react';
import styles from './Cards.module.css';

interface DestinationCardProps {
  name: string;
  description: string;
  imageUrl: string;
  websiteUrl?: string;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ name, description, imageUrl, websiteUrl }) => {
  return (
    <div className={`${styles.card} hover-lift`}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={name} className={styles.image} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.description}>{description}</p>
        {websiteUrl && (
          <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
            Visit Official Site <ExternalLink size={16} />
          </a>
        )}
      </div>
    </div>
  );
};

interface BrandCardProps {
  name: string;
  description: string;
}

export const BrandCard: React.FC<BrandCardProps> = ({ name, description }) => {
  return (
    <div className={`${styles.brandCard} hover-lift`}>
      <div className={styles.brandContent}>
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};
