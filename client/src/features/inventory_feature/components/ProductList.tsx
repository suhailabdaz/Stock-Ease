import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '../api/inventory-api';
import { motion } from 'framer-motion';
import { TextField, InputAdornment } from '@mui/material';
import { MagnifyingGlassIcon,EyeIcon } from '@heroicons/react/24/outline';
import debounce from 'lodash/debounce';
import NoRPoducts from './NoRPoducts';

const ProductList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: productsData,
    isLoading,
    isError,
  } = useGetProductsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const debouncedSearch = useCallback(
    debounce((term: React.SetStateAction<string>) => {
      setSearchTerm(term);
    }, 300),
    []
  );

  const handleSearchChange = (event: { target: { value: any; }; }) => {
    debouncedSearch(event.target.value);
  };

  if (isLoading || isError) {
    return <NoRPoducts/>
  }

  const filteredProducts = productsData?.products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="w-[100%] mb-6 flex justify-between">
        <h1 className="font-shopify1000 font-bold text-greyText text-2xl">
          Products
        </h1>
        <button
          onClick={() => navigate('/products/add-product')}
          className="font-shopify1000 text-fafawhite bg-gradient-to-b from-buttonTop to-buttonBootom py-2 px-3 rounded-xl hover:scale-105 transition-all ease-in-out duration-300"
        >
          Add Product
        </button>
      </div>
      <motion.div
        key="add-product"
        initial={{ x: '1%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '-1%', opacity: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <div className="md:shadow-custom border border-gray-400 bg-white md:rounded-xl">
          <div className='bg-white pt-4 pb-4 pr-20 pl-4 md:rounded-t-xl'>
            <TextField
              fullWidth
              size="small" 
              variant="outlined"
              placeholder="Search products..."
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MagnifyingGlassIcon className='h-4' />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full rounded-b-xl border-t border-gray-400">
              <thead className='bg-gray-100 font-shopify1000 text-left text-buttonBootom text-sm'>
                <tr>
                  <th className="pt-2 pb-2 px-6">Title</th>
                  <th className="pt-2 pb-2 px-6">Status</th>
                  <th className="pt-2 pb-2 px-6">Channels</th>
                  <th className="pt-2 pb-2 px-6">Stock</th>
                  <th className="pt-2 pb-2 px-6">Category</th>
                  <th className="pt-2 pb-2 px-6">Edit</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts?.map((product) => (
                  <tr key={product._id} className="border-t border-gray-400">
                    <td className="pt-3 pb-3 px-6 text-greyText font-semibold">{product.title}</td>
                    <td className='pt-3 pb-3 px-6 '>
                      <div className={`inline-block rounded-xl px-2 py-1 text-center w-20 ${
                        product.status === 'active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                      }`}>
                        {product.status === 'active' ? 'Active' : 'Blocked'}
                      </div>
                    </td>
                    <td className="pt-3 pb-3 px-6 text-greyText ">
                      {product.publishing.length}
                    </td>
                    <td className="pt-3 pb-3 px-6 text-greyText ">
                      <span className={product.stock === 0 ? 'text-orange-800' : 'text-black'}>
                        {product.stock} in Stock
                      </span>
                    </td>
                    <td className="pt-3 pb-3 px-6 text-greyText ">{product.category}</td>
                    <td className="pt-3 pb-3 px-6">
                      <button
                        onClick={() => navigate(`/products/edit-product/${product._id}`)}
                        className="flex items-center justify-center px-3 py-1 bg-secondaryButton hover:bg-gray-200 rounded-xl font-shopify text-greyText"
                      >
                        <EyeIcon className="h-3 mr-1" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductList;