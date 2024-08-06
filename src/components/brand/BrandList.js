// src/components/BrandList.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllBrands, removeBrand } from '../../services/brandApi';

const BrandList = () => {
    const [brands, setBrands] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        try {
            const response = await getAllBrands();
            setBrands(response.data.response);
        } catch (err) {
            setError('Failed to fetch brands');
            console.error('Error fetching brands:', err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this brand?')) {
            try {
                await removeBrand({ id });
                fetchBrands(); // Refresh the list after deletion
            } catch (err) {
                setError('Failed to delete brand');
                console.error('Error deleting brand:', err);
            }
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Brand List</h2>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Brand Key</th>
                    <th>Brand Name</th>
                    <th>Sale State</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {brands.map(brand => (
                    <tr key={brand.id}>
                        <td>{brand.id}</td>
                        <td>{brand.brandKey}</td>
                        <td>{brand.brandName}</td>
                        <td>{brand.saleStateCode}</td>
                        <td>
                            <Link to={`/update/${brand.id}`}>Edit</Link>
                            <button onClick={() => handleDelete(brand.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Link to="/create">Create New Brand</Link>
        </div>
    );
};

export default BrandList;