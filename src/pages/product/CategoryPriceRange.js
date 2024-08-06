import React, { useState } from 'react';
import { getCategoryPriceRange } from '../../services/productApi';

const CategoryPriceRange = () => {
    const [categoryName, setCategoryName] = useState('');
    const [priceRangeData, setPriceRangeData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const data = await getCategoryPriceRange(categoryName);
            setPriceRangeData(data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>Category Price Range</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="Enter category name"
                />
                <button type="submit">Get Price Range</button>
            </form>
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            {priceRangeData && (
                <div>
                    {/* 최저, 최고 가격 브랜드와 상품 가격 데이터를 표시하는 컴포넌트 */}
                </div>
            )}
        </div>
    );
};

export default CategoryPriceRange;