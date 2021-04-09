import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { userServices } from "../api";
import { useNotification } from "../hooks";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

const formSchema = object().shape({
  firstName: string()
    .matches(
      /^([^0-9_-]*)$/,
      "First name should be not contain numbers or special characters"
    )
    .required("First name is a required field."),
  lastName: string()
    .matches(
      /^([^0-9_-]*)$/,
      "Last name should be not contain numbers or special characters"
    )
    .required("Last name is a requited field."),
  emailAddress: string()
    .required("Email is a required field.")
    .email("Invalid email"),
  password: string().required("Password is a required field."),
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
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = () => {
  const alert = useNotification();
  const { register, handleSubmit, errors, reset } = useForm({
    mode: "onBlur",
    resolver: yupResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      password: "",
    },
  });

  const onSave = (values) => {
    userServices.saveUser(values).then(
      (data) => {
        alert({
          isOpen: true,
          message: "User has been registered succesfully.",
          severity: "success",
        });
        reset();
      },
      (error) => {
        alert({
          isOpen: true,
          message: "Error adding new user.",
          severity: "error",
        });
      }
    );
  };

  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          User Register
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSave)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                inputRef={register}
                name="firstName"
                variant="outlined"
                fullWidth
                id="firstName"
                label="First Name"
                error={!!errors.firstName}
                helperText={errors?.firstName?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                inputRef={register}
                variant="outlined"
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                error={!!errors.lastName}
                helperText={errors?.lastName?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={register}
                variant="outlined"
                fullWidth
                id="emailAddress"
                label="Email Address"
                name="emailAddress"
                error={!!errors.emailAddress}
                helperText={errors?.emailAddress?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={register}
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                error={!!errors.password}
                helperText={errors?.password?.message}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Save
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Register;
