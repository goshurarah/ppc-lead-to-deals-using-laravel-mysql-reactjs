import React, { useEffect, useRef, useState } from "react";
import search_icon from "./../../../Assets/search_icon.png";
import state_search_icon from "./../../../Assets/state_serach_main_menu.png";
import county_search_icon from "./../../../Assets/county_icon_serach_main_menu.png";
import status_search_icon from "./../../../Assets/status_icon_serach_main_menu.png";
import cross_icon from "./../../../Assets/cross_icon_saved_filter.png";
import states_icon from "./../../../Assets/states_iconn.png";
import country_icon from "./../../../Assets/country_icon.png";
import search_third from "./../../../Assets/search_third.png";
import seller_motivation from "./../../../Assets/seller_motivation.png";
import agent from "./../../../Assets/agent.png";
import estate_agent from "./../../../Assets/estate_agent.png";
import fast from "./../../../Assets/fast.png";
import living_in_house from "./../../../Assets/living_in_house.png";
import mortage from "./../../../Assets/mortage.png";
import bathroom from "./../../../Assets/bathroom.png";
import bedroom from "./../../../Assets/bedroom.png";
import construction from "./../../../Assets/construction.png";
import owned_it from "./../../../Assets/owned_it.png";
import prop_condition from "./../../../Assets/prop_condition.png";
import repair_need from "./../../../Assets/repair_needed.png";
import hot_icon from "./../../../Assets/hot_icon.png";
import hold_icon from "./../../../Assets/on_hold_icon.png";
import type_of_house from "./../../../Assets/type of house.png";
import sqaure_footage from "./../../../Assets/squarefootage.png";
import zip_code from "./../../../Assets/zip.png";
import cashofferoption from "./../../../Assets/cashofferoption.png";
import city from "./../../../Assets/city.png";
import date_time from "./../../../Assets/date_time.png";
import orders from "./../../../Assets/orders.png";
import on_hover_premium from "./../../../Assets/on_hover_premium.png";
import phone_no from "./../../../Assets/phone_no.png";
import more_filter from "./../../../Assets/more_filter.png";
import seller_identity from "./../../../Assets/seller_identity.png";
import "./../MainMenu/MainMenuStyle.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm.js";
import { Alert, Stack } from "@mui/material";
import ScrollTop from "../ScrollTop/ScrollTop";
import TicketandLiveChat from "../TicketAndLiveChat/TicketandLiveChat";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "react-js-pagination";
import SpinnerLoader from "../SpinnerLoader/SpinnerLoader";
import downarrowforsearch from "./../../../Assets/downarrowforsearch.png";
import CustomNotification from "../CustomNotification/CustomNotification";
import RedNotification from "../CustomNotification/RedNotification";

