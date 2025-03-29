/* eslint-disable react/prop-types */
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
const CustomButton = ({
  loading,
  startIcon,
  backgroundColor = "#50b5b7",
  variant,
  textColor = "white",
  loadingText = "Submitting...",
  disabled,
  children,
  ...rest
}) => {
  return (
    <Button
      startIcon={loading ? <CircularProgress size={16} /> : startIcon}
      disabled={loading || disabled}
      variant={variant}
      sx={{
        backgroundColor,
        color: textColor,
        textTransform: "none",
        "&:hover": {
          backgroundColor,
        },
      }}
      {...rest}
    >
      {loading ? loadingText : children}
    </Button>
  );
};

export default CustomButton;
