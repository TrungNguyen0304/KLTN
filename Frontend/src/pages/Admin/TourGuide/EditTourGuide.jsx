import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';  
import './IndexTour.css';
import { useParams, useNavigate } from "react-router-dom";

const EditTourGuide = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState(null); 
  const [tourGuideData, setTourGuideData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    images: "",
  });

  useEffect(() => {
    const fetchTourGuide = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/api/tourGuide/${id}`);
        const data = response.data;

        setTourGuideData({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          email: data.email || "",
          phone_number: data.phone_number || "",
          images: data.images || "",
        });
      } catch (error) {
        console.error("Error fetching tour guide data:", error);
      }
    };

    fetchTourGuide();
  }, [id]);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTourGuideData({ ...tourGuideData, images: reader.result });  
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTourGuideData({ ...tourGuideData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('first_name', tourGuideData.first_name);
      formData.append('last_name', tourGuideData.last_name);
      formData.append('email', tourGuideData.email);
      formData.append('phone_number', tourGuideData.phone_number);
      
      if (image) {
        formData.append('image', image);  
      }

      await axios.put(`http://localhost:8001/api/tourGuide/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  
        },
      });
      navigate("/tourGuide");
    } catch (error) {
      console.error("Error updating tour guide:", error);
    }
  };

  if (!tourGuideData.first_name) {
    return <div>Loading...</div>;  
  }

  return (
    <div className="ContainerTour">
      <div className="tour-card">
        <Form onSubmit={handleSubmit} className="p-4">
          <h2 className="tour-title">Edit Tour Guide Details</h2>

          <Form.Group controlId="first_name" className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="first_name"
              value={tourGuideData.first_name}
              onChange={handleInputChange}
              placeholder="Enter First Name"
              required
            />
          </Form.Group>

          <Form.Group controlId="last_name" className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="last_name"
              value={tourGuideData.last_name}
              onChange={handleInputChange}
              placeholder="Enter Last Name"
              required
            />
          </Form.Group>

          <Form.Group controlId="images" className="mb-3">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type="file"
              name="images"
              accept="image/*"
              onChange={handleImageChange}
            />
            {tourGuideData.images && !image && (  
              <div>
                <p>Current Image:</p>
                <img
                  src={tourGuideData.images}
                  alt="Current"
                  className="current-image"
                  style={{ width: "200px", height: "200px", marginBottom: "10px" }}
                />
              </div>
            )}
            {image && (
              <div>
                <p>New Image:</p>
                <img
                  src={URL.createObjectURL(image)}
                  alt="New"
                  className="new-image"
                  style={{ width: "200px", height: "200px", marginBottom: "10px" }}
                />
              </div>
            )}
          </Form.Group>

          <Form.Group controlId="phone_number" className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phone_number"
              value={tourGuideData.phone_number}
              onChange={handleInputChange}
              placeholder="Enter Phone Number"
              required
            />
          </Form.Group>

          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={tourGuideData.email}
              onChange={handleInputChange}
              placeholder="Enter Email"
              required
            />
          </Form.Group>

          <Button className="buttonCreate" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditTourGuide;