function MainMenu() {
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

  const [isEnlarged, setIsEnlarged] = useState(false);
  const [previousDimensions, setPreviousDimensions] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationMessageRed, setnotificationMessageRed] = useState(null);
  // select states
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [selectedOptionstates, setSelectedOptionstates] = useState("");

  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value.toUpperCase());
  };

  const handleOptionChange = (option) => {
    setSelectedOptionstates(option);
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

  // select county
  const [dropdownOpencounty, setDropdownOpencounty] = useState(false);
  const [filtercounty, setFiltercounty] = useState("");
  const [selectedOptioncounty, setSelectedOptioncounty] = useState("");
  const dropdownRefcounty = useRef(null);

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

  const toggleDropdowncounty = () => {
    setDropdownOpencounty(!dropdownOpencounty);
  };

  const handleFilterChangecounty = (event) => {
    setFiltercounty(event.target.value.toUpperCase());
  };

  const handleOptionChangecounty = (option) => {
    setSelectedOptioncounty(option);
    setDropdownOpencounty(false);
  };

  const handleOutsideClick = (event) => {
    if (
      dropdownRefcounty.current &&
      !dropdownRefcounty.current.contains(event.target)
    ) {
      // Clicked outside the dropdown, close it
      setDropdownOpencounty(false);
    }
  };

  const handleScroll = () => {
    // Scrolling detected, close the dropdown
    setDropdownOpencounty(false);
  };
  //get the token from local storage to authorize  the get api
  const token = localStorage.getItem("token");
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const navigate = useNavigate();
  const [LeadsDashboard, setLeadsDashboard] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsCountPerPages, setitemsCountPerPages] = useState(0);
  const [lastpage, setlastpage] = useState(0);

  //seacrbar with three dropdwon code starts here
  const [searchValue, setSearchValue] = useState("");
  const [selectedOption1, setSelectedOption1] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [selectedOption3, setSelectedOption3] = useState("");

  // Update the states when the radio buttons or inputs change
  const [selectedValue, setSelectedValue] = useState("");
  const [listedWithAgent, setListedWithAgent] = useState("");
  const [livingInHouse, setLivingInHouse] = useState("");
  const [ownerType, setOwnerType] = useState("");
  const [propertyowner, setpropertyowner] = useState("");
  const [mortagageselect, setmortagage] = useState("");
  const [repairsNeeded, setRepairsNeeded] = useState("");
  const [propertyCondition, setPropertyCondition] = useState("");
  const [ownedDuration, setOwnedDuration] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [houseType, setHouseType] = useState("");

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    getLeadsData();
  }, [currentPage, searchValue,selectedOption3, selectedOptionstates, selectedOptioncounty,houseType,bedrooms,bathrooms,ownedDuration,ownedDuration,propertyCondition,repairsNeeded,mortagageselect,ownerType,propertyowner,livingInHouse,listedWithAgent,selectedValue,]);

  //axios call get the leads data
  const [errorMessage, seterrorMessage] = useState("");

  useEffect(() => {
    if (errorMessage) {
      const timeout = setTimeout(() => {
        seterrorMessage("");
      }, 5000);

      return () => clearTimeout(timeout); // Clear the timeout when the component unmounts
    }
  }, [errorMessage]);

  const getLeadsData = async () => {
    axiosInstance
      .get(
        `/api/dashboard/get-leads?page=${currentPage}&search=${searchValue}&state=${selectedOptionstates}&county=${selectedOptioncounty}&status=${selectedOption3}&ideal_selling_timeframe=${selectedValue}&occupancy=${livingInHouse}&listed_with_real_estate_agent=${listedWithAgent}&property_condition=${propertyCondition}&owner_wholesaler=${propertyowner}&mortgage=${mortagageselect}&repairs_needed=${repairsNeeded}&how_long_you_owned=${ownedDuration}&beds=${bedrooms}&baths=${bathrooms}&type_of_house=${houseType}`
      )
      .then((res) => {
        setLeadsDashboard(res?.data?.leads?.data);
        setTotalPages(res?.data?.leads?.total);
        setitemsCountPerPages(res?.data?.leads?.per_page);
        setlastpage(res?.data?.leads?.last_page);
      })
      .catch((e) => {
        if (e.response.status == 404) {
          seterrorMessage(e.response.data.message);
        } else {
          seterrorMessage(e.response.data.message);
        }
      });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
  const [page, setPage] = useState(1);

  const handleOption1Change = (event) => {
    setSelectedOption1(event.target.value);
  };

  const handleOption2Change = (event) => {
    setSelectedOption2(event.target.value);
  };

  const handleOption3Change = (event) => {
    setSelectedOption3(event.target.value);
  };

  const [sellSpeed, setSellSpeed] = useState("");

  const handleSellSpeedChange = (event) => {
    setSelectedValue(event.target.value);
  };
  // console.log(selectedValue);     done in api

  const handleListedWithAgentChange = (event) => {
    setListedWithAgent(event.target.value);
  };
  //done in api

  const handleLivingInHouseChange = (event) => {
    setLivingInHouse(event.target.value);
  };

  //done in api console.log(livingInHouse);

  const handleOwnerTypeChange = (event) => {
    setOwnerType(event.target.value);
  };

  const handlepropertyownerChange = (event) => {
    setpropertyowner(event.target.value);
  };
  //done in api console.log(propertyowner)

  const handlemortagageChange = (event) => {
    setmortagage(event.target.value);
  };
  //done in api  console.log(mortagageselect)

  const handleRepairsNeededChange = (event) => {
    setRepairsNeeded(event.target.value);
  };
  //done in api  console.log(repairsNeeded)

  const handlePropertyConditionChange = (event) => {
    setPropertyCondition(event.target.value);
  };

  const handleOwnedDurationChange = (event) => {
    setOwnedDuration(event.target.value);
  };
  // console.log(ownedDuration)
  //done in api  console.log(ownedDuration)

  const handleBathroomsChange = (event) => {
    setBathrooms(event.target.value);
  };
  // console.log(bathrooms)
  //done in api

  const handleBedroomsChange = (event) => {
    setBedrooms(event.target.value);
  };
  // console.log(bedrooms)
  //done in api

  const handleHouseTypeChange = (event) => {
    setHouseType(event.target.value);
  };

  //done in api

  // second dropdwon fetching data
  const [countyData, setCountyData] = useState("");
  useEffect(() => {
    fetchSecondDropdownData();
  }, [selectedOptionstates]);

  const fetchSecondDropdownData = () => {
    axiosInstance
      .get(
        `/api/dashboard/get-counties-dropdown-main-menu?state_name=${selectedOptionstates}`
      )
      .then((res) => {
        setCountyData(res.data);
      });
  };

  // end of second dropdwon fetching data

  const [buttonId, setButtonId] = useState(null);
  const [price, setPrice] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const handleClickticket = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  // upload file code start here
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedName, setSelectedName] = useState("");
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setSelectedName(file.name);
   
  };

 
  const [isEnlargedSearch, setIsEnlargedSearch] = useState(false);

  const handleClickSearch = () => {
    setIsEnlargedSearch(!isEnlargedSearch);
  };

  const [expandedDivs, setExpandedDivs] = useState({});
  // show available leads toggle function
  const handleClick = (div_id) => {
    setExpandedDivs((prevState) => {
      const newExpandedDivs = { ...prevState };
      newExpandedDivs[div_id] = !prevState[div_id];
      return newExpandedDivs;
    });
  };
  const getAvailableLeadsData = async () => {
    axiosInstance
      .get(`/api/dashboard/get-leads?page=${currentPage}&status=${"available"}`)
      .then((res) => {
        setLeadsDashboard(res?.data?.leads?.data);
        setTotalPages(res?.data?.leads?.total);
        setitemsCountPerPages(res?.data?.leads?.per_page);
        setlastpage(res?.data?.leads?.last_page);
      })
      .catch((e) => {
        if (e.response.status == 404) {
          // seterrorMessage(e.response.data.message);
          setnotificationMessageRed(e.response.data.message);
          setTimeout(() => {
            setnotificationMessageRed("");
          }, 4000);
        } else {
          // seterrorMessage(e.response.data.message);
          setnotificationMessageRed(e.response.data.message);
          setTimeout(() => {
            setnotificationMessageRed("");
          }, 4000);
        }
      });
  };

  const [toggleState, setToggleState] = useState(false);

  // Function to handle toggle state change
  const handleToggle = () => {
    setToggleState(!toggleState);
  };

  // Function to make API call
  const handleAPICall = () => {
    if (toggleState) {
      // API hit when toggle is ON
      getLeadsData();
    } else {
      // API hit when toggle is OFF
      getAvailableLeadsData();
    }
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const [subscriptionPackages, setsubscriptionPackages] = useState(false);

  useEffect(() => {
    getpackagesubscription();
  }, []);

  const getpackagesubscription = () => {
    axiosInstance
      .get(`api/is-premium-user`)
      .then((res) => {
        setsubscriptionPackages(res?.data);
        console.log(res?.data, "/api/dashboard/get-crm-data");
      })
      .catch((e) => {
        if (e.response.status == 404) {
        } else {
        }
      });
  };

  const search = "state";
  const stateserachname = "state";
  const countyserachname = "county";
  const statusserachname = "status";
  const fasttheywanttosell = "How fast they want to sell";
  const isrealstateagent = "Is your property listed with a real estate agent";
  const Anyonelivinginthehouse = "Anyone living in the house";
  const OwnerorAgentorWholesaler = "Owner or Agent/Wholesaler";
  const Mortgageoption = "Mortgage";
  const Repairsneeded = "Repairs needed";
  const Propcondition = "Prop.condition";
  const Howlonghaveyouownedit = "How long have you owned it ?";
  const Bathrooms = "Bathrooms";
  const Bedrooms = "Bedrooms";
  const Typeofhouse = "Type of house";

  const [filtername, setfiltername] = useState("");

  const ClearfiltersAction = () => {
    setHouseType("");
    setBedrooms("");
    setBathrooms("");
    setOwnedDuration("");
    setPropertyCondition("");
    setRepairsNeeded("");
    setmortagage("");
    setpropertyowner("");
    setOwnerType("");
    setLivingInHouse("");
    setListedWithAgent("");
    setSelectedValue("");
    setSelectedOption3("");
    setSearchValue("");
    setSelectedOptionstates("");
    setSelectedOptioncounty("");
    setfiltername("");
    setToggleState(false);
    getLeadsData();
  };

  const AddFilterAction = (e) => {
    e.preventDefault();
    let payload = {
      filter_name: filtername,
      filter_data: {
        search: searchValue,
        stateserachname: selectedOptionstates,
        countyserachname: selectedOptioncounty,
        statusserachname: selectedOption3,
        fasttheywanttosell: selectedValue,
        isrealstateagen: listedWithAgent,
        Anyonelivinginthehouse: livingInHouse,
        OwnerorAgentorWholesaler: propertyowner,
        Mortgageoption: mortagageselect,
        Repairsneeded: repairsNeeded,
        Propcondition: propertyCondition,
        Howlonghaveyouownedit: ownedDuration,
        Bathrooms: bathrooms,
        Bedrooms: bedrooms,
        Typeofhouse: houseType,
      },
    };
    axiosInstance
      .post("api/dashboard/save-filter", payload)
      .then((r) => {
        // alert(r.data.message);
        getsavedfiltersdata();
        ClearfiltersAction();
        setToggleState(false);
        setNotificationMessage(r.data.message);

        setTimeout(() => {
          setNotificationMessage("");
        }, 4000);
      })
      .catch((e) => {
        console.log("Error deleting data 00000:", e);
        if (e.response.data.error != undefined) {
          setnotificationMessageRed(e.response.data.message);
          setTimeout(() => {
            setnotificationMessageRed("");
          }, 4000);
          console.log("Error deleting data:", e);
          //   alert(e.response.data.message);
          // setnotificationMessageRed(e.response.data.message);
          // setValidationErrors(e.errors);
        }
        setnotificationMessageRed(e.response.data.error);
        setTimeout(() => {
          setnotificationMessageRed("");
        }, 4000);
      });
  };

  const [savedfiltersdata, setsavedfiltersdata] = useState("");
  useEffect(() => {
    getsavedfiltersdata();
  }, []);

  const getsavedfiltersdata = () => {
    axiosInstance.get(`api/dashboard/get-saved-filters`).then((res) => {
      setsavedfiltersdata(res?.data?.filters);
    });
  };
  console.log(savedfiltersdata, "savedfiltersdata");

  const applyfilters = (data) => {
    setHouseType(data?.Typeofhouse);
    setBedrooms(data?.Bedrooms);
    setBathrooms(data?.Bathrooms);
    setOwnedDuration(data?.Howlonghaveyouownedit);
    setPropertyCondition(data?.Propcondition);
    setRepairsNeeded(data?.Repairsneeded);
    setmortagage(data?.Mortgageoption);
    setpropertyowner(data?.OwnerorAgentorWholesaler);
    setLivingInHouse(data?.Anyonelivinginthehouse);
    setListedWithAgent(data?.isrealstateagen);
    setSelectedValue(data?.fasttheywanttosell);
    setSelectedOption3(data?.statusserachname);
    setSearchValue(data?.search);
    setSelectedOptionstates(data?.stateserachname);
    setSelectedOptioncounty(data?.countyserachname);
    getLeadsData();
  };

  const handleDeleteFilters = async (id) => {
    try {
      const response = await axiosInstance.delete(
        `/api/dashboard/delete-saved-filter/${id}`
      );
      getsavedfiltersdata();
      console.log(response, "delete response");
      setNotificationMessage(response.data.message);
      setTimeout(() => {
        setNotificationMessage("");
      }, 4000);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
  return (
    <>
      {notificationMessage && (
        <CustomNotification message={notificationMessage} />
      )}
      <>
        {notificationMessageRed && (
          <RedNotification message={notificationMessageRed} />
        )}
      </>
      <>
        {/* <SellerLeadMarketDashboard/> */}
        <div className="container-fluid mt-5">
          {/* <!-- Page Heading --> */}
          <div className="row mt-4 mb-2">
           

            <div className="search_div_main_menu_serach">
              <div className="row">
                <img src={search_icon} className="search_icon_main_menu" />
                <input
                  type="search"
                  placeholder="Search"
                  className="search_input_main_menu"
                  value={searchValue}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="state_serach_main_menu">
              <div className="d-flex flex-row">
                <img src={state_search_icon} className="state_icon_main_menu" />

                <div className="dropdown" ref={dropdownRef}>
                  <button onClick={toggleDropdown} className="dropbtn">
                    {selectedOptionstates
                      ? selectedOptionstates && selectedOptionstates.length > 5
                        ? `${selectedOptionstates.slice(0, 5)}...`
                        : selectedOptionstates || "State"
                      : "State"}
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
                    {statedata ? (
                      statedata
                        .filter((item) =>
                          item.name.toUpperCase().includes(filter)
                        )
                        .map((item) => (
                          <a
                            key={item.id}
                            onClick={() => handleOptionChange(item.name)}
                          >
                            {item.name}
                          </a>
                        ))
                    ) : (
                      <SpinnerLoader />
                    )}
                  </div>
                </div>
                <img
                  src={downarrowforsearch}
                  className="down_arrow_icon_main_menu"
                  onClick={toggleDropdown}
                />
              </div>
            </div>

            <div className="state_serach_main_menu">
              <div className="d-flex flex-row">
                <img
                  src={county_search_icon}
                  className="state_icon_main_menu"
                />
                <div className="dropdown" ref={dropdownRefcounty}>
                  <button onClick={toggleDropdowncounty} className="dropbtn">
                    {selectedOptioncounty
                      ? selectedOptioncounty && selectedOptioncounty.length > 5
                        ? `${selectedOptioncounty.slice(0, 5)}...`
                        : selectedOptioncounty || "County"
                      : "County"}
                  </button>
                  <div
                    id="myDropdown"
                    className={`dropdown-content ${
                      dropdownOpencounty ? "show" : ""
                    }`}
                  >
                    <input
                      type="text"
                      placeholder="Search.."
                      id="myInput"
                      onKeyUp={handleFilterChangecounty}
                    />
                    {countyData.data ? (
                      countyData.data
                        .filter((item) =>
                          item.name.toUpperCase().includes(filtercounty)
                        )
                        .map((item) => (
                          <a
                            key={item.id}
                            onClick={() => handleOptionChangecounty(item.name)}
                          >
                            {item.name}
                          </a>
                        ))
                    ) : (
                      <SpinnerLoader />
                    )}
                  </div>
                </div>
                <img
                  src={downarrowforsearch}
                  className="down_arrow_icon_main_menu"
                  onClick={() => toggleDropdowncounty()}
                />
              </div>
            </div>

            <div className="state_serach_main_menu">
              <div className="d-flex flex-row">
                <img
                  src={status_search_icon}
                  className="state_icon_main_menu"
                />
                <select
                  name="language"
                  id="language"
                  className="status_dropdown_mian_menu"
                  value={selectedOption3}
                  onChange={handleOption3Change}
                >
                  <option value="" selected>
                    Status
                  </option>
                  <option value="available">Available</option>
                  <option value="on hold">On Hold</option>
                </select>
              </div>
            </div>

            <button className="search_button_main_menu" onClick={ClearfiltersAction}>
              Clear Filters
            </button>
          </div>

          {isEnlargedSearch ? (
            <div className="main_div_more_filters">
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-12 mt-3">
                  <div>
                    <p className="want_to_sell">How fast they want to sell</p>

                    <div className="checkbox-rect2">
                      <input
                        type="radio"
                        id="checkbox-rect1"
                        name="check1"
                        value="asap"
                        checked={selectedValue === "asap"}
                        onChange={handleSellSpeedChange}
                      />
                      <label htmlFor="checkbox-rect1">ASAP</label>

                      <input
                        type="radio"
                        id="checkbox-rect2"
                        name="check1"
                        value="30 days"
                        checked={selectedValue === "30 days"}
                        onChange={handleSellSpeedChange}
                      />
                      <label htmlFor="checkbox-rect2">1 Month</label>

                      <input
                        type="radio"
                        id="checkbox-rect3"
                        name="check1"
                        value="90 days"
                        checked={selectedValue === "90 days"}
                        onChange={handleSellSpeedChange}
                      />
                      <label htmlFor="checkbox-rect3">2-3 Month</label>
                    </div>
                  </div>

                  <div>
                    <p className="want_to_sell">
                      Is your property listed with a real estate agent
                    </p>
                    <div className="checkbox-rect2">
                      <input
                        type="radio"
                        id="list1"
                        name="check2"
                        value="no"
                        checked={listedWithAgent === "no"}
                        onChange={handleListedWithAgentChange}
                      />
                      <label htmlFor="list1">No it’s not listed</label>
                      <input
                        type="radio"
                        id="list2"
                        name="check2"
                        value="yes"
                        checked={listedWithAgent === "yes"}
                        onChange={handleListedWithAgentChange}
                      />
                      <label htmlFor="list2">Yes it’s listed</label>
                    </div>
                  </div>

                  <div>
                    <p className="want_to_sell">Anyone living in the house</p>
                    <div className="checkbox-rect2">
                      <input
                        type="radio"
                        id="checkliving1"
                        name="check3"
                        value="not_vacant"
                        checked={livingInHouse === "not_vacant"}
                        onChange={handleLivingInHouseChange}
                      />
                      <label htmlFor="checkliving1">No it’s Vacant</label>
                      <input
                        type="radio"
                        id="checkliving2"
                        name="check3"
                        value="tenant_occupied"
                        checked={livingInHouse === "tenant_occupied"}
                        onChange={handleLivingInHouseChange}
                      />
                      <label htmlFor="checkliving2">Tenant Occupied</label>
                      <input
                        type="radio"
                        id="checkliving3"
                        name="check3"
                        value="owner_occupied"
                        checked={livingInHouse === "owner_occupied"}
                        onChange={handleLivingInHouseChange}
                      />
                      <label htmlFor="checkliving3">Owner Occupied</label>
                    </div>
                  </div>

                  <div>
                    <p className="want_to_sell">Owner or Agent/Wholesaler</p>
                    <div className="checkbox-rect2">
                      <input
                        type="radio"
                        id="checkagent1"
                        name="checkagent1"
                        value="owner"
                        checked={propertyowner === "owner"}
                        onChange={handlepropertyownerChange}
                      />
                      <label htmlFor="checkagent1">
                        Yes, i own this property
                      </label>
                      <input
                        type="radio"
                        id="checkagent2"
                        name="checkagent2"
                        value="wholesaler"
                        checked={propertyowner === "wholesaler"}
                        onChange={handlepropertyownerChange}
                      />
                      <label htmlFor="checkagent2">Agent/wholesaler</label>
                    </div>
                  </div>

                  <div>
                    <p className="want_to_sell">Mortgage</p>
                    <div className="checkbox-rect2">
                      <input
                        type="radio"
                        id="Mortgage1"
                        name="check5"
                        value="vacant"
                        checked={mortagageselect === "vacant"}
                        onChange={handlemortagageChange}
                      />
                      <label htmlFor="Mortgage1">No it’s Vacant</label>
                      <input
                        type="radio"
                        id="Mortgage2"
                        name="check5"
                        value="tenant_occupied"
                        checked={mortagageselect === "tenant_occupied"}
                        onChange={handlemortagageChange}
                      />
                      <label htmlFor="Mortgage2">Tenant Occupied</label>
                      <input
                        type="radio"
                        id="Mortgage3"
                        name="check5"
                        value="owner_occupied"
                        checked={mortagageselect === "owner_occupied"}
                        onChange={handlemortagageChange}
                      />
                      <label htmlFor="Mortgage3">Owner Occupied</label>
                    </div>
                  </div>
                </div>

                <div
                  className="col-lg-4 col-md-4 col-sm-12 mt-3"
                  onMouseEnter={handleHover}
                  onMouseLeave={handleMouseLeave}
                >
                  {subscriptionPackages !== "subscribed" && isHovered && (
                    <div
                      style={{
                        position: "absolute",
                        left: "0px",
                        zIndex: 1,
                        maxWidth: "100%",
                        width: "90%",
                        height: "100%",
                      }}
                    >
                      <img
                        src={on_hover_premium}
                        alt="Hovered Image"
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </div>
                  )}
                  <div className="row">
                    <div className="col-lg-1 col-md-1 col-sm-1">
                      <img
                        src={repair_need}
                        className="premium_pic_searchbar"
                      />
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-10">
                      <p className="search_question">Repairs needed</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-1  col-md-1 col-sm-1"></div>
                    <div className="col-lg-10 col-md-10 col-sm-10">
                      <div className="row">
                        <div className="col-lg-6">
                          <select
                            name="language"
                            id="language"
                            className="input_style_bath"
                            onChange={handleRepairsNeededChange}
                            value={repairsNeeded}
                          >
                            <option>Repairs needed</option>
                            <option
                              value="Structural Problems"
                              checked={repairsNeeded === "Structural Problems"}
                            >
                              Structural Problems
                            </option>
                            <option
                              value="Flood/storm/fire damage"
                              checked={
                                repairsNeeded === "Flood/storm/fire damage"
                              }
                            >
                              Flood/storm/fire damage
                            </option>
                            <option
                              value="Roof Needs Replacement"
                              checked={
                                repairsNeeded === "Roof Needs Replacement"
                              }
                            >
                              Roof Needs Replacement
                            </option>
                            <option
                              value="Foundation Problems"
                              checked={repairsNeeded === "Foundation Problems"}
                            >
                              Foundation Problems
                            </option>
                            <option
                              value="Bathroom(s) need work"
                              checked={
                                repairsNeeded === "Bathroom(s) need work"
                              }
                            >
                              Bathroom(s) need work
                            </option>
                            <option
                              value="Paint Inside"
                              checked={repairsNeeded === "Paint Inside"}
                            >
                              Paint Inside
                            </option>
                            <option
                              value="None, it is in pristine condition"
                              checked={
                                repairsNeeded ===
                                "None, it is in pristine condition"
                              }
                            >
                              None, it is in pristine condition
                            </option>
                            <option
                              value="Boiler/Water Heater"
                              checked={repairsNeeded === "Boiler/Water Heater"}
                            >
                              Boiler/Water Heater
                            </option>
                            <option
                              value="Landscaping"
                              checked={repairsNeeded === "Landscaping"}
                            >
                              Landscaping
                            </option>

                            <option
                              value="Electrical"
                              checked={repairsNeeded === "Electrical"}
                            >
                              Electrical
                            </option>

                            <option
                              value="Plumbing"
                              checked={repairsNeeded === "Plumbing"}
                            >
                              Plumbing
                            </option>
                            <option
                              value="Flooring"
                              checked={repairsNeeded === "Flooring"}
                            >
                              Flooring
                            </option>
                            <option
                              value="Kitchen Cabinets"
                              checked={repairsNeeded === "Kitchen Cabinets"}
                            >
                              Kitchen Cabinets
                            </option>
                            <option
                              value="Kitchen Appliances"
                              checked={repairsNeeded === "Kitchen Appliances"}
                            >
                              Kitchen Appliances
                            </option>
                            <option
                              value="Paint Outside"
                              checked={repairsNeeded === "Paint Outside"}
                            >
                              Paint Outside
                            </option>
                            <option
                              value="Air Conditioning"
                              checked={repairsNeeded === "Air Conditioning"}
                            >
                              Air Conditioning
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-1 col-md-1 col-sm-1">
                      <img
                        src={prop_condition}
                        className="premium_pic_searchbar"
                      />
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-10">
                      <p className="search_question">Prop.condition</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-1 col-md-1 col-sm-1"></div>
                    <div className="col-lg-10 col-md-10 col-sm-10">
                      <div className="row">
                        <div className="col-lg-6">
                          <input
                            className="input_style_bath"
                            onChange={handlePropertyConditionChange}
                            value={propertyCondition}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-1 col-md-1 col-sm-1">
                      <img src={owned_it} className="premium_pic_searchbar" />
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-10">
                      <p className="search_question">
                        How long have you owned it ?
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-1 col-md-1 col-sm-1"></div>
                    <div className="col-lg-10 col-md-10 col-sm-10">
                      <div className="row">
                        <div className="col-lg-6">
                          <select
                            name="language"
                            id="language"
                            className="input_style_bath"
                            onChange={handleOwnedDurationChange}
                            value={ownedDuration}
                          >
                            <option>Years</option>
                            <option value="0-1" checked={houseType === "0-1"}>
                              0-1
                            </option>
                            <option value="2-5" checked={houseType === "2-5"}>
                              2-5
                            </option>
                            <option value="6-9" checked={houseType === "6-9"}>
                              6-9
                            </option>
                            <option
                              value="10-14"
                              checked={houseType === "10-14"}
                            >
                              10-14
                            </option>
                            <option
                              value="15-19"
                              checked={houseType === "15-19"}
                            >
                              15-19
                            </option>
                          
                            <option
                              value="20-29"
                              checked={houseType === "20-29"}
                            >
                              20-29
                            </option>
                            <option
                              value="30-50"
                              checked={houseType === "30-50"}
                            >
                              30-50
                            </option>
                            <option value="50+" checked={houseType === "50+"}>
                              50+
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-1 col-md-1 col-sm-1">
                      <img src={bathroom} className="premium_pic_searchbar" />
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-10">
                      <p className="search_question">Bathrooms</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-1  col-md-1 col-sm-1"></div>
                    <div className="col-lg-10 col-md-10 col-sm-10">
                      <div className="row">
                        <div className="col-lg-6">
                          <select
                            name="language"
                            id="language"
                            className="input_style_bath"
                            onChange={handleBathroomsChange}
                            value={bathrooms}
                          >
                            <option>Bathrooms</option>
                            <option value="None" checked={bathrooms === "None"}>
                              None
                            </option>
                            <option
                              value="1 Bathroom"
                              checked={bathrooms === "1 Bathroom"}
                            >
                              1 Bathroom
                            </option>
                            <option
                              value="2 Bathroom"
                              checked={bathrooms === "2 Bathroom"}
                            >
                              2 Bathroom
                            </option>
                            <option
                              value="3 Bathroom"
                              checked={bathrooms === "3 Bathroom"}
                            >
                              3 Bathroom
                            </option>
                            <option
                              value="4 Bathroom"
                              checked={bathrooms === "4 Bathroom"}
                            >
                              4 Bathroom
                            </option>

                            <option
                              value="5 Bathroom"
                              checked={bathrooms === "5 Bathroom"}
                            >
                              5 Bathroom
                            </option>
                            <option
                              value="More than 5"
                              checked={bathrooms === "More than 5"}
                            >
                              More than 5
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-1 col-md-1 col-sm-1">
                      <img src={bedroom} className="premium_pic_searchbar" />
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-10">
                      <p className="search_question">Bedrooms</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-1  col-md-1 col-sm-1"></div>
                    <div className="col-lg-10 col-md-10 col-sm-10">
                      <div className="row">
                        <div className="col-lg-10">
                          <select
                            name="language"
                            id="language"
                            className="input_style_bath"
                            onChange={handleBedroomsChange}
                            value={bedrooms}
                          >
                            <option>Bedrooms</option>
                            <option
                              value="1 Bedroom"
                              checked={bedrooms === "1 Bedroom"}
                            >
                              1 Bedroom
                            </option>
                            <option
                              value="2 Bedroom"
                              checked={bedrooms === "2 Bedroom"}
                            >
                              2 Bedroom
                            </option>
                            <option
                              value="3 Bedroom"
                              checked={bedrooms === "3 Bedroom"}
                            >
                              3 Bedroom
                            </option>
                            <option
                              value="4 Bedroom"
                              checked={bedrooms === "4 Bedroom"}
                            >
                              4 Bedroom
                            </option>
                            <option
                              value="5 Bedroom"
                              checked={bedrooms === "5 Bedroom"}
                            >
                              5 Bedroom
                            </option>
                            <option
                              value="More than 5"
                              checked={bedrooms === "More than 5"}
                            >
                              More than 5
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-1 col-md-1 col-sm-1">
                      <img
                        src={type_of_house}
                        className="premium_pic_searchbar"
                      />
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-10">
                      <p className="search_question">Type of house</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-1 col-md-1 col-sm-1"></div>
                    <div className="col-lg-10 col-md-10 col-sm-10">
                      <div className="row">
                        <div className="col-lg-6">
                          <select
                            name="language"
                            id="language"
                            className="input_style_bath"
                            onChange={handleHouseTypeChange}
                            value={houseType}
                          >
                            <option>Type of house</option>
                            <option
                              value="Ranch"
                              checked={houseType === "Ranch"}
                            >
                              Ranch
                            </option>
                            <option
                              value="2-story"
                              checked={houseType === "2-story"}
                            >
                              2-story
                            </option>
                            <option
                              value="Mobile home owned land"
                              checked={houseType === "Mobile home owned land"}
                            >
                              Mobile home owned land
                            </option>
                            <option
                              value="Mobile home rented land"
                              checked={houseType === "Mobile home rented land"}
                            >
                              Mobile home rented land
                            </option>
                            <option
                              value="Multifamily"
                              checked={houseType === "Multifamily"}
                            >
                              Multifamily
                            </option>
                            <option
                              value="Single family"
                              checked={houseType === "Single family"}
                            >
                              Single family
                            </option>
                            <option
                              value="Bungalow"
                              checked={houseType === "Bungalow"}
                            >
                              Bungalow
                            </option>
                            <option
                              value="Cottage"
                              checked={houseType === "Cottage"}
                            >
                              Cottage
                            </option>
                            <option
                              value="Townhouse"
                              checked={houseType === "Townhouse"}
                            >
                              Townhouse
                            </option>
                            <option
                              value="Condominium"
                              checked={houseType === "Condominium"}
                            >
                              Condominium
                            </option>
                            <option
                              value="Duplex"
                              checked={houseType === "Duplex"}
                            >
                              Duplex
                            </option>

                            <option
                              value="Farmhouse"
                              checked={houseType === "Farmhouse"}
                            >
                              Farmhouse
                            </option>
                            <option
                              value="Split-level home"
                              checked={houseType === "Split-level home"}
                            >
                              Split-level home
                            </option>
                            <option value="Land" checked={houseType === "Land"}>
                              Land
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 hide_div_saved_filter">
                  <div className="container_right_bottom_div">
                    <div className="bottom-right-div">
                      <input
                        className="input_style_name_of_filter"
                        placeholder="Name of Filter"
                        onChange={(e) => setfiltername(e.target.value)}
                        value={filtername}
                      />
                      <button className="save_button" onClick={AddFilterAction}>
                        Save this Filter
                      </button>
                    </div>
                  </div>
                  <button
                    className="save_this_silter_button"
                    onClick={ClearfiltersAction}
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>

              <div className="blue_linefilter"></div>
              <div>
                <p className="saved_filter_para">Saved Filters</p>
                <div className="d-flex flex-start main_div_saved_filter_buttons">
                  {savedfiltersdata
                    ? savedfiltersdata?.map((data, index) => (
                        <div className="saved_filter_button_style">
                          <div className="row">
                            <div
                              className="col-lg-9 col-md-9 col-9"
                              onClick={() => applyfilters(data?.filter_data)}
                            >
                              <p className="filtername_style">
                                {data.filter_name
                                  ? data.filter_name.slice(0, 18)
                                  : null}
                              </p>
                            </div>
                            <div
                              className="col-lg-3 col-md-3 col-3"
                              onClick={() => handleDeleteFilters(data?.id)}
                            >
                              <img
                                src={cross_icon}
                                className="cross_icon_style"
                              />
                            </div>
                          </div>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>
          ) : null}

          <div className="row mb-4 mt-2">
            <div className="col-lg-6 col-md-6 col-12">
              <div className="row">
                <div className="col-lg-5 col-md-6 col-6">
                  <p className="show_available_lead_para">
                    Show only available leads
                  </p>
                </div>
                <div className="col-lg-3 col-md-6 col-6 toggle_div_setting">
                  <input
                    type="checkbox"
                    id="switch"
                    checked={toggleState}
                    onChange={handleToggle}
                  />
                  <label
                    className="labelmainmenu"
                    htmlFor="switch"
                    onClick={handleAPICall}
                  >
                    Toggle
                  </label>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-2 col-12"> </div>
            <div className="col-lg-4 col-md-4 col-12">
              <p className="more_filter" onClick={handleClickSearch}>
                <img src={more_filter} />{" "}
                {isEnlargedSearch ? " Hide Filter" : " More Filter"}
              </p>
            </div>
          </div>
        </div>
        {errorMessage ? (
          <div className="mx-5 mt-3 mb-3">
            <Stack sx={{ width: "93%" }} spacing={3}>
              <Alert variant="outlined" severity="error">
                {errorMessage}
              </Alert>
            </Stack>
          </div>
        ) : null}
       {LeadsDashboard ? (
        LeadsDashboard.length > 0 ? (
          LeadsDashboard.map((showlead, index) => {
            const div_id = showlead?.div_id;
            const isDivExpanded = expandedDivs[div_id] || false;
            return (
              <div key={index} className="mb-4">
                <div
                  className={`property_listing_main_div row ${
                    isDivExpanded ? "expanded" : ""
                  }`}
                  id={div_id}
                  style={{
                    // Apply dynamic styles based on expanded state
                    height: isDivExpanded
                      ? "auto"
                      : window.innerWidth <= 2800
                      ? "350px"
                      : window.innerWidth <= 2500
                      ? "350px"
                      : window.innerWidth <= 2153
                      ? "350px"
                      : window.innerWidth <= 2051
                      ? "350px"
                      : window.innerWidth <= 1919
                      ? "350px"
                      : window.innerWidth <= 1440
                      ? "350px"
                      : window.innerWidth <= 1384
                      ? "410px"
                      : window.innerWidth <= 1024
                      ? "410px"
                      : window.innerWidth <= 970
                      ? "620px"
                      : window.innerWidth <= 768
                      ? "620px"
                      : window.innerWidth <= 590
                      ? "830px"
                      : window.innerWidth <= 426
                      ? "830px"
                      : window.innerWidth <= 376
                      ? "830px"
                      : window.innerWidth <= 320
                      ? "1075px"
                      : "350px",

                    overflow: isDivExpanded ? "visible" : "hidden", // Set overflow property
                  }}
                >
                  <div className="col-lg-3 col-md-4 container-fluid mt-2">
                    <div className="row map_display_on_mobile">
                      <div className="col-sm-3">
                        {showlead?.status === "on hold" ? (
                          <>
                            <button className="hold_button_first_div_display">
                              <img src={hold_icon} />
                              On Hold
                            </button>
                          </>
                        ) : (
                          <button className="hot_button_first_div_display">
                            <img src={hot_icon} /> HOT
                          </button>
                        )}
                      </div>
                      <div className="col-sm-9">
                        <div className="picture_div_first_div"></div>
                      </div>
                    </div>
                    <p className="name_style">{showlead?.seller?.full_name}</p>
                    <p className="city_name_style">
                      {showlead?.county?.name}, {showlead?.state?.name}
                    </p>
                    <div className="row">
                      <div className="col-lg-1 col-md-2 col-1">
                        <img src={city} />
                      </div>
                      <div className="col-lg-10 col-md-9 col-10">
                        <p className="city_detail_style">
                          City: {showlead?.city?.name} County:{" "}
                          {showlead?.county?.name}
                        </p>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-1 col-md-2 col-1">
                        <img src={date_time} />
                      </div>
                      <div className="col-lg-10 col-md-9 col-10">
                        <p className="date_time_detail_style">
                          {showlead?.created_at}
                        </p>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-1 col-md-2 col-1">
                        <img src={orders} />
                      </div>
                      <div className="col-lg-10 col-md-9 col-10">
                        <p className=" order_style">
                          {showlead?.orders_count} Orders
                        </p>
                      </div>
                    </div>
                    {showlead?.description?.key1 ? (
                      <>
                        <div className="row">
                          <div className="col-lg-1 col-md-2 col-1">
                            <img src={cashofferoption} />
                          </div>
                          <div className="col-lg-10 col-md-9 col-10">
                            <p className=" para_col_one">
                              {showlead?.description?.key1}
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-1 col-md-2 col-1">
                            <img src={phone_no} />
                          </div>
                          <div className="col-lg-10 col-md-9 col-10">
                            <p className=" para_col_one">
                              {showlead?.description?.key2}
                            </p>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-1 col-md-2 col-1">
                            <img src={seller_identity} />
                          </div>
                          <div className="col-lg-10 col-md-9 col-10">
                            <p className=" para_col_one">
                              {showlead?.description?.key3}
                            </p>
                          </div>
                        </div>
                      </>
                    ) : null}
                  </div>
                  <div className="col-lg-3 col-md-4 container-fluid mt-2 second_div_main_seller_motivation">
                    {showlead?.status === "on hold" ? null : (
                      <>
                        <div className="row mb-2">
                          <div className="col-lg-2 col-md-3 col-1">
                            <img src={seller_motivation} />
                          </div>
                          <div className="col-lg-10 col-md-9 col-10">
                            <div className="row">
                              <p className="question_col_two col-lg-12 col-md-12 col-6">
                                Seller motivation
                              </p>
                              <p className="answer_col_two col-lg-12 col-md-12 col-6">
                                {showlead?.motivation}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-lg-2 col-md-3 col-1">
                            <img src={living_in_house} />
                          </div>
                          <div className="col-lg-10 col-md-9 col-10">
                            <div className="row">
                              <p className="question_col_two col-lg-12 col-md-12 col-6">
                                Anyone living in the house?{" "}
                              </p>
                              <p className="answer_col_two col-lg-12 col-md-12 col-6">
                                {showlead?.occupancy}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-lg-2 col-md-3 col-1">
                            <img src={fast} />
                          </div>
                          <div className="col-lg-10 col-md-9 col-10">
                            <div className="row">
                              <p className="question_col_two col-lg-12 col-md-12 col-6">
                                How fast you want to sell?
                              </p>
                              <p className="answer_col_two col-lg-12 col-md-12 col-6">
                                {showlead?.ideal_selling_timeframe}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-lg-2 col-md-3 col-1">
                            <img src={agent} />
                          </div>
                          <div className="col-lg-10 col-md-9 col-10">
                            <div className="row">
                              <p className="question_col_two col-lg-12 col-md-12 col-6">
                                Owner or Agent/Wholesaler?
                              </p>
                              <p className="answer_col_two col-lg-12 col-md-12 col-6">
                                {showlead?.owner_wholesaler}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-lg-2 col-md-3 col-1">
                            <img src={mortage} />
                          </div>
                          <div className="col-lg-10 col-md-9 col-10">
                            <div className="row">
                              <p className="question_col_two col-lg-12 col-md-12 col-6">
                                Mortgage{" "}
                              </p>
                              <p className="answer_col_two col-lg-12 col-md-12 col-6">
                                {showlead?.mortgage}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-lg-2 col-md-3 col-1">
                            <img src={estate_agent} />
                          </div>
                          <div className="col-lg-10 col-md-9 col-10">
                            <div className="row">
                              <p className="question_col_two col-lg-12 col-md-12 col-6">
                                Is your property listed with a real estate
                                agent?
                              </p>
                              <p className="answer_col_two col-lg-12 col-md-12 col-6">
                                {showlead?.listed_with_real_estate_agent}
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="col-lg-3 col-md-4 container-fluid mt-2 third_div_main_repair_needed">
                    {showlead?.status === "on hold" ? null : (
                      <>
                   
                        <div className="row mb-2">
                          <div className="col-lg-2 col-md-2 col-1">
                            <img src={repair_need} />
                          </div>
                          <div className="col-lg-10 col-md-9 col-10">
                            <div className="row">
                              <p className="question_col_two col-lg-12 col-md-12 col-6">
                                Repairs needed
                              </p>

                              {showlead?.repairs_needed == "" ? (
                                <p className="answer_col_two_hide col-lg-12 col-md-12 col-6">
                                  dummy data
                                </p>
                              ) : (
                                <p className="answer_col_two col-lg-12 col-md-12 col-6">
                                  {showlead?.repairs_needed}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-lg-2 col-md-2 col-1">
                            <img src={prop_condition} />
                          </div>
                          <div className="col-lg-10 col-md-9 col-10">
                            <div className="row">
                              <p className="question_col_two col-lg-12 col-md-12 col-6">
                                Prop. condition
                              </p>
                              {showlead?.property_condition == "" ? (
                                <p className="answer_col_two_hide col-lg-12 col-md-12 col-6">
                                  dummy data
                                </p>
                              ) : (
                                <p className="answer_col_two col-lg-12 col-md-12 col-6">
                                  {showlead?.property_condition}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-lg-2 col-md-2 col-1">
                            <img src={owned_it} />
                          </div>
                          <div className="col-lg-10 col-md-9 col-10">
                            <div className="row">
                              <p className="question_col_two col-lg-12 col-md-12 col-6">
                                How long have you owned it?
                              </p>

                              {showlead?.how_long_you_owned == "" ? (
                                <p className="answer_col_two_hide col-lg-12 col-md-12 col-6">
                                  dummy data
                                </p>
                              ) : (
                                <p className="answer_col_two col-lg-12 col-md-12 col-6">
                                  {showlead?.how_long_you_owned}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-lg-2 col-md-2  col-1">
                            <img src={bathroom} />
                          </div>
                          <div className="col-lg-10 col-md-9 col-10">
                            <div className="row">
                              <p className="question_col_two col-lg-12 col-md-12 col-6">
                                Bathrooms
                              </p>

                              {showlead?.baths == "" ? (
                                <p className="answer_col_two_hide col-lg-12 col-md-12 col-6">
                                  dummy data
                                </p>
                              ) : (
                                <p className="answer_col_two col-lg-12 col-md-12 col-6">
                                  {showlead?.baths}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-lg-2 col-md-2 col-1">
                            <img src={bedroom} />
                          </div>
                          <div className="col-lg-10 col-md-9 col-10">
                            <div className="row">
                              <p className="question_col_two col-lg-12 col-md-12 col-6">
                                Bedrooms
                              </p>

                              {showlead?.beds == "" ? (
                                <p className="answer_col_two_hide col-lg-12 col-md-12 col-6">
                                  dummy data
                                </p>
                              ) : (
                                <p className="answer_col_two col-lg-12 col-md-12 col-6">
                                  {showlead?.beds}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-lg-2 col-md-2 col-1">
                            <img src={construction} />
                          </div>
                          <div className="col-lg-10 col-md-9 col-10">
                            <div className="row">
                              <p className="question_col_two col-lg-12 col-md-12 col-6">
                                Year of construction
                              </p>

                              {showlead?.year_of_construction == "" ? (
                                <p className="answer_col_two_hide col-lg-12 col-md-12 col-6">
                                  dummy data
                                </p>
                              ) : (
                                <p className="answer_col_two col-lg-12 col-md-12 col-6">
                                  {showlead?.year_of_construction}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-lg-2 col-md-2 col-1">
                            <img src={type_of_house} />
                          </div>
                          <div className="col-lg-10 col-md-9 col-10">
                            <div className="row">
                              <p className="question_col_two col-lg-12 col-md-12 col-6">
                                Type of house
                              </p>

                              {showlead?.type_of_house == "" ? (
                                <p className="answer_col_two_hide col-lg-12 col-md-12 col-6">
                                  dummy data
                                </p>
                              ) : (
                                <p className="answer_col_two col-lg-12 col-md-12 col-6">
                                  {showlead?.type_of_house}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-lg-2 col-md-2 col-1">
                            <img src={sqaure_footage} />
                          </div>
                          <div className="col-lg-10 col-md-9 col-10">
                            <div className="row">
                              <p className="question_col_two col-lg-12 col-md-12 col-6">
                                square footage
                              </p>

                              {showlead?.square_footage == "" ? (
                                <p className="answer_col_two_hide col-lg-12 col-md-12 col-6">
                                  dummy data
                                </p>
                              ) : (
                                <p className="answer_col_two col-lg-12 col-md-12 col-6">
                                  {showlead?.square_footage}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-lg-2 col-md-2 col-1">
                            <img src={zip_code} />
                          </div>
                          <div className="col-lg-10 col-md-9 col-10">
                            <div className="row">
                              <p className="question_col_two col-lg-12 col-md-12 col-6">
                                ZIP code
                              </p>

                              {showlead?.zip_code == "" ? (
                                <p className="answer_col_two_hide col-lg-12 col-md-12 col-6">
                                  dummy data
                                </p>
                              ) : (
                                <p className="answer_col_two col-lg-12 col-md-12 col-6">
                                  {showlead?.zip_code}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="col-lg-3 col-md-4 mt-1">
                    <div className="row">
                      <div className="col-lg-11">
                        <div className="main_div_hot_button_picture">
                          {showlead?.status === "on hold" ? (
                            <>
                              <button className="hold_button">
                                <img src={hold_icon} /> On Hold
                              </button>
                            </>
                          ) : (
                            <button className="hot_button">
                              <img src={hot_icon} /> HOT
                            </button>
                          )}
                          <div className="picture_div_forth_div"></div>
                        </div>
                        {showlead?.status === "on hold" ? null : (
                          <>
                            <div className="row">
                              <p className="rate_property mt-2 col-lg-5 col-md-12 col-5">
                                $ {showlead?.price}
                              </p>
                              <button
                                className="buy_lead_button_forth_one col-lg-5 col-md-12 col-6"
                                data-toggle="modal"
                                data-target="#exampleModalCenter"
                                id={showlead?.id}
                                onClick={() => {
                                  setPrice(showlead?.price);
                                  setButtonId(showlead?.id);
                                }}
                              >
                                BUY LEAD
                              </button>

                              <Modal price={price} buttonId={buttonId} />
                              <p className="col-lg-6 col-md-12 col-5"></p>
                              <p className="off_market_gurante col-lg-6 col-md-12 col-6">
                                Off market guarantee
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* <button className="more_detail_button" onClick={handleClick}>
        <img src={isEnlarged ? hidenicon : moredetailicon} alt="icon" />
        {isEnlarged ? " Hide" : " More Details"}
      </button> */}
                {showlead?.status === "on hold" ? null : (
                  <>
                    <button
                      className="more_detail_button"
                      onClick={() => handleClick(div_id)}
                      style={
                        isDivExpanded
                          ? { background: "#676767" }
                          : { background: "#5869cb" }
                      }
                    >
                      <img
                        src={
                          isDivExpanded
                            ? showlead?.additional_data?.hide_icon
                            : showlead?.additional_data?.more_details_icon
                        }
                      />{" "}
                      {isDivExpanded
                        ? showlead?.additional_data?.hide
                        : showlead?.additional_data?.more_details}
                    </button>
                  </>
                )}
              </div>
            );
          })
          ) : (
            <div className="mt-3">
            <div className="no_data_found_div_mainmenu">Leads data found</div>
          </div>
          )
        ) : (
          <SpinnerLoader />
        )}

        {console.log(LeadsDashboard,"LeadsDashboard data")}
      </>

      <></>

      {totalPages > 0 && (
        <div className="pagination_main_div">
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

      <TicketandLiveChat />

      <ScrollTop />

      <></>
    </>
  );
}

export default MainMenu;

// payment modal (on buy lead button click)

const stripePromise = loadStripe(
  "pk_test_51NzsyWERnYtfT4FUpZVcyWtCmYPDykLnsiMWMvroGvRgdlC52aO6CMyrOh4M2mdGMm16yJDRBVzQ6ciF3qwdlT6b00e9J3Hei8"
);

function Modal({ price, buttonId }) {
  // Use the buttonId prop within the modal

  return (
    <div>
      <div
        class="modal fade"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Make payment
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                // onClick={MainMenu}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p> Lead ID: {buttonId}</p>
              {/* <p>Buy Type: Permanently</p> */}
              <p>Price: ${price}</p>

              <Elements stripe={stripePromise}>
                <PaymentForm leadid={buttonId} leadprice={price} />
              </Elements>
            </div>
            <div class="modal-footer">
              {/* <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
