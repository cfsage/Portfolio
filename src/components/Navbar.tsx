
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Home, User, Briefcase, MessageSquare, Star, FileText, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', icon: <Home className="h-4 w-4 mr-1" /> },
    { name: 'About', href: '#about', icon: <User className="h-4 w-4 mr-1" /> },
    { name: 'Portfolio', href: '#portfolio', icon: <Briefcase className="h-4 w-4 mr-1" /> },
    { name: 'Services', href: '#services', icon: <FileText className="h-4 w-4 mr-1" /> },
    { name: 'Testimonials', href: '#testimonials', icon: <Star className="h-4 w-4 mr-1" /> },
    { name: 'Contact', href: '#contact', icon: <MessageSquare className="h-4 w-4 mr-1" /> },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          <a href="#home" className="text-2xl font-bold gradient-text">Portfolio</a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                className="px-3 py-2 rounded-md hover:bg-accent/20 text-foreground hover-underline flex items-center"
              >
                {link.icon}
                {link.name}
              </a>
            ))}
            <Button asChild className="ml-4">
              <a href="#contact">Get Quotes</a>
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-md hover:bg-accent/20"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background shadow-md rounded-lg mt-2 animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 rounded-md hover:bg-accent/20 flex items-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.icon}
                  {link.name}
                </a>
              ))}
              // In the mobile menu:
              <Button asChild className="w-full mt-3">
                <a href="#contact">Get Quotes</a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
