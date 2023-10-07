import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import App from './App.tsx'
import './index.css'

const theme = extendTheme({
  colors: {
    main: '#4B7881',
  },
  fonts: {
    heading: "'Rubik Variable', sans-serif",
    body: "'Rubik Variable', sans-serif",
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
