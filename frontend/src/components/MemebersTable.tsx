import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  button: {
    '&:hover': {
      color: 'red',
  },
}})

export default function MembersTable({ members, handleDelete }) {
  const classes = useStyles();


  const rows = members;
  console.log(rows);
  // if(isLoading){
  //   return <div>Loading</div>;
  // }


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">
                <Link
                  className={classes.button}
                  component="button"
                  variant="body2"
                  onClick={() => {
                    handleDelete(row.id, row.email);
                  }}
                >
                  <DeleteIcon></DeleteIcon>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
