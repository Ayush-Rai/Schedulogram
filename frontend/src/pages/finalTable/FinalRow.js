// import { useSelector } from "react-redux";

import styles from './FinalRow.module.css';
import Box from "../../UI/header/Box";

import Tile from "./FinalTile";

const Row = (props) => {
  const len = props.row ? props.row.length + 1 : 1;

  const boxColor = (row, col, len, marked) => {
    return props.color(row, col, len, marked);
  };
  // const rowDetails = useSelector((state) => state.content[props.day]);
  // console.log("row ->",rowDetails);
  return (
    <div className={styles.row}>
      {[...Array(len).keys()].map((item, j) => {
        const style = boxColor(props.rowNum, j, len, props.row[j]);
        



        return (
          <div style={{ position: "relative" }} key={props.rowNum + " div " + j}>
            {j !== len - 1 && (
              <Box style={style} key={props.rowNum + " box " + j}>
                <Tile
                  id={props.rowNum + " item " + j}
                  key={props.rowNum + " tile " + j}
                  day={props.day}
                  col={j}
                  content={j !== 0 ? props.row[j] : props.day.charAt(0).toUpperCase() + props.day.slice(1)}
                  attendanceActivities={props.row[j].attendanceActivities}
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
