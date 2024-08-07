import axios from 'axios';

const API_BASE_URL = 'http://localhost:18083/api/v1/product';

export const createProduct = async (productData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/create`, productData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getCategoryList = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/product/category/list`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const updateProduct = async (productId, productData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/update`, {
            id: productId,
            ...productData,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const removeProduct = async (productId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/delete`, {
            data: { id: productId },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getProducts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/products`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getProductById = async (productId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${productId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getCategoryMinPrice = async (categoryId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${categoryId}/min-price`);
        return response.data.minPrice;
    } catch (error) {
        throw error;
    }
};

export const getCategoryPriceRange = async (categoryName) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/price-range`, {
            categoryType: categoryName
        });
        return response.data.response;
    } catch (error) {
        throw error;
    }
};
