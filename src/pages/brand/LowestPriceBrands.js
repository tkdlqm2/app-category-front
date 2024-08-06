import React, { useState, useEffect } from 'react';
import { getLowestPriceBrands } from '../../services/brandApi';
import { FaTshirt, FaUmbrella, FaSocks, FaShoppingBag, FaHatCowboy, FaSnowboarding, FaShoePrints, FaGlasses } from 'react-icons/fa';
import './LowestPriceBrands.css';

const LowestPriceBrands = () => {
    const [lowestPrices, setLowestPrices] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchLowestPrices();
    }, []);

    const fetchLowestPrices = async () => {
        try {
            const response = await getLowestPriceBrands();
            if (response.data && response.data.response && response.data.response['최저가']) {
                setLowestPrices(response.data.response['최저가']);
            } else {
                setError('데이터 형식이 예상과 다릅니다.');
            }
        } catch (error) {
            setError('데이터를 불러오는 데 실패했습니다: ' + error.message);
        }
    };

    const getCategoryIcon = (category) => {
        switch(category) {
            case '상의': return <FaTshirt />;
            case '아우터': return <FaUmbrella />;
            case '양말': return <FaSocks />;
            case '가방': return <FaShoppingBag />;
            case '모자': return <FaHatCowboy />;
            case '바지': return <FaSnowboarding />;
            case '신발': return <FaShoePrints />;
            case '악세사리': return <FaGlasses />;
            default: return null;
        }
    };

    if (error) return <div className="error-message">{error}</div>;
    if (!lowestPrices) return <div className="loading">Loading...</div>;

    return (
        <div className="lowest-price-container">
            <h1 className="main-title">최저가 브랜드 정보</h1>
            {lowestPrices.map((brand, index) => (
                <table key={index} className="brand-table">
                    <thead>
                    <tr>
                        <th colSpan="2">브랜드: {brand['브랜드']}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>카테고리</td>
                        <td>가격</td>
                    </tr>
                    {brand['카테고리'].map((category, catIndex) => (
                        <tr key={catIndex} className={catIndex === brand['카테고리'].length - 1 ? 'last-row' : ''}>
                            <td>
                                <span className="category-icon">{getCategoryIcon(category['카테고리'])}</span>
                                <span className="category-name">{category['카테고리']}</span>
                            </td>
                            <td className="category-price">{category['가격'].toLocaleString()}원</td>
                        </tr>
                    ))}
                    <tr className="total-row">
                        <td>총액</td>
                        <td className="total-price">{brand['총액'].toLocaleString()}원</td>
                    </tr>
                    </tbody>
                </table>
            ))}
        </div>
    );
};

export default LowestPriceBrands;