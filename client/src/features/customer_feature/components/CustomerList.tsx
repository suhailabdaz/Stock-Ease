import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCustomersQuery } from '../api/customer-api';
import { motion } from 'framer-motion';
import { TextField, InputAdornment } from '@mui/material';
import { MagnifyingGlassIcon, EyeIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import debounce from 'lodash/debounce';
import NoCustomers from '../../../components/NoDataIntheTable';
import Shimmer from '../../../components/Shimmer';
import FeatureHeader from '../../../components/FeatureHeader';
import ErrorInTheTable from '../../../components/ErrorInTheTable';
import { useSelector } from 'react-redux';
import { RootState } from '../../../stores/store';

const CustomerList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const vendorid = useSelector((state:RootState)=>state.userSlice.userData?._id)

   if(!vendorid){
    return<>
    <ErrorInTheTable/>
    </>
   }


  const {
    data: customersData,
    isLoading,
    isError,
  } = useGetCustomersQuery(vendorid, {
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

  if (customersData?.customers.length == 0) {
    return (
      <div>
        <FeatureHeader feature="customers" entity="customer" />
        <NoCustomers entity="Customers" />
      </div>
    );
  } else if (isLoading) {
    return (
      <div>
        <FeatureHeader feature="customers" entity="customer" />
        <Shimmer />
      </div>
    );
  } else if (isError) {
    return (
      <div>
        <FeatureHeader feature="customers" entity="customer" />
        <ErrorInTheTable />
      </div>
    );
  }

  const filteredCustomers = customersData?.customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );



  return (
    <div>
      <FeatureHeader feature="Customers" entity="customer" />
      <motion.div
        key="add-customer"
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
              placeholder="Search Customers..."
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
                  <th className="pt-2 pb-2 px-6">Name</th>
                  <th className="pt-2 pb-2 px-6">Status</th>
                  <th className="pt-2 pb-2 px-6">Mobile</th>
                  <th className="pt-2 pb-2 px-6">Address</th>
                  <th className="pt-2 pb-2 px-6">Pin Code</th>
                  <th className="pt-2 pb-2 px-6">Edit</th>
                </tr>
              </thead>
              <tbody>
                
                { filteredCustomers?.map((customer) => (
                  <tr key={customer._id} className="border-t border-gray-400">
                    <td className="pt-3 pb-3 px-6 text-greyText font-semibold">
                      {customer.name}
                    </td>
                    <td className="pt-3 pb-3 px-6 ">
                      <div
                        className={`inline-block rounded-xl px-2 py-1 text-center w-20 ${
                          customer.status === 'active'
                            ? 'bg-green-200 text-green-800'
                            : 'bg-red-200 text-red-800'
                        }`}
                      >
                        {customer.status === 'active' ? 'Active' : 'Blocked'}
                      </div>
                    </td>
                    <td className="pt-3 pb-3 px-6 text-greyText ">
                      {customer.mobile}
                    </td>

                    <td className="pt-3 pb-3 px-6 text-greyText ">
                      {customer.address}
                    </td>
                    <td className="pt-3 pb-3 px-6 text-greyText ">
                      {customer.pincode}
                    </td>

                    <td className="pt-3 pb-3 px-6">
                      <button
                        onClick={() =>
                          navigate(`/customers/edit-customer/${customer._id}`)
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
            {filteredCustomers?.length == 0 && 
<div className='w-full flex justify-center space-x-3 items-center min-h-32'>
<ExclamationCircleIcon className="h-10"/>
<h1>No Customers found</h1>
</div>
              }
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CustomerList;
