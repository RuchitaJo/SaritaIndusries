import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ArrowLeft, ArrowRight, CheckCircle, Star, Award, Shield, Package } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const [productResponse, allProductsResponse] = await Promise.all([
          axios.get(`${API}/products/${id}`),
          axios.get(`${API}/products`)
        ]);
        
        setProduct(productResponse.data);
        
        // Get related products (same category, excluding current product)
        const related = allProductsResponse.data
          .filter(p => p.id !== id && p.category === productResponse.data.category)
          .slice(0, 3);
        setRelatedProducts(related);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center" data-testid="product-error">
          <h2 className="text-2xl font-bold text-slate-600 mb-4">Product Not Found</h2>
          <p className="text-slate-500 mb-6">The product you're looking for doesn't exist.</p>
          <Link to="/products">
            <Button className="bg-gradient-to-r from-blue-600 to-blue-700">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const benefits = [
    {
      icon: <Award className="w-6 h-6" />,
      title: "Premium Quality",
      description: "ISO certified manufacturing with rigorous quality control"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Durability Tested",
      description: "Built to withstand harsh industrial environments"
    },
    {
      icon: <Package className="w-6 h-6" />,
      title: "Fast Delivery",
      description: "Quick turnaround times with reliable logistics"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Expert Support",
      description: "Technical assistance from our experienced team"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <section className="bg-white border-b py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm" data-testid="breadcrumb">
            <Link to="/" className="text-slate-500 hover:text-blue-600">Home</Link>
            <span className="text-slate-400">/</span>
            <Link to="/products" className="text-slate-500 hover:text-blue-600">Products</Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-800 font-medium">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Product Image */}
            <div className="animate-slideInLeft">
              <div className="aspect-square overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  data-testid="product-image"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="animate-slideInRight">
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full" data-testid="product-category">
                  {product.category}
                </span>
              </div>
              
              <h1 className="text-4xl font-bold text-slate-800 mb-6" data-testid="product-name">
                {product.name}
              </h1>
              
              <p className="text-lg text-slate-600 mb-8 leading-relaxed" data-testid="product-description">
                {product.description}
              </p>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-slate-800 mb-4">Key Features</h3>
                  <ul className="space-y-3" data-testid="product-features">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center" data-testid={`feature-${index}`}>
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Specifications */}
              {product.specifications && (
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-slate-800 mb-4">Specifications</h3>
                  <div className="bg-white rounded-lg p-6 shadow-md" data-testid="product-specifications">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-slate-200 last:border-b-0">
                        <span className="font-medium text-slate-700 capitalize">{key.replace('_', ' ')}</span>
                        <span className="text-slate-600">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/quote" className="flex-1">
                  <Button size="lg" className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-lg py-4" data-testid="request-quote-btn">
                    Request Quote
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-lg py-4 px-8" data-testid="contact-expert-btn">
                    Contact Expert
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">Why Choose This Product?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center p-6 hover-lift animate-fadeInUp bg-white border-0 shadow-lg" style={{animationDelay: `${index * 0.1}s`}} data-testid={`benefit-${index}`}>
                  <CardContent className="p-0">
                    <div className="text-blue-600 mb-4 flex justify-center">
                      {benefit.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">{benefit.title}</h3>
                    <p className="text-slate-600 text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-8" data-testid="related-products-title">Related Products</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedProducts.map((relatedProduct, index) => (
                  <Card key={relatedProduct.id} className="hover-lift animate-fadeInUp bg-white border-0 shadow-lg" style={{animationDelay: `${index * 0.1}s`}} data-testid={`related-product-${index}`}>
                    <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
                      <img
                        src={relatedProduct.image_url}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover hover-scale"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-slate-800 mb-2">{relatedProduct.name}</h3>
                      <p className="text-slate-600 mb-4 text-sm line-clamp-2">{relatedProduct.description}</p>
                      <Link to={`/products/${relatedProduct.id}`}>
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 group" data-testid={`related-product-btn-${index}`}>
                          View Details
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Back to Products */}
      <div className="container mx-auto px-4 pb-8">
        <Link to="/products">
          <Button variant="outline" className="border-slate-300 text-slate-600 hover:bg-slate-100" data-testid="back-to-products-btn">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to All Products
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductDetail;