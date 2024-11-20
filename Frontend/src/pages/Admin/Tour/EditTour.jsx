import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import "./CreateTour.css"; // Import the same CSS file

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8001/api/tourPackage/${id}`
        );
        setTourData(response.data);
        setPreview(response.data.image);
        setGroupImagePreviews(response.data.groupImages || []);
      } catch (error) {
        console.error("Error fetching tour data:", error);
      } finally {
        setLoading(false);
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

  if (loading) {
    return <div>Loading...</div>;
  }

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
    setGroupImagePreviews(
      files.length > 0 ? files.map((file) => URL.createObjectURL(file)) : []
    );
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
    formData.append("durations", JSON.stringify(tourData.durations));
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
        navigate("/tour");  
      }
    } catch (error) {
      console.error("Error updating tour:", error);
      alert("Error updating tour.");
    }
  };

  return (
    <Container className="parent-container">
      <div className="form-container">
        <h2>Edit Tour</h2>
        <Form onSubmit={handleSubmit}>
          {/* Package Name and Price */}
          <div className="form-row">
            <div className="form-group">
              <Form.Label htmlFor="package_name">Package Name</Form.Label>
              <Form.Control
                id="package_name"
                type="text"
                name="package_name"
                value={tourData.package_name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <Form.Label htmlFor="price">Price</Form.Label>
              <Form.Control
                id="price"
                type="number"
                name="price"
                value={tourData.price}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Description and Inclusions/Exclusions */}
          <div className="form-row">
            <div className="form-group">
              <Form.Label htmlFor="description">Description</Form.Label>
              <Form.Control
                id="description"
                as="textarea"
                rows={3}
                name="description"
                value={tourData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <Form.Label htmlFor="incAndExc">Inclusions/Exclusions</Form.Label>
              <Form.Control
                id="incAndExc"
                as="textarea"
                rows={3}
                name="incAndExc"
                value={tourData.incAndExc}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
 
          {/* Tour Guide and Duration */}
          <div className="row-two-items">
            <div className="form-group">
              <Form.Label htmlFor="tourGuideId">Tour Guide</Form.Label>
              <Form.Control
                id="tourGuideId"
                as="select"
                name="tourGuideId"
                value={tourData.tourGuideId || ""}
                onChange={handleInputChange}
                required
              >
                {tourGuides.map((guide) => (
                  <option key={guide._id} value={guide._id}>
                    {guide.first_name} {guide.last_name}
                  </option>
                ))}
              </Form.Control>
            </div>

            <div className="form-group">
              <Form.Label htmlFor="durations">Duration</Form.Label>
              <Form.Control
                id="durations"
                as="select"
                multiple
                name="durations"
                value={tourData.durations}
                onChange={handleDurationChange}
                required
              >
                {durations.map((duration) => (
                  <option key={duration._id} value={duration._id}>
                    {new Date(duration.start_date).toLocaleDateString()} -{" "}
                    {new Date(duration.end_date).toLocaleDateString()}
                  </option>
                ))}
              </Form.Control>
            </div>
          </div>

          {/* Destination and Location */}
          <div className="row-two-items">
            <div className="form-group">
              <Form.Label htmlFor="destinationId">Destination</Form.Label>
              <Form.Control
                id="destinationId"
                as="select"
                name="destinationId"
                value={tourData.destinationId}
                onChange={handleInputChange}
                required
              >
                {destinations.map((destination) => (
                  <option key={destination._id} value={destination._id}>
                    {destination.DestinationName}
                  </option>
                ))}
              </Form.Control>
            </div>

            <div className="form-group">
              <Form.Label htmlFor="locationId">Location</Form.Label>
              <Form.Control
                id="locationId"
                as="select"
                name="locationId"
                value={tourData.locationId}
                onChange={handleInputChange}
                required
              >
                {locations.map((location) => (
                  <option key={location._id} value={location._id}>
                    {location.firstname}
                  </option>
                ))}
              </Form.Control>
            </div>
          </div>

          <div className="row-one-item">
            <div className="form-group anh2">
              <Form.Label htmlFor="image">Tour Image</Form.Label>
              {preview && (
                <div>
                  <p>Current Image:</p>
                  <img
                    src={preview}
                    alt="Preview"
                    className="current-image"
                    style={{
                      width: "200px", 
                      height: "200px",
                      marginRight: "10px",
                    }}
                  />
                </div>
              )}
              <Form.Control id="image" type="file" onChange={handleImageChange} />
            </div>

            <div className="form-group">
              <Form.Label htmlFor="groupImages">Additional Images</Form.Label>
              <Form.Control
                id="groupImages"
                type="file"
                multiple
                onChange={handleGroupImageChange}
              />
              <div className="image-previews">
                {Array.isArray(groupImagePreviews) &&
                  groupImagePreviews.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt={`Group Image ${index + 1}`}
                      className="group-image-preview"
                      style={{
                        width: "100px",
                        height: "100px",
                        marginRight: "10px",
                      }}
                    />
                  ))}
              </div>
            </div>
          </div>

          <button className='buttonCreate' type="submit">Đăng Ký</button>
        </Form>
      </div>
    </Container>
  );
};

export default EditTour;
