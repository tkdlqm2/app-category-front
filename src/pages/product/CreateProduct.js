import React from 'react';
import { createProduct } from '../../services/productApi';
import ProductForm from '../../components/product/ProductForm';

const CreateProduct = () => {
    const handleSubmit = async (values) => {
        try {
            await createProduct(values);
            // 상품 등록 성공 처리
        } catch (error) {
            // 상품 등록 실패 처리
        }
    };

    const initialValues = {
        price: '',
        productKey: '',
        brandId: '',
        categoryType: '',
        remark: '',
    };

    return (
        <div>
            <h2>Create Product</h2>
            <ProductForm onSubmit={handleSubmit} initialValues={initialValues} />
        </div>
    );
};

export default CreateProduct;