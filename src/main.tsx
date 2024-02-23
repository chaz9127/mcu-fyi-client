import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Home } from './pages/Home/Home.component';
import { Nav } from './components/Nav/Nav.component';
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
    path: "/media/:title",
    element: <MediaInfo />,
    // create error page
  },
]);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Nav />
    <RouterProvider router={router} />
  </React.StrictMode>
);
