import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [isShown, setIsSHown] = useState(false);
  const [isError, setError] = useState(false);
  const [isNote, setNode] = useState(false);
  const [Password1, setPassword1] = useState("crimson");
  const [Password2, setPassword2] = useState("crimson");
  const [Password3, setPassword3] = useState("crimson");
  const [Password4, setPassword4] = useState("crimson");

  const formik = useFormik({
    initialValues: {
      First_name: "",
      Last_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validate: (values) => {
      let error = {};

      if (!values.First_name) {
        error.First_name = "*Please enter first name";
      }
      if (!values.Last_name) {
        error.Last_name = "*Please enter last name";
      }
      if (!values.email) {
        error.email = "*Please enter the email";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        setError(false);
        error.email = "Invalid email address";
      }
      if (!values.password) {
        error.password = "*Please enter password";
      }
      if (values.password) {
        setNode(true);
      }
      if (/^(?=.*[a-z])/.test(values.password)) {
        setPassword1("green");
      } else if (!/^(?=.*[a-z])/.test(values.password)) {
        error.password = "*Invalid Password";
        setPassword1("crimson");
      }
      if (/^(?=.*[A-Z])/.test(values.password)) {
        setPassword2("green");
      } else if (!/^(?=.*[A-Z])/.test(values.password)) {
        error.password = "*Invalid Password";
        setPassword2("crimson");
      }
      if (/^(?=.*[!@#\$%\^&\*])(?=.*[0-9])/.test(values.password)) {
        setPassword3("green");
      } else if (!/^(?=.*[!@#\$%\^&\*])(?=.*[0-9])/.test(values.password)) {
        error.password = "*Invalid Password";
        setPassword3("crimson");
      }
      if (/^(?=.{8,})/.test(values.password)) {
        setPassword4("green");
      } else if (!/^(?=.{8,})/.test(values.password)) {
        error.password = "*Invalid Password";
        setPassword4("crimson");
      }
      if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.*[0-9])(?=.{8,})/.test(values.password)) {
        setNode(false);
      }
      if (!values.confirm_password) {
        error.confirm_password = "*Enter confirm password";
      } else if (values.password !== values.confirm_password) {
        error.confirm_password = "Password does not match";
      }
      return error;
    },

    onSubmit: async (values) => {
      try {
        setError(false);
        setLoading(true);
        const user = await axios.post(
          "http://localhost:8000/register",
          values
        );
        if (user.data.message == "register success") {
          setLoading(false);
          setError(false);
          alert("Registration success💐 Please Login!");
          navigate("/");
        } else {
          setError(true);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    },
  });
  return (
    <div class="container">
      <div class="card o-hidden border-0 shadow-lg my-5">
        <div class="card-body p-0">
          <div class="row">
            <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
            <div class="col-lg-7">
              <div class="p-5">
                <div class="text-center">
                  <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
                </div>
                <form class="user" onSubmit={formik.handleSubmit}>
                  <div class="form-group row">
                    <div class="col-sm-6 mb-sm-0">
                      <input
                        name={"First_name"}
                        value={formik.values.First_name}
                        onChange={formik.handleChange}
                        type={"text"}
                        class="form-control form-control-user"
                        id="exampleFirstName"
                        placeholder="First Name"
                      />
                      <small style={{ color: "crimson" }} className="ml-3">
                        {formik.errors.First_name}
                      </small>
                    </div>
                    <div class="col-sm-6">
                      <input
                        name={"Last_name"}
                        value={formik.values.Last_name}
                        onChange={formik.handleChange}
                        type={"text"}
                        class="form-control form-control-user"
                        id="exampleLastName"
                        placeholder="Last Name"
                      />
                      <small style={{ color: "crimson" }} className="ml-3">
                        {formik.errors.Last_name}
                      </small>
                    </div>
                  </div>
                  <div class="form-group">
                    <input
                      name={"email"}
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      type={"email"}
                      class="form-control form-control-user"
                      id="exampleInputEmail"
                      placeholder="Email Address"
                    />
                    {isError ? (
                      <small style={{ color: "crimson" }} className="ml-3">
                        An account with the given email already exists
                      </small>
                    ) : (
                      <small style={{ color: "crimson" }} className="ml-3">
                        {formik.errors.email}
                      </small>
                    )}
                  </div>
                  <div class="form-group row">
                    <div class="col-sm-6 mb-sm-0">
                      <input
                        name={"password"}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        type={isShown ? "text" : "password"}
                        class="form-control form-control-user"
                        id="exampleInputPassword"
                        placeholder="Password"
                      />
                      <small style={{ color: "crimson" }} className="ml-3">
                        {formik.errors.password}
                      </small>
                    </div>
                    <div class="col-sm-6">
                      <input
                        name={"confirm_password"}
                        value={formik.values.confirm_password}
                        onChange={formik.handleChange}
                        type={isShown ? "text" : "password"}
                        class="form-control form-control-user"
                        id="exampleRepeatPassword"
                        placeholder="Confirm Password"
                      />
                      <small style={{ color: "crimson" }} className="ml-3">
                        {formik.errors.confirm_password}
                      </small>
                    </div>
                    <div class=" custom-control custom-checkbox small ml-3">
                      <input
                        type="checkbox"
                        checked={isShown}
                        onChange={() => setIsSHown(!isShown)}
                        class="custom-control-input"
                        id="customCheck"
                      />
                      <label class="custom-control-label" for="customCheck">
                        Show Password
                      </label>
                    </div>
                  </div>
                  {isNote ? (
                    <div class="form-group mb-3">
                      <p className="m-0 text-dark">The password must have :</p>
                      <ul style={{ color: "crimson" }}>
                        <li style={{ color: `${Password4}` }}>
                          <small>At least 8 characters in length</small>
                        </li>
                        <li style={{ color: `${Password1}` }}>
                          <small>Must be one lowercase letter</small>
                        </li>
                        <li style={{ color: `${Password2}` }}>
                          <small>Must be one uppercase letter</small>
                        </li>
                        <li style={{ color: `${Password3}` }}>
                          <small>
                            Must be one number and Special character
                          </small>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    ""
                  )}
                  <input
                    type={"submit"}
                    value={`${isLoading ? "Loading..." : "Register"}`}
                    class="btn btn-primary btn-user btn-block"
                    disabled={`${isLoading ? false : ""}`}
                  />
                </form>
                <hr />
                <div class="text-center">
                  <Link to={"/password-reset"} class="small">
                    Forgot Password?
                  </Link>
                </div>
                <div class="text-center">
                  <Link to={"/"} class="small">
                    Already have an account? Login!
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
