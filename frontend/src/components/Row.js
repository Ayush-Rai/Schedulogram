import { useSelector } from "react-redux";

import styles from "./Row.module.css";
import Box from "../UI/header/Box";

import SpecialBox from "./addComponent/SpecialBox";
import AddButton from "./addComponent/AddButton";
import Tile from "./Tile";

const Row = (props) => {
  const len = props.row ? props.row.length + 1 : 1;

  const boxColor = (row, col, len, marked) => {
    return props.color(row, col, len, marked);
  };

  const rowDetails = useSelector((state) => state.content[props.day]);

  return (
    <div className={styles.row}>
      {[...Array(len).keys()].map((item, j) => {
        const style = boxColor(props.rowNum, j, len, rowDetails[j]);
        return (
          <div style={{ position: "relative" }} key={props.rowNum + " div " + j}>
            {j === len - 1 && <AddButton key={props.rowNum + " add " + j} id={props.rowNum + " item " + j} style={style} onClick={props.onClick} />}
            {j === len - 1 && props.viewBox[props.rowNum] && (
              <SpecialBox
                
                key={props.rowNum + " spBox " + j}
                id={props.rowNum + " item " + j}
                onCloseWindow={props.onCloseWindow}
                rowNum={props.rowNum}
                day={props.day}
                style={style}
              />
            )}
            {j !== len - 1 && (
              <Box style={style} key={props.rowNum + " box " + j}>
                <Tile
                  key={props.rowNum + " item " + j}
                  id={props.rowNum + " item " + j}
                  day={props.day}
                  col={j}
                  content={j !== 0 ? props.row[j] : props.day.charAt(0).toUpperCase() + props.day.slice(1)}
                  attendance={props.row[j].attendance}
                  holiday={props.row[j].holiday}
                  rowNum={props.rowNum}
                />
              </Box>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Row;
