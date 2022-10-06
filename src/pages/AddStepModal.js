import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { object, string, number } from "yup";
import PropTypes from "prop-types";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Button, TextField } from "@material-ui/core";
import Icon from "../components/Icon";
import ModalForm from "../components/ModalForm";
import { useNotification } from "../hooks";
import useStyles from "../UITemplate";

const formSchema = object().shape({
  stepNumber: number(),
  action: string().required("Action is a required field."),
  requiredData: string().required("Required Data is a required field."),
  expectedResult: string().required("Expected Result is a required field."),
});

const defaultValues = {
  stepNumber: 0,
  action: "",
  requiredData: "",
  expectedResult: "",
};
const AddStepModal = ({ setSteps, steps }) => {
  const alert = useNotification();
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);

  const { register, handleSubmit, errors, reset, setValue } = useForm({
    mode: "onBlur",
    resolver: yupResolver(formSchema),
    defaultValues,
  });

  const handleAddNewStep = () => {
    setOpenModal(!openModal);

    reset({
      ...defaultValues,
      stepNumber: steps.length + 1,
    });
  };

  const handleClose = () => {
    reset();
    setOpenModal(false);
  };

  const onSubmit = (step) => {
    const values = { ...step, stepNumber: steps.length + 1 };
    setSteps((items) => [{ ...values }, ...items]);
    alert({
      isOpen: true,
      message: "Step has been added succesfully.",
      severity: "success",
    });
    reset();
    setOpenModal(false);
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
              onClick={() => handleAddNewStep()}
            >
              <Icon name={"Add"} />
              Add New Step
            </Button>
          </Grid>
        </Grid>
      </div>
      <ModalForm
        isOpen={openModal}
        title={"Add New Step"}
        handleClose={handleClose}
        loading={false}
        buttonLabel={"Add Step"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              inputRef={register}
              disabled={true}
              name="stepNumber"
              variant="outlined"
              fullWidth
              label="Step #"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              inputRef={register}
              name="action"
              variant="outlined"
              fullWidth
              label="Action"
              error={!!errors.action}
              helperText={errors?.action?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              inputRef={register}
              name="requiredData"
              variant="outlined"
              fullWidth
              label="Required Data"
              error={!!errors.requiredData}
              helperText={errors?.requiredData?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              inputRef={register}
              name="expectedResult"
              variant="outlined"
              fullWidth
              label="Expected Result"
              error={!!errors.expectedResult}
              helperText={errors?.expectedResult?.message}
            />
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
