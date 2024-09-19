import {
    Card,
    CardActions,
    CardContent,
    Typography,
    Grid,
    Button,
  } from "@mui/material";
  import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@material-ui/icons/Edit";
  import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteEvent } from "../hooks/useDeleteEvent";

  const EventCard = ({ item }) => {
    const queryClient = useQueryClient();
    const {mutate} = useDeleteEvent();

    const handleDelete = (id:number, name:string) => {
      let answer = confirm("Do you want to delete the event: " +name);
      if(answer) {
        mutate(Number(id),{
          onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['events']});
          },
          onError: (e) => {
            console.log(e);
          }
        })


    }
  }
    return (
      <>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                 {item.title}
              </Typography>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
              {item.description}
              </Typography>
              {/* <Typography variant="body2" gutterBottom>
                Full resolution 1920x1080 • JPEG
              </Typography> */}
              <Grid>
              <Grid item xs={6}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                From: {item.start_date} To: {item.end_date}
              </Typography>
              </Grid>
              <Grid item xs={6}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Location: {item.location}
              </Typography>
              </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
                participants Limit : {item.participants_limit} Joined : {item.members.length} Remaning Seats: {item.participants_limit - item.members.length}
              </Typography>
            </Grid>
          </CardContent>
          <CardActions>
          <Grid className="float-right" item xs={12}>
            <Button variant="contained" color="success" size="small">
              <EditIcon fontSize="small" />
            </Button>
          </Grid>
          <Grid className="float-right" item xs={1}>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => handleDelete(item.id,item.title)}
            >
              <DeleteIcon fontSize="small" />
            </Button>
          </Grid>
          </CardActions>
        </Card>
      </>
    );
  };

  export default EventCard;