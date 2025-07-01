
import { useState } from "react";
import { Shield, ShoppingCart, Star, Plus, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import walmart from "../Images/wlogo.png"
import { toast } from "sonner";

const Shop = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<Array<{id: number, name: string, price: number}>>([]);

  const products = [
    { id: 1, name: "iPhone 15 Pro", price: 999, rating: 4.8, image: "📱", secured: true },
    { id: 2, name: "Samsung Galaxy S24", price: 899, rating: 4.7, image: "📱", secured: true },
    { id: 3, name: "MacBook Air M3", price: 1299, rating: 4.9, image: "💻", secured: true },
    { id: 4, name: "AirPods Pro", price: 249, rating: 4.6, image: "🎧", secured: true },
    { id: 5, name: "iPad Pro 12.9", price: 1099, rating: 4.8, image: "📱", secured: true },
    { id: 6, name: "Apple Watch Series 9", price: 399, rating: 4.7, image: "⌚", secured: true }
  ];

  const addToCart = (product: typeof products[0]) => {
    setCartItems(prev => [...prev, { id: product.id, name: product.name, price: product.price }]);
    toast.success(`${product.name} added to cart`, {
      description: "🔒 Protected by Walmart AI Security"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src={walmart} 
                alt="Walmart Logo" 
                className="h-8 w-8 object-contain" 
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Walmart</h1>
                {/* <p className="text-sm text-gray-600">Secure Shopping</p> */}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Lock className="h-3 w-3 mr-1" />
                SSL Secured
              </Badge>
              <Button 
                variant="outline"
                onClick={() => navigate('/checkout')}
                className="relative"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart ({cartItems.length})
              </Button>
              <Button 
                variant="ghost"
                onClick={() => navigate('/customer-dashboard')}
              >
                My Account
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-gray-600">Shop with confidence - every purchase is protected by our AI security system</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="text-6xl text-center mb-4">{product.image}</div>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  {product.secured && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      <Shield className="h-3 w-3 mr-1" />
                      AI Secured
                    </Badge>
                  )}
                </div>
                <CardDescription>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                    </div>
                    <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-green-600">
                    <Shield className="h-4 w-4 mr-2" />
                    Secured by Walmart AI
                  </div>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => addToCart(product)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
