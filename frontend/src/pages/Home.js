import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ArrowRight, Users, Calendar, CheckCircle, Award, Play, Shield, Clock, Phone } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const [stats, setStats] = useState({
    happy_clients: 500,
    years_experience: 15,
    projects_completed: 1000,
    on_time_delivery: 98
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Initialize products first
        await axios.post(`${API}/init-products`);
        
        // Fetch stats and products
        const [statsResponse, productsResponse] = await Promise.all([
          axios.get(`${API}/stats`),
          axios.get(`${API}/products`)
        ]);
        
        setStats(statsResponse.data);
        setProducts(productsResponse.data.slice(0, 3)); // Get first 3 products
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const features = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "ISO Certified Manufacturing Processes",
      description: "Quality assured through internationally recognized standards"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Quality Assured Products",
      description: "Rigorous testing and quality control at every step"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "On-time Delivery Guarantee",
      description: "98% on-time delivery record with reliable logistics"
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "24/7 Customer Support",
      description: "Round-the-clock technical assistance and support"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517089152318-42ec560349c0"
            alt="Industrial Construction Site"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-blue-900/80"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto animate-fadeInUp">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight" data-testid="hero-title">
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                All Industries
              </span>
              <br />
              One Solution
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-slate-300 leading-relaxed" data-testid="hero-subtitle">
              Leading manufacturer of industrial products and fabrications,
              <br className="hidden md:block" />
              delivering quality solutions for construction, infrastructure, and manufacturing sectors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/products">
                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-lg px-8 py-4 group" data-testid="view-products-btn">
                  View Our Products
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/quote">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-slate-900 text-lg px-8 py-4" data-testid="get-quote-btn">
                  Get Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white" data-testid="stats-section">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center animate-fadeInUp">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2" data-testid="happy-clients-count">
                {stats.happy_clients}+
              </div>
              <div className="text-slate-600 font-medium">
                <Users className="w-5 h-5 mx-auto mb-1" />
                Happy Clients
              </div>
            </div>
            <div className="text-center animate-fadeInUp">
              <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2" data-testid="years-experience-count">
                {stats.years_experience}+
              </div>
              <div className="text-slate-600 font-medium">
                <Calendar className="w-5 h-5 mx-auto mb-1" />
                Years Experience
              </div>
            </div>
            <div className="text-center animate-fadeInUp">
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2" data-testid="projects-completed-count">
                {stats.projects_completed}+
              </div>
              <div className="text-slate-600 font-medium">
                <CheckCircle className="w-5 h-5 mx-auto mb-1" />
                Projects Completed
              </div>
            </div>
            <div className="text-center animate-fadeInUp">
              <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2" data-testid="on-time-delivery-count">
                {stats.on_time_delivery}%
              </div>
              <div className="text-slate-600 font-medium">
                <Award className="w-5 h-5 mx-auto mb-1" />
                On-time Delivery
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-slate-50" data-testid="featured-products-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Featured Products</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Discover our range of high-quality industrial products designed for durability and performance
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {products.map((product, index) => (
              <Card key={product.id} className={`hover-lift animate-fadeInUp bg-white border-0 shadow-lg`} style={{animationDelay: `${index * 0.2}s`}} data-testid={`product-card-${index}`}>
                <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover hover-scale"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold text-slate-800 mb-3">{product.name}</h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">{product.description}</p>
                  <Link to={`/products/${product.id}`}>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 group" data-testid={`learn-more-btn-${index}`}>
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/products">
              <Button size="lg" className="bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 group" data-testid="view-all-products-btn">
                View All Products
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white" data-testid="about-section">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slideInLeft">
              <h2 className="text-4xl font-bold text-slate-800 mb-6">About Sarita Industries</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                With over 15 years of experience in industrial manufacturing, Sarita Industries has 
                established itself as a trusted partner for construction and infrastructure projects across India.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4" data-testid={`feature-${index}`}>
                    <div className="text-blue-600 flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">{feature.title}</h4>
                      <p className="text-slate-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/about">
                <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 group" data-testid="learn-more-about-btn">
                  Learn More About Us
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="animate-slideInRight">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1717386255773-1e3037c81788"
                  alt="Sarita Industries Manufacturing Facility"
                  className="w-full rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent rounded-2xl"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="text-3xl font-bold mb-1">{stats.years_experience}+</div>
                  <div className="text-sm opacity-90">Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white" data-testid="cta-section">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto animate-fadeInUp">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-xl mb-8 opacity-90">
              Get in touch with our experts for custom solutions tailored to your industrial needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/quote">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-lg px-8 py-4 group" data-testid="get-free-quote-btn">
                  Get Free Quote
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/products">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4" data-testid="browse-products-btn">
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;