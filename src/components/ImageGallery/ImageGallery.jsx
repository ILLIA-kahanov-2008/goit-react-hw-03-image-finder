// import propTypes from 'prop-types';
import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import {imagesAPI} from '../../services/images-api';

import styles from './ImageGallery.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class ImageGallery extends Component {
  state = {
    arrayOfImagesByQuery: [],
    error: null,
    status: Status.IDLE,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.queryName;
    const newQuery = this.props.queryName;

    if (prevQuery !== newQuery) {
      this.setState({ status: Status.PENDING });

      imagesAPI
        .getImages(newQuery, 2)
        .then(({ data: { hits } }) =>
          this.setState({ arrayOfImagesByQuery: [...hits], status: Status.RESOLVED }),
        )
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }

  render() {
    const { arrayOfImagesByQuery } = this.state;
    return (
      <ul className={styles.ImageGallery}>
        {arrayOfImagesByQuery.map(
          ({ webformatURL, largeImageURL, tags, id }) => (
            <ImageGalleryItem
              imgSrc={webformatURL}
              tags={tags}
              largeImgSrc={largeImageURL}
              key={id}
            />
          )
        )}
      </ul>
    );
  }
}

export default ImageGallery;

// ImageGallery.propTypes = {

// }

// export default class PokemonInfo extends Component {
//   state = {
//     pokemon: null,
//     error: null,
//     status: Status.IDLE,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const prevName = prevProps.pokemonName;
//     const nextName = this.props.pokemonName;

//     if (prevName !== nextName) {
//       this.setState({ status: Status.PENDING });

//       setTimeout(() => {
//         pokemonAPI
//           .fetchPokemon(nextName)
//           .then(pokemon => this.setState({ pokemon, status: Status.RESOLVED }))
//           .catch(error => this.setState({ error, status: Status.REJECTED }));
//       }, 3000);
//     }
//   }

//   render() {
//     const { pokemon, error, status } = this.state;
//     const { pokemonName } = this.props;

//     if (status === 'idle') {
//       return <div>Введите имя покемона.</div>;
//     }

//     if (status === 'pending') {
//       return <PokemonPendingView pokemonName={pokemonName} />;
//     }

//     if (status === 'rejected') {
//       return <PokemonErrorView message={error.message} />;
//     }

//     if (status === 'resolved') {
//       return <PokemonDataView pokemon={pokemon} />;
//     }
//   }
// }
