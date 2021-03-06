import React, { useState } from "react";
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

const initTarea = {
  name: "",
  status: "TODO",
};

const AddCard = ({ setTareas }) => {
  const alert = useNotification();
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);

  const [tarea, setTarea, handleInputChange, reset] = useForm(initTarea);
  const [glbState] = useGlobal();
  const statuses = glbState.taskStatuses;

  const handleClose = () => {
    reset();
    setOpenModal(false);
  };

  const handleSubmit = () => {
    if (tarea.name.trim().length > 3) {
      taskServices.save(tarea).then(
        (data) => {
          setTareas((tareasList) => [{ id: data.id, ...tarea }, ...tareasList]);
          alert({
            isOpen: true,
            message: "Card has been added succesfully.",
            severity: "success",
          });
          reset();
          setOpenModal(false);
        },
        (error) => {
          alert({
            isOpen: true,
            message: "Error adding new card.",
            severity: "error",
          });
        }
      );
    } else {
      alert({
        isOpen: true,
        severity: "error",
        message: "Task name is required.",
      });
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
              Create new task
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
              value={tarea.name}
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
              value={tarea.status}
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

AddCard.prototype = {
  setTareas: PropTypes.func.isRequired,
};

export default AddCard;
