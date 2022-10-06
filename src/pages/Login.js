import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { userServices } from "../api";
import { useNotification, useAuth } from "../hooks";

import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { type } from "../types/types";

const formSchema = object().shape({
  emailAddress: string().required("Enter user email.").email("Invalid email"),
  password: string().required("Enter user password."),
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = ({ history }) => {
  const classes = useStyles();
  const alert = useNotification();
  const { dispatch } = useAuth();

  const { register, handleSubmit, errors, reset } = useForm({
    mode: "onBlur",
    resolver: yupResolver(formSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
    },
  });

  const onLogin = (values) => {
    userServices.findUser(values).then(
      (query) => {
        const { empty } = query;
        if (empty) {
          alert({
            isOpen: true,
            message: "Incorrect username or password :(",
            severity: "error",
          });
        } else {
          query.forEach((doc) => {
            const id = doc.id;
            const { emailAddress, firstName, lastName } = doc.data();
            dispatch({
              type: type.LOGIN,
              payload: { id, emailAddress, firstName, lastName },
            });
            alert({
              isOpen: true,
              message: `Welcome ${firstName} ${lastName} :)`,
              severity: "success",
            });
            history.replace("/");
          });
        }
      },
      (error) => {
        alert({
          isOpen: true,
          message: `${JSON.stringify(error)}`,
          severity: "error",
        });
      }
    );
    reset();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onLogin)}>
          <TextField
            inputRef={register}
            variant="outlined"
            margin="normal"
            fullWidth
            id="emailAddress"
            label="Username"
            name="emailAddress"
            error={!!errors.emailAddress}
            helperText={errors?.emailAddress?.message}
          />
          <TextField
            inputRef={register}
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            error={!!errors.password}
            helperText={errors?.password?.message}
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
            className={classes.submit}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" component={RouterLink} variant="body2">
                {"Don't have an account? Register"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Login;

function Copyright() {
  return (
    <>
      <Typography variant="body2" color="textSecondary" align="center">
        {"User: qwd@gmail.com | pass: qwd"}
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://linkedin.com/in/arielduarte">
          Ariel Duarte
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </>
  );
}
