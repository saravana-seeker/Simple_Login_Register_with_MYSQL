import axios from "axios";
import React, { useState  } from "react";

function Signup() {
  const [data, setData] = useState({
    Name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const Handle = (e) => {
    const NewData = {...data};
    NewData[e.target.name] = e.target.value;
    setData(NewData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://127.0.0.1:3001/register";
      const User = await axios.post(url, {
        name: data.Name,
        email: data.email,
        password: data.password,
      });
      if(User.status === 200){
          setMessage(User.data);
          console.log(User.data)
      }
      else if (User.status === 401){
          setMessage(User.data);
      }
    } catch (error) {
      console.log("error on AXios API :", error);
    }
  };
  return (
    <>
      <div className="container p-5">
        <div className="signup-container">
          <div className="card">
            <div className="card-header">
              {" "}
              <h4>Sign UP </h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="Name">Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    name="Name"
                    value={data.Name}
                    onChange={Handle}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <br />
                  <input
                    type="email"
                    className="form-control"
                    required
                    name="email"
                    value={data.email}
                    onChange={Handle}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <br />
                  <input
                    type="password"
                    className="form-control"
                    required
                    name="password"
                    value={data.password}
                    onChange={Handle}
                  />
                </div>
                <button className="btn btn-primary m-3" type="submit">
                  SignUp
                </button>
              </form>
            </div>
            <p>{message}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
