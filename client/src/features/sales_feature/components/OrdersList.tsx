import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetOrdersQuery } from '../api/sales-api';
import { motion } from 'framer-motion';
import { TextField, InputAdornment } from '@mui/material';
import { MagnifyingGlassIcon, EyeIcon } from '@heroicons/react/24/outline';
import debounce from 'lodash/debounce';
import NoOrders from './NoOrder';

const OrderList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: ordersData,
    isLoading,
    isError,
  } = useGetOrdersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const debouncedSearch = useCallback(
    debounce((term: React.SetStateAction<string>) => {
      setSearchTerm(term);
    }, 300),
    []
  );

  const handleSearchChange = (event: { target: { value: any } }) => {
    debouncedSearch(event.target.value);
  };

  if (isLoading || isError) {
    return (
      <div>
        <div className="w-[100%] mb-6 flex justify-between">
          <h1 className="font-shopify1000 font-bold text-greyText text-2xl">
            Orders{' '}
          </h1>
          <button
            onClick={() => navigate('/orders/create-order')}
            className="font-shopify1000 text-fafawhite bg-gradient-to-b from-buttonTop to-buttonBootom py-2 px-3 rounded-xl hover:scale-105 transition-all ease-in-out duration-300"
          >
            Create order
          </button>
        </div>
        <NoOrders />
      </div>
    );
  }

  const filteredOrders = ordersData?.orders.filter((order) =>
    order.orderid.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="w-[100%] mb-6 flex justify-between">
        <h1 className="font-shopify1000 font-bold text-greyText text-2xl">
          Orders
        </h1>
        <button
          onClick={() => navigate('/orders/add-order')}
          className="font-shopify1000 text-fafawhite bg-gradient-to-b from-buttonTop to-buttonBootom py-2 px-3 rounded-xl hover:scale-105 transition-all ease-in-out duration-300"
        >
          Create order
        </button>
      </div>
      <motion.div
        key="add-order"
        initial={{ x: '1%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '-1%', opacity: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <div className="md:shadow-custom border border-gray-400 bg-white md:rounded-xl">
          <div className="bg-white pt-4 pb-4 pr-20 pl-4 md:rounded-t-xl">
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              placeholder="Search Orders..."
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MagnifyingGlassIcon className="h-4" />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full rounded-b-xl border-t border-gray-400">
              <thead className="bg-gray-100 font-shopify1000 text-left text-buttonBootom text-sm">
                <tr>
                  <th className="pt-2 pb-2 px-6">Order ID</th>
                  <th className="pt-2 pb-2 px-6">Customer</th>
                  <th className="pt-2 pb-2 px-6">Product</th>
                  <th className="pt-2 pb-2 px-6">Payment</th>
                  <th className="pt-2 pb-2 px-6">Price</th>
                  <th className="pt-2 pb-2 px-6">Edit</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders?.map((order) => (
                  <tr key={order._id} className="border-t border-gray-400">
                    <td className="pt-3 pb-3 px-6 text-greyText font-semibold">
                      {order.orderid}
                    </td>
                    <td className="pt-3 pb-3 px-6 ">
                      <div
                        className={`inline-block rounded-xl px-2 py-1 text-center w-20 ${
                          order.status === 'delivered'
                            ? 'bg-green-200 text-green-800'
                            : order.status === 'pending'
                            ? 'bg-orange-200 text-orange-800'
                            : 'bg-red-200 text-red-800'
                        }`}
                      >
                        {order.status === 'delivered'
                          ? 'Delivered'
                          : order.status === 'pending'
                          ? 'Pending'
                          : 'Cancelled'}{' '}
                      </div>
                    </td>
                    <td className="pt-3 pb-3 px-6 text-greyText ">
                      {order.customerid}
                    </td>

                    <td className="pt-3 pb-3 px-6 text-greyText ">
                      {order.productid}
                    </td>
                    <td className="pt-3 pb-3 px-6 text-greyText ">
                      {order.price}
                    </td>

                    <td className="pt-3 pb-3 px-6">
                      <button
                        onClick={() =>
                          navigate(`/orders/edit-order/${order._id}`)
                        }
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

export default OrderList;
