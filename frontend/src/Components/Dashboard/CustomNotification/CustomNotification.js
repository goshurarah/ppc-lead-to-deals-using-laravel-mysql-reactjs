import React, { useState, useEffect } from "react";
import "./../CustomNotification/CustomStyle.css";
import good_mark from "./../../../Assets/good_mark_display.png";

function CustomNotification({ message }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // When a new message is received, set visible to true
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 9000);

    return () => clearTimeout(timer);
  }, [message]);

  // Render the notification when visible is true
  return (
    <>
      {visible && (
        <div className="round-message-container">
          <div className="round-message">
            <div className="row">
              <div className="col-lg-3 col-md-3 col-3">
                <img src={good_mark} className="good_mark_style" alt="Good Mark" />
              </div>
              <div className="col-lg-9 col-md-9 col-9 main_mesg_div">
                <p className="show_mesg">{message}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CustomNotification;
