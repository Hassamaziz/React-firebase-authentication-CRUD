import React, { useState, useEffect } from 'react';
import "../../../Styles/Signup.css"
import logo from "../../../Assets/Images/icon-512.png";
import Google from "../../../Assets/Images/google.png";
import { Link} from 'react-router-dom';
import {  signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, sendEmailVerification } from "firebase/auth";
import { auth } from '../../../Config/Firebase';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { showToast } from '../../../Config/Global';
import { useNavigate } from 'react-router-dom';






const initialState = { email: "", password: "" };

const SignIn = () => {
  const [state, setState] = useState(initialState);
  const [user, setUser] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [updateDisplayName, setUpdateDisplayName] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        // User is signed out
      }
    });
  }, []);

  // Google Sign In
  const GoogleSignIn = (e) => {
    e.preventDefault();

    
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        showToast("Google Sign In successful", 'success');
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        showToast(errorMessage, 'error');
      });
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const Navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = state;


    // Email Sign in
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        showToast("Sign In Successful", 'success');
        
      })
      .catch((error) => {
        const errorMessage = error.message;
        showToast(errorMessage, 'error');
      });
  };


  // Logout Code
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        showToast("User Signed Out", 'success');
        setUser({});
      })
      .catch(() => {
        showToast("Sign Out Failed", 'error');
      });
  };

  // Update profile code
  const userUpdateProfile = () => {
    
  
    if (updateDisplayName) {
      updateProfile(auth.currentUser, {
        displayName: displayName
      }).then(() => {
        if (!displayName) {
          showToast("Please enter a Username", 'error');
          return;
        }
        showToast("Profile Updated", 'success');
        setUpdateDisplayName(false);
      }).catch((error) => {
        showToast("Update Failed", 'error');
      });
    } else {
      setUpdateDisplayName(true);
    }
  };
  //  Email verify 

  const userEmailVerify = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        showToast("Email Sent", 'success');
      }).catch(() => {
        showToast("Email Sending Failed", 'error');
      });
  };
  
  
  
  

  return (
    <div>
      <div className="background pb-5 pt-5">
        <div className="container centering ">
          {user.email ? (
            <div className="signup-welcome-row">
              <div>
                <h1 className=" text-center">
                  Hey <span className="text-white"> {user.displayName}</span>
                  <br></br> You Are Signed In..
                </h1>
              </div>
              <img className="signup-welcome mt-3 mb-3" src={logo} alt="Logo" />
              {updateDisplayName ? (
                <div className='d-grid gap-2'>
                  <input
                  style={{color: 'var(--text-lighter)',
                  fontSize: '16px',
                  fontWeight: 500,
                  maxWidth: '100%',
                  width: '100%',
                  border: '1px solid var(--text-lighter)',
                  height: '40px',
                  letterSpacing: '.03rem',
                  backgroundColor: 'white',
                  outline: 'none',
                  transition: '.25s',
                  borderRadius: '8px',
                  textIndent: '20px',
                  marginTop: '8px',}}
                    type="text"
                    required
                    placeholder='Enter Username'
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                  <button
                    onClick={userUpdateProfile}
                    className="btn btn-style btn-info text-white mx-3 "
                  >
                    Save
                  </button>
                </div>
              ) : (

                <button
                  onClick={userUpdateProfile}
                  className="btn btn-style btn-info text-white  "
                >
                  Update UserName
                </button>
                
              )}
              <button
                onClick={userEmailVerify}
                className="btn btn-style btn-secondary text-white  "
              >
                Verify Email
              </button>
             <Link to={'/home'} > <button className="btn btn-style btn-success signup-welcome-btn"   >Go to CRUD App</button></Link>
              <button
                onClick={handleLogout}
                className="btn btn-style btn-danger signup-welcome-btn"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <form className="my-form mb-5" onSubmit={handleSubmit}>
              <div className="signup-welcome-row">
                <img className="signup-welcome" src={logo} alt="Logo" />
                <h1>Sign In!</h1>
              </div>
              <div className="socials-row d-flex justify-content-center">
                <button onClick={GoogleSignIn} className="btn btn-style btn-lg btn-outline-dark">
                  <img src={Google} alt="Google" />
                  Google
                </button>
              </div>
              <div className="divider">
                <span className="divider-line"></span>
                OR
                <span className="divider-line"></span>
              </div>
              <div className="my-form__content">
                <div className="text-field">
                  <label htmlFor="email">Email:</label>
                  <input
                    aria-label="Email"
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="Your Email"
                    autoComplete="on"
                    onChange={handleChange}
                  />
                </div>
                <div className="text-field">
                  <label htmlFor="password">Password:</label>
                  <input
                    id="password"
                    type="password"
                    aria-label="Password"
                    name="password"
                    autoComplete="off"
                    placeholder="Enter Your Password"
                    title="Minimum 6 characters at least 1 Alphabet and 1 Number"
                    pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <button type="submit" className="my-form__button btn btn-sm btn-outline-light" value="Sign-In">
                Sign-In
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
                  Don't Have An Account?
                  <div className="my-form__signin">
                    <Link className="mx-3" href="/" to={"/signup"} title="Sign Up">
                      Sign-Up
                    </Link>
                  </div>
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
