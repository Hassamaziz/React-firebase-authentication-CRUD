import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../Config/Firebase';
import { signOut } from 'firebase/auth';
import { showToast } from '../../Config/Global';

const Header = () => {

    const Navigate = useNavigate();
    const [user, setUser] = useState("");
    const handleLogout = () => {
        signOut(auth)
          .then(() => {
            showToast("User Signed Out", 'success');
            setUser({});
            Navigate('/')
          })
          .catch(() => {
            showToast("Sign Out Failed", 'error');
          });
      };
  return (
    <nav className="navbar navbar-expand-lg bg-body-secondary">
      <div className="container d-flex justify-content-around">
        <a className="navbar-brand" href="#">
          CRUD APP
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            <Link className="nav-link active" aria-current="page" to={'/homef'}>
              Home
            </Link>
            <Link className="nav-link" to={'/home'}>
              CRUD
            </Link>
            <Link className="nav-link" to={'/about'}>
              About
            </Link>
            <Link className="nav-link" to={'/'}>
              SignIn
            </Link>
            <button
            onClick={handleLogout}
            className="btn btn-style btn-danger signup-welcome-btn"
          >
            Sign Out
          </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
