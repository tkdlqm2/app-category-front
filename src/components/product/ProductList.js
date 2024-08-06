import React from 'react';

const ProductList = ({ products }) => {
    return (
        <ul>
            {products.map((product) => (
                <li key={product.productId}>{product.productKey}</li>
            ))}
        </ul>
    );
};

export default ProductList;