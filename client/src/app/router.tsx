import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PublicRouter from '../utils/PublicRouter';

const Routing = () => {
  return (
    <Routes>
      <Route element={<PublicRouter/>}>
        <Route path="/" element={<LoginPage />} />
      </Route>
    </Routes>
  );
};

export default Routing;
