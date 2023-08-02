import React from 'react'
import { useState } from "react";
import { TextField, Button, Typography, Grid, Box } from "@mui/material";
const ContactPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //
  };
  return (
    <div >
        <Box sx={{ height: "100vh"  }} >
      <Grid
        container-fluid 
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ height: "80%"}}
        
      >
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2 }} className="border  pt-5 container" style={{"border-color": '#00766d'}}>
            <Typography variant="h4" align="center" mb={2}  style={{ color: "#2a969c"}}>
              Contact Us
            </Typography>
            <form onSubmit={handleSubmit}>
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
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                  <Button variant="contained"  style={{ backgroundColor: "#2a969c"}}  type="submit" sx={{ mt: 2 }}>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Box>
    </div>
  )
}

export default ContactPage