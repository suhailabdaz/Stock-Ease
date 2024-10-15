import { Outlet } from 'react-router-dom';
import SideBar from '../../components/SideBar';
import Header from '../../components/Header';

function SharedLayout() {
  return (
    <div>
      <Header />
      <div className="flex">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
}

export default SharedLayout;
