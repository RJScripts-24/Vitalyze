import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
  <section id="hero" className="relative min-h-screen flex items-center overflow-hidden p-0 m-0 bg-background">
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left: Text */}
          <div className="py-16 md:py-24 md:pr-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in text-left">
              <span style={{ color: '#0099FF' }}>A </span>
              <span style={{ color: '#005CBF' }}>professional </span>
              <span style={{ color: '#76D75A' }}>and friendly </span>
              <span style={{ color: '#FFB700' }}>care </span>
              <span style={{ color: '#4A4A4A' }}>provider.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-medium animate-fade-in mb-8 text-left">
              Where One Prediction Can Save a Life...
            </p>
            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in justify-start">
              <Button
                size="lg"
                className="text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ background: '#F7CB05' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#52F705')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#F7CB05')}
                onClick={() => navigate('/signup')}
              >
                Get Started
              </Button>
              <Button
                onClick={() => navigate('/signin')}
                variant="outline"
                size="lg"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300"
              >
                Sign In
              </Button>
            </div>
          </div>

          {/* Right: Video */}
          <div className="w-full flex justify-center md:justify-end">
            <video
              src="/assests/vd.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full max-w-xl h-auto rounded-xl object-contain bg-black/5"
              style={{ maxHeight: '70vh' }}
            />
          </div>
      </div>
    </section>
  );
};

export default HeroSection;
