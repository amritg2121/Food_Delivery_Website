import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';


export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const navRef = useRef();
  let data = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login")
  }

  // Close nav when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (navOpen && navRef.current && !navRef.current.contains(event.target)) {
        setNavOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [navOpen]);

  return (
    <div>

      <nav className="navbar navbar-expand-lg navbar-dark bg-success" ref={navRef}>
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic amrfood-brand" to="/">AmrFood</Link>
          <button className="navbar-toggler" type="button" aria-label="Toggle navigation" onClick={() => setNavOpen(!navOpen)}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse${navOpen ? ' show' : ''}`} id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/" onClick={() => setNavOpen(false)}>Home</Link>
              </li>
              {(localStorage.getItem("authToken")) ?
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/myOrder" onClick={() => setNavOpen(false)}>My Orders</Link>
                </li>
                : ""}

            </ul>
            {(!localStorage.getItem("authToken")) ?
              <div className='d-flex'>
                <Link className="btn bg-white text-success mx-1" to="/login" onClick={() => setNavOpen(false)}>Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/creatuser" onClick={() => setNavOpen(false)}>SignUp</Link>
              </div>
              :
              <div>
                <div className='btn bg-white text-success mx-2' onClick={()=>{setCartView(true)}} >
                  My Cart {" "}
                  <Badge pill bg="danger" > {data.length} </Badge>
                </div>
                {cartView ? <Modal onClose={() => setCartView(false)} ><Cart onClose={() => setCartView(false)} /></Modal> : null}
                <div className='btn bg-white text-danger mx-2' onClick={handleLogout} >
                  Logout
                </div>
              </div>
            }
          </div>
        </div>
      </nav>
    </div>
  )
}
