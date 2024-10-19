import CreateOrder from '../../features/sales_feature/components/CreateOrder';
import EditOrder from '../../features/sales_feature/components/EditOrder';
import OrdersList from '../../features/sales_feature/components/OrdersList';
import { Route, Routes } from 'react-router-dom';

const SalesPage = () => {
  return (
    <div className=" relative flex md:w-[90vw]  justify-end  bg-contentWhite">
      <div className="absolute inset-0  items-start justify-start p-10">
        <Routes>
          <Route index element={<OrdersList />} />
          <Route path="add-order" element={<CreateOrder />} />
          <Route path="edit-order/:id" element={<EditOrder />} />
        </Routes>{' '}
      </div>
    </div>
  );
};

export default SalesPage;
