import { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';

import Modal from '../Modal/Modal';

import './App.css';

class App extends Component {
  state = {
    queryName: '',
    showModal: false,
    altModalImageName: '',
    modalImageURL: '',
    pageNumber: 1,
    galleryListHeight: 0,
  };

 onFormSubmit = (queryName, pageNumber) => {
    this.setState({
      queryName,
      pageNumber,
      galleryListHeight: 0,
    });
  };

  setPageNumber = pageNumber => {    
    this.setState({ pageNumber });  
  };

  setListOffsetHeight = () => {
    this.setState({
      galleryListHeight: document.getElementById('galleryList').offsetHeight,
    });
  };

  onImageClick = (altModalImageName, modalImageURL) => {
    this.setState({ altModalImageName, modalImageURL });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  resetModalOptionsInState = () => {
    this.setState({ altModalImageName: '', modalImageURL: '' });
  };

  render() {
    const {
      queryName,
      pageNumber,
      galleryListHeight,
      showModal,
      altModalImageName,
      modalImageURL,
    } = this.state;
    return (
      <div className="App">
        <SearchBar onSubmit={this.onFormSubmit} />
        <ImageGallery
          queryName={queryName}
          onImageClick={this.onImageClick}
          listHeight={galleryListHeight}
          setListOffsetHeight={this.setListOffsetHeight}
          setPageNumber={this.setPageNumber}
          page={pageNumber}
        />
        {showModal && (
          <Modal
            onClose={this.toggleModal}
            altName={altModalImageName}
            imageURL={modalImageURL}
            resetAppOptions={this.resetModalOptionsInState}
          />
        )}
      </div>
    );
  }
}

export default App;

// componentDidMount() {
//   console.log("DidMount in APP component");
// }

// componentDidUpdate(prevProps, prevState) {
//   console.log("DidUpdate in APP component");
// }

// componentWillUnmount() {
//   console.log("WillUnmount in APP component");
// }
