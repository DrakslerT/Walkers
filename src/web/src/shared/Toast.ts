import { toast, ToastOptions } from 'react-toastify';

const ToastConfig: ToastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
}

export const successToast = (message?: string) => {
  const toastText = message ? message : 'Success! 🐾';
  toast.success(toastText, ToastConfig);
};

export const errorToast = (message?: string) => {
  const toastText = message ? message : 'Unexpected error has occurred! ⚠️';
  toast.error(toastText, ToastConfig);
};
