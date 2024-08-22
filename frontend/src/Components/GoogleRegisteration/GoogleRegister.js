import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import SpinnerLoader from "../Dashboard/SpinnerLoader/SpinnerLoader";
import "./../GoogleRegisteration/GoogleRegisterStyle.css";
function GoogleRegister() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});

  const getuserdata = () => {
    const token = localStorage.getItem("token");

    const axiosInstance = axios.create({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    axiosInstance
      .get("/api/auth/get-user-residence")
      .then((res) => {
        if (
          Array.isArray(res.data.data.user_business_types) &&
          res.data.data.user_business_types.length === 0
        ) {
          navigate("/verification_code_Google");
        } else {
          navigate("/dashboard");
        }
      })
      .catch((e) => {
        if (e.response.status === 404) {
        } else {
        }
      });
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const paramValue = queryParams.get("code");

    if (paramValue) {
      axios
        .get(`/api/auth/google/callback?code=${paramValue}`, {
          headers: { accept: "application/json" },
        })
        .then((response) => {
          setData(response.data);
          localStorage.setItem("token", response.data.access_token.accessToken);
          localStorage.setItem("email", response.data.user.email);
          setTimeout(() => {
            getuserdata(); // Call getuserdata function here
          }, 5000);

          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <SpinnerLoader />;
  }

  return (
    <div>
      <div className="text_alingn_center_para_google">
        {data.user && (
          //   <p >kindly wait: {data.user.first_name}</p>
          <p>Redirecting</p>
        )}
      </div>
      {/* You might not need another SpinnerLoader here */}
      <SpinnerLoader />
    </div>
  );
}

export default GoogleRegister;
