import "bootstrap/dist/js/bootstrap.bundle";

import "./App.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routing from "./Routing/Routing";




function App() {
  return <>
  
  <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick

rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>

<Routing/>
  </>;
}

export default App;
