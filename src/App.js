import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './ui/RootLayout';
import Main from './features/dashboard/Main';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import ProductAdmin from './features/admin/ProductAdmin';
import AddForm from './features/admin/AddForm';
import ProductEdit from './features/admin/ProductEdit/ProductEdit';
import ProductDetail from './features/product/ProductDetail';
import AdminRoute from './ui/AdminRoute';
import CartPage from './features/cart/CartPage';



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


        //admin routes
        {
          element: <AdminRoute/>,
          children: [
            {
              path: 'product-admin',
              element: <ProductAdmin/>
            },
            {
              path: 'product-add',
              element: <AddForm/>
            },
            {
              path: 'product-edit/:id',
              element: <ProductEdit/>
            },
          ]
        },
      
        
        
       
        {
          path: 'product-detail/:id',
          element: <ProductDetail/>
        },
    
        {
          path: 'cart-page',
          element: <CartPage/>
        }    


      ]

    },



  ]);

  return <RouterProvider router={router} />
}

export default App