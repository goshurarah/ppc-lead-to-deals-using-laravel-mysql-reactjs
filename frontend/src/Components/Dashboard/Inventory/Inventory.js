import React, { useEffect, useState, useRef } from "react";
import "./../Inventory/InventoryStyle.css";
import mortgagelead from "./../../../Assets/lead_mortgage.png";
import owneragent from "./../../../Assets/owneroragentlead.png";
import fasttheywantsell from "./../../../Assets/want_to_sell_lead.png";
import realestateagent from "./../../../Assets/real_estate_agent_lead.png";
import livinginhouse from "./../../../Assets/living_in_house_lead.png";
import bathroom from "./../../../Assets/bathroomslead.png";
import bedroom from "./../../../Assets/bedroomlead.png";
import owned_it from "./../../../Assets/owneditlead.png";
import prop_condition from "./../../../Assets/propconditionlead.png";
import repair_need from "./../../../Assets/repirneededlead.png";
import type_of_house from "./../../../Assets/typeofhouselead.png";
import motivation from "./../../../Assets/motivation_lead.png";
import pool from "./../../../Assets/pool_lead.png";
import squarefootage from "./../../../Assets/sqr.png";
import zipcode from "./../../../Assets/zipcode_LEAD.png";
import garage from "./../../../Assets/garagelead.png";
import yearconstruction from "./../../../Assets/YEARCONSTRUCTION.png";
import negotiable from "./../../../Assets/negotiation_lead.png";
import arrowdown from "./../../../Assets/downarrowforsearch.png";
import clearpage from "./../../../Assets/clearpageicon.png";
import axios from "axios";
import CustomNotification from "../CustomNotification/CustomNotification";
import RedNotification from "../CustomNotification/RedNotification";
import { Navigate } from "react-router-dom";
import SpinnerLoader from "../SpinnerLoader/SpinnerLoader";
function Inventory() {
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

  //get the token from local storage to authorize  the get api
  const token = localStorage.getItem("token");
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const [storestate, setstorestate] = useState("");
  const [storecounty, setstorecounty] = useState("");
  const [storecity, setstorecity] = useState("");

  const [statedata, setStateData] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedOptionstates, setSelectedOptionstates] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    getStatedata();
  }, []);

  const getStatedata = () => {
    axios
      .get(`/api/get-states`)
      .then((res) => {
        setStateData(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching states data:", error);
      });
  };

  const [citydata, setcityData] = useState([]);

  useEffect(() => {
    getCityData();
  }, []);

  const getCityData = () => {
    axios
      .get(`/api/get-cities`)
      .then((res) => {
        setcityData(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching states data:", error);
      });
  };
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setDropdownOpen(true);
  };

  const handleOptionChange = (option) => {
    setSelectedOptionstates(option);
    setDropdownOpen(false);
  };

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
    setFiltercounty(event.target.value);
    setDropdownOpen(true);
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

  // select city
  // const [cityData, setCityData] = useState("");
  // useEffect(() => {
  //   fetchcityDropdownData();
  // }, [selectedOptioncounty]);

  // const fetchcityDropdownData = () => {
  //   axiosInstance
  //     .get(
  //       `/api/dashboard/get-cities-dropdown-main-menu?county_name=${selectedOptioncounty}`
  //     )
  //     .then((res) => {
  //       setCityData(res.data);
  //     });
  // };

  const [dropdownOpencity, setDropdownOpencity] = useState(false);
  const [filtercity, setFiltercity] = useState("");
  const [selectedOptioncity, setSelectedOptioncity] = useState("");
  const dropdownRefcity = useRef(null);

  useEffect(() => {
    // Add event listeners when the component mounts
    document.addEventListener("click", handleOutsideClickcity);
    window.addEventListener("scroll", handleScrollcity);

    // Remove event listeners when the component unmounts
    return () => {
      document.removeEventListener("click", handleOutsideClickcity);
      window.removeEventListener("scroll", handleScrollcity);
    };
  }, []);

  const toggleDropdowncity = () => {
    setDropdownOpencity(!dropdownOpencity);
  };

  const handleFilterChangecity = (event) => {
    setFiltercity(event.target.value);
    setDropdownOpencity(true);
  };

  const handleOptionChangecity = (option) => {
    setSelectedOptioncity(option);
    setDropdownOpencity(false);
  };

  const handleOutsideClickcity = (event) => {
    if (
      dropdownRefcity.current &&
      !dropdownRefcity.current.contains(event.target)
    ) {
      // Clicked outside the dropdown, close it
      setDropdownOpencity(false);
    }
  };

  const handleScrollcity = () => {
    // Scrolling detected, close the dropdown
    setDropdownOpencity(false);
  };

  const [sellerName, setsellerName] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [listedWithAgent, setListedWithAgent] = useState("");
  const [livingInHouse, setLivingInHouse] = useState("");
  const [ownerType, setOwnerType] = useState("");
  const [propertyowner, setpropertyowner] = useState("");
  const [mortagageselect, setmortagage] = useState("");
  const [address, setaddress] = useState("");
  const [currentownername, setcurrentownername] = useState("");
  const [askingprice, setaskingprice] = useState("");
  const [expirationdate, setexpirationdate] = useState("");
  const [monthlyrent, setmonthlyrent] = useState("");
  const [status, setstatus] = useState("");
  const [price, setprice] = useState("");
  const [uploadpic, setuploadpic] = useState("");
  const [voilations, setvoilations] = useState("");
  const [conversation, setconversation] = useState("");
  const [motivations, setmotivation] = useState("");
  const [negotiation, setnegotiation] = useState("");
  const [description, setdescription] = useState("");
  const [pools, setpools] = useState("");
  const [garages, setgarages] = useState("");
  const [squarefootages, setsquarefootages] = useState("");
  const [zipCode, setzipcode] = useState("");
  const [yearConstruction, setyearconstruction] = useState("");
  const [source, setsource] = useState("");

  const handlesource = (event) => {
    setsource(event.target.value);
  };

  const handleaddress = (event) => {
    setaddress(event.target.value);
  };
  const handlecurrentownername = (event) => {
    setcurrentownername(event.target.value);
  };
  const handleaskingprice = (event) => {
    setaskingprice(event.target.value);
  };
  const handleexpirationdate = (event) => {
    setexpirationdate(event.target.value);
  };
  const handlemonthlyrent = (event) => {
    setmonthlyrent(event.target.value);
  };
  const handlestatus = (event) => {
    setstatus(event.target.value);
  };
  const handleprice = (event) => {
    setprice(event.target.value);
  };
  const handleuploadpic = (event) => {
    setuploadpic(event.target.value);
  };
  const handlevoilations = (event) => {
    setvoilations(event.target.value);
  };
  const handleconversation = (event) => {
    setconversation(event.target.value);
  };
  const handlemotivation = (event) => {
    setmotivation(event.target.value);
  };
  const handledescription = (event) => {
    setdescription(event.target.value);
  };

  const handlenegotiation = (event) => {
    setnegotiation(event.target.value);
  };
  const handlegarages = (event) => {
    setgarages(event.target.value);
  };

  const handlepools = (event) => {
    setpools(event.target.value);
  };

  const handlesquarefootages = (event) => {
    setsquarefootages(event.target.value);
  };

  const handlezipCode = (event) => {
    setzipcode(event.target.value);
  };

  const handleyearConstruction = (event) => {
    setyearconstruction(event.target.value);
  };

  const [repairsNeeded, setRepairsNeeded] = useState("");
  const [propertyCondition, setPropertyCondition] = useState("");
  const [ownedDuration, setOwnedDuration] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [houseType, setHouseType] = useState("");
  const [email, setemail] = useState("");
  const [phonenumber, setphonenumber] = useState("");

  const handleEmailChange = (event) => {
    setemail(event.target.value);
  };

  const handlePhonenumberChange = (event) => {
    setphonenumber(event.target.value);
  };

  // console.log(sellerName, "seller Name");
  // console.log(selectedValue, "how fast they want to sell");
  // console.log(
  //   listedWithAgent,
  //   "  Is your property listed with a real estate agent"
  // );
  // console.log(livingInHouse, " Anyone living in the house");
  // console.log(ownerType, " Owner or Agent/Wholesaler");
  // console.log(propertyCondition, "property Condition");
  // console.log("Mortgage", mortagageselect);
  // console.log(repairsNeeded, "   Repairs needed");
  // console.log(ownedDuration, "   How long have you owned it ?");
  // console.log(bathrooms, "bathroom");
  // console.log(bedrooms, "bedrooms");
  // console.log(houseType, "houseType");

  const handleSetsellerName = (event) => {
    setsellerName(event.target.value);
  };

  const handleSellSpeedChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleListedWithAgentChange = (event) => {
    setListedWithAgent(event.target.value);
  };

  const handleLivingInHouseChange = (event) => {
    setLivingInHouse(event.target.value);
  };

  const handleOwnerTypeChange = (event) => {
    setOwnerType(event.target.value);
  };

  const handlepropertyownerChange = (event) => {
    setpropertyowner(event.target.value);
  };

  const handlemortagageChange = (event) => {
    setmortagage(event.target.value);
  };

  const handleRepairsNeededChange = (event) => {
    setRepairsNeeded(event.target.value);
  };

  const handlePropertyConditionChange = (event) => {
    setPropertyCondition(event.target.value);
  };

  const handleOwnedDurationChange = (event) => {
    setOwnedDuration(event.target.value);
  };

  const handleBathroomsChange = (event) => {
    setBathrooms(event.target.value);
  };

  const handleBedroomsChange = (event) => {
    setBedrooms(event.target.value);
  };

  const handleHouseTypeChange = (event) => {
    setHouseType(event.target.value);
  };

  const [notificationMessageRed, setnotificationMessageRed] = useState(null);
  const [notificationMessage, setnotificationMessage] = useState(null);

  // GET SELLER NAME
  const [sallername, setsallername] = useState([]);
  const [storeseller, setstoreseller] = useState([]);
  useEffect(() => {
    getsellerdata();
  }, []);

  const getsellerdata = () => {
    axiosInstance.get(`/api/dashboard/get-all-sellers`).then((res) => {
      setsallername(res?.data);
    });
  };

  const [dropdownOpenseller, setDropdownOpenseller] = useState(false);
  const [filterseller, setFilterseller] = useState("");
  const [selectedOptionseller, setSelectedOptionseller] = useState("");
  const dropdownRefseller = useRef(null);

  useEffect(() => {
    // Add event listeners when the component mounts
    document.addEventListener("click", handleOutsideClickseller);
    window.addEventListener("scroll", handleScrollseller);

    // Remove event listeners when the component unmounts
    return () => {
      document.removeEventListener("click", handleOutsideClickseller);
      window.removeEventListener("scroll", handleScrollseller);
    };
  }, []);

  const toggleDropdownseller = () => {
    setDropdownOpenseller(!dropdownOpenseller);
  };

  const handleFilterChangeseller = (event) => {
    const filterText = event.target.value.toLowerCase(); // Convert filter text to lowercase
    setFilterseller(filterText);
    // Keep the dropdown open when typing
    // setDropdownOpenseller(true); // You can remove this line
  };

  const handleOptionChangeseller = (option) => {
    setSelectedOptionseller(option);
    setDropdownOpenseller(false);
  };

  const handleOutsideClickseller = (event) => {
    if (
      dropdownRefseller.current &&
      !dropdownRefseller.current.contains(event.target)
    ) {
      // Clicked outside the dropdown or input field, close it
      setDropdownOpenseller(false);
    }
  };

  const handleScrollseller = () => {
    // Scrolling detected, close the dropdown
    setDropdownOpenseller(false);
  };

  const [fullAddress, setFullAddress] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [cityId, setCityId] = useState(null);
  const [StateId, setStateId] = useState(null);
  const [CountyId, setCountyId] = useState(null);
  const [cities, setCities] = useState([]);

  const handleAddressChange = (event) => {
    const { value } = event.target;
    setFullAddress(value);
    const parts = value.split(",").map((part) => part.trim());
    if (parts.length >= 3) {
      setStreet(parts[0]);
      setCity(parts[1].toUpperCase());
      const stateZipArray = parts[2].split(" ");
      if (stateZipArray.length >= 2) {
        setState(stateZipArray[0]);
        setZip(stateZipArray[1]);
      }
    }
  };

  useEffect(() => {
    // This code will run when 'state' changes
    const foundState = statedata.find((item) => item.code === state);

    if (foundState) {
      setStateId(foundState.id);
    } else {
      setStateId(null);
    }
  }, [state]);

  useEffect(() => {
    // This code will run when 'city' changes
    const foundCity = citydata.find((item) => item.name === city);

    if (foundCity) {
      setCityId(foundCity.id);
      setCountyId(foundCity.county_id);
    } else {
      setCityId(null);
      setCountyId(null);
    }
  }, [city]);

  // console.log(StateId,"iddddddddddddddd",cityId,"city idddddddddd",CountyId,"county idddd" )

  const CreateleadAction = (e) => {
    e.preventDefault();
    let payload = {
      seller_id: storeseller,
      // seller_name: selectedOptionseller,
      email: email,
      phone: phonenumber,
      state_id: StateId,
      county_id: CountyId,
      city_id: cityId,
      address: fullAddress,
      price: askingprice,
      currently_possessed_by: currentownername,
      conversation: conversation,
      description: description,
      expiration_time: expirationdate,
      garage: garages,
      monthly_rental_amount: monthlyrent,
      motivation: motivations,
      pictures: uploadpic,
      pool: pools,
      // price: price,
      square_footage: squarefootages,
      status: status,
      type_of_house: houseType,
      violations: voilations,
      year_of_construction: yearConstruction,
      zip_code: zipCode,
      ideal_selling_timeframe: selectedValue,
      listed_with_real_estate_agent: listedWithAgent,
      occupancy: livingInHouse,
      owner_wholesaler: ownerType,
      mortgage: mortagageselect,
      repairs_needed: repairsNeeded,
      property_condition: propertyCondition,
      how_long_you_owned: ownedDuration,
      type_of_house: houseType,
      baths: bathrooms,
      beds: bedrooms,
      source: source,
    };
    axiosInstance
      .post("/api/dashboard/create-lead", payload)
      .then((r) => {
        // setnotificationMessage(r.data.data.message);
        setnotificationMessage("Lead Create Successfully!");
        // clearvaluesincreatelead();
        // setTimeout(() => {
        //     Navigate("/dashboard");
        //   }, 4000);
        setstorecounty("");
        setstorestate("");
        setstorecity("");
        setmortagage("");
        setpropertyowner("");
        setOwnerType("");
        setLivingInHouse("");
        setOwnerType("");
        setSelectedValue("");
        setsellerName("");
        setyearconstruction("");
        setzipcode("");
        setsquarefootages("");
        setgarages("");
        setpools("");
        setdescription("");
        setnegotiation("");
        setmotivation("");
        setconversation("");
        setvoilations("");
        setuploadpic("");
        setprice("");
        setstatus("");
        setmonthlyrent("");
        setexpirationdate("");
        setaskingprice("");
        setaddress("");
        setcurrentownername("");
        setstoreseller("");
        setsallername("");
        setHouseType("");
        setBathrooms("");
        setBedrooms("");
        setOwnedDuration("");
        setPropertyCondition("");
        setRepairsNeeded("");
        setemail("");

        setphonenumber("");
        setSelectedOptioncity("");
        setSelectedOptioncounty("");
        setSelectedOptionstates("");
        setSelectedOptionseller("");
        setListedWithAgent("");

        setCountyId("");
        setStateId("");
        setCityId("");
        setZip("");
        setState("");
        setCity("");
        setStreet("");
        setFullAddress("");
        setsource("");
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

  const clearvaluesincreatelead = () => {
    setstorecounty("");
    setstorestate("");
    setstorecity("");
    setmortagage("");
    setpropertyowner("");
    setOwnerType("");
    setLivingInHouse("");
    setOwnerType("");
    setSelectedValue("");
    setsellerName("");
    setyearconstruction("");
    setzipcode("");
    setsquarefootages("");
    setgarages("");
    setpools("");
    setdescription("");
    setnegotiation("");
    setmotivation("");
    setconversation("");
    setvoilations("");
    setuploadpic("");
    setprice("");
    setstatus("");
    setmonthlyrent("");
    setexpirationdate("");
    setaskingprice("");
    setaddress("");
    setcurrentownername("");
    setstoreseller("");
    setsallername("");
    setHouseType("");
    setBathrooms("");
    setBedrooms("");
    setOwnedDuration("");
    setPropertyCondition("");
    setRepairsNeeded("");
    setemail("");

    setphonenumber("");
    setSelectedOptioncity("");
    setSelectedOptioncounty("");
    setSelectedOptionstates("");
    setSelectedOptionseller("");
    setListedWithAgent("");

    setsource("");

    setCountyId("");
    setStateId("");
    setCityId("");
    setZip("");
    setState("");
    setCity("");
    setStreet("");
    setFullAddress("");
  };

  return (
    <div>
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
      <p className="heading_inventory">Fill the Form to Add New Lead</p>

      <div className="main_div_form_inventory">
        {/* <form onSubmit={CreateleadAction}> */}

        <div className="row">
          <div className="col-lg-5 ">
            <div
              className="input_form_add_lead row"
              onClick={toggleDropdownseller}
            >
              <div
                className="dropdowni col-lg-10 col-md-10 col-10 m-0 p-0"
                ref={dropdownRefseller}
              >
                <button className="dropbtni">
                  {selectedOptionseller ? (
                    selectedOptionseller
                  ) : (
                    <span>
                      Seller Name <font color="red">*</font>
                    </span>
                  )}
                </button>
                <div
                  id="myDropdowni"
                  className={`dropdown-contenti ${
                    dropdownOpenseller ? "showi" : ""
                  }`}
                >
                  <input
                    type="text"
                    placeholder="Search.."
                    id="myInputi"
                    onClick={(e) => e.stopPropagation()} // Prevent the click event from bubbling to the parent div
                    onChange={handleFilterChangeseller}
                    value={filterseller}
                    required
                  />
                  {sallername.data ? (
                    sallername.data
                      .filter((item) =>
                        item.full_name.toLowerCase().includes(filterseller)
                      )
                      .map((item) => (
                        <a
                          key={item.id}
                          onClick={() => {
                            handleOptionChangeseller(item.full_name);
                            setstoreseller(item.id);
                          }}
                        >
                          {item.full_name}
                        </a>
                      ))
                  ) : (
                    <SpinnerLoader />
                  )}
                </div>
              </div>
              <div className="col-lg-2 col-md-2 col-2">
                <img
                  src={arrowdown}
                  className="arrow_down_inventory"
                  alt="Arrow Down"
                />
              </div>
            </div>
            {/* <div
              className="input_form_add_lead_first row"
              onClick={toggleDropdown}
            >
              <div
                className="dropdowni col-lg-10 col-md-10 col-10 m-0 p-0"
                ref={dropdownRef}
              >
                <button className="dropbtni">
                  {selectedOptionstates ? selectedOptionstates : "States *"}
                </button>
                <div
                  id="myDropdowni"
                  className={`dropdown-contenti ${dropdownOpen ? "showi" : ""}`}
                >
                  <input
                    type="text"
                    placeholder="Search.."
                    id="myInputi"
                    onChange={handleFilterChange}
                    value={filter}
                  />
                  {statedata
                    ? statedata
                        .filter((item) =>
                          item.name.toLowerCase().includes(filter.toLowerCase())
                        )
                        .map((item) => (
                          <a
                            key={item.id}
                            onClick={() => {
                              handleOptionChange(item.name);
                              setstorestate(item.id);
                            }}
                          >
                            {item.name}
                          </a>
                        ))
                    : null}
                </div>
              </div>
              <div className="col-lg-2 col-md-2 col-2">
                <img
                  src={arrowdown}
                  className="arrow_down_inventory"
                  alt="Arrow Down"
                />
              </div>
            </div>

            <div
              className="input_form_add_lead_first row"
              onClick={toggleDropdowncounty}
            >
              <div
                className="dropdowni col-lg-10 col-md-10 col-10 m-0 p-0"
                ref={dropdownRefcounty}
              >
                <button className="dropbtni">
                  {selectedOptioncounty ? selectedOptioncounty : "County *"}
                </button>
                <div
                  id="myDropdowni"
                  className={`dropdown-contenti ${
                    dropdownOpencounty ? "showi" : ""
                  }`}
                >
                  <input
                    type="text"
                    placeholder="Search.."
                    id="myInputi"
                    onChange={handleFilterChangecounty}
                    value={filtercounty}
                  />
                  {countyData.data
                    ? countyData.data
                        .filter((item) =>
                          item.name
                            .toLowerCase()
                            .includes(filtercounty.toLowerCase())
                        )
                        .map((item) => (
                          <a
                            key={item.id}
                            onClick={() => {
                              handleOptionChangecounty(item.name);
                              setstorecounty(item.id);
                            }}
                          >
                            {item.name}
                          </a>
                        ))
                    : null}
                </div>
              </div>
              <div className="col-lg-2 col-md-2 col-2">
                <img
                  src={arrowdown}
                  className="arrow_down_inventory"
                  alt="Arrow Down"
                />
              </div>
            </div>

            <div
              className="input_form_add_lead_first row"
              onClick={toggleDropdowncity}
            >
              <div
                className="dropdowni col-lg-10 col-md-10 col-10 m-0 p-0"
                ref={dropdownRefcity}
              >
                <button className="dropbtni">
                  {selectedOptioncity ? selectedOptioncity : "City *"}
                </button>
                <div
                  id="myDropdowni"
                  className={`dropdown-contenti ${
                    dropdownOpencity ? "showi" : ""
                  }`}
                >
                  <input
                    type="text"
                    placeholder="Search.."
                    id="myInputi"
                    onChange={handleFilterChangecity}
                    value={filtercity}
                  />
                  {cityData.data
                    ? cityData.data
                        .filter((item) =>
                          item.name
                            .toLowerCase()
                            .includes(filtercity.toLowerCase())
                        )
                        .map((item) => (
                          <a
                            key={item.id}
                            onClick={() => {
                              handleOptionChangecity(item.name);
                              setstorecity(item.id);
                            }}
                          >
                            {item.name}
                          </a>
                        ))
                    : null}
                </div>
              </div>
              <div className="col-lg-2 col-md-2 col-2">
                <img
                  src={arrowdown}
                  className="arrow_down_inventory"
                  alt="Arrow Down"
                />
              </div>
            </div> */}
            <input
              className="input_form_add_lead_first1"
              placeholder="Email *"
              onChange={handleEmailChange}
              value={email}
              title="Please enter a valid email address"
            />
            <input
              className="input_form_add_lead_first1"
              placeholder="Street, City, State ZIP code *"
              value={fullAddress}
              onChange={handleAddressChange}
              required
            />
            <input
              className="input_form_add_lead_first1"
              placeholder="Phone number *"
              onChange={handlePhonenumberChange}
              value={phonenumber}
              required
            />
            {/* <input
              className="input_form_add_lead_first1"
              placeholder="Current Owner Name *"
              onChange={handlecurrentownername}
              value={currentownername}
              required
            /> */}

            <div className="row">
              <div className="col-lg-6 col-md-6 col-6">
                <input
                  className="input_form_add_lead_half"
                  placeholder="Current Owner Name"
                  onChange={handlecurrentownername}
                  value={currentownername}
                  required
                />
              </div>
              <div className="col-lg-6 col-md-6 col-6">
                <input
                  className="input_form_add_lead_half"
                  placeholder="Source *"
                  onChange={handlesource}
                  value={source}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6 col-md-6 col-6">
                <input
                  type="date"
                  id="expirationDate"
                  className="input_form_add_lead_half1"
                  onChange={handleexpirationdate}
                  value={expirationdate}
                  placeholder="YYYY-MM-DD" // Add your desired placeholder text here
                />
              </div>

              <div className="col-lg-6 col-md-6 col-6">
                <input
                  className="input_form_add_lead_half"
                  placeholder="Monthly Rent *"
                  onChange={handlemonthlyrent}
                  value={monthlyrent}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-6">
                <select
                  className="input_form_add_lead_half1"
                  onChange={handlestatus}
                  value={status}
                >
                  <option value="">Status</option>
                  <option value="available">Available</option>
                  <option value="sold">Sold</option>
                  <option value="on hold">On Hold</option>
                </select>
              </div>
              <div className="col-lg-6 col-md-6 col-6">
                <input
                  className="input_form_add_lead_half"
                  placeholder="Asking Price *"
                  onChange={handleaskingprice}
                  value={askingprice}
                  required
                />
              </div>
            </div>
            <label className="input_form_add_lead_first">
              <input
                type="file"
                accept="image/*"
                onChange={handleuploadpic}
                value={uploadpic}
                className="date_input_lead"
              />
            </label>
            <textarea
              className="textarea_form_lead"
              placeholder="Violations  *"
              onChange={handlevoilations}
              value={voilations}
            ></textarea>
          </div>
          <div className="col-lg-4">
            <div className="main_second_column_lead_form">
              <div className="main_checkbox_div_lead">
                <div className="row">
                  <div className="col-lg-1 col-md-1 col-1">
                    <img src={fasttheywantsell} />
                  </div>
                  <div className="col-lg-10 col-md-10 col-10">
                    <p className="para_second_column_questions">
                      How fast they want to sell
                    </p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-1 col-md-1 col-1"></div>
                  <div className="col-lg-10 col-md-10 col-10">
                    <div className="checkbox-rectlead">
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
                        id="checkbox-rectlead"
                        name="check1"
                        value="30 days"
                        checked={selectedValue === "30 days"}
                        onChange={handleSellSpeedChange}
                      />
                      <label htmlFor="checkbox-rectlead">1 Month</label>

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
                </div>
              </div>

              <div className="main_checkbox_div_lead">
                <div className="row">
                  <div className="col-lg-1 col-md-1 col-1">
                    <img src={realestateagent} />
                  </div>
                  <div className="col-lg-10 col-md-10 col-10">
                    <p className="para_second_column_questions">
                      Is your property listed with a real estate agent
                    </p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-1 col-md-1 col-1"></div>
                  <div className="col-lg-10 col-md-10 col-10">
                    <div className="checkbox-rectlead">
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
                </div>
              </div>

              <div className="main_checkbox_div_lead">
                <div className="row">
                  <div className="col-lg-1 col-md-1 col-1">
                    <img src={livinginhouse} />
                  </div>
                  <div className="col-lg-10 col-md-10 col-10">
                    <p className="para_second_column_questions">
                      Anyone living in the house
                    </p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-1 col-md-1 col-1"></div>
                  <div className="col-lg-10 col-md-10 col-10">
                    <div className="checkbox-rectlead">
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
                </div>
              </div>

              <div className="main_checkbox_div_lead">
                <div className="row">
                  <div className="col-lg-1 col-md-1 col-1">
                    <img src={owneragent} />
                  </div>
                  <div className="col-lg-10 col-md-10 col-10">
                    <p className="para_second_column_questions">
                      Owner or Agent/Wholesaler
                    </p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-1 col-md-1 col-1"></div>
                  <div className="col-lg-10 col-md-10 col-10">
                    <div className="checkbox-rectlead">
                      <input
                        type="radio"
                        id="checkagent1"
                        name="checkagent1"
                        value="owner"
                        checked={ownerType === "owner"}
                        onChange={handleOwnerTypeChange}
                      />
                      <label htmlFor="checkagent1">
                        Yes, i own this property
                      </label>
                      <input
                        type="radio"
                        id="checkagent2"
                        name="checkagent2"
                        value="wholesaler"
                        checked={ownerType === "wholesaler"}
                        onChange={handleOwnerTypeChange}
                      />
                      <label htmlFor="checkagent2">Agent or wholesaler</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="main_checkbox_div_lead">
                <div className="row">
                  <div className="col-lg-1 col-md-1 col-1">
                    <img src={mortgagelead} />
                  </div>
                  <div className="col-lg-10 col-md-10 col-10">
                    <p className="para_second_column_questions">Mortgage</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-1 col-md-1 col-1"></div>
                  <div className="col-lg-10 col-md-10 col-10">
                    <div className="checkbox-rectlead">
                      <input
                        type="radio"
                        id="Mortgage1"
                        name="check5"
                        value="Yes and I am up to date on my mortgage"
                        checked={
                          mortagageselect ===
                          "Yes and I am up to date on my mortgage"
                        }
                        onChange={handlemortagageChange}
                      />
                      <label htmlFor="Mortgage1">
                        Yes and I am up to date on my mortgage
                      </label>
                      <input
                        type="radio"
                        id="Mortgage2"
                        name="check5"
                        value="Yes and I'm behind on my mortgage"
                        checked={
                          mortagageselect ===
                          "Yes and I'm behind on my mortgage"
                        }
                        onChange={handlemortagageChange}
                      />
                      <label htmlFor="Mortgage2">
                        Yes and I'm behind on my mortgage
                      </label>
                      <input
                        type="radio"
                        id="Mortgage3"
                        name="check5"
                        value="There is no mortgage"
                        checked={mortagageselect === "There is no mortgage"}
                        onChange={handlemortagageChange}
                      />
                      <label htmlFor="Mortgage3">There is no mortgage</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="main_checkbox_div_lead">
                <div className="row">
                  <div className="col-lg-1 col-md-1 col-1">
                    <img src={motivation} />
                  </div>
                  <div className="col-lg-10 col-md-10 col-10">
                    <p className="para_second_column_questions">Motivation</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-1 col-md-1 col-1"></div>
                  <div className="col-lg-10 col-md-10 col-10">
                    <div className="row">
                      <div className="col-lg-6">
                        <select
                          name="language"
                          id="language"
                          className="input_style_bath_lead"
                          onChange={handlemotivation}
                          value={motivations}
                        >
                          <option>Motivation</option>
                          <option
                            value="Preforeclosure"
                            checked={motivations === "Preforeclosure"}
                          >
                            Preforeclosure
                          </option>
                          <option
                            value="Emergency Reasons"
                            checked={motivations === "Emergency Reasons"}
                          >
                            Emergency Reasons
                          </option>
                          <option
                            value="Financial Reasons"
                            checked={motivations === "Financial Reasons"}
                          >
                            Financial Reasons
                          </option>
                          <option
                            value="Selling a vacant/non-occupied house"
                            checked={
                              motivations ===
                              "Selling a vacant/non-occupied house"
                            }
                          >
                            Selling a vacant/non-occupied house
                          </option>
                          <option
                            value="Sell and rent instead"
                            checked={motivations === "Sell and rent instead"}
                          >
                            Sell and rent instead
                          </option>
                          <option
                            value="Death in the family"
                            checked={motivations === "Death in the family"}
                          >
                            Death in the family
                          </option>
                          <option
                            value="Sell without showings"
                            checked={motivations === "Sell without showings"}
                          >
                            Sell without showings
                          </option>
                          <option
                            value="Inherited Property"
                            checked={motivations === "Inherited Property"}
                          >
                            Inherited Property
                          </option>
                          <option
                            value="Downsizing"
                            checked={motivations === "Downsizing"}
                          >
                            Downsizing
                          </option>
                          <option
                            value="Tired of being a landlord"
                            checked={
                              motivations === "Tired of being a landlord"
                            }
                          >
                            Tired of being a landlord
                          </option>
                          <option
                            value="Moving closer to family"
                            checked={motivations === "Moving closer to family"}
                          >
                            Moving closer to family
                          </option>
                          <option
                            value="Relocating"
                            checked={motivations === "Relocating"}
                          >
                            Relocating
                          </option>
                          <option
                            value="Retirement elsewhere"
                            checked={motivations === "Retirement elsewhere"}
                          >
                            Retirement elsewhere
                          </option>
                          <option
                            value="Upgrading"
                            checked={motivations === "Upgrading"}
                          >
                            Upgrading
                          </option>
                          <option
                            value="Moving from United States"
                            checked={
                              motivations === "Moving from United States"
                            }
                          >
                            Moving from United States
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="main_checkbox_div_lead">
                <div className="row">
                  <div className="col-lg-1 col-md-1 col-1">
                    <img src={owned_it} />
                  </div>
                  <div className="col-lg-10 col-md-10 col-10">
                    <p className="para_second_column_questions">
                      How long have you owned the property in years?
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-1 col-md-1 col-1"></div>
                  <div className="col-lg-10 col-md-10 col-10">
                    <div className="row">
                      <div className="col-lg-8 col-md-8 col-8">
                        {/* <input
                          className="input_style_owned_it_lead"
                          onChange={handleOwnedDurationChange}
                          value={ownedDuration}
                          type="number"
                        /> */}
                        <select
                          name="language"
                          id="language"
                          className="input_style_bath_lead"
                          onChange={handleOwnedDurationChange}
                          value={ownedDuration}
                        >
                          <option>Years</option>
                          <option value="0-1" checked={ownedDuration === "0-1"}>
                            0-1
                          </option>
                          <option value="2-5" checked={ownedDuration === "2-5"}>
                            2-5
                          </option>
                          <option value="6-9" checked={ownedDuration === "6-9"}>
                            6-9
                          </option>
                          <option
                            value="10-14"
                            checked={ownedDuration === "10-14"}
                          >
                            10-14
                          </option>
                          <option
                            value="15-19"
                            checked={ownedDuration === "15-19"}
                          >
                            15-19
                          </option>
                          <option
                            value="20-29"
                            checked={ownedDuration === "20-29"}
                          >
                            20-29
                          </option>
                          <option
                            value="30-50"
                            checked={ownedDuration === "30-50"}
                          >
                            30-50
                          </option>
                          <option value="50+" checked={ownedDuration === "50+"}>
                            50+
                          </option>
                        </select>
                      </div>
                      {/* <div className="col-lg-3 col-md-3 col-3">
                        <p className="para_years">Years</p>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="main_checkbox_div_lead">
                <div className="row">
                  <div className="col-lg-1 col-md-1 col-sm-1">
                    <img src={negotiable} />
                  </div>
                  <div className="col-lg-10 col-md-10 col-sm-10">
                    <p className="para_second_column_questions">Negotiable</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-1  col-md-1 col-sm-1"></div>
                  <div className="col-lg-10 col-md-10 col-sm-10">
                    <div className="row">
                      <div className="col-lg-3">
                        <div className="checkbox-repair_lead">
                          <input
                            type="radio"
                            id="checkbox16"
                            name="checkbox16"
                            value="yes"
                            checked={negotiation === "yes"}
                            onChange={handlenegotiation}
                          />
                          <label htmlFor="checkbox16">
                            <p className="search_answer_third_lead">yes</p>
                          </label>
                        </div>
                      </div>

                      <div className="col-lg-3 col-md-3 col-sm-3">
                        <div className="checkbox-repair_lead">
                          <input
                            type="radio"
                            id="checkbox17"
                            name="checkbox17"
                            value="no"
                            checked={negotiation === "no"}
                            onChange={handlenegotiation}
                          />
                          <label htmlFor="checkbox17">
                            <p className="search_answer_third_lead">no</p>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="main_third_column_lead_form">
              <div className="main_checkbox_div_lead">
                <div className="row">
                  <div className="col-lg-1  col-md-1 col-sm-1">
                    <img
                      src={repair_need}
                      className="premium_pic_searchbar_lead"
                    />
                  </div>
                  <div className="col-lg-10 col-md-10 col-sm-10">
                    <p className="search_question_third_column">
                      Repairs needed
                    </p>
                  </div>
                </div>

                {/* <div className="row">
                  <div className="col-lg-1  col-md-1 col-sm-1"></div>
                  <div className="col-lg-10 col-md-10 col-sm-10">
                    <div className="row">
                      <div className="col-lg-3">
                        <div className="checkbox-repair_lead">
                          <input
                            type="radio"
                            id="checkbox40"
                            name="checkbox40"
                            value="yes"
                            checked={repairsNeeded === "yes"}
                            onChange={handleRepairsNeededChange}
                          />
                          <label htmlFor="checkbox40">
                            <p className="search_answer_third_lead">yes</p>
                          </label>
                        </div>
                      </div>

                      <div className="col-lg-3 col-md-3 col-sm-3">
                        <div className="checkbox-repair_lead">
                          <input
                            type="radio"
                            id="checkbox41"
                            name="checkbox41"
                            value="no"
                            checked={repairsNeeded === "no"}
                            onChange={handleRepairsNeededChange}
                          />
                          <label htmlFor="checkbox41">
                            <p className="search_answer_third_lead">no</p>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className="row">
                  <div className="col-lg-1  col-md-1 col-sm-1"></div>
                  <div className="col-lg-10 col-md-10 col-sm-10">
                    <div className="row">
                      <div className="col-lg-6">
                        <select
                          name="language"
                          id="language"
                          className="input_style_bath_lead"
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
                            checked={repairsNeeded === "Roof Needs Replacement"}
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
                            checked={repairsNeeded === "Bathroom(s) need work"}
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
              </div>

              <div className="main_checkbox_div_lead">
                <div className="row">
                  <div className="col-lg-1  col-md-1 col-sm-1">
                    <img src={pool} className="premium_pic_searchbar_lead" />
                  </div>
                  <div className="col-lg-10 col-md-10 col-sm-10">
                    <p className="search_question_third_column">Pool</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-1  col-md-1 col-sm-1"></div>
                  <div className="col-lg-10 col-md-10 col-sm-10">
                    <div className="row">
                      <div className="col-lg-3 col-md-3 col-sm-3">
                        <div className="checkbox-repair_lead">
                          <input
                            type="radio"
                            id="checkbox43"
                            name="checkbox43"
                            value="yes"
                            checked={pools === "yes"}
                            onChange={handlepools}
                          />
                          <label htmlFor="checkbox43">
                            <p className="search_answer_third_lead">yes</p>
                          </label>
                        </div>
                      </div>

                      <div className="col-lg-3 col-md-3 col-sm-3">
                        <div className="checkbox-repair_lead">
                          <input
                            type="radio"
                            id="checkbox45"
                            name="checkbox45"
                            value="no"
                            checked={pools === "no"}
                            onChange={handlepools}
                          />
                          <label htmlFor="checkbox45">
                            <p className="search_answer_third_lead">no</p>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="main_checkbox_div_lead">
                <div className="row">
                  <div className="col-lg-1  col-md-1 col-sm-1">
                    <img
                      src={bathroom}
                      className="premium_pic_searchbar_lead"
                    />
                  </div>
                  <div className="col-lg-10 col-md-10 col-sm-10">
                    <p className="search_question_third_column">Bathrooms</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-1  col-md-1 col-sm-1"></div>
                  <div className="col-lg-10 col-md-10 col-sm-10">
                    <div className="row">
                      <div className="col-lg-6">
                        {/* <input
                          className="input_style_bath_lead"
                          onChange={handleBathroomsChange}
                          value={bathrooms}
                        /> */}
                        <select
                          name="language"
                          id="language"
                          className="input_style_bath_lead"
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
              </div>

              <div className="main_checkbox_div_lead">
                <div className="row">
                  <div className="col-lg-1  col-md-1 col-sm-1">
                    <img src={bedroom} className="premium_pic_searchbar_lead" />
                  </div>
                  <div className="col-lg-10 col-md-10 col-sm-10">
                    <p className="search_question_third_column">Bedrooms</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-1  col-md-1 col-sm-1"></div>
                  <div className="col-lg-10 col-md-10 col-sm-10">
                    <div className="row">
                      <div className="col-lg-6">
                        {/* <input
                          className="input_style_bath_lead"
                          onChange={handleBedroomsChange}
                          value={bedrooms}
                        /> */}
                        <select
                          name="language"
                          id="language"
                          className="input_style_bath_lead"
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
              </div>

              <div className="main_checkbox_div_lead">
                <div className="row">
                  <div className="col-lg-1  col-md-1 col-sm-1">
                    <img src={garage} className="premium_pic_searchbar_lead" />
                  </div>
                  <div className="col-lg-10 col-md-10 col-sm-10">
                    <p className="search_question_third_column">Garage</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-1  col-md-1 col-sm-1"></div>
                  <div className="col-lg-10 col-md-10 col-sm-10">
                    <div className="row">
                      <div className="col-lg-6">
                        <input
                          className="input_style_bath_lead"
                          onChange={handlegarages}
                          value={garages}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="main_checkbox_div_lead">
                <div className="row">
                  <div className="col-lg-1  col-md-1 col-sm-1">
                    <img
                      src={type_of_house}
                      className="premium_pic_searchbar_lead"
                    />
                  </div>
                  <div className="col-lg-10 col-md-10 col-sm-10">
                    <p className="search_question_third_column">
                      Type of house
                    </p>
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
                          className="input_style_bath_lead"
                          onChange={handleHouseTypeChange}
                          value={houseType}
                        >
                          <option>Type of house</option>
                          <option value="Ranch" checked={houseType === "Ranch"}>
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

              <div className="main_checkbox_div_lead">
                <div className="row">
                  <div className="col-lg-1  col-md-1 col-sm-1">
                    <img
                      src={prop_condition}
                      className="premium_pic_searchbar_lead"
                    />
                  </div>
                  <div className="col-lg-10 col-md-10 col-sm-10">
                    <p className="search_question_third_column">
                      Prop.condition
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-1  col-md-1 col-sm-1"></div>
                  <div className="col-lg-10 col-md-10 col-sm-10">
                    <div className="row">
                      <div className="row">
                        <div className="col-lg-6">
                          <input
                            className="input_style_bath_lead"
                            onChange={handlePropertyConditionChange}
                            value={propertyCondition}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="main_checkbox_div_lead">
                <div className="row">
                  <div className="col-lg-1  col-md-1 col-sm-1">
                    <img
                      src={squarefootage}
                      className="premium_pic_searchbar_lead"
                    />
                  </div>
                  <div className="col-lg-10 col-md-10 col-sm-10">
                    <p className="search_question_third_column">
                      Square Footage
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-1  col-md-1 col-sm-1"></div>
                  <div className="col-lg-10 col-md-10 col-sm-10">
                    <div className="row">
                      <div className="col-lg-6">
                        {/* <input
                          className="input_style_bath_lead"
                          onChange={handlesquarefootages}
                          value={squarefootages}
                        /> */}
                        <select
                          name="language"
                          id="language"
                          className="input_style_bath_lead"
                          onChange={handlesquarefootages}
                          value={squarefootages}
                        >
                          <option> Square Footage</option>
                          <option
                            value="0 - 500"
                            checked={squarefootages === "0 - 500"}
                          >
                            0 - 500
                          </option>
                          <option
                            value="500 - 1000"
                            checked={squarefootages === "500 - 1000"}
                          >
                            500 - 1000
                          </option>
                          <option
                            value="1000 - 2000"
                            checked={squarefootages === "1000 - 2000"}
                          >
                            1000 - 2000
                          </option>
                          <option
                            value="2000 - 3000"
                            checked={squarefootages === "2000 - 3000"}
                          >
                            2000 - 3000
                          </option>
                          <option
                            value="3000 - 4000"
                            checked={squarefootages === "3000 - 4000"}
                          >
                            3000 - 4000
                          </option>
                          <option
                            value="4000 - 5000"
                            checked={squarefootages === "4000 - 5000"}
                          >
                            4000 - 5000
                          </option>
                          <option
                            value="5000+"
                            checked={squarefootages === "5000+"}
                          >
                            5000+
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="main_checkbox_div_lead">
                <div className="row">
                  <div className="col-lg-1  col-md-1 col-sm-1">
                    <img src={zipcode} className="premium_pic_searchbar_lead" />
                  </div>
                  <div className="col-lg-10 col-md-10 col-sm-10">
                    <p className="search_question_third_column">ZIP Code</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-1  col-md-1 col-sm-1"></div>
                  <div className="col-lg-10 col-md-10 col-sm-10">
                    <div className="row">
                      <div className="col-lg-6">
                        <input
                          className="input_style_bath_lead"
                          onChange={handlezipCode}
                          value={zipCode}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="main_checkbox_div_lead">
                <div className="row">
                  <div className="col-lg-1  col-md-1 col-sm-1">
                    <img
                      src={yearconstruction}
                      className="premium_pic_searchbar_lead"
                    />
                  </div>
                  <div className="col-lg-10 col-md-10 col-sm-10">
                    <p className="search_question_third_column">
                      Year of Construction
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-1  col-md-1 col-sm-1"></div>
                  <div className="col-lg-10 col-md-10 col-sm-10">
                    <div className="row">
                      <div className="col-lg-6">
                        {/* <input
                          className="input_style_bath_lead"
                          onChange={handleyearConstruction}
                          value={yearConstruction}
                        /> */}
                        <select
                          name="language"
                          id="language"
                          className="input_style_bath_lead"
                          onChange={handleyearConstruction}
                          value={yearConstruction}
                        >
                          <option> Square Footage</option>
                          <option
                            value="1800-1900"
                            checked={yearConstruction === "1800-1900"}
                          >
                            1800-1900
                          </option>
                          <option
                            value="1900-1950"
                            checked={yearConstruction === "1900-1950"}
                          >
                            1900-1950
                          </option>
                          <option
                            value="1950-1970"
                            checked={yearConstruction === "1950-1970"}
                          >
                            1950-1970
                          </option>
                          <option
                            value="1970-1980"
                            checked={yearConstruction === "1970-1980"}
                          >
                            1970-1980
                          </option>
                          <option
                            value="1980-1990"
                            checked={yearConstruction === "1980-1990"}
                          >
                            1980-1990
                          </option>
                          <option
                            value="1990-2000"
                            checked={yearConstruction === "1990-2000"}
                          >
                            1990-2000
                          </option>
                          <option
                            value="2000-2010"
                            checked={yearConstruction === "2000-2010"}
                          >
                            2000-2010
                          </option>
                          <option
                            value="2010-2022"
                            checked={yearConstruction === "2010-2022"}
                          >
                            2010-2022
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-5">
            <textarea
              className="textarea_form_lead"
              placeholder="Conversation  *"
              onChange={handleconversation}
              value={conversation}
            ></textarea>
          </div>
          <div className="col-lg-7">
            <textarea
              className="textarea_desp_form_lead"
              placeholder="Description  *"
              onChange={handledescription}
              value={description}
            ></textarea>
            <div className="row">
              <div className="col-lg-2"></div>
              <div className="col-lg-10">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="save_button_div">
                      <button
                        className="clear_inventory_button"
                        onClick={clearvaluesincreatelead}
                      >
                        <img src={clearpage} /> Clear Page
                      </button>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="save_button_div">
                      <button
                        type="submit"
                        className="save_changes_inventory"
                        disabled={
                          !fullAddress ||
                          !currentownername ||
                          !askingprice ||
                          !phonenumber ||
                          !email
                        }
                        onClick={CreateleadAction}
                      >
                        Create Lead
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* </form> */}
      </div>
    </div>
  );
}

export default Inventory;
