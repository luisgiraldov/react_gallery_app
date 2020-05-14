import React from 'react';
import './css/index.css';
import apiKey from './config.js';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

// App components
import SearchForm from './components/SearchForm.js';
import Nav from './components/Nav.js';
import PhotoGallery from './components/PhotoGallery';


const App = () => (
  <BrowserRouter>
    <div className="container">
      <SearchForm />
      <Nav />

      <Switch>
        <Route exact path="/" render={ () => <PhotoGallery /> } />
        <Route path="/cats" render={ () => <PhotoGallery /> } />
      </Switch>
    </div>
  </BrowserRouter>
);


export default App;
