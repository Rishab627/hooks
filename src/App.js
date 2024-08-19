import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './ui/RootLayout';
import Main from './features/dashboard/Main';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import ProductAdmin from './features/admin/ProductAdmin';
import AddForm from './features/admin/AddForm';



const App = () => {


    // const {isError, isFetching, isLoading, data} = useGetAllProductsQuery();

  const router = createBrowserRouter([

    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          index: true,
          element:<Main/>

        },
        {
            path: 'login',
            element: <Login/>
        },
        {
            path: 'register',
            element: <Register/>
        },
        {
          path: 'product-admin',
          element: <ProductAdmin/>
        },
        {
          path: 'product-add',
          element: <AddForm/>
        }
    
    


      ]

    },



  ]);

  return <RouterProvider router={router} />
}

export default App