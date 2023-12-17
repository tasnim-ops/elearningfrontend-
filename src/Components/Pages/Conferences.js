import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateField } from "@mui/x-date-pickers/DateField";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import { DateTimeField } from "@mui/x-date-pickers/DateTimeField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";
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
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import {
  sendConference,
  createConference,
} from "../../features/conferenceSlice";
const Conferences = () => {
  const handleAddParticipant = () => {
    setParticipants([...participants, ""]);
  };
  const { user } = useSelector((state) => state.auth);
  const handleParticipantChange = (email, index) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index] = email;
    setParticipants(updatedParticipants);
  };
  const ProSpan = styled("span")({
    display: "inline-block",
    height: "1em",
    width: "1em",
    verticalAlign: "middle",
    marginLeft: "0.3em",
    marginBottom: "0.08em",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundImage: "url(https://mui.com/static/x/pro.svg)",
  });
  const dispatch = useDispatch();
  /*
  useEffect(() => {
    dispatch(getConferences());
  }, [dispatch]);
  */
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [teacher_id, setTeacherId] = useState("");
  const [confdate, setConfdate] = useState("");
  const [conftime, setConftime] = useState("");
  const [duration, setDuration] = useState("");
  const [participants, setParticipants] = useState([]);

  const handleCreacteConference = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      const formattedConftime = dayjs(conftime).format("YYYY-MM-DD HH:mm:ss");
      const formattedConfdate = dayjs(confdate).format("YYYY-MM-DD HH:mm:ss");
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("confdate", formattedConfdate);
      formData.append("duration", duration);
      formData.append("conftime", formattedConftime);
      participants.forEach((participant, index) => {
        formData.append(`participants[${index}]`, participant);
      });
      formData.append("teacher_id", user.id);

      console.log("Title:", formData.get("title"));
      console.log("Description:", formData.get("description"));
      console.log("Confdate:", formData.get("confdate"));
      console.log("Duration:", formData.get("duration"));
      console.log("Conftime:", formData.get("conftime"));
      console.log("Participants:", formData.getAll("participants"));
      console.log("Teacher_id:", formData.get("teacher_id"));

      dispatch(createConference(formData));
      dispatch(sendConference());
    }
  };
  function ProLabel({ children }) {
    return (
      <Stack direction="row" spacing={0.5} component="span">
        <Tooltip title="Included in Pro package">
          <a href="https://mui.com/x/introduction/licensing/#pro-plan">
            <ProSpan />
          </a>
        </Tooltip>
        <span>{children}</span>
      </Stack>
    );
  }
  const { success } = useSelector((state) => state.conference);
  console.log(success);

  return (
    <div
      className="container mt-2"
      style={{
        borderWidth: "2px",
        borderColor: "black",
        borderStyle: "double",
      }}
    >
      <div>
        <Typography component="h1" variant="h5">
          Start a Conference
        </Typography>
      </div>

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="outlined-multiline-flexible"
            label="Title"
            multiline
            maxRows={4}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div>
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div>
          <TextField
            id="outlined-multiline-static"
            label="Teacher"
            multiline
            rows={4}
            value={user.firstname}
          />
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer
            components={[
              "DateField",
              "TimeField",
              "DateTimeField",
              "MultiInputDateRangeField",
              "MultiInputTimeRangeField",
              "MultiInputDateTimeRangeField",
            ]}
          >
            <div className="row">
              <div className="col-4">
                <DemoItem label="Date">
                  <DatePicker
                    //defaultValue={dayjs("2022-04-17")}
                    value={confdate}
                    onChange={(newValue) => {
                      setConfdate(newValue);
                    }}
                  />
                </DemoItem>
              </div>
              <div className="col-4">
                <DemoItem label="Time">
                  <TimeField
                    //defaultValue={dayjs("2022-04-17T15:30")}
                    value={conftime}
                    format="HH:mm:ss"
                    onChange={(newValue) => {
                      setConftime(newValue);
                    }}
                  />
                </DemoItem>
              </div>
              <div className="col-4">
                <TextField
                  id="outlined-basic"
                  label="Estimated Duration"
                  variant="outlined"
                  sx={{ m: 1, width: "25ch" }}
                  value={duration}
                  onChange={(e) => {
                    setDuration(e.target.value + "heures");
                  }}
                />
              </div>
            </div>
          </DemoContainer>
        </LocalizationProvider>

        {participants.map((email, index) => (
          <TextField
            key={index}
            label={`Participant ${index + 1}`}
            value={email}
            onChange={(e) => handleParticipantChange(e.target.value, index)}
          />
        ))}
        <Fab color="primary" aria-label="add" onClick={handleAddParticipant}>
          <AddIcon />
        </Fab>
        <Button
          onClick={(e) => {
            handleCreacteConference(e);
          }}
        >
          Create
        </Button>
      </Box>
    </div>
  );
};

export default Conferences;
