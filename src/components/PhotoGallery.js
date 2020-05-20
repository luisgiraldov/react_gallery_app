import React, { Component } from 'react';

class PhotoGallery extends Component {

    imgError = image => {
        image.onError = "";
        image.src = "../images/broken-link.png";
        return true;
    }

    render () {
        let data = [];
        const currentUrl = window.location.href;
        const currentQuery = currentUrl.split("/");
        const title = currentQuery[currentQuery.length - 1];
        if(this.props.data){
            data = this.props.data;
        }
        return (
            <div className="photo-container">
                <h2>{title}</h2>
                <ul>
                    { data.length > 0 ? this.props.data.map( picture => {
                        return  <li key={picture.id}>
                                    <img src={`https://farm${picture.farm}.staticflickr.com/${picture.server}/${picture.id}_${picture.secret}_c.jpg`} alt={`${picture.title}`} 
                                      onError={(event) => {
                                          this.imgError(event.target);
                                          }} />
                                </li>
                    }) : <div className="loader"></div>}
                </ul>
            </div>
        );
    }
}

// const PhotoGallery = (props) => {
    
// }

export default PhotoGallery;