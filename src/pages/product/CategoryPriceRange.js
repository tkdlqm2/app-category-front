import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CategoryPriceRange.css';

const CategoryPriceRange = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [priceRange, setPriceRange] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:18083/api/v1/product/category/list');
            if (response.data.code === 200) {
                setCategories(response.data.response.카테고리);
            } else {
                setError('카테고리 목록을 불러오는데 실패했습니다.');
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            setError('카테고리 목록을 불러오는 중 오류가 발생했습니다.');
        }
    };

    const fetchPriceRange = async () => {
        if (!selectedCategory) return;

        setIsLoading(true);
        setError('');
        try {
            const response = await axios.post('http://localhost:18083/api/v1/product/price-range', {
                categoryType: selectedCategory
            });
            if (response.data.code === 200) {
                setPriceRange(response.data.response);
            } else {
                setError('가격 범위 데이터를 불러오는데 실패했습니다.');
            }
        } catch (error) {
            console.error('Error fetching price range:', error);
            setError('가격 범위 데이터를 불러오는 중 오류가 발생했습니다.');
        }
        setIsLoading(false);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    useEffect(() => {
        if (selectedCategory) {
            fetchPriceRange();
        }
    }, [selectedCategory]);

    return (
        <div className="category-price-range-container">
            <h1>카테고리별 가격 범위</h1>
            <div className="category-select">
                <select value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">카테고리 선택</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            {isLoading && <div className="loading">로딩 중...</div>}
            {error && <div className="error">{error}</div>}

            {priceRange && (
                <div className="price-range-info">
                    <h2>{priceRange.카테고리} 가격 범위</h2>
                    <div className="price-range">
                        <div className="lowest-price">
                            <h3>최저가</h3>
                            {priceRange.최저가.map((item, index) => (
                                <p key={index}>
                                    브랜드: {item.브랜드}, 가격: {item.가격}
                                </p>
                            ))}
                        </div>
                        <div className="highest-price">
                            <h3>최고가</h3>
                            {priceRange.최고가.map((item, index) => (
                                <p key={index}>
                                    브랜드: {item.브랜드}, 가격: {item.가격}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryPriceRange;