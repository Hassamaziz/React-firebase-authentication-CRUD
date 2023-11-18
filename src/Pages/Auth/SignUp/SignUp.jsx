import React, { useState } from 'react';
import "../../../Styles/Signup.css"
import logo from "../../../Assets/Images/icon-512.png";
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../Config/Firebase';
import { showToast } from '../../../Config/Global';
import { useNavigate } from 'react-router-dom';

const initialState = { email: "", password: "", confirmPassword: "" };

const SignUp = () => {
  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

   const Navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password, confirmPassword } = state;

    // Check if the password and confirm password match
    if (password !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(userCredential);
        console.log(user);

        showToast('Sign Up Successful', 'success');
        Navigate('/')
        
      })
      .catch((error) => {
        showToast('Sign Up Failed', 'error');
        console.log(error);
      });
  };

  return (
    <div>
      <div className="background pb-5">
        <div className="container centering mt-5 ">
          <form className="my-form mb-5" onSubmit={handleSubmit}>
            <div className="signup-welcome-row">
              <img className="signup-welcome" src={logo} alt="Logo" />
              <h1>Sign Up!</h1>
            </div>

            <div className="my-form__content">
              <div className="text-field">
                <label htmlFor="email">Email:</label>
                <input
                  aria-label="Email"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  autoComplete="off"
                  required
                  onChange={handleChange}
                />
                {/* ... */}
              </div>

              <div className="text-field">
                <label htmlFor="password">Password:</label>
                <input
                  id="password"
                  type="password"
                  aria-label="Password"
                  name="password"
                  autoComplete="off"
                  placeholder="Create Password"
                  title="Minimum 6 characters at least 1 Alphabet and 1 Number"
                  required
                  onChange={handleChange}
                />
                {/* ... */}
              </div>

              {/* Confirm Password */}
              <div className="text-field">
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                  id="confirmPassword"
                  type="password"
                  aria-label="Confirm Password"
                  name="confirmPassword"
                  autoComplete="off"
                  placeholder="Confirm Password"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            <button type="submit" className="my-form__button btn btn-sm btn-outline-light" value="Sign-In">
            Sign-Up
            </button>
            <div className="my-form__actions">
            <span>
              By registering you agree to our {' '}
              <a href="#" title="Reset Password">
               Terms 
              </a> {' '}
              and{' '}
              <a href="#" title="Reset Password">
                Privacy
              </a>
            </span>
            <span>
              Already Have An Account
              <div className="my-form__signin">
                <Link className="mx-3" href="/" to={"/"} title="Sign In">
                  Sign-In
                </Link>
              </div>
            </span>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;



