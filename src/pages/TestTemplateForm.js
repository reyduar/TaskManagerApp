import React, { useState } from "react";
import { Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import AlertDialog from "../components/AlertDialog";
import { Grid, Button, TextField, MenuItem, Select } from "@material-ui/core";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import Icon from "../components/Icon";
import { userServices } from "../api";
import { useNotification, useGlobal } from "../hooks";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const formSchema = object().shape({
  testCaseId: string().required("Test case Id is a required field."),
  status: string().required("Status is a requited field."),
  title: string().required("Title is a requited field."),
});

const TestTemplateForm = () => {
  const [glbState] = useGlobal();
  const statuses = glbState.taskStatuses;
  const [openConfirm, setOpenConfirm] = useState(false);
  const history = useHistory();
  const alert = useNotification();
  const { register, handleSubmit, errors, reset, control } = useForm({
    mode: "onBlur",
    resolver: yupResolver(formSchema),
    defaultValues: {
      testCaseId: "",
      status: "",
      title: "",
    },
  });

  const onSave = (values) => {
    console.log(values);
  };

  const onCancel = () => {
    history.replace("/");
  };

  const onConfirmCancel = () => {
    setOpenConfirm(true);
  };

  const classes = useStyles();
  return (
    <main>
      <div className={classes.formContent}>
        <Container component="main" maxWidth="lg">
          <Typography component="h1" variant="h5">
            Create Test Case
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(onSave)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  inputRef={register}
                  name="testCaseId"
                  variant="outlined"
                  fullWidth
                  id="testCaseId"
                  label="Test Case Id"
                  error={!!errors.testCaseId}
                  helperText={errors?.testCaseId?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  render={(props) => (
                    <TextField
                      select
                      value={props.value}
                      onChange={props.onChange}
                      variant="outlined"
                      fullWidth
                      label="Status"
                      error={!!errors.status}
                      helperText={errors?.status?.message}
                    >
                      {statuses.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                  name="status"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Choose one status.",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  inputRef={register}
                  name="title"
                  variant="outlined"
                  fullWidth
                  id="title"
                  label="Test Title"
                  error={!!errors.title}
                  helperText={errors?.title?.message}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={onConfirmCancel}
            >
              <Icon name={"Close"} />
              Cancel
            </Button>{" "}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              <Icon name={"Check"} />
              Save
            </Button>
          </form>
        </Container>
      </div>
      <AlertDialog
        isOpen={openConfirm}
        handleNo={() => setOpenConfirm(false)}
        handleYes={onCancel}
        title={"Confirm Cancel"}
        content={"Are you sure you want to cancel?"}
      />
    </main>
  );
};

export default TestTemplateForm;
