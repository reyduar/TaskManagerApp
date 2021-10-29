import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Grid,
  Button,
  TextField,
  Select,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import { taskServices } from "../api";
import Icon from "../components/Icon";
import ModalForm from "../components/ModalForm";
import { useNotification, useForm, useGlobal } from "../hooks";
import useStyles from "../UITemplate";

const INITIAL_STATE = {
  stepId: "",
  action: "",
  requiredData: "",
  expectedResult: "",
};

const AddStepModal = ({ setSteps }) => {
  const alert = useNotification();
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);

  const [step, setStep, handleInputChange, reset] = useForm(INITIAL_STATE);
  const [glbState] = useGlobal();
  const statuses = glbState.taskStatuses;
  const history = useHistory();

  const handleClose = () => {
    reset();
    setOpenModal(false);
  };

  const handleSubmit = () => {
    if (step.name.trim().length > 3) {
      setSteps((items) => [{ ...step }, ...items]);
      alert({
        isOpen: true,
        message: "Step has been added succesfully.",
        severity: "success",
      });
      reset();
      setOpenModal(false);
    }
  };

  return (
    <>
      <div className={classes.heroButtons}>
        <Grid container spacing={2} justify="center">
          <Grid item>
            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={() => setOpenModal(!openModal)}
            >
              <Icon name={"Add"} />
              Add New Step
            </Button>
          </Grid>
        </Grid>
      </div>
      <ModalForm
        isOpen={openModal}
        title={"Create New Task"}
        handleClose={handleClose}
        onSubmit={handleSubmit}
        loading={false}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="name"
              variant="outlined"
              fullWidth
              label="Task Name"
              onChange={handleInputChange}
              value={steps.name}
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel id="status-label-id">Status</InputLabel>
            <Select
              name="status"
              fullWidth
              variant="outlined"
              labelId="status-label-id"
              id="status-label-id"
              onChange={handleInputChange}
              value={steps.status}
              label="Status"
            >
              {statuses.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      </ModalForm>
    </>
  );
};

AddStepModal.prototype = {
  setSteps: PropTypes.func.isRequired,
};

export default AddStepModal;
