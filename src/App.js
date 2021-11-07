import React, { useState, useEffect } from "react";
import { Cards } from "./component/Movie_Cards/card";
import styled from "styled-components";
import { Link, Switch, Router, Route } from "react-router-dom";
import history from "./component/history";
import { Carousel } from "react-responsive-carousel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFileUpload } from "use-file-upload";
// import { Button } from 'bootstrap';
import { Box } from "./component/box";
import ReactTooltip from "react-tooltip";
import "./App.css";
import { Home, Search } from "@mui/icons-material";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const defaultSrc =
    "https://www.pngkit.com/png/full/301-3012694_account-user-profile-avatar-comments-fa-user-circle.png";

  const [files, selectFiles] = useState(null);
  const [preview,setPreview] = useState(null);
  const array = ["Text1234", "Text1234", "Text1234", "Text1234"];
  const Div = styled.div`
    text-align: center;
    height: 100vh;
  `;
  const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 33.333%);
    height: 100vh;
  `;
  const Card = styled.div`
    cursor: pointer;
    margin: 3%;
    border: 1px solid lightgray;
  `;

  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");
  const [hidden, setHidden] = useState("");
  const [login, setLogin] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [username_r, setUsername_r] = useState("");
  const [password_r, setPassword_r] = useState("");
  const [firstname_r, setFirstname_r] = useState("");
  const [lastname_r, setLastname_r] = useState("");
  const [address_r, setAddress_r] = useState("");
  const [city_r, alert_r] = useState("");
  const [country_r, alert_rr] = useState("");
  const [zip_r, setZip_r] = useState("");
  const [tel_r, setTel_r] = useState("");
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=055cd0991b82b393b24df8c5c51e21f2&language=en-US&sort_by=popularity.desc&page=${page}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovie(data.results);
      });
  }, [page]);
  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setInput(e.target.value);
    setPassword(e.target.value);
  };
  const FilterText = (res) => {
    if (input != "") {
      return res.title.includes(input);
    } else return true;
  };
  const notify = () => {
    toast.dark(input, { autoClose: 10000, position: "bottom-right" });
  };

  const Register = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("username", username_r);
    formData.append("password", password_r);
    formData.append("firstname", firstname_r);
    formData.append("lastname", lastname_r);
    formData.append("address", address_r);
    formData.append("city", city_r);
    formData.append("country", country_r);
    formData.append("zip", zip_r);
    formData.append("tel", tel_r);
    formData.append("avatar", files);
    axios({
      url: `http://localhost:4000/register`,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    }).then((res) => {
      if (res.data.status == 200) {
        alert("Register Success");
        setUsername_r("");
        setPassword_r("");
        setFirstname_r("");
        setLastname_r("");
        setAddress_r("");
        alert_r("");
        alert_rr("");
        setZip_r("");
        setTel_r("");
        setPreview(null)
        selectFiles(null)
        history.push("/login");
      }
    });
  };

  const LoginMethod = (e) => {
    e.preventDefault();
    if (username != "" || password != "") {
      axios
        .post(`http://localhost:4000/login`, {
          username: username,
          password: password,
        })
        .then((res) => {
          if (res.data.status == 200) {
            alert("Login Success");
            setUsername("");
            setPassword("");
 
            history.push("/logout");
            setLogin(true);
          } else {
            alert(res.data.result)
          }
        });
    }
  };

  return (
    <Router history={history}>
      <ToastContainer />
      <div style={{ textAlign: "center" }}>
        <input onChange={handleChange} />
        <i class="fas fa-search"></i>
        <div class="dropdown">
          <button
            class="btn bg-warning dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Dropdown button
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <Link to="/">
              <a class="dropdown-item">Home</a>
            </Link>
            <Link to="/about">
              <a class="dropdown-item">About</a>
            </Link>
            <Link to="/post">
              <a class="dropdown-item">Post</a>
            </Link>
          </ul>
        </div>
        <Switch>
        <Route path="/logout">
        <Link to="/login">
        <button type="submit" class="btn btn-primary">
                  Sign out
                </button>
          </Link>
          </Route>
          {" "}
          {!login && (
            <Route path="/register">
              <div id="app">
                <img src={preview || defaultSrc} alt="preview" />

                <label className='btn btn-primary'>
                  Upload
                  <input
                  size="60"
                    hidden
                    type="file"
                    onChange={(e) => {selectFiles(e.target.files[0]);setPreview(URL.createObjectURL(e.target.files[0]))}}
                  />
                </label>
              </div>
              <form onSubmit={Register}>
                <div class="input-group">
                  <div class="form-group col-md-6">
                    <label for="inputUsername">Username</label>
                    <input
                      type="username"
                      class="form-control"
                      id="inputUsername"
                      placeholder="Username"
                      onChange={(e) => setUsername_r(e.target.value)}
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputPassword">Password</label>
                    <input
                      type="password"
                      class="form-control"
                      id="inputPassword"
                      placeholder="Password"
                      onChange={(e) => setPassword_r(e.target.value)}
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputFirstname">First name</label>
                    <input
                      type="firstname"
                      class="form-control"
                      id="inputFirstname"
                      placeholder="Firstname"
                      onChange={(e) => setFirstname_r(e.target.value)}
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputLastname">Last name</label>
                    <input
                      type="lastname"
                      class="form-control"
                      id="inputLastname"
                      placeholder="Lastname"
                      onChange={(e) => setLastname_r(e.target.value)}
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputAddress">Address</label>
                  <input
                    type="address"
                    class="form-control"
                    id="inputAddress"
                    placeholder="Address"
                    onChange={(e) => setAddress_r(e.target.value)}
                  />
                </div>
                <div class="input-group">
                  <div class="form-group col-md-4">
                    <label for="inputCity">City</label>
                    <select id="inputCity" class="form-control" onChange={(e)=>alert_r(e.target.value)}>
                      <option selected>Choose...</option>
                      <option>Bangkok</option>
                      <option>Sisaket</option>
                      <option>Chiangmai</option>
                      <option>Krabi</option>
                      <option>Pattaya</option>
                    </select>
                  </div>
                  <div class="form-group col-md-4">
                    <label for="inputState">Country</label>
                    <select id="inputState" class="form-control" onChange={(e)=>alert_rr(e.target.value)}>
                      <option selected>Choose...</option>
                      <option>Thailand</option>
                      <option>Japan</option>
                      <option>China</option>
                      <option>Korea</option>
                      <option>Laos</option>
                    </select>
                  </div>
                  <div class="form-group col-md-4">
                    <label for="inputZip">Zip code</label>
                    <input type="zip" class="form-control" id="inputZip" placeholder="Zip code"
                    onChange={(e) => setZip_r(e.target.value)}/>
                  </div>
                </div>
                <div class="form-group col-md-4">
                    <label for="inputCall">Tel.</label>
                    <input
                      type="tel"
                      class="form-control"
                      id="inputTel"
                      placeholder="Tel."
                      onChange={(e) => setTel_r(e.target.value)}
                    />
                    </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="gridCheck"
                    />
                    <label class="form-check-label" for="gridCheck">
                      Check me out
                    </label>
                  </div>
                </div>
                <button type="submit" class="btn btn-primary">
                  Sign in
                </button>
              </form>
            </Route>
          )}
          <Route path="/post">
            <a data-tip data-for="happyFace">
              {" "}
              <span class="badge rounded-pill bg-primary">Primary</span>{" "}
            </a>
            <ReactTooltip id="happyFace" type="error">
              <span>Show happy face</span>
            </ReactTooltip>
            <a data-tip data-for="sadFace">
              {" "}
              <span class="badge rounded-pill bg-secondary">Secondary</span>
            </a>
            <ReactTooltip id="sadFace" type="warning" effect="solid">
              <span>Show sad face</span>
            </ReactTooltip>
            <a data-tip data-for="babyFace">
              {" "}
              <span class="badge rounded-pill bg-success">Success</span>
            </a>
            <ReactTooltip id="babyFace" type="info" effect="solid">
              <span>Show baby face</span>
            </ReactTooltip>
            <a data-tip data-for="noFace">
              {" "}
              <span class="badge rounded-pill bg-danger">Danger</span>
            </a>
            <ReactTooltip id="noFace" type="success" effect="solid">
              <span>Show no face</span>
            </ReactTooltip>
            <a data-tip data-for="unsadFace">
              {" "}
              <span class="badge rounded-pill bg-warning text-dark">
                Warning
              </span>
            </a>
            <ReactTooltip id="unsadFace" type="info" effect="solid">
              <span>Show unsad face</span>
            </ReactTooltip>
            <a data-tip data-for="angryFace">
              {" "}
              <span class="badge rounded-pill bg-info text-dark">Info</span>
            </a>
            <ReactTooltip id="angryFace" type="" effect="solid">
              <span>Show angry face</span>
            </ReactTooltip>
            <input value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={notify}>Notify!</button>
            {array.map((res, i) => (
              <div key={i}>
                <Box message={res} />
              </div>
            ))}
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li class="breadcrumb-item">
                  <a href="#">Library</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  Data
                </li>
              </ol>
            </nav>
            <div
              id="carouselExampleControls"
              class="carousel slide"
              data-bs-ride="carousel"
            >
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img
                    src="https://storage.googleapis.com/techsauce-prod/ugc/uploads/2021/7/Resume_checklist_2.jpg"
                    class="d-block w-100"
                    alt="Cinque Terre"
                    width="1100"
                    height="500"
                  />
                </div>
                <div class="carousel-item">
                  <img
                    src="https://f.ptcdn.info/016/054/000/oxe38618hAVfAYsgVsQ-o.jpg"
                    class="d-block w-100"
                    alt="Cinque Terre"
                    width="1100"
                    height="500"
                  />
                </div>
                <div class="carousel-item">
                  <img
                    src="https://www.aware.co.th/it-jobs/wp-content/uploads/Blog-Header-%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%8B%E0%B8%B9%E0%B9%80%E0%B8%A1%E0%B9%88%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%94%E0%B8%B5%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%AA%E0%B8%B8%E0%B8%94%E0%B8%82%E0%B8%AD%E0%B8%87-Java-Developers_Blog-Header-TH-1200x630.jpg"
                    class="d-block w-100"
                    alt="Cinque Terre"
                    width=""
                    height="500"
                  />
                </div>
              </div>
              <button
                class="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button
                class="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </Route>
          {!login && (
            <Route path="/about">
              <form onSubmit={LoginMethod}>
                <div class="input-group">
                  <div class="form-group col">
                    <label for="inputUsername">Username</label>
                    <input
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                      value={username}
                      class="form-control"
                      id="inputUsername"
                      placeholder="Username..."
                    />
                  </div>
                  <div class="form-group col">
                    <label for="inputPassword">Password</label>
                    <input
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      value={password}
                      type="password"
                      class="form-control"
                      id="inputPassword"
                      placeholder="Password..."
                    />
                  </div>
                </div>
                <Link to="/register">
                  <button type="submit" class="btn btn-primary mb-2">
                    register
                  </button>
                </Link>

                <button type="submit" class="btn btn-primary mb-2">
                  Sign in
                </button>
              </form>
            </Route>
          )}
          <Route path="/">
            <div>
              <button
                disabled={page == 1 ? true : false}
                onClick={() => setPage((old) => old - 1)}
              >
                {"<<<"}
              </button>
              <button onClick={() => setPage((old) => old + 1)}>{">>>"}</button>
            </div>

            <div
              style={{
                height: "0vh",
                display: "grid",
                gridTemplateColumns: "repeat(3,33.333%",
              }}
            >
              {movie.filter(FilterText).map((res, i) => (
                <Cards
                  title={res.title}
                  image={`https://image.tmdb.org/t/p/w500/${res.poster_path}`}
                  index={i}
                />
              ))}
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
