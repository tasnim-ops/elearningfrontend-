import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { findTeacherByID, updateTeacher } from "../../features/teacherSlice";
import { findStudentByID, updateStudent } from "../../features/studentSlice";

const EditProfile = () => {
  const { user, role } = useSelector((state) => state.auth);

  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [fb, setFB] = useState(user.fb);
  const [linkedin, setLinkedin] = useState(user.linkedin);
  const [github, setGithub] = useState(user.github);
  const [photo, setPhoto] = useState(null);
  const [desc, setDisc] = useState(user.desc);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  useEffect(() => {
    switch (role) {
      case "teacher":
        dispatch(findTeacherByID(user.id));
        break;
      case "student":
        console.log(findStudentByID(user.id));
        break;
      default:
        console.log("ajouter slice de admin");
    }
  });
  const handleNavigation = () => {
    navigate("/user/profile");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    setValidated(true);

    if (form.checkValidity()) {
      const editedData = {
        firstname: user.firstname,
        lastname: user.lastname,
        id: user.id,
        email,
        phone,
        fb,
        linkedin,
        github,
        //photo,
        desc,
      }; //;
      console.log("Edited data:", editedData);

      switch (role) {
        case "teacher":
          dispatch(updateTeacher(editedData));
          break;
        case "student":
          console.log(updateStudent(editedData));
          break;
        default:
          console.log("ajouter slice de admin");
      }
    }
  };

  //console.log( role);
  return (
    <div>
      <div className="section">
        <div className="container-fluid py-5">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="card mb-3" style={{ backgroundColor: "#e5f2ee" }}>
                <div className="row g-0">
                  <div
                    style={{ backgroundColor: "#aad5c9" }}
                    className="col-md-4 gradient-custom gradient-custom text-center text-white"
                  >
                    <img
                      src={user.photo}
                      className="rounded-circle mt-5"
                      style={{
                        width: "200px",
                        height: "120px",
                        display: "block",
                        margin: "auto",
                      }}
                      alt="user photo"
                    />
                    <input
                      style={{ "margin-top": "20px" }}
                      type="file"
                      onChange={(e) => {
                        console.log("Selected file:", e.target.files[0]);
                        setPhoto(e.target.files[0]);
                      }}
                    />

                    <h4>
                      {user.firstname} {user.lastname}
                    </h4>
                    <p>{role}</p>
                  </div>
                  <div className="col-md-8">
                    <form>
                      <div className="card-body p-4">
                        <h6 className="d-flex justify-content-center">
                          Informations
                        </h6>
                        <div className="row pt-4">
                          <div className="col-md-6 mb-3">
                            <i className="fi fi-sr-envelope"></i>
                            <input
                              type="email"
                              className="form-control"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <i className="fi fi-rr-phone-call"></i>
                            <input
                              type="text"
                              className="form-control"
                              required
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="row pt-4">
                          <div className="col-md-6 mb-3">
                            <h6 className="fab fa-facebook-f"></h6>
                            <input
                              type="text"
                              className="form-control"
                              required
                              value={fb}
                              onChange={(e) => setFB(e.target.value)}
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <h6 className="">Discription</h6>
                            <input
                              type="text"
                              className="form-control"
                              required
                              value={desc}
                              onChange={(e) => setDisc(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="row pt-4">
                          <div className="col-md-6 mb-3">
                            <h6 className="fab fa-linkedin"></h6>
                            <input
                              type="text"
                              className="form-control"
                              required
                              value={linkedin}
                              onChange={(e) => setLinkedin(e.target.value)}
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <h6 className="fab fa-github"></h6>
                            <input
                              type="text"
                              className="form-control"
                              required
                              value={github}
                              onChange={(e) => setGithub(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-rounded btn-lg"
                        style={{ backgroundColor: "#73c5e0" }}
                        onClick={handleSubmit}
                      >
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
  );
};

export default EditProfile;
