import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useGetUsers } from "../hooks/useGetUsers";

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function MembersList() {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  const { data: users } = useGetUsers();

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Demo>
        <List dense={dense}>
          {generate(
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <PersonAddAlt1Icon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <AccountCircleIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Single-line item"
                secondary={secondary ? "Secondary text" : null}
              />
            </ListItem>
          )}
        </List>
      </Demo>
    </Box>
  );
}
