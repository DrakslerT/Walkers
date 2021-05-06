import React, { useState, useEffect } from 'react';
import { Routes } from './Router';
import { setAccessToken } from './shared/AccessToken';
import { request } from './shared/http';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    request
      .post('/refresh_token')
      .then((response) => {
        const { accessToken } = response.data;
        if (accessToken) {
          setAccessToken(accessToken);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
      <Routes />
    </>
  );
};
