import React, { useEffect } from "react";
import { getCourses } from "../../features/courseSlice";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { getCategories } from "../../features/categorySlice";
import Box from "@mui/material/Box";
import { Row, Col, Modal, Button, Form, Image, Alert } from "react-bootstrap";
import Grid from "@mui/material/Unstable_Grid2";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@material-ui/core/IconButton";

import CardContent from "@material-ui/core/CardContent";
import { useDispatch, useSelector } from "react-redux";
import ShowCourses from "./ShowCourses";
import { useNavigate, useParams } from "react-router-dom";
const Courses = () => {
  const { courses, isLoadingCourse, errorCourse, successCourse } = useSelector(
    (state) => state.course
  );
  const dispatch = useDispatch();
  const { categories, isLoading, error, success } = useSelector(
    (state) => state.category
  );
  const navigate = useNavigate();
  console.log(courses);
  const handleShowCourse = (courseId) => {
    navigate(`/show-course/${courseId}`); // Use navigate function without .push()
  };
  useEffect(() => {
    dispatch(getCourses());
    dispatch(getCategories());
  }, [dispatch]);
  const { categoryId } = useParams();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const classes = {
    root: {
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      border: 0,
      borderRadius: 3,
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      color: "white",
      height: 48,
      padding: "0 30px",
    },
  };

  return (
    <>
      {categories.map((categ) => {
        const categoryCourses = courses.filter(
          (course) => course.category_id === categ.id
        );

        if (categoryCourses.length === 0) {
          return null;
        }

        return (
          <div key={categ.id} id={categ.id}>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              style={{ borderRadius: "10px" }}
              className="container-fluid"
              sx={{
                width: "100%",
                height: "50px",
                backgroundColor: "#dcd6cf",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                borderRadius: "5px",
                transition: "background-color 0.3s",
                "&:hover": {
                  backgroundColor: "#4c9393",
                  opacity: 0.9,
                },
              }}
            >
              <Typography variant="h6" sx={{ color: "white" }}>
                {categ.name_categ}
              </Typography>
            </Grid>

            <div style={{ backgroundColor: "#bfeae9" }}>
              <div
                className="container"
                style={{ display: "flex", justifyContent: "flex-end" }}
              ></div>
              <div
                className="justify-content-center align-items-center"
                style={{ backgroundColor: "#bfeae9", padding: "20px" }}
              >
                <Row className="justify-content-center align-items-center">
                  {categoryCourses.map((course) => (
                    <Col
                      key={course.id}
                      sm={12}
                      md={10}
                      lg={6}
                      xl={4}
                      className="mb-5"
                      style={{ width: "22rem", height: 700 }}
                    >
                      <Grid
                        item="true"
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        key={course.id}
                        className="mb-5"
                        style={{
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <Card className={classes.root}>
                          <CardHeader
                            title={course.title}
                            titleTypographyProps={{ variant: "body2" }} // Ajoutez cette ligne
                          />
                          <CardMedia
                            component="img"
                            height="194"
                            image={categ.photo}
                            alt="Paella dish"
                          />
                          <CardContent>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              {course.course_description
                                ? expanded
                                  ? course.course_description
                                  : `${course.course_description.slice(
                                      0,
                                      30
                                    )}...`
                                : ""}
                            </Typography>

                            <IconButton
                              className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                              })}
                              onClick={handleExpandClick}
                              aria-expanded={expanded}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </IconButton>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              {course.price}DT
                            </Typography>
                          </CardContent>
                          <button
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "96%",
                            }}
                            className="btn"
                            onClick={() => handleShowCourse(course.id)}
                          >
                            SHOW
                          </button>
                        </Card>
                      </Grid>
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Courses;
