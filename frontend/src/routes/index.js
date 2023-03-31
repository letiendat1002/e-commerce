import { createBrowserRouter } from 'react-router-dom'
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout"
import DefaultLayoutAdmin from '../layouts/DefaultLayoutAdmin/DefaultLayoutAdmin'
import Dashboard from '../pages/Admin/Dasboard/Dashboard'
import ManageUser from '../pages/Admin/ManageUser/MangeUser'
import Home from '../pages/Client/Home'
import Menu from '../pages/Client/Menu'
import ProductDetail from '../pages/Client/ProductDetail'
import Login from '../pages/Admin/components/Login/Login';
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
