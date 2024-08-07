import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RemoveProduct.css';

const RemoveProduct = () => {
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedBrandId, setSelectedBrandId] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [products, setProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchBrands();
        fetchCategories();
    }, []);

    const fetchBrands = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:18083/api/v1/brand/list');
            setBrands(response.data.response);
        } catch (error) {
            console.error('Error fetching brands:', error);
            setMessage('Failed to fetch brands');
        }
        setIsLoading(false);
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:18083/api/v1/product/category/list');
            setCategories(response.data.response.카테고리);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setMessage('Failed to fetch categories');
        }
    };

    const fetchProducts = async () => {
        if (!selectedBrandId || !selectedCategory) return;

        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:18083/api/v1/product/list/specific', {
                brandId: selectedBrandId,
                category: selectedCategory
            });
            setProducts(response.data.response['상품 리스트']);
        } catch (error) {
            console.error('Error fetching products:', error);
            setMessage('Failed to fetch products');
        }
        setIsLoading(false);
    };

    const handleBrandClick = (brandId) => {
        setSelectedBrandId(brandId);
        setSelectedCategory('');
        setProducts([]);
        setSelectedProductId(null);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setSelectedProductId(null);
    };

    useEffect(() => {
        if (selectedBrandId && selectedCategory) {
            fetchProducts();
        }
    }, [selectedBrandId, selectedCategory]);

    const handleProductClick = (productId) => {
        console.log('Selected product ID:', productId);
        setSelectedProductId(productId);
    };

    const handleRemove = async () => {
        if (selectedProductId === null) {
            setMessage('상품을 선택해주세요.');
            return;
        }

        console.log('Attempting to delete product with ID:', selectedProductId);

        try {
            const response = await axios.delete('http://localhost:18083/api/v1/product/delete', {
                data: { id: selectedProductId },
                headers: { 'Content-Type': 'application/json' }
            });

            console.log('Delete response:', response);

            if (response.data.code === 200 && response.data.response.result) {
                setMessage('상품이 성공적으로 삭제되었습니다.');
                setSelectedProductId(null);
                // 상품 목록에서 삭제된 상품 제거
                setProducts(prevProducts => prevProducts.filter(product => product['상품ID'] !== selectedProductId));
            } else {
                setMessage('상품 삭제에 실패했습니다. 서버 응답: ' + response.data.message);
            }
        } catch (error) {
            console.error('상품 삭제 중 오류 발생:', error);
            if (error.response) {
                console.error('서버 응답:', error.response.data);
                setMessage(`상품 삭제 실패: ${error.response.data.message || '알 수 없는 오류'}`);
            } else if (error.request) {
                console.error('응답 없음:', error.request);
                setMessage('서버로부터 응답이 없습니다. 네트워크 연결을 확인해주세요.');
            } else {
                console.error('오류 메시지:', error.message);
                setMessage('요청 설정 중 오류가 발생했습니다.');
            }
        }
    };

    return (
        <div className="remove-product-container">
            <h1 className="main-title">상품 삭제 화면</h1>
            <div className="brand-section">
                <h2>브랜드 목록</h2>
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
                        {brands.map((brand) => (
                            <tr
                                key={brand['브랜드Id']}
                                onClick={() => handleBrandClick(brand['브랜드Id'])}
                                style={{
                                    backgroundColor: selectedBrandId === brand['브랜드Id'] ? '#e6f3ff' : 'white',
                                    cursor: 'pointer',
                                }}
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
            </div>

            {selectedBrandId && (
                <div className="product-section">
                    <h2>상품 목록</h2>
                    <select value={selectedCategory} onChange={handleCategoryChange} className="category-select">
                        <option value="">카테고리 선택</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>

                    {isLoading ? (
                        <p className="loading">Loading products...</p>
                    ) : products.length > 0 ? (
                        <table className="product-table">
                            <thead>
                            <tr>
                                <th>상품 ID</th>
                                <th>카테고리</th>
                                <th>브랜드</th>
                                <th>가격</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.map((product) => (
                                <tr
                                    key={product['상품ID']}
                                    onClick={() => handleProductClick(product['상품ID'])}
                                    style={{
                                        backgroundColor: selectedProductId === product['상품ID'] ? '#e6f3ff' : 'white',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <td>{product['상품ID']}</td>
                                    <td>{product['카테고리']}</td>
                                    <td>{product['브랜드']}</td>
                                    <td>{product['가격']}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No products available</p>
                    )}

                    <div className="button-container">
                        <button onClick={handleRemove} disabled={selectedProductId === null} className="remove-button">
                            상품 삭제
                        </button>
                    </div>
                </div>
            )}

            {message && <p className={message.includes('성공') ? 'success-message' : 'error-message'}>{message}</p>}
        </div>
    );
};

export default RemoveProduct;