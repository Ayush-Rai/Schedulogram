import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TimePicker from "react-time-picker";
import Button from "@mui/material/Button";

import { NONE_ITEM } from "../../store/content";
import Box from "../../UI/header/Box";
import styles from "./SpecialBox.module.css";
import { contentActions } from "../../store/content";

const timeValid = (t1, t2, t3, t4) => {
  if (t1 === "" || t2 === "" || t3 === "" || t4 === "") return false;
  if (+t1 < 0 || +t1 > 23) return false;
  if (+t3 < 0 || +t3 > 23) return false;
  if (+t2 < 0 || +t2 > 59) return false;
  if (+t4 < 0 || +t4 > 59) return false;

  if (+t1 > +t3) return false;
  if (+t1 === +t3 && +t2 >= +t4) return false;
  return true;
};

const appendZero = (str) => {
  if (str.length === 1) str = "0" + str;
  return str;
};

const SpecialBox = (props) => {
  const [showMessage, setShowMessage] = useState([false, false, false]);

  const topRow = useSelector((state) => state.content[NONE_ITEM]);
  const currentRow = useSelector((state) => state.content[props.day]);

  const dispatch = useDispatch();
  const newStyle = {
    ...props.style,
    width: "17.3rem",
    height: "7.5rem",
    position: "absolute",
    zIndex: 4,
    top: "-1.2rem",
    right: "-2rem",
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const target = event.target;
    let value = "";
    if (props.day === NONE_ITEM) {
      if (
        !timeValid(
          target[1].value,
          target[2].value,
          target[4].value,
          target[5].value
        )
      ) {
        setShowMessage([true, false, false]);
        return;
      }
      value =
        appendZero(target[1].value) +
        ":" +
        appendZero(target[2].value) +
        " - " +
        appendZero(target[4].value) +
        ":" +
        appendZero(target[5].value);
      if (currentRow.includes(value)) {
        setShowMessage([false, false, true]);
        return;
      }
    } else {
      value = target[0].value;
      if (value === "") {
        setShowMessage([true, false, false]);
        return;
      }

      // console.log("EXTRACTED VALUE -> ",content);
      if (currentRow.length === topRow.length) {
        setShowMessage([false, true, false]);
        return;
      }
    }
    props.onCloseWindow();
    dispatch(contentActions.add({ day: props.day,id:props.id, title: value }));
  };

  return (
    <Box style={newStyle}>
      <form onSubmit={submitHandler}>
        {props.rowNum === 0 && (
          <div className={styles["time-picker-div"]}>
            <TimePicker
              className={styles["react-time-picker__input_group"]}
              clearIcon={null}
              clockIcon={null}
              disableClock={true}
              format="HH:mm"
              hourPlaceholder="HH"
              minutePlaceholder="MM"
            />
            <TimePicker
              className={styles["react-time-picker__input_group"]}
              clearIcon={null}
              clockIcon={null}
              disableClock={true}
              format="HH:mm"
              hourPlaceholder="HH"
              minutePlaceholder="MM"
            />
          </div>
        )}
        {props.rowNum !== 0 && (
          <div style={{ width: "100%" }}>
            <input
              type="text"
              placeholder="Enter text here..."
              className={styles["text-input"]}
            />
          </div>
        )}
        {showMessage[0] && (
          <div className={styles.message}>Something wrong with the input</div>
        )}
        {showMessage[1] && (
          <div className={styles.message}>First add the Time Range</div>
        )}
        {showMessage[2] && (
          <div className={styles.message}>Cannot add duplicate Time Range</div>
        )}
        <div className={styles["buttons-div"]}>
          <Button
            type="submit"
            sx={{ "&": { m: 1, mb: 0, border: 3 } }}
            variant="outlined"
            size="small"
            color="success"
          >
            ✔
          </Button>
          <Button
            sx={{ "&": { m: 1, mb: 0, border: 3 } }}
            variant="outlined"
            size="small"
            color="error"
            onClick={props.onCloseWindow}
          >
            ❌
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default SpecialBox;
