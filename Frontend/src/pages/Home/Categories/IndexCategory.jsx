import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import { Col, Container, Row } from 'react-bootstrap';
import Cards from '../../../components/Cards/Cards';
import { Link } from 'react-router-dom';

const IndexCategory = () => {
  const { destinationId, tourId } = useParams(); // Get both destinationId and tourId
  const [destination, setDestination] = useState(null);
  const [tour, setTour] = useState(null);

  useEffect(() => {
    document.title = "Destinations & Tour Details";
    window.scroll(0, 0);

    const fetchDestinationData = async () => {
      try {
        // Fetch the destination data
        const response = await fetch(`http://localhost:8001/api/destination/${destinationId}`);
        const data = await response.json();
        setDestination(data);
        
        // If tourId is present, fetch the specific tour
        if (tourId) {
          const tourResponse = await fetch(`http://localhost:8001/api/destination/${destinationId}/tour/${tourId}`);
          const tourData = await tourResponse.json();
          setTour(tourData);
        }
      } catch (error) {
        console.error("Error fetching destination or tour:", error);
      }
    };

    fetchDestinationData();
  }, [destinationId, tourId]);

  if (!destination) return <div>Loading...</div>;

  return (
    <>
      <Breadcrumbs title={destination.DestinationName} pagename="Destinations" />
      
      <section className="py-5">
        <Container>
          <Row>
            {tour ? (
              <div>
                <h3>{tour.TourName}</h3>
                <p>{tour.TourDescription}</p>
                {/* Display specific tour details here */}
              </div>
            ) : (
              <>
                <h3>{destination.DestinationName}</h3>
                {/* Display all tour packages for this destination */}
                <Row>
                  {destination.tourPackages && destination.tourPackages.length > 0 ? (
                    destination.tourPackages.map((tourPackageId) => (
                      <Col md="4" sm="6" key={tourPackageId} className="pb-4">
                        <Link to={`/destinations/${destination._id}/tour/${tourPackageId}`} className="text-decoration-none">
                          <Cards destination={{ _id: tourPackageId }} />
                        </Link>
                      </Col>
                    ))
                  ) : (
                    <div>No tours available for this destination.</div>
                  )}
                </Row>
              </>
            )}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default IndexCategory;
