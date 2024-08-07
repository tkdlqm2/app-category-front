import React, { useState, useEffect } from 'react';
import { getBrands, removeBrand } from '../../services/brandApi';
import './RemoveBrand.css';

const RemoveBrand = () => {
    const [brands, setBrands] = useState([]);
    const [selectedBrandId, setSelectedBrandId] = useState(null);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        setIsLoading(true);
        setError('');
        try {
            const data = await getBrands();
            console.log('Fetched brands:', data);
            setBrands(data);
            if (data.length === 0) {
                setError('브랜드 데이터가 없습니다.');
            }
        } catch (error) {
            console.error('Error fetching brands:', error);
            setError('브랜드 목록을 불러오는 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBrandClick = (brandId) => {
        setSelectedBrandId(selectedBrandId === brandId ? null : brandId);
    };

    const handleRemove = async () => {
        if (!selectedBrandId) {
            setMessage('삭제할 브랜드를 선택해주세요.');
            return;
        }

        try {
            await removeBrand(selectedBrandId);
            setMessage('브랜드가 성공적으로 삭제되었습니다.');
            setSelectedBrandId(null);
            fetchBrands();
            setTimeout(() => {
                setMessage('');
            }, 3000);
        } catch (error) {
            console.error('Error removing brand:', error);
            setMessage('브랜드 삭제에 실패했습니다.');
        }
    };

    return (
        <div className="lowest-price-container">
            <h2 className="main-title">삭제할 브랜드 목록</h2>
            {isLoading ? (
                <p className="loading">브랜드 목록을 불러오는 중...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : brands.length > 0 ? (
                <>
                    <table className="brand-table">
                        <thead>
                        <tr>
                            <th>Brand ID</th>
                            <th>Brand Name</th>
                            <th>Brand Key</th>
                        </tr>
                        </thead>
                        <tbody>
                        {brands.map((brand, index) => (
                            <tr
                                key={brand['브랜드Id']}
                                onClick={() => handleBrandClick(brand['브랜드Id'])}
                                style={{
                                    backgroundColor: selectedBrandId === brand['브랜드Id'] ? '#e6f3ff' : 'white',
                                    cursor: 'pointer',
                                }}
                                className={index === brands.length - 1 ? 'last-row' : ''}
                            >
                                <td>{brand['브랜드Id']}</td>
                                <td>{brand['브랜드 이름']}</td>
                                <td>{brand['브랜드Key']}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div>
                        <button onClick={handleRemove} disabled={!selectedBrandId}>
                            브랜드 삭제
                        </button>
                    </div>
                </>
            ) : (
                <p>브랜드 데이터가 없습니다.</p>
            )}
            {message && <p className={message.includes('성공') ? 'success-message' : 'error-message'}>{message}</p>}
        </div>
    );
};

export default RemoveBrand;