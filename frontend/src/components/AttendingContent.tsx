import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TableFooter,
  TablePagination,
  IconButton,
  Box,
  Modal,
  Fade,
  Backdrop,
  TextField,
  Button,
} from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useTheme } from "@mui/material/styles";
import axios from "axios";

// Calendar imports
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const DashboardContent = () => {
  const theme = useTheme();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [openModal, setOpenModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [openCalendarModal, setOpenCalendarModal] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get("http://localhost:8000/api/events/get_events_attending", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response?.data ?? [];
        if (!Array.isArray(data)) throw new Error("Expected an array of events");
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch attending events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - events.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

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
      <IconButton onClick={(e) => onPageChange(e, 0)} disabled={page === 0}>
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={(e) => onPageChange(e, page - 1)} disabled={page === 0}>
        {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={(e) => onPageChange(e, page + 1)}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      >
        {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={(e) => onPageChange(e, Math.max(0, Math.ceil(count / rowsPerPage) - 1))}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );

  const handleOpenModal = (event: any) => {
    setSelectedEvent(event);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedEvent(null);
  };

  const handleOpenCalendar = () => setOpenCalendarModal(true);
  const handleCloseCalendar = () => setOpenCalendarModal(false);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Events You're Attending
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenCalendar}
        sx={{ mb: 2 }}
      >
        View Calendar
      </Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="pagination table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Host</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Participants Limit</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? events.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : events
            ).map((event: any) => (
              <TableRow key={event.id}>
                <TableCell>{event.title}</TableCell>
                <TableCell>{event.creator_name}</TableCell>
                <TableCell>{formatDateTime(event.start_date)}</TableCell>
                <TableCell>{formatDateTime(event.end_date)}</TableCell>
                <TableCell>{event.participants_limit}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpenModal(event)}>
                    <VisibilityIcon />
                  </IconButton>
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

      {/* Event Details Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={openModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 450,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {selectedEvent && (
              <>
                <Typography variant="h6">{selectedEvent.title}</Typography>

                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  value={selectedEvent.description}
                  InputProps={{ readOnly: true }}
                />

                <TextField
                  label="Location"
                  fullWidth
                  value={selectedEvent.location}
                  InputProps={{ readOnly: true }}
                />

                <TextField
                  label="Start Date"
                  fullWidth
                  value={formatDateTime(selectedEvent.start_date)}
                  InputProps={{ readOnly: true }}
                />

                <TextField
                  label="End Date"
                  fullWidth
                  value={formatDateTime(selectedEvent.end_date)}
                  InputProps={{ readOnly: true }}
                />

                <TextField
                  label="Participants Limit"
                  fullWidth
                  value={selectedEvent.participants_limit}
                  InputProps={{ readOnly: true }}
                />
              </>
            )}
          </Box>
        </Fade>
      </Modal>

      {/* Calendar Modal */}
      <Modal
        open={openCalendarModal}
        onClose={handleCloseCalendar}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={openCalendarModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 700,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Attending Events Calendar
            </Typography>
            <Calendar
              localizer={localizer}
              events={events.map((event: any) => ({
                title: event.title,
                start: new Date(event.start_date),
                end: new Date(event.start_date),
                allDay: true,
              }))}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              tooltipAccessor="title"
            />
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default DashboardContent;
