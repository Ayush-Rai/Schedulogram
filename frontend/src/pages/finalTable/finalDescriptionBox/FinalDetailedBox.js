import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { IconButton } from "@mui/material";
import Box from "../../../UI/header/Box";
import styles from "./FinalDetailedBox.module.css";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFont } from "@fortawesome/free-solid-svg-icons";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

// import { contentActions } from "../../../store/content";
// import { useSelector } from "react-redux";
import { saveAttendanceData } from "../../../store/content-actions";

const useOutsideClicker = (ref, func) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        func(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, func]);
};

const DetailedBox = (props) => {
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const [disableButton, setDisableButton] = useState(false);

  const markAttendance = (val) => {
    const timeStamp = new Date();
    const newAttendanceActivity = {
      date: timeStamp.toLocaleDateString("en-IN"),
      hour: timeStamp.getHours() + "",
      minute: timeStamp.getMinutes() + "",
      seconds: timeStamp.getMinutes() + "",
      attendance: val,
    };

    const payload={
      id:props.id,
      day:props.day,
      attendanceActivity:newAttendanceActivity
    }

    dispatch(saveAttendanceData(payload));
    
    console.log(payload);
    setDisableButton(true);
    props.onClick(false);
  };

  // const content = useSelector((state) => state.content);

  // useEffect(() => {
  //   // if(changed){
  //   dispatch(saveContentData(content));
  //   console.log("Updated ->", content);
  //   // }
  // }, [dispatch, content]);

  useEffect(() => {
    props.content.description !== "" && setDescription(props.content.description);
  }, [props.content.description]);

  useEffect(() => {
    props.attendance !== -1 && setDisableButton(true);
    props.holiday && setDisableButton(true);
  }, [props.attendance, props.holiday]);

  const newStyle = {
    ...props.style,
    position: "absolute",
    width: "20rem",
    zIndex: "5",
    top: "-2rem",
    left: "-2rem",
    padding: ".8rem",
    color: "lightgray",
  };
  const wrapperRef = useRef(null);
  useOutsideClicker(wrapperRef, props.onClick);

  return (
    <Box style={newStyle}>
      <div className={styles["close-button"]}>
        <IconButton sx={{ "&": { color: "gray" }, "&:hover": { color: "black" } }} onClick={() => props.onClick(false)}>
          <ClearOutlinedIcon />
        </IconButton>
      </div>
      <div className={styles.wrapper} ref={wrapperRef}>
        <div className={styles["description-template"]}>
          <Tooltip
            title={props.content.title}
            position="bottom"
            interactive="true"
            followCursor="true"
            size="small"
            trigger="mouseenter"
          >
            <div className={styles["title"]}>{props.content.title}</div>
          </Tooltip>
        </div>

        {description !== "" && (
          <div className={styles["description-template"]}>
            <div className={styles["description"]}>{description}</div>
          </div>
        )}

        <div className={styles["buttons"]}>
          <IconButton
            sx={{ fontWeight: "bolder" }}
            size="large"
            color="success"
            onClick={() => markAttendance(1)}
            disabled={disableButton}
          >
            <LocalParkingIcon />
          </IconButton>
          <IconButton
            sx={{ fontWeight: "bolder" }}
            size="medium"
            color="error"
            onClick={() => markAttendance(0)}
            disabled={disableButton}
          >
            <FontAwesomeIcon icon={faFont} />
          </IconButton>
        </div>
      </div>
    </Box>
  );
};

export default DetailedBox;
