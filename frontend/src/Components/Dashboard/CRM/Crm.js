import React, { useEffect, useRef, useState } from "react";
import "./../CRM/CrmStyle.css";
import "bootstrap/dist/css/bootstrap.min.css";
import repairneeded from "./../../../Assets/repair_needed.png";
import owned from "./../../../Assets/owned_it.png";
import bathrrom from "./../../../Assets/bathroom.png";
import typeofhouse from "./../../../Assets/type of house.png";
import zip from "./../../../Assets/zip.png";
import propcondition from "./../../../Assets/prop_condition.png";
import yearofconstruction from "./../../../Assets/construction.png";
import bedroom from "./../../../Assets/bedroom.png";
import squarefootage from "./../../../Assets/squarefootage.png";
import eye from "./../../../Assets/eye_image.png";
import up from "./../../../Assets/up_icon.png";
import up_arrow from "./../../../Assets/up_arrow_crm.png";
import down_arrow from "./../../../Assets/down_arrow_crm.png";
import axios from "axios";
import { Alert, Stack } from "@mui/material";
import premium_image from "./../../../Assets/premium_content_only.png";
import ScrollTop from "../ScrollTop/ScrollTop";
import TicketandLiveChat from "../TicketAndLiveChat/TicketandLiveChat";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "react-js-pagination";
import SpinnerLoader from "../SpinnerLoader/SpinnerLoader";
import serach_icon from "./../../../Assets/crm_serach_icon.png";

import price_icon from "./../../../Assets/price_icon_crm.png";
import name_icon from "./../../../Assets/name_icon_crm.png";
import status_icon from "./../../../Assets/status_icon_crm.png";
import downarrowforsearch from "./../../../Assets/downarrowforsearch.png";
import CustomNotification from "../CustomNotification/CustomNotification";
import RedNotification from "../CustomNotification/RedNotification";

