import React, { useState, useEffect } from 'react';
import { getProducts, removeProduct } from '../../services/productApi';
import ProductList from '../../components/product/ProductList';

const RemoveProduct = () => {
    const [products, setProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleProductClick = (productId) => {
        setSelectedProductId(productId);
    };

    const handleRemove = async () => {
        if (!selectedProductId) {
            setMessage('Please select a product to remove.');
            return;
        }

        try {
            await removeProduct(selectedProductId);
            setMessage('Product removed successfully');
            setSelectedProductId(null);
            fetchProducts();
        } catch (error) {
            console.error('Error removing product:', error);
            setMessage('Failed to remove product');
        }
    };

    return (
        <div>
            <h2>Remove Product</h2>
            <ProductList
                products={products}
                selectedProductId={selectedProductId}
                onProductClick={handleProductClick}
            />
            <button onClick={handleRemove} disabled={!selectedProductId}>
                Remove Product
            </button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default RemoveProduct;