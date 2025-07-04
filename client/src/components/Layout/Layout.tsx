import { Outlet } from 'react-router-dom';
import Header from '../Navbar/NavBar';

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
