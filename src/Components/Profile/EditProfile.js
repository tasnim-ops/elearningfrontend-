import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate('/user/profile'); 
    };
    const dispatch =useDispatch();
  return (
    
<div>
<div className='section'>
  <div className='container-fluid py-5'>
    <div className='row justify-content-center'>
      <div className='col-lg-6'>
        <div className='card mb-3' style={{ backgroundColor: '#e5f2ee' }}>
          <div className='row g-0'>
            <div style={{ backgroundColor: '#aad5c9' }} className='col-md-4 gradient-custom gradient-custom text-center text-white'>
              <img src='https://mdbcdn.b-cdn.net/img/new/avatars/2.webp' className='rounded-circle' style={{ width: '150px' }} alt='Avatar' />
              <h4>Name</h4>
              <p>Profession</p>
            </div>
            <div className='col-md-8'>
              <form>
                <div className='card-body p-4'>
                  <h6 className='d-flex justify-content-center'>Informations</h6>
                  <div className='row pt-4'>
                  <div className='col-md-6 mb-3'>
                  <i className="fi fi-sr-envelope"></i>                      
                    <input  type='email' className='form-control' required />
                  </div>
                  <div className='col-md-6 mb-3'>
                  <i class="fi fi-rr-phone-call"></i>
                    <input type='text' className='form-control' required />
                  </div>
                </div>
                <div className='row pt-4'>
                  <div className='col-md-6 mb-3'>
                  <h6 className='fab fa-facebook-f'></h6>
                    <input type='text' className='form-control' required />
                  </div>
                  <div className='col-md-6 mb-3'>
                  <h6 className='fab fa-twitter'></h6>
                    <input  type='text' className='form-control' required />
                  </div>
                </div>
                <div className='row pt-4'>
                  <div className='col-md-6 mb-3'>
                  <h6 className='fab fa-linkedin'></h6>
                    <input  type='text' className='form-control' required />
                  </div>
                  <div className='col-md-6 mb-3'>
                  <h6 className='fab fa-github'></h6>
                    <input  type='text' className='form-control' required />
                  </div>
                </div>
                </div>
              </form>
              <div className='d-flex justify-content-center'>
                <button type='button' className='btn btn-rounded btn-lg' style={{ backgroundColor: '#73c5e0' }}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>



</div>
  )
}

export default EditProfile