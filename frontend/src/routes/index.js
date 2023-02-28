import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout/DefaultLayout';
import About from '../pages/About/About';
import Contact from '../pages/Contact/Contact';
import Error from '../pages/Error/Error';
import HomePage from '../pages/Home/HomePage';
import Post from '../pages/Post/Post';
import Product from '../pages/Product/Product';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout/>,
    children: [
      {
        index: true,
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/news',
        element: <About />,
      },
      {
        path: '/payments',
        element: <Contact />,
      },
      {
        path: '/cart',
        element: <Product />,
      },
      {
        path: '/post/:postId',
        element: <Post />,
      },
    ],
  },
  {
    path: '/*',
    element: <Error />,
  },
]);

export default router;
