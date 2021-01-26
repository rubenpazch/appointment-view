/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { toast } from 'material-react-toastify';
import React, { createContext } from 'react';

export const ToastContext = createContext({});

// export default ToastContext;

export const ToastContextProvider = ({ children }) => {
  // const [toast, setToast] = useState([]);

  const notify = message => toast.error(message, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  // toast.success(' Wow so easy!', {
  //   position: 'top-center',
  //   autoClose: 3000,
  //   hideProgressBar: true,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  // });

  return (
    <ToastContext.Provider value={{ notify }}>
      {children}
    </ToastContext.Provider>
  );
};
