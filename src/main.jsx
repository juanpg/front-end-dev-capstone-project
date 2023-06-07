import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import Home from './Pages/Home.jsx'
import Reservations from './Pages/Reservations.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: '/reservations',
    element: <Reservations />
  }
]);

const theme = extendTheme({
  fonts: {
    body: `'Karla'`,
    heading: `'Markazi Text', serif`,
  },
  colors: {
    primary: {
      green: '#495E57',
      yellow: '#F4CE14'
    },
    secondary: {
      orange: '#EE9972',
      pink: '#FBDABB',
      lightGray: '#EDEFEE',
      darkGray: '#333333'
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
)
