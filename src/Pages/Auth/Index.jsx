import React from 'react';
import { Route, Routes} from 'react-router-dom';
import SignIn from '../Auth/SignIn/SignIn';
import SignUp from '../Auth/SignUp/SignUp';
import Home from '../Dashboard/Home';
import About from '../Frontend/About';
import Homef from '../Frontend/Homef';



const Routesignin = () => {
 
  

  
  
  
  
  

  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<SignIn />} />
          <Route path="/signup/*" element={<SignUp />} />
          <Route path="/home/*" element={<Home />} />
          <Route path="/about/*" element={<About />} />
          <Route path="/homef/*" element={<Homef />} />
        </Route>
      </Routes>
    </>
  );
};

export default Routesignin;
