import { Calendar, dayjsLocalizer } from "react-big-calendar";
import { Fragment, useState, useCallback, useMemo } from "react";
import dayjs from "dayjs";
import { useGetCalanderEvent } from "../hooks/useGetCalanderEvent";
import { useParams } from "react-router-dom";
import { Box, Button, Grid, Modal, Stack, Typography } from "@mui/material";

const localizer = dayjsLocalizer(dayjs);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
};

// Function to convert the date strings to JavaScript Date objects
function convertDates(data) {
  return data.map((item) => {
    // Create a Date object from the 'title' date string if it exists
    if (item.end) {
      item.end = new Date(item.end_date.replace(" ", "T")); // Add 'T' for ISO format
    }

    // Convert 'start_date' if it exists in the object
    if (item.start) {
      item.start = new Date(item.start_date.replace(" ", "T"));
    }

    return item;
  });
}
const MyCalendar = (props) => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [descrption, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [participantsLimit, setParticipantsLimit] = useState("");
  const [participants, setParticipants] = useState("");


  const { data, isLoading } = useGetCalanderEvent(id);

  const handleSelectEvent = useCallback((event) => {
    setOpen(true),
      setTitle(event.title),
      setStart(event.start_date),
      setEnd(event.end_date),
      setDescription(event.description),
      setLocation(event.location);
      setParticipantsLimit(event.participants_limit);
      setParticipants(event.participants);

  }, []);
  if (isLoading) {
    return <div>Loading</div>;
  }

  const myEvents = convertDates(data);

  return (
    <>
      <div>
        <Calendar
          localizer={localizer}
          events={myEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 700 }}
          onSelectEvent={handleSelectEvent}
        />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={12} key="1">
              {" "}
              {descrption}
            </Grid>
            <Grid item xs={12} sm={12} md={12} key="1">
              Location: {location}
            </Grid>
            <Grid item xs={12} sm={12} md={12} key="1">
              Start Date: {start}
            </Grid>
            <Grid item xs={12} sm={12} md={12} key="1">
              End Date: {end}
            </Grid>
            <Grid item xs={12} sm={12} md={12} key="1">
              Participants Limit: {participantsLimit} {" "} participants till now: { participants }
            </Grid>

            <Grid item xs={12} sm={12} md={12} key="1">
              <Stack
                spacing={{ xs: 1, sm: 2 }}
                direction="row"
                useFlexGap
                flexWrap="wrap"
                sx={{ float: "right" }}
              >
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleClose}
                >
                  {" "}
                  Cancel
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default MyCalendar;
