import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

function VerifyUser() {
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    verifyuser();
  }, []);

  const verifyuser = async () => {
    try {
      await axios.post(
        `http://localhost:8000/verify-user/${params.id}/${params.randomnum}`
      );
      navigate(`/update-password/${params.id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <img
            className="loading-image"
            src="https://media.tenor.com/64UaxgnTfx0AAAAC/memes-loading.gif"
            alt="loading..."
          />
        </div>
      </div>
    </>
  );
}

export default VerifyUser;
