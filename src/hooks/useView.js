import { useState } from "react";

function useView() {
  const [format, setFormat] = useState("table");

  function switchFormat(format) {
    setFormat(format);
  }

  function isTable() {
    return format === "table";
  }

  function isList() {
    return format === "list";
  }

  return [isTable, isList, switchFormat];
}

export default useView;
