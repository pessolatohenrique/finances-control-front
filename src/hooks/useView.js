import { useState } from "react";

function useView(initial = "table") {
  const [format, setFormat] = useState(initial);

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
