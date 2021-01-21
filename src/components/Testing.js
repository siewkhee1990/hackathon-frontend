import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL_TESTS } from "./Constant";

export default function Testing() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get(BACKEND_URL_TESTS).then((response) => setMessage(response.data));
  }, []);
  return <div>{message}</div>;
}
