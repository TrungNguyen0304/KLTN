import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Form } from "react-bootstrap";
import "./CreateTour.css"; // Import the same CSS file

const EditTour = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tourData, setTourData] = useState({
    durations: [],
  });

  const [image, setImage] = useState(null);
  const [groupImages, setGroupImages] = useState([]);
  const [preview, setPreview] = useState(null);
  const [groupImagePreviews, setGroupImagePreviews] = useState([]);
  const [durations, setDurations] = useState([]); // Array of durations
  const [destinations, setDestinations] = useState([]);
  const [tourGuides, setTourGuides] = useState([]);
  const [userGuides, setUserGuides] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationId, setLocationId] = useState('');
  const [destinationId, setDestinationId] = useState('');
  const [tourGuideId, setTourGuideId] = useState('');
  const [userGuideId, setUserGuideId] = useState('');
  const [description, setDescription] = useState('');
  const [package_name, setPackage_name] = useState('');
  const [adult_price, setAdult_price] = useState('');
  const [pricechildren_price, setPricechildren_price] = useState('');
  const [incAndExc, setIncAndExc] = useState('');

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const response = await axios.post(
          `http://localhost:8001/api/tourPackage/${id}`
        );
        const data = response.data;
        console.log(data.userGuideId);
        setPreview(response.data.image);
        setGroupImagePreviews(response.data.groupImages || []);
        setLocationId(data.locationId ? data.locationId._id : '');
        setDestinationId(data.destinationId ? data.destinationId._id : '');
        setTourGuideId(data.tourGuideId ? data.tourGuideId._id : '');
        setUserGuideId(data.userGuideId ? data.userGuideId._id : '');  
        setDescription(data.description);
        setPackage_name(data.package_name);
        setAdult_price(data.adult_price);
        setPricechildren_price(data.pricechildren_price);
        setIncAndExc(data.incAndExc);
        setTourData((prevState) => ({
          ...prevState,
          durations: data.durations.map((duration) => duration._id),
        }));
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

        const userGuidesRes = await axios.get(
          "http://localhost:8001/api/user"
        );
        setUserGuides(userGuidesRes.data);

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
    formData.append("package_name", package_name);
    formData.append("description", description);
    formData.append("adult_price", adult_price);
    formData.append("pricechildren_price", pricechildren_price);
    formData.append("durations", JSON.stringify(tourData.durations)); // Convert durations to string
    formData.append("destinationId", destinationId);
    formData.append("tourGuideId", tourGuideId);
    formData.append("userGuideId", userGuideId);
    formData.append("locationId", locationId);
    formData.append("incAndExc", incAndExc);

    // Handling image upload
    if (image) formData.append("image", image);

    // Handling additional group images
    groupImages.forEach((img) => formData.append("groupImages", img));

    try {
      const response = await axios.put(
        `http://localhost:8001/api/tourPackage/update/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Ensure the correct header for file uploads
          }
        }
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
              <textarea
                rows="2"
                id="package_name"
                type="text"
                name="package_name"
                value={package_name}
                onChange={(e) => setPackage_name(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <Form.Label htmlFor="price">Giá người lớn</Form.Label>
              <Form.Control
                id="adult_price"
                type="number"
                name="adult_price"
                value={adult_price}
                onChange={(e) => setAdult_price(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <Form.Label htmlFor="price">Giá trẻ em</Form.Label>
              <Form.Control
                id="pricechildren_price"
                type="number"
                name="pricechildren_price"
                value={pricechildren_price}
                onChange={(e) => setPricechildren_price(e.target.value)}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                value={incAndExc}
                onChange={(e) => setIncAndExc(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Tour Guide and Duration */}
          <div className="row-two-items">
            <div className="form-group">
              <Form.Label htmlFor="tourGuideId">Tour Guide</Form.Label>
              <select
                id="tourGuideId"
                value={tourGuideId}
                onChange={(e) => setTourGuideId(e.target.value)}
                required
              >
                {tourGuides.map((guide) => (
                  <option key={guide._id} value={guide._id}>
                    {guide.first_name} {guide.last_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <Form.Label htmlFor="userGuideId">Hướng dẫn viên User</Form.Label>
              <select
                id="userGuideId"
                value={userGuideId}
                onChange={(e) => setUserGuideId(e.target.value)}
                required
              >
                {userGuides
                  .filter((userGuide) => userGuide.role === 'tourguide')
                  .map((userGuide) => (
                    <option key={userGuide._id} value={userGuide._id}>
                      {userGuide.firstname} {userGuide.lastname}
                    </option>
                  ))}
              </select>
            </div>

            <div className="form-group">
              <Form.Label htmlFor="durations">Duration</Form.Label>
              <Form.Control
                id="durations"
                as="select"
                multiple
                name="durations"
                value={tourData.durations} // Ensure this value is correctly set
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
              <select
                id="destinationId"
                value={destinationId}
                onChange={(e) => setDestinationId(e.target.value)}
                required
              >
                {destinations.map((destination) => (
                  <option key={destination._id} value={destination._id}>
                    {destination.DestinationName}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="locationId">Tỉnh/Thành Phố</label>
              <select
                id="locationId"
                value={locationId}
                onChange={(e) => setLocationId(e.target.value)}
                required
              >
                <option value="" disabled>Chọn...</option>
                {locations.map(location => (
                  <option key={location._id} value={location._id}>
                    {location.firstname}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Image Upload */}
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
