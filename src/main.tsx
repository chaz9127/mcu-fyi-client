import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Home } from './pages/Home/Home.component';
import { Feedback } from './pages/Feedback/Feedback.component';
import { Auth } from './pages/Auth/Auth.component';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { MediaInfo } from './pages/MediaInfo/MediaInfo.component';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

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
    path: "/feedback",
    element: <Feedback />,
    // create error page
  },
  {
    path: "/auth",
    element: <Auth />,
    // create error page
  },
]);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
