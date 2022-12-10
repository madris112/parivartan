import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { courseData } from "./course";
import ListGroup from "react-bootstrap/ListGroup";
import { TiTickOutline } from "react-icons/ti";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import InputGroup from "react-bootstrap/InputGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { BsDot } from "react-icons/bs";
import "./App.css";
import "./App.scss";

function App() {
  const [idx, setidx] = useState(0);
  const [once, setonce] = useState(0);
  const [maxidx, setmaxidx] = useState(0);
  const [cdata, setcdata] = useState(null);

  useEffect(() => {
    if (once) return;
    let courseDt = courseData;
    console.log(courseDt);
    console.log(localStorage.getItem("index"));
    if (localStorage.getItem("index") && localStorage.getItem("dataval")) {
      let cr = localStorage.getItem("index");
      let data = JSON.parse(localStorage.getItem("dataval"));
      setcdata(data);
      setidx(cr);
      setmaxidx(0);
    } else {
      localStorage.setItem("index", 0);
      localStorage.setItem("dataval", JSON.stringify(courseDt));
      setcdata(courseDt);
      // setmaxidx(0);
    }
    setonce(1);
  });

  useEffect(() => {
    if (once === 0) return;
    console.log(idx);
    console.log(localStorage.getItem("dataval"));
    // console.log(courseData[idx].url);
  }, [idx]);

  const notwatched = (data, key) => {
    return (
      <ListGroup.Item
        className="lstcls"
        onClick={(event) => {
          handleClick(key);
        }}
        key={key}
      >
        {" "}
        <ToggleButton
          type="checkbox"
          className="chclass"
          variant="outline-success"
          checked={cdata[key].visited}
          value="1"
          onClick={(e) => setChecked(e, key)}
          style={{ float: "left" }}
        >
          MARK AS WATCHED
        </ToggleButton>
        {data.title}{" "}
        <BsDot style={{ float: "right", color: "red", size: "20px" }} />
      </ListGroup.Item>
    );
  };

  const watched = (data, key) => {
    return (
      <ListGroup.Item
        className="lstcls"
        onClick={(event) => {
          handleClick(key);
        }}
        key={key}
      >
        {" "}
        <ToggleButton
          type="checkbox"
          className="chclass"
          variant="outline-success"
          checked={cdata[key].visited}
          value="1"
          onClick={(e) => setChecked(e, key)}
          style={{ float: "left" }}
        >
          WATCHED
        </ToggleButton>
        {data.title}{" "}
        <BsDot style={{ float: "right", color: "red", size: "20px" }} />
      </ListGroup.Item>
    );
  };

  const notwatchedd = (data, key) => {
    return (
      <ListGroup.Item
        className="lstcls"
        onClick={(event) => {
          handleClick(key);
        }}
        key={key}
      >
        {" "}
        <ToggleButton
          type="checkbox"
          className="chclass"
          variant="outline-success"
          checked={cdata[key].visited}
          value="1"
          onClick={(e) => setChecked(e, key)}
          style={{ float: "left" }}
        >
          MARK AS WATCHED
        </ToggleButton>
        {data.title}{" "}
      </ListGroup.Item>
    );
  };

  const watchedd = (data, key) => {
    return (
      <ListGroup.Item
        className="lstcls"
        onClick={(event) => {
          handleClick(key);
        }}
        key={key}
      >
        {" "}
        <ToggleButton
          type="checkbox"
          className="chclass"
          variant="outline-success"
          checked={cdata[key].visited}
          value="1"
          onClick={(e) => setChecked(e, key)}
          style={{ float: "left" }}
        >
          WATCHED
        </ToggleButton>
        {data.title}
      </ListGroup.Item>
    );
  };

  useEffect(() => {
    if (once === 0) return;
    console.log(idx);
    console.log(localStorage.getItem("dataval"));
    // console.log(courseData[idx].url);
  }, [maxidx]);

  const handleClick = (key) => {
    // console.log(key);

    let cr = localStorage.getItem("index");
    if (key > cr) {
      localStorage.setItem("index", key);
      // setmaxidx(key);
    }
    setidx(key);
  };

  const setChecked = (e, key) => {
    e.stopPropagation();
    if (key !== idx) return;
    console.log("clicked toggle");
    let data = cdata;
    data[key].visited = !data[key].visited;
    setcdata(data);
    setmaxidx(!maxidx);
    console.log(data);
    localStorage.setItem("dataval", JSON.stringify(data));
  };

  const listdata = () => {
    return (
      <div style={{ overflowY: "auto", margin: "20px", height: "90vh" }}>
        <ListGroup>
          {courseData.map((data, key) => {
            console.log(key);
            if (cdata) {
              if (key === idx) {
                if (cdata[key].visited) {
                  return watched(data, key);
                } else {
                  return notwatched(data, key);
                }
              } else {
                if (cdata[key].visited) {
                  return watchedd(data, key);
                } else {
                  return notwatchedd(data, key);
                }
              }
            }
          })}
        </ListGroup>
      </div>
    );
  };

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">PARIVARTAN</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="https://www.parivartancomputing.in/home">
              Home
            </Nav.Link>
            <Nav.Link href="https://www.parivartancomputing.in/about-us">
              About Us
            </Nav.Link>
            <Nav.Link href="https://www.parivartancomputing.in/courses">
              Courses
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container fluid style={{ height: "100%" }}>
        <Row style={{ height: "100%" }}>
          <Col lg={8} xs={12}>
            <iframe
              style={{ marginTop: "10%" }}
              width="80%"
              height="60%"
              src={courseData[idx].url}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Col>
          <Col>{listdata()}</Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
