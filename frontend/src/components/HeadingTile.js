import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Button, IconButton } from "@mui/material";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import styles from "./HeadingTile.module.css";
import { contentActions } from "../store/content";
import { saveContentData } from "../store/content-actions";

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

const HeadingTile = (props) => {
  const [showBox, setShowBox] = useState(false);
  const [boxValue, setBoxValue] = useState("Break");
  const content = useSelector((state) => state.content);
  const dispatch = useDispatch();

  const history = useHistory();
  const finishEditingHandler = (content) => {
    dispatch(saveContentData(content));
    history.push("/table");
  };

  const setValuesHandler = (row, col, value) => {
    if (row === 0 && col === 0) return;
    setShowBox((prevState) => !prevState);
    if (col === 0) setBoxValue("Holiday");
    if (value === 1) {
      if (col === 0) {
        dispatch(
          contentActions.setDayAsHoliday({
            day: props.day,
          })
        );
      } else {
        dispatch(
          contentActions.setTimeRangeAsBreak({
            col: props.col,
          })
        );
      }
    }
  };
  const wrapperRef = useRef(null);
  useOutsideClicker(wrapperRef, () => setValuesHandler(props.rowNum, props.col, 0));

  const corner = props.rowNum === 0 && props.col === 0;
  return (
    <>
      {corner && (
        <Button
          size="large"
          sx={{ fontWeight: "bolder", color: "white", fontSize: "1.6rem" }}
          onClick={() => finishEditingHandler(content)}
        >
          DONE
        </Button>
      )}
      {!corner && (
        <div className={styles["title"]}>
          <div className={styles["more"]}>
            <IconButton
              sx={{ color: "black" }}
              size="small"
              onClick={() => setValuesHandler(props.rowNum, props.col, 0)}
            >
              <MoreHorizRoundedIcon />
            </IconButton>
          </div>

          {showBox && (
            <div
              ref={wrapperRef}
              className={styles["more-menu"]}
              onClick={() => setValuesHandler(props.rowNum, props.col, 1)}
            >
              {boxValue}
            </div>
          )}
          <>{props.col === 0 ? props.content : props.content.title}</>
        </div>
      )}
    </>
  );
};

export default HeadingTile;
