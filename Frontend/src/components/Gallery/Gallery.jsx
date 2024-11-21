import React, { useState } from 'react';
import GalleryImg1 from "../../assets/images/gallery/g1.jpg";
import GalleryImg3 from "../../assets/images/gallery/g3.jpg";
import GalleryImg4 from "../../assets/images/gallery/g4.jpg";
import GalleryImg6 from "../../assets/images/gallery/g6.jpg";
import GalleryImg7 from "../../assets/images/gallery/g7.jpg";

const Gallery = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    const images = [
        GalleryImg1,
        GalleryImg3,
        GalleryImg4,
        GalleryImg6,
        GalleryImg7
    ];

    return (
        <div>
            <div className="container">
                <div className="row">
                    {images.map((img, index) => (
                        <div className="col-6 col-md-4 col-lg-3 mb-4" key={index}>
                            <img 
                                src={img} 
                                alt={`Gallery ${index}`} 
                                className="img-fluid rounded"
                                onClick={() => {
                                    setIsOpen(true);
                                    setPhotoIndex(index);
                                }} 
                            />
                        </div>
                    ))}
                </div>
            </div>

           
        </div>
    );
}

export default Gallery;
