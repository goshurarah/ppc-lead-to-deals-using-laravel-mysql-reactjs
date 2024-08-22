import React from "react";
import { useState, useRef, useEffect  } from "react";
import "./../TicketAndLiveChat/ticketStyle.css";
import ticket from "./../../../Assets/bi_ticket-fill.png";
import ticket_open from "./../../../Assets/ticket_open.png";
import vector from "./../../../Assets/Vector.png";
import hand_pic from "./../../../Assets/hand_pic.png";
import profile_pic from "./../../../Assets/profile_pic_chat.png";
import chat_icon from "./../../../Assets/chat_sent_icon.png";
import axios from "axios";
import CustomNotification from "../CustomNotification/CustomNotification";
import RedNotification from "../CustomNotification/RedNotification";

function TicketandLiveChat() {
  const [notificationMessageRed, setnotificationMessageRed] = useState(null);
  const [notificationMessage, setnotificationMessage] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isSecondButtonOpen, setIsSecondButtonOpen] = useState(false);
  const handleClickticket = () => {
    setIsOpen(!isOpen);
    setIsSecondButtonOpen(false);
  };
  const handleSecondButtonClick = () => {
    setIsOpen(false);
    setIsSecondButtonOpen(!isSecondButtonOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle form submission logic here
  };

  // upload file code start here

  const [selectedName, setSelectedName] = useState("");

  const [file, setFile] = useState(null);

 
  const [selectproductcategory, setselectproductcategory] = useState("");
  const [selectedproblemdetail, setselectedproblemdetail] = useState("");
  const [selectedsubject, setselectedsubject] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);

  const handlesubject = (event) => {
    setselectedsubject(event.target.value);
  };

  const handleDropdownChange = (event) => {
    setselectproductcategory(event.target.value);
  };

  const handleproblem = (event) => {
    setselectedproblemdetail(event.target.value);
  };

  const token = localStorage.getItem("token");
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setSelectedName(event.target.files[0].name);
  };


  // disappear component on click outside code

  const ticketRef = useRef(null);
  const chatRef = useRef(null);

  // Function to handle clicks outside the ticket and chat components
  const handleClickOutside = (event) => {
    if (
      ticketRef.current &&
      !ticketRef.current.contains(event.target) &&
      chatRef.current &&
      !chatRef.current.contains(event.target)
    ) {
      setIsOpen(false);
      setIsSecondButtonOpen(false);
    }
  };

  // Add a click event listener when the component mounts
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // disappear component on click outside code
  
  const handleSubmitTicket = (event) => {
    event.preventDefault();

    const formData = new FormData();

    // Append the selected file to the formData object
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    // Include other form fields or data in the formData object
    formData.append("subject", selectedsubject);
    formData.append("product_category", selectproductcategory);
    formData.append("request_details", selectedproblemdetail);

    const payload = {
      subject: selectedsubject,
      product_category: selectproductcategory,
      request_details: selectedproblemdetail,
      file: file,
    };

    axiosInstance
      .post("/api/dashboard/tickets", formData)
      .then((response) => {
        // handle the response

        // alert(response.data.message);
        // <CustomNotification message={response.data.message}/>
        setnotificationMessage(response?.data?.message);
        setSelectedFile(null);
        setselectedsubject("");
        setselectproductcategory("");
        setselectedproblemdetail("");
        setSelectedName("");
        setIsOpen(false);
        setTimeout(() => {
          setnotificationMessage("");
        }, 4000);

        // alert("ticket craeted successfully");
      })
      .catch((error) => {
        // handle errors
        console.error(error);
        // setnotificationMessageRed(error);
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
      <div className="button-container" >
        <button
          className="create_token_button"
          data-toggle="modal"
          data-target="#exampleModal"
          onClick={handleClickticket}
        >
          {isOpen ? (
            <img src={ticket} className="vector_image" />
          ) : (
            <img src={ticket} className="vector_image" />
          )}
        </button>

        <p className="create_token_para">Create Ticket</p>
        <button
          className="create_token_button"
          onClick={handleSecondButtonClick}
        >
          <img src={vector} className="vector_image" />
        </button>
        <p className="create_token_para">Live Support</p>
      </div>
      <>
        {isOpen && (
          <div className="component-container" ref={ticketRef}>
            <div className="header_of_ticket">
              <img src={ticket_open} className="ticket_open_image" />
              <p className="para_ticket">
                Hi! We’re so excited to hear from you and will be happy to
                answer all your questions 🙂
              </p>
            </div>
            <div className="body_of_ticket">
              <form onSubmit={handleSubmitTicket}>
                <input
                  type="text"
                  placeholder="Subject *"
                  className="input_subject_style"
                  value={selectedsubject}
                  onChange={handlesubject}
                  maxLength={100} 
                  required
                />

                <select
                  value={selectproductcategory}
                  onChange={handleDropdownChange}
                  className="input_subject_style"
                  required
                >
                  <option value="">Product Category *</option>
                  <option
                    value="sample1"
                    checked={selectproductcategory === "sample1"}
                  >
                    sample1
                  </option>
                  <option
                    value="sample2"
                    checked={selectproductcategory === "sample2"}
                  >
                    sample2
                  </option>
                  <option
                    value="sample3"
                    checked={selectproductcategory === "sample3"}
                  >
                    sample3
                  </option>
                </select>
                <textarea
                  name="paragraph_text"
                  cols="50"
                  rows="10"
                  className="input_para_style"
                  placeholder="Request/ Problem Details *"
                  value={selectedproblemdetail}
                  onChange={handleproblem}
                  required
                ></textarea>
                <div>
                  <div className="parent">
                    <div className="file-upload">
                      <h5 className="dropyourfile">
                        {" "}
                        {selectedName || "Drop you files or browse"}
                      </h5>
                      <p className="maximum_para">Max.File size 2MB</p>
                      {/* <input type="file" onChange={handleFileChange} /> */}
                      <input type="file" onChange={handleFileChange} />
                    </div>
                  </div>
                </div>
                <button className="ticket_sumbit_button" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </>
      {/* chat module start here */}
      <>
        {isSecondButtonOpen && (
          <div className="chat_main_container1" ref={chatRef}>
            <div className="header_of_chat">
              <div className="row">
                <div className="col-sm-4">
                  <img className="rounded-div" src={profile_pic} />
                  <p className="profile_name">Emily</p>
                </div>
                <div className="col-sm-8">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="row">
                        <p className="heading_chat_hello ">
                          Hello! <img className="" src={hand_pic} />
                        </p>
                      </div>
                    </div>
                    <div className="col-sm-12 ">
                      <p className="para_chat_head">We are here to help.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="body_of_chat">
              <form onSubmit={handleSubmit}>
                <p className="chat_para_body">How may we assist you ?</p>
                <div className="row m-0 p-0">
                  <div className="col-sm-8">
                    <div className="receive_chat_style"></div>
                  </div>
                  <div className="col-sm-3"></div>
                </div>
                <div className="row m-0 p-0">
                  <div className="col-sm-3"></div>
                  <div className="col-sm-8">
                    <div className="sent_chat_style"></div>
                  </div>
                </div>
                <div className="main_enter_chat_div">
                  <div className="row m-0 p-0">
                    <div className="col-md-10 col-9 ">
                      {" "}
                      <input className="input_style_chat" />
                    </div>
                    <div className="col-md-2 col-3 ">
                      {" "}
                      <img className="icon_chat_send" src={chat_icon} />
                    </div>
                  </div>
                </div>
                {/* <button className="ticket_sumbit_button" type="submit">
                  Submit
                </button> */}
              </form>
            </div>
          </div>
        )}
      </>
    </>
  );
}

export default TicketandLiveChat;
