import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useGetCustomersQuery,
  useGetOrdersQuery,
  useGetProductsQuery,
} from '../api/sales-api';
import { motion } from 'framer-motion';
import { TextField, InputAdornment } from '@mui/material';
import { MagnifyingGlassIcon, EyeIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import debounce from 'lodash/debounce';
import NoOrders from '../../../components/NoDataIntheTable';
import Shimmer from '../../../components/Shimmer';
import FeatureHeader from '../../../components/FeatureHeader';
import ErrorInTheTable from '../../../components/ErrorInTheTable';
import { useSelector } from 'react-redux';
import { RootState } from '../../../stores/store';

const OrderList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const vendorid = useSelector((state:RootState)=>state.userSlice.userData?._id)

  if(!vendorid){
    return (
      <>
      <ErrorInTheTable/>
      </>
    )
  }

  const {
    data: ordersData,
    isLoading,
    isError,
  } = useGetOrdersQuery(vendorid, {
    refetchOnMountOrArgChange: true,
  });

  const { data: productsData, isLoading: isProductsLoading } =
    useGetProductsQuery(vendorid, {
      refetchOnMountOrArgChange: true,
    });

  const { data: customersData, isLoading: isCustomersLoading } =
    useGetCustomersQuery(vendorid, {
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

  if (ordersData?.orders.length == 0) {
    return (
      <div>
        <FeatureHeader entity="order" feature="orders" />
        <NoOrders entity="Orders" />
      </div>
    );
  } else if (isLoading || isCustomersLoading || isProductsLoading) {
    return (
      <div>
        <FeatureHeader entity="order" feature="Orders" />
        <Shimmer />
      </div>
    );
  } else if (isError) {
    return (
      <div>
        <FeatureHeader entity="order" feature="Orders" />
        <ErrorInTheTable />
      </div>
    );
  }

  const filteredOrders = ordersData?.orders.filter((order) =>
    order.orderid.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCustomerName = (customerId: string) => {
    const customer = customersData?.customers.find((c) => c._id === customerId);
    return customer ? `${customer.name}` : 'Unknown';
  };

  const getProductTitle = (productId: string) => {
    const product = productsData?.products.find((p) => p._id === productId);
    return product ? product.title : 'Unknown';
  };

  return (
    <div>
      <FeatureHeader entity="order" feature="Orders" />
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
                  <th className="pt-2 pb-2 px-6">Status</th>
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
                        className={`inline-block rounded-xl px-2 py-1 text-center w-23 ${
                          order.status === 'completed'
                            ? 'bg-green-200 text-green-800'
                            : order.status === 'pending'
                            ? 'bg-orange-200 text-orange-800'
                            : 'bg-red-200 text-red-800'
                        }`}
                      >
                        {order.status === 'completed'
                          ? 'Completed'
                          : order.status === 'pending'
                          ? 'Pending'
                          : 'Cancelled'}{' '}
                      </div>
                    </td>
                    <td className="pt-3 pb-3 px-6 text-greyText ">
                      {getCustomerName(order.customerid)}
                    </td>

                    <td className="pt-3 pb-3 px-6 text-greyText ">
                      {getProductTitle(order.productid)}
                    </td>
                    <td className="pt-3 pb-3 px-6 text-greyText ">
                      {order.paymentmethod}
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
            {filteredOrders?.length == 0 && 
<div className='w-full flex justify-center space-x-3 items-center min-h-32'>
<ExclamationCircleIcon className="h-10"/>
<h1>No Orders found</h1>
</div>
              }
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderList;
