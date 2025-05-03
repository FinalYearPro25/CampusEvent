import Layout from "../components/Layout";
import {  Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import {  useParams } from "react-router-dom";
import { useGetEvent } from "../hooks/useGetEvent";
import MembersTable from "../components/MemebersTable";
import { useGetMembersEvent } from "../hooks/useGetMembersEvent";
import { useDeleteEventMember } from "../hooks/useDeleteEventMember";
import { useQueryClient } from "@tanstack/react-query";
import {  useState } from "react";
import MembersList from "../components/SelectMembers";
import { toast } from "react-toastify";

const GroupDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetEvent(id);
  const params = useParams();
  const {data:members, isLoading:isMemberLoading} = useGetMembersEvent(params.id);
  const queryClient = useQueryClient();

  const [openMembers, setOpenMembers] = useState(false);
  const handleCloseMembers = () => setOpenMembers(false);
  const handleOpenMembers = () => setOpenMembers(true);


  const { mutate, isPending } = useDeleteEventMember();

  const handleDelete = (id:number,name:string) => {
    let answer = confirm("Do you want to Delete the Member from this event: "+name);
    if (answer) {
      mutate(Number(id),
        {
          onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['members_event']})
            toast.success(name+ " removed sucessfully");

          },
          onError: (e) => {
            console.log(e);
            toast.error("Failed to removed member");
          },
        });
    }
  };

  if(isLoading || isMemberLoading){
    return <div>Loading..</div>;
  }
  return (
    <Layout>
      <Grid container spacing={2} mb={5}>
      <Grid item xs={12} sm={12} md={12}>
        <Card sx={{ minWidth: 275 }} >
          <CardContent >
          <Grid item xs={12} sm={2} md={12}>
              <Button
                size="big"
                variant="contained"
                color="secondary"
                onClick={handleOpenMembers}
                sx={{ float: "right" }}
              >
                Add Memebers
              </Button>
            </Grid>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {data.title}
              </Typography>
            <Grid item >
              <Typography gutterBottom variant="subtitle1" component="div">
                {data.description}
              </Typography>
              {/* <Typography variant="body2" gutterBottom>
                Full resolution 1920x1080 • JPEG
              </Typography> */}
              <Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    From: {data.start_date} To: {data.end_date}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Location: {data.location}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: "pointer" }} variant="body2">
                participants Limit : {data.participants_limit}
              </Typography>
            </Grid>

          </CardContent>
          <CardActions>

          </CardActions>

        </Card>
        </Grid>
      </Grid>
      <div className="heading-3">
       <h3> Members List</h3>
      </div>
      <MembersTable members={members} handleDelete={handleDelete} />
      <MembersList
        openMembers={openMembers}
        handleCloseMembers={handleCloseMembers}
        functionHandleSubmit="handleSubmitMembersEvent"
      />
    </Layout>
  );
};

export default GroupDetail;
