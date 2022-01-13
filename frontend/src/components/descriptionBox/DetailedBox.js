import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { Button, IconButton } from "@mui/material";
import Box from "../../UI/header/Box";
import styles from "./DetailedBox.module.css";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

import DescriptionForm from "./DescriptionForm";
import { contentActions } from "../../store/content";

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
  const [showAddDescription, setShowAddDescription] = useState(false);
  const [showEditTitle, setShowEditTitle] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const descriptionFormHandler = (event) => {
    event.preventDefault();
    setShowDescription(true);

    dispatch(
      contentActions.update({
        day: props.day,
        id: props.id,
        title: null,
        description: description,
      })
    );
    props.onClick(true);
  };

  const titleFormHandler = (event) => {
    event.preventDefault();
    setShowEditTitle(false);

    dispatch(
      contentActions.update({
        day: props.day,
        id: props.id,
        title: title,
        description: null,
      })
    );
    props.onClick(true);
  };

  const closeHandler = () => {
    setShowAddDescription(false);
    // setShowEditTitle(showEditTitle);
  };

  const closeHandler1 = () => {
    setShowEditTitle(false);
    // setShowAddDescription(showAddDescription);
  };

  const buttonContent = {
    color: description.length === 0 ? "error" : "success",
    value: description.length === 0 ? <CloseRoundedIcon /> : <DoneRoundedIcon />,
    type: description.length === 0 ? "button" : "submit",
    onClick: description.length === 0 ? closeHandler : null,
  };

  const titleButtonContent = {
    color: title.length === 0 ? "error" : "success",
    value: title.length === 0 ? <CloseRoundedIcon /> : <DoneRoundedIcon />,
    type: title.length === 0 ? "button" : "submit",
    onClick: title.length === 0 ? closeHandler1 : null,
  };
  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const descriptionRef = useRef();
  const titleRef = useRef();
  useEffect(() => {
    props.content.title !== "" && setTitle(props.content.title);
    props.content.description !== "" && setDescription(props.content.description);
    props.content.description !== "" && setShowDescription(true);
  }, [props.content.description, props.content.title]);

  useEffect(() => {
    showAddDescription && !showDescription && descriptionRef.current.focus();
  }, [description, showAddDescription, showDescription]);

  useEffect(() => {
    showEditTitle && titleRef.current.focus();
  }, [showEditTitle, title]);

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
        {!showEditTitle && (
          <div className={styles["description-template"]}>
            <Tooltip
              title={props.content.title}
              position="bottom"
              interactive="true"
              followCursor="true"
              size="small"
              trigger="mouseenter"
            >
              <div className={styles["title"]}>{title}</div>
            </Tooltip>
            <div className={styles["pencil"]}>
              <IconButton
                sx={{ fontWeight: "bolder" }}
                size="small"
                color="info"
                onClick={() => {
                  setShowEditTitle(true);
                }}
              >
                <ModeEditRoundedIcon />
              </IconButton>
            </div>
          </div>
        )}
        {showEditTitle && (
          <DescriptionForm
            label="Title"
            onSubmit={titleFormHandler}
            ref={titleRef}
            onChange={titleChangeHandler}
            value={title}
            buttonContent={titleButtonContent}
          />
        )}
        {showDescription && (
          <div className={styles["description-template"]}>
            <div className={styles["description"]}>{description}</div>
            <div className={styles["pencil"]}>
              <IconButton
                sx={{ fontWeight: "bolder" }}
                size="small"
                color="info"
                onClick={() => {
                  setShowAddDescription(true);
                  setShowDescription(false);
                }}
              >
                <ModeEditRoundedIcon />
              </IconButton>
            </div>
          </div>
        )}
        {showAddDescription && !showDescription && (
          <DescriptionForm
            label="Description"
            onSubmit={descriptionFormHandler}
            ref={descriptionRef}
            onChange={descriptionChangeHandler}
            value={description}
            buttonContent={buttonContent}
          />
        )}
        {!showAddDescription && props.content.description === "" && (
          <Button
            sx={{ width: "100%" }}
            variant="outlined"
            startIcon={<CreateRoundedIcon />}
            onClick={() => {
              setShowAddDescription(true);
            }}
          >
            Add Description
          </Button>
        )}
      </div>
    </Box>
  );
};

export default DetailedBox;
