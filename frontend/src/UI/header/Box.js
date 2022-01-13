import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { Paper } from "@mui/material";



const Box = (props) => {
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: "center",
    padding: props.style.padding,
    width: props.style.width,
    margin: "0.5rem",
    height: props.style.height,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flexShrink:1,
    borderRadius: props.style.borderRadius,
    backgroundColor:props.style.color,
    color: props.style.fontColor,
    fontSize:props.style.fontSize,
    fontFamily:props.style.fontFamily,
    fontWeight:props.style.fontWeight,
    position:props.style.position,
    zIndex:props.style.zIndex,
    top:props.style.top,
    right:props.style.right,
    left:props.style.left,
    cursor:props.style.cursor,
  }));

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Item elevation={5} onClick={props.onClick}>
        {props.children}
      </Item>
    </ThemeProvider>
  );
};

export default Box;
