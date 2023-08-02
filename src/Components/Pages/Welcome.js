import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { Teachers } from '../Profile/Teachers';
import Box from '@mui/material/Box';

const Welcome = () => {
  return (
<div className="App">
      <div className="container-fluid">
        <div className="row flex-md-row flex-sm-column-reverse">
          <div className="col-md-5 col-sm-12 mt-md-0 mt-sm-4 text-center" style={{ height: '600px' }}>
            <img style={{ width: '100%', height: '100%' }} src="https://res.cloudinary.com/ddbiyenrd/image/upload/v1690671894/222222222222_ajn8xf.jpg" alt="Female Care" />
          </div>
          <div className="custom-section col-md-7 col-sm-12 test_box box-01" style={{ height: '600px' }}>
            <div className="">
              <div className="inner">
                <div className="flex_this">
                  <h2 className="test_title">Online learning platform</h2>
                  <h4 className="mt-5 custom-text">Welcome to our IT e-learning platform! Unlock the world of technology and sharpen your skills with our specialized courses</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row flex-md-row-reverse flex-sm-column-reverse">
          <div className="col-md-5 col-sm-12 mt-md-0 mt-sm-4 text-center" style={{ height: '600px' }}>
            <img style={{ width: '100%', height: '100%' }} src="https://res.cloudinary.com/ddbiyenrd/image/upload/v1690671527/hrfth_ub28wh.png" alt="Female Care" />
          </div>
          <div className="custom-section col-md-7 col-sm-12 test_box box-01" style={{ height: '600px' }}>
            <div className="">
              <div className="inner">
                <div className="flex_this">
                  <h3 className="test_title">Are you ready to unlock the boundless opportunities that online learning has to offer?</h3>
                  <h4 className="mt-5 custom-text">Empower Your Potential with Online IT Learning. Unlock Limitless Opportunities</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid d-flex flex-column flex-sm-row justify-content-center align-items-center">
        <div className="card text-bg-success mb-3 col align-items-center" style={{ maxWidth: '18rem', height: '80px' }}>
          <div className="card-header">AI</div>
        </div>
        <div className="card text-bg-danger mb-3 col align-items-center" style={{ maxWidth: '18rem', height: '80px' }}>
          <div className="card-header">Web Development</div>
        </div>
        <div className="card text-bg-warning mb-3 col align-items-center" style={{ maxWidth: '18rem', height: '80px' }}>
          <div className="card-header">Mobile Development</div>
        </div>
        <div className="card text-bg-info mb-3 col align-items-center" style={{ maxWidth: '18rem', height: '80px' }}>
          <div className="card-header">Security</div>
        </div>
        <div className="card text-bg-primary mb-3 col align-items-center" style={{ maxWidth: '18rem', height: '80px' }}>
          <div className="card-header">Software</div>
        </div>
      </div>


      <div className="container-fluid">
        <div className="row flex-md-row-reverse flex-sm-column-reverse">
          <div className="col-md-5 col-sm-12 mt-md-0 mt-sm-4 text-center" style={{ height: '600px' }}>
            <img style={{ width: '100%', height: '100%' }} src="https://res.cloudinary.com/ddbiyenrd/image/upload/v1690735850/55_vymujd.jpg" alt="Female Care" />
          </div>
          <div className="custom-section col-md-7 col-sm-12 test_box box-01" style={{ height: '600px' }}>
            <div className="">
              <div className="inner">
                <div className="flex_this overlay-text custom-text">
                <p>Meet our outstanding team of expert trainers,ready to guide you on your learning journey. With their unmatched expertise, you'll receive top-quality instruction and support, ensuring you excel in your IT skills and achieve your goals.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>


  )
}

export default Welcome