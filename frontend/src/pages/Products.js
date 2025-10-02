import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ArrowRight, Filter, Search } from 'lucide-react';
import { Input } from '../components/ui/input';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Initialize products first
        await axios.post(`${API}/init-products`);
        
        const response = await axios.get(`${API}/products`);
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory]);

  const categories = ['all', ...new Set(products.map(product => product.category))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center animate-fadeInUp">
            <h1 className="text-5xl font-bold mb-4" data-testid="products-title">Our Products</h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Discover our comprehensive range of high-quality industrial products designed for durability, 
              performance, and reliability in the most demanding environments.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3"
                data-testid="product-search"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-slate-600" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-slate-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                data-testid="category-filter"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16" data-testid="no-products">
              <div className="mb-4">
                <Search className="w-16 h-16 text-slate-400 mx-auto" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-600 mb-2">No Products Found</h3>
              <p className="text-slate-500">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <p className="text-slate-600" data-testid="products-count">
                  Showing {filteredProducts.length} of {products.length} products
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product, index) => (
                  <Card 
                    key={product.id} 
                    className="hover-lift animate-fadeInUp bg-white border-0 shadow-lg" 
                    style={{animationDelay: `${index * 0.1}s`}}
                    data-testid={`product-card-${index}`}
                  >
                    <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover hover-scale"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="mb-3">
                        <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                          {product.category}
                        </span>
                      </div>
                      <h3 className="text-2xl font-semibold text-slate-800 mb-3">{product.name}</h3>
                      <p className="text-slate-600 mb-4 leading-relaxed line-clamp-3">{product.description}</p>
                      
                      {product.features && product.features.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-slate-700 text-sm mb-2">Key Features:</h4>
                          <ul className="text-sm text-slate-600 space-y-1">
                            {product.features.slice(0, 2).map((feature, idx) => (
                              <li key={idx} className="flex items-center">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        <Link to={`/products/${product.id}`} className="flex-1">
                          <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 group" data-testid={`view-details-btn-${index}`}>
                            View Details
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                        <Link to="/quote">
                          <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white" data-testid={`quote-btn-${index}`}>
                            Quote
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto animate-fadeInUp">
            <h2 className="text-4xl font-bold mb-6">Need a Custom Solution?</h2>
            <p className="text-xl mb-8 opacity-90">
              We specialize in custom fabrication and industrial solutions tailored to your specific requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/quote">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-lg px-8 py-4 group" data-testid="custom-quote-btn">
                  Get Custom Quote
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4" data-testid="contact-us-btn">
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

export default Products;