import React, { useState } from "react";
import {
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
import { useDispatch } from "react-redux"; // Utilisation correcte de 'useDispatch'
import { register } from "../../features/authSlice";

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [role, setRole] = useState("teacher");
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCreateUser = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() && password === passwordConfirmation) {
      const user = {
        firstname,
        lastname,
        email,
        password,
        phone,
        role,
        //photo,
      };
      dispatch(register(user))
        .then((res) => {
          console.log("insert ok in", role, res);
          setFirstname("");
          setLastname("");
          setPassword("");
          setPhone("");
          setRole("teacher");
          setEmail("");
          setPhoto(null);
          // Redirigez l'utilisateur vers la page login
          navigate("/user/login");
        })
        .catch((error) => {
          console.log(error);
          alert("Error!! Cannot insert");
        });
    } else {
      alert(
        "Passwords do not match. Please enter the same password in both fields."
      );
    }
  };

  return (
    <div className="container">
      <MDBContainer className="container">
        <MDBRow className="d-flex justify-content-center align-items-center">
          <MDBCol lg="8">
            <MDBCard
              className="my-5 rounded-3 container"
              style={{ maxWidth: "600px" }}
            >
              <MDBCardImage
                src="https://res.cloudinary.com/ddbiyenrd/image/upload/v1690473888/register_3456388_mbcpzf.png"
                className="w-100 rounded-top"
                alt="register"
              />
              <MDBCardBody className="px-5">
                <h3
                  className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2  "
                  style={{ textAlign: "center", color: "#003b36" }}
                >
                  Registration Info
                </h3>

                <MDBRow>
                  <MDBCol md="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="First name"
                      size="lg"
                      id="form4"
                      type="text"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                  </MDBCol>

                  <MDBCol md="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Last name"
                      size="lg"
                      id="form5"
                      type="text"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Phone Number"
                      size="lg"
                      id="form6"
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </MDBCol>

                  <MDBCol md="6">
                    <MDBRadio
                      name="inlineRadio"
                      id="inlineRadio1"
                      value={"teacher"}
                      label="Teacher"
                      inline
                      checked={role === "teacher"} // La propriété checked est basée sur une condition
                      onChange={(e) => setRole("teacher")}
                    />
                    <MDBRadio
                      name="inlineRadio"
                      id="inlineRadio2"
                      value={"student"}
                      label="Student"
                      inline
                      checked={role === "student"} // La propriété checked est basée sur une condition
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
                  onChange={(e) => setEmail(e.target.value)}
                />

                <MDBRow>
                  <MDBCol md="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Password"
                      size="lg"
                      id="form7"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Repeat your password"
                      size="lg"
                      id="form8"
                      type="password"
                      value={passwordConfirmation}
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                  </MDBCol>
                </MDBRow>
                <div>
                  <h5>Please enter your photo</h5>
                  <MDBInput
                    type="file"
                    onChange={(e) => {
                      setPhoto(e.target.files[0]); // Utilisez e.target.files[0] pour accéder au fichier
                    }}
                  />
                </div>
                <button
                  style={{ backgroundColor: "#1794bb ", color: "#ffffff" }}
                  className="mb-4 ripple ripple-surface ripple-surface-light btn btn-lg mb-4"
                  size="lg"
                  type="submit"
                  onClick={handleCreateUser}
                >
                  Submit
                </button>
                <MDBRow>
                  <MDBCol md="8">
                    <h6>
                      Already have an account ?{" "}
                      <Link to="/user/login">Login</Link>
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

export default Register;
