import { useEffect, useState } from "react";
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
  Button,
} from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SendIcon from "@mui/icons-material/Send";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import Cookies from "js-cookie";

const DashboardContent = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const theme = useTheme();

  const fetchUpcomingEvents = async () => {
    try {
      const token = Cookies.get("token");

      const response = await axios.get("http://localhost:8000/api/events/get_all_upcoming", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response?.data ?? [];
      if (!Array.isArray(data)) throw new Error("Expected an array of events");

      setUpcomingEvents(data);
    } catch (error) {
      console.error("Failed to fetch upcoming events:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {

    fetchUpcomingEvents();
  }, []);

  const handleRequestToAttend = async (eventId: number) => {
    const confirmed = window.confirm("Are you sure you want to send a request to attend this event?");
    if (!confirmed) return;

    try {
      const token = Cookies.get("token");

      await axios.post(
        "http://localhost:8000/api/events/request_to_attend",
        { event_id: eventId },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchUpcomingEvents();
      alert("Request sent successfully!");
    } catch (error) {
      console.error("Failed to send request:", error);
      alert("Failed to send request. Please try again.");
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - upcomingEvents.length) : 0;

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
      <IconButton
        onClick={(e) => onPageChange(e, 0)}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={(e) => onPageChange(e, page - 1)}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={(e) => onPageChange(e, page + 1)}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={(e) =>
          onPageChange(e, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
        }
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Upcoming Events Table
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="pagination table">
          <TableHead>
            <TableRow>
              {/* <TableCell>ID</TableCell> */}
              <TableCell>Title</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Participants Limit</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? upcomingEvents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : upcomingEvents
            ).map((event: any) => (
              <TableRow key={event.id}>
                {/* <TableCell>{event.id}</TableCell> */}
                <TableCell>{event.title}</TableCell>
                <TableCell>{formatDateTime(event.start_date)}</TableCell>
                <TableCell>{formatDateTime(event.end_date)}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>{event.participants_limit}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    startIcon={<SendIcon fontSize="small" />}
                    onClick={() => handleRequestToAttend(event.id)}
                    sx={{
                      backgroundColor: "green",
                      color: "#fff",
                      fontSize: "0.45rem",fontWeight:'bold',
                      padding: "4px 8px",
                      minWidth: "unset",
                      "&:hover": {
                        backgroundColor: "darkgreen",
                      },
                    }}
                  >
                    Request to Attend
                  </Button>
                </TableCell>

              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={7} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[25, 50, 100, { label: "All", value: -1 }]}
                colSpan={7}
                count={upcomingEvents.length}
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
    </>
  );
};

export default DashboardContent;
