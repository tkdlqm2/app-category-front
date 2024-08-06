import React, { useState } from 'react';

const BrandForm = ({ initialData, onSubmit, buttonText }) => {
    const [formData, setFormData] = useState(initialData);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Form fields based on your DTO */}
            <button type="submit">{buttonText}</button>
        </form>
    );
};

export default BrandForm;