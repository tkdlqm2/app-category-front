import React, { useState, useEffect } from 'react';
import { getCategoryMinPrice } from '../../services/productApi';

const CategoryMinPrice = () => {
    const [minPriceData, setMinPriceData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMinPriceData = async () => {
            try {
                const data = await getCategoryMinPrice();
                setMinPriceData(data);
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };

        fetchMinPriceData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h2>Category Min Price</h2>
            {/* 최저가격 브랜드와 상품 가격, 총액 데이터를 표시하는 컴포넌트 */}
        </div>
    );
};

export default CategoryMinPrice;