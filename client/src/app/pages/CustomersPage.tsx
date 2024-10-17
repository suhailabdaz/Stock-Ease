import AddCustomer from '../../features/customer_feature/components/AddCustomer';
import EditCustomer from '../../features/customer_feature/components/EditCustomer';
import CustomerList from '../../features/customer_feature/components/CustomerList';
import { Route, Routes } from 'react-router-dom';

const CustomersPage = () => {
  return (
    <div className=" relative flex md:w-[90vw]  justify-end  bg-contentWhite">
      <div className="absolute inset-0  items-start justify-start p-10">
        <Routes>
          <Route index element={<CustomerList />} />
          <Route path="add-customer" element={<AddCustomer />} />
          <Route path="edit-customer/:id" element={<EditCustomer />} />
        </Routes>{' '}
      </div>
    </div>
  );
};

export default CustomersPage;
