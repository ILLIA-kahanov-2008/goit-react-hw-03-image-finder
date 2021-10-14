import { Component } from 'react';
import SearchBar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';

import './App.css';

class App extends Component {
  state = {
    queryName: '',
  }
  
  onFormSubmit = queryName => {    
    this.setState({queryName})
  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps, prevState) {

  }

  componentWillUnmount() {

  }

  render() {
    const {queryName} =this.state
  return (
    <div className="App">
      <SearchBar onSubmit={this.onFormSubmit}/>
      <ImageGallery queryName={queryName}/>
    </div>
  );}
}

export default App;

