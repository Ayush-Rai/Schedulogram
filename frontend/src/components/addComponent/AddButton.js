import Box from "../../UI/header/Box";

const AddButton = (props) => {
  const newStyle = {
    ...props.style,
    borderRadius: "50%",
    height: "4.5rem",
    width: "4.5rem",
    cursor: "pointer",
  };
  return (
    <Box style={newStyle} onClick={props.onClick}>
      ➕
    </Box>
  );
};

export default AddButton;
