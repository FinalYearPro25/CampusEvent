import { useEffect, useState } from "react";
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Box,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TableFooter, TablePagination, IconButton, Tooltip
} from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import Cookies from "js-cookie";

const MyEventContent = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<number | null>(null);
  const theme = useTheme();

  const fetchEvents = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get("http://localhost:8000/api/admin/get_all_events", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data ?? [];
      setEvents(data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleOpenView = (event: any) => {
    setSelectedEvent(event);
    setOpenViewDialog(true);
  };

  const handleCloseView = () => {
    setSelectedEvent(null);
    setOpenViewDialog(false);
  };

  const handleOpenDelete = (id: number) => {
    setEventToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDelete = () => {
    setEventToDelete(null);
    setOpenDeleteDialog(false);
  };

  const handleDelete = async () => {
    if (!eventToDelete) return;

    try {
      const token = Cookies.get("token");
      await axios.delete(`http://localhost:8000/api/admin/delete_event/${eventToDelete}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setEvents(events.filter((e) => e.id !== eventToDelete));
    } catch (error) {
      console.error("Error deleting event:", error);
    } finally {
      handleCloseDelete();
    }
  };

  const formatDateTime = (datetime: string) => {
    return new Date(datetime).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - events.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => setPage(newPage);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const TablePaginationActions = ({
    count,
    page,
    rowsPerPage,
    onPageChange,
  }: {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
      event: React.MouseEvent<HTMLButtonElement>,
      newPage: number
    ) => void;
  }) => (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton onClick={(e) => onPageChange(e, 0)} disabled={page === 0} aria-label="first page">
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={(e) => onPageChange(e, page - 1)} disabled={page === 0} aria-label="previous page">
        {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton onClick={(e) => onPageChange(e, page + 1)} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="next page">
        {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton onClick={(e) => onPageChange(e, Math.max(0, Math.ceil(count / rowsPerPage) - 1))} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="last page">
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" sx={{ fontFamily: "'Dancing Script', cursive" }}>
          Manage Events
        </Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="pagination table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>Host</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Participants Limit</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? events.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : events
            ).map((event: any) => (
              <TableRow key={event.id}>
                <TableCell sx={{ color: "purple" }}>{event.id}</TableCell>
                <TableCell sx={{ color: "purple" }}>{event.title}</TableCell>
                <TableCell>{formatDateTime(event.start_date)}</TableCell>
                <TableCell>{event.creator_name} <small>{event.creator_email}</small> </TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>{event.participants_limit}</TableCell>
                <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Tooltip title="View Details">
                        <IconButton onClick={() => handleOpenView(event)} color="primary">
                            <VisibilityIcon />
                        </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Event">
                        <IconButton onClick={() => handleOpenDelete(event.id)} color="error">
                            <DeleteIcon />
                        </IconButton>
                        </Tooltip>
                    </Box>
                </TableCell>

              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[25, 50, 100, { label: "All", value: -1 }]}
                colSpan={6}
                count={events.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      {/* View Dialog */}
      <Dialog open={openViewDialog} onClose={handleCloseView} fullWidth>
        <DialogTitle>Event Details</DialogTitle>
        <DialogContent dividers>
          {selectedEvent && (
            <Box>
              <Typography variant="subtitle1"><strong>Title:</strong> {selectedEvent.title}</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}><strong>Description:</strong> {selectedEvent.description}</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}><strong>Location:</strong> {selectedEvent.location}</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}><strong>Start Date:</strong> {formatDateTime(selectedEvent.start_date)}</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}><strong>End Date:</strong> {formatDateTime(selectedEvent.end_date)}</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}><strong>Participants Limit:</strong> {selectedEvent.participants_limit}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseView}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this event?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="primary">Cancel</Button>
          <Button onClick={handleDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MyEventContent;
