import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Calculator, FileText, Clock, CheckCircle, Phone, Mail } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Quote = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    product_interest: '',
    message: ''
  });
  const [products, setProducts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Initialize products first
        await axios.post(`${API}/init-products`);
        const response = await axios.get(`${API}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({
      ...prev,
      product_interest: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(`${API}/quotes`, formData);
      toast.success('Quote request submitted successfully! We\'ll get back to you within 24 hours with a detailed quote.');
      setStep(3); // Success step
    } catch (error) {
      console.error('Error submitting quote request:', error);
      toast.error('Sorry, there was an error submitting your quote request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.company) {
        toast.error('Please fill in all required fields.');
        return;
      }
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      product_interest: '',
      message: ''
    });
    setStep(1);
  };

  const features = [
    {
      icon: <Calculator className="w-8 h-8" />,
      title: "Accurate Pricing",
      description: "Detailed cost breakdown with transparent pricing for all components and services."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Quick Turnaround",
      description: "Receive a comprehensive quote within 24 hours of submitting your request."
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Detailed Specifications",
      description: "Complete technical specifications and installation requirements included."
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "No Obligation",
      description: "Free quote with no strings attached. Compare and decide at your own pace."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center animate-fadeInUp">
            <h1 className="text-5xl font-bold mb-4" data-testid="quote-title">Request a Quote</h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Get a detailed, customized quote for your industrial needs. Our experts will provide 
              comprehensive pricing and technical specifications within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" data-testid="quote-features">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 hover-lift animate-fadeInUp bg-white border-0 shadow-lg" style={{animationDelay: `${index * 0.1}s`}} data-testid={`quote-feature-${index}`}>
                <CardContent className="p-0">
                  <div className="text-blue-600 mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {step < 3 && (
              <div className="mb-8">
                <div className="flex items-center justify-center space-x-4 mb-4" data-testid="progress-indicator">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-300 text-slate-600'
                  }`}>
                    1
                  </div>
                  <div className={`w-16 h-1 ${
                    step >= 2 ? 'bg-blue-600' : 'bg-slate-300'
                  }`}></div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-300 text-slate-600'
                  }`}>
                    2
                  </div>
                </div>
                <div className="text-center text-slate-600">
                  Step {step} of 2: {step === 1 ? 'Basic Information' : 'Project Details'}
                </div>
              </div>
            )}

            <Card className="p-8 bg-white border-0 shadow-lg">
              <CardContent className="p-0">
                {step === 1 && (
                  <div className="animate-fadeInUp">
                    <h2 className="text-3xl font-bold text-slate-800 mb-6">Basic Information</h2>
                    <div className="space-y-6">
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
                            data-testid="quote-name"
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
                            data-testid="quote-email"
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
                            data-testid="quote-phone"
                          />
                        </div>
                        <div>
                          <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">
                            Company Name *
                          </label>
                          <Input
                            id="company"
                            name="company"
                            type="text"
                            required
                            value={formData.company}
                            onChange={handleInputChange}
                            placeholder="Enter your company name"
                            className="h-12"
                            data-testid="quote-company"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button
                          onClick={handleNext}
                          size="lg"
                          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-8"
                          data-testid="quote-next-btn"
                        >
                          Next Step
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="animate-fadeInUp">
                    <h2 className="text-3xl font-bold text-slate-800 mb-6">Project Details</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="product_interest" className="block text-sm font-medium text-slate-700 mb-2">
                          Product Interest
                        </label>
                        <Select onValueChange={handleSelectChange} data-testid="quote-product-select">
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select a product category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="custom">Custom Fabrication</SelectItem>
                            {products.map((product) => (
                              <SelectItem key={product.id} value={product.name}>
                                {product.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                          Project Requirements *
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          required
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Please describe your project requirements, quantities, specifications, timeline, and any other relevant details..."
                          rows={8}
                          data-testid="quote-message"
                        />
                      </div>

                      <div className="flex justify-between">
                        <Button
                          type="button"
                          onClick={handleBack}
                          variant="outline"
                          size="lg"
                          className="px-8"
                          data-testid="quote-back-btn"
                        >
                          Back
                        </Button>
                        <Button
                          type="submit"
                          size="lg"
                          disabled={isSubmitting}
                          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 px-8"
                          data-testid="quote-submit-btn"
                        >
                          {isSubmitting ? (
                            <div className="loading-spinner mr-2"></div>
                          ) : (
                            <FileText className="mr-2 w-5 h-5" />
                          )}
                          {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
                        </Button>
                      </div>
                    </form>
                  </div>
                )}

                {step === 3 && (
                  <div className="text-center animate-fadeInUp" data-testid="quote-success">
                    <div className="mb-6">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h2 className="text-3xl font-bold text-slate-800 mb-4">Quote Request Submitted!</h2>
                      <p className="text-lg text-slate-600 mb-6">
                        Thank you for your interest in Sarita Industries. We've received your quote request 
                        and our team will review it carefully.
                      </p>
                    </div>

                    <Card className="p-6 bg-blue-50 border-blue-200 mb-6">
                      <CardContent className="p-0">
                        <h3 className="text-xl font-semibold text-blue-800 mb-4">What happens next?</h3>
                        <div className="space-y-3 text-left">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                            <span className="text-blue-700">Our technical team will review your requirements (2-4 hours)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                            <span className="text-blue-700">We'll prepare a detailed quote with specifications (24 hours)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                            <span className="text-blue-700">You'll receive the quote via email with our recommendations</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                            <span className="text-blue-700">Our team will follow up to discuss and refine the proposal</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <Card className="p-4 border-green-200 bg-green-50">
                        <CardContent className="p-0 text-center">
                          <Phone className="w-6 h-6 text-green-600 mx-auto mb-2" />
                          <p className="text-sm text-green-700 font-medium">Need to discuss urgently?</p>
                          <p className="text-sm text-green-600">Call: +91-9876543210</p>
                        </CardContent>
                      </Card>
                      <Card className="p-4 border-orange-200 bg-orange-50">
                        <CardContent className="p-0 text-center">
                          <Mail className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                          <p className="text-sm text-orange-700 font-medium">Have additional questions?</p>
                          <p className="text-sm text-orange-600">Email: sales@saritaindustries.com</p>
                        </CardContent>
                      </Card>
                    </div>

                    <Button
                      onClick={resetForm}
                      variant="outline"
                      size="lg"
                      className="px-8"
                      data-testid="quote-new-request-btn"
                    >
                      Submit Another Request
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      {step < 3 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Need Help With Your Quote?</h2>
              <p className="text-lg text-slate-600 mb-8">
                Our sales team is here to help you with any questions about products, specifications, 
                or pricing. Don't hesitate to reach out!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="flex items-center justify-center bg-blue-50 text-blue-700 px-6 py-3 rounded-lg">
                  <Phone className="w-5 h-5 mr-2" />
                  <span className="font-medium">+91-9822681093</span>
                </div>
                <div className="flex items-center justify-center bg-green-50 text-green-700 px-6 py-3 rounded-lg">
                  <Mail className="w-5 h-5 mr-2" />
                  <span className="font-medium">saritaindustries2009@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Quote;