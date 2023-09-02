import React, { useState,useEffect } from 'react'
import ReactLoading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import { getTeachers } from '../../features/teacherSlice';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import  '../style.css'
import { Container } from '@mui/material';
export const Teachers = () => {
    const dispatch=useDispatch();
    const {teachers, isLoading, error}=useSelector((state)=>state.teacher);
    const renderTeacher =()=>{
        if (isLoading) return <center><ReactLoading type='spokes' color="red"
        height={'8%'} width={'8%'} /></center>
        if (error) return <p>Error!!</p>
        
    }
    useEffect(()=>{
        dispatch(getTeachers());
    },[dispatch]);
  return (
<div>
  <Container maxWidth="lg" className='mt-5'>
    <Grid container spacing={2} justifyContent="center">
      {teachers.map((teacher) => (
        <Grid item="true" xs={12} sm={6} md={4} lg={3} key={teacher.id} className='mb-5 '>
          <Box display="flex" justifyContent="center" alignItems="center" >
            <div className="card p-2" style={{ maxWidth: 345, height: 400, justifyContent: "center" }}>
              <img className="card-img-top " src={teacher.photo} alt="Card image cap" />
              <div className="card-body" style={{ justifyContent: "center", alignItems: "center" }}>
                <h4 className="card-title" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>{teacher.firstname} {teacher.lastname}</h4>
                <div className="d-flex justify-content-center mt-5">
                  <a href="#!"><i className="fab fa-facebook-f fa-lg me-3 iconstyle"></i></a>
                  <a href="#!"><i className="fab fa-linkedin fa-lg me-3 iconstyle"></i></a>
                  <a href="#!"><i className="fab fa-github fa-lg iconstyle"></i></a>
                </div>
                <p className="card-text text-center mt-3"><h6 className="text-muted">{teacher.desc}</h6></p>
              </div>
            </div>
          </Box>
        </Grid>
      ))}
    </Grid>
  </Container>
</div>
  )
}
