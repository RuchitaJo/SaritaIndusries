import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(`${API}/contact`, formData);
      toast.success('Thank you! Your message has been sent successfully. We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Sorry, there was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Our Office",
      details: [
        "Sarita Industries",
        "GAT No 90,Nigdi Talwade",
        "Pune Maharashtra-411062, India"
      ],
      color: "text-blue-600"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      details: [
        "+91-9822681093",
        
      ],
      color: "text-green-600"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: [
        "saritaindustries2009@gmail.com",
        
        
      ],
      color: "text-orange-500"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      details: [
        "Monday - Friday: 9:00 AM - 6:00 PM",
        "Saturday: 9:00 AM - 2:00 PM",
        "Sunday: Closed"
      ],
      color: "text-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center animate-fadeInUp">
            <h1 className="text-5xl font-bold mb-4" data-testid="contact-title">Contact Us</h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Get in touch with our team for inquiries, quotes, or support. We're here to help 
              you find the perfect industrial solutions for your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" data-testid="contact-info">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center p-6 hover-lift animate-fadeInUp bg-white border-0 shadow-lg" style={{animationDelay: `${index * 0.1}s`}} data-testid={`contact-info-${index}`}>
                <CardContent className="p-0">
                  <div className={`${info.color} mb-4 flex justify-center`}>
                    {info.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">{info.title}</h3>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-slate-600 text-sm">{detail}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-slideInLeft">
              <Card className="p-8 bg-white border-0 shadow-lg">
                <CardContent className="p-0">
                  <h2 className="text-3xl font-bold text-slate-800 mb-6">Send us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          className="h-12"
                          data-testid="contact-name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                          className="h-12"
                          data-testid="contact-email"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                          className="h-12"
                          data-testid="contact-phone"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                          Subject *
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          required
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="Message subject"
                          className="h-12"
                          data-testid="contact-subject"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your requirements or questions..."
                        rows={6}
                        data-testid="contact-message"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 h-12 text-lg"
                      data-testid="contact-submit"
                    >
                      {isSubmitting ? (
                        <div className="loading-spinner mr-2"></div>
                      ) : (
                        <Send className="mr-2 w-5 h-5" />
                      )}
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>

                    <p className="text-sm text-slate-600 text-center">
                      * Required fields. We'll respond within 24 hours.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Map & Additional Info */}
            <div className="animate-slideInRight space-y-8">
              {/* Map Placeholder */}
              <Card className="p-0 overflow-hidden bg-white border-0 shadow-lg">
                <div className="aspect-[4/3] bg-slate-200 flex items-center justify-center relative">
                  <img
                    src="https://images.unsplash.com/photo-1455165814004-1126a7199f9b"
                    alt="Manufacturing Location"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end">
                    <div className="p-6 text-white">
                      <h3 className="text-xl font-semibold mb-2">Our Manufacturing Facility</h3>
                      <p className="text-slate-200">State-of-the-art manufacturing facility in Gurgaon, Haryana</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quick Response Card */}
              <Card className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0 shadow-lg">
                <CardContent className="p-0">
                  <h3 className="text-xl font-semibold mb-4">Quick Response Guarantee</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                      <span>Email responses within 2 hours</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                      <span>Phone support during business hours</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                      <span>Quote delivery within 24 hours</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                      <span>Site visits available on request</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card className="p-6 bg-white border-0 shadow-lg border-l-4 border-l-orange-500">
                <CardContent className="p-0">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Emergency Support</h3>
                  <p className="text-slate-600 mb-3">
                    For urgent manufacturing issues or emergency orders:
                  </p>
                  <div className="flex items-center text-orange-600 font-semibold">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>+91-9284593331 (24/7 Emergency Line)</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Quick answers to common questions about our services and processes
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto" data-testid="faq-section">
            {[
              {
                question: "What is your typical delivery time?",
                answer: "Standard products are delivered within 7-14 days. Custom fabrications may take 2-4 weeks depending on complexity."
              },
              {
                question: "Do you provide installation services?",
                answer: "Yes, we offer professional installation services for all our products with trained technicians."
              },
              {
                question: "What quality certifications do you have?",
                answer: "We are ISO 9001:2015 certified and all our products meet relevant Indian and international standards."
              },
              {
                question: "Can you handle large-scale projects?",
                answer: "Absolutely! We have successfully completed projects ranging from small orders to large infrastructure developments."
              }
            ].map((faq, index) => (
              <Card key={index} className="p-6 hover-lift animate-fadeInUp bg-white border-0 shadow-lg" style={{animationDelay: `${index * 0.1}s`}} data-testid={`faq-${index}`}>
                <CardContent className="p-0">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">{faq.question}</h3>
                  <p className="text-slate-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;