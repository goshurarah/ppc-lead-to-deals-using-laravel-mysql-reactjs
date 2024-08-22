import React, { useEffect, useState, useRef } from "react";
import up_arrow from "./../../../Assets/up_arrow_crm.png";
import down_arrow from "./../../../Assets/down_arrow_crm.png";
import down_st from "./../../../Assets/down_arrow_st.png";
import "./../SupportTicket/SupportTicketStyle.css";
import eye from "./../../../Assets/eye_image.png";
import axios from "axios";
import Pagination from "react-js-pagination";
import search_icon from "./../../../Assets/search_icon.png";
import target_entity from "./../../../Assets/target_entity.png";
import status_icon_entity from "./../../../Assets/search_third.png";
import hide_st from "./../../../Assets/hide_st.png";
import message_icon from "./../../../Assets/send_message_icon.png";
import SpinnerLoader from "../SpinnerLoader/SpinnerLoader";
import upload_file_st from "./../../../Assets/upload_file_icon_st.png";
import TicketandLiveChat from "../TicketAndLiveChat/TicketandLiveChat";
import downloadpic from "./../../../Assets/download_icon.png";
import picicon from "./../../../Assets/pic_icon.png";
import downarrowforsearch from "./../../../Assets/downarrowforsearch.png";

function SupportTicket() {
  const [isVisible, setIsVisible] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    // Show the scroll-to-top button when the user has scrolled down
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    scrollToTop();
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const [activeIndex, setActiveIndex] = useState(-1); // State to keep track of the active panel index
  const [getuseridforchangingclass, setgetuseridforchangingclass] =
    useState("");
  //function to store id
  const storeid = (id) => {
    setgetuseridforchangingclass(id);
  };

  // Function to toggle the active panel
  const togglePanel = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsCountPerPages, setitemsCountPerPages] = useState(0);
  const [lastpage, setlastpage] = useState(0);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //set target dropdown
  const [dropdownOpentargetentity, setDropdownOpentargetentity] =
    useState(false);
  const [filtertargetentity, setFiltertargetentity] = useState("");
  const [selectedOptiontargetentity, setSelectedOptiontargetentity] =
    useState("");
  const dropdownReftarget = useRef(null);

  const toggleDropdowntargetentity = () => {
    setDropdownOpentargetentity(!dropdownOpentargetentity);
  };

  const handleFilterChangetargetentity = (event) => {
    setFiltertargetentity(event.target.value.toUpperCase());
  };

  const handleOptionChangetargetentity = (option) => {
    setSelectedOptiontargetentity(option);
    setDropdownOpentargetentity(false);
  };

  // Add a click event listener to the document to close the dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownReftarget.current &&
        !dropdownReftarget.current.contains(event.target)
      ) {
        setDropdownOpentargetentity(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Add a scroll event listener to the document to close the dropdown
  useEffect(() => {
    function handleScrollOutside(event) {
      if (
        dropdownReftarget.current &&
        !dropdownReftarget.current.contains(event.target)
      ) {
        setDropdownOpentargetentity(false);
      }
    }

    document.addEventListener("scroll", handleScrollOutside);
    return () => {
      document.removeEventListener("scroll", handleScrollOutside);
    };
  }, []);

  const targetdropdwon = ["sample1", "sample2", "sample3"];

  //set status dropdown
  const [dropdownOpenstatus, setDropdownOpenstatus] = useState(false);
  const [filterstatus, setFilterstatus] = useState("");
  const [selectedOptionstatus, setSelectedOptionstatus] = useState("");
  const dropdownRef = useRef(null);

  const toggleDropdownstatus = () => {
    setDropdownOpenstatus(!dropdownOpenstatus);
  };

  const handleFilterChangestatus = (event) => {
    setFilterstatus(event.target.value.toUpperCase());
  };

  const handleOptionChangestatus = (option) => {
    setSelectedOptionstatus(option);
    setDropdownOpenstatus(false);
  };

  useEffect(() => {
    const closeDropdown = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpenstatus(false);
      }
    };

    document.addEventListener("mousedown", closeDropdown);
    document.addEventListener("scroll", closeDropdown);

    return () => {
      document.removeEventListener("mousedown", closeDropdown);
      document.removeEventListener("scroll", closeDropdown);
    };
  }, []);

  const statusdropdwon = ["Pending", "Resolved"];

  const token = localStorage.getItem("token");
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  //search bar support ticket
  const [selectproductcategory, setselectproductcategory] = useState("");
  const handleDropdownChange = (event) => {
    setselectproductcategory(event.target.value);
  };

  const [selectStatus, setselectStatus] = useState("");
  const handleStatusGet = (event) => {
    setselectStatus(event.target.value);
  };

  const [subjectvalue, setsubjectvalue] = useState("subject");
  const [descascvalue, setdescascvalue] = useState("asc");

  const [supportTicket, setsupportTicket] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };
  console.log(searchValue, "free search");

  useEffect(() => {
    fetchsupportTicket();
  }, [
    currentPage,
    selectedOptiontargetentity,
    selectedOptionstatus,
    searchValue,
  ]);

  const fetchsupportTicket = () => {
    axiosInstance
      .get(
        `/api/dashboard/tickets?page=${currentPage}&search=${searchValue}&product_category=${selectedOptiontargetentity}&status=${selectedOptionstatus}&sort_by=${subjectvalue}&sort_order=${descascvalue}`
      )
      .then((res) => {
        setsupportTicket(res?.data?.data);
        setTotalPages(res?.data?.total);
        setitemsCountPerPages(res?.data?.per_page);
        setlastpage(res?.data?.last_page);
      });
  };

  const clearvaluesinsearchbar = () => {
    setSelectedOptiontargetentity("");
    setSearchValue("");
    setSelectedOptionstatus("");
  };
  const separateDateAndTime = (createdAt) => {
    const dateObj = new Date(createdAt);
    const date = dateObj.toLocaleDateString();
    const time = dateObj.toLocaleTimeString();
    return (
      <div>
        <p>{date}</p>
        <p>{time}</p>
      </div>
    );
  };

  const separateDateAndTimeinrow = (createdAt) => {
    const dateObj = new Date(createdAt);
    const date = dateObj.toLocaleDateString();
    const time = dateObj.toLocaleTimeString();
    return (
      <div className="row">
        <p className="col-lg-5 col-md-5 col-5">{date}</p>
        <p className="col-lg-7 col-md-7 col-7">{time}</p>
      </div>
    );
  };

  const [mesg_send_to_user, setmesg_send_to_user] = useState("");

  const handleSubmitmessage = (event) => {
    event.preventDefault();

    const payload = {
      message: mesg_send_to_user,
      ticket_id: getticketid,
      file: selectedFilest,
      // user_id: userid,
    };

    const formData = new FormData();

    // Append the selected file to the formData object
    if (selectedFilest) {
      formData.append("file", selectedFilest);
    }

    // Include other form fields or data in the formData object
    formData.append("message", mesg_send_to_user);
    formData.append("ticket_id", selectedFilest);

    axiosInstance
      .post(`/api/dashboard/tickets/${getticketid}/messages`, formData)
      .then((response) => {
        // handle the response
        setmesg_send_to_user(""); // Clear the message input
        setgetticketid(""); // Clear the ticket id
        fetchsupportTicket();
      })
      .catch((error) => {
        // handle errors
        console.error(error);
      });
  };

  //save ticket id in state
  const [getticketid, setgetticketid] = useState("");

  //get user id
  const [userid, setuserid] = useState("");
  const [userprofiledata, setuserprofiledata] = useState("");
  useEffect(() => {
    getuserprofiledata();
  }, []);

  const getuserprofiledata = () => {
    axiosInstance.get(`/api/dashboard/user-info`).then((res) => {
      setuserid(res.data.data.id);
    });
  };

  //upload file in message
  const [selectedFilest, setSelectedFilest] = useState(null);
  const handleFileChangeSt = (event) => {
    setSelectedFilest(event.target.files[0]);
    // setSelectedName(event.target.files[0].name);
  };

  const [rolecheck, setrolecheck] = useState("");
  useEffect(() => {
    getStatedata();
  }, []);

  const getStatedata = () => {
    axiosInstance.get(`/api/dashboard/get-user-roles`).then((res) => {
      setrolecheck(res.data.data);
    });
  };
  const isAdmin =
    rolecheck.includes("writer") ||
    rolecheck.includes("moderator") ||
    rolecheck.includes("super-admin");

  const openImageInNewWindow = (fileUrl) => {
    window.open(fileUrl, "_blank");
  };

  return (
    <>
      <>
        <div className="row main_search_div">
          <div className="col-lg-10">
            <div className="search_entity ">
              <img src={search_icon} className="search_icon_st" />
              <input
                className="input_serachentity_st"
                type="search"
                value={searchValue}
                onChange={handleInputChange}
              />
              <a className="vertical_line_st mx-3"></a>
              <img className="search_st_icon_style" src={target_entity} />
              {/* <select
                name="language"
                id="language"
                className="target_entity_dropdown_style"
              >
                <option value="">States</option>
                <option value="">States</option>
              </select> */}
              {/* <input
                  type="text"
                  placeholder="Subject *"
                  className="target_entity_dropdown_style"
                  value={selectedsubject}
                  onChange={handlesubject}
                /> */}

              {/* <select
                value={selectproductcategory}
                onChange={handleDropdownChange}
                className="target_entity_dropdown_style"
              >
                <option value="" checked={selectproductcategory === ""}>
                  Target Entity
                </option>
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
              </select> */}
              <div className="dropdownst" ref={dropdownReftarget}>
                <button
                  onClick={toggleDropdowntargetentity}
                  className="dropbtnst"
                >

{selectedOptiontargetentity
                        ? selectedOptiontargetentity &&
                          selectedOptiontargetentity.length > 9
                          ? `${selectedOptiontargetentity.slice(0, 9)}...`
                          : selectedOptiontargetentity || <div>
                      Targetentity{" "}
                      <img src={downarrowforsearch} className="mx-1" />
                    </div>
                        : <div>
                      Targetentity{" "}
                      <img src={downarrowforsearch} className="mx-1" />
                    </div>}


                  {/* {selectedOptiontargetentity ? (
                    selectedOptiontargetentity
                  ) : (
                    <div>
                      Targetentity{" "}
                      <img src={downarrowforsearch} className="mx-1" />
                    </div>
                  )} */}
                </button>
                <div
                  id="myDropdownst"
                  className={`dropdown-contentst ${
                    dropdownOpentargetentity ? "showst" : ""
                  }`}
                >
                  <input
                    type="text"
                    placeholder="Search.."
                    id="myInputst"
                    onKeyUp={handleFilterChangetargetentity}
                  />
                  {targetdropdwon
                    ? targetdropdwon
                        .filter((item) =>
                          item.toUpperCase().includes(filtertargetentity)
                        )
                        .map((item) => (
                          <a
                            key={item}
                            // href={`#${item.name.toLowerCase()}`}
                            onClick={() => handleOptionChangetargetentity(item)}
                          >
                            {item}
                          </a>
                        ))
                    : null}
                </div>
              </div>

              {/* <div className="dropdownst">
                <button
                  onClick={toggleDropdowntargetentity}
                  className="dropbtnst"
                >
                  {selectedOptiontargetentity
                    ? selectedOptiontargetentity
                    : "targetentity"}
                </button>
                <div
                  id="myDropdownst"
                  className={`dropdown-contentst ${
                    dropdownOpentargetentity ? "showst" : ""
                  }`}
                >
                  <input
                    type="text"
                    placeholder="Search.."
                    id="myInputst"
                    onKeyUp={handleFilterChangetargetentity}
                  />
                  {targetdropdwon
                    ? targetdropdwon
                        .filter((item) =>
                          item.toUpperCase().includes(filtertargetentity)
                        )
                        .map((item) => (
                          <a
                            key={item}
                            // href={`#${item.name.toLowerCase()}`}
                            onClick={() => handleOptionChangetargetentity(item)}
                          >
                            {item}
                          </a>
                        ))
                    : null}
                </div>
              </div> */}
              <a className="vertical_line_st mx-3"></a>
              <img
                src={status_icon_entity}
                className="search_st_icon_style mx-1"
              />
              {/* <select
                name="language"
                id="language"
                className="target_entity_dropdown_style"
                value={selectStatus}
                onChange={handleStatusGet}
              >
                <option value="" selected>
                  Status
                </option>
                <option value="pending" checked={selectStatus === "pending"}>
                  Pending
                </option>
                <option value="resolved" checked={selectStatus === "resolved"}>
                  Resolved
                </option>
              </select> */}
              <div className="dropdownst">
                <button onClick={toggleDropdownstatus} className="dropbtnst">
                  {/* {selectedOptionstatus ? (
                    selectedOptionstatus
                  ) : (
                    <div>
                      Status <img src={downarrowforsearch} className="  mx-1" />
                    </div>
                  )} */}
                   {selectedOptionstatus
                        ? selectedOptionstatus &&
                          selectedOptionstatus.length > 7
                          ? `${selectedOptionstatus.slice(0, 7)}...`
                          : selectedOptionstatus ||    <div>
                      Status <img src={downarrowforsearch} className="  mx-1" />
                    </div>
                        :    <div>
                      Status <img src={downarrowforsearch} className="  mx-1" />
                    </div>}
                </button>
                <div
                  ref={dropdownRef}
                  id="myDropdownst"
                  className={`dropdown-contentst ${
                    dropdownOpenstatus ? "showst" : ""
                  }`}
                >
                  <input
                    type="text"
                    placeholder="Search.."
                    id="myInputst"
                    onKeyUp={handleFilterChangestatus}
                  />
                  {statusdropdwon
                    ? statusdropdwon
                        .filter((item) =>
                          item.toUpperCase().includes(filterstatus)
                        )
                        .map((item) => (
                          <a
                            key={item}
                            // href={`#${item.name.toLowerCase()}`}
                            onClick={() => handleOptionChangestatus(item)}
                          >
                            {item}
                          </a>
                        ))
                    : null}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-2">
            <button
              className="clear_button_search_st"
              onClick={clearvaluesinsearchbar}
            >
              Clear Filter
            </button>
          </div>
        </div>
      </>
      <div className="container-fluid row main_div_st_heading">
        <div className="col-lg-2  col-md-2 col-sm-2">
          Subject{" "}
          <img
            src={up_arrow}
            onClick={() => {
              setsubjectvalue("subject");
              setdescascvalue("asc");
              fetchsupportTicket();
            }}
            className="cursor_pinter_add"
          />
          <img
            src={down_arrow}
            onClick={() => {
              setsubjectvalue("subject");
              setdescascvalue("desc");
              fetchsupportTicket();
            }}
            className="cursor_pinter_add"
          />
        </div>
        <div className="col-lg-2   col-md-2 col-sm-2">
          Entity{" "}
          <img
            src={up_arrow}
            onClick={() => {
              setsubjectvalue("product_category");
              setdescascvalue("asc");
              fetchsupportTicket();
            }}
            className="cursor_pinter_add"
          />
          <img
            src={down_arrow}
            onClick={() => {
              setsubjectvalue("product_category");
              setdescascvalue("desc");
              fetchsupportTicket();
            }}
            className="cursor_pinter_add"
          />
        </div>
        <div className="col-lg-1   col-md-1 col-sm-1">Reason</div>
        <div className="col-lg-2   col-md-2 col-sm-2">
          Date{" "}
          <img
            src={up_arrow}
            onClick={() => {
              setsubjectvalue("created_at");
              setdescascvalue("asc");
              fetchsupportTicket();
            }}
            className="cursor_pinter_add"
          />
          <img
            src={down_arrow}
            onClick={() => {
              setsubjectvalue("created_at");
              setdescascvalue("desc");
              fetchsupportTicket();
            }}
            className="cursor_pinter_add"
          />
        </div>
        <div className="col-lg-2   col-md-2 col-sm-2">
          Last Message{" "}
          <img
            src={up_arrow}
            //  onClick={() => {
            //   setsubjectvalue("last message");
            //   setdescascvalue("asc");
            // }}
          />
          <img
            src={down_arrow}
            //  onClick={() => {
            //   setsubjectvalue("last massage");
            //   setdescascvalue("desc");
            // }}
          />
        </div>
        <div className="col-lg-2   col-md-2 col-sm-2">
          Solved{" "}
          <img
            src={up_arrow}
            //  onClick={() => {
            //   setsubjectvalue("solved");
            //   setdescascvalue("asc");
            // }}
          />
          <img
            src={down_arrow}
            //  onClick={() => {
            //   setsubjectvalue("solved");
            //   setdescascvalue("desc");
            // }}
          />
        </div>
      </div>

      <>
        <div className="row ">
          <div className="accordion-container">
            {supportTicket ? (
              supportTicket?.map((data, index) => (
                <div key={index} className="mt-2">
                  <button
                    className={`support_ticket_accordian ${
                      activeIndex === index ? "activest" : ""
                    }`}
                    onClick={() => {
                      togglePanel(index);
                      storeid(data.user_id);
                    }}

                  >
                    <div className="row">
                      <div
                        className={`${
                          activeIndex === index
                            ? "col-lg-6 col-md-6 col-sm-6"
                            : "col-lg-2 col-md-2 col-sm-2"
                        }`}
                      >
                        <p className="accordian_st_first_heading_1">
                          {activeIndex === index
                            ? data?.subject?.slice(0, 100)
                            : data?.subject?.length > 10
                            ? data?.subject?.slice(0, 10) + "..."
                            : data?.subject}
                        </p>
                        {/* <p className="accordian_first_heading_2">
                     
                        Mechanicsville, MD
                      </p> */}
                      </div>
                      <div
                        className={`${
                          activeIndex === index
                            ? "col-lg-1 col-md-1 col-sm-1"
                            : "col-lg-2 col-md-2 col-sm-2"
                        }`}
                      >
                        <p className="accordian_st_first_heading_1">
                          {activeIndex === index ? "" : data?.product_category}
                        </p>
                      </div>
                      <div
                        className={`${
                          activeIndex === index
                            ? "col-lg-1 col-md-1 col-sm-1"
                            : "col-lg-1 col-md-1 col-sm-1"
                        }`}
                      ></div>
                      <div
                        className={`${
                          activeIndex === index
                            ? "col-lg-1 col-md-1 col-sm-1"
                            : "col-lg-2 col-md-2 col-sm-2"
                        }`}
                      >
                        <p className="accordian_st_timing_1">
                          {/* {separateDateAndTime(data?.created_at)} */}
                          {activeIndex === index
                            ? ""
                            : separateDateAndTime(data?.created_at)}
                        </p>
                        {/* <p className="accordian_st_timing_1">
                        {activeIndex === index ? "" : "04:53 AM"}
                      </p> */}
                      </div>

                      <div
                        className={`${
                          activeIndex === index
                            ? "col-lg-1 col-md-1 col-sm-1"
                            : "col-lg-2 col-md-2 col-sm-2"
                        }`}
                      >
                        <p className="accordian_st_timing_1">
                          {activeIndex === index
                            ? ""
                            : separateDateAndTime(data?.last_message)}
                          {/* {activeIndex === index ? "" : "10.04.2022"} */}
                        </p>
                        {/* <p className="accordian_st_timing_1">
                        {activeIndex === index ? "" : "04:53 AM"}
                      </p> */}
                      </div>
                      <div
                        className={`${
                          activeIndex === index
                            ? "col-lg-1 col-md-1 col-sm-1"
                            : "col-lg-2 col-md-2 col-sm-2"
                        }`}
                      >
                        <p className="accordian_st_timing_1">
                          {activeIndex === index
                            ? ""
                            : separateDateAndTime(data?.solved)}
                          {/* {activeIndex === index ? "" : "10.04.2022"} */}
                        </p>
                      </div>
                      <div
                        className={`${
                          activeIndex === index
                            ? "col-lg-1 col-md-1 col-sm-1"
                            : "col-lg-1 col-md-1 col-sm-1"
                        }`}
                      >
                        <p
                          className="more_detail_st"
                          style={{
                            color:
                              activeIndex === index ? "#868686" : "#3B50C8",
                          }}
                        >
                          <img
                            src={activeIndex === index ? hide_st : eye}
                            alt="icon"
                          />
                          {activeIndex === index
                            ? " Hide Details"
                            : " More Details"}
                        </p>
                      </div>
                    </div>
                  </button>

                  <div
                    className="panelst"
                    style={{
                      maxHeight: activeIndex === index ? "fit-content" : "0",

                      transition: "max-height 0.4s ease-out",
                    }}
                  >
                    <div className="row mb-3">
                      <div className="main_message_div">
                        <div className="col-lg-12 incoming_message_div">
                          <div class="d-flex justify-content-between">
                            <div>
                              <p className="name_upcoming_person">
                                {data.user.first_name} {data.user.last_name}{" "}
                              </p>
                            </div>
                            <div>
                              <p className="name_upcoming_person">
                                {separateDateAndTimeinrow(data?.created_at)}
                              </p>
                            </div>
                          </div>
                          <div className="div_upcoming_message">
                            <p className="message_upcoming">
                              {data?.request_details}
                            </p>
                          </div>

                          {data?.file == null ? null : (
                            <div className="download_div_main row">
                              <div className="col-lg-2 col-md-2 col-2">
                                <img
                                  src={picicon}
                                  className="download_picture_style"
                                />
                              </div>
                              <div className="col-lg-8 col-md-8 col-8">
                                <p className="file_name_download">
                                  {" "}
                                  {data?.file.slice(0, 20)}
                                </p>
                              </div>
                              <div className="col-lg-2 col-md-2 col-2">
                                <a
                                  href={data.file_url}
                                  download={data?.file}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {" "}
                                  <img
                                    src={downloadpic}
                                    className="download_picture_style"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Click for download file"
                                  />
                                </a>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* {message_support_ticket ? (
                        <div className="col-lg-12 incoming_message_div">
                          <div class="d-flex justify-content-between">
                            <div>
                              <p className="name_upcoming_person">
                                {
                                  message_support_ticket?.message?.user
                                    ?.first_name
                                }{" "}
                                {
                                  message_support_ticket?.message?.user
                                    ?.last_name
                                }
                              </p>
                            </div>
                            <div>
                              <p className="name_upcoming_person">
                                {separateDateAndTime(
                                  message_support_ticket?.message?.updated_at
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="div_upcoming_message">
                            <p className="message_upcoming">
                              {message_support_ticket?.message?.message}
                            </p>
                          </div>
                        </div>
                      ) : null} */}

                        {data?.messages?.map((mesgdata, index) => (
                          <div
                            className={`col-lg-12 ${
                              mesgdata.sender.id === getuseridforchangingclass
                                ? "incoming_message_div"
                                : "outgoing_message_div"
                            }`}
                          >
                            <div class="d-flex justify-content-between">
                              <div>
                                <p className="name_upcoming_person">
                                  {mesgdata.sender.first_name}{" "}
                                  {mesgdata.sender.last_name}{" "}
                                </p>
                              </div>
                              <div>
                                <p className="name_upcoming_person">
                                  {separateDateAndTimeinrow(
                                    mesgdata.updated_at
                                  )}
                                </p>
                              </div>
                            </div>
                            <div className="div_upcoming_message">
                              <p className="message_upcoming">
                                {mesgdata.message}
                              </p>
                            </div>
                            {mesgdata?.file == null ? null : (
                              <div className="download_div_main row">
                                <div className="col-lg-2 col-md-2 col-2">
                                  <img
                                    src={picicon}
                                    className="download_picture_style"
                                  />
                                </div>
                                <div className="col-lg-8 col-md-8 col-8">
                                  {" "}
                                  <p className="file_name_download">
                                    {" "}
                                    {mesgdata?.file.slice(0, 20)}
                                  </p>
                                </div>
                                <div className="col-lg-2 col-md-2 col-2">
                                  <a
                                    href={mesgdata.file_url}
                                    download={mesgdata?.file}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <img
                                      src={downloadpic}
                                      className="download_picture_style1"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Click for download file"
                                    />
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <form onSubmit={handleSubmitmessage}>
                        <div className="row">
                          {/* <div className="col-lg-3">
                        <div className=" subject_input_div">
                          <input
                            placeholder="Subject"
                            className="input_field_subject"
                          />
                        </div>
                      </div> */}

                          <div className="col-lg-10 col-md-12 col-12">
                            <div className="message_input_div row">
                              <div className="col-lg-10 col-md-8 col-8">
                                <textarea
                                  required
                                  rows="2"
                                  placeholder="Message"
                                  className="input_field_message"
                                  value={mesg_send_to_user}
                                  onChange={(e) => {
                                    setmesg_send_to_user(e.target.value);
                                    setgetticketid(data?.id);
                                  }}
                                />
                              </div>
                              <div className="col-lg-2 col-md-4 col-4">
                                <div className="row uploadfile_div">
                                  <div className="col-lg-12 col-md-12 col-12">
                                    <input
                                      type="file"
                                      onChange={handleFileChangeSt}
                                    />
                                    <img
                                      src={upload_file_st}
                                      className="uploadfileiconst"
                                    />
                                    <p
                                      className="parauploadfilest"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="click to upload file"
                                    >
                                      Upload File
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-2 col-md-12 col-12">
                            <button
                              className="message_button_send"
                              type="submit"
                            >
                              <img src={message_icon} />
                              Send
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <SpinnerLoader />
            )}
          </div>
        </div>

        <>
          {" "}
          <TicketandLiveChat />
        </>
      </>

      {totalPages > 0 && (
        <div className="pagination_main_div_st">
       <Pagination
            activePage={currentPage}
            itemsCountPerPage={itemsCountPerPages}
            totalItemsCount={totalPages}
            pageRangeDisplayed={5} // Number of page links to display
            onChange={handlePageChange}
            prevPageText={'Previous'}
            nextPageText={'Next'}
            firstPageText={'First'}
            lastPageText={'Last'}
            innerClass={'pagination'}
            itemClass={'page-item'}
            linkClass={'page-link'}
            activeLinkClass={'active'}
            disabledClass={'disabled'}
          />
        </div>
      )}
    </>
  );
}

export default SupportTicket;
