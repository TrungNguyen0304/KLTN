import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";

const EditTour = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tourData, setTourData] = useState({
    package_name: "",
    description: "",
    price: "",
    durations: [],
    destinationId: "",
    tourGuideId: "",
    locationId: "",
    incAndExc: "",
  });

  const [image, setImage] = useState(null);
  const [groupImages, setGroupImages] = useState([]);
  const [preview, setPreview] = useState(null);
  const [groupImagePreviews, setGroupImagePreviews] = useState([]);
  const [durations, setDurations] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [tourGuides, setTourGuides] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8001/api/tourPackage/${id}`
        );
        setTourData(response.data);
        setPreview(response.data.image); // Set preview if the image exists
      } catch (error) {
        console.error("Error fetching tour data:", error);
      }
    };

    const fetchData = async () => {
      try {
        const destinationsRes = await axios.get(
          "http://localhost:8001/api/destination"
        );
        setDestinations(destinationsRes.data);

        const tourGuidesRes = await axios.get(
          "http://localhost:8001/api/tourGuide/getAll"
        );
        setTourGuides(tourGuidesRes.data);

        const locationsRes = await axios.get(
          "http://localhost:8001/api/location"
        );
        setLocations(locationsRes.data);

        const durationsRes = await axios.get(
          "http://localhost:8001/api/duration"
        );
        setDurations(durationsRes.data);
      } catch (error) {
        console.error("Error fetching additional data:", error);
      }
    };

    fetchTourData();
    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTourData({ ...tourData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleGroupImageChange = (e) => {
    const files = Array.from(e.target.files);
    setGroupImages(files);
    setGroupImagePreviews(files.map((file) => URL.createObjectURL(file))); 

  };

  const handleDurationChange = (e) => {
    const selectedIds = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setTourData({ ...tourData, durations: selectedIds });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("package_name", tourData.package_name);
    formData.append("description", tourData.description);
    formData.append("price", tourData.price);
    formData.append("durations", JSON.stringify(tourData.durations)); // Send durations as JSON
    formData.append("destinationId", tourData.destinationId);
    formData.append("tourGuideId", tourData.tourGuideId);
    formData.append("locationId", tourData.locationId);
    formData.append("incAndExc", tourData.incAndExc);

    if (image) formData.append("image", image);
    groupImages.forEach((img) => formData.append("groupImages", img)); 

    try {
      const response = await axios.put(
        `http://localhost:8001/api/tourPackage/update/${id}`,
        formData
      );
      if (response.status === 200) {
        alert("Tour updated successfully!");
        navigate("/tourPackage");
      }
    } catch (error) {
      console.error("Error updating tour:", error);
      alert("Error updating tour.");
    }
  };

  return (
    <Container>
      <h2>Edit Tour</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="packageName">
          <Form.Label>Package Name</Form.Label>
          <Form.Control
            type="text"
            name="package_name"
            value={tourData.package_name}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={tourData.description}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={tourData.price}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="durations">
          <Form.Label>Durations</Form.Label>
          <Form.Control
            as="select"
            multiple
            name="durations"
            value={tourData.durations}
            onChange={handleDurationChange}
          >
            {durations.map((duration) => (
              <option key={duration._id} value={duration._id}>
                {new Date(duration.start_date).toLocaleDateString()} -{" "}
                {new Date(duration.end_date).toLocaleDateString()}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="destinationId">
          <Form.Label>Destination</Form.Label>
          <Form.Control
            as="select"
            name="destinationId"
            value={tourData.destinationId}
            onChange={handleInputChange}
          >
            <option value="">Select Destination</option>
            {destinations.map((destination) => (
              <option key={destination._id} value={destination._id}>
                {destination.DestinationName}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="tourGuideId">
          <Form.Label>Tour Guide</Form.Label>
          <Form.Control
            as="select"
            name="tourGuideId"
            value={tourData.tourGuideId}
            onChange={handleInputChange}
          >
            <option value="">Select Tour Guide</option>
            {tourGuides.map((guide) => (
              <option key={guide._id} value={guide._id}>
                {guide.first_name} {guide.last_name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="locationId">
          <Form.Label>Location</Form.Label>
          <Form.Control
            as="select"
            name="locationId"
            value={tourData.locationId}
            onChange={handleInputChange}
          >
            <option value="">Select Location</option>
            {locations.map((location) => (
              <option key={location._id} value={location._id}>
                {location.firstname}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="incAndExc">
          <Form.Label>Inclusions and Exclusions</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="incAndExc"
            value={tourData.incAndExc}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="image">
          <Form.Label>Tour Image</Form.Label>
          {preview && (
            <img src={preview} alt="Preview" style={{ width: "100px" }} />
          )}
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </Form.Group>

        <Form.Group controlId="groupImages">
          <Form.Label>Group Images</Form.Label>
          {groupImagePreviews.length > 0 && (
            <div>
              {groupImagePreviews.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`Group Preview ${index + 1}`}
                  style={{ width: "100px", marginRight: "10px" }}
                />
              ))}
            </div>
          )}
          <Form.Control
            type="file"
            accept="image/*"
            multiple
            onChange={handleGroupImageChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Update Tour
        </Button>
      </Form>
    </Container>
  );
};

export default EditTour;
