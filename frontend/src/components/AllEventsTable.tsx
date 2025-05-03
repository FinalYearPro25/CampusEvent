import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper
} from "@mui/material";

const AllEventsTable = ({ events }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {[
              "id", "title", "description", "start_date", "end_date", "location",
              "participants_limit", "created_by", "edited_by", "group_id", "created_at", "updated_at"
            ].map((col) => (
              <TableCell key={col} sx={{ fontWeight: 'bold' }}>{col.replace('_', ' ')}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              {[
                "id", "title", "description", "start_date", "end_date", "location",
                "participants_limit", "created_by", "edited_by", "group_id", "created_at", "updated_at"
              ].map((col) => (
                <TableCell key={col}>{event[col]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AllEventsTable;
