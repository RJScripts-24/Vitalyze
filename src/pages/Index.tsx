import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import { Link } from "react-router-dom";
import { Heart, Shield, Brain, TrendingUp } from "lucide-react";

import heroVideo from '@/assets/video.mp4';

function VideoBackground() {
  return (
    <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
      <source src={heroVideo} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

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
        {/* Use imported video so Vite resolves asset path in production */}
        <VideoBackground />
        
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
            <h3 className="text-xl font-semibold mb-4">About us</h3>
            <div className="mt-2">
              <a
                href="https://github.com/RJScripts-24/Vitalyze"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:underline"
              >
                {/* GitHub icon (inline SVG) */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden>
                  <path d="M12 .5C5.73.5.75 5.48.75 11.78c0 4.94 3.2 9.12 7.64 10.59.56.1.77-.24.77-.54 0-.27-.01-1-.02-1.95-3.11.68-3.77-1.5-3.77-1.5-.51-1.29-1.25-1.63-1.25-1.63-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .17 1.57.96 1.57.96.99 1.7 2.6 1.21 3.24.92.1-.72.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.43-2.21 1.14-2.99-.12-.28-.5-1.41.11-2.95 0 0 .93-.3 3.05 1.13a10.57 10.57 0 0 1 2.78-.38c.94.01 1.89.13 2.78.38 2.12-1.43 3.05-1.13 3.05-1.13.61 1.54.23 2.67.12 2.95.71.78 1.14 1.77 1.14 2.99 0 4.29-2.62 5.24-5.11 5.52.4.35.75 1.04.75 2.1 0 1.52-.01 2.75-.01 3.12 0 .3.2.65.78.54C19.05 20.9 22.25 16.72 22.25 11.78 22.25 5.48 17.27.5 12 .5z" />
                </svg>
                <span>Github</span>
              </a>
            </div>
            <div className="mt-2">
              <a
                href="https://www.linkedin.com/in/rishabh-kumar-jha-8b5761325/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:underline"
              >
                {/* LinkedIn icon (inline SVG) */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.036-1.848-3.036-1.848 0-2.131 1.445-2.131 2.938v5.667H9.357V9h3.414v1.561h.049c.476-.9 1.637-1.848 3.369-1.848 3.602 0 4.27 2.37 4.27 5.456v6.283zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM6.627 20.452H4.047V9h2.58v11.452z" />
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>
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