import {
    Card,
    CardActions,
    CardContent,
    Typography,
  } from "@mui/material";
  import { Link } from "react-router-dom";

  const EventCard = ({ item }) => {
    return (
      <>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
          <Link  to={`/group/1`} >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                 {item.name}
              </Typography>
            </Link>
            <Typography variant="body2"> {item.description}</Typography>
          </CardContent>
          <CardActions>
          </CardActions>
        </Card>
      </>
    );
  };

  export default EventCard;