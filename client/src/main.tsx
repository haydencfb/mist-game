import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import SearchBooks from './pages/SearchBooks';
import Playing from './pages/Playing';
import Wishlist from './pages/Wishlist';
import Completed from './pages/Completed';
import SignupForm from './components/SignupForm';
import LoginForm from './pages/LoginForm';

// Define routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      { index: true, element: <LoginForm /> },
      { path: '/signup', element: <SignupForm handleModalClose={() => {}} /> },
      { path: '/search', element: <SearchBooks /> },
      { path: '/wishlist', element: <Wishlist /> },
      { path: '/playing', element: <Playing /> },
      { path: '/completed', element: <Completed /> },
    ],
  },
]);

// Render the app
ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);