import AccountAddress from '../pages/Client/AccountAddress';
import AccountComment from '../pages/Client/AccountComment';
import AccountInfo from '../pages/Client/AccountInfo';
import AccountOrder from '../pages/Client/AccountOrder';
import Cart from '../pages/Client/Cart';
import Dashboard from '../pages/Admin/Dasboard/Dashboard';
import DefaultLayout from '../layouts/DefaultLayout/DefaultLayout';
import DefaultLayoutAdmin from '../layouts/DefaultLayoutAdmin/DefaultLayoutAdmin';
import Home from '../pages/Client/Home';
import Login from '../layouts/Login/Login';
import ManageCategory from '../pages/Admin/ManageCategory/ManageCategory';
import ManageOrders from '../pages/Admin/components/ManageOrders/ManageOrders';
import ManageProducts from '../pages/Admin/ManageProducts/ManageProducts';
import ManageRefund from '../pages/Admin/components/ManagerRefund/ManagerRefund';
import ManageUser from '../pages/Admin/ManageUser/MangeUser';
import Menu from '../pages/Client/Menu';
import ModalAddProduct from '../pages/Admin/components/ModalAddProduct/ModalAddProduct';
import ModelUpdateOrder from '../pages/Admin/components/ModelUpdateOrder/ModelUpdateOrder';
import ModelViewOrder from '../pages/Admin/components/ModalViewOrder/ModelViewOrder';
import ModelViewRefund from '../pages/Admin/components/ModelViewRefund/ModelViewRefund';
import NotFound from '../pages/Client/NotFound/NotFound';
import Payment from '../pages/Client/Payment';
import ProductDetail from '../pages/Client/ProductDetail';
import ProductDetails from '../pages/Admin/ProductDetails/ProductDetails';
import ProductFromCategory from '../pages/Admin/components/ProductFromCategory/ProductFromCategory';
import Profile from '../pages/Client/Profile';
import ProtectRoutes from '../pages/Admin/components/ProtectRoutes/ProtectRoutes';
import ProtectRoutesLogin from '../pages/Admin/components/ProtectRoutesLogin/ProtectRoutesLogin'
import UpdateProduct from '../pages/Admin/UpdateProduct/UpdateProduct';
import { createBrowserRouter } from 'react-router-dom';
import ManageAddress from '../pages/Admin/components/ManageAddress/ManageAddress';

// import Login from '../pages/Admin/components/Login/Login';













// import Prod

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
        path: 'manage-refund',
        element: <ManageRefund />,
      },
      {
        path: 'manage-refund/:orderID',
        element: <ModelViewRefund />,
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
