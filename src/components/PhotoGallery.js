import React, { Component } from 'react';
import NotFound from './NotFound';
import Photo from './Photo';


class PhotoGallery extends Component {

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
                            { photos.length > 0 ? photos.map( picture =>  <Photo data={picture} key={picture.id}/>) 
                                : <NotFound />       
                            }
                        </ul>
                }
            </div>
        );
    }
}

export default PhotoGallery;