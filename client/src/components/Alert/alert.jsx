import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Alertmsg({ open, msg, status, setOpen }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <>
      <div>
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
          <Alert severity={status} sx={{ width: "100%" }} onClose={handleClose}>
            {msg}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}
