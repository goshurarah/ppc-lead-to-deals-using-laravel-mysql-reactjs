import React, { useEffect, useState } from "react";
import "./../RoleinprojectGoogleSignup/RoleInProjectStyle.css";
import design from "./../../Assets/design.PNG";
import ppclogo from "./../../Assets/ppclogo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CustomNotification from "../Dashboard/CustomNotification/CustomNotification";
import RedNotification from "../Dashboard/CustomNotification/RedNotification";
import SpinnerLoader from "../Dashboard/SpinnerLoader/SpinnerLoader";
function RoleInProjectGoogle() {
  const [projectrole, setProjectRole] = useState("");
  useEffect(() => {
    getdata();
  }, []);
  const getdata = () => {
    axios.get(`/api/get-business_types`).then((res) => {
      setProjectRole(res.data);
    });
  };

  const navigate = useNavigate();
  const [checkbox, setCheckBOX] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [notificationMessageRed, setnotificationMessageRed] = useState(null);
  const [notificationMessage, setnotificationMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    return () => {
      getEmailData();
    };
  });
  const getEmailData = () => {
    const savedItem = localStorage.getItem("email");
    return savedItem;
  };

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const handleCheckboxChange = (e, checkboxValue) => {
    if (e.target.checked) {
      setSelectedCheckboxes([...selectedCheckboxes, checkboxValue]);
    } else {
      setSelectedCheckboxes(
        selectedCheckboxes.filter((checkbox) => checkbox !== checkboxValue)
      );
    }
  };

  const projectRoleSelectionAction = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
    let payload = {
      email: getEmailData(),
      // JSON.stringify({ checkboxes: selectedCheckboxes }),
      business_types: selectedCheckboxes,
    };
    axios
      .post("/api/add-user-business-types", payload)
      .then((r) => {
        // alert(r.data.data.message);
        setIsModalOpen(false);
        setnotificationMessage(r.data.data.message);
        navigate("/state_Google");
      })
      .catch((e) => {
        setIsModalOpen(false);
        if (e.response.data.errors != undefined) {
          // alert(e.response.data.message);
          setIsModalOpen(false);
          setnotificationMessageRed(e.response.data.message);
          setValidationErrors(e.response.data.errors);
          setTimeout(() => {
            setnotificationMessageRed("");
          }, 4000);
        }
      });
  };

  return (
    <>
      <>
        {" "}
        {notificationMessage && (
          <CustomNotification message={notificationMessage} />
        )}
      </>
      <>
        {" "}
        {notificationMessageRed && (
          <RedNotification message={notificationMessageRed} />
        )}
      </>
      <>
        <div className="row justify-content-between mainnavbardiv">
          <div className="col p-0">
            <a href="#">
              <img src={ppclogo} className="ppclogo" alt="" />
            </a>
          </div>

          <div className="col p-0">
            <div className="progress ">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: "80%" }}
                aria-valuenow="80"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <label className="numberperctage"> Step 4 of 7</label>
          </div>
        </div>
      </>
      <div className="mainrole row">
        <div className="col-sm-12 col-md-4 col-lg-4"></div>
        <div className=" col-sm-12 col-md-4 col-lg-4">
          <p className="signup mt-3">What is your role?</p>
          <p className="projectrolepara">
            Please select your role on this project
          </p>
          <form onSubmit={(e) => projectRoleSelectionAction(e)}>
            {projectrole
              ? projectrole?.data?.map((projectrolename, index) => {
                  return (
                    <div
                      className="mt-3 checkboxbuttonforrolesignup row "
                      key={index}
                    >
                      <div className="col-2">
                        <input
                          className="mx-1 form-check-input checkboxinputrole"
                          type="checkbox"
                          value=""
                          id="checkbox"
                          name="checkbox"
                          checked={selectedCheckboxes.includes(
                            projectrolename?.id
                          )}
                          onChange={(e) =>
                            handleCheckboxChange(e, projectrolename?.id)
                          }
                        />
                      </div>
                      <p className="col-10 checkboxdetail">
                        {projectrolename?.title}
                      </p>
                    </div>
                  );
                })
              : null}
            <button type="submit" className="mt-5 checkboxbuttonforrolesubmit ">
              Next
            </button>
          </form>
        </div>
        <div className="col-sm-12 col-md-4 col-lg-4 third_div_design p-0">
          <img className="third_design" src={design} />
        </div>
      </div>

      <>
        <div
          class={`modal fade bd-example-modal-sm ${
            isModalOpen ? "show" : ""
          } mt-5`}
          style={{ display: isModalOpen ? "block" : "none" }}
          tabindex="-1"
          role="dialog"
          aria-labelledby="mySmallModalLabel"
          aria-hidden={!isModalOpen}
        >
          <div class="modal-dialog modal-sm">
            <div class="modal-content">
              <SpinnerLoader />
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default RoleInProjectGoogle;
