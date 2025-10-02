import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Award, Users, Calendar, CheckCircle, Target, Eye, Heart, ArrowRight, Phone } from 'lucide-react';

const About = () => {
  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      number: "500+",
      label: "Happy Clients",
      color: "text-blue-600"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      number: "15+",
      label: "Years Experience",
      color: "text-orange-500"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      number: "1000+",
      label: "Projects Completed",
      color: "text-green-600"
    },
    {
      icon: <Award className="w-8 h-8" />,
      number: "98%",
      label: "On-time Delivery",
      color: "text-purple-600"
    }
  ];

  const values = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Quality Excellence",
      description: "We maintain the highest standards in manufacturing with ISO certified processes and rigorous quality control at every step."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Customer Focus",
      description: "Our customers are at the heart of everything we do. We build lasting relationships through exceptional service and support."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Integrity",
      description: "We conduct business with honesty, transparency, and ethical practices, building trust with every interaction."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Innovation",
      description: "We continuously invest in new technologies and methods to deliver cutting-edge solutions for our clients."
    }
  ];

  const milestones = [
    {
      year: "2009",
      title: "Company Founded",
      description: "Sarita Industries was established with a vision to provide quality industrial solutions."
    },
    {
      year: "2012",
      title: "ISO Certification",
      description: "Achieved ISO 9001:2015 certification for quality management systems."
    },
    {
      year: "2016",
      title: "Expansion",
      description: "Expanded operations with a new manufacturing facility and increased production capacity."
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description: "Implemented advanced manufacturing technologies and digital quality control systems."
    },
    {
      year: "2024",
      title: "Market Leadership",
      description: "Established as a leading manufacturer with over 500 satisfied clients across India."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-800 to-slate-900 text-white py-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1717386255773-1e3037c81788"
            alt="Manufacturing Facility"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center animate-fadeInUp">
            <h1 className="text-5xl font-bold mb-6" data-testid="about-title">About Sarita Industries</h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              With over 15 years of experience in industrial manufacturing, we have established 
              ourselves as a trusted partner for construction and infrastructure projects across India.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8" data-testid="stats-section">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fadeInUp" style={{animationDelay: `${index * 0.1}s`}} data-testid={`stat-${index}`}>
                <div className={`${stat.color} mb-4 flex justify-center`}>
                  {stat.icon}
                </div>
                <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                  {stat.number}
                </div>
                <div className="text-slate-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="p-8 hover-lift animate-slideInLeft bg-white border-0 shadow-lg" data-testid="mission-card">
              <CardContent className="p-0">
                <div className="flex items-center mb-6">
                  <Target className="w-8 h-8 text-blue-600 mr-4" />
                  <h2 className="text-3xl font-bold text-slate-800">Our Mission</h2>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed">
                  To be the leading manufacturer of industrial products and fabrications, 
                  delivering innovative, high-quality solutions that exceed customer expectations 
                  while maintaining sustainable business practices and contributing to India's 
                  industrial growth.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 hover-lift animate-slideInRight bg-white border-0 shadow-lg" data-testid="vision-card">
              <CardContent className="p-0">
                <div className="flex items-center mb-6">
                  <Eye className="w-8 h-8 text-orange-500 mr-4" />
                  <h2 className="text-3xl font-bold text-slate-800">Our Vision</h2>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed">
                  To transform the industrial manufacturing landscape through continuous 
                  innovation, cutting-edge technology, and unwavering commitment to quality, 
                  becoming the most trusted partner for construction and infrastructure 
                  projects nationwide.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Our Core Values</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              The principles that guide everything we do and shape our company culture
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-6 text-center hover-lift animate-fadeInUp bg-white border-0 shadow-lg" style={{animationDelay: `${index * 0.1}s`}} data-testid={`value-${index}`}>
                <CardContent className="p-0">
                  <div className="text-blue-600 mb-4 flex justify-center">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">{value.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Our Journey</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Key milestones that have shaped our growth and success over the years
            </p>
          </div>

          <div className="max-w-4xl mx-auto" data-testid="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className={`flex items-center mb-12 animate-fadeInUp ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`} style={{animationDelay: `${index * 0.2}s`}} data-testid={`milestone-${index}`}>
                <div className="flex-1">
                  <Card className={`p-6 hover-lift bg-white border-0 shadow-lg ${index % 2 === 0 ? 'mr-8' : 'ml-8'}`}>
                    <CardContent className="p-0">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-2">{milestone.title}</h3>
                      <p className="text-slate-600">{milestone.description}</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="w-4 h-4 bg-orange-500 rounded-full border-4 border-white shadow-lg flex-shrink-0 z-10"></div>
                <div className="flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Why Choose Sarita Industries?</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Experience the difference that comes with working with industry leaders
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slideInLeft">
              <img
                src="https://images.unsplash.com/photo-1647427060118-4911c9821b82"
                alt="Manufacturing Process"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>

            <div className="animate-slideInRight space-y-6">
              <div className="flex items-start space-x-4" data-testid="expertise">
                <div className="text-blue-600 flex-shrink-0 mt-1">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Industry Expertise</h3>
                  <p className="text-slate-600">Over 15 years of specialized experience in industrial manufacturing and fabrication.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4" data-testid="quality-assurance">
                <div className="text-orange-500 flex-shrink-0 mt-1">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Quality Assurance</h3>
                  <p className="text-slate-600">ISO 9001:2015 certified processes ensure consistent quality in every product we deliver.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4" data-testid="customer-service">
                <div className="text-green-600 flex-shrink-0 mt-1">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Customer-Centric Approach</h3>
                  <p className="text-slate-600">Dedicated support team and customized solutions tailored to your specific requirements.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4" data-testid="reliability">
                <div className="text-purple-600 flex-shrink-0 mt-1">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Proven Reliability</h3>
                  <p className="text-slate-600">98% on-time delivery record with over 1000 successfully completed projects.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto animate-fadeInUp">
            <h2 className="text-4xl font-bold mb-6">Ready to Work With Us?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join hundreds of satisfied clients who trust Sarita Industries for their industrial needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/quote">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-lg px-8 py-4 group" data-testid="get-started-btn">
                  Get Started Today
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4" data-testid="contact-us-btn">
                  <Phone className="mr-2 w-5 h-5" />
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;