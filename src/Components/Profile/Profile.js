import React from 'react'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate('/user/editprofile'); 
    };
  return (
    <>
      <div className='section' >
        <div className='container py-5 h-100' >
          <div className='row d-flex justify-content-center align-items-center h-100' >
            <div className='col col-lg-6 mb-4 mb-lg-0'>
              <div className='card mb-3' style={{backgroundColor:'#e5f2ee'}}>
                <div className='row g-0'>
                  <div style={{backgroundColor:'#aad5c9'}} className='col-md-4 gradient-custom gradient-custom text-center text-white'>
                  <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" class="rounded-circle" style={{width: '150px'}}
                    alt="Avatar" />                    
                    <h4>Name</h4>
                    <p>profession</p>
                    <i class="far fa-edit mb-5"></i>
                  </div>
                <div className='col-md-8'>
                  <div className='card-body p-4'>
                    <h6 className=' d-flex justify-content-center' >Informations</h6>
                      <div className='row pt-1'>
                        <div className='col-6 mb-3'>
                          <h6>Email</h6>
                          <p>info@exemple.com</p>
                        </div>
                        <div className='col-6 mb-3'>
                          <h6>Phone</h6>
                          <p>+215681582</p>
                        </div>
                      </div>
                  </div>
                  <div className="d-flex justify-content-center">
                  <a href="#!"><i className="fab fa-facebook-f fa-lg me-3"></i></a>
                  <a href="#!"><i className="fab fa-twitter fa-lg me-3"></i></a>
                  <a href="#!"><i className="fab fa-linkedin fa-lg me-3"></i></a>
                  <a href="#!"><i className="fab fa-github fa-lg"></i></a>
                </div>
                <div className="d-flex justify-content-center">
                <button type="button" class="btn btn-primary btn-rounded btn-lg ">
                  Message now
                </button>
                </div>

                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile