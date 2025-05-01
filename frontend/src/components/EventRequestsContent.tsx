import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import VisibilityIcon from "@mui/icons-material/Visibility";
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
} from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useTheme } from "@mui/material/styles";
import axios from "axios";

const DashboardContent = () => {
  const [events, setEvents] = useState([]);
  const [incomingEvents, setIncomingEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [openModal, setOpenModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [viewIncomingModal, setViewIncomingModal] = useState(false);
  const [selectedIncomingEvent, setSelectedIncomingEvent] = useState<any>(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = Cookies.get("token");

        const response = await axios.get("http://localhost:8000/api/events/get_all_outgoing_requests", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response?.data ?? [];
        if (!Array.isArray(data)) throw new Error("Expected an array of events");
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch outgoing event requests:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchIncomingRequests = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get("http://localhost:8000/api/events/get_all_incoming_requests", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response?.data ?? [];
        if (!Array.isArray(data)) throw new Error("Expected an array of incoming events");
        setIncomingEvents(data);
      } catch (error) {
        console.error("Failed to fetch incoming event requests:", error);
      }
    };

    fetchEvents();
    fetchIncomingRequests();
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

  const handleOpenModal = (event: any) => {
    setSelectedEvent(event);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedEvent(null);
  };

  const handleOpenIncomingModal = (event: any) => {
    setSelectedIncomingEvent(event);
    setViewIncomingModal(true);
  };

  const handleCloseIncomingModal = () => {
    setViewIncomingModal(false);
    setSelectedIncomingEvent(null);
  };



// const handleApproveRequest = async (requestId: number) => {
//     const confirm = window.confirm("Are you sure you want to approve this request?");
//     if (!confirm) return;
  
//     try {
//       const token = Cookies.get("token");
//       await axios.post(
//         `http://localhost:8000/api/requests/approve/${requestId}`,
//         {},
//         {
//           headers: {
//             Accept: "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
  
//       const updatedEvents = incomingEvents.map(event => ({
//         ...event,
//         requests: event.requests.map(req =>
//           req.request_id === requestId ? { ...req, status: 1 } : req
//         ),
//       }));
//       setIncomingEvents(updatedEvents);
//     } catch (err) {
//       console.error("Approval failed:", err);
//       alert("Approval failed. Please try again.");
//     }
//   };
  
const handleApproveRequest = async (requestId: number) => {
    const confirm = window.confirm("Are you sure you want to approve this request?");
    if (!confirm) return;
  
    try {
      const token = Cookies.get("token");
      await axios.post(
        `http://localhost:8000/api/requests/approve/${requestId}`,
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const updatedEvents = incomingEvents.map(event => {
        if (!event.requests.some(req => req.request_id === requestId)) return event;
        return {
          ...event,
          requests: event.requests.map(req =>
            req.request_id === requestId ? { ...req, status: 1 } : req
          ),
        };
      });
  
      setIncomingEvents(updatedEvents);
  
      // Update selectedIncomingEvent if it contains this request
      const updatedSelected = updatedEvents.find(e => e.id === selectedIncomingEvent?.id);
      if (updatedSelected) setSelectedIncomingEvent(updatedSelected);
  
    } catch (err) {
      console.error("Approval failed:", err);
      alert("Approval failed. Please try again.");
    }
  };
  

  const approvedEvents = events.filter((event: any) => event.request_status === 1);
  const pendingEvents = events.filter((event: any) => event.request_status === 0);

  if (loading) return <div>Loading...</div>;

  return (
    <>



    {/* Incoming Events Table */}
    <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Incoming Requests
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Request Count</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {incomingEvents.map((event: any) => (
              <TableRow key={event.id}>
                <TableCell>{event.title}</TableCell>
                <TableCell>{formatDateTime(event.start_date)}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>{event.request_count}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpenIncomingModal(event)}>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>



      {/* Pending Events Table */}
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Pending Outgoing Events Requests
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="pagination table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>Host</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? pendingEvents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : pendingEvents
            ).map((event: any) => (
              <TableRow key={event.id}>
                <TableCell>{event.title}</TableCell>
                <TableCell>{formatDateTime(event.start_date)}</TableCell>
                <TableCell>{event.creator_name}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpenModal(event)}>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[25, 50, 100, { label: "All", value: -1 }]}
                colSpan={6}
                count={pendingEvents.length}
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

      {/* Approved Events Table */}
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Approved Outgoing Events Requests
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="pagination table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>Host</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? approvedEvents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : approvedEvents
            ).map((event: any) => (
              <TableRow key={event.id}>
                <TableCell>{event.title}</TableCell>
                <TableCell>{formatDateTime(event.start_date)}</TableCell>
                <TableCell>{event.creator_name}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpenModal(event)}>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[25, 50, 100, { label: "All", value: -1 }]}
                colSpan={6}
                count={approvedEvents.length}
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

      

      {/* Outgoing Request Modal */}
      <Modal open={openModal} onClose={handleCloseModal} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500 }}>
        <Fade in={openModal}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 450,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}>
            {selectedEvent && (
              <>
                <Typography variant="h6" gutterBottom>{selectedEvent.title}</Typography>
                <TextField label="Location" fullWidth value={selectedEvent.location} InputProps={{ readOnly: true }} />
                <TextField label="Start Date" fullWidth value={formatDateTime(selectedEvent.start_date)} InputProps={{ readOnly: true }} />
                <TextField label="End Date" fullWidth value={formatDateTime(selectedEvent.end_date)} InputProps={{ readOnly: true }} />
                <TextField label="Participants Limit" fullWidth value={selectedEvent.participants_limit} InputProps={{ readOnly: true }} />
              </>
            )}
          </Box>
        </Fade>
      </Modal>

      {/* Incoming Request Modal */}
      <Modal open={viewIncomingModal} onClose={handleCloseIncomingModal} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500 }}>
        <Fade in={viewIncomingModal}>
          <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 500,
                maxHeight: '80vh', // Limit height
                overflowY: 'auto',  // Enable scroll
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}>
            {selectedIncomingEvent && (
              <>
                <Typography variant="h6" gutterBottom>{selectedIncomingEvent.title}</Typography>
                <TextField label="Location" fullWidth value={selectedIncomingEvent.location} InputProps={{ readOnly: true }} />
                <TextField label="Start Date" fullWidth value={formatDateTime(selectedIncomingEvent.start_date)} InputProps={{ readOnly: true }} />
                <TextField label="End Date" fullWidth value={formatDateTime(selectedIncomingEvent.end_date)} InputProps={{ readOnly: true }} />
                <TextField label="Participants Limit" fullWidth value={selectedIncomingEvent.participants_limit} InputProps={{ readOnly: true }} />
                <Typography variant="subtitle1" sx={{ mt: 2 }}>Requests:</Typography>
                {selectedIncomingEvent.requests.length > 0 ? (
                    selectedIncomingEvent.requests.map((req: any) => (
                        <Box key={req.request_id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1, borderBottom: '1px solid #ddd' }}>
                        <Typography>{req.requester_name}</Typography>
                        {req.status === 0 ? (
                            <IconButton color="success" onClick={() => handleApproveRequest(req.request_id)}>
                            ✅
                            </IconButton>
                        ) : (
                            <Typography color="green">Approved</Typography>
                        )}
                        </Box>
                    ))
                    ) : (
                    <Typography variant="body2" color="text.secondary">No request yet</Typography>
                )}
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default DashboardContent;
