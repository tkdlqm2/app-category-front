import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import CreateBrand from './pages/brand/CreateBrand';
import UpdateBrand from './pages/brand/UpdateBrand';
import RemoveBrand from './pages/brand/RemoveBrand';
import LowestPriceBrands from './pages/brand/LowestPriceBrands';
import CreateProduct from './pages/product/CreateProduct';
import UpdateProduct from './pages/product/UpdateProduct';
import RemoveProduct from './pages/product/RemoveProduct';
import CategoryMinPrice from './pages/product/CategoryMinPrice';
import CategoryPriceRange from './pages/product/CategoryPriceRange';


function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    {/* Brand routes */}
                    <Route path="/create-brand" element={<CreateBrand />} />
                    <Route path="/update-brand" element={<UpdateBrand />} />
                    <Route path="/remove-brand" element={<RemoveBrand />} />
                    <Route path="/lowest-price-brands" element={<LowestPriceBrands />} />

                    {/* Product routes */}
                    <Route path="/create-product" element={<CreateProduct />} />
                    <Route path="/remove-product" element={<RemoveProduct />} />
                    <Route path="/category-min-price" element={<CategoryMinPrice />} />
                    <Route path="/category-price-range" element={<CategoryPriceRange />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;