import {
    Card,
    CardActions,
    CardContent,
    Typography,
  } from "@mui/material";
  import React from "react";
  import { Link } from "react-router-dom";

  const GroupCard = ({item}) => {
    return (
      <>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
          <Link  to={`/group/${item.id}`} >
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

  export default GroupCard;