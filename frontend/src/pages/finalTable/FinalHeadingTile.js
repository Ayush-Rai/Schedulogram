import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
// import { useDispatch } from "react-redux";

import { Button} from "@mui/material";
// import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import styles from "./FinalHeadingTile.module.css";
// import { contentActions } from "../../store/content";
// import { saveContentData } from "../../store/content-actions";

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
  const history = useHistory();
  // const content = useSelector((state) => state.content);
  // const dispatch = useDispatch();

  // const finishEditingHandler = (content) => {
  //   dispatch(saveContentData(content));
  // };

  const showBoxHandler=()=>{
    setShowBox((prevState) => !prevState);
  }
  const editChangesHandler = () => {
    history.push("/create");
  };
  // const setHolidayHandler = () => {
  //   dispatch(
  //     contentActions.setDayAsHoliday({
  //       day: props.day,
  //     })
  //   );
  // };

  const wrapperRef = useRef(null);
  useOutsideClicker(wrapperRef, showBoxHandler);

  const corner = props.rowNum === 0 && props.col === 0;
  return (
    <>
      {corner && (
        <Button
          size="large"
          sx={{ fontWeight: "bolder", color: "white", fontSize: "1.6rem" }}
          onClick={editChangesHandler}
        >
          EDIT
        </Button>
      )}
      {!corner && (
        <div className={styles["title"]}>
          {/* {props.col === 0 && (
            <div className={styles["more"]}>
              <IconButton
                sx={{ color: "black" }}
                size="small"
                onClick={showBoxHandler}
              >
                <MoreHorizRoundedIcon />
              </IconButton>
            </div>
          )} */}

          {showBox && (
            <div
              ref={wrapperRef}
              className={styles["more-menu"]}
              // onClick={setHolidayHandler}
            >
              {"Holiday"}
            </div>
          )}
          <>{props.col === 0 ? props.content : props.content.title}</>
        </div>
      )}
    </>
  );
};

export default HeadingTile;
