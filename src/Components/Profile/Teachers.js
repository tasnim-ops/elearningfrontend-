import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import { getTeachers } from "../../features/teacherSlice";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Input from "@mui/material/Input";
//import { makeStyles } from "@mui/styles";
import "../style.css";
import { Container } from "@mui/material";
export const Teachers = () => {
  const dispatch = useDispatch();
  const { teachers, isLoading, error } = useSelector((state) => state.teacher);
  //console.log(teachers);
  const renderTeacher = () => {
    if (isLoading)
      return (
        <center>
          <ReactLoading type="spokes" color="red" height={"8%"} width={"8%"} />
        </center>
      );
    if (error) return <p>Error!!</p>;
  };
  /*
  const useStyles = makeStyles({
    root: {
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      border: 0,
      borderRadius: 3,
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      color: "white",
      height: 48,
      padding: "0 30px",
    },
  });
*/
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

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  useEffect(() => {
    dispatch(getTeachers());
  }, [dispatch]);

  return (
    <div>
      <Container maxWidth="lg" className="mt-5">
        <Grid
          container
          spacing={2}
          justifyContent="center"
          style={{ borderRadius: "10px" }}
        >
          {teachers.map((teacher) => (
            <Grid
              item="true"
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={teacher.id}
              className="mb-5"
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Card className={classes.root}>
                <CardHeader
                  title={`${teacher.firstname} ${teacher.lastname}`}
                  titleTypographyProps={{ variant: "body2" }} // Ajoutez cette ligne
                />
              </Card>
              <CardMedia
                component="img"
                height="194"
                image={teacher.photo}
                alt="Paella dish"
              />
              <CardContent>
                <div className="d-flex justify-content-center mt-2">
                  <a href="#!">
                    <i className="fab fa-facebook-f fa-lg me-3 iconstyle"></i>
                  </a>
                  <a href="#!">
                    <i className="fab fa-linkedin fa-lg me-3 iconstyle"></i>
                  </a>
                  <a href="#!">
                    <i className="fab fa-github fa-lg iconstyle"></i>
                  </a>
                </div>
                <Typography variant="body2" color="textSecondary" component="p">
                  {teacher.desc
                    ? expanded
                      ? teacher.desc
                      : `${teacher.desc.slice(0, 30)}...`
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
              </CardContent>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};
