import React, { useState } from 'react';
import './OrderStatus.css';

function TourCard({ imageSrc, title, guide, days, price, location }) {
  const [imageError, setImageError] = useState(false);

  return (
    
    <div className="tour-card">
        
      {/* Image */}
      <div className={`tour-image ${imageError ? 'image-error' : ''}`}>
        {!imageError ? (
          <img
            src={imageSrc}
            alt="Tour"
            onError={() => setImageError(true)}
          />
        ) : (
          <span>No Image Available</span>
        )}
      </div>

      {/* Tour Information */}
      <div className="tour-info">
        <p className="tour-location">
          📍 <strong>{location}</strong>
        </p>
        <h3 className="tour-title">{title}</h3>
        <p className="tour-guide">
          <strong>Hướng dẫn viên:</strong> {guide}
        </p>
        <p className="tour-days">📅 {days}</p>
        <p className="tour-price">{price} ₫</p>
      </div>
    </div>
  );
}

export default function TourGrid() {
  const tours = [
    {
      imageSrc: '/image.png',
      title: 'Tour Miền Bắc 5N4Đ: HCM - Hà Nội - Lũng Cú...',
      guide: 'Tran huu thai',
      days: '4 Ngày 3 Đêm',
      price: '10.000.000',
      location: 'Việt Nam / Vịnh Hạ Long',
    },
    {
      imageSrc: '/image.png',
      title: 'Tour Đà Lạt 3N2Đ: Thác Datanla - Hồ Xuân Hương...',
      guide: 'Nguyen Van A',
      days: '3 Ngày 2 Đêm',
      price: '8.500.000',
      location: 'Việt Nam / Đà Lạt',
    },
    {
      imageSrc: '/image.png',
      title: 'Tour Huế - Hội An - Đà Nẵng 5N4Đ...',
      guide: 'Le Thi B',
      days: '5 Ngày 4 Đêm',
      price: '12.000.000',
      location: 'Việt Nam / Hội An',
    },
  ];

  return (
    <div>

      {/* Tour History Section */}
      <section className="tour-history">
        <h2>Lịch sử đặt</h2>
        <p>Khám phá các chuyến du lịch đã từng tổ chức với những kỷ niệm đáng nhớ và hành trình thú vị.</p>
      </section>
    <div className="tour-grid">
      {tours.map((tour, index) => (
        <TourCard key={index} {...tour} />
      ))}
    </div>
    </div>
  );
}
