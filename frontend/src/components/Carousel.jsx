import styled from 'styled-components';

const HomepageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #1E201E;
  min-height: 100vh;
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: 2rem;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 1rem;
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 2rem;
`;

const CallToActionButton = styled.button`
  padding: 0.75rem 2rem;
  font-size: 1.25rem;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
  }
`;

const FeaturesSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
`;

const FeatureCard = styled.div`
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  max-width: 300px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: #666;
`;

const Homepage = () => {
  return (
    <HomepageContainer>
      <HeroSection>
        <HeroTitle>Welcome to Serenity Hotel</HeroTitle>
        <HeroSubtitle>
          Experience luxury and comfort at our hotel, your home away from home.
        </HeroSubtitle>
        <CallToActionButton>Book Your Stay</CallToActionButton>
      </HeroSection>

      <FeaturesSection>
        <FeatureCard>
          <FeatureTitle>Deluxe Rooms</FeatureTitle>
          <FeatureDescription>
            Our spacious deluxe rooms offer stunning views and top-notch amenities for a relaxing stay.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureTitle>Gourmet Dining</FeatureTitle>
          <FeatureDescription>
            Indulge in gourmet cuisine at our award-winning restaurants, offering a variety of flavors.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureTitle>Spa & Wellness</FeatureTitle>
          <FeatureDescription>
            Unwind with our luxury spa treatments and wellness programs designed for your relaxation.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureTitle>Event Spaces</FeatureTitle>
          <FeatureDescription>
            Host your events in our elegant venues, perfect for weddings, conferences, and more.
          </FeatureDescription>
        </FeatureCard>
      </FeaturesSection>
    </HomepageContainer>
  );
};

export default Homepage;
