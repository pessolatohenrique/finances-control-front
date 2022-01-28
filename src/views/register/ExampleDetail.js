import React from "react";
import { useParams } from "react-router-dom";

function ExampleDetail() {
  const { id } = useParams();
  return <h1>Detail with ID: {id}</h1>;
}

export default ExampleDetail;
