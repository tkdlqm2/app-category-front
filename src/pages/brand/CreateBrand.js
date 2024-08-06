import React, { useState } from 'react';
import { createBrand } from '../../services/brandApi';

const CreateBrand = () => {
    const [brandData, setBrandData] = useState({
        brandKey: '',
        brandName: '',
        saleStateCode: '',
        remark: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBrandData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createBrand(brandData);
            setMessage(`브랜드 생성 성공: ID ${response.data.response.brandId}`);
            setBrandData({ brandKey: '', brandName: '', saleStateCode: '', remark: '' }); // 폼 초기화
        } catch (error) {
            setMessage(`브랜드 생성 실패: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
            <h2>브랜드 생성</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="brandKey">브랜드 키:</label>
                    <input
                        type="text"
                        id="brandKey"
                        name="brandKey"
                        value={brandData.brandKey}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="brandName">브랜드 이름:</label>
                    <input
                        type="text"
                        id="brandName"
                        name="brandName"
                        value={brandData.brandName}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="saleStateCode">판매 상태 코드:</label>
                    <select
                        id="saleStateCode"
                        name="saleStateCode"
                        value={brandData.saleStateCode}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '5px' }}
                    >
                        <option value="">선택하세요</option>
                        <option value="SALE">SALE</option>
                        <option value="STOP">STOP</option>
                    </select>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="remark">비고:</label>
                    <textarea
                        id="remark"
                        name="remark"
                        value={brandData.remark}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '5px' }}
                    />
                </div>
                <button type="submit" style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
                    브랜드 생성
                </button>
            </form>
            {message && <p style={{ marginTop: '20px', color: message.includes('성공') ? 'green' : 'red' }}>{message}</p>}
        </div>
    );
};

export default CreateBrand;