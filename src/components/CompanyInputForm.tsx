import React, { useState } from 'react';
import { CompanyInputData } from '../types';

interface CompanyInputFormProps {
  onSubmit: (data: CompanyInputData) => void;
}

const CompanyInputForm: React.FC<CompanyInputFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<CompanyInputData>({
    companyName: '',
    website: '',
    product: '',
    territory: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CompanyInputData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
    // Clear error when user starts typing
    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CompanyInputData, string>> = {};
    let isValid = true;

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
      isValid = false;
    }

    if (!formData.website.trim()) {
      newErrors.website = 'Website is required';
      isValid = false;
    } else {
      try {
        new URL(formData.website);
      } catch {
        newErrors.website = 'Please enter a valid URL (e.g., https://www.example.com)';
        isValid = false;
      }
    }

    if (!formData.product.trim()) {
      newErrors.product = 'Product is required';
      isValid = false;
    }

    if (!formData.territory.trim()) {
      newErrors.territory = 'Territory is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.companyName ? 'border-red-500' : ''}`}
        />
        {errors.companyName && <p className="mt-1 text-sm text-red-500">{errors.companyName}</p>}
      </div>
      <div>
        <label htmlFor="website" className="block text-sm font-medium text-gray-700">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder="https://www.example.com"
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.website ? 'border-red-500' : ''}`}
        />
        {errors.website && <p className="mt-1 text-sm text-red-500">{errors.website}</p>}
      </div>
      <div>
        <label htmlFor="product" className="block text-sm font-medium text-gray-700">Product</label>
        <input
          type="text"
          id="product"
          name="product"
          value={formData.product}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.product ? 'border-red-500' : ''}`}
        />
        {errors.product && <p className="mt-1 text-sm text-red-500">{errors.product}</p>}
      </div>
      <div>
        <label htmlFor="territory" className="block text-sm font-medium text-gray-700">What&apos;s your territory?</label>
        <input
          type="text"
          id="territory"
          name="territory"
          value={formData.territory}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.territory ? 'border-red-500' : ''}`}
        />
        {errors.territory && <p className="mt-1 text-sm text-red-500">{errors.territory}</p>}
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
      >
        Submit
      </button>
    </form>
  );
};

export default CompanyInputForm;