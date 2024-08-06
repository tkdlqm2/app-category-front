import React, { useState, useEffect } from 'react';
import { getBrands, removeBrand } from '../../services/brandApi';
import './RemoveBrand.css';

const RemoveBrand = () => {
    const [brands, setBrands] = useState([]);
    const [selectedBrandId, setSelectedBrandId] = useState(null);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        setIsLoading(true);
        try {
            const data = await getBrands();
            console.log('Fetched brands:', data);
            setBrands(data);
        } catch (error) {
            console.error('Error fetching brands:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const handleBrandClick = (brandId) => {
        setSelectedBrandId(selectedBrandId === brandId ? null : brandId);
    };

    const handleRemove = async () => {
        if (!selectedBrandId) {
            setMessage('Please select a brand to remove.');
            return;
        }

        try {
            await removeBrand(selectedBrandId);
            setMessage('Brand removed successfully');
            setSelectedBrandId(null);
            fetchBrands();
            setTimeout(() => {
                setMessage('');
            }, 3000);
        } catch (error) {
            console.error('Error removing brand:', error);
            setMessage('Failed to remove brand');
        }
    };

    return (
        <div className="lowest-price-container">
            <h2 className="main-title">삭제할 브랜드 목록</h2>
            {isLoading ? (
                <p className="loading">Loading brands...</p>
            ) : brands && brands.length > 0 ? (
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
            ) : (
                <p>No brands available</p>
            )}
            <div>
                <button onClick={handleRemove} disabled={!selectedBrandId}>
                    Remove Brand
                </button>
            </div>
            {message && <p className={message.includes('success') ? 'success-message' : 'error-message'}>{message}</p>}
        </div>
    );
};

export default RemoveBrand;