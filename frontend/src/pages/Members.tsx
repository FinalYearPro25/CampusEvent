import Layout from "../components/Layout";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useIsLoggedIn } from "../hooks/useGetIsLoggedIn";
import { useGetMembers } from "../hooks/useGetMembers";
import MembersTable from "../components/MemebersTable";
import { useEffect, useState } from "react";
import { useCreateMembers } from "../hooks/useCreateMembers";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteMember } from "../hooks/useDeleteMember";
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

const Members = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { data: user, isLoading: isuserloading } = useIsLoggedIn();
  const { data: members, isLoading: isLodaingMembers } = useGetMembers(
    user?.user_id
  );
  const user_id = user?.user_id;

  const member_list = members?.data;
  const queryClient = useQueryClient();

  const { mutate } = useCreateMembers();

  const handleSubmit = () => {
    mutate(
      {
        name,
        email,
        user_id,
      },
      {
       onSuccess: () =>{
        setName("");
        setEmail("");
        handleClose();
        queryClient.invalidateQueries({ queryKey: ["members"]})
      },
      onError : (e) =>{
        console.log(e);
      }

       }
    );
  };
  const { mutate: deleteMembers } = useDeleteMember();

  const handleDelete = (id:number,name:string) => {
    let answer = confirm("Do you want to Delete the Member: "+name);
    if (answer) {
      deleteMembers(Number(id),
        {
          onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['members']})
          },
          onError: (e) => {
            console.log(e);
          },
        });
    }
  };
  if (isuserloading || isLodaingMembers) {
    return <div>Loading..</div>;
  }

  return (
    <>
      <Layout>
        <Card sx={{ minWidth: 275, mb: 5 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8} md={10.5}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  All Members List
                </Typography>
              </Grid>

              <Grid item xs={12} sm={2} md={1.5}>
                <Button
                  size="big"
                  variant="contained"
                  color="secondary"
                  onClick={handleOpen}
                  // sx={{ float: "right" }}
                >
                  Add Memebers
                </Button>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions></CardActions>
        </Card>
        <Grid container>
          <MembersTable members={member_list} handleDelete={handleDelete} />
        </Grid>
      </Layout>
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
                label="Name"
                variant="outlined"
                fullWidth
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} key="1">
              <TextField
                id="outlined-basic"
                label="E-mail"
                variant="outlined"
                multiline
                fullWidth
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
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
                  className="submit-button"
                  onClick={handleSubmit}
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
    </>
  );
};

export default Members;
