import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import PublicRouter from '../utils/PublicRouter';
import PrivateRouter from '../utils/PrivateRouter';

const Routing = () => {
  return (
    <Routes>
      <Route element={<PublicRouter/>}>
        <Route path="/" element={<LoginPage />} />
      </Route>
      <Route element={<PrivateRouter/>}>
        <Route path="/home" element={<HomePage />} />
      </Route>
    </Routes>
  );
};

export default Routing;
