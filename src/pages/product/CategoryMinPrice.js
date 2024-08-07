import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CategoryMinPrice.css';

const CategoryMinPrice = () => {
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCategoryMinPrices();
    }, []);

    const fetchCategoryMinPrices = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await axios.get('http://localhost:18083/api/v1/product/category-min-price');
            if (response.data.code === 200) {
                setCategoryProducts(response.data.response.categoryProducts);
                setTotalPrice(response.data.response.총액);
            } else {
                setError('데이터를 불러오는데 실패했습니다.');
            }
        } catch (error) {
            console.error('Error fetching category min prices:', error);
            setError('데이터를 불러오는 중 오류가 발생했습니다.');
        }
        setIsLoading(false);
    };

    if (isLoading) {
        return <div className="loading">로딩 중...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="category-min-price-container">
            <h1>카테고리별 최저가 상품</h1>
            <table className="category-table">
                <thead>
                <tr>
                    <th>카테고리</th>
                    <th>브랜드</th>
                    <th>가격</th>
                </tr>
                </thead>
                <tbody>
                {categoryProducts.map((product, index) => (
                    <tr key={index}>
                        <td>{product.카테고리}</td>
                        <td>{product.브랜드}</td>
                        <td>{product.가격}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="total-price">
                <strong>총액:</strong> {totalPrice}
            </div>
        </div>
    );
};

export default CategoryMinPrice;