import React, { useState } from 'react';

const ProductForm = ({ onSubmit, initialValues }) => {
    const [values, setValues] = useState(initialValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(values);
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* 상품 등록/수정 폼 필드 */}
            <button type="submit">Submit</button>
        </form>
    );
};

export default ProductForm;