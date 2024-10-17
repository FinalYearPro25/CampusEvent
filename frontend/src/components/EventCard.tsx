import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid,
  Button,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteEvent } from "../hooks/useDeleteEvent";
import BasicGauges from "./BasicGauges";
import Paper from "@mui/material/Paper";
import { toast } from "react-toastify";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const EventCard = ({ item }) => {
  const queryClient = useQueryClient();
  const { mutate } = useDeleteEvent();

  const handleDelete = (id: number, name: string) => {
    let answer = confirm("Do you want to delete the event: " + name);
    if (answer) {
      mutate(Number(id), {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["events"] });
          toast.success("Event removed sucessfully");
        },
        onError: (e) => {
          console.log(e);
          toast.error("Failed to remove event");
        },
      });
    }
  };
  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              {" "}
              <Link to={`/event/${item.id}`}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {item.title}
                </Typography>
              </Link>
              <Typography gutterBottom variant="subtitle1" component="div">
                {item.description}
              </Typography>
              <Grid item xs>
                <Grid>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    From: {item.start_date} To: {item.end_date}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Location: {item.location}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <BasicGauges
                limit={item.participants_limit}
                joined={item.members.length}
              />
            </Grid>
          </Grid>

          <Grid item>
            <Typography sx={{ cursor: "pointer" }} variant="body2">
              participants Limit : {item.participants_limit}
            </Typography>
            <Typography sx={{ cursor: "pointer" }} variant="body2">
              Remaning Seats: {item.participants_limit - item.members.length}
            </Typography>
          </Grid>
        </CardContent>
        <CardActions>
          {/* <Grid className="float-right" item xs={12}>
            <Tooltip title="Edit Event" placement="top">
              <Button variant="contained" className="edit-button" size="small">
                <EditIcon fontSize="small" />
              </Button>
            </Tooltip>
          </Grid> */}
          <Grid className="float-right" item xs={12}>
            <Tooltip title="Delete Event" placement="top">
              <Button
                className="delete-button"
                variant="contained"
                size="small"
                onClick={() => handleDelete(item.id, item.title)}
              >
                <DeleteIcon fontSize="small" />
              </Button>
            </Tooltip>
          </Grid>
        </CardActions>
      </Card>
    </>
  );
};

export default EventCard;
