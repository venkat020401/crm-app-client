import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function PasswordReset() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isShow, setHide] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate: (values) => {
      let error = {};

      if (!values.email) {
        error.email = "*Please enter the email";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        error.email = "Invalid email address";
      }

      return error;
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await axios.post("http://localhost:8000/sendpasswordlink", values);
        setMessage(true);
        setEmail("");
        setHide(true);
        formik.values.email = "";
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
        setEmail("Couldn't find your account");
        setHide(false);
        setMessage(true);
      }
    },
  });

  return (
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xl-10 col-lg-12 col-md-9">
          <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0">
              <div class="row">
                <div class="col-lg-6 d-none d-lg-block bg-password-image"></div>
                <div class="col-lg-6">
                  <div class="p-5">
                    <div class="text-center">
                      <h1 class="h4 text-gray-900 mb-2">
                        {isShow ? "Check Your Email" : "Forgot Your Password?"}
                      </h1>
                      <p class="mb-4">
                        {isShow
                          ? "You can create a new password for yourself by clicking the link sent to your email..!"
                          : "We get it, stuff happens. Just enter your email address below and we'll send you a link to reset your password!"}
                      </p>
                    </div>
                    {message ? (
                      <p className={"text-danger fs-6 text-center fw-bold"}>
                        {email}
                      </p>
                    ) : (
                      ""
                    )}
                    {isShow ? (
                      <form class="user">
                        <p className={"fs-6 fw-bold text-center text-success"}>
                          Reset link has been succssfully sent
                        </p>
                        <div class="text-center">
                          <button
                            onClick={() => {
                              window.refresh();
                            }}
                            style={{ fontSize: ".8rem" }}
                            class="small btn btn-primary btn-sm mt-3 rounded-5 small p-2 px-3"
                          >
                            Click Back to Resent
                          </button>
                        </div>
                      </form>
                    ) : (
                      <form class="user" onSubmit={formik.handleSubmit}>
                        <div class="form-group">
                          <input
                            name={"email"}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            type={"email"}
                            class="form-control form-control-user"
                            id="exampleInputEmail"
                            placeholder="Enter Your Email..."
                          />
                          <small className="ml-3" style={{ color: "crimson" }}>
                            {formik.errors.email}
                          </small>
                        </div>
                        <input
                          type={"submit"}
                          value={`${
                            isLoading ? "Loading..." : "Reset Password"
                          }`}
                          class="btn btn-primary btn-user btn-block"
                          disabled={`${isLoading ? true : ""}`}
                        />
                        <hr />
                        <div class="text-center">
                          <Link to={"/register"} class="small">
                            Create an Account!
                          </Link>
                        </div>
                        <div class="text-center">
                          <Link to={"/"} class="small">
                            Already have an account? Login!
                          </Link>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;
