import React, { useState } from 'react'
import AddUser from './AddUser'
import ReadUser from './ReadUser'
import "./Dashboard.css"
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../Config/Firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { showToast } from '../../Config/Global'





const Home = () => {
  
 
  const [user,setUser] =useState([])

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Check if the user object exists and if it's authenticated
      if (user && user.uid) {
        setUser(user);
      } else {
        setUser(null); // Clear the user state
        if (!user) {
          showToast("Please Sign In", "warn"); // Show the toast only when user is not authenticated
        }
        navigate("/");
      }
    });
  
    // Cleanup the observer when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [navigate]);

  return (<>
    <Header/>
    <div className='bg'>
  
    <AddUser/>
    <ReadUser />
    <Footer/>
    </div></>
  )
}

export default Home