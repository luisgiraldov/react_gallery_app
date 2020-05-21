import React,{ Component } from "react";

class Photo extends Component {

    // if the image is not returned by flickr due to a broken link,
    //display an error image indicating the broken link
    imgError = image => {
        image.onError = "";
        image.src = "../images/broken-link.png";
        return true;
    }

    render() {
        const picture = this.props.data;

        return (
            <li>
                <img src={`https://farm${picture.farm}.staticflickr.com/${picture.server}/${picture.id}_${picture.secret}_c.jpg`} alt={`${picture.title}`} 
                    onError={(event) => {
                        this.imgError(event.target);
                }} />
            </li>
        );
    }    
}

export default Photo;