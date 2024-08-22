import React, { useState } from "react";
import "./../AddEmail/AddEmailStyle.css";
import CustomNotification from "../../Dashboard/CustomNotification/CustomNotification";
import RedNotification from "../../Dashboard/CustomNotification/RedNotification";
import axios from "axios";
function AddEmail() {
  const [notificationMessageRed, setnotificationMessageRed] = useState(null);
  const [notificationMessage, setnotificationMessage] = useState(null);

  const [email, setemail] = useState("");
  const handleemailChange = (event) => {
    setemail(event.target.value);
  };
  const AddEmailNewsLetter = (e) => {
    e.preventDefault();
    let payload = {
      email: email,
    };
    axios
      .post("/api/tags", payload)
      .then((r) => {
        console.log(r);
        setnotificationMessage(r.data.message);
        // clearvaluesincreatelead();
        setTimeout(() => {
          setnotificationMessage("");
        }, 4000);
      })
      .catch((e) => {
        if (e.response.data.errors != undefined) {
          // alert(e.response.data.message);
          setnotificationMessageRed(e.response.data.message);
          setTimeout(() => {
            setnotificationMessageRed("");
          }, 4000);
        }
      });
  };
  return (
    <>
      <>
        {notificationMessage && (
          <CustomNotification message={notificationMessage} />
        )}
      </>
      <>
        {notificationMessageRed && (
          <RedNotification message={notificationMessageRed} />
        )}
      </>
      <div className="main_addmail_div">
        <div className="row container-fluid second_main_addmail_div">
          <div className="col-lg-5 col-md-12 col-sm-12 m-0 p-0">
            <p className="heading_addmail">Join for free today</p>
            <p className="para_addmail">
              Find out seller’s motivation, repairs needed and more BEFORE you
              commit to buying the lead
            </p>
          </div>
          <div className="col-lg-7 col-md-12 col-sm-12 email_button_div">
            <div className="main_div_email_join">
              <form onSubmit={AddEmailNewsLetter}>
                <div className="row">
                  <div className="col-lg-8 col-md-8 col-8">
                    <input
                      className="input_style_email_join_free"
                      value={email}
                      onChange={handleemailChange}
                      required
                      input="email"
                    />
                  </div>
                  <div className="col-lg-4 col-md-4 col-4">
                    <button
                      className="start_for_free_button_email"
                      type="submit"
                    >
                      Start for Free
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddEmail;
