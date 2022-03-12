import { useState } from "react";

function useToast() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  function showToast() {
    setOpen(true);
  }

  function hideToast() {
    setOpen(false);
  }

  return {
    open,
    error,
    setError,
    showToast,
    hideToast,
  };
}

export default useToast;
