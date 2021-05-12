import React, { useState, useEffect } from 'react';
import { Routes } from './Router';
import { setAccessToken } from './shared/AccessToken';
import { request } from './shared/http';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setUser } from './shared/UserInformation';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    request
      .post('/refresh_token')
      .then((response) => {
        const { accessToken } = response.data;
        const { user } = response.data;
        if (accessToken && user) {
          setAccessToken(accessToken);
          setUser(user);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader />;
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
