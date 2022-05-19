import { useState } from "react";

function useToast() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [messageType, setMessageType] = useState();

  function showToast(type = "error") {
    setOpen(true);
    setMessageType(type);
  }

  function hideToast() {
    setOpen(false);
  }

  return {
    open,
    error,
    messageType,
    setError,
    showToast,
    hideToast,
  };
}

export default useToast;
