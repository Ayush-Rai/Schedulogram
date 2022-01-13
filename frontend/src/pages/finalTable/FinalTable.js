import { useState,useEffect} from "react";
import { useSelector,useDispatch  } from "react-redux";
import { fetchContentData } from "../../store/content-actions";

import Row from "./FinalRow";

const style = {
  color: "#5d5c61",
  fontFamily: "'Oxygen', sans-serif",
  fontSize: "1.3rem",
  fontWeight: "bolder",
  width: "8.65rem",
  height: "4.5rem",
  borderRadius: "10px",
  fontColor: "#000000",
  padding:"0"
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
  if (marked && Object.keys(marked).length !== 0 && col > 0 && row > 0) {
    if (marked.holiday) {
      prevStyle.color = "#d3d3d3";
      prevStyle.fontColor = "#696969";
    }
    const len=marked.attendanceActivities.length;
    let date=new Date().toLocaleDateString("en-IN");
    let markedDate=marked.attendanceActivities[len-1].date;
    const value=(date===markedDate);


    if ( value && !marked.holiday && marked.attendanceActivities[len-1].attendance === 1) prevStyle.color = "#379683";
    else if (value && !marked.holiday  && marked.attendanceActivities[len-1].attendance === 0) prevStyle.color = "#ac554f";
    else if(value && marked.attendanceActivities[len-1].attendance === 2){
      prevStyle.color = "#d3d3d3";
      prevStyle.fontColor = "#696969";
    }

    // else  prevStyle.color="#7395ae";
  }
  return prevStyle;
};
const Table = (props) => {
  const dispatch = useDispatch();

  useEffect(()=>{
      dispatch(fetchContentData());

    
      
  },[dispatch]);

  const content = useSelector((state) => state.content);


  

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
