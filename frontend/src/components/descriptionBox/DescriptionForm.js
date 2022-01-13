import React, { forwardRef } from "react";
import { Button, TextField } from "@mui/material";

import styles from "./DescriptionForm.module.css";

const DescriptionForm = forwardRef((props, ref) => {
  return (
    <form onSubmit={props.onSubmit} className={styles["input-prompt"]}>
      <TextField
        inputRef={ref}
        label={props.label}
        size="small"
        type="text"
        onChange={props.onChange}
        value={props.value}
      />

      <Button
        type={props.buttonContent.type}
        sx={{ "&": { mb: 0, border: 2 } }}
        variant="outlined"
        size="small"
        color={props.buttonContent.color}
        onClick={props.buttonContent.onClick}
      >
        {props.buttonContent.value}
      </Button>
    </form>
  );
});

export default DescriptionForm;
