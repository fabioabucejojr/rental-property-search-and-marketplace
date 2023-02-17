import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from "react-toastify";

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://hrentalapp.com/">
          KMS-House Rental Web App
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const theme = createTheme();

// export default function SignUp() {
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({
//       email: data.get('email'),
//       password: data.get('password'),
//     });
//   };
const SignUp = ({ setAuth }) => {
    const [inputs, setInputs] = useState({
        first_name: "",
        last_name: "",
        bdate: "",
        user_email: "",
        user_password: ""
    });

    const { first_name, last_name, bdate, user_email, user_password  } = inputs;

    const onChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const onSubmitForm = async (e) => {
        e.preventDefault()

        try {
            const body = { first_name, user_email, user_password }
            // console.log(body)
            const response = await fetch("http://localhost:5000/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);

                setAuth(true);
                toast.success("Registered Successfully!", {
                    position: toast.POSITION.TOP_CENTER
                });
            } else {
                setAuth(false);
                toast.error(parseRes);
            }

            // console.log(parseRes)
        } catch (err) {
            console.log(err.message)
        };
    };

    let dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    const newdate = year + "-" + month + "-" + day;

    // <select name="user_type" id="user_type" >
    //     <option value="admin">admin</option>
    //     <option value="staff">staff</option>
    //     <option value="user">user</option>
    // </select>

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={onSubmitForm} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="first_name"
                                    required
                                    fullWidth
                                    id="first_name"
                                    label="First Name"
                                    value={first_name}
                                    onChange={e => onChange(e)}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="last_name"
                                    label="Last Name"
                                    name="last_name"
                                    value={last_name}
                                    onChange={e => onChange(e)}
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    type="date"
                                    id="bdate"
                                    label="Birth Date"
                                    name="bdate"
                                    value={bdate} min="1900-01-01" max={newdate}
                                    onChange={e => onChange(e)}
                                    autoComplete="birth-date"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="user_email"
                                    label="Email Address"
                                    name="user_email"
                                    value={user_email}
                                    onChange={e => onChange(e)}
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="user_password"
                                    label="Password"
                                    type="password"
                                    id="user_password"
                                    value={user_password}
                                    onChange={e => onChange(e)}
                                    autoComplete="new-password"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="By selecting Agree and continue, I agree to HRA's Terms of Service, Payments Terms of Service, and Nondiscrimination Policy, and acknowledge the Privacy Policy."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Agree & Continue
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
};

export default SignUp;