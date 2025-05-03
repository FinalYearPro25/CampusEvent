import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import  {useCreateLogin}  from '../hooks/useGetLogin';
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useIsLoggedIn } from '../hooks/useGetIsLoggedIn';
import { toast } from "react-toastify";
import * as React from 'react';
import { CircularProgress, Stack } from '@mui/material';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Eventryx
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#68ad68',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function SignIn() {
  const classes = useStyles();
  const { mutate, isPending } = useCreateLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { data, isLoading } = useIsLoggedIn();

  const handleSubmit = (e:any) => {
    e.preventDefault();
    mutate(
      { email, password },
      {
        onSuccess: (data) => {
          setEmail("");
          setPassword("");
          const token = data.access_token;
          Cookies.set('user_id', data.user_id, { expires: 7, secure: true });
          Cookies.set('token', token, { expires: 7, secure: true });
          window.location.href = "/";

        },
        onError: (e) => {
          if (e.response.status === 422){
            toast.error("Email is not registered in the system.");
          }
          if (e.response.status === 401){
            toast.error("Email or Password does not match.");
          }
        },
      }
    );
  };
  // if(isPending){
  //  return <Stack alignItems="center" spacing={10} mt={25}> <CircularProgress /></Stack>;
  // }
  if (data) {
    navigate("/");
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isPending}
          >
            Sign In
          </Button>
          <Grid container spacing={2}>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
            </Grid>
            <Grid item>
              <Link href={"/signup"} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          {/* <Grid container spacing={1}>
            <Grid item xs={12}>
              <h3>Demo user and password</h3>
            </Grid>
            <Grid item xs={12}>
              E-mail: test@eventryx.com
            </Grid>
            <Grid item xs={12}>
            Password: eventryx
            </Grid>
          </Grid> */}
        </form>
      </div>
      <Box mt={100}>
        <Copyright />
      </Box>
      {/* <Stack className={spinner ? 'disabled' : ''} alignItems="center" spacing={10} mt={25}> <CircularProgress /></Stack> */}
    </Container>

  );
}