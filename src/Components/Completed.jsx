import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import png from "../Images/todo.png";
import plus from "../Images/Vector.png";

const Completed = () => {
  const [turnOn, setTurnOn] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState([]);
  const [display, setDisplay] = useState([]);
  var descriptionRef = useRef("");
  var titleRef = useRef("");

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("Item")));
  }, []);

  useEffect(() => {
    localStorage.setItem("Item", JSON.stringify(data));
  });

  function check(location) {}

  function saveData() {
    setTurnOn(!turnOn);
    let temp = {
      title: title,
      description: description,
      pending: 1,
      inprogress: 0,
      completed: 0,
    };
    setDisplay([...display, false]);
    setData([...data, temp]);
  }

  function showOption(index) {
    let check = [...display];
    check[index] = !check[index];
    setDisplay(check);
  }

  function changeStatus(index) {
    let check = [...data]
    check[index].inprogress=0;
    check[index].completed=1;
    setData(check);
  }
  
  function modelOnOff() {
    setTurnOn(!turnOn);
  }

  return (
    <>
      <div className="flex">
        <div className="flex">
          <div>
            <img src={png} alt="" />
          </div>
          <div className="tooApp"> To Do App</div>
        </div>
        <div className="flex1">
          <div style={{ fontFamily: "Josefin Sans", paddingTop: "5px" }}>
            Filter Bond:{" "}
          </div>
          <div className="flex2">
            <Link to="/" style={{ textDecoration: "none" }}>
              <div className="btn1"> All</div>
            </Link>
            <Link to="/pending" style={{ textDecoration: "none" }}>
              <div className="btn1">Pending</div>
            </Link>
            <Link to="/inProgress" style={{ textDecoration: "none" }}>
              <div className="btn1">InProgress</div>
            </Link>
            <Link to="/completed" style={{ textDecoration: "none" }}>
              <div className="btn1">Completed</div>
            </Link>
            <div
              className="active"
              onClick={() => modelOnOff()}
              style={{
                alignItems: "center",
                marginLeft: "40px",
                padding: "0px 9px",
              }}
            >
              Create New Todo{" "}
              <span style={{ marginTop: "100px" }}>
                <img src={plus} alt="" width={"15px"} height={"15px"} />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="model" style={{ display: turnOn ? "block" : "none" }}>
        <label>Title</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          ref={titleRef}
          onChange={(e) => {
            setTitle(e.target.value);
            console.log(e.target.value);
          }}
        />
        <br />
        <label>Description</label>
        <br />
        <input
          type="text"
          id="description"
          name="description"
          ref={descriptionRef}
          onChange={(e) => {
            setDescription(e.target.value);
            console.log(e.target.value);
          }}
        />
        <input type="submit" onClick={() => saveData()} value="Add"></input>
      </div>{" "}
      <br />
      <span className="title">Completed</span>
      <div>
        {data.map((e, index) => {
          if (e.completed===1){
          return (
            <div className="smallModel" key={index}>
              <span className="dots" onClick={() => showOption(index)}>
                ...
                <div
                  onClick={() => changeStatus(index)}
                  className="options"
                  style={{ display: display[index] ? "block" : "none" }}
                >
                  Delete
                </div>
              </span>
              <div>{e.description}</div>
            </div>
          );}
        })}
      </div>
    </>
  );
};

export default Completed;