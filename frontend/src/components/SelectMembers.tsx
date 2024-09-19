import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useGetMembers } from "../hooks/useGetMembers";
import { useCreateMembersEvent } from "../hooks/useCreateMembersEvent";
import Modal from "@mui/material/Modal";
import { useIsLoggedIn } from "../hooks/useGetIsLoggedIn";
import { useParams } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

import {
  Button,
  Grid,
  Typography,
  Stack,
} from "@mui/material";

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

const modalStyle = {
  // width : 500
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// const names = [
//   'Oliver Hansen',
//   'Van Henry',
//   'April Tucker',
//   'Ralph Hubbard',
//   'Omar Alexander',
//   'Carlos Abbott',
//   'Miriam Wagner',
//   'Bradley Wilkerson',
//   'Virginia Andrews',
//   'Kelly Snyder',
// ];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export default function MembersList({openMembers,handleCloseMembers}) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const params = useParams();
  const group_id = params.id;
  const { data: user, isLoading: isuserloading } = useIsLoggedIn();
  const {data : members , isLoading : isLodaingMembers} = useGetMembers(user?.user_id);

  const { mutate } = useCreateMembersEvent();
  const handleSubmitMembers = () =>{
    mutate(
      {
        personName,
        group_id
      },
      {
        onSuccess: () => {
          setPersonName([]);

        },
        onError: (e) => {
          console.log(e);
        },
      }
    );
  };

  if (isuserloading || isLodaingMembers) {
    return <CircularProgress color="inherit" />;
  }

  return (
    <div>
      <Modal
        sx={modalStyle}
        open={openMembers}
        // onClose={handleClose}ss
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Members
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={12} key="1">
              <FormControl sx={{ m: 1, width: 426 }}>
                <InputLabel id="demo-multiple-chip-label">E-Mail</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={personName}
                  onChange={handleChange}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {members.data?.map((item: any) => (
                    <MenuItem
                      key={item.email}
                      value={item.email}
                      //   style={getStyles(email, personName, theme)}
                    >
                      {item.email}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                  color="success"
                  onClick={handleSubmitMembers}
                >
                  {" "}
                  Submit
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="error"
                  onClick={() => handleCloseMembers()}
                >
                  {" "}
                  Cancel
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
