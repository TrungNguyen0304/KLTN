import React, { useEffect, useState } from "react";
import axios from "axios";

const Gallery = () => {
  const [galleries, setGalleries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // State for the selected image

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const response = await axios.get("http://localhost:8001/api/gallery/");
        setGalleries(response.data.galleries);
      } catch (err) {
        setError(err.response?.data?.message || "Lỗi khi tải dữ liệu thư viện ảnh!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGalleries();
  }, []);

  const openImage = (image) => {
    setSelectedImage(image);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className="container">
      {isLoading ? (
        <p>Đang tải thư viện ảnh...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <div className="row">
          {galleries.map((gallery, index) => (
            <div className="col-6 col-md-4 col-lg-3 mb-4" key={index}>
              <div className="ratio ratio-1x1">
                <img
                  src={gallery.Images}
                  alt={`Gallery ${index}`}
                  className="img-fluid rounded object-fit-cover"
                  onClick={() => openImage(gallery.Images)} 
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Custom modal for enlarged image */}
      {selectedImage && (
        <div
          className="custom-modal"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={closeImage} 
        >
          <img
            src={selectedImage}
            alt="Phóng to ảnh"
            className="img-fluid"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "8px",
              boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)",
            }}
            onClick={(e) => e.stopPropagation()} 
          />
          <button
            onClick={closeImage}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