function Crm() {
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

  // Function to toggle the active panel
  const togglePanel = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  const token = localStorage.getItem("token");
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const [descascvalue, setdescascvalue] = useState("");
  const [descascsourcevalue, setdescascsourcevalue] = useState("");
  const [descasnamevalue, setdescasnamevalue] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  useEffect(() => {
    if (errorMessage) {
      const timeout = setTimeout(() => {
        seterrorMessage("");
      }, 5000);

      return () => clearTimeout(timeout); // Clear the timeout when the component unmounts
    }
  }, [errorMessage]);

  const [crmData, setCrmData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsCountPerPages, setitemsCountPerPages] = useState(0);
  const [lastpage, setlastpage] = useState(0);

  const [subscriptionPackages, setsubscriptionPackages] = useState(false);

  const [minimumprice, setminimumprice] = useState("0");
  const [maximumprice, setmaximumprice] = useState("1500000");
  const [selectedOptionprice, setSelectedOptionprice] = useState("");
  const [selectedOptionname, setSelectedOptionname] = useState(""); // name store here use it for payload
  const [freesearch, setfreesearch] = useState("");

  const handleInputChangefreesearch = (event) => {
    setfreesearch(event.target.value);
  };

  useEffect(() => {
    getCrmData();
  }, [
    currentPage,
    minimumprice,
    maximumprice,
    selectedOptionname,
    selectedOptionprice,
    freesearch,
  ]);

  const getCrmData = () => {
    axiosInstance
      .get(
        `/api/dashboard/get-crm-data?page=${currentPage}&search_term=${freesearch}&price_sort=${descascvalue}&price_min=${minimumprice}&price_max=${maximumprice}&seller_name=${selectedOptionname}&source_sort=${descascsourcevalue}&seller_name_sort=${descasnamevalue}`
      )
      .then((res) => {
        setCrmData(res?.data?.data);
        setTotalPages(res?.data?.data?.total);
        setitemsCountPerPages(res?.data?.data?.per_page);
        setlastpage(res?.data?.data?.last_page);
        setsubscriptionPackages(res?.data?.is_premium_user);
      });
    // .catch((e) => {
    //   if (e.response.status == 404) {
    //     seterrorMessage(e.response.data.message);

    //     setnotificationMessageRed(e.response.data.message);
    //     setTimeout(() => {
    //       setnotificationMessageRed("");
    //     }, 4000);
    //   } else {
    //     seterrorMessage(e.response.data.message);

    //     setnotificationMessageRed(e.response.data.message);
    //     setTimeout(() => {
    //       setnotificationMessageRed("");
    //     }, 4000);
    //   }
    // });
  };

  const getascorderprice = () => {
    setdescascsourcevalue("");
    setdescasnamevalue("");
    setdescascvalue("asc");
    getCrmData();
  };
  const getdescorderprice = () => {
    setdescascsourcevalue("");
    setdescasnamevalue("");
    setdescascvalue("desc");
    getCrmData();
  };

  const getascordersource = () => {
    setdescasnamevalue("");
    setdescascvalue("");
    setdescascsourcevalue("asc");
    getCrmData();
  };
  const getdescordersource = () => {
    setdescasnamevalue("");
    setdescascvalue("");
    setdescascsourcevalue("desc");
    getCrmData();
  };

  const getascordername = () => {
    setdescascvalue("");
    setdescascsourcevalue("");
    setdescasnamevalue("asc");
    getCrmData();
  };
  const getdescordername = () => {
    setdescascvalue("");
    setdescascsourcevalue("");
    setdescasnamevalue("desc");
    getCrmData();
  };

  const [sellernamedata, setsellernamedata] = useState("");

  //axios call to get the sellername data
  useEffect(() => {
    fetchsellernamedata();
  }, []);
  const fetchsellernamedata = () => {
    axiosInstance.get(`/api/dashboard/get-all-sellers`).then((res) => {
      setsellernamedata(res?.data?.data);
    });
  };
  console.log(sellernamedata, "sellernamedata crm");

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const [statedata, setStateData] = useState("");
  useEffect(() => {
    getStatedata();
  }, []);

  const getStatedata = () => {
    axios.get(`/api/get-states`).then((res) => {
      setStateData(res.data.data);
    });
  };

  console.log(statedata, "statedata crm");
  const [page, setPage] = useState(1);

  const PriceRanges = [
    { label: "0 to 50k", min: "0", max: "50000" },
    { label: "50k to 100k", min: "50000", max: "100000" },
    { label: "100k to 150k", min: "100000", max: "150000" },
    { label: "150k to 200k", min: "150000", max: "200000" },
    { label: "200k to 250k", min: "200000", max: "250000" },
    { label: "250k above", min: "250000", max: "" },
  ];

  // select states
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filter, setFilter] = useState("");

  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value.toUpperCase());
  };

  const handleOptionChange = (option) => {
    setSelectedOptionprice(option);
    setDropdownOpen(false);
  };

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    const closeDropdownOnOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", closeDropdownOnOutsideClick);
    } else {
      document.removeEventListener("mousedown", closeDropdownOnOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", closeDropdownOnOutsideClick);
    };
  }, [dropdownOpen]);

  // Close the dropdown when scrolling
  useEffect(() => {
    const closeDropdownOnScroll = () => {
      setDropdownOpen(false);
    };

    if (dropdownOpen) {
      window.addEventListener("scroll", closeDropdownOnScroll);
    } else {
      window.removeEventListener("scroll", closeDropdownOnScroll);
    }

    return () => {
      window.removeEventListener("scroll", closeDropdownOnScroll);
    };
  }, [dropdownOpen]);

  // select name
  const [dropdownOpenname, setDropdownOpenname] = useState(false);
  const [filtername, setFiltername] = useState("");

  const dropdownRefname = useRef(null);

  useEffect(() => {
    // Add event listeners when the component mounts
    document.addEventListener("click", handleOutsideClick);
    window.addEventListener("scroll", handleScroll);

    // Remove event listeners when the component unmounts
    return () => {
      document.removeEventListener("click", handleOutsideClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleDropdownname = () => {
    setDropdownOpenname(!dropdownOpenname);
  };

  const handleFilterChangename = (event) => {
    setFiltername(event.target.value.toUpperCase());
  };

  const handleOptionChangename = (option) => {
    setSelectedOptionname(option);
    setDropdownOpenname(false);
  };

  const handleOutsideClick = (event) => {
    if (
      dropdownRefname.current &&
      !dropdownRefname.current.contains(event.target)
    ) {
      // Clicked outside the dropdown, close it
      setDropdownOpenname(false);
    }
  };

  const handleScroll = () => {
    // Scrolling detected, close the dropdown
    setDropdownOpenname(false);
  };

  // select status
  const [dropdownOpenstatus, setDropdownOpenstatus] = useState(false);
  const [filterstatus, setFilterstatus] = useState("");
  const [selectedOptionstatus, setSelectedOptionstatus] = useState(""); // status store here use it for payload
  const dropdownRefstatus = useRef(null);

  useEffect(() => {
    // Add event listeners when the component mounts
    document.addEventListener("click", handleOutsideClickname);
    window.addEventListener("scroll", handleScrollname);

    // Remove event listeners when the component unmounts
    return () => {
      document.removeEventListener("click", handleOutsideClickname);
      window.removeEventListener("scroll", handleScrollname);
    };
  }, []);

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

  const handleOutsideClickname = (event) => {
    if (
      dropdownRefstatus.current &&
      !dropdownRefstatus.current.contains(event.target)
    ) {
      // Clicked outside the dropdown, close it
      setDropdownOpenstatus(false);
    }
  };

  const handleScrollname = () => {
    // Scrolling detected, close the dropdown
    setDropdownOpenstatus(false);
  };

  console.log(crmData, "lead data crm");

  const clearfilterscrm = () => {
    setminimumprice("0");
    setmaximumprice("1500000");
    setSelectedOptionprice("");
    setSelectedOptionname("");
    setfreesearch("");
    getCrmData();
  };

  const [crmid, setcrmid] = useState("");

  const [reminderDateTime, setReminderDateTime] = useState({
    date: "",
    time: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [notificationMessageRed, setnotificationMessageRed] = useState(null);
  const [notificationMessage, setnotificationMessage] = useState(null);


  const modalreminder = useRef(null);

  const saveChanges = (e) => {
    e.preventDefault();
    let payload = {
      reminder: reminderDateTime,
    };
    axiosInstance
      .put(`/api/dashboard/orders/${crmid}/update-reminder`, payload)
      .then((r) => {
        console.log(r, "r after success remider");
        setnotificationMessage(r?.data?.message);
        modalreminder.current.click();
        getCrmData();
        setReminderDateTime({
          date: "", // Set default date or get it from data
          time: "", // Set default time or get it from data
        });
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
      <div className="row ">
        <div className="col-lg-10 col-md-10 col-12">
          <div className="main_div_search_crm">
            <img src={serach_icon} className="search_icon_style_crm" />
            <input
              className="input_search_field_crm"
              placeholder="Search"
              value={freesearch}
              onChange={handleInputChangefreesearch}
            />
            <a className="vertical_line mx-3"></a>
            <img src={price_icon} className="search_icon_style_crm" />

            <div className="dropdown" ref={dropdownRef}>
              <button onClick={toggleDropdown} className="dropbtn">
                {selectedOptionprice
                  ? selectedOptionprice && selectedOptionprice.length > 9
                    ? `${selectedOptionprice.slice(0, 7)}...`
                    : selectedOptionprice || "Price"
                  : "Price"}
              </button>
              <div
                id="myDropdown"
                className={`dropdown-content ${dropdownOpen ? "show" : ""}`}
              >
                <input
                  type="text"
                  placeholder="Search.."
                  id="myInput"
                  onKeyUp={handleFilterChange}
                />
                {Array.isArray(PriceRanges) ? (
                  PriceRanges.filter((item) =>
                    item.label.toUpperCase().includes(filter)
                  ).map((item) => (
                    <a
                      key={item.label} // Use a unique identifier, e.g., item.label
                      onClick={() => {
                        handleOptionChange(item.label);
                        setmaximumprice(item.max);
                        setminimumprice(item.min);
                      }}
                    >
                      {item.label}
                    </a>
                  ))
                ) : (
                  <SpinnerLoader />
                )}
              </div>
            </div>
            <img
              src={downarrowforsearch}
              className="search_icon_style_crm"
              onClick={toggleDropdown}
            />

            <a className="vertical_line mx-3"></a>
            <img src={name_icon} className="search_icon_style_crm" />
            <div className="dropdown" ref={dropdownRefname}>
              <button onClick={toggleDropdownname} className="dropbtn">
                {selectedOptionname
                  ? selectedOptionname && selectedOptionname.length > 8
                    ? `${selectedOptionname.slice(0, 7)}...`
                    : selectedOptionname || "Name"
                  : "Name"}
              </button>
              <div
                id="myDropdown"
                className={`dropdown-content ${dropdownOpenname ? "show" : ""}`}
              >
                <input
                  type="text"
                  placeholder="Search.."
                  id="myInput"
                  onKeyUp={handleFilterChangename}
                />
                {sellernamedata ? (
                  sellernamedata
                    .filter((item) =>
                      item.full_name.toUpperCase().includes(filtername)
                    )
                    .map((item) => (
                      <a
                        key={item.id}
                        onClick={() => handleOptionChangename(item.full_name)}
                      >
                        {item.full_name}
                      </a>
                    ))
                ) : (
                  <SpinnerLoader />
                )}
              </div>
            </div>
            <img
              src={downarrowforsearch}
              className="search_icon_style_crm"
              onClick={toggleDropdownname}
            />

            {/* <a className="vertical_line mx-3"></a>
            <img src={status_icon} className="search_icon_style_crm" />
            <div className="dropdown" ref={dropdownRefstatus}>
              <button onClick={toggleDropdownstatus} className="dropbtn">
                {selectedOptionstatus
                  ? selectedOptionstatus && selectedOptionstatus.length > 8
                    ? `${selectedOptionstatus.slice(0, 7)}...`
                    : selectedOptionstatus || "Status"
                  : "Status"}
              </button>
              <div
                id="myDropdown"
                className={`dropdown-content ${
                  dropdownOpenstatus ? "show" : ""
                }`}
              >
                <input
                  type="text"
                  placeholder="Search.."
                  id="myInput"
                  onKeyUp={handleFilterChangestatus}
                />
                {statedata ? (
                  statedata
                    .filter((item) =>
                      item.name.toUpperCase().includes(filterstatus)
                    )
                    .map((item) => (
                      <a
                        key={item.id}
                        onClick={() => handleOptionChangestatus(item.name)}
                      >
                        {item.name}
                      </a>
                    ))
                ) : (
                  <SpinnerLoader />
                )}
              </div>
            </div>
            <img src={downarrowforsearch} className="search_icon_style_crm" /> */}
          </div>
        </div>
        <div className="col-lg-2 col-md-2 col-12">
          <button
            className="serach_button_crm_bought"
            onClick={clearfilterscrm}
          >
            Clear Filters
          </button>
        </div>
      </div>

      <>
        {/* {errorMessage ? (
          <div className="ml-4 mb-3">
            <Stack sx={{ width: "94%" }} spacing={3}>
              <Alert variant="outlined" severity="error">
                {errorMessage}
              </Alert>
            </Stack>
          </div>
        ) : null} */}
        <>
          <div className="container-fluid row main_div_crm_heading">
            <div className="col-lg-2  col-md-2 col-sm-12">
              Name{" "}
              <img
                src={up_arrow}
                className="cursor_pointer_crm"
                onClick={() => getascordername()}
              />
              <img
                src={down_arrow}
                className="cursor_pointer_crm"
                onClick={() => getdescordername()}
              />
            </div>
            <div className="col-lg-2   col-md-2 col-sm-12">
              Source{" "}
              <img
                src={up_arrow}
                className="cursor_pointer_crm"
                onClick={() => getascordersource()}
              />
              <img
                src={down_arrow}
                className="cursor_pointer_crm"
                onClick={() => getdescordersource()}
              />
            </div>
            <div className="col-lg-2   col-md-2 col-sm-12">
              Contract Status <img src={up_arrow} />
              <img src={down_arrow} />
            </div>
            <div className="col-lg-1   col-md-1 col-sm-12">
              Price{" "}
              <img
                src={up_arrow}
                className="cursor_pointer_crm"
                onClick={() => getascorderprice()}
              />
              <img
                src={down_arrow}
                className="cursor_pointer_crm"
                onClick={() => getdescorderprice()}
              />
            </div>
            <div className="col-lg-2   col-md-2 col-sm-12">
              Date <img src={up_arrow} />
              <img src={down_arrow} />
            </div>
            <div className="col-lg-2   col-md-2 col-sm-12">
              Reminder <img src={up_arrow} />
              <img src={down_arrow} />
            </div>
          </div>

          {crmData ? (
            crmData.data.length > 0 ? (
              crmData.data.map((data, index) => (
                <div key={index} className="mt-2">
                  <button
                    className={`accordioncrm ${
                      activeIndex === index ? "active1" : ""
                    }`}
                  >
                    <div className="row">
                      <div
                        className="col-lg-2 col-md-2"
                        onClick={() => togglePanel(index)}
                      >
                        <p className="accordian_first_heading_1">
                          {data?.full_name}
                        </p>
                        {/* <p className="accordian_first_heading_2">
                          {data?.lead?.city?.name}, {data?.lead?.state?.name}
                        </p> */}
                      </div>
                      <div
                        className="col-lg-2 col-md-2"
                        onClick={() => togglePanel(index)}
                      >
                        <p className="accordian_first_heading_2">
                          {data?.source.length > 22
                            ? data?.source.slice(0, 22)
                            : data?.source}
                        </p>
                        {/* <p className="accordian_first_heading_1">
                            Hedge Fund Offers
                          </p> */}
                      </div>
                      <div
                        className="col-lg-2 col-md-2"
                        onClick={() => togglePanel(index)}
                      ></div>
                      <div
                        className="col-lg-1 col-md-1"
                        onClick={() => togglePanel(index)}
                      >
                        <p className="accordian_first_heading_1">
                          ${data?.price}
                        </p>
                      </div>
                      <div
                        className="col-lg-2 col-md-2"
                        onClick={() => togglePanel(index)}
                      >
                        <p className="accordian_first_heading_1">
                          {data?.created_at}
                        </p>
                        {/* <p className="accordian_first_heading_1"> 04:53 AM</p> */}
                      </div>

                      {/* reminder date add there using modal  */}

                      <div className="col-lg-2 col-md-2">
                        <u>
                          {console.log(data, "crm data for idddddd ")}
                          <p
                            className="accordian_first_heading_1"
                            data-toggle="modal"
                            data-target="#exampleModalCenter"
                            onClick={() => {
                              setcrmid(data?.lead?.id);
                            }}
                          >
                            {data?.reminder === null
                              ? "Add Reminder"
                              : `${data?.reminder?.date} ${data?.reminder?.time}`}
                          </p>
                        </u>
                      </div>

                      <div
                        class="modal fade"
                        id="exampleModalCenter"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalCenterTitle"
                        aria-hidden="true"
                      >
                        <div
                          class="modal-dialog modal-dialog-centered"
                          role="document"
                        >
                          <div class="modal-content">
                            <form onSubmit={saveChanges}>
                              <div class="modal-header">
                                <h3
                                  class="modal-title reminder_title"
                                  id="exampleModalLongTitle"
                                >
                                  Add Reminder
                                </h3>
                                <button
                                  type="button"
                                  class="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                  ref={modalreminder}
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                <div className="form-group">
                                  <p htmlFor="reminderDate">Date</p>
                                  <input
                                    type="date"
                                    required
                                    className="form-control input_style_remider"
                                    id="reminderDate"
                                    value={reminderDateTime.date}
                                    onChange={(e) =>
                                      setReminderDateTime({
                                        ...reminderDateTime,
                                        date: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="form-group">
                                  <p htmlFor="reminderTime">Time</p>
                                  <input
                                    type="time"
                                    required
                                    className="form-control input_style_remider"
                                    id="reminderTime"
                                    value={reminderDateTime.time}
                                    onChange={(e) =>
                                      setReminderDateTime({
                                        ...reminderDateTime,
                                        time: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </div>
                              <div class="modal-footer">
                                {/* <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> */}
                                <button
                                  type="submit"
                                  class="save_button_remider"
                                  id={data?.lead?.id}
                                  // onClick={() => {
                                  //   saveChanges();
                                  // }}
                                >
                                  Save
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>

                      <div
                        className="col-lg-1 col-md-1"
                        onClick={() => togglePanel(index)}
                      >
                        <p
                          className="more_detail_crm"
                          style={{
                            color:
                              activeIndex === index ? "#FFFFFF" : "#3B50C8",
                          }}
                        >
                          {" "}
                          <img
                            src={activeIndex === index ? up : eye}
                            alt="icon"
                            className="size_of_icon_crm"
                          />
                          {activeIndex === index
                            ? " Hide Details"
                            : " More Details"}
                        </p>
                      </div>
                    </div>
                  </button>

                  <div
                    className="panel1"
                    style={{
                      maxHeight: activeIndex === index ? "fit-content" : "0",

                      transition: "max-height 0.4s ease-out",
                    }}
                  >
                    <div className="row mb-3">
                      <div className="col-lg-6 lead_data_scroll_added">
                        <p className="inner_accordian_heading_1">Lead Data</p>
                        <p className="inner_accordian_question_1">
                          Additional emails (skiptraced by Batch Skiptracing)
                        </p>

                        <div className="inner_accordian_div_answer_1">
                          <p className="inner_accordian_answer_1">
                            {data?.email}
                          </p>
                        </div>
                        {/* <div className="inner_accordian_div_answer_1">
                          <p className="inner_accordian_answer_1">
                  
                            {data?.lead?.seller?.seller_emails.map(
                              (emaildata, index) => (
                                <div className="row email_main_div" key={index}>
                                  <p className="col-lg-6 email_class_style">
                                    {emaildata?.email}
                                  </p>
                                </div>
                              )
                            )}
                          </p>

                         
                        </div> */}

                        <p className="inner_accordian_question_1 mt-3">
                          Full Name
                        </p>
                        <div className="inner_accordian_div_answer_1">
                          <p className="inner_accordian_answer_1">
                            {data?.full_name}
                          </p>
                        </div>

                        {/* <p className="inner_accordian_question_1 mt-3">Last Name</p>
                    <div className="inner_accordian_div_answer_1">
                      <p className="inner_accordian_answer_1">BoBo</p>
                    </div> */}

                        <p className="inner_accordian_question_1 mt-3">
                          Phone number (entered by seller)
                        </p>
                        <div className="inner_accordian_div_answer_1">
                          <p className="inner_accordian_answer_1">
                            {/* {data?.lead?.seller?.seller_phones.map(
                              (phonedata, index) => (
                                <div className="row email_main_div" key={index}>
                                  <p className="col-lg-6 email_class_style">
                                    {phonedata?.type == "primary"
                                      ? phonedata?.phone
                                      : ""}
                                  </p>
                                </div>
                              )
                            )} */}

                            {data?.phone}
                          </p>
                        </div>

                        <p className="inner_accordian_question_1 mt-3">
                          Additional phone numbers (skiptraced by Batch
                          Skiptracing)
                        </p>
                        <div className="inner_accordian_div_answer_1">
                          <p className="inner_accordian_answer_1">
                            {/* {data?.lead?.seller?.seller_phones.map(
                              (phonedata, index) => (
                                <div className="row email_main_div" key={index}>
                                  <p className="col-lg-6 email_class_style">
                                    {phonedata?.phone}
                                  </p>
                                </div>
                              )
                            )} */}

                             
    {data?.phone}
                          </p>
                        </div>

                        <p className="inner_accordian_question_1 mt-3">
                          Property Address
                        </p>
                        <div className="inner_accordian_div_answer_1">
                          <p className="inner_accordian_answer_1">
                            {data?.address}
                          </p>
                        </div>

                        <p className="inner_accordian_question_1 mt-3">City</p>
                        <div className="inner_accordian_div_answer_1">
                          <p className="inner_accordian_answer_1">
                            {data?.lead?.state?.name}
                          </p>
                        </div>

                        <p className="inner_accordian_question_1 mt-3">State</p>
                        <div className="inner_accordian_div_answer_1">
                          <p className="inner_accordian_answer_1">
                            {data?.lead?.city?.name}
                          </p>
                        </div>

                        <p className="inner_accordian_question_1 mt-3">
                          Garage
                        </p>
                        <div className="inner_accordian_div_answer_1">
                          <p className="inner_accordian_answer_1">
                            {data?.garage}
                          </p>
                        </div>

                        <p className="inner_accordian_question_1 mt-3">
                          What is the current condition of the property?
                        </p>
                        <div className="inner_accordian_div_answer_1">
                          <p className="inner_accordian_answer_1">
                            {data?.property_condition}
                          </p>
                        </div>

                        <p className="inner_accordian_question_1 mt-3">
                          What kind of repairs and maintenance does the property
                          need?
                        </p>
                        <div className="inner_accordian_div_answer_1">
                          <p className="inner_accordian_answer_1">
                            {data?.repairs_needed}
                          </p>
                        </div>

                        <p className="inner_accordian_question_1 mt-3">
                          Is there anyone living on the property?
                        </p>
                        <div className="inner_accordian_div_answer_1">
                          <p className="inner_accordian_answer_1">
                            {data?.occupancy}
                          </p>
                        </div>

                        <p className="inner_accordian_question_1 mt-3">
                          When do you want to finalize the sale of your home?
                        </p>
                        <div className="inner_accordian_div_answer_1">
                          <p className="inner_accordian_answer_1">
                            {data?.ideal_selling_timeframe}
                          </p>
                        </div>

                        {/* <p className="inner_accordian_question_1 mt-3">
                              What best describes why you want to sell?
                            </p>
                            <div className="inner_accordian_div_answer_1">
                              <p className="inner_accordian_answer_1">
                                Moving closer to family
                              </p>
                            </div> */}

                        <p className="inner_accordian_question_1 mt-3">
                          Are you the owner of this property or an
                          agent/wholesaler selling this property?
                        </p>
                        <div className="inner_accordian_div_answer_1">
                          <p className="inner_accordian_answer_1">
                            {data?.owner_wholesaler}
                          </p>
                          {console.log(data?.lead, "leads data")}
                        </div>

                        <p className="inner_accordian_question_1 mt-3">
                          How long have you owned the property? (In years)
                        </p>
                        <div className="inner_accordian_div_answer_1">
                          <p className="inner_accordian_answer_1">
                            {" "}
                            {data?.how_long_you_owned}{" "}
                          </p>
                        </div>

                        <p className="inner_accordian_question_1 mt-3">
                          Is there a mortgage on the house?
                        </p>
                        <div className="inner_accordian_div_answer_1">
                          <p className="inner_accordian_answer_1">
                            {data?.mortgage}
                          </p>
                        </div>

                        <p className="inner_accordian_question_1 mt-3">
                          Is your property listed with a real estate agent?
                        </p>
                        <div className="inner_accordian_div_answer_1">
                          <p className="inner_accordian_answer_1">
                            {data?.listed_with_real_estate_agent}
                          </p>
                        </div>
                      </div>

                      {subscriptionPackages === false ? (
                        <>
                          <div className="col-lg-6 ">
                            <p className="inner_accordian_heading_1">
                              Premium Details
                            </p>

                            <div
                              className="row"
                              onMouseEnter={handleHover}
                              onMouseLeave={handleMouseLeave}
                              style={{
                                position: "relative",
                                maxWidth: "100%", // Set the maximum width for the container
                              }}
                            >
                              {isHovered && (
                                <div
                                  style={{
                                    position: "absolute",
                                    left: "0px",
                                    zIndex: 1,
                                    width: "100%", // Set the width of the image container to 100%
                                    height: "auto",
                                  }}
                                >
                                  <img
                                    src={premium_image}
                                    alt="Hovered Image"
                                    style={{
                                      width: "100%", // Set the width of the image to 100%
                                      height: "auto",
                                    }}
                                  />
                                </div>
                              )}

                              {/* <div className="show_premium_image">
                            <img src={premium_image} />
                          </div> */}

                              <div className="col-lg-6 mb-2 mt-2 ">
                                <div className="row">
                                  <div className="col-lg-1 col-md-1 col-1">
                                    <img src={repairneeded} />
                                  </div>
                                  <div className="col-lg-10 col-md-10 col-10">
                                    <p className="question_premium_details">
                                      Repairs needed
                                    </p>
                                    <p className="answer_premium_details">
                                      dummy
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="col-lg-6 mb-2 mt-2">
                                <div className="row">
                                  <div className="col-lg-1 col-md-1 col-1">
                                    <img src={propcondition} />
                                  </div>
                                  <div className="col-lg-10 col-md-10 col-10">
                                    <p className="question_premium_details">
                                      Prop. condition
                                    </p>
                                    <p className="answer_premium_details">
                                      dummy data
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="col-lg-6 mb-2 mt-2">
                                <div className="row">
                                  <div className="col-lg-1 col-md-1 col-1">
                                    <img src={owned} />
                                  </div>
                                  <div className="col-lg-10 col-md-10 col-10">
                                    <p className="question_premium_details">
                                      How long have you owned it?
                                    </p>
                                    <p className="answer_premium_details">
                                      dummy data
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="col-lg-6 mb-2 mt-2">
                                <div className="row">
                                  <div className="col-lg-1 col-md-1 col-1">
                                    <img src={yearofconstruction} />
                                  </div>
                                  <div className="col-lg-10 col-md-10 col-10">
                                    <p className="question_premium_details">
                                      Year of construction
                                    </p>
                                    <p className="answer_premium_details">
                                      dummy
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="col-lg-6 mb-2 mt-2">
                                <div className="row">
                                  <div className="col-lg-1 col-md-1 col-1">
                                    <img src={bathrrom} />
                                  </div>
                                  <div className="col-lg-10 col-md-10 col-10">
                                    <p className="question_premium_details">
                                      Bathrooms
                                    </p>
                                    <p className="answer_premium_details">
                                      dummy
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="col-lg-6 mb-2 mt-2">
                                <div className="row">
                                  <div className="col-lg-1 col-md-1 col-1">
                                    <img src={bedroom} />
                                  </div>
                                  <div className="col-lg-10 col-md-10 col-10">
                                    <p className="question_premium_details">
                                      Bedrooms
                                    </p>
                                    <p className="answer_premium_details">
                                      dummy
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="col-lg-6 mb-2 mt-2">
                                <div className="row">
                                  <div className="col-lg-1 col-md-1 col-1">
                                    <img src={typeofhouse} />
                                  </div>
                                  <div className="col-lg-10 col-md-10 col-10">
                                    <p className="question_premium_details">
                                      Type of house
                                    </p>
                                    <p className="answer_premium_details">
                                      dummy
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="col-lg-6 mb-2 mt-2">
                                <div className="row">
                                  <div className="col-lg-1 col-md-1 col-1">
                                    <img src={squarefootage} />
                                  </div>
                                  <div className="col-lg-10 col-md-10 col-10">
                                    <p className="question_premium_details">
                                      square footage
                                    </p>
                                    <p className="answer_premium_details">
                                      dummy
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="col-lg-6 mb-2 mt-2">
                                <div className="row">
                                  <div className="col-lg-1 col-md-1 col-1">
                                    <img src={zip} />
                                  </div>
                                  <div className="col-lg-10 col-md-10 col-10">
                                    <p className="question_premium_details">
                                      ZIP code
                                    </p>
                                    <p className="answer_premium_details">
                                      dummy data
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="col-lg-6 ">
                            <p className="inner_accordian_heading_1">
                              Premium Details
                            </p>

                            <div className="row ">
                              {/* <div className="show_premium_image">
                            <img src={premium_image} />
                          </div> */}
                              {/* {isHovered && (
                                    <div
                                      style={{
                                        position: "absolute",
                                        left: "0px",
                                        zIndex: 1,
                                        maxWidth: "100%",
                                        width: "90%",
                                        height: "auto",
                                      }}
                                    >
                                      <img
                                        src={premium_image}
                                        alt="Hovered Image"
                                        style={{
                                          width: "100%",
                                          height: "auto",
                                        }}
                                      />
                                    </div>
                                  )} */}
                              <div className="col-lg-6 mb-2 mt-2">
                                <div className="row">
                                  <div className="col-lg-1 col-md-1 col-1">
                                    <img src={repairneeded} />
                                  </div>
                                  <div className="col-lg-10 col-md-10 col-10">
                                    <p className="question_premium_details">
                                      Repairs needed
                                    </p>
                                    <p className="show_subscription_premier_answer">
                                      {data?.repairs_needed}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="col-lg-6 mb-2 mt-2">
                                <div className="row">
                                  <div className="col-lg-1 col-md-1 col-1">
                                    <img src={propcondition} />
                                  </div>
                                  <div className="col-lg-10 col-md-10 col-10">
                                    <p className="question_premium_details">
                                      Prop. condition
                                    </p>
                                    <p className="show_subscription_premier_answer">
                                      {data?.property_condition}
                                      {/* dummy data */}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="col-lg-6 mb-2 mt-2">
                                <div className="row">
                                  <div className="col-lg-1 col-md-1 col-1">
                                    <img src={owned} />
                                  </div>
                                  <div className="col-lg-10 col-md-10 col-10">
                                    <p className="question_premium_details">
                                      How long have you owned it?
                                    </p>
                                    <p className="show_subscription_premier_answer">
                                      {data?.how_long_you_owned}
                                      {/* dummy data */}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="col-lg-6 mb-2 mt-2">
                                <div className="row">
                                  <div className="col-lg-1 col-md-1 col-1">
                                    <img src={yearofconstruction} />
                                  </div>
                                  <div className="col-lg-10 col-md-10 col-10">
                                    <p className="question_premium_details">
                                      Year of construction
                                    </p>
                                    <p className="show_subscription_premier_answer">
                                      {data?.year_of_construction}
                                      {/* dummy */}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="col-lg-6 mb-2 mt-2">
                                <div className="row">
                                  <div className="col-lg-1 col-md-1 col-1">
                                    <img src={bathrrom} />
                                  </div>
                                  <div className="col-lg-10 col-md-10 col-10">
                                    <p className="question_premium_details">
                                      Bathrooms
                                    </p>
                                    <p className="show_subscription_premier_answer">
                                      {data?.baths}
                                      {/* dummy */}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="col-lg-6 mb-2 mt-2">
                                <div className="row">
                                  <div className="col-lg-1 col-md-1 col-1">
                                    <img src={bedroom} />
                                  </div>
                                  <div className="col-lg-10 col-md-10 col-10">
                                    <p className="question_premium_details">
                                      Bedrooms
                                    </p>
                                    <p className="show_subscription_premier_answer">
                                      {data?.beds}
                                      {/* dummy */}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="col-lg-6 mb-2 mt-2">
                                <div className="row">
                                  <div className="col-lg-1 col-md-1 col-1">
                                    <img src={typeofhouse} />
                                  </div>
                                  <div className="col-lg-10 col-md-10 col-10">
                                    <p className="question_premium_details">
                                      Type of house
                                    </p>
                                    <p className="show_subscription_premier_answer">
                                      {data?.type_of_house}
                                      {/* dummy */}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="col-lg-6 mb-2 mt-2">
                                <div className="row">
                                  <div className="col-lg-1 col-md-1 col-1">
                                    <img src={squarefootage} />
                                  </div>
                                  <div className="col-lg-10 col-md-10 col-10">
                                    <p className="question_premium_details">
                                      square footage
                                    </p>
                                    <p className="show_subscription_premier_answer">
                                      {data?.square_footage}
                                      {/* dummy */}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="col-lg-6 mb-2 mt-2">
                                <div className="row">
                                  <div className="col-lg-1 col-md-1 col-1">
                                    <img src={zip} />
                                  </div>
                                  <div className="col-lg-10 col-md-10 col-10">
                                    <p className="question_premium_details">
                                      ZIP code
                                    </p>
                                    <p className="show_subscription_premier_answer">
                                      {data?.zip_code}
                                      {/* dummy data */}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no_data_found_div_crm">No CRM data found</div>
            )
          ) : (
            <SpinnerLoader />
          )}

          <>
            <TicketandLiveChat />
          </>
        </>
      </>
      {totalPages > 0 && (
        <div className="pagination_main_div_crm">
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
      <ScrollTop />
    </>
  );
}

export default Crm;
