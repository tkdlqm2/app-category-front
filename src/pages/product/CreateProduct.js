import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createProduct } from '../../services/productApi';

const CreateProduct = () => {
    const [formData, setFormData] = useState({
        price: '',
        productKey: '',
        brandId: '',
        categoryType: '',
        remark: '',
    });
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchCategories();
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        try {
            const response = await axios.get('http://localhost:18083/api/v1/brand/list');
            console.log('브랜드 응답:', response.data);

            const brandData = response.data.response;
            if (Array.isArray(brandData)) {
                const formattedBrands = brandData.map((brand) => ({
                    id: brand['브랜드Id'],
                    name: brand['브랜드 이름'],
                    key: brand['브랜드Key']
                }));
                setBrands(formattedBrands);
            } else {
                console.error('예상치 못한 브랜드 데이터 형식:', response.data);
                setErrorMessage('브랜드 데이터 형식이 올바르지 않습니다.');
            }
        } catch (error) {
            console.error('브랜드 목록을 가져오는데 실패했습니다:', error);
            setErrorMessage('브랜드 목록을 불러오는데 실패했습니다.');
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:18083/api/v1/product/category/list');
            console.log('카테고리 응답:', response.data);

            const categoryData = response.data.response?.카테고리;
            if (Array.isArray(categoryData)) {
                const formattedCategories = categoryData.map((category) => ({
                    code: category,
                    description: category
                }));
                setCategories(formattedCategories);
            } else {
                console.error('예상치 못한 카테고리 데이터 형식:', response.data);
                setErrorMessage('카테고리 데이터 형식이 올바르지 않습니다.');
            }
        } catch (error) {
            console.error('카테고리 목록을 가져오는데 실패했습니다:', error);
            setErrorMessage('카테고리 목록을 불러오는데 실패했습니다.');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createProduct(formData);
            if (response.code === 200) {
                setSuccessMessage(`상품이 성공적으로 등록되었습니다. 상품 ID: ${response.response.productId}`);
                setErrorMessage('');
                setFormData({
                    price: '',
                    productKey: '',
                    brandId: '',
                    categoryType: '',
                    remark: '',
                });
            } else {
                setErrorMessage(`상품 등록에 실패했습니다. 오류 코드: ${response.code}`);
                setSuccessMessage('');
            }
        } catch (error) {
            setErrorMessage('상품 등록 중 오류가 발생했습니다.');
            setSuccessMessage('');
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
            <h2>상품 생성</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="price">가격:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="productKey">상품 키:</label>
                    <input
                        type="text"
                        id="productKey"
                        name="productKey"
                        value={formData.productKey}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="brandId">브랜드:</label>
                    <select
                        id="brandId"
                        name="brandId"
                        value={formData.brandId}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '5px' }}
                    >
                        <option value="">선택하세요</option>
                        {brands.map((brand) => (
                            <option key={brand.id} value={brand.id}>
                                {`${brand.id} / ${brand.name} / ${brand.key}`}
                            </option>
                        ))}
                    </select>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="categoryType">카테고리:</label>
                    <select
                        id="categoryType"
                        name="categoryType"
                        value={formData.categoryType}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '5px' }}
                    >
                        <option value="">선택하세요</option>
                        {categories.map((category) => (
                            <option key={category.code} value={category.code}>
                                {category.description}
                            </option>
                        ))}
                    </select>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="remark">비고:</label>
                    <textarea
                        id="remark"
                        name="remark"
                        value={formData.remark}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '5px' }}
                    />
                </div>
                <button type="submit" style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
                    상품 생성
                </button>
            </form>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default CreateProduct;