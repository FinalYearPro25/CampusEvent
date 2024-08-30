import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useGetGroupDetail } from "../hooks/getGroupDetail";
import { useParams } from "react-router-dom";

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

export default function GroupContatiner() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  const params = useParams()

  const {data, isLoading} = useGetGroupDetail(params.id);

  if(isLoading ){
    return <div>Loading</div>
  }

  return (
    <>
      <Card sx={{ minWidth: 275, mb: 5 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8} md={10}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {data.name}
              </Typography>
              <Typography variant="body2"> {data.description} </Typography>
            </Grid>
            <Grid item xs={12} sm={2} md={2}>
              <Button
                size="big"
                variant="contained"
                color="primary"
                onClick={handleOpen1}
                sx={{ float: "right" }}
              >
                Add Event
              </Button>
            </Grid>
            {/* <Grid item xs={12} sm={2} md={1.5}>
              <Button
                size="big"
                variant="contained"
                color="secondary"
                onClick={handleOpen}
                sx={{ float: "right" }}
              >
                Add Memebers
              </Button>
            </Grid> */}
          </Grid>
        </CardContent>
        <CardActions>
          {/* {data.map((item) => (
            <Tooltip title={item.email} placement="top-start">
              <AccountCircleIcon />
            </Tooltip>
          ))} */}
        </CardActions>
      </Card>
    </>
  );
}
