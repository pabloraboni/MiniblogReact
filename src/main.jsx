import './index.scss'
import './sass/importClasses.scss'
import './sass/importComponents.scss'
import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

//pages
import PageHome from "./pages/Home/PageHome.jsx";
import Page404 from "./pages/404/Page404.jsx";
import PageAbout from './pages/About/PageAbout.jsx';
import PageLogin from './pages/Login/PageLogin.jsx'
import PageRegister from './pages/Register/PageRegister.jsx'
import PageDashboard from './pages/Dashboard/PageDashboard.jsx'
import PageCreatePost from './pages/CreatePost/PageCreatePost.jsx'
import PageSearch from './pages/Search/PageSearch.jsx'

import ProtectedRoute from './components/ProtectedRoute.jsx'
import PublicRoute from './components/PublickRoute.jsx'
import PagePost from './pages/Post/PagePost.jsx'
import PageEditPost from './pages/EditPost/PageEditPost.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element: <App />,
    errorElement: <Page404/>,
    children:[
      {
        path:"/",
        element: <PageHome/>
      },
      {
        path:"/about",
        element:<PageAbout/>
      },
      {
        path:"/search",
        element:<PageSearch/>
      },
      {
        path:"/posts/:id",
        element:<PagePost/>
      },
      {
        path: '/login',
        element: (
          <PublicRoute>
            <PageLogin />
          </PublicRoute>
        ),
      },
      {
        path:"/register",
        element:(
          <PublicRoute>
            <PageRegister />
          </PublicRoute>
        )
      },
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute>
            <PageDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path:"/posts/create",
        element:(
          <ProtectedRoute>
            <PageCreatePost />
          </ProtectedRoute>
        )
      },
      {
        path:"/posts/edit/:id",
        element:(
          <ProtectedRoute>
            <PageEditPost />
          </ProtectedRoute>
        )
      }
    ]
  }
]
, {
  basename: "/MiniblogReact"
}
);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
