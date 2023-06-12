import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import Home from './Pages/Home.jsx'
import About from './Pages/About.jsx'
import Menu from './Pages/Menu.jsx'
import Reservations from './Pages/Reservations.jsx'
import Order from './Pages/Order.jsx';
import Login from './Pages/Login.jsx'

import { theme } from './theme'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/menu',
    element: <Menu />
  },
  {
    path: '/reservations',
    element: <Reservations />
  },
  {
    path: '/order',
    element: <Order />
  },
  {
    path: '/login',
    element: <Login />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
)
