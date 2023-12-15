import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCategories } from "../../features/categorySlice";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { findCourseById } from "../../features/courseSlice";
import { useState } from "react";
const ShowCourses = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { courses } = useSelector((state) => state.course);

  // Déclarer selectedCourse avec useState pour gérer les mises à jour
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    // Essayer de récupérer les données du cours depuis le localStorage
    const storedCourseData = localStorage.getItem(`course_${courseId}`);
    const storedCourse = storedCourseData ? JSON.parse(storedCourseData) : null;

    // Utiliser les données du cours stockées ou les données du state Redux
    const courseFromRedux = courses.find(
      (course) => course.id === parseInt(courseId)
    );
    const courseToUse = storedCourse || courseFromRedux;

    // Si les données ne sont pas encore chargées, charger depuis le serveur
    if (!courseToUse) {
      dispatch(findCourseById(courseId))
        .then((response) => {
          // Stocker les données dans le localStorage une fois chargées
          localStorage.setItem(
            `course_${courseId}`,
            JSON.stringify(response.payload)
          );
          // Mettre à jour selectedCourse avec les données chargées
          setSelectedCourse(response.payload);
        })
        .catch((error) => {
          console.error(
            "Erreur lors du chargement des données du cours:",
            error
          );
        });
    } else {
      // Mettre à jour selectedCourse avec les données disponibles
      setSelectedCourse(courseToUse);
    }
  }, [dispatch, courseId, courses]);

  // Si les données ne sont pas encore chargées, afficher un message de chargement
  if (!selectedCourse) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{selectedCourse.title}</h5>
              <p className="card-text">{selectedCourse.course_description}</p>
              <p className="card-text">Price: {selectedCourse.price} DT</p>
              {/* Afficher d'autres détails du cours */}
            </div>
            {selectedCourse.documents &&
              selectedCourse.documents.length > 0 && (
                <div>
                  <ul>
                    {selectedCourse.documents.map((document, index) => (
                      <div key={index}>
                        {document.type === "mp4" ? (
                          <video controls>
                            <source src={document.path} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <a
                            href={document.path}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Document
                          </a>
                        )}
                      </div>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowCourses;
