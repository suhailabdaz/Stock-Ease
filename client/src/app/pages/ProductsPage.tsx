import AddProduct from '../../features/inventory_feature/components/AddProduct';
import ProductList from '../../features/inventory_feature/components/ProductList';
import { Route, Routes } from 'react-router-dom';

const ProductsPage = () => {
  return (
    <div className=" relative flex md:w-[90vw]  justify-end  bg-contentWhite">
      <div className="absolute inset-0  items-start justify-start p-10">
        <Routes>
          <Route index element={<ProductList />} />
          <Route path="add-product" element={<AddProduct />} />
        </Routes>{' '}
      </div>
    </div>
  );
};

export default ProductsPage;
