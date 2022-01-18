import React from "react";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
function App() {
  const [list, setList] = useState([]);
  const [email, setEmail] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [number, setNumber] = useState();
  const [userId, setUserId] = useState();
  // const [avatar, setAvatar] = useState();

  let sendData = {
    email,
    first_name,
    last_name,
    number,
    avatar: `https://reqres.in/img/faces/${number}-image.jpg`,
  };

  // console.log(avatar);
  useEffect(() => {
    getData();
  });

  function postData() {
    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        //prettier-ignore
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendData),
    });
    setEmail("");
    setFirst_name("");
    setLast_name("");
    setNumber("");
    getData();
  }

  function deletData(ele, ind) {
    /* fetch(`http://localhost:3000/posts/${ele.id}`, { method: "DELETE" }).then(
      (resp) => {}
      ); */
    axios.delete(`http://localhost:3000/posts/${ele.id}`).then((resp) => {});
    getData();
  }

  function getData() {
    /* fetch("http://localhost:3000/posts").then((response) => {
      response.json().then((result) => {
        setList(result.data);
      });
    }); */
    axios("http://localhost:3000/posts").then((result) => {
      setList(result.data);
      console.log(list);
    });
  }
  function selectData(ele, ind) {
    setUserId(ele.id);
    setEmail(ele.email);
    setFirst_name(ele.first_name);
    setLast_name(ele.last_name);
    setNumber(ele.number);
    getData();
    console.log(list);
  }

  function updateData() {
    fetch(`http://localhost:3000/posts/${userId}`, {
      method: "PUT",
      headers: {
        //prettier-ignore
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendData),
    });
    // console.log(avatar);

    getData();
  }

  return (
    <>
      <div className="App">
        <div>
          <table border="1">
            <tr>
              <td>No</td>
              <td>Id</td>
              <td>Email</td>
              <td>First_name</td>
              <td>Last_name</td>
              <td>Images</td>
              <td>Deletes</td>
              <td>Select</td>
            </tr>
            {list.map((ele, ind) => (
              <tr>
                <td>{ind + 1}</td>
                <td>{ele.id}</td>
                <td>{ele.email}</td>
                <td>{ele.first_name}</td>
                <td>{ele.last_name}</td>
                <td>
                  <img
                    src={ele.avatar}
                    alt="Images"
                    style={{ width: "100px", height: "100px" }}
                  />
                </td>
                <td>
                  <button
                    onClick={() => {
                      deletData(ele, ind);
                    }}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      selectData(ele, ind);
                    }}
                  >
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </div>
        <div>
          <input
            type="text"
            value={email}
            placeholder="enter email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />
          <br />
          <input
            type="text"
            value={first_name}
            placeholder="enter first name"
            onChange={(e) => {
              setFirst_name(e.target.value);
            }}
          />
          <br />
          <br />
          <input
            type="text"
            value={last_name}
            placeholder="enter last name"
            onChange={(e) => {
              setLast_name(e.target.value);
            }}
          />
          <br />
          <br />
          <input
            type="text"
            value={number}
            placeholder="enter image number"
            onChange={(e) => {
              setNumber(e.target.value);
            }}
          />
          <br />
          <br />
          <button
            onClick={() => {
              postData();
            }}
          >
            Create
          </button>
          <button onClick={updateData}>Update</button>
        </div>
      </div>
    </>
  );
}

export default App;
