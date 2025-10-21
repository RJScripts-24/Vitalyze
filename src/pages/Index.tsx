import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import { Link } from "react-router-dom";
import { Heart, Shield, Brain, TrendingUp } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      
      {/* Spacer */}
      <div className="h-10 bg-background"></div>
      
      {/* Video Background Section */}
      <section className="relative h-[600px] overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/src/assets/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Transform Your Healthcare Journey
            </h2>
            <p className="text-xl sm:text-2xl text-white/90 mb-8">
              Experience the future of preventive healthcare with our AI-powered platform
            </p>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Advanced Health Risk Detection
            </h2>
            <p className="text-xl text-muted-foreground">
              Powered by cutting-edge AI technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Multi-Disease Screening</h3>
              <p className="text-muted-foreground">Comprehensive analysis for diabetes, heart disease, and more</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">AI-Powered Insights</h3>
              <p className="text-muted-foreground">Machine learning models trained on millions of health records</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Privacy Protected</h3>
              <p className="text-muted-foreground">Your health data is encrypted and completely secure</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Track Your Progress</h3>
              <p className="text-muted-foreground">Monitor your health journey with comprehensive tracking</p>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 px-4 bg-accent/5">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Early Detection Saves Lives
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Our advanced predictive models help identify potential health risks before they become serious. 
            Get personalized recommendations and take control of your health journey today.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">95%</div>
              <p className="text-muted-foreground">Prediction Accuracy</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">10K+</div>
              <p className="text-muted-foreground">Screenings Completed</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">24/7</div>
              <p className="text-muted-foreground">Available Access</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Footer: Info Columns */}
      <section className="py-12 px-4 bg-[#1AA9C9] text-white mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* About Us */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              <a href="#hero" className="hover:underline">About us</a>
            </h3>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/signin" className="hover:underline">Sign In</Link>
              </li>
              <li>
                <Link to="/signup" className="hover:underline">Sign Up</Link>
              </li>
              <li>
                <Link to="/" className="hover:underline">Landing Page</Link>
              </li>
            </ul>
          </div>
          {/* Contact Us */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact us</h3>
            <ul className="space-y-2">
              <li>
                <a href="tel:7634847354" className="hover:underline">Phone: 7634847354</a>
              </li>
              <li>
                <a href="mailto:rkj242004@gmail.com" className="hover:underline">Email: rkj242004@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 Rishabh Kumar Jha Productions. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;