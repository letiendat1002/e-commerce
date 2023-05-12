import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout/DefaultLayout';
import DefaultLayoutAdmin from '../layouts/DefaultLayoutAdmin/DefaultLayoutAdmin';
import Login from '../layouts/Login/Login';
import Dashboard from '../pages/Admin/Dasboard/Dashboard';
import ManageUser from '../pages/Admin/ManageUser/MangeUser';
import AccountAddress from '../pages/Client/AccountAddress';
import AccountInfo from '../pages/Client/AccountInfo';
import AccountOrder from '../pages/Client/AccountOrder';
import Cart from '../pages/Client/Cart';
import Home from '../pages/Client/Home';
import Menu from '../pages/Client/Menu';
import NotFound from '../pages/Client/NotFound/NotFound';
import Payment from '../pages/Client/Payment';
import ProductDetail from '../pages/Client/ProductDetail';
import Profile from '../pages/Client/Profile';
import AccountComment from '../pages/Client/AccountComment';
// import Login from '../pages/Admin/components/Login/Login';
import ManageProducts from '../pages/Admin/ManageProducts/ManageProducts';
import ManageCategory from '../pages/Admin/ManageCategory/ManageCategory';
import ManageOrders from '../pages/Admin/components/ManageOrders/ManageOrders';
import ProductDetails from '../pages/Admin/ProductDetails/ProductDetails';
import UpdateProduct from '../pages/Admin/UpdateProduct/UpdateProduct';
import ProtectRoutes from '../pages/Admin/components/ProtectRoutes/ProtectRoutes';
import ModelViewOrder from '../pages/Admin/components/ModalViewOrder/ModelViewOrder';
import ModelUpdateOrder from '../pages/Admin/components/ModelUpdateOrder/ModelUpdateOrder';
import ProductFromCategory from '../pages/Admin/components/ProductFromCategory/ProductFromCategory';
import ModalAddProduct from '../pages/Admin/components/ModalAddProduct/ModalAddProduct';
import ProtectRoutesLogin from '../pages/Admin/components/ProtectRoutesLogin/ProtectRoutesLogin';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        path: '/',
        element: <Home />,
      },
      {
        path: '/category/:slug',
        element: <Menu />,
      },
      {
        path: '/:slug',
        element: <ProductDetail />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/payment',
        element: <Payment />,
      },
      {
        path: '/login',
        element: (
          <ProtectRoutesLogin>
            <Login />
          </ProtectRoutesLogin>
        ),
      },
      {
        path: '/logout',
        element: <Login />,
      },
      {
        path: '/account/profile',
        element: <Profile />,
      },
      {
        path: '/account/order',
        element: <AccountOrder />,
      },
      {
        path: '/account/infor',
        element: <AccountInfo />,
      },
      {
        path: '/account/address',
        element: <AccountAddress />,
      },
      {
        path: '/account/comment',
        element: <AccountComment />,
      },
      {
        path: '/*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: 'admin',
    element: (
      <ProtectRoutes>
        <DefaultLayoutAdmin />
      </ProtectRoutes>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'manage-user',
        element: <ManageUser />,
      },
      {
        path: 'manage-products',
        element: <ManageProducts />,
        children: [],
      },
      {
        path: 'manage-products/:idProduct',
        element: <ProductDetails />,
      },
      {
        path: 'manage-products/update/:idProduct',
        element: <UpdateProduct />,
      },
      {
        path: 'manage-categories',
        element: <ManageCategory />,
      },
      {
        path: 'manage-categories/:idCategory',
        element: <ProductFromCategory />,
      },
      {
        path: 'products-filters',
        element: <ManageUser />,
      },
      {
        path: 'manage-orders',
        element: <ManageOrders />,
      },
      {
        path: 'manage-orders',
        element: <ManageOrders />,
      },
      {
        path: 'manage-orders/:orderID',
        element: <ModelViewOrder />,
      },
      {
        path: 'add-product',
        element: <ModalAddProduct />,
      },
    ],
  },
  // {
  //   path: '*',
  //   element: <NotFound />,
  // },
]);

export default router;
