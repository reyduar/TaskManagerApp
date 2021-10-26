import React from "react";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import HomeIcon from "@material-ui/icons/Home";
import DeleteIcon from "@material-ui/icons/Delete";
import InfoIcon from "@material-ui/icons/Info";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

import useStyles from "../UITemplate";

export default function Icon({ name }) {
  const { icon } = useStyles();

  return (
    <>
      {name === "Home" && <HomeIcon className={icon} />}
      {name === "Add" && <AddToPhotosIcon className={icon} />}
      {name === "Delete" && <DeleteIcon className={icon} />}
      {name === "Info" && <InfoIcon className={icon} />}
      {name === "Check" && <CheckIcon className={icon} />}
      {name === "Close" && <CloseIcon className={icon} />}
    </>
  );
}
