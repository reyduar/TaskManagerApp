import React, { useState } from "react";
import "date-fns";
import { Container, TableCell } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import AlertDialog from "../components/AlertDialog";
import {
  Grid,
  Button,
  TextField,
  MenuItem,
  Select,
  Modal,
} from "@material-ui/core";
import AddStepModal from "./AddStepModal";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import Icon from "../components/Icon";
import { userServices } from "../api";
import { useNotification, useGlobal } from "../hooks";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import { TableContainer, TableHead, TableRow } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

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

const scopes = [
  { name: "COMPONENTS", value: "COMPONENTS" },
  { name: "FEATURE", value: "FEATURE" },
];

const formSchema = object().shape({
  testCaseId: string().required("Test case Id is a required field."),
  status: string().required("Status is a requited field."),
  title: string().required("Title is a requited field."),
  description: string().required("Description is a requited field."),
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
      description: "",
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

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [steps, setSteps] = useState([]);
  const onSaveStep = (step) => {
    setSteps([...steps, step]);
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
                  label="Test case Id"
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
              <Grid item xs={12} sm={12}>
                <TextField
                  inputRef={register}
                  name="title"
                  variant="outlined"
                  fullWidth
                  id="title"
                  label="Test title"
                  error={!!errors.title}
                  helperText={errors?.title?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  inputRef={register}
                  name="priority"
                  variant="outlined"
                  fullWidth
                  id="priority"
                  label="Test priority"
                  error={!!errors.testCaseId}
                  helperText={errors?.testCaseId?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  inputRef={register}
                  name="createdBy"
                  variant="outlined"
                  fullWidth
                  id="createdBy"
                  label="Created by"
                  error={!!errors.testCaseId}
                  helperText={errors?.testCaseId?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  inputRef={register}
                  name="project"
                  variant="outlined"
                  fullWidth
                  id="project"
                  label="Project"
                  error={!!errors.testCaseId}
                  helperText={errors?.testCaseId?.message}
                />
              </Grid>

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid item xs={12} sm={6}>
                  <KeyboardDatePicker
                    // disableToolbar
                    fullWidth
                    variant="outlined"
                    views={["year", "month", "date"]}
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="creationDate"
                    label="Creation Date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>

              <Grid item xs={12} sm={6}>
                <Controller
                  render={(props) => (
                    <TextField
                      select
                      value={props.value}
                      onChange={props.onChange}
                      variant="outlined"
                      fullWidth
                      label="Scopes"
                      error={!!errors.status}
                      helperText={errors?.status?.message}
                    >
                      {scopes.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                  name="scopes"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Choose one scope",
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  inputRef={register}
                  name="modifiedBy"
                  variant="outlined"
                  fullWidth
                  id="modifiedBy"
                  label="Last modified by"
                  error={!!errors.testCaseId}
                  helperText={errors?.testCaseId?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  inputRef={register}
                  name="labels"
                  variant="outlined"
                  fullWidth
                  id="labels"
                  label="Labels"
                  error={!!errors.testCaseId}
                  helperText={errors?.testCaseId?.message}
                />
              </Grid>

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid item xs={12} sm={6}>
                  <KeyboardDatePicker
                    // disableToolbar
                    fullWidth
                    variant="outlined"
                    views={["year", "month", "date"]}
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="modifyDate"
                    label="Last modification date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
              <Grid item xs={12} sm={12}>
                <TextField
                  inputRef={register}
                  variant="outlined"
                  id="description"
                  name="description"
                  fullWidth
                  label="Multiline Placeholder"
                  placeholder="Description"
                  multiline
                  label="Description"
                  error={!!errors.description}
                  helperText={errors?.description?.message}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  inputRef={register}
                  variant="outlined"
                  id="preCondition"
                  name="preCondition"
                  fullWidth
                  label="Multiline Placeholder"
                  placeholder="Pre-Condition"
                  multiline
                  label="Pre-Condition"
                  error={!!errors.description}
                  helperText={errors?.description?.message}
                />
              </Grid>

              <AddStepModal setSteps={setSteps}></AddStepModal>
              <Grid item xs={12} sm={12}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Step #</TableCell>
                        <TableCell>Actions</TableCell>
                        <TableCell>Required Data</TableCell>
                        <TableCell>Expected Result</TableCell>
                      </TableRow>
                    </TableHead>
                    {steps.map((elemento) => (
                      <TableRow>
                        <TableCell>{elemento.stepId}</TableCell>
                        <TableCell>{elemento.action}</TableCell>
                        <TableCell>{elemento.requiredData}</TableCell>
                        <TableCell>{elemento.expectedResult}</TableCell>
                      </TableRow>
                    ))}
                  </Table>
                </TableContainer>
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  inputRef={register}
                  variant="outlined"
                  id="postCondition"
                  name="postCondition"
                  fullWidth
                  label="Multiline Placeholder"
                  placeholder="Post-Condition"
                  multiline
                  label="Post-Condition"
                  error={!!errors.description}
                  helperText={errors?.description?.message}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  inputRef={register}
                  variant="outlined"
                  id="testSet"
                  name="testSet"
                  fullWidth
                  label="Multiline Placeholder"
                  placeholder="Test set"
                  multiline
                  label="Test set"
                  error={!!errors.description}
                  helperText={errors?.description?.message}
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
              Submit
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
