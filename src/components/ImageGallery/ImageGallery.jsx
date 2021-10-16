import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loader from 'react-js-loader';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
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
    btnVisibility: 'visible',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.queryName;
    const newQuery = this.props.queryName;
    if (prevQuery !== newQuery) {
      this.setState({
        status: Status.PENDING,
        pageNumber: 1,
        btnVisibility: 'visible',
      });
      imagesAPI
        .getImages(newQuery, this.state.pageNumber)
        .then(({ data: { hits } }) => {
          hits.length < 12 && this.setState({ btnVisibility: 'hidden' }); //imagesPerPage
          if (hits.length > 0) {
            this.setState({
              arrayOfImagesByQuery: [...hits],
              status: Status.RESOLVED,
              pageNumber: this.state.pageNumber + 1,
            });
          } else {
            this.setState({
              status: Status.REJECTED,
            });
          }
        })
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  LoadMoreBtnClick = () => {
    const newQuery = this.props.queryName;
    this.setState({ status: Status.PENDING });
    imagesAPI
      .getImages(newQuery, this.state.pageNumber)
      .then(({ data: { hits } }) => {
        hits.length < 12 && this.setState({ btnVisibility: 'hidden' }); //imagesPerPage
        this.setState(prev => ({
          arrayOfImagesByQuery: [...prev.arrayOfImagesByQuery, ...hits],
          status: Status.RESOLVED,
          pageNumber: this.state.pageNumber + 1,
        }));
      })
      .catch(error => this.setState({ error, status: Status.REJECTED }));
  };

  handleImageClick = e => {
    const { alt, dataset } = e.target;
    const largeImgURL = dataset.src;
    console.log('e.target.data-src :>> ', dataset.src);
    this.props.onImageClick(alt, largeImgURL);
  };

  render() {
    const { arrayOfImagesByQuery, status, btnVisibility } = this.state;
    const newQuery = this.props.queryName;

    if (status === Status.IDLE) {
      return <h1>Please, Enter your query!!!</h1>;
    }
    if (status === Status.PENDING) {
      return (
        <div style={{ marginTop: 100 }}>
          <Loader
            type="spinner-circle"
            bgColor={'#3f51b5'}
            title={""}
            color={'#2a2a2a'}
            size={100}
          />
          <p>Loading...{newQuery}</p>
        </div>
      );
    }
    if (status === Status.RESOLVED) {
      return (
        <>
          <ul className={styles.ImageGallery}>
            {arrayOfImagesByQuery.map(
              ({ webformatURL, largeImageURL, tags, id }) => (
                <ImageGalleryItem
                  imgSrc={webformatURL}
                  tags={tags}
                  modalImageURL={largeImageURL}
                  key={id}
                  // id={id}
                  handleImageClick={this.handleImageClick}
                />
              ),
            )}
          </ul>
          <Button
            handleBtnClick={this.LoadMoreBtnClick}
            btnVisibility={btnVisibility}
          />
        </>
      );
    }
    if (status === Status.REJECTED) {
      return (
        <p>
          <span>{newQuery}</span>
          hasn't find. Try another query again
        </p>)
    }
  }
}

ImageGallery.propTypes = {
  queryName: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
}

export default ImageGallery;


