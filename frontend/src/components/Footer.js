import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-3 py-2 rounded-lg font-bold text-lg">
                SI
              </div>
              <div>
                <h3 className="text-xl font-bold">Sarita Industries</h3>
                <p className="text-sm text-slate-400">One industry, All solutions</p>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Leading manufacturer of industrial products and fabrications, delivering quality solutions for construction, infrastructure, and manufacturing sectors.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors" data-testid="facebook-link">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors" data-testid="twitter-link">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors" data-testid="linkedin-link">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors" data-testid="instagram-link">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-orange-400">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-slate-300 hover:text-white transition-colors" data-testid="footer-home">
                Home
              </Link>
              <Link to="/products" className="text-slate-300 hover:text-white transition-colors" data-testid="footer-products">
                Products
              </Link>
              <Link to="/about" className="text-slate-300 hover:text-white transition-colors" data-testid="footer-about">
                About Us
              </Link>
              <Link to="/contact" className="text-slate-300 hover:text-white transition-colors" data-testid="footer-contact">
                Contact
              </Link>
              <Link to="/quote" className="text-slate-300 hover:text-white transition-colors" data-testid="footer-quote">
                Get Quote
              </Link>
            </nav>
          </div>

          {/* Products & Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-orange-400">Our Products</h4>
            <nav className="flex flex-col space-y-2">
              <a href="#" className="text-slate-300 hover:text-white transition-colors" data-testid="footer-puddle-flanges">
                Puddle Flanges
              </a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors" data-testid="footer-concrete-buckets">
                Concrete Buckets
              </a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors" data-testid="footer-scaffolding-planks">
                Scaffolding Planks
              </a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors" data-testid="footer-custom-fabrication">
                Custom Fabrication
              </a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors" data-testid="footer-industrial-equipment">
                Industrial Equipment
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-orange-400">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3" data-testid="footer-address">
                <MapPin className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-slate-300">Sarita  Industries</p>
                  <p className="text-slate-300">Nigdi, Talewade , Gat no:90</p>
                  <p className="text-slate-300">Pune, Maharashtra-412101</p>
                </div>
              </div>
              <div className="flex items-center space-x-3" data-testid="footer-phone">
                <Phone className="w-5 h-5 text-orange-400" />
                <span className="text-slate-300">+91-9822681093</span>
              </div>
              <div className="flex items-center space-x-3" data-testid="footer-email">
                <Mail className="w-5 h-5 text-orange-400" />
                <span className="text-slate-300">saritaindustries2009@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3" data-testid="footer-hours">
                <Clock className="w-5 h-5 text-orange-400" />
                <span className="text-slate-300">Mon - Sat: 9:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-slate-400 text-sm" data-testid="copyright">
              © 2024 Sarita Industries. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors" data-testid="privacy-policy">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors" data-testid="terms-service">
                Terms of Service
              </a>
              <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors" data-testid="quality-policy">
                Quality Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;