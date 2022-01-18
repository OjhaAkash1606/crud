import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";

export function ApiGet() {
  const [name, setName] = useState({});
  useEffect(() => {
    axios("http://localhost:3000/posts").then((result) => {
      result.data.map((e, i) => {
        setName(e.first_name);
      });
    });
  });

  return (
    <>
      <div>  {name}</div>
    </>
  );
}
