
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'
import SearchBooks from './pages/SearchBooks'
import Playing from './pages/Playing.js'
import Wishlist from './pages/Wishlist.js'
import Completed from './pages/Completed.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <SearchBooks />
      },
      {
        path: '/wishlist',
        element: <Wishlist />
      },
      {
        path: '/playing',
        element: <Playing />
      },
      {
        path: '/completed',
        element: <Completed />
      },
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)