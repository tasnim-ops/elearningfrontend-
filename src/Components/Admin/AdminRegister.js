import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../features/authSlice";
import Alert from "react-bootstrap/Alert";

const AdminRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("admin");

  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const { user, isSuccess, isError, errorMessage } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      const formData = new FormData();
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phone", phone);
      formData.append("role", "admin"); // Assuming "role" is a fixed value

      dispatch(register(formData))
        .then((res) => {
          console.log("registered", res);
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setPassword("");
          setShowAlert(true);
        })
        .catch((error) => {
          if (error.response) {
            // There was a response from the server
            console.error("Error response status:", error.response.status);
            console.error("Error response data:", error.response.data);
            // Handle the error or show an error message to the user based on the error response
          } else {
            // There was no response from the server (network error)
            console.error("Network error:", error.message);
            // Handle the network error or show a network error message
          }
        });
    }
    setValidated(true);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/login");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setPassword("");
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isError) {
      // Show the alert when there's an error
      setShowAlert(true);
    }
  }, [isError]);

  return (
    <>
      <MDBContainer fluid className="p-3 my-5 h-custom border p-3">
        {showAlert && (
          <Alert
            variant="danger"
            onClose={() => setShowAlert(false)}
            dismissible
          >
            <Alert.Heading>Error!</Alert.Heading>
            {errorMessage && (
              <div>
                <p>{errorMessage}</p>
              </div>
            )}
          </Alert>
        )}

        <MDBRow>
          <MDBCol col="10" md="6">
            <img
              src="https://res.cloudinary.com/ddbiyenrd/image/upload/v1688836520/admin_me4w4l.jpg"
              className="img-fluid "
              alt="admin"
            />
          </MDBCol>
          <MDBCol col="4" md="6">
            <form onSubmit={handleSubmit}>
              <div className="container border p-3">
                <div className="row mt-2">
                  <div className="col-sm-6 mb-2">
                    <input
                      className="form-control"
                      type="text"
                      id="firstname"
                      name="firstname"
                      placeholder="First name"
                      required
                      autoFocus
                      value={firstname}
                      onChange={(event) => setFirstName(event.target.value)}
                    />
                  </div>
                  <div className="col-sm-6 mb-2">
                    <input
                      className="form-control"
                      type="text"
                      id="lastname"
                      name="lastname"
                      placeholder="Last name"
                      required
                      value={lastname}
                      onChange={(event) => setLastName(event.target.value)}
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-sm-6 mb-2">
                    <input
                      className="form-control"
                      type="email"
                      id="email"
                      name="email"
                      placeholder="E-mail"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>
                  <div className="col-sm-6 mb-2">
                    <input
                      className="form-control"
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-sm-6">
                    <input
                      className="form-control"
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="+216"
                      required
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                    />
                  </div>
                </div>
                <button
                  className="btn"
                  type="submit"
                  style={{ backgroundColor: "#2a969c" }}
                >
                  Submit
                </button>
                <div className="row mt-2">
                  <div className="col-sm-6 mb-2">
                    <p>
                      <h6>
                        Already have an account?{" "}
                        <Link to="/admin/login">Sign in</Link>
                      </h6>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default AdminRegister;
