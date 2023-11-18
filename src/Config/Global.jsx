import React from 'react';
import { toast } from 'react-toastify';


 export const showToast = (msg,type) => {
    switch (type) {
      case 'success':
        toast.success(msg);
        break;
      case 'error':
        toast.error(msg);
        break;
      case 'info':
        toast.info(msg);
        break;
        case 'warn':
        toast.warn(msg);
        break;
      default:
        toast("error");
    }
  };

 

