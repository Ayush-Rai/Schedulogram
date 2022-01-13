import { useState,useEffect,useRef } from "react";
import {  useSelector } from "react-redux";
import {  NONE_ITEM } from "../../store/content";

import styles from "./FinalTile.module.css";

import DetailedBox from "./finalDescriptionBox/FinalDetailedBox";
import HeadingTile from "./FinalHeadingTile";

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

const Tile = (props) => {
  const [showDetBox, setShowDetBox] = useState(false);
  const valuesOfTile = useSelector((state) => state.content[props.day][props.col]);
  const showDetailedBoxHandler = (val) => {
    if (props.day === NONE_ITEM) return;
    if (props.col === 0) return;
    if (valuesOfTile.holiday || valuesOfTile.break_) return;
    setShowDetBox(val);
  };
  let sts = styles["tile"];
  if (props.day !== NONE_ITEM && props.col !== 0 && !valuesOfTile.holiday && !valuesOfTile.break_) {
    sts += " " + styles["actual-tile"];
  }

  const attendanceValue = () => {
    const timeStamp = new Date();
    const len = props.attendanceActivities.length;

    const value = props.attendanceActivities[len - 1];
    if (value.attendance === -1) return -1;

    //present time
    const d = timeStamp.toLocaleDateString("en-IN");

    const { date } = value;

    if (date !== d) return -1;

    return value.attendance;
  };
  const val = attendanceValue();

  const wrapperRef = useRef(null);
  useOutsideClicker(wrapperRef, () => setShowDetBox(false));

  return (
    <div className={styles["container"]}>
      {showDetBox && (
        <div ref={wrapperRef}>
          <DetailedBox
            id={props.id}
            holiday={props.holiday}
            day={props.day}
            content={props.content}
            attendance={val}
            onClick={showDetailedBoxHandler}
          />
        </div>
      )}
      <div className={sts} onClick={() => showDetailedBoxHandler(true)}>
        {(props.rowNum === 0 || props.col === 0) && (
          <HeadingTile day={props.day} rowNum={props.rowNum} col={props.col} content={props.content} />
        )}
        {props.rowNum !== 0 && props.col !== 0 && <div className={styles["title"]}>{props.content.title}</div>}
      </div>
    </div>
  );
};

export default Tile;
