import React, { useEffect } from "react";
import { useState } from "react";
import { TextField, Button, Typography, Grid, Box } from "@mui/material";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { sendContact } from "../../features/contactSlice";
const ContactPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { success } = useSelector((state) => state.contact);
  //console.log("test hear success", success);
  const [firstname, setFirstName] = useState(user?.firstname || "");
  const [lastname, setLastName] = useState(user?.lastname || "");
  const [email, setEmail] = useState(user?.email || "");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const [showAddSuccessAlert, setShowAddSuccessAlert] = useState(false);
  const [showAddErrorAlert, setShowAddErrorAlert] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    //console.log(form.firstname);
    const userMessage = {
      firstname: user?.firstname || firstname,

      lastname: user?.lastname || lastname,
      email: user?.email || email,
      message,
    };
    dispatch(sendContact(userMessage));
    setMessage("");
  };

  useEffect(() => {
    if (success === true) {
      //console.log(success);
      setShowAddSuccessAlert(true);
      setTimeout(() => {
        setShowAddSuccessAlert(false);
      }, 2000); // Show the add success alert for 2 seconds
    } else if (success === false) {
      setShowAddErrorAlert(true);
      setTimeout(() => {
        setShowAddErrorAlert(false);
      }, 2000); // Show the add error alert for 2 seconds
    }
  }, [success]);
  return (
    <div>
      <Box sx={{ height: "100vh" }}>
        <Grid
          container-fluid
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ height: "80%" }}
        >
          <Grid item xs={12} md={4}>
            <Box
              sx={{ p: 2 }}
              className="border  pt-5 container"
              style={{ "border-color": "#00766d" }}
            >
              <Typography
                variant="h4"
                align="center"
                mb={2}
                style={{ color: "#2a969c" }}
              >
                Contact Us
              </Typography>
              <form onSubmit={handleSend}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <img
                        src="https://res.cloudinary.com/ddbiyenrd/image/upload/v1690473279/contact3_a2v6aa.png"
                        alt="Contact"
                        style={{ maxWidth: "100%" }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      value={firstname}
                      onChange={(e) => setFirstName(e.target.value)}
                      margin="normal"
                      required
                    />
                    <TextField
                      fullWidth
                      label="Last Name"
                      value={lastname}
                      onChange={(e) => setLastName(e.target.value)}
                      margin="normal"
                      required
                    />
                    <TextField
                      fullWidth
                      label="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      margin="normal"
                      required
                      type="email"
                    />
                    <TextField
                      fullWidth
                      label="Message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      margin="normal"
                      required
                      multiline
                      rows={4}
                    />
                    {/* Send message Success Alert */}
                    {showAddSuccessAlert && (
                      <Alert variant="success" className="mt-3">
                        Added with success
                      </Alert>
                    )}

                    {/* Send message Error Alert */}
                    {showAddErrorAlert && (
                      <Alert variant="danger" className="mt-3">
                        Error! cann not send your message
                      </Alert>
                    )}
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#2a969c" }}
                      type="submit"
                      sx={{ mt: 2 }}
                    >
                      SEND
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default ContactPage;
