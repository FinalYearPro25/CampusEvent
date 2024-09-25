import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid,
  Button,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@material-ui/icons/Edit";
import React from "react";
import { Link } from "react-router-dom";
import { useDeleteGroup } from "../hooks/useDeleteGroup";
import { useQueryClient } from "@tanstack/react-query";

const GroupCard = ({ item }) => {
  const { mutate } = useDeleteGroup();
  const queryClient = useQueryClient();

  const handleDelete = (id:number,name:string) => {
    let answer = confirm("Do you want to Delete the Group: "+name);
    if (answer) {
      mutate(Number(id),
        {
          onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['groups']})
          },
          onError: (e) => {
            console.log(e);
          },
        });
    }
  };

  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Link to={`/group/${item.id}`}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {item.name}
            </Typography>
          </Link>
          <Typography variant="body2"> {item.description}</Typography>
        </CardContent>
        <CardActions>
          <Grid className="float-right" item xs={12}>
          <Tooltip title="Edit Group" placement="top">
            <Button variant="contained" color="success" size="small">
              <EditIcon fontSize="small" />
            </Button>
            </Tooltip>
          </Grid>
          <Grid className="float-right" item xs={2}>
          <Tooltip title="Delete Group" placement="top">
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => handleDelete(item.id,item.name)}
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

export default GroupCard;
