import {
  Modal,
  Box,
  Typography,
  Button,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import useToast from "../hooks/useToast";
import { SNACKBAR_DIRECTION } from "../constants/default_settings";
import { DELETED_MESSAGE_SUCCESS } from "../constants/messages";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function ModalWrapper({
  title,
  subtitle,
  isOpen,
  hasConfirmButton,
  handleClose,
  endpoint,
  callbackMethod,
}) {
  const {
    open,
    error,
    messageType,
    setError,
    showToast,
    hideToast,
  } = useToast();

  async function executeEndpoint() {
    if (!endpoint) return;

    try {
      const { method, name } = endpoint;
      await axios[method](name);
      handleClose();
      await callbackMethod();
      showToast("success");
      setError(DELETED_MESSAGE_SUCCESS);
    } catch (error) {
      showToast();
      setError(error?.response?.data);
    }
  }

  return (
    <>
      <Snackbar
        anchorOrigin={SNACKBAR_DIRECTION}
        open={open}
        autoHideDuration={6000}
        onClose={hideToast}
      >
        <Alert
          onClose={hideToast}
          severity={messageType}
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {subtitle}
          </Typography>
          {hasConfirmButton && (
            <Grid
              container
              justifyContent="flex-end"
              gap="10px"
              marginTop="10px"
            >
              <Button variant="contained" onClick={handleClose}>
                Cancelar
              </Button>

              <Button
                variant="contained"
                color="error"
                onClick={() => executeEndpoint()}
              >
                Deletar
              </Button>
            </Grid>
          )}
        </Box>
      </Modal>
    </>
  );
}

export default ModalWrapper;
