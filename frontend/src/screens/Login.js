
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const loginModalRef = useRef(null);

  useEffect(() => {
    if (loginModalRef.current) {
      loginModalRef.current.classList.add('show');
      loginModalRef.current.style.display = 'block';
      document.body.classList.add('modal-open');
    }
  }, []);

  const closeLoginModal = () => {
    if (loginModalRef.current) {
      loginModalRef.current.classList.remove('show');
      loginModalRef.current.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/loginuser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    if (!json.success) {
      setShowError(true);
    } else {
      closeLoginModal();
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      navigate('/');
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };



  return (
    <div className='container'>
      {/* Login Modal (opens automatically) */}
  <div className='modal fade' id='loginModal' tabIndex='-1' aria-labelledby='loginModalLabel' aria-hidden='true' ref={loginModalRef}>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='loginModalLabel'>Login</h5>
              <button type='button' className='btn-close' onClick={closeLoginModal}></button>
            </div>
            <div className='modal-body'>
              <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                  <label htmlFor='email' className='form-label'>Email address</label>
                  <input type='email' className='form-control' name='email' value={credentials.email} onChange={onChange} required />
                </div>
                <div className='mb-3'>
                  <label htmlFor='password' className='form-label'>Password</label>
                  <input type='password' className='form-control' name='password' value={credentials.password} onChange={onChange} required />
                </div>
                <button type='submit' className='btn btn-success'>Submit</button>
                <Link to='/creatuser' className='m-3 btn btn-danger'>I'm a new user</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Error Modal */}
      {showError && (
        <div className='modal fade show d-block' tabIndex='-1' role='dialog' style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className='modal-dialog' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>Login Failed</h5>
              </div>
              <div className='modal-body'>
                <p>Invalid email or password. Please try again.</p>
              </div>
              <div className='modal-footer'>
                <button className='btn btn-primary' onClick={() => setShowError(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
