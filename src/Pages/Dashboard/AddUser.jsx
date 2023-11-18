import { useState,useEffect } from "react"
import React from 'react'

import "./Dashboard.css"
import { showToast } from '../../Config/Global';
import { collection,setDoc,doc} from "firebase/firestore";
import { firestore } from "../../Config/Firebase";




const initialState={name:"",age:"",country:""}

const AddUser = () => {
  const [state, setState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [user,setUser] =useState([])
  



  const handleSubmit =async (e)=>{
    e.preventDefault()
    
    
    let { name, age, country} = state;

    name = name.trim();
    country = country.trim();
    age = Number(age);
    

    if (name.length < 4) {
      showToast(`Name length is short`, "error");
      return;
    }
    if (country.length < 2) {
      showToast(`Enter Correct Country`, "error");
      return;
    }
    if (!age || age < 0) {
      showToast(`Invalid Age Entered`, "error");
      return;
    }
    setIsLoading(true);
    let usersId = Math.random().toString(36).slice(2);
    let formData = { name, country, age, usersId };

    try {
      await setDoc(doc(firestore, "users", usersId), formData);
      console.log("Document written with ID: ", usersId);
      window.toastify(`Document written with ID: ${usersId}`, "success");
      
     
    } catch (e) {
      console.error("Error adding document: ", e);
      showToast(`Error adding document: ${e.message}`, "error");
    }
    setIsLoading(false);
    
    setState(...usersId,formData);

    resetForm();
    
  }
  const resetForm = () => {
    setState(initialState);
  };

  const handleChange=(e)=>{
    setState({...state,[e.target.name]: e.target.value})

  }
 

  return (
    <>
    
    <main className="bg">
    <div className="py-5 w-100">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
            <div className="card p-2 p-md-4 p-lg-5">
              <h2 className="text-center mb-4">Add Users Form</h2>
               <form onSubmit={handleSubmit} >
                <div className="row mb-3">
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      name="name"
                      value={state.name}
                       onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Age"
                      name="age"
                      value={state.age}
                     onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Country"
                      name="country"
                      value={state.country}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="row">
                  <div className="col text-center">
                    <button className="btn btn-success w-50">
                      {!isLoading ? (
                        <span>Add User</span>
                      ) : (
                        <div className="text-center">
                          <div className="spinner-border "></div>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
    </>
  )
}

export default AddUser