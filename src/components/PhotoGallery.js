import React, { Component } from 'react';
import NotFound from './NotFound';


class PhotoGallery extends Component {

    imgError = image => {
        image.onError = "";
        image.src = "../images/broken-link.png";
        return true;
    }

    render () {
        let photos = [];
        let title = "Fetching!";

        if(this.props.data) {
            photos = this.props.data.photos;
            title = this.props.data.title;
        }

        return (
            <div className="photo-container">
                <h2>{title}</h2>
                {!this.props.data ? 
                    <div className="loader"></div> 
                    :   <ul>
                            { photos.length > 0 ? photos.map( picture => {
                                return  <li key={picture.id}>
                                            <img src={`https://farm${picture.farm}.staticflickr.com/${picture.server}/${picture.id}_${picture.secret}_c.jpg`} alt={`${picture.title}`} 
                                                onError={(event) => {
                                                this.imgError(event.target);
                                                }} />
                                        </li>
                                }) 
                                : <NotFound />       
                            }
                        </ul>
                }
            </div>
        );
    }
}

export default PhotoGallery;