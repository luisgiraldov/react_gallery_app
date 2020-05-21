import React, { Component } from 'react';
import './css/index.css';
import apiKey from './config.js';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import axios from 'axios';

// App components
import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import PhotoGallery from './components/PhotoGallery';
import PageNotFound from './components/PageNotFound';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      photos: [],
      initialData: {},
      title: ""
    };
  }
  
  componentDidMount(){
    this.getInitialData();
  }

  performSearch = (query = 'mountains') => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          photos: {
            [query]: {
                photos: response.data.photos.photo,
                title: query,
            }
          }
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  getInitialData = () => {
    // Get Url
    const currentUrl = window.location.href;
    // Separate each section of the Url
    const currentQuery = currentUrl.split("/");
    //initialize photos state, in case the user reloads the page, and needs the actual query to render again
    //otherwise will not match the url and won't display anything
    this.performSearch(currentQuery[currentQuery.length - 1]);
    //request initial data
    const ul = document.querySelector(".main-nav ul");
    let navLinks = ul.children;
    navLinks = Array.prototype.slice.call(navLinks);
    navLinks.forEach( navLink => {
      const query = navLink.textContent.toLowerCase();
      axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
        .then( response => {
          this.setState( prevState => ({
            initialData: {...prevState.initialData, 
                          [query]: {
                                    photos : response.data.photos.photo,
                                    title: query
                                   }
                         }
          }));
        })
        .catch(error => {
          console.log('Error fetching and parsing initial data', error);
        });
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm onSearch={this.performSearch}/>
          <Nav />
          {this.state.initialData ? 
            <Switch>
              <Route exact path="/" render={ () => <Redirect to="/mountains" /> } />
              <Route exact path="/mountains" render={ () => <PhotoGallery data={this.state.initialData.mountains} /> } />
              <Route exact path="/ocean" render={ () => <PhotoGallery data={this.state.initialData.ocean} /> } />
              <Route exact path="/dogs"  render={ () => <PhotoGallery data={this.state.initialData.dogs} /> } />
              <Route exact path="/:query" render={ ({ match }) => {
                                                                    const query = match.params.query;
                                                                    return <PhotoGallery data={this.state.photos[query]} />
                                                                  } 
                                                 } />
              <Route component={PageNotFound} />
            </Switch>
            :
            <div className="loader"></div>
          }
        </div>
      </BrowserRouter>
    );
  }

}
