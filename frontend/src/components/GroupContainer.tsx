import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  TextField,
  Stack,
} from "@mui/material";
import { useGetGroupDetail } from "../hooks/useGetGroupDetail";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useCreateEvent } from "../hooks/useCreateEvent";
import { useIsLoggedIn } from "../hooks/useGetIsLoggedIn";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/de";
import { useQueryClient } from "@tanstack/react-query";
import MembersList from "./SelectMembers";
import SelectLocation from "./SelectLocation";
import { toast } from "react-toastify";

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

const modalStyle = {
  // width : 500
};

export default function GroupContatiner() {
  const queryClient = useQueryClient();
  const params = useParams();
  const { data, isLoading } = useGetGroupDetail(params.id);

  const [selectedPlace, setSelectedPlace] =
  useState<google.maps.places.PlaceResult | null>(null);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const [openMembers, setOpenMembers] = useState(false);
  const handleCloseMembers = () => setOpenMembers(false);
  const handleOpenMembers = () => setOpenMembers(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [participants, setParticipants] = useState("");

  const [start_date, setStartDate] = useState<Dayjs | null>(dayjs());
  const [end_date, setEndDate] = useState<Dayjs | null>(dayjs().add(7, "day"));

  const { data: user, isLoading: isuserloading } = useIsLoggedIn();

  const { mutate, isPending } = useCreateEvent();
  const handleSubmit = () => {
    const location = selectedPlace?.formatted_address

    mutate(
      {
        title,
        description,
        start_date,
        end_date,
       location,
        participants,
        created_by: user?.user_id,
        edited_by: user?.user_id,
        group_id: params.id,
      },
      {
        onSuccess: () => {
          setTitle("");
          setDescription("");
          setStartDate(dayjs());
          setEndDate(dayjs().add(7, "day"));
          setSelectedPlace("");
          setParticipants("");
          handleClose();
          queryClient.invalidateQueries({ queryKey: ["events"] });
          toast.success("Event added sucessfully");
        },
        onError: (e) => {
          console.log(e);
          toast.error("Failed to add event");
        },
      }
    );
  };

  if (isLoading || isuserloading) {
    return <div>Loading..</div>;
  }

  return (
    <>
      <Card sx={{ minWidth: 275, mb: 5 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8} md={9}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {data.name}
              </Typography>
              <Typography variant="body2"> {data.description} </Typography>
            </Grid>
            <Grid item xs={12} sm={2} md={1.5}>
              <Button
                size="big"
                variant="contained"
                color="secondary"
                onClick={handleOpen}
                sx={{ float: "right" }}
              >
                Add Event
              </Button>
            </Grid>
            <Grid item xs={12} sm={2} md={1.5}>
              <Button
                size="big"
                variant="contained"
                color="secondary"
                onClick={handleOpenMembers}
                // sx={{ float: "right" }}
              >
                Add Memebers
              </Button>
            </Grid>
          </Grid>
        </CardContent>

        {/* <CardActions><SelectLocation /></CardActions> */}
      </Card>

      <Modal
        sx={modalStyle}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Group
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                id="outlined-basic"
                label="Title"
                variant="outlined"
                fullWidth
                name="title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                id="outlined-basic"
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                name="description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Start Date"
                    name="start_date"
                    value={start_date}
                    onChange={(newValue) => setStartDate(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="End Date"
                    name="end_date"
                    value={end_date}
                    onChange={(newValue) => setEndDate(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>

              <SelectLocation
                selectedPlace={selectedPlace}
                setSelectedPlace={setSelectedPlace}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                id="outlined-basic"
                label="Number of Participants"
                variant="outlined"
                fullWidth
                name="participants_limit"
                type="number"
                onChange={(e) => setParticipants(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} >
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
                  className="submit-button"
                  onClick={handleSubmit}
                  disabled={isPending}
                >
                  {" "}
                  Submit
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  className="cancle-button"
                  onClick={() => handleClose()}
                >
                  {" "}
                  Cancel
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <MembersList
        openMembers={openMembers}
        handleCloseMembers={handleCloseMembers}
        functionHandleSubmit="handleSubmitMembers"
      />
    </>
  );
}
