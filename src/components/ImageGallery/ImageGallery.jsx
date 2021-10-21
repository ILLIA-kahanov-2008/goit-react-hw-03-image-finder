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
    btnVisibility: 'visible',
  };

  // componentDidMount() {
  //   console.log("DidMount in ImageGallery component");
  // }

  componentDidUpdate(prevProps, prevState) {
    // this.props.setListOffsetHeight();
    
    // console.log("at starts DidUpdate in ImageGallery component state.pageNumber:",
    //   this.props.page);
    
    const prevQuery = prevProps.queryName;
    const newQuery = this.props.queryName;
    let pageNumber = this.props.page;
    let listHeight = this.props.listHeight;
    
    // console.log("before{if}#1 DidUpdate in ImageGallery component:",
    //   pageNumber, "prevQuery:", prevQuery, "newQuery", newQuery);
    
    if (prevQuery !== newQuery) {
      this.setState({        status: Status.PENDING,        btnVisibility: 'visible',   
      });
      // console.log("in {if}#1 before FETCH DidUpdate in ImageGallery component:",
      // pageNumber);
      imagesAPI
        .getImages(newQuery, pageNumber)
        .then(({ data: { hits } }) => {
          // console.log("FETCH in DidUpdate in ImageGallery component");
          hits.length < 12 && this.setState({ btnVisibility: 'hidden' }); //imagesPerPage
          if (hits.length > 0) {
            this.setState({
              arrayOfImagesByQuery: hits,
              status: Status.RESOLVED,
            });
            pageNumber+=1;
            this.props.setPageNumber(pageNumber);
      //       console.log("in {if}#1 after FETCH DidUpdate in ImageGallery component:",
      // pageNumber);
          } else {
            this.setState({
              status: Status.REJECTED,
            });
          }
        })
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
    if (this.state.arrayOfImagesByQuery.length > 12) {
      window.scrollTo({
        top: listHeight,
        behavior: 'smooth',
      });
    }
    // console.log("before end DidUpdate in ImageGallery component",
    //   pageNumber);
  }

  LoadMoreBtnClick = () => {
    // console.log("LoadMoreBtn clicked");
    const newQuery = this.props.queryName;
    let pageNumber = this.props.page;
    this.props.setListOffsetHeight();
    this.setState({ status: Status.PENDING });
    // console.log("before FETCH in LoadMoreBtnClick", pageNumber);
    imagesAPI
      .getImages(newQuery, pageNumber)
      .then(({ data: { hits } }) => {
        // console.log("FETCH in LoadMoreBtnClick function");
        hits.length < 12 && this.setState({ btnVisibility: 'hidden' }); //imagesPerPage
        this.setState(prev => ({
          arrayOfImagesByQuery: [...prev.arrayOfImagesByQuery, ...hits],
          status: Status.RESOLVED,
        }));
        pageNumber+=1;
            this.props.setPageNumber(pageNumber)
        // console.log("after FETCH in LoadMoreBtnClick", pageNumber);
      })
      .catch(error => this.setState({ error, status: Status.REJECTED }));
  };

  handleImageClick = (alt, largeImgURL) => {
    this.props.onImageClick(alt, largeImgURL);
  };

  render() {
    const { arrayOfImagesByQuery, status, btnVisibility } = this.state;
    const newQuery = this.props.queryName;

    if (status === Status.IDLE) {
      // console.log("IDLE");
      return <h1>Please, Enter your query!!!</h1>;
    }
    if (status === Status.PENDING) {
      // console.log("PENDING");
      return (
        <div style={{ marginTop: 100 }}>
          <Loader
            type="spinner-circle"
            bgColor={'#3f51b5'}
            title={''}
            color={'#2a2a2a'}
            size={100}
          />
          <p>Loading...{newQuery}</p>
        </div>
      );
    }
    if (status === Status.RESOLVED) {
      // console.log("RESOLVED");
      return (
        <>
          <ul className={styles.ImageGallery} id="galleryList">
            {arrayOfImagesByQuery.map(
              ({ webformatURL, largeImageURL, tags, id }) => (
                <ImageGalleryItem
                  imgSrc={webformatURL}
                  tags={tags}
                  modalImageURL={largeImageURL}
                  key={id}
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
      // console.log("REJECTED");
      return (
        <p style={{ color: '#0d2de0' }}>
          <span
            style={{
              fontSize: 16,
              textDecorationLine: 'line-through',
              color: 'red',
              display: 'block',
            }}
          >
            {newQuery}
          </span>
          hasn't find. Try another query again
        </p>
      );
    }
  }
}

ImageGallery.propTypes = {
  queryName: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
  listHeight: PropTypes.string,
  setListOffsetHeight: PropTypes.func.isRequired,
        setPageNumber: PropTypes.func.isRequired,
        page: PropTypes.number.isRequired,
};

export default ImageGallery;
