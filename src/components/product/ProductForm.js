import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ProductForm = ({ onSubmit, initialValues }) => {
    const validationSchema = Yup.object().shape({
        price: Yup.number().positive('Price must be positive').required('Price is required'),
        productKey: Yup.string().max(30, 'Product key must be at most 30 characters').required('Product key is required'),
        brandId: Yup.number().positive('Brand ID must be positive').required('Brand ID is required'),
        categoryType: Yup.string().required('Category type is required'),
        remark: Yup.string().max(100, 'Remark must be at most 100 characters'),
    });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div>
                        <label htmlFor="price">Price</label>
                        <Field type="number" name="price" />
                        <ErrorMessage name="price" component="div" />
                    </div>

                    <div>
                        <label htmlFor="productKey">Product Key</label>
                        <Field type="text" name="productKey" />
                        <ErrorMessage name="productKey" component="div" />
                    </div>

                    <div>
                        <label htmlFor="brandId">Brand ID</label>
                        <Field type="number" name="brandId" />
                        <ErrorMessage name="brandId" component="div" />
                    </div>

                    <div>
                        <label htmlFor="categoryType">Category Type</label>
                        <Field as="select" name="categoryType">
                            <option value="">Select a category</option>
                            <option value="HAT">Hat</option>
                            <option value="BAG">Bag</option>
                            <option value="TOP">Top</option>
                            <option value="PANTS">Pants</option>
                        </Field>
                        <ErrorMessage name="categoryType" component="div" />
                    </div>

                    <div>
                        <label htmlFor="remark">Remark</label>
                        <Field as="textarea" name="remark" />
                        <ErrorMessage name="remark" component="div" />
                    </div>

                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default ProductForm;