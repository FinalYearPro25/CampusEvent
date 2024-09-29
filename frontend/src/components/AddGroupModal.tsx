import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import { Button, Fab, Grid, Stack, TextField, Tooltip, styled } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useIsLoggedIn } from "../hooks/useGetIsLoggedIn";
import { useMutation } from "react-query";
import { useCreateGroup } from "../hooks/useCreateGroup";
import { useQueryClient } from "@tanstack/react-query";


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


const stylebutton = {
  margin: 0,
  top: "auto",
  right: 20,
  bottom: 20,
  left: "auto",
  position: "fixed",
  backgroundColor: "#9868ad",
};
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  flexGrow: 1,
}));

export default function AddGroupModal() {

  const queryClient = useQueryClient();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { data: user, isLoading: isuserloading } = useIsLoggedIn();

  const { mutate } = useCreateGroup();
  const handleSubmit = () => {
    mutate(
      { name, description, created_by: user?.user_id, edited_by: user?.user_id },
      {
        onSuccess: () => {
          setName("");
          setDescription("");
          handleClose();
          queryClient.invalidateQueries({queryKey:['groups']})
        },
        onError: (e) => {
          console.log(e);
        },
      }
    );
  }

  return (
    <div>
      <Modal
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
            <Grid item xs={12} sm={12} md={12} key="1">
              <TextField
                id="outlined-basic"
                label="Title"
                variant="outlined"
                fullWidth
                name="title"
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} key="1">
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
            <Grid item xs={12} sm={12} md={12} key="1" >
              <Stack
                spacing={{ xs: 1, sm: 2 }}
                direction="row"
                useFlexGap
                flexWrap="wrap"
                sx={{float:"right"}}
              >
                <Button variant="contained" size="small" className="submit-button" onClick={handleSubmit}>
                  {" "}
                  Submit
                </Button>
                <Button variant="contained" size="small" className="cancle-button" onClick={handleClose}>
                  {" "}
                  Cancel
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Tooltip title="Add Group" placement="top">

      <Fab
        color="primary"
        aria-label="add"
        style={stylebutton}
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>
      </Tooltip>

    </div>
  );
}
