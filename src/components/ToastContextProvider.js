/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { toast } from 'material-react-toastify';
import React, { createContext } from 'react';

export const ToastContext = createContext({});

// export default ToastContext;

export const ToastContextProvider = ({ children }) => {
  // const [toast, setToast] = useState([]);
  const notifyError = message => toast.error(message, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  const notifySuccess = message => toast.success(message, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  return (
    <ToastContext.Provider value={{ notifyError, notifySuccess }}>
      {children}
    </ToastContext.Provider>
  );
};
