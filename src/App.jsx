import './App.css';
import React from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes.jsx';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { store } from './store/store.js';

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  );
}

export default App;
