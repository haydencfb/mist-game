import React from 'react'
 import ReactDOM from 'react-dom/client'
 import { createBrowserRouter, RouterProvider } from 'react-router-dom'
 import 'bootstrap/dist/css/bootstrap.min.css'

 import App from './App.jsx'
//  import SearchBooks from './pages/SearchBooks'
 import SavedBooks from './pages/SavedBooks'
 import SignupForm from './components/SignupForm'
 import LoginForm from './components/LoginForm'

 const router = createBrowserRouter([
   {
     path: '/',
     element: <App />,
     errorElement: <h1 className='display-2'>Wrong page!</h1>,
     children: [
       {
         index: true,
         element: <LoginForm handleModalClose={function (): void {
           throw new Error('Function not implemented.')
         } } />
       }, {
         path: '/saved',
         element: <SavedBooks />
       }, {
        path: '/signup',
        element: <SignupForm handleModalClose={function (): void {
          throw new Error('Function not implemented.')
        } } />
      },  
     ]
   }
 ])


  ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
 )