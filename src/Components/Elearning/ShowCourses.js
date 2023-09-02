import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCategories } from '../../features/categorySlice';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
const ShowCourses = () => {
  const dispatch = useDispatch();

  
  const { courseId } = useParams();
  //console.log('Course ID from URL:', courseId);
  const { courses } = useSelector((state) => state.course);
  const selectedCourse = courses.find((course) => course.id === parseInt(courseId)); // Convert courseId to integer if needed
  /*
  if (selectedCourse) {
    console.log(selectedCourse.id);
  }
  
  console.log('Course ID:', courseId);
  console.log('Courses:', courses);
  */
  
  return (
    <div className="container mt-4">
    <div className="row justify-content-center">
      <div className="col-md-8">
        {selectedCourse ? (
          <div className="card">

            <div className="card-body">
              <h5 className="card-title">{selectedCourse.title}</h5>
              <p className="card-text">
                {selectedCourse.course_description}
              </p>
              <p className="card-text">Price: {selectedCourse.price} DT</p>
              {/* Display other course details */}
            </div>
            {selectedCourse.documents && selectedCourse.documents.length > 0 && (
  <div>
    <ul>
      {selectedCourse.documents.map((document, index) => (
        <div key={index}>
          {document.type === 'mp4' ? (
            <video controls>
              <source src={document.path} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <a href={document.path} target="_blank" rel="noopener noreferrer">
              View Document
            </a>
          )}
        </div>
      ))}
    </ul>
  </div>
)}
    )
          </div>
        ) : (
          <p>Course not found</p>
        )}
      </div>
    </div>
  </div>
  );
};

export default ShowCourses;
