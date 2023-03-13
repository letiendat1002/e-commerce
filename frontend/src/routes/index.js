import { createBrowserRouter } from 'react-router-dom'
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout"
import DefaultLayoutAdmin from '../layouts/DefaultLayoutAdmin/DefaultLayoutAdmin'
import Dashboard from '../pages/Admin/Dasboard/Dashboard'
import ManageUser from '../pages/Admin/ManageUser/MangeUser'
import Home from '../pages/Client/Home'
import Menu from '../pages/Client/Menu'


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
                element:<Dashboard/>
            },
            {
                path: 'manage-user',
                element:<ManageUser/>
            }
        ]
    }
    // {
    //   path: '*',
    //   element: <NotFound />,
    // },
 
    
  ])
  
  export default router