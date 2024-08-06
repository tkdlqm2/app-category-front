import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateBrand.css'; // CSS 파일을 생성하고 import 합니다.

const UpdateBrand = () => {
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [updateForm, setUpdateForm] = useState({
        id: '',
        brandKey: '',
        brandName: '',
        remark: '',
        saleStateCode: 'SALE'
    });

    useEffect(() => {
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        try {
            const response = await axios.get('http://localhost:18083/api/v1/brand/list');
            setBrands(response.data.response);
        } catch (error) {
            console.error('Error fetching brands:', error);
        }
    };

    const fetchBrandDetails = async (brandId) => {
        try {
            const response = await axios.get(`http://localhost:18083/api/v1/brand/brands/${brandId}`);
            const brandDetails = response.data.response;
            setSelectedBrand(brandDetails);
            setUpdateForm({
                id: brandDetails['브랜드Id'],
                brandKey: brandDetails['브랜드Key'],
                brandName: brandDetails['브랜드 이름'],
                remark: brandDetails['비고'] || '',
                saleStateCode: 'SALE' // 기본값 설정
            });
        } catch (error) {
            console.error('Error fetching brand details:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateForm({ ...updateForm, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updateData = {
            id: updateForm.id,
            brandName: updateForm.brandName,
            saleStateCode: updateForm.saleStateCode,
            remark: updateForm.remark
        };
        try {
            await axios.put('http://localhost:18083/api/v1/brand/update', updateData);
            alert('브랜드 정보가 성공적으로 업데이트되었습니다.');
            fetchBrands(); // 목록 새로고침
        } catch (error) {
            console.error('Error updating brand:', error);
            alert('브랜드 업데이트 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="update-brand-container">
            <div className="brand-list">
                <h2>브랜드 목록</h2>
                <ul>
                    {brands.map(brand => (
                        <li key={brand['브랜드Id']}>
                            <button onClick={() => fetchBrandDetails(brand['브랜드Id'])}>
                                {brand['브랜드Id']} - {brand['브랜드 이름']}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {selectedBrand && (
                <div className="brand-edit-form">
                    <h3>브랜드 정보 수정</h3>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>브랜드 ID: </label>
                            <input type="text" name="id" value={updateForm.id} readOnly />
                        </div>
                        <div>
                            <label>브랜드 Key: </label>
                            <input type="text" name="brandKey" value={updateForm.brandKey} readOnly />
                        </div>
                        <div>
                            <label>브랜드 이름: </label>
                            <input
                                type="text"
                                name="brandName"
                                value={updateForm.brandName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>비고: </label>
                            <input
                                type="text"
                                name="remark"
                                value={updateForm.remark}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>판매 상태: </label>
                            <select
                                name="saleStateCode"
                                value={updateForm.saleStateCode}
                                onChange={handleInputChange}
                            >
                                <option value="SALE">SALE</option>
                                <option value="STOP">STOP</option>
                            </select>
                        </div>
                        <button type="submit">수정</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default UpdateBrand;