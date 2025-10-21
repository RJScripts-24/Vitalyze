import { Button } from "./ui/button";
// Heart icon SVG inline to avoid import issues
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  return (
    <nav className="relative bg-white shadow-sm">
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}> 
            <img
              src="/assests/logo.png"
              alt="Vitalyze Logo"
              className="h-[150px] object-contain"
            />
          </div>

          {/* Login Button */}
          <Button
            variant="secondary"
            onClick={() => navigate('/signin')}
            className="text-white hover:shadow-glow px-8 py-6 rounded-full font-semibold transition-colors duration-300"
            style={{ background: '#F7CB05' }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#52F705'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#F7CB05'}
          >
            Login/Sign up
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
