// import propTypes from 'prop-types';
import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { imagesAPI } from '../../services/images-api';

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
    pageNumber: 1,
    isHidden: false
  };

  // newQuery = this.props.queryName;

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.queryName;
    const newQuery = this.props.queryName;
    if (prevQuery !== newQuery) {
      this.setState({ status: Status.PENDING, pageNumber: 1 });
      imagesAPI
        .getImages(newQuery, this.state.pageNumber)
        .then(({ data: { hits } }) => {
          if (hits.length > 0) {
            this.setState({
              arrayOfImagesByQuery: [...hits],
              status: Status.RESOLVED,
              pageNumber: this.state.pageNumber + 1,
            })
          } else {
            this.setState({              
              status: Status.REJECTED,
            })
          } 
        },
      )
        // .then(({ data: { hits } }) => hits.length < 12 && this.setState({ isHidden: true })) //imagesPerPage
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior:
'smooth', })
  }

  handleBtnClick = () => {
    const newQuery = this.props.queryName;
    // this.setState({pageNumber: this.state.pageNumber + 1,})
    imagesAPI
      .getImages(newQuery, this.state.pageNumber)
      .then(({ data: { hits } }) =>
        this.setState(prev => ({
          arrayOfImagesByQuery: [...prev.arrayOfImagesByQuery, ...hits],
          status: Status.RESOLVED,
          pageNumber: this.state.pageNumber + 1,
        })
        )        
    )
      // .then(({ data: { hits } }) => hits.length < 12 && this.setState({ isHidden: true })) //imagesPerPage
      .catch(error => this.setState({ error, status: Status.REJECTED }));
    
  };

  render() {
    const { arrayOfImagesByQuery, status, isHidden } = this.state;
    const newQuery=this.props.queryName

    if (status === Status.IDLE) {
      return <h1>Please, Enter your query!!!</h1>;
    }
    if (status === 'pending') {
      return <h1>Loading...{newQuery}</h1>;
    }
    if (status === 'resolved') {
      return (
        <>
          <ul className={styles.ImageGallery}>
            {arrayOfImagesByQuery.map(
              ({ webformatURL, largeImageURL, tags, id }) => (
                <ImageGalleryItem
                  imgSrc={webformatURL}
                  tags={tags}
                  largeImgSrc={largeImageURL}
                  key={id}
                />
              ),
            )}
          </ul>
          <button
            type="button"
            onClick={this.handleBtnClick}
            // style={isHidden && { visibility: 'hidden' }}
          >
            Load More
          </button>
        </>
      );
    }
    if (status === Status.REJECTED) {
      return <h1>{newQuery} hasn't find. Try another query again</h1>;
    }
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
