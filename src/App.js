import React, { Component } from 'react';
import './css/index.css';
import apiKey from './config.js';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import axios from 'axios';

// App components
import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import PhotoGallery from './components/PhotoGallery';
import NotFound from './components/NotFound'


// const App = () => (
//   <BrowserRouter>
//     <div className="container">
//       <SearchForm />
//       <Nav />

//       <Switch>
//         <Route exact path="/" render={ () => <PhotoGallery palabra="mountains" /> } />
//         <Route exact path="/mountains" render={ () => <PhotoGallery palabra="mountains" /> } />
//         <Route path="/ocean" render={ () => <PhotoGallery palabra="ocean" /> } />
//         <Route path="/dogs"  render={ () => <PhotoGallery palabra="dogs" /> } />
//         <Route component={NotFound} />
//       </Switch>
//     </div>
//   </BrowserRouter>
// );

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      photos: [],
      initialData: [],
      loading: true
    };
  }
  
  componentDidMount(){
    console.log("fired!");
    this.getInitialData();
  }

  performSearch = (query = 'mountains') => {
    console.log(query);
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          photos: response.data.photos.photo
        });
      })
      .then( () => {
        this.setState( prevState => ({
          initialData: [...prevState.initialData, this.state.photos]
        }));
        console.log(this.state.initialData);
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  getInitialData = () => {
    const ul = document.querySelector(".main-nav ul");
    let navLinks = ul.children;
    navLinks = Array.prototype.slice.call(navLinks);
    navLinks.forEach( navLink => {
      this.performSearch(navLink.textContent.toLowerCase());
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm onSearch={this.performSearch}/>
          <Nav />

          <Switch>
            <Route exact path="/" render={ () => <PhotoGallery /> } />
            <Route path="/ocean" render={ () => <PhotoGallery /> } />
            <Route path="/dogs"  render={ () => <PhotoGallery /> } />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }

}


// export default App;
