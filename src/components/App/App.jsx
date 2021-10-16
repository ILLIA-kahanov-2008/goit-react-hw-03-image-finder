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
    modalImageURL:'',
  }
  
  onFormSubmit = queryName => {    
    this.setState({queryName})
  }

  onImageClick = (altModalImageName, modalImageURL) => {
    console.log("altImageName:", altModalImageName, "modalImageURL:", modalImageURL);
    this.setState({altModalImageName, modalImageURL})
    this.toggleModal();
  }

  toggleModal = () => {
    this.setState(({showModal})=>({showModal:!showModal}))
  }

  render() {
    const {queryName, showModal, altModalImageName, modalImageURL} =this.state
  return (
    <div className="App">
      <SearchBar onSubmit={this.onFormSubmit}/>
      <ImageGallery queryName={queryName} onImageClick={this.onImageClick} />
      {showModal &&(
        <Modal onClose={this.toggleModal} altName={altModalImageName} imageURL={modalImageURL} />)
      }
    </div>
  );}
}

export default App;

