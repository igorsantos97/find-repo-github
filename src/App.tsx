import React from 'react';
import { ToastContainer } from 'react-toastify';

import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'

import GlobalStyle from './style/global'
import Routes from './routes';

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <GlobalStyle />
      <ToastContainer />
    </>
  )
}

export default App;
