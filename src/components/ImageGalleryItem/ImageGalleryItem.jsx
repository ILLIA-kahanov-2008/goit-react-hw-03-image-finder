import React from 'react';
// import PropTypes from 'prop-types';

import styles from './ImageGalleryItem.module.css';

// ImageGalleryItem.propTypes = {};

function ImageGalleryItem ({ imgSrc, tags, modalImageURL, id, handleImageClick }) {
  return (
    <li className={styles.ImageGalleryItem}>
      <img
        src={imgSrc}
        alt={tags}
        data-src={modalImageURL}        
        onClick={handleImageClick}
        className={styles.ImageGalleryItemIMG}
        // id={id}
      />
    </li>
  );
}

export default ImageGalleryItem;
