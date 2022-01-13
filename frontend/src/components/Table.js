import { useState,useEffect } from "react";
import { useSelector,useDispatch  } from "react-redux";
import { fetchContentData } from "../store/content-actions";

import Row from "./Row";

const style = {
  color: "#5d5c61",
  fontFamily: "'Oxygen', sans-serif",
  fontSize: "1.3rem",
  fontWeight: "bolder",
  width: "8.65rem",
  height: "4.5rem",
  borderRadius: "10px",
  fontColor: "#000000",
};
const colorChangeHandler = (row, col, len, marked) => {
  const prevStyle = { ...style };

  if (row > 0 && col !== 0) {
    prevStyle.color = "#7395ae";
    prevStyle.fontFamily = "'Dosis', sans-serif";
    prevStyle.fontFamily = "1.5rem";
    prevStyle.fontWeight = "350";
  }
  if (col === 0 && row !== 0) prevStyle.color = "#b1a296";
  if (row === 0 && col === 0) prevStyle.color = "#000000";
  if (col === len - 1) prevStyle.color = "#eee";
  // if (marked && Object.keys(marked).length !== 0 && col > 0 && row > 0) {
  //   if (marked.holiday) {
  //     prevStyle.color = "#d3d3d3";
  //     prevStyle.fontColor = "#696969";
  //   }
  //   if (marked.attendance === 1) prevStyle.color = "#379683";
  //   else if (marked.attendance === 0) prevStyle.color = "#ac554f";

  //   // else  prevStyle.color="#7395ae";
  // }
  return prevStyle;
};
// const content = {
//   None: ["X", 1, 9],
//   Monday: ["X", 1, 9],
//   Tuesday: ["X", 1, 9],
//   Wednesday: ["X", 1, 9],
//   Thursday: ["X", 1, 9],
//   Friday: ["X", 1, 9],
//   Saturday: ["X", 1, 9],
// };
// const content = {
//   None: ["X", 1, 2, 3, "Social Studies", 5, 6, 7, 8],
//   Monday: ["X", 1, 2, 3, "Social Studies", 5, 6, 7, 8],
//   Tuesday: ["X", 1, 2, 3, "Social Studies", 5, 6, 7, 8],
//   Wednesday: ["X", 1, 2, 3, "Social Studies Geography History", 5, 6, 7, 8],
//   Thursday: ["X", 1, 2, 3, "Social Studies", 5, 6, 7, 8],
//   Friday: ["X", 1, 2, 3, "Social Studies", 5, 6, 7, 8],
//   Saturday: ["X", 1, 2, 3, "Social Studies", 5, 6, 7, 8],
// };


const Table = (props) => {
  const dispatch = useDispatch();
  useEffect(()=>{
      dispatch(fetchContentData());
  },[dispatch]);


  const content = useSelector((state) => state.content);
  console.log(content);
  

  const [viewBox, setViewBox] = useState([false, false, false, false, false, false, false]);
  const viewHandler = (rowNum) => {
    setViewBox((viewBox) => {
      const newViewBox = viewBox.map((ele, i) => {
        if (ele) return false;
        if (i === rowNum) return true;
        return false;
      });
      return newViewBox;
    });
  };

  const closeWindowHandler = () => {
    setViewBox((viewBox) => {
      const newViewBox = viewBox.map((ele, i) => {
        return false;
      });
      return newViewBox;
    });
  };
  const days = Object.keys(content);

  return (
    <>
      {[...Array(7).keys()].map((val, index) => {
        return (
          <Row
            key={"row " + index}
            day={days[index]}
            row={content[days[index]]}
            rowNum={index}
            viewBox={viewBox}
            color={colorChangeHandler}
            onClick={() => viewHandler(index)}
            onCloseWindow={closeWindowHandler}
          />
        );
      })}
      {/* <Row color={"#379683"} />
      <Row color={"#557a95"} /> */}
    </>
  );
};

export default Table;
