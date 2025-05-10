import { useEffect, useState } from "react";
import EventTable from "../components/EventTable";
import SendIcon from "@mui/icons-material/Send";
import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
  TablePagination,
  IconButton,
  Box,
  Button,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import GroupIcon from '@mui/icons-material/Group';
import DateRangeIcon from '@mui/icons-material/DateRange';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import { useTheme } from "@mui/material/styles";
import { useGetStatistics } from "../hooks/useGetStatistics";
import { useIsLoggedIn } from "../hooks/useGetIsLoggedIn";
import { useGetUserEventsMonthly } from "../hooks/useGetUserEventsMonthly";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const month = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"
];
const d = new Date();
const monthname = month[d.getMonth()];

const DashboardContent = () => {
  const { data: user, isLoading: isUserLoading } = useIsLoggedIn();
  const { data: stat, isLoading: isStatLoading } = useGetStatistics();
  const { data: monthlyEvents = [], isLoading: isEventLoading } = useGetUserEventsMonthly(user?.user_id);

  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loadingUpcoming, setLoadingUpcoming] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [extraStats, setExtraStats] = useState({
    total_users: 0,
    total_events: 0,
    total_upcoming: 0,
  });

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
      setLoadingUpcoming(false);
    }
  };

  // Fetch the extra stats (total users, total events, and total upcoming events)
  useEffect(() => {
    const fetchExtraStats = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get("http://localhost:8000/api/admin/dashboard-stats", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setExtraStats(response.data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      }
    };

    fetchExtraStats();
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

  const formatDateTime = (datetime: string) =>
    new Date(datetime).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

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

  if (isStatLoading || isUserLoading || isEventLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Existing Statistics Cards - using DashboardCard Component */}
      <Grid container spacing={2}>
        {Object.keys(stat).map((key) => (
          <Grid item xs={12} sm={6} md={4} key={key}>
            <Link to={`#`}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" align='center'>
                      {/* Render the icon based on the keyword */}
                      {key === "members" && (
                        <div>
                          <GroupIcon style={{ marginRight: '8px', verticalAlign: 'middle', fontSize: "40px" }} />
                          <span style={{ fontWeight: "bold" }}>Total Requests</span>
                        </div>
                      )}
                      {key === "events" && (
                        <div>
                          <DateRangeIcon style={{ marginRight: '8px', verticalAlign: 'middle', fontSize: "40px" }} />
                          <span style={{ fontWeight: "bold" }}>My Events</span>
                        </div>
                      )}
                      {key === "groups" && (
                        <div>
                          <DynamicFeedIcon style={{ marginRight: '8px', verticalAlign: 'middle', fontSize: "40px" }} />
                          <span style={{ fontWeight: "bold" }}>Total Attending</span>
                        </div>
                      )}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div" align='center'>
                      {stat[key]}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>

      {/* New Statistics Cards (not using DashboardCard) */}
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {/* Total Events */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" align='center'>
                  <DateRangeIcon style={{ marginRight: '8px', verticalAlign: 'middle', fontSize: "40px" }} />
                  <span style={{ fontWeight: "bold" }}>Total Events</span>
                </Typography>
                <Typography gutterBottom variant="h5" component="div" align='center'>
                  {extraStats.total_events}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        {/* Total Users */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" align='center'>
                  <GroupIcon style={{ marginRight: '8px', verticalAlign: 'middle', fontSize: "40px" }} />
                  <span style={{ fontWeight: "bold" }}>Total Users</span>
                </Typography>
                <Typography gutterBottom variant="h5" component="div" align='center'>
                  {extraStats.total_users}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        {/* Total Upcoming */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" align='center'>
                  <DynamicFeedIcon style={{ marginRight: '8px', verticalAlign: 'middle', fontSize: "40px" }} />
                  <span style={{ fontWeight: "bold" }}>Total Upcoming</span>
                </Typography>
                <Typography gutterBottom variant="h5" component="div" align='center'>
                  {extraStats.total_upcoming}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>

      {/* Monthly Events Table */}
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Events for {monthname}
      </Typography>
      <EventTable events={{ data: monthlyEvents }} />

      {/* Upcoming Events Table */}
      {loadingUpcoming ? (
        <div>Loading upcoming events...</div>
      ) : (
        <>
          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
            Upcoming Events
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="pagination table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Host</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Participants Limit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? upcomingEvents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : upcomingEvents
                ).map((event: any) => (
                  <TableRow key={event.id}>
                    <TableCell>{event.title}</TableCell>
                    <TableCell>{event.creator_name}</TableCell>
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
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[25, 50, 100, { label: "All", value: -1 }]}
                    colSpan={6}
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
      )}
    </>
  );
};

export default DashboardContent;
