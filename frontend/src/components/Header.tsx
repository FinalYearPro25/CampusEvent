import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Cookies from "js-cookie";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useIsLogout } from "../hooks/useGetLogout";
import { useIsLoggedIn } from "../hooks/useGetIsLoggedIn";
import logo from "../assets/logo.png";

const pages = [
  { name: "Upcoming Events", linkTo: "/upcoming-events" },
  { name: "My Events", linkTo: "/my-events" },
  { name: "Attending", linkTo: "/attending" },
  { name: "Requests", linkTo: "/event-requests" },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const { mutateAsync: logout } = useIsLogout();
  const { data: user, isLoading: isUserLoading } = useIsLoggedIn();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    await logout();
    Cookies.remove("token", { path: "/" });
    navigate("/login");
  };

  if (isUserLoading) return <div>Loading...</div>;

  return (
    <AppBar style={{ backgroundColor: '#68ad68' }} position="static" sx={{ mb: 5 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <RouterLink to="/">
            <Box
              component="img"
              sx={{
                height: 70,
                width: 70,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
                marginRight: 2,
                marginLeft: -2
              }}
              alt="Eventify"
              src={logo}
            />
          </RouterLink>

          {/* Title for mobile view */}
          <Typography
            variant="h5"
            noWrap
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 600,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none"
            }}
          >
            Fountain University Event Management
          </Typography>

          {/* Mobile Nav Menu */}
          {user.isLoggedIn && (
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((item, index) => (
                  <MenuItem key={index} onClick={handleCloseNavMenu}>
                    <Typography
                      component={RouterLink}
                      to={item.linkTo}
                      sx={{ color: "black", textDecoration: "none" }}
                    >
                      {item.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}

          {/* Desktop Nav Menu */}
          {user.isLoggedIn && (
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((item, index) => (
                <Button
                  key={index}
                  component={RouterLink}
                  to={item.linkTo}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>
          )}

          {/* User Avatar and Menu */}
          {user.isLoggedIn && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <img
                    src="/avatar.png"
                    alt={user.email}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "100%",
                      objectFit: "cover"
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem>
                  <Typography
                    component="div"
                    sx={{ textAlign: "center" }}
                  >
                    <small>{user.email}</small>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    component={RouterLink}
                    to={user.url}
                    sx={{ color: "black", textDecoration: "none" }}
                  >
                    Event Calendar
                  </Typography>
                </MenuItem>
                <MenuItem>
                  <Typography
                    onClick={handleLogout}
                    sx={{ color: "black", textDecoration: "none", cursor: "pointer" }}
                  >
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
