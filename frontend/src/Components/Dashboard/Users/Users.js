import React, { useEffect, useState, useRef } from "react";
import "./../Users/UsersStyle.css";
import "./../SupportTicket/SupportTicketStyle.css";
import axios from "axios";
import Pagination from "react-js-pagination";
import search_icon from "./../../../Assets/search_icon.png";
import SpinnerLoader from "../SpinnerLoader/SpinnerLoader";
import user_logo from "./../../../Assets/user_logo_st.png";
import up_arrow_users from "./../../../Assets/up_arrow_crm.png";
import down_arrow_users from "./../../../Assets/down_arrow_crm.png";
import redellipse from "./../../../Assets/red_ellipse.png";
import greenellipse from "./../../../Assets/green_ellipse.png";
import downarrowforsearch from "./../../../Assets/downarrowforsearch.png";
import CustomNotification from "../CustomNotification/CustomNotification";
import RedNotification from "../CustomNotification/RedNotification";
function Users() {
  const [isVisible, setIsVisible] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
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

    window.addEventListener('scroll', toggleVisibility);
    scrollToTop();
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };


  }, []);
  
  const [activeIndex, setActiveIndex] = useState(-1); // State to keep track of the active panel index

  // Function to toggle the active panel
  const togglePanel = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsCountPerPages, setitemsCountPerPages] = useState(0);
  const [lastpage, setlastpage] = useState(0);

  // console.log(totalPages, "total pages");
  // console.log(itemsCountPerPages, "count per page");
  // console.log(lastpage, "number pgae");
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // GET USERS ROLE
  const [userrolelist, setuserrolelist] = useState([]);
  useEffect(() => {
    getUsersRoleData();
  }, []);

  const getUsersRoleData = () => {
    axiosInstance.get(`/api/dashboard/get-roles`).then((res) => {
      setuserrolelist(res?.data);
    });
  };

  //set roles dropdown
  const [useridforassignrole, setuseridforassignrole] = useState("");
  const handleuseridClick = (id) => {
    // Assuming userdata contains the user's role
    setuseridforassignrole(id);
  };

  const token = localStorage.getItem("token");
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  //set users dropdown

  const [dropdownOpenusers, setDropdownOpenusers] = useState(false);
  const [filterusers, setFilterusers] = useState("");
  const [selectedOptionusers, setSelectedOptionusers] = useState("");
  const dropdownRef = useRef(null);

  const toggleDropdownusers = () => {
    setDropdownOpenusers(!dropdownOpenusers);
  };

  const handleFilterChangeusers = (event) => {
    setFilterusers(event.target.value.toUpperCase());
  };

  const handleOptionChangeusers = (option) => {
    setSelectedOptionusers(option);
    setDropdownOpenusers(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpenusers(false);
      }
    };

    const handleScroll = () => {
      setDropdownOpenusers(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [UsersName, setUsersName] = useState("");

  useEffect(() => {
    fetchusers();
  }, []);
  const fetchusers = () => {
    axiosInstance
      .get("/api/dashboard/ticket-admin/get-all-usernames")
      .then((res) => {
        setUsersName(res);
      });
  };

  const [searchValue, setSearchValue] = useState("");
  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  //search bar support ticket
  const [selectproductcategory, setselectproductcategory] = useState("");
  const handleDropdownChange = (event) => {
    setselectproductcategory(event.target.value);
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

  const [selectusername, setselectusername] = useState("");
  const handleusernameDropdownChange = (event) => {
    setselectusername(event.target.value);
  };

  //   GETTING STATUS IN SERACHBAR

  const [statusgetting, setstatusgetting] = useState("");
  const handlegettingstatus = (event) => {
    setstatusgetting(event.target.value);
  };

  //upload file in message
  const [selectedFilest, setSelectedFilest] = useState(null);
  const handleFileChangeSt = (event) => {
    setSelectedFilest(event.target.files[0]);
    // setSelectedName(event.target.files[0].name);
  };

  //update the user status code start here
  const [userloginstatus, setuserloginstatus] = useState("");
  const [userloginstatusupdate, setuserloginstatusupdate] = useState("");

  // const [userloginstatuss, setUserLoginStatuss] = useState("");

  // const [userid, setuserid] = useState("");
  // console.log(userid, "user id");

  // update the user status
  const handleToggleChange = (userloginstatuss, userid) => {
    // Toggle the user status
    const newStatus = userloginstatuss === "active" ? "blocked" : "active";
    setuserloginstatusupdate(newStatus);

    // Send a PUT request to update the user status

    axiosInstance
      .put(`/api/dashboard/users/${userid}/status`, { status: newStatus })
      .then((response) => {
        fetchUsersData();
      })
      .catch((error) => {
        console.error("Error updating user status:", error);
      });
  };

  // update the integration status

  const [userintegrationupdate, setuserintegrationupdate] = useState("");
  const handleToggleIntegrationChange = (integrationstatus, userid) => {
    // Toggle the user status
    const newStatusintegration =
      integrationstatus === "active" ? "inactive" : "active";
    setuserintegrationupdate(newStatusintegration);

    // Send a PUT request to update the user status

    axiosInstance
      .put(`/api/dashboard/users/${userid}/integration/status`, {
        status: newStatusintegration,
      })
      .then((response) => {})
      .catch((error) => {
        console.error("Error updating user status:", error);
      });
  };

  const [notificationMessageRed, setnotificationMessageRed] = useState(null);
  const [notificationMessage, setnotificationMessage] = useState(null);

  //get the users data
  const [Users, setUsers] = useState("");


  const [subjectvalue, setsubjectvalue] = useState("name");
  const [descascvalue, setdescascvalue] = useState("asc");

  useEffect(() => {
    fetchUsersData();
  }, [
    currentPage,
    selectedOptionusers,
    userloginstatusupdate,
    userintegrationupdate,
    notificationMessage,
    searchValue
  ]);

  const fetchUsersData = () => {
    axiosInstance
      .get(
        `/api/dashboard/user-info?page=${currentPage}&search=${searchValue}&username=${selectedOptionusers}&sort=${descascvalue}&sort_field=${subjectvalue}`
      )
      .then((res) => {
        console.log(res.data.data.length, "user info");
        setUsers(res?.data?.data);
        setTotalPages(res?.data?.total);
        setitemsCountPerPages(res?.data?.per_page);
        setlastpage(res?.data?.current_page);
        // setUsersName(res?.data?.data);
      });
  };

  const clearvaluesinsearchbar = () => {
    setselectproductcategory("");
    setSearchValue("");
    setSelectedOptionusers("");
    fetchUsersData();
  };

  const [showModal, setShowModal] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setShowModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    const closeButton = document.getElementById("closeButton");

    // Trigger a click event on the close button element
    if (closeButton) {
      closeButton.click();
    }
    setShowModal(false);
  };

  const [checkbox, setCheckBOX] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
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

  const MAX_CHECKBOXES = 5;
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const handleCheckboxChange = (e, checkboxValue) => {
    setSelectedCheckbox(e.target.checked ? checkboxValue : null);
  };

  // localStorage.setItem("counties", JSON.stringify(selectedCheckbox));

  const AssignRolesToUsersAction = (e) => {
    // e.preventDefault();
    setIsModalOpen(true);
    let payload = {
      user_id: useridforassignrole,
      role_id: selectedCheckbox,
    };
    axiosInstance
      .post("/api/dashboard/assign-role-to-user", payload)
      .then((r) => {
        //  closeModal();
        setIsModalOpen(false);
        setnotificationMessage(r.data.data.message);
        setSelectedCheckbox(null);
        setTimeout(() => {
          setnotificationMessage("");
        }, 4000);
        // setnotificationMessage("Signup Completed Successfully!");
      })
      .catch((e) => {
        setIsModalOpen(false);
        if (e.response.data.errors != undefined) {
          // alert(e.response.data.message);
          // setIsModalOpen(false);
          setnotificationMessageRed(e.response.data.message);
          setTimeout(() => {
            setnotificationMessageRed("");
          }, 4000);
        }
      });
  };

  const [query, setQuery] = useState("");

  return (
    <>
      <>
        {notificationMessage && (
          <CustomNotification message={notificationMessage} />
        )}
        {notificationMessageRed && (
          <RedNotification message={notificationMessageRed} />
        )}
      </>
      <>
        <div className="row main_search_div_user">
          <div className="col-lg-10">
            <div className="search_entity_admin">
              <img src={search_icon} className="search_icon_st_admin" />
              <input
                className="input_serachentity_user_admin"
                type="search"
                value={searchValue}
                onChange={handleInputChange}
              />

              <a className="vertical_line_st_admin mx-3"></a>
              <img className="search_st_icon_style_admin" src={user_logo} />

              {/* <select
                value={selectusername}
                onChange={handleusernameDropdownChange}
                className="target_entity_dropdown_style_admin"
              >
                <option value="" checked={selectusername === ""}>
                  USER NAME
                </option>

                {UsersName
                  ? UsersName?.data?.map((data, index) => (
                      <>
                        {data?.map((data, index) => (
                          <option key={index} value={data?.full_name}>
                            {data?.full_name}
                          </option>
                        ))}
                      </>
                    ))
                  : null}
              </select> */}
              <div className="dropdownst" ref={dropdownRef}>
                <button onClick={toggleDropdownusers} className="dropbtnst">
                  {/* {selectedOptionusers ? selectedOptionusers : "users"} */}
                  {selectedOptionusers
                        ? selectedOptionusers &&
                          selectedOptionusers.length > 10
                          ? `${selectedOptionusers.slice(0, 9)}...`
                          : selectedOptionusers || "users"
                        : "users"}

                </button>
                <div
                  id="myDropdownst"
                  className={`dropdown-contentst ${
                    dropdownOpenusers ? "showst" : ""
                  }`}
                >
                  <input
                    type="text"
                    placeholder="Search.."
                    id="myInputst"
                    onKeyUp={handleFilterChangeusers}
                  />
                  {UsersName?.data
                    ? UsersName?.data.map((data, index) => (
                        <React.Fragment key={index}>
                          {data
                            .filter((item) =>
                              item.full_name.toUpperCase().includes(filterusers)
                            )
                            .map((item) => (
                              <a
                                key={item.full_name}
                                onClick={() =>
                                  handleOptionChangeusers(item.full_name)
                                }
                              >
                                {item.full_name}
                              </a>
                            ))}
                        </React.Fragment>
                      ))
                    : null}
                </div>
              </div>
              <img src={downarrowforsearch} className="  mx-1" />
              {/* <div className="dropdownst">
                <button onClick={toggleDropdownusers} className="dropbtnst">
                  {selectedOptionusers ? selectedOptionusers : "users"}
                </button>
                <div
                  id="myDropdownst"
                  className={`dropdown-contentst ${
                    dropdownOpenusers ? "showst" : ""
                  }`}
                >
                  <input
                    type="text"
                    placeholder="Search.."
                    id="myInputst"
                    onKeyUp={handleFilterChangeusers}
                  />
                  {UsersName?.data
                    ? UsersName?.data.map((data, index) => (
                        <React.Fragment key={index}>
                          {data
                            .filter((item) =>
                              item.full_name.toUpperCase().includes(filterusers)
                            )
                            .map((item) => (
                              <a
                                key={item.full_name}
                                onClick={() =>
                                  handleOptionChangeusers(item.full_name)
                                }
                              >
                                {item.full_name}
                              </a>
                            ))}
                        </React.Fragment>
                      ))
                    : null}
                </div>
              </div> */}
              {/* <a className="vertical_line_st_admin mx-3"></a>
              <img className="search_st_icon_style_admin" src={target_entity} />

              <select
                value={selectproductcategory}
                onChange={handleDropdownChange}
                className="target_entity_dropdown_style_admin"
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
              </select>
              <a className="vertical_line_st_admin mx-3"></a>
              <img
                src={status_icon_entity}
                className="search_st_icon_style_admin mx-1"
              />
              <select
                name="language"
                id="language"
                onChange={handlegettingstatus}
                className="target_entity_dropdown_style_admin"
              >
                <option value="" selected checked={statusgetting === ""}>
                  Status
                </option>
                <option value="pending" checked={statusgetting === "pending"}>
                  Pending
                </option>
                <option value="resolved" checked={statusgetting === "resolved"}>
                  Resolved
                </option>
              </select> */}
            </div>
          </div>
          <div className="col-lg-2">
            <button
              className="clear_button_search_st_admin"
              onClick={clearvaluesinsearchbar}
            >
              Clear Filter
            </button>
          </div>
        </div>
      </>
      <>
        <div className="main_div_heading_users">
          <div className="row">
            <div className="col">
              <p className="heading_para_users">Profile</p>
            </div>
            <div className="col-lg-1 col-md-1 col-1">
              <p className="heading_para_users">
                Name{" "}
                <img
            src={up_arrow_users}
            onClick={() => {
              setsubjectvalue("name");
              setdescascvalue("asc");
              fetchUsersData();
            }}
            className="cursor_pinter_add"
          />
          <img
            src={down_arrow_users}
            onClick={() => {
              setsubjectvalue("name");
              setdescascvalue("desc");
              fetchUsersData();
            }}
            className="cursor_pinter_add"
          />
              </p>
            </div>
            <div className="col">
              <p className="heading_para_users">
                Role{" "}
                <img
            src={down_arrow_users}
            onClick={() => {
              setsubjectvalue("name");
              setdescascvalue("asc");
              fetchUsersData();
            }}
            className="cursor_pinter_add"
          />
          <img
            src={up_arrow_users}
            onClick={() => {
              setsubjectvalue("name");
              setdescascvalue("desc");
              fetchUsersData();
            }}
            className="cursor_pinter_add"
          />
              </p>
            </div>
            <div className="col">
              <p className="heading_para_users">Status</p>
            </div>
            <div className="col-lg-2 col-md-2 col-2">
              <p className="heading_para_users">Total Purchase</p>
            </div>
            <div className="col-lg-2 col-md-2 col-2">
              <p className="heading_para_users">Tickets</p>
            </div>
            <div className="col">
              <p className="heading_para_users">Requests</p>
            </div>
            <div className="col-lg-2 col-md-2 col-2">
              <p className="heading_para_users">Pushed Leads</p>
            </div>
            <div className="col">
              <p className="heading_para_users">Integration</p>
            </div>
          </div>
        </div>
      </>

      <>
        <>
          <div className="show_message_to_open_this_module_in_laptop_or_desktop">
            Open this module in laptop or desktop
          </div>
        </>
        {Users ? (
          Users.map((userdata, index) => {
            return (
              <div className="user_profile_data_main_div" key={index}>
                <div className="row">
                  <div className="col">
                    <div className="">
                      {userdata?.profile_pic ? (
                        <img
                          src={`${process.env.REACT_APP_BASE_URL}/uploads/${userdata?.profile_pic}`}
                          className="profile_view_pic_users"
                          alt=""
                        />
                      ) : (
                        <div className="profile_view_pic_users"></div>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-1 col-md-1 col-1">
                    <p className="users_name_para">{userdata?.user_name}</p>
                  </div>
                  <div className="col">
                    <p
                      className="users_name_para_role"
                      onClick={() => {
                        handleuseridClick(userdata?.user_id);
                        openModal();
                      }}
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                    >
                      {userdata?.user_role ? userdata?.user_role : "null"}
                    </p>
                    {/* <div className="dropdownroles" ref={dropdownRefroles}>
                      <button
                        onClick={toggleDropdownroles}
                        className="dropbtnroles"
                      >
                        {selectedOptionroles ? selectedOptionroles : "roles"}
                      </button>
                      <div
                        id="myDropdownroles"
                        className={`dropdown-contentroles ${
                          dropdownOpenroles ? "showroles" : ""
                        }`}
                      >
                        <input
                          type="text"
                          placeholder="Search.."
                          id="myInputroles"
                          onKeyUp={handleFilterChangeroles}
                        />
                        {userrolelist?.roles
                          ? userrolelist?.roles
                              .filter((item) =>
                                item.name.toUpperCase().includes(filterroles)
                              )
                              .map((item, index) => (
                                <a
                                  key={item.id}
                                  onClick={() =>
                                    handleOptionChangeroles(item.name)
                                  }
                                >
                                  {item.name}
                                </a>
                              ))
                          : null}
                      </div>
                    </div> */}

                    <>
                      {showModal && (
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
                              <div class="modal-body">
                                <p className="heading_of_assign_role">
                                  Assign Role
                                </p>
                                <div className="main_roles_user_div">
                                  <div className="mt-2 row px-3">
                                    <div className="col-sm-12">
                                      <input
                                        className="inputsearchuserroles"
                                        placeholder="Search"
                                        onChange={(event) =>
                                          setQuery(event.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="mt-3 div_main_for_scroll_state">
                                    {userrolelist?.roles ? (
                                      userrolelist?.roles
                                        .filter((post) => {
                                          if (query === "") {
                                            return post;
                                          } else if (
                                            post.name
                                              .toLowerCase()
                                              .includes(query.toLowerCase())
                                          ) {
                                            return post;
                                          }
                                        })
                                        .map((userroles, index) => (
                                          <div key={index} className="row ml-4">
                                            <div className="col-1 checkbox_style_desired_city">
                                              <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                id={`checkbox_${index}`}
                                                name={`checkbox_${index}`}
                                                checked={
                                                  userroles?.id ===
                                                  selectedCheckbox
                                                }
                                                onChange={(e) => {
                                                  handleCheckboxChange(
                                                    e,
                                                    userroles?.id
                                                  );
                                                }}
                                              />
                                            </div>
                                            <p className="col-11 statenamestyle">
                                              {userroles.name}
                                            </p>
                                          </div>
                                        ))
                                    ) : (
                                      <SpinnerLoader />
                                    )}
                                  </div>
                                </div>
                                <div className="d-flex justify-content-end">
                                  <button
                                    type="button"
                                    class="save_button_assign_role "
                                    id="closeButton"
                                    onClick={() => AssignRolesToUsersAction()}
                                  >
                                    Save changes
                                  </button>
                                </div>
                              </div>
                              <div class="modal-footer">
                                {/* <button
                                type="button"
                                class="btn btn-secondary"
                                data-dismiss="modal"
                              >
                                Close
                              </button> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
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
                  </div>
                  <div className="col">
                    <input
                      type="checkbox"
                      id={`switchstatususers-${index}`}
                      checked={userdata?.user_status == "active"}
                      onClick={() => {
                        handleToggleChange(
                          userdata?.user_status,
                          userdata?.user_id
                        );
                      }}
                    />

                    <label
                      className="toggle_btn_profile_users"
                      for={`switchstatususers-${index}`}
                    >
                      Toggle
                    </label>
                  </div>
                  <div className="col-lg-2 col-md-2 col-2">
                    <p className="users_name_para">
                      $
                      {userdata?.total_purchase
                        ? userdata?.total_purchase
                        : "0"}
                    </p>
                  </div>
                  <div className="col-lg-2 col-md-2 col-2">
                    <div className="row mt-2">
                      <div className="col-lg-2 col-md-2 col-2">
                        <img src={greenellipse} />
                      </div>
                      <div className="col-lg-5 col-md-5 col-5">
                        <p className="para_resolved_ticket">Resolved:</p>
                      </div>
                      <div className="col-lg-5 col-md-5 col-5">
                        <p className="para_resolved_ticket_number">
                          {userdata?.resolved_tickets
                            ? userdata?.resolved_tickets
                            : "0"}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-2 col-md-2 col-2">
                        <img src={redellipse} />
                      </div>
                      <div className="col-lg-5 col-md-5 col-5">
                        <p className="para_resolved_ticket">Pending:</p>
                      </div>
                      <div className="col-lg-5 col-md-5 col-5">
                        <p className="para_resolved_ticket_number">
                          {userdata?.pending_tickets
                            ? userdata?.pending_tickets
                            : "0"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <p className="para_request_number mt-3">
                      Today:{" "}
                      {(
                        userdata?.requests_count_today > 1000
                          ? `${Math.floor(
                              userdata?.requests_count_today / 1000
                            )}k`
                          : userdata?.requests_count_today
                      )
                        ? userdata?.requests_count_today > 1000
                          ? `${Math.floor(
                              userdata?.requests_count_today / 1000
                            )}k`
                          : userdata?.requests_count_today
                        : "0"}
                    </p>
                    <p className="para_request_number">
                      Week:{" "}
                      {userdata?.requests_count_week > 1000
                        ? `${Math.floor(userdata?.requests_count_week / 1000)}k`
                        : userdata?.requests_count_week
                        ? userdata?.requests_count_week > 1000
                          ? `${Math.floor(
                              userdata?.requests_count_week / 1000
                            )}k`
                          : userdata?.requests_count_week
                        : "0"}
                    </p>
                    <p className="para_request_number">
                      Month:{" "}
                      {userdata?.requests_count_month > 1000
                        ? `${Math.floor(
                            userdata?.requests_count_month / 1000
                          )}k`
                        : userdata?.requests_count_month
                        ? userdata?.requests_count_month > 1000
                          ? `${Math.floor(
                              userdata?.requests_count_month / 1000
                            )}k`
                          : userdata?.requests_count_month
                        : "0"}
                    </p>
                  </div>
                  <div className="col-lg-2 col-md-2 col-2">
                    <div className="row mt-2">
                      <div className="col-lg-1 col-md-1 col-1">
                        <img src={greenellipse} />
                      </div>
                      <div className="col-lg-4 col-md-4 col-4">
                        <p className="para_resolved_ticket">Success:</p>
                      </div>
                      <div className="col-lg-6 col-md-6 col-6">
                        <p className="para_resolved_ticket_number">
                          {userdata?.successful_leads
                            ? userdata?.successful_leads
                            : "0"}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-1 col-md-1 col-1">
                        <img src={redellipse} />
                      </div>
                      <div className="col-lg-4 col-md-4 col-4">
                        <p className="para_resolved_ticket">Failed:</p>
                      </div>
                      <div className="col-lg-6 col-md-6 col-6">
                        <p className="para_resolved_ticket_number">
                          {userdata?.failed_leads
                            ? userdata?.failed_leads
                            : "0"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <input
                      type="checkbox"
                      id={`switchintegration-${index}`} // Unique ID for each checkbox
                      checked={userdata?.user_integration?.status === "active"}
                      disabled={userdata?.user_integration === null}
                      onClick={() => {
                        handleToggleIntegrationChange(
                          userdata?.user_integration?.status,
                          userdata?.user_id
                        );
                      }}
                    />

                    <label
                      className="toggle_btn_profile_users"
                      htmlFor={`switchintegration-${index}`}
                    >
                      Toggle
                    </label>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <SpinnerLoader />
        )}
      </>
      <>
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
    </>
  );
}

export default Users;
