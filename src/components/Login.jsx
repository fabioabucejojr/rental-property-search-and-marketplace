// import * as React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { toast } from "react-toastify";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import UserDashboard from "./UsrDashboard";
import AdminDashboard from "./Dashboard";


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://hrentalapp.com/">
        KMS-House Rental App
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();


const Login = ({ setAuth }) => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        user_email: "",
        user_password: ""
    });

    const {user_email, user_password} = inputs;
    const onChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const body = { user_email, user_password }
            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const parseRes = await response.json()

            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);

                setAuth(true);
                toast.success("Login Successfully!", {
                    position: toast.POSITION.TOP_CENTER
                });
                //console.log(parseRes);
                
                // redirect to the appropriate dashboard based on user_type
                if (parseRes.user.user_type === "user") {
                  // Redirect to user dashboard
                  navigate("/UserDashboard");
                } else if (parseRes.user.user_type === "admin") {
                  // Redirect to admin dashboard
                  navigate("/AdminDashboard");
                }

            } else {
                setAuth(false);
                toast.error(parseRes);
            }
        } catch (err) {
            console.error(err.message)

        };
    };

  return (
    <div>

      <ThemeProvider theme={theme}>

        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/random/?RealEstate&1)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" noValidate onSubmit={onSubmitForm} sx={{ mt: 1 }}>

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="user_email"
                  label="Email Address"
                  name="user_email"
                  autoComplete="email"
                  autoFocus
                  value={user_email}
                  onChange={e => onChange(e)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="user_password"
                  label="Password"
                  type="password"
                  id="user_password"
                  autoComplete="current-password"
                  value={user_password}
                  onChange={e => onChange(e)}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="/forgotpassword" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/register" variant="body2">
                      {/* {"Don't have an account? Sign Up"} */}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}

export default Login;