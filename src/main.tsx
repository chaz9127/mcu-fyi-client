import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Home } from './pages/Home/Home.component';
import { AdminFeedback } from './pages/AdminFeedback/AdminFeedback.component';
import { Auth } from './pages/Auth/Auth.component';
import { Admin } from './pages/Admin/Admin.component';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { MediaInfo } from './pages/MediaInfo/MediaInfo.component';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { Provider } from 'react-redux';
import { store } from './features/store';
import { ToastContainer } from 'react-toastify';
import { Footer } from './components/Footer/Footer.component';

if (import.meta.env.VITE_NODE_ENV === 'production') disableReactDevTools(); 

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    // create error page
  },
  {
    path: "/media/:slug",
    element: <MediaInfo />,
    // create error page
  },
  {
    path: "/auth",
    element: <Auth />,
    // create error page
  },
  {
    path: "/admin",
    element: <Admin />,
    // create error page
  },
  {
    path: "/admin/feedback",
    element: <AdminFeedback />,
    // create error page
  },
]);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Footer />
    </Provider>
    <ToastContainer theme="dark" />
  </React.StrictMode>
);
