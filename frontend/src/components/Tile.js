import { useEffect,useRef } from "react";
import { useSelector } from "react-redux";
import { NONE_ITEM } from "../store/content";

import styles from "./Tile.module.css";

import DetailedBox from "./descriptionBox/DetailedBox";
import HeadingTile from "./HeadingTile";
import { useState } from "react";


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

  const wrapperRef = useRef(null);
  useOutsideClicker(wrapperRef, ()=>setShowDetBox(false));

  return (
    <div className={styles["container"]}>
      {showDetBox && (
        <div ref={wrapperRef}>
          <DetailedBox
            id={props.id}
            holiday={props.holiday}
            day={props.day}
            content={props.content}
            attendance={props.attendance}
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
