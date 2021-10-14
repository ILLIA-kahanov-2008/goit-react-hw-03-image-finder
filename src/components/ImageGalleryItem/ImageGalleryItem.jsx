import React from 'react';
// import PropTypes from 'prop-types';

import styles from './ImageGalleryItem.module.css';

// ImageGalleryItem.propTypes = {};

function ImageGalleryItem({ imgSrc, tags, largeImgSrc }) {
  return (
    <li className={styles.ImageGalleryItem}>
      <img
        src={imgSrc}
        alt={tags}
        className={styles.ImageGalleryItemIMG}
        modalImage={largeImgSrc}
      />
    </li>
  );
}

export default ImageGalleryItem;
