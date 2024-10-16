import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import PublicRouter from '../utils/PublicRouter';
import PrivateRouter from '../utils/PrivateRouter';
import SharedLayout from './pages/SharedLayout';
import ProductsPage from './pages/ProductsPage';

const Routing = () => {
  return (
    <Routes>
      <Route element={<PublicRouter/>}>
        <Route path="/" element={<LoginPage />} />
      </Route>
      <Route element={<PrivateRouter/>}>
      <Route element={<SharedLayout/>}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/products/*" element={<ProductsPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Routing;
