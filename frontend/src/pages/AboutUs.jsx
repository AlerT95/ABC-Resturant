import  { useState } from 'react';
import imgLogo from "../assets/images/logo.png";
import imgFounder from '../assets/founder.jpg';
import imgRestaurant from '../assets/restaurant.jpg';
import imgCuisine from '../assets/cuisine.jpg';
import imgServices from '../assets/service.png';
import imgMission from '../assets/mission.jpg';
import imgVision from '../assets/vision.avif';

const AboutUs = () => {
  const [hovered, setHovered] = useState(null);

  const handleMouseEnter = (index) => setHovered(index);
  const handleMouseLeave = () => setHovered(null);

  const cardStyle = (isHovered) => ({
    transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
    overflow: 'hidden',
    borderRadius: '12px',
    border: '1px solid #000',
    boxShadow: isHovered ? '0 10px 20px rgba(0, 0, 0, 0.2)' : '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: isHovered ? '#000' : '#DFD3C3', // Light grey on hover
  });

  const imgStyle = (isHovered) => ({
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
    transform: isHovered ? 'scale(1.1)' : 'scale(1)', // Zoom effect
  });

  return (
    <div className="container my-5">
      {/* Start page title */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">About Us</h1>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb justify-content-center">
            <li className="breadcrumb-item"><a href="javascript: void(0);" className="text-decoration-none">ABC Restaurant</a></li>
            <li className="breadcrumb-item active" aria-current="page">About Us</li>
          </ol>
        </nav>
      </div>
      {/* End page title */}

      {/* Our Story */}
      <div className="text-center mb-5">
        <h2 className="fw-bold">Our Story</h2>
        <p className="text-muted mt-3 mx-auto" style={{ maxWidth: '600px' }}>
          Since 1996, ABC Restaurant has been serving the community with a passion for food and a commitment to excellence.
        </p>
        <img src={imgLogo} alt="ABC Restaurant Logo" className="img-fluid rounded shadow-sm mt-4" style={{ maxWidth: '200px' }} />
      </div>

      {/* Our Values */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {[
          { img: imgFounder, title: "Our Founder", text: "Meet our founder, who has been instrumental in shaping the culinary journey of ABC Restaurant." },
          { img: imgRestaurant, title: "Our Restaurant", text: "Our restaurant is designed to provide a warm and inviting atmosphere, perfect for a night out with family and friends." },
          { img: imgCuisine, title: "Our Cuisine", text: "We offer a diverse range of cuisines, from traditional favorites to international flavors, catering to all tastes and preferences." },
          { img: imgServices, title: "Our Services", text: "We provide a range of services, including catering, takeout, and delivery, to make your dining experience convenient and enjoyable." },
          { img: imgMission, title: "Our Mission", text: "Our mission is to provide exceptional food, outstanding service, and a memorable dining experience that exceeds our customers' expectations." },
          { img: imgVision, title: "Our Vision", text: "Our vision is to be the leading restaurant in the community, known for our commitment to quality, innovation, and customer satisfaction." }
        ].map((item, index) => (
          <div className="col-md-4" key={index}>
            <div
              className="card"
              style={cardStyle(hovered === index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={item.img}
                alt={item.title}
                style={imgStyle(hovered === index)}
              />
              <div className="card-body" style={{ padding: '20px' }}>
                <h5 className="card-title fw-bold">{item.title}</h5>
                <p className="card-text text-muted">{item.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
