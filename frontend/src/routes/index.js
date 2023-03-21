import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout/DefaultLayout';
import DefaultLayoutAdmin from '../layouts/DefaultLayoutAdmin/DefaultLayoutAdmin';
import Login from '../pages/Admin/components/Login/Login';
import Dashboard from '../pages/Admin/Dasboard/Dashboard';
import ManageProducts from '../pages/Admin/ManageProducts/ManageProducts';
import ManageUser from '../pages/Admin/ManageUser/MangeUser';
import Home from '../pages/Client/Home';
import NotFound from '../pages/NotFound/NotFound';

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
      // {
      //   path: '/about',
      //   element: <About />,
      // },
      // {
      //   path: '/contact',
      //   element: <Contact />,
      // },
      // {
      //   path: '/products',
      //   element: <ProductList />,
      // },
      // {
      //   path: '/products/:productId',
      //   element: <ProductDetails />,
      // },
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
      // {
      //   path: 'manage-category',
      //   element: <ManageUser />,
      // },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
