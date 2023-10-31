import React, { useState } from "react";

import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBRadio,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/authSlice";
const Signin = () => {
  const errorMessage = useSelector((state) => state.auth.error);
  const navigate = useNavigate("");
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      const user = {
        email,
        password,
        role,
      };
      dispatch(login(user));
      if (user.role === "teacher") navigate("/editcateg");
      if (user.role === "student") {
        navigate("/categ");
      }
    }
  };
  return (
    <div>
      <MDBContainer fluid>
        <MDBRow className="d-flex justify-content-center align-items-center">
          <MDBCol lg="8">
            <MDBCard
              className="my-5 rounded-3 container"
              style={{ maxWidth: "600px" }}
            >
              <MDBCardImage
                src="https://res.cloudinary.com/ddbiyenrd/image/upload/v1690499317/login_4x_awp6kt.png"
                className="w-100 rounded-top"
                alt="Sample photo"
              />
              <MDBCardBody className="px-5">
                <h3
                  className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2"
                  style={{ textAlign: "center", color: "#003b36" }}
                >
                  Login
                </h3>
                <form>
                  <MDBRow className="d-flex justify-content-center align-items-center">
                    <MDBCol md="6" className="mb-3">
                      <MDBRadio
                        name="inlineRadio"
                        id="inlineRadio1"
                        value="option1"
                        label="Teacher"
                        inline
                        checked={role === "teacher"}
                        onChange={(e) => setRole("teacher")}
                      />
                      <MDBRadio
                        name="inlineRadio"
                        id="inlineRadio2"
                        value="option2"
                        label="Student"
                        inline
                        checked={role === "student"}
                        onChange={(e) => setRole("student")}
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Email"
                    id="form1"
                    type="email"
                    value={email}
                    autoComplete="username"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Password"
                    id="form2"
                    type="password"
                    value={password}
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <button
                    style={{ backgroundColor: "#1794bb ", color: "#ffffff" }}
                    className="mb-4 ripple ripple-surface ripple-surface-light btn btn-lg mb-4"
                    size="lg"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Login
                  </button>
                </form>
                <MDBRow>
                  <MDBCol md="6">
                    <h6>
                      Don't have an account ?{" "}
                      <Link to="/user/register">Register</Link>
                    </h6>
                  </MDBCol>
                  {errorMessage && alert(errorMessage)}
                  <MDBCol md="6">
                    <h6 style={{ color: "#ff2300" }}>
                      Forgot your password ? <Link to="">Refresh</Link>
                    </h6>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Signin;
