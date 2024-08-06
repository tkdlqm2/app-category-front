import React, { useState, useEffect } from 'react';
import { getProductById, updateProduct } from '../../services/productApi';
import ProductForm from '../../components/product/ProductForm';

const UpdateProduct = ({ productId }) => {
    const [product, setProduct] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchProduct();
    }, [productId]);

    const fetchProduct = async () => {
        try {
            const data = await getProductById(productId);
            setProduct(data);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    const handleSubmit = async (values) => {
        try {
            await updateProduct(productId, values);
            setMessage('Product updated successfully');
            fetchProduct();
        } catch (error) {
            console.error('Error updating product:', error);
            setMessage('Failed to update product');
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Update Product</h2>
            <ProductForm onSubmit={handleSubmit} initialValues={product} />
            {message && <p>{message}</p>}
        </div>
    );
};

export default UpdateProduct;