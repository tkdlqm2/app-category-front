import axios from 'axios';
const API_BASE_URL = 'http://localhost:18083/api/v1/brand';

export const createBrand = (data) => axios.post(`${API_BASE_URL}/create`, data);
export const updateBrand = (data) => axios.put(`${API_BASE_URL}/update`, data);
export const removeBrand = (id) => axios.delete(`${API_BASE_URL}/delete`, {
    data: { id }
});
export const getLowestPriceBrands = () =>
    axios.get(`${API_BASE_URL}/lowest-price-brands`, {
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        }
    });
export const getAllBrands = () => axios.get(`${API_BASE_URL}/all`);

export const getBrands = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/list`, {
            method: 'GET',
            headers: {
                'accept': '*/*'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch brands');
        }
        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('Error in getBrands:', error);
        throw error;
    }
};