import { createBrowserRouter } from 'react-router-dom'
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout"
import DefaultLayoutAdmin from '../layouts/DefaultLayoutAdmin/DefaultLayoutAdmin'
import Dashboard from '../pages/Admin/Dasboard/Dashboard'
import ManageUser from '../pages/Admin/ManageUser/MangeUser'
import Home from '../pages/Client/Home'
import Menu from '../pages/Client/Menu'
import ProductDetail from '../pages/Client/ProductDetail'
import Login from '../layouts/login/Login'
import Cart from '../pages/Client/Cart'
import Payment from '../pages/Client/Payment'
import NotFound from '../pages/Client/NotFound/NotFound'
import Profile from '../pages/Client/Profile'
import AccountOrder from '../pages/Client/AccountOrder'
import AccountInfo from '../pages/Client/AccountInfo'
import AccountAddress from '../pages/Client/AccountAddress'
// import Login from '../pages/Admin/components/Login/Login';
import ManageProducts from '../pages/Admin/ManageProducts/ManageProducts';

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
          path: 'not-found',
          element: <NotFound />,
        },
      ],
    },
    {
      path: 'admin',
      element: <DefaultLayoutAdmin />,
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
        },
        {
          path: 'manage-products/:id',
          element: <ManageProducts />,
        },
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'products',
          element: <ManageUser />,
        },
        {
          path: 'products-filters',
          element: <ManageUser />,
        },
      ]
      }
    // {
    //   path: '*',
    //   element: <NotFound />,
    // },
 
    
  ])
  
  export default router
