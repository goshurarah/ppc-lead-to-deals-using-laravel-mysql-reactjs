import React, { useEffect, useState } from "react";
import "./../CustomNotification/CustomStyle.css";
// import cross_mark from "./../../../Assets/download (1).png";
import cross_mark from "./../../../Assets/200200 cross mark.png";

function RedNotification({ message }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 9000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {visible && (
        <>
          {/* <div>  <hr className="round-message-line" /></div> */}
          <div className="round-message-container">
            <div className="round-message">
              <div className="row">
                <div className="col-lg-3 col-md-3 col-3">
                  <img src={cross_mark} className="good_mark_style" />
                </div>
                <div className="col-lg-9 col-md-9 col-9 main_mesg_div">
                  <p className="show_mesg">{message}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default RedNotification;
