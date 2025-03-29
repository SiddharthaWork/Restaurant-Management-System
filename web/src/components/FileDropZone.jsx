/* eslint-disable react/prop-types */
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography, Button, Stack } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const FileUploadDropzone = ({
  onDrop,
  accept = { "image/*": [] },
  maxSize = 500 * 1024 * 1024,
  buttonText = "Browse File",
  instructionText = "Choose a file or drag & drop it here",
  helperText = "JPEG, PNG, Up to 500 MB",
  icon = <CloudUploadIcon fontSize="large" color="primary" />,
  style = {},
  name,
  setFieldValue,
}) => {
  const handleDrop = useCallback(
    (acceptedFiles) => {
      setFieldValue(name, acceptedFiles[0]);
      if (onDrop) onDrop(acceptedFiles);
    },
    [onDrop, setFieldValue, name]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept,
    maxSize,
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: "2px dashed #b0bec5",
        borderRadius: "8px",
        p: 4,
        textAlign: "center",
        cursor: "pointer",
        backgroundColor: isDragActive ? "#e3f2fd" : "#fafafa",
        transition: "background-color 0.3s",
        ...style,
      }}
    >
      <input {...getInputProps()} />
      <Stack spacing={1} alignItems="center">
        {icon}
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          {instructionText}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {helperText}
        </Typography>
        <Button variant="contained" color="primary" size="small">
          {buttonText}
        </Button>
      </Stack>
    </Box>
  );
};

export default FileUploadDropzone;
