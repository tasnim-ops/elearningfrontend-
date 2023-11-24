import React from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
const Profile = () => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/user/editprofile");
  };
  const { user, role } = useSelector((state) => state.auth);
  return (
    <>
      <div className="section">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-6 mb-4 mb-lg-0">
              <div className="card mb-3" style={{ backgroundColor: "#e5f2ee" }}>
                <div className="row g-0">
                  <div
                    style={{ backgroundColor: "#aad5c9" }}
                    className="col-md-4 gradient-custom gradient-custom text-center text-white"
                  >
                    <img
                      src={user.photo}
                      className="rounded-circle"
                      style={{ width: "150px" }}
                      alt="Avatar"
                    />
                    <h4>
                      {user.firstname}
                      {user.lastname}
                    </h4>
                    <p>{role}</p>
                    <a href="/user/editprofile">
                      <i className="far fa-edit mb-5"></i>
                    </a>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body p-4 text-center">
                      <h6 className="d-flex justify-content-center">
                        Informations
                      </h6>
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>Email</h6>
                          <p>{user.email}</p>
                        </div>
                        <div className="col-6 mb-3">
                          <h6>Phone</h6>
                          <p>{user.phone}</p>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center">
                      <a href="#!">
                        <i className="fab fa-facebook-f fa-lg me-3 iconstyle"></i>
                      </a>
                      <a href="#!">
                        <i className="fab fa-linkedin fa-lg me-3 iconstyle"></i>
                      </a>
                      <a href="#!">
                        <i className="fab fa-github fa-lg iconstyle"></i>
                      </a>
                    </div>
                    <div className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-primary btn-rounded btn-lg"
                      >
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
  );
};

export default Profile;
