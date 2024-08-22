import React, { useEffect, useRef, useState } from "react";
import "./../FixedPriceMode/FixedPriceMode.css";
import fpicon from "./../../../Assets/fpdescription.png";
import delete_button from "./../../../Assets/delete_button_fp.png";
import edit_button from "./../../../Assets/edit_button_fp.png";
import add_state from "./../../../Assets/add_state_fp_logo.png";
import SpinnerLoader from "../SpinnerLoader/SpinnerLoader";
import axios from "axios";
import CustomNotification from "../CustomNotification/CustomNotification";
import RedNotification from "../CustomNotification/RedNotification";
import TicketandLiveChat from "../TicketAndLiveChat/TicketandLiveChat";

function FixedPriceMode() {
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

  const token = localStorage.getItem("token");

  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const [notificationMessageRed, setnotificationMessageRed] = useState(null);
  const [notificationMessage, setnotificationMessage] = useState(null);

  const [isModal1Open, setIsModal1Open] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);

  const openModal1 = () => {
    setSelectedState("");
    setIsModal1Open(true);
  };

  const closeModal1 = () => {
    setIsModal1Open(false);
  };

  const openModal2 = () => {
    setIsModal1Open(false); // Close Modal 1
    setIsModal2Open(true); // Open Modal 2
  };

  const closeModal2 = () => {
    setIsModal2Open(false);
  };
  const closebutton = () => {
    setIsModal1Open(false); // Close Modal 1
    setIsModal2Open(false); // Open Modal 2
  };
  const backbutton = () => {
    setIsModal1Open(true); // Close Modal 1
    setIsModal2Open(false); // Open Modal 2
  };
  const backdropRef = useRef(null);

  useEffect(() => {
    const handleBackdropClick = (e) => {
      if (e.target === backdropRef.current) {
        // Check which modal is open and close it accordingly
        if (isModal1Open) {
          // Close modal 1
          closeModal1();
        }
        if (isModal2Open) {
          // Close modal 2
          closeModal2();
        }
      }
    };

    // Add the event listener to the backdrop element
    if (backdropRef.current) {
      backdropRef.current.addEventListener("click", handleBackdropClick);
    }

    // Cleanup the event listener when the component unmounts
    return () => {
      if (backdropRef.current) {
        backdropRef.current.removeEventListener("click", handleBackdropClick);
      }
    };
  }, [isModal1Open, isModal2Open, closeModal1, closeModal2]);

  //state county modal show and hide functionality
  const [isModal1Opensc, setIsModal1Opensc] = useState(false);
  const [isModal2Opensc, setIsModal2Opensc] = useState(false);

  const openModal1sc = () => {
    setIsModal1Opensc(true);
  };

  const closeModal1sc = () => {
    setIsModal1Opensc(false);
  };

  const openModal2sc = () => {
    setIsModal1Opensc(false); // Close Modal 1
    setIsModal2Opensc(true); // Open Modal 2
  };

  const closeModal2sc = () => {
    setIsModal2Opensc(false);
  };

  const backbuttonsc = () => {
    setIsModal1Opensc(true); // Close Modal 1
    setIsModal2Opensc(false); // Open Modal 2
  };

  const closebuttonsc = () => {
    setIsModal1Opensc(false); // Close Modal 1
    setIsModal2Opensc(false); // Open Modal 2
  };

  const backdropRefsc = useRef(null);

  useEffect(() => {
    const handleBackdropClicksc = (e) => {
      if (e.target === backdropRefsc.current) {
        // Check which modal is open and close it accordingly
        if (isModal1Opensc) {
          // Close modal 1
          closeModal1sc();
        }
        if (isModal2Opensc) {
          // Close modal 2
          closeModal2sc();
        }
      }
    };

    // Add the event listener to the backdrop element
    if (backdropRefsc.current) {
      backdropRefsc.current.addEventListener("click", handleBackdropClicksc);
    }

    // Cleanup the event listener when the component unmounts
    return () => {
      if (backdropRefsc.current) {
        backdropRefsc.current.removeEventListener(
          "click",
          handleBackdropClicksc
        );
      }
    };
  }, [isModal1Opensc, isModal2Opensc, closeModal1sc, closeModal2sc]);

  //end the state and county hide show functionality
  const [userrolelist, setuserrolelist] = useState([]);
  useEffect(() => {
    getUsersRoleData();
  }, []);

  const getUsersRoleData = () => {
    axiosInstance.get(`/api/dashboard/get-roles`).then((res) => {
      setuserrolelist(res?.data);
    });
  };

  // const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  // const handleCheckboxChange = (e, checkboxValue) => {
  //   setSelectedCheckbox(e.target.checked ? checkboxValue : null);
  // };

  const [query, setQuery] = useState("");
  const [addcountyquery, setCountyQuery] = useState("");
  const [addstatequery, setstateQuery] = useState("");
  const [addanothercountyquery, setanotherCountyQuery] = useState("");

  const [sellermotivationQuery, setsellermotivationQuery] = useState("");
  const [typeofpropertyQuery, settypeofpropertyQuery] = useState("");
  const [squarefootageQuery, setsquarefootageQuery] = useState("");
  const [yearofconstructionQuery, setyearofconstructionQuery] = useState("");
  const [repairandmaintainQuery, setrepairandmaintainQuery] = useState("");
  const [wanttosellQuery, setwanttosellQuery] = useState("");
  const [longyouownedQuery, setlongyouownedQuery] = useState("");
  const [livinginhouseQuery, setlivinginhouseQuery] = useState("");
  const [bedroomQuery, setbedroomQuery] = useState("");
  const [bathroomQuery, setbathroomQuery] = useState("");
  const [mortgageQuery, setmortgageQuery] = useState("");
  const [agentwholesalerQuery, setagentwholesalerQuery] = useState("");
  const [realestateagentQuery, setrealestateagentQuery] = useState("");

  const [selectedState, setSelectedState] = useState("");

  // Function to handle checkbox selection
  const handleCheckboxstateChange = (stateId) => {
    setSelectedState(stateId);
  };

  localStorage.setItem("states", JSON.stringify(selectedState));

  const [statedata, setStateData] = useState("");
  useEffect(() => {
    getStatedata();
  }, []);

  const getStatedata = () => {
    axios.get(`/api/get-states`).then((res) => {
      setStateData(res.data);
    });
  };

  const [countyDatafp, setCountyDatafp] = useState("");
  const [selectedCountyIds, setSelectedCountyIds] = useState([]);

  const [countiesdataforcomprision, setcountiesdataforcomprision] = useState(
    []
  );
  const clearCountyidss = () => {
    setSelectedCountyIds([]);
  };
  const [selectedIds, setSelectedIds] = useState([]);

  // Function to toggle the selection of an ID
  const toggleSelection = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleCountyCheckboxChange = (countyId) => {
    if (selectedCountyIds.includes(countyId)) {
      // If the countyId is already selected, remove it
      setSelectedCountyIds(selectedCountyIds.filter((id) => id !== countyId));
    } else {
      // If the countyId is not selected, add it
      setSelectedCountyIds([...selectedCountyIds, countyId]);
    }
  };

  const getcountydatafpmode = () => {
    const urlgetcounty = `/api/get-counties-dropdown?state_ids[]=${selectedState}`;
    axios.get(urlgetcounty).then((res) => {
      setCountyDatafp(res.data);
    });
  };
  useEffect(() => {
    // Fetch county data when selected state changes
    getcountydatafpmode();
    setSelectedCountyIds([]);
  }, [selectedState]);

  const [motivationfpchecked, setmotivationfpchecked] = useState([]);
  const [typeofpropertyfpchecked, settypeofpropertyfpchecked] = useState([]);
  const [squareFootagefpchecked, setsquareFootagefpchecked] = useState([]);
  const [yearsofconstructionfpchecked, setyearsofconstructionfpchecked] =
    useState([]);
  const [repairsandneedfpchecked, setrepairsandneedfpchecked] = useState([]);
  const [wanttosellfpchecked, setwanttosellfpchecked] = useState([]);
  const [ownedpropertyfpchecked, setownedpropertyfpchecked] = useState([]);
  const [livinginhousefpchecked, setlivinginhousefpchecked] = useState([]);
  const [bedroomfpchecked, setbedroomfpchecked] = useState([]);
  const [bathroomsfpchecked, setbathroomsfpchecked] = useState([]);
  const [mortgagefpchecked, setmortgagefpchecked] = useState([]);
  const [owneroragentfpchecked, setowneroragentfpchecked] = useState([]);
  const [listedwithagentfpchecked, setlistedwithagentfpchecked] = useState([]);

  const reasonsForSelling = [
    "Preforeclosure",
    "Emergency Reasons",
    "Financial Reasons",
    "Selling a vacant/non-occupied house",
    "Sell and rent instead",
    "Death in the family",
    "Sell without showings",
    "Inherited Property",
    "Downsizing",
    "Tired of being a landlord",
    "Moving closer to family",
    "Relocating",
    "Retirement elsewhere",
    "Upgrading",
    "Moving from United States",
  ];
  const [dismissModal, setdismissModal] = useState("");
  const [selectedReasons, setSelectedReasons] = useState([]);

  const handleReasonSelection = (reason) => {
    setSelectedReasons((prevSelectedReasons) => {
      if (!prevSelectedReasons) {
        // If prevSelectedReasons is undefined or null, initialize it as an empty array
        return [reason];
      }

      if (prevSelectedReasons.includes(reason)) {
        return prevSelectedReasons.filter((item) => item !== reason);
      } else {
        return [...prevSelectedReasons, reason];
      }
    });
  };

  const propertyTypes = [
    "Ranch",
    "2-story",
    "Mobile home owned land",
    "Mobile home rented land",
    "Multifamily",
    "Single family",
    "Bungalow",
    "Cottage",
    "Townhouse",
    "Condominium",
    "Duplex",
    "Farmhouse",
    "Split-level home",
    "Land",
  ];

  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);

  const handlepropertytypeChange = (countydata) => {
    // Ensure selectedPropertyTypes is always initialized as an array
    const updatedPropertyTypes = selectedPropertyTypes || [];

    if (updatedPropertyTypes.includes(countydata)) {
      setSelectedPropertyTypes(
        updatedPropertyTypes.filter((item) => item !== countydata)
      );
    } else {
      setSelectedPropertyTypes([...updatedPropertyTypes, countydata]);
    }
  };

  const priceRanges = [
    "0 - 500",
    "500 - 1000",
    "1000 - 2000",
    "2000 - 3000",
    "3000 - 4000",
    "4000 - 5000",
    "5000+",
  ];

  const [Selectedsquarefootage, setSelectedsquarefootage] = useState([]);

  const toggleSquareFootage = (countydata) => {
    // Make sure Selectedsquarefootage is always an array
    const updatedSelectedsquarefootage = Selectedsquarefootage || [];

    if (updatedSelectedsquarefootage.includes(countydata)) {
      setSelectedsquarefootage(
        updatedSelectedsquarefootage.filter((item) => item !== countydata)
      );
    } else {
      setSelectedsquarefootage([...updatedSelectedsquarefootage, countydata]);
    }
  };

  const yearRanges = [
    "1800-1900",
    "1900-1950",
    "1950-1970",
    "1970-1980",
    "1980-1990",
    "1990-2000",
    "2000-2010",
    "2010-2022",
  ];
  const [selectedYearRanges, setSelectedYearRanges] = useState([]);

  // Function to handle checkbox click

  const handleyearrangeClick = (countydata) => {
    // Make sure Selectedsquarefootage is always an array
    const updatedSelectedYearRanges = selectedYearRanges || [];

    if (updatedSelectedYearRanges.includes(countydata)) {
      setSelectedYearRanges(
        updatedSelectedYearRanges.filter((item) => item !== countydata)
      );
    } else {
      setSelectedYearRanges([...updatedSelectedYearRanges, countydata]);
    }
  };

  const propertyConditions = [
    "Structural Problems",
    "Flood/storm/fire damage",
    "Roof Needs Replacement",
    "Foundation Problems",
    "Bathroom(s) need work",
    "Paint Inside",
    "None, it is in pristine condition",
    "Boiler/Water Heater",
    "Landscaping",
    "Electrical",
    "Plumbing",
    "Flooring",
    "Kitchen Cabinets",
    "Kitchen Appliances",
    "Paint Outside",
    "Air Conditioning",
  ];

  const [selectedPropertyConditions, setSelectedPropertyConditions] = useState(
    []
  );

  const toggleCheckbox = (countydata) => {
    // Make sure Selectedsquarefootage is always an array
    const updatedpropertycondition = selectedPropertyConditions || [];

    if (updatedpropertycondition.includes(countydata)) {
      setSelectedPropertyConditions(
        updatedpropertycondition.filter((item) => item !== countydata)
      );
    } else {
      setSelectedPropertyConditions([...updatedpropertycondition, countydata]);
    }
  };

  const fastsell = ["ASAP", "1 month", "2-3 months"];

  const [selectedFastSell, setSelectedFastSell] = useState([]);

  const toggleCheckboxFastSell = (countydata) => {
    // Make sure Selectedsquarefootage is always an array
    const updatedselectedFastSell = selectedFastSell || [];

    if (updatedselectedFastSell.includes(countydata)) {
      setSelectedFastSell(
        updatedselectedFastSell.filter((item) => item !== countydata)
      );
    } else {
      setSelectedFastSell([...updatedselectedFastSell, countydata]);
    }
  };

  const numberRanges = [
    "0-1",
    "2-5",
    "6-9",
    "10-14",
    "15-19",
    "20-29",
    "30-50",
    "50+",
  ];

  const [selectedNumberRanges, setSelectedNumberRanges] = useState([]);

  const handleCheckboxChangenumberrange = (countydata) => {
    // Make sure Selectedsquarefootage is always an array
    const updatedNumberRanges = selectedNumberRanges || [];

    if (updatedNumberRanges.includes(countydata)) {
      setSelectedNumberRanges(
        updatedNumberRanges.filter((item) => item !== countydata)
      );
    } else {
      setSelectedNumberRanges([...updatedNumberRanges, countydata]);
    }
  };

  const occupancyStatus = [
    "Owner Occupied",
    "Tenant Occupied",
    "No, it's Vacant",
  ];

  const [selectedOccupancyStatus, setSelectedOccupancyStatus] = useState([]);

  const handleCheckboxoccupancyChange = (countydata) => {
    // Make sure Selectedsquarefootage is always an array
    const updatedoccupancyRanges = selectedOccupancyStatus || [];

    if (updatedoccupancyRanges.includes(countydata)) {
      setSelectedOccupancyStatus(
        updatedoccupancyRanges.filter((item) => item !== countydata)
      );
    } else {
      setSelectedOccupancyStatus([...updatedoccupancyRanges, countydata]);
    }
  };

  const bedroomOptions = [
    "1 Bedroom",
    "2 Bedroom",
    "3 Bedroom",
    "4 Bedroom",
    "5 Bedroom",
    "More than 5",
  ];
  const [selectedBedroomOptions, setSelectedBedroomOptions] = useState([]);

  const toggleBedroomOption = (countydata) => {
    // Make sure Selectedsquarefootage is always an array
    const updatedBedroomOption = selectedBedroomOptions || [];

    if (updatedBedroomOption.includes(countydata)) {
      setSelectedBedroomOptions(
        updatedBedroomOption.filter((item) => item !== countydata)
      );
    } else {
      setSelectedBedroomOptions([...updatedBedroomOption, countydata]);
    }
  };

  const bathroomOptions = [
    "None",
    "1 Bathroom",
    "2 Bathroom",
    "3 Bathroom",
    "4 Bathroom",
    "5 Bathroom",
    "More than 5",
  ];
  const [selectedBathroomOptions, setSelectedBathroomOptions] = useState([]);

  const handleCheckboxbathroomClick = (countydata) => {
    // Make sure Selectedsquarefootage is always an array
    const updatedbathroomClic = selectedBathroomOptions || [];

    if (updatedbathroomClic.includes(countydata)) {
      setSelectedBathroomOptions(
        updatedbathroomClic.filter((item) => item !== countydata)
      );
    } else {
      setSelectedBathroomOptions([...updatedbathroomClic, countydata]);
    }
  };

  const mortgageStatus = [
    "Yes and I am up to date on my mortgage",
    "Yes and I'm behind on my mortgage",
    "There is no mortgage",
  ];
  const [selectedMortgageStatus, setSelectedMortgageStatus] = useState([]);

  const handleCheckboxmortgageChange = (countydata) => {
    // Make sure Selectedsquarefootage is always an array
    const updatedMortgageStatus = selectedMortgageStatus || [];

    if (updatedMortgageStatus.includes(countydata)) {
      setSelectedMortgageStatus(
        updatedMortgageStatus.filter((item) => item !== countydata)
      );
    } else {
      setSelectedMortgageStatus([...updatedMortgageStatus, countydata]);
    }
  };

  const agentorwholeseller = [
    "Yes, i own this property",
    "Agent or wholesaler",
  ];

  const [selectedValuesagent, setSelectedValuesagent] = useState([]);

  const handleCheckboxagentChange = (countydata) => {
    // Make sure Selectedsquarefootage is always an array
    const updatedagentChange = selectedValuesagent || [];

    if (updatedagentChange.includes(countydata)) {
      setSelectedValuesagent(
        updatedagentChange.filter((item) => item !== countydata)
      );
    } else {
      setSelectedValuesagent([...updatedagentChange, countydata]);
    }
  };

  const listedwithagent = ["Yes it's listed", "No it's not listed"];
  const [selectedListedWithAgent, setSelectedListedWithAgent] = useState([]);

  const handleCheckboxlistedwithagentChange = (countydata) => {
    // Make sure Selectedsquarefootage is always an array
    const updatedListedWithAgen = selectedListedWithAgent || [];

    if (updatedListedWithAgen.includes(countydata)) {
      setSelectedListedWithAgent(
        updatedListedWithAgen.filter((item) => item !== countydata)
      );
    } else {
      setSelectedListedWithAgent([...updatedListedWithAgen, countydata]);
    }
  };

  const closeModal = (modalId) => {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      modalElement.classList.remove("show");
      modalElement.style.display = "none";
      document.body.classList.remove("modal-open");

      const modalBackdrop = document.getElementsByClassName("modal-backdrop");
      if (modalBackdrop.length > 0) {
        modalBackdrop[0].parentNode.removeChild(modalBackdrop[0]);
      }
    }
  };

  const isModalOpenModalreasonforselling = useRef(null);
  const isModalOpenModalpropertyTypes = useRef(null);
  const isModalsquarefootage = useRef(null);
  const isModalOpenModalModalreapirandmaintainace = useRef(null);
  const isModalOpenModalfasttheywanttosell = useRef(null);
  const isModalownedproperty = useRef(null);
  const isModalbedroom = useRef(null);
  const isModalbathroom = useRef(null);
  const isModalmortgage = useRef(null);
  const isModalowneroragent = useRef(null);
  const isModallistedwithagent = useRef(null);
  const modalyearofconstruction = useRef(null);
  const modallongyouowned = useRef(null);

  const fixedPriceAction = (e) => {
    // e.preventDefault();

    let payload = {
      motivation: selectedReasons,
      baths: selectedBathroomOptions,
      beds: selectedBedroomOptions,
      how_long_you_owned: selectedNumberRanges,
      ideal_selling_timeframe: selectedFastSell,
      listed_with_real_estate_agent: selectedListedWithAgent,
      mortgage: selectedMortgageStatus,
      occupancy: selectedOccupancyStatus,
      owner_wholesaler: selectedValuesagent,
      square_footage: Selectedsquarefootage,
      type_of_house: selectedPropertyTypes,
      repairs_needed: selectedPropertyConditions,
      year_of_construction: selectedYearRanges,
    };
    axiosInstance
      .post("/api/dashboard/advanced-lead-settings", payload)
      .then((r) => {
        setnotificationMessage(r?.data?.message);

        isModalOpenModalreasonforselling.current.click();
        isModalOpenModalpropertyTypes.current.click();
        isModalsquarefootage.current.click();
        isModalOpenModalModalreapirandmaintainace.current.click();
        isModalOpenModalfasttheywanttosell.current.click();
        isModalownedproperty.current.click();
        isModalbedroom.current.click();
        isModalbathroom.current.click();
        isModalmortgage.current.click();
        isModalowneroragent.current.click();
        isModallistedwithagent.current.click();
        modalyearofconstruction.current.click();
        modallongyouowned.current.click();

        getfixedpricemodulevalue();
        setSelectedPropertyTypes("");
        setSelectedReasons("");
        setSelectedsquarefootage("");
        setSelectedYearRanges("");
        setSelectedPropertyConditions("");
        setSelectedFastSell("");
        setSelectedNumberRanges("");
        setSelectedOccupancyStatus("");
        setSelectedBedroomOptions("");
        setSelectedBathroomOptions("");
        setSelectedMortgageStatus("");
        setSelectedValuesagent("");
        setSelectedListedWithAgent("");

        setTimeout(() => {
          setnotificationMessage("");
        }, 4000);

        // setnotificationMessage("Sign-up done. Now Signin.");
      })
      .catch((e) => {
        // setIsModalOpen(false);

        if (e.response.data.errors != undefined) {
          // alert(e.response.data.message);
          // setIsModalOpen(false);
          // setnotificationMessageRed(e.response.data.message);
        }
      });
  };

  const [motivationCount, setmotivationCount] = useState("");
  const [typeofpropertyCount, settypeofpropertyCount] = useState("");
  const [squareFootageCount, setsquareFootageCount] = useState("");
  const [yearsofconstructionCount, setyearsofconstructionCount] = useState("");
  const [repairsandneedCount, setrepairsandneedCount] = useState("");
  const [wanttosellCount, setwanttosellCount] = useState("");
  const [ownedpropertyCount, setownedpropertyCount] = useState("");
  const [livinginhousecount, setlivinginhousecount] = useState("");
  const [bedroomCount, setbedroomCount] = useState("");
  const [bathroomsCount, setbathroomsCount] = useState("");
  const [mortgageCount, setmortgageCount] = useState("");
  const [owneroragentCount, setowneroragentCount] = useState("");
  const [listedwithagentCount, setlistedwithagentCount] = useState("");

  useEffect(() => {
    getfixedpricemodulevalue();
  }, []);

  const getfixedpricemodulevalue = () => {
    axiosInstance
      .get("/api/dashboard/get-advanced-lead-settings")
      .then((res) => {
        setmotivationCount(res?.data?.data?.motivation?.length);
        settypeofpropertyCount(res?.data?.data?.type_of_house?.length);
        setsquareFootageCount(res?.data?.data?.square_footage?.length);
        setyearsofconstructionCount(
          res?.data?.data?.year_of_construction?.length
        );
        setrepairsandneedCount(res?.data?.data?.repairs_needed?.length);
        setwanttosellCount(res?.data?.data?.ideal_selling_timeframe?.length);
        setownedpropertyCount(res?.data?.data?.how_long_you_owned?.length);
        setlivinginhousecount(res?.data?.data?.occupancy?.length);
        setbedroomCount(res?.data?.data?.beds?.length);
        setbathroomsCount(res?.data?.data?.baths?.length);
        setmortgageCount(res?.data?.data?.mortgage?.length);
        setowneroragentCount(res?.data?.data?.owner_wholesaler?.length);
        setlistedwithagentCount(
          res?.data?.data?.listed_with_real_estate_agent?.length
        );

        setSelectedReasons(res?.data?.data?.motivation);
        setSelectedPropertyTypes(res?.data?.data?.type_of_house);
        setSelectedsquarefootage(res?.data?.data?.square_footage);
        setSelectedYearRanges(res?.data?.data?.year_of_construction);
        setSelectedPropertyConditions(res?.data?.data?.repairs_needed);
        setSelectedFastSell(res?.data?.data?.ideal_selling_timeframe);
        setSelectedNumberRanges(res?.data?.data?.how_long_you_owned);
        setSelectedOccupancyStatus(res?.data?.data?.occupancy);
        setSelectedBedroomOptions(res?.data?.data?.beds);
        setSelectedBathroomOptions(res?.data?.data?.baths);
        setSelectedMortgageStatus(res?.data?.data?.mortgage);
        setSelectedValuesagent(res?.data?.data?.owner_wholesaler);
        setSelectedListedWithAgent(
          res?.data?.data?.listed_with_real_estate_agent
        );
      })
      .catch((e) => {
        if (e.response.status == 404) {
        } else {
        }
      });
  };

  const postCountyState = (e) => {
    // e.preventDefault();

    let payload = {
      state_id: selectedState,
      counties_ids: selectedCountyIds,
    };
    axiosInstance
      .post("/api/dashboard/advanced-lead-settings/state/counties", payload)
      .then((r) => {
        setnotificationMessage(r?.data?.message);
        setSelectedCountyIds([]);
        setSelectedState("");
        setSelectedIds("");
        getCountyStatevalue();

        closeModal2();

        setTimeout(() => {
          setnotificationMessage("");
        }, 4000);
        // setnotificationMessage("Sign-up done. Now Signin.");
      })
      .catch((e) => {
        // setIsModalOpen(false);

        if (e.response.data.errors != undefined) {
          // alert(e.response.data.message);
          // setIsModalOpen(false);
          // setnotificationMessageRed(e.response.data.message);
        }
      });
  };

  const [stateCountyDataFp, setstateCountyDataFp] = useState("");
  useEffect(() => {
    getCountyStatevalue();
  }, []);

  const getCountyStatevalue = () => {
    axiosInstance
      .get("/api/dashboard/advanced-lead-settings/state/counties")
      .then((res) => {
        setstateCountyDataFp(res?.data?.data);
      })
      .catch((e) => {
        if (e.response.status == 404) {
        } else {
        }
      });
  };

  //delete the state card

  const handlestatecountyDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(
        `/api/dashboard/advanced-lead-settings/state/counties/${id}`
      );
      getCountyStatevalue();
      // alert(response.data.message);
      setnotificationMessage(response.data.message);
      setSelectedState("");
      setSelectedCountyIds([]);
      setSelectedIds("");
      setTimeout(() => {
        setnotificationMessage("");
      }, 4000);
      // getpaymentcarddetail();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
  //delete the all state card

  const handleallstatecountyDelete = async () => {
    try {
      const response = await axiosInstance.delete(
        "/api/dashboard/advanced-lead-settings/state/counties"
      );
      getCountyStatevalue();
      setnotificationMessage(response.data.message);
      setSelectedState("");
      setSelectedCountyIds([]);
      setSelectedIds("");
      setTimeout(() => {
        setnotificationMessage("");
      }, 4000);
      // getpaymentcarddetail();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const [id_state_for_update, setid_state_for_update] = useState("");

  const handleupdatecountiesChange = () => {
    // Send a PUT request to update the countirs

    axiosInstance
      .put(
        `api/dashboard/advanced-lead-settings/state/${id_state_for_update}/counties`,
        {
          counties_ids: selectedIds,
        }
      )
      .then((response) => {
        getCountyStatevalue();
        closeModal2sc();
        setnotificationMessage(response.data.message);

        setTimeout(() => {
          setnotificationMessage("");
        }, 4000);
      })
      .catch((error) => {
        console.error("Error updating user status:", error);
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
      <div className="main_div_fixed_price">
        <p className="fixed_price_heading">Fixed Price Mode</p>
        <div className="para_main_div_fp">
          <p className="fp_para_below_heading">
            The beauty of Fixed Price Mode - is that unlike the open PPC Leads
            to Deal marketplace, you get leads with the full exclusivity upgrade
            - without any exclusivity surcharge.
          </p>

          <p className="fp_para_below_heading">
            And the wider geographic targeting you select - the lower your price
            per lead becomes. Design your perfect lead, set a budget and start
            automatically getting leads.
          </p>

          <p className="fp_para_below_heading">
            We'll notify you via email and sms when we've purchased a new lead
            for you - and if you have the CRM integration enabled (which our
            support team can help you with if you're a Fixed Price Mode
            customer) - we'll post it to your CRM as well.
          </p>

          <p className="fp_para_below_heading">
            You can pause and resume the lead flow at any time - no long term
            commitments or contracts. You can also recustomize your settings at
            any time. Design your perfect lead now with Fixed Price Mode!
          </p>
        </div>
      </div>
      <div className="geo_setting_main_div">
        <p className="heading_geo_setting">Geo Settings</p>
        <div className="div_inside_geo_setting row">
          <div className="col-lg-2 col-md-2 col-2 fpicon_style">
            <img src={fpicon} />
          </div>
          <div className="col-lg-10 col-md-10 col-10 div_para_fp">
            <p className="para_geo_setting_fp">
              These leads have the highest motivation in the industry - while
              not all lay down deals - they have the highest lead to close ratio
              out of any lead source with some of our customers reporting 1 in
              every 7 leads becoming a transaction.
            </p>
          </div>
        </div>

        <div class="d-flex justify-content-between">
          <div>
            <p className="heading_advance_setting">Advance settings</p>
            <p className="para_advance_setting">
              These options give you a way to get leads from counties
            </p>
          </div>
          <div className="main_div_clear_para">
            <p
              className="clear_all_para"
              onClick={() => handleallstatecountyDelete()}
            >
              Clear all
            </p>
          </div>
        </div>

        <div className="row main_div_county_state">
          {stateCountyDataFp ? (
            stateCountyDataFp?.map((data, index) => (
              <div className="col-lg-4 col-md-6 col-12">
                <div className="show_state_county_filter">
                  <div class="d-flex justify-content-start">
                    <img
                      src={delete_button}
                      className="image_delete_button_fp"
                      onClick={() => handlestatecountyDelete(data?.id)}
                    />
                    <p className="para_inside_filters">{data?.state?.name}</p>
                  </div>

                  <div
                    class="d-flex justify-content-end"
                    onClick={() => {
                      openModal2sc();
                      setSelectedState(data?.state?.id);
                      setid_state_for_update(data?.id);
                      setSelectedIds(data?.counties_ids);
                    }}
                  >
                    <img src={edit_button} className="edit_button_fp" />
                  </div>

                  <div class="d-flex justify-content-start">
                    <p className="no_of_county_para">No. of counties</p>
                    <div className="show_county_icon_style">
                      <p className="para_inside_show_county">
                        {data?.counties_ids?.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <SpinnerLoader />
          )}
        </div>

        <div
          className={`modal backdrop ${
            isModal1Opensc || isModal2Opensc ? "show" : ""
          }`}
          style={{
            display: isModal1Opensc || isModal2Opensc ? "block" : "none",
          }}
        ></div>

        <div
          ref={backdropRefsc}
          className={`modal ${isModal2Opensc ? "show" : ""}`}
          tabIndex="-1"
          role="dialog"
          style={{ display: isModal2Opensc ? "block" : "none" }}
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-body">
                <p className="heading_of_assign_role">Add County</p>
                <div className="main_roles_user_div">
                  <div className="mt-2 row px-3">
                    <div className="col-sm-12">
                      <input
                        className="inputsearchuserroles"
                        placeholder="Search"
                        onChange={(event) => setCountyQuery(event.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mt-3 div_main_for_scroll_state">
                    {countyDatafp.data ? (
                      countyDatafp.data
                        .filter((post) => {
                          if (addcountyquery === "") {
                            return post;
                          } else if (
                            post.name
                              .toLowerCase()
                              .includes(addcountyquery.toLowerCase())
                          ) {
                            return post;
                          }
                        })
                        .map((countydata, index) => (
                          <div key={index} className="row ml-4">
                            <div className="col-1 checkbox_style_desired_city">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id={`checkbox_${index}`}
                                name={`checkbox_${index}`}
                                checked={selectedIds.includes(countydata?.id)}
                                onChange={() => toggleSelection(countydata?.id)}
                              />
                            </div>
                            <p className="col-11 statenamestyle">
                              {countydata.name}
                            </p>
                          </div>
                        ))
                    ) : (
                      <SpinnerLoader />
                    )}
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  {/* <button
                    className="backbutton_county"
                    onClick={() => {
                      backbuttonsc();
                    }}
                  >
                    Back
                  </button> */}
                  <button
                    className="backbutton_county"
                    onClick={() => {
                      closeModal2sc();
                    }}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    class="save_button_assign_role"
                    id="closeButton"
                    // onClick={() => AssignRolesToUsersAction()}

                    onClick={() => {
                      handleupdatecountiesChange();
                    }}
                    // onClick={nextToCounty}
                  >
                    save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button className="add_state_button" onClick={openModal1}>
          <img src={add_state} className="mr-3" /> Add State
        </button>

        <div
          className={`modal backdrop ${
            isModal1Open || isModal2Open ? "show" : ""
          }`}
          style={{ display: isModal1Open || isModal2Open ? "block" : "none" }}
        ></div>
        <div
          ref={backdropRef}
          className={`modal fade ${isModal1Open ? "show" : ""}`}
          id="exampleModalCenter"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
          tabIndex="-1"
          style={{ display: isModal1Open ? "block" : "none" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <p className="heading_of_assign_role">Add State</p>
                <div className="main_roles_user_div">
                  <div className="mt-2 row px-3">
                    <div className="col-sm-12">
                      <input
                        className="inputsearchuserroles"
                        placeholder="Search"
                        onChange={(event) => setstateQuery(event.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mt-3 div_main_for_scroll_state">
                    {statedata.data ? (
                      statedata.data
                        .filter((post) => {
                          if (addstatequery === "") {
                            return post;
                          } else if (
                            post.name
                              .toLowerCase()
                              .includes(addstatequery.toLowerCase())
                          ) {
                            return post;
                          }
                        })
                        .map((state, index) => (
                          <div key={index} className="row ml-4">
                            <div className="col-1 checkbox_style_desired_city">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id={`checkbox_${state?.id}`}
                                checked={selectedState === state?.id}
                                onChange={() =>
                                  handleCheckboxstateChange(state?.id)
                                }
                              />
                            </div>
                            <p className="col-11 statenamestyle">
                              {state.name}
                            </p>
                          </div>
                        ))
                    ) : (
                      <SpinnerLoader />
                    )}
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <button
                    className="backbutton_county"
                    onClick={() => {
                      closebutton();
                    }}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="save_button_assign_role"
                    id="closeButton"
                    onClick={() => {
                      openModal2();
                      getcountydatafpmode();
                    }}
                  >
                    Get county
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={backdropRef}
          className={`modal ${isModal2Open ? "show" : ""}`}
          tabIndex="-1"
          role="dialog"
          style={{ display: isModal2Open ? "block" : "none" }}
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-body">
                <p className="heading_of_assign_role">Add County</p>
                <div className="main_roles_user_div">
                  <div className="mt-2 row px-3">
                    <div className="col-sm-12">
                      <input
                        className="inputsearchuserroles"
                        placeholder="Search"
                        onChange={(event) =>
                          setanotherCountyQuery(event.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="mt-3 div_main_for_scroll_state">
                    {countyDatafp.data ? (
                      countyDatafp.data
                        .filter((post) => {
                          if (addanothercountyquery === "") {
                            return post;
                          } else if (
                            post.name
                              .toLowerCase()
                              .includes(addanothercountyquery.toLowerCase())
                          ) {
                            return post;
                          }
                        })
                        .map((countydata, index) => (
                          <div key={index} className="row ml-4">
                            <div className="col-1 checkbox_style_desired_city">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={selectedCountyIds.includes(
                                  countydata.id
                                )}
                                id={`checkbox_${index}`}
                                name={`checkbox_${index}`}
                                onChange={() =>
                                  handleCountyCheckboxChange(countydata.id)
                                }
                              />
                            </div>
                            <p className="col-11 statenamestyle">
                              {countydata.name}
                            </p>
                          </div>
                        ))
                    ) : (
                      <SpinnerLoader />
                    )}
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <button
                    className="backbutton_county"
                    onClick={() => {
                      backbutton();
                      clearCountyidss();
                    }}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    class="save_button_assign_role"
                    id="closeButton"
                    // onClick={() => AssignRolesToUsersAction()}

                    onClick={() => {
                      postCountyState();
                    }}
                    // onClick={nextToCounty}
                  >
                    save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="heading_advance_lead">Advance Lead Parameters Settings</p>
        <div className="main_div_para_adnave_lead">
          <p className="para_adnave_lead">
            These options give you a way to only get leads with parameters you
            want to get. Exclude parameters and see how many leads with similar
            parameters have been generated in the last 30 days.
          </p>
        </div>

        <div className="row main_div_county_state">
          <div className="col-lg-4 col-md-6 col-12">
            <div className="show_state_county_filter">
              <div class="d-flex justify-content-start">
                <p className="para_inside_filters">Seller motivation</p>
              </div>

              <div
                class="d-flex justify-content-end"
                data-toggle="modal"
                data-target="#Modalreasonforselling"
              >
                <img src={edit_button} className="edit_button_fp" />
              </div>

              <div class="d-flex justify-content-start">
                <div className="show_county_icon_style">
                  <p className="para_inside_show_county">
                    {motivationCount ? motivationCount : "0"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            class="modal fade"
            id="Modalreasonforselling"
            tabindex="-1"
            role="dialog"
            aria-labelledby="newModalTitle"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-body">
                  <p className="heading_of_assign_role">
                    Seller motivation{" "}
                    <button
                      type="button"
                      class="close mr-3"
                      data-dismiss="modal"
                      aria-label="Close"
                      ref={isModalOpenModalreasonforselling}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </p>

                  <div className="main_roles_user_div">
                    <div className="mt-2 row px-3">
                      <div className="col-sm-12">
                        <input
                          className="inputsearchuserroles"
                          placeholder="Search"
                          onChange={(event) =>
                            setsellermotivationQuery(event.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="mt-3 div_main_for_scroll_state">
                      {reasonsForSelling ? (
                        reasonsForSelling
                          .filter((post) => {
                            if (sellermotivationQuery === "") {
                              return post;
                            } else if (
                              post
                                .toLowerCase()
                                .includes(sellermotivationQuery.toLowerCase())
                            ) {
                              return post;
                            }
                          })
                          .map((countydata, index) => (
                            <div key={index} className="row ml-4">
                              <div className="col-1 checkbox_style_desired_city">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value={countydata}
                                  id={`checkbox_${index}`}
                                  name={`checkbox_${index}`}
                                  checked={
                                    selectedReasons &&
                                    selectedReasons.includes(countydata)
                                  }
                                  onChange={() =>
                                    handleReasonSelection(countydata)
                                  }
                                />
                              </div>
                              <p className="col-11 statenamestyle">
                                {countydata}
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
                      onClick={() => {
                        fixedPriceAction();
                      }}

                      // onClick={closeModal2,}
                      // onClick={nextToCounty}
                    >
                      save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-12">
            <div className="show_state_county_filter">
              <div class="d-flex justify-content-start">
                <p className="para_inside_filters">Type of Property</p>
              </div>

              <div
                class="d-flex justify-content-end"
                data-toggle="modal"
                data-target="#ModalpropertyTypes"
              >
                <img src={edit_button} className="edit_button_fp" />
              </div>

              <div class="d-flex justify-content-start">
                <div className="show_county_icon_style">
                  <p className="para_inside_show_county">
                    {typeofpropertyCount ? typeofpropertyCount : "0"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            class="modal fade"
            id="ModalpropertyTypes"
            tabindex="-1"
            role="dialog"
            aria-labelledby="newModalTitle"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-body">
                  <p className="heading_of_assign_role">
                    Type of Property{" "}
                    <button
                      type="button"
                      class="close mr-3"
                      data-dismiss="modal"
                      aria-label="Close"
                      ref={isModalOpenModalpropertyTypes}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </p>
                  <div className="main_roles_user_div">
                    <div className="mt-2 row px-3">
                      <div className="col-sm-12">
                        <input
                          className="inputsearchuserroles"
                          placeholder="Search"
                          onChange={(event) =>
                            settypeofpropertyQuery(event.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="mt-3 div_main_for_scroll_state">
                      {propertyTypes && propertyTypes.length > 0 ? (
                        propertyTypes
                          .filter((post) => {
                            if (typeofpropertyQuery === "") {
                              return post;
                            } else if (
                              post
                                .toLowerCase()
                                .includes(typeofpropertyQuery.toLowerCase())
                            ) {
                              return post;
                            }
                          })
                          .map((countydata, index) => (
                            <div key={index} className="row ml-4">
                              <div className="col-1 checkbox_style_desired_city">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id={`checkbox_${index}`}
                                  name={`checkbox_${index}`}
                                  onChange={() =>
                                    countydata &&
                                    handlepropertytypeChange(countydata)
                                  }
                                  checked={
                                    selectedPropertyTypes &&
                                    selectedPropertyTypes.includes(countydata)
                                  }
                                />
                              </div>
                              <p className="col-11 statenamestyle">
                                {countydata}
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
                      onClick={() => {
                        fixedPriceAction();
                        closeModal2();
                      }}
                    >
                      save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-12">
            <div className="show_state_county_filter">
              <div class="d-flex justify-content-start">
                <p className="para_inside_filters">Square footage</p>
              </div>

              <div
                class="d-flex justify-content-end"
                data-toggle="modal"
                data-target="#Modalsquarefootage"
              >
                <img src={edit_button} className="edit_button_fp" />
              </div>

              <div class="d-flex justify-content-start">
                <div className="show_county_icon_style">
                  <p className="para_inside_show_county">
                    {squareFootageCount ? squareFootageCount : "0"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            class="modal fade"
            id="Modalsquarefootage"
            tabindex="-1"
            role="dialog"
            aria-labelledby="newModalTitle"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-body">
                  <p className="heading_of_assign_role">
                    Square footage{" "}
                    <button
                      type="button"
                      class="close mr-3"
                      data-dismiss="modal"
                      aria-label="Close"
                      ref={isModalsquarefootage}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </p>
                  <div className="main_roles_user_div">
                    <div className="mt-2 row px-3">
                      <div className="col-sm-12">
                        <input
                          className="inputsearchuserroles"
                          placeholder="Search"
                          onChange={(event) =>
                            setsquarefootageQuery(event.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="mt-3 div_main_for_scroll_state">
                      {priceRanges ? (
                        priceRanges
                          .filter((post) => {
                            if (squarefootageQuery === "") {
                              return true; // Return true for all items if there's no query
                            } else if (
                              post
                                .toLowerCase()
                                .includes(squarefootageQuery.toLowerCase())
                            ) {
                              return true;
                            }
                            return false; // Return false for items that don't match the query
                          })
                          .map((countydata, index) => (
                            <div key={index} className="row ml-4">
                              <div className="col-1 checkbox_style_desired_city">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id={`checkbox_${index}`}
                                  name={`checkbox_${index}`}
                                  checked={
                                    Selectedsquarefootage &&
                                    Selectedsquarefootage.includes(countydata)
                                  }
                                  onChange={() =>
                                    toggleSquareFootage(countydata)
                                  }
                                />
                              </div>
                              <p className="col-11 statenamestyle">
                                {countydata}
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
                      onClick={() => {
                        fixedPriceAction();
                        closeModal2();
                      }}
                    >
                      save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-12">
            <div className="show_state_county_filter">
              <div class="d-flex justify-content-start">
                <p className="para_inside_filters">Year of construction</p>
              </div>

              <div
                class="d-flex justify-content-end"
                data-toggle="modal"
                data-target="#Modalyearofconstruction"
              >
                <img src={edit_button} className="edit_button_fp" />
              </div>

              <div class="d-flex justify-content-start">
                <div className="show_county_icon_style">
                  <p className="para_inside_show_county">
                    {yearsofconstructionCount ? yearsofconstructionCount : "0"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            class="modal fade"
            id="Modalyearofconstruction"
            tabindex="-1"
            role="dialog"
            aria-labelledby="newModalTitle"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-body">
                  <p className="heading_of_assign_role">
                    Year of construction{" "}
                    <button
                      type="button"
                      class="close mr-3"
                      data-dismiss="modal"
                      aria-label="Close"
                      ref={modalyearofconstruction}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </p>
                  <div className="main_roles_user_div">
                    <div className="mt-2 row px-3">
                      <div className="col-sm-12">
                        <input
                          className="inputsearchuserroles"
                          placeholder="Search"
                          onChange={(event) =>
                            setyearofconstructionQuery(event.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="mt-3 div_main_for_scroll_state">
                      {yearRanges ? (
                        yearRanges
                          .filter((post) => {
                            if (yearofconstructionQuery === "") {
                              return post;
                            } else if (
                              post
                                .toLowerCase()
                                .includes(yearofconstructionQuery.toLowerCase())
                            ) {
                              return post;
                            }
                          })
                          .map((countydata, index) => (
                            <div key={index} className="row ml-4">
                              <div className="col-1 checkbox_style_desired_city">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id={`checkbox_${index}`}
                                  name={`checkbox_${index}`}
                                  checked={
                                    selectedYearRanges &&
                                    selectedYearRanges.includes(countydata)
                                  }
                                  onChange={() =>
                                    handleyearrangeClick(countydata)
                                  }
                                />
                              </div>
                              <p className="col-11 statenamestyle">
                                {countydata}
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
                      onClick={() => {
                        fixedPriceAction();
                        closeModal2();
                      }}
                    >
                      save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-12">
            <div className="show_state_county_filter">
              <div class="d-flex justify-content-start">
                <p className="para_inside_filters">Repairs and maintenance?</p>
              </div>

              <div
                class="d-flex justify-content-end"
                data-toggle="modal"
                data-target="#Modalreapirandmaintainace"
              >
                <img src={edit_button} className="edit_button_fp" />
              </div>

              <div class="d-flex justify-content-start">
                <div className="show_county_icon_style">
                  <p className="para_inside_show_county">
                    {repairsandneedCount ? repairsandneedCount : "0"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            class="modal fade"
            id="Modalreapirandmaintainace"
            tabindex="-1"
            role="dialog"
            aria-labelledby="newModalTitle"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-body">
                  <p className="heading_of_assign_role">
                    Repairs and maintenance?
                    <button
                      type="button"
                      class="close mr-3"
                      data-dismiss="modal"
                      aria-label="Close"
                      ref={isModalOpenModalModalreapirandmaintainace}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </p>
                  <div className="main_roles_user_div">
                    <div className="mt-2 row px-3">
                      <div className="col-sm-12">
                        <input
                          className="inputsearchuserroles"
                          placeholder="Search"
                          onChange={(event) =>
                            setrepairandmaintainQuery(event.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="mt-3 div_main_for_scroll_state">
                      {propertyConditions ? (
                        propertyConditions
                          .filter((post) => {
                            if (repairandmaintainQuery === "") {
                              return post;
                            } else if (
                              post
                                .toLowerCase()
                                .includes(repairandmaintainQuery.toLowerCase())
                            ) {
                              return post;
                            }
                          })
                          .map((countydata, index) => (
                            <div key={index} className="row ml-4">
                              <div className="col-1 checkbox_style_desired_city">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id={`checkbox_${index}`}
                                  name={`checkbox_${index}`}
                                  onClick={() => toggleCheckbox(countydata)}
                                  checked={
                                    selectedPropertyConditions &&
                                    selectedPropertyConditions.includes(
                                      countydata
                                    )
                                  }
                                />
                              </div>
                              <p className="col-11 statenamestyle">
                                {countydata}
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
                      onClick={() => {
                        fixedPriceAction();
                        closeModal2();
                      }}
                    >
                      save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-12">
            <div className="show_state_county_filter">
              <div class="d-flex justify-content-start">
                <p className="para_inside_filters">
                  How fast they want to sell
                </p>
              </div>

              <div
                class="d-flex justify-content-end"
                data-toggle="modal"
                data-target="#Modalfasttheywanttosell"
              >
                <img src={edit_button} className="edit_button_fp" />
              </div>

              <div class="d-flex justify-content-start">
                <div className="show_county_icon_style">
                  <p className="para_inside_show_county">
                    {wanttosellCount ? wanttosellCount : "0"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            class="modal fade"
            id="Modalfasttheywanttosell"
            tabindex="-1"
            role="dialog"
            aria-labelledby="newModalTitle"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-body">
                  <p className="heading_of_assign_role">
                    How fast they want to sell
                    <button
                      type="button"
                      class="close mr-3"
                      data-dismiss="modal"
                      aria-label="Close"
                      ref={isModalOpenModalfasttheywanttosell}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </p>
                  <div className="main_roles_user_div">
                    <div className="mt-2 row px-3">
                      <div className="col-sm-12">
                        <input
                          className="inputsearchuserroles"
                          placeholder="Search"
                          onChange={(event) =>
                            setwanttosellQuery(event.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="mt-3 div_main_for_scroll_state">
                      {fastsell ? (
                        fastsell
                          .filter((post) => {
                            if (wanttosellQuery === "") {
                              return post;
                            } else if (
                              post
                                .toLowerCase()
                                .includes(wanttosellQuery.toLowerCase())
                            ) {
                              return post;
                            }
                          })
                          .map((countydata, index) => (
                            <div key={index} className="row ml-4">
                              <div className="col-1 checkbox_style_desired_city">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id={`checkbox_${index}`}
                                  name={`checkbox_${index}`}
                                  checked={
                                    selectedFastSell &&
                                    selectedFastSell.includes(countydata)
                                  }
                                  onChange={() =>
                                    toggleCheckboxFastSell(countydata)
                                  }
                                />
                              </div>
                              <p className="col-11 statenamestyle">
                                {countydata}
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
                      onClick={() => {
                        fixedPriceAction();
                        closeModal2();
                      }}
                    >
                      save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-12">
            <div className="show_state_county_filter">
              <div class="d-flex justify-content-start">
                <p className="para_inside_filters">How long have you owned?</p>
              </div>

              <div
                class="d-flex justify-content-end"
                data-toggle="modal"
                data-target="#Modalownedproperty"
              >
                <img src={edit_button} className="edit_button_fp" />
              </div>

              <div class="d-flex justify-content-start">
                <div className="show_county_icon_style">
                  <p className="para_inside_show_county">
                    {ownedpropertyCount ? ownedpropertyCount : "0"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            class="modal fade"
            id="Modalownedproperty"
            tabindex="-1"
            role="dialog"
            aria-labelledby="newModalTitle"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-body">
                  <p className="heading_of_assign_role">
                    How long have you owned the property in years?
                    <button
                      type="button"
                      class="close mr-3"
                      data-dismiss="modal"
                      aria-label="Close"
                      ref={modallongyouowned}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </p>
                  <div className="main_roles_user_div">
                    <div className="mt-2 row px-3">
                      <div className="col-sm-12">
                        <input
                          className="inputsearchuserroles"
                          placeholder="Search"
                          onChange={(event) =>
                            setlongyouownedQuery(event.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="mt-3 div_main_for_scroll_state">
                      {numberRanges ? (
                        numberRanges
                          .filter((post) => {
                            if (longyouownedQuery === "") {
                              return post;
                            } else if (
                              post
                                .toLowerCase()
                                .includes(longyouownedQuery.toLowerCase())
                            ) {
                              return post;
                            }
                          })
                          .map((countydata, index) => (
                            <div key={index} className="row ml-4">
                              <div className="col-1 checkbox_style_desired_city">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id={`checkbox_${index}`}
                                  name={`checkbox_${index}`}
                                  onClick={() =>
                                    handleCheckboxChangenumberrange(countydata)
                                  }
                                  checked={
                                    selectedNumberRanges &&
                                    selectedNumberRanges.includes(countydata)
                                  }
                                />
                              </div>
                              <p className="col-11 statenamestyle">
                                {countydata}
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
                      onClick={() => {
                        fixedPriceAction();
                        closeModal2();
                      }}
                    >
                      save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-12">
            <div className="show_state_county_filter">
              <div class="d-flex justify-content-start">
                <p className="para_inside_filters">
                  Anyone living in the house?
                </p>
              </div>

              <div
                class="d-flex justify-content-end"
                data-toggle="modal"
                data-target="#Modallicvinginhouse"
              >
                <img src={edit_button} className="edit_button_fp" />
              </div>

              <div class="d-flex justify-content-start">
                <div className="show_county_icon_style">
                  <p className="para_inside_show_county">
                    {livinginhousecount ? livinginhousecount : "0"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            class="modal fade"
            id="Modallicvinginhouse"
            tabindex="-1"
            role="dialog"
            aria-labelledby="newModalTitle"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-body">
                  <p className="heading_of_assign_role">
                    Anyone living in the house?
                    <button
                      type="button"
                      class="close mr-3"
                      data-dismiss="modal"
                      aria-label="Close"
                      ref={isModalownedproperty}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </p>
                  <div className="main_roles_user_div">
                    <div className="mt-2 row px-3">
                      <div className="col-sm-12">
                        <input
                          className="inputsearchuserroles"
                          placeholder="Search"
                          onChange={(event) =>
                            setlivinginhouseQuery(event.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="mt-3 div_main_for_scroll_state">
                      {occupancyStatus ? (
                        occupancyStatus
                          .filter((post) => {
                            if (livinginhouseQuery === "") {
                              return post;
                            } else if (
                              post
                                .toLowerCase()
                                .includes(livinginhouseQuery.toLowerCase())
                            ) {
                              return post;
                            }
                          })
                          .map((countydata, index) => (
                            <div key={index} className="row ml-4">
                              <div className="col-1 checkbox_style_desired_city">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id={`checkbox_${index}`}
                                  name={`checkbox_${index}`}
                                  checked={
                                    selectedOccupancyStatus &&
                                    selectedOccupancyStatus.includes(countydata)
                                  }
                                  onChange={() =>
                                    handleCheckboxoccupancyChange(countydata)
                                  }
                                />
                              </div>
                              <p className="col-11 statenamestyle">
                                {countydata}
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
                      onClick={() => {
                        fixedPriceAction();
                        closeModal2();
                      }}
                    >
                      save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-12">
            <div className="show_state_county_filter">
              <div class="d-flex justify-content-start">
                <p className="para_inside_filters">Bedrooms</p>
              </div>

              <div
                class="d-flex justify-content-end"
                data-toggle="modal"
                data-target="#Modalbedroom"
              >
                <img src={edit_button} className="edit_button_fp" />
              </div>

              <div class="d-flex justify-content-start">
                <div className="show_county_icon_style">
                  <p className="para_inside_show_county">
                    {bedroomCount ? bedroomCount : "0"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            class="modal fade"
            id="Modalbedroom"
            tabindex="-1"
            role="dialog"
            aria-labelledby="newModalTitle"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-body">
                  <p className="heading_of_assign_role">
                    Bedrooms
                    <button
                      type="button"
                      class="close mr-3"
                      data-dismiss="modal"
                      aria-label="Close"
                      ref={isModalbedroom}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </p>
                  <div className="main_roles_user_div">
                    <div className="mt-2 row px-3">
                      <div className="col-sm-12">
                        <input
                          className="inputsearchuserroles"
                          placeholder="Search"
                          onChange={(event) =>
                            setbedroomQuery(event.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="mt-3 div_main_for_scroll_state">
                      {bedroomOptions ? (
                        bedroomOptions
                          .filter((post) => {
                            if (bedroomQuery === "") {
                              return post;
                            } else if (
                              post
                                .toLowerCase()
                                .includes(bedroomQuery.toLowerCase())
                            ) {
                              return post;
                            }
                          })
                          .map((countydata, index) => (
                            <div key={index} className="row ml-4">
                              <div className="col-1 checkbox_style_desired_city">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id={`checkbox_${index}`}
                                  name={`checkbox_${index}`}
                                  checked={
                                    selectedBedroomOptions &&
                                    selectedBedroomOptions.includes(countydata)
                                  }
                                  onChange={() =>
                                    toggleBedroomOption(countydata)
                                  }
                                />
                              </div>
                              <p className="col-11 statenamestyle">
                                {countydata}
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
                      onClick={() => {
                        fixedPriceAction();
                        closeModal2();
                      }}
                    >
                      save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-12">
            <div className="show_state_county_filter">
              <div class="d-flex justify-content-start">
                <p className="para_inside_filters">Bathrooms</p>
              </div>

              <div
                class="d-flex justify-content-end"
                data-toggle="modal"
                data-target="#Modalbathroom"
              >
                <img src={edit_button} className="edit_button_fp" />
              </div>

              <div class="d-flex justify-content-start">
                <div className="show_county_icon_style">
                  <p className="para_inside_show_county">
                    {bathroomsCount ? bathroomsCount : "0"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            class="modal fade"
            id="Modalbathroom"
            tabindex="-1"
            role="dialog"
            aria-labelledby="newModalTitle"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-body">
                  <p className="heading_of_assign_role">
                    Bathrooms
                    <button
                      type="button"
                      class="close mr-3"
                      data-dismiss="modal"
                      aria-label="Close"
                      ref={isModalbathroom}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </p>
                  <div className="main_roles_user_div">
                    <div className="mt-2 row px-3">
                      <div className="col-sm-12">
                        <input
                          className="inputsearchuserroles"
                          placeholder="Search"
                          onChange={(event) =>
                            setbathroomQuery(event.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="mt-3 div_main_for_scroll_state">
                      {bathroomOptions ? (
                        bathroomOptions
                          .filter((post) => {
                            if (bathroomQuery === "") {
                              return post;
                            } else if (
                              post
                                .toLowerCase()
                                .includes(bathroomQuery.toLowerCase())
                            ) {
                              return post;
                            }
                          })
                          .map((countydata, index) => (
                            <div key={index} className="row ml-4">
                              <div className="col-1 checkbox_style_desired_city">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id={`checkbox_${index}`}
                                  name={`checkbox_${index}`}
                                  checked={
                                    selectedBathroomOptions &&
                                    selectedBathroomOptions.includes(countydata)
                                  }
                                  onChange={() =>
                                    handleCheckboxbathroomClick(countydata)
                                  }
                                />
                              </div>
                              <p className="col-11 statenamestyle">
                                {countydata}
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
                      onClick={() => {
                        fixedPriceAction();
                        closeModal2();
                      }}
                    >
                      save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-12">
            <div className="show_state_county_filter">
              <div class="d-flex justify-content-start">
                <p className="para_inside_filters">Mortgage</p>
              </div>

              <div
                class="d-flex justify-content-end"
                data-toggle="modal"
                data-target="#Modalmortgage"
              >
                <img src={edit_button} className="edit_button_fp" />
              </div>

              <div class="d-flex justify-content-start">
                <div className="show_county_icon_style">
                  <p className="para_inside_show_county">
                    {mortgageCount ? mortgageCount : "0"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            class="modal fade"
            id="Modalmortgage"
            tabindex="-1"
            role="dialog"
            aria-labelledby="newModalTitle"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-body">
                  <p className="heading_of_assign_role">
                    Mortgage
                    <button
                      type="button"
                      class="close mr-3"
                      data-dismiss="modal"
                      aria-label="Close"
                      ref={isModalmortgage}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </p>
                  <div className="main_roles_user_div">
                    <div className="mt-2 row px-3">
                      <div className="col-sm-12">
                        <input
                          className="inputsearchuserroles"
                          placeholder="Search"
                          onChange={(event) =>
                            setmortgageQuery(event.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="mt-3 div_main_for_scroll_state">
                      {mortgageStatus ? (
                        mortgageStatus
                          .filter((post) => {
                            if (mortgageQuery === "") {
                              return post;
                            } else if (
                              post
                                .toLowerCase()
                                .includes(mortgageQuery.toLowerCase())
                            ) {
                              return post;
                            }
                          })
                          .map((countydata, index) => (
                            <div key={index} className="row ml-4">
                              <div className="col-1 checkbox_style_desired_city">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id={`checkbox_${index}`}
                                  name={`checkbox_${index}`}
                                  checked={
                                    selectedMortgageStatus &&
                                    selectedMortgageStatus.includes(countydata)
                                  }
                                  onChange={() =>
                                    handleCheckboxmortgageChange(countydata)
                                  }
                                />
                              </div>
                              <p className="col-11 statenamestyle">
                                {countydata}
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
                      onClick={() => {
                        fixedPriceAction();
                        closeModal2();
                      }}
                    >
                      save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-12">
            <div className="show_state_county_filter">
              <div class="d-flex justify-content-start">
                <p className="para_inside_filters">
                  Owner or Agent/Wholesaler?
                </p>
              </div>

              <div
                class="d-flex justify-content-end"
                data-toggle="modal"
                data-target="#Modalowneroragent"
              >
                <img src={edit_button} className="edit_button_fp" />
              </div>

              <div class="d-flex justify-content-start">
                <div className="show_county_icon_style">
                  <p className="para_inside_show_county">
                    {owneroragentCount ? owneroragentCount : "0"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            class="modal fade"
            id="Modalowneroragent"
            tabindex="-1"
            role="dialog"
            aria-labelledby="newModalTitle"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-body">
                  <p className="heading_of_assign_role">
                    Owner or Agent/Wholesaler?
                    <button
                      type="button"
                      class="close mr-3"
                      data-dismiss="modal"
                      aria-label="Close"
                      ref={isModalowneroragent}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </p>
                  <div className="main_roles_user_div">
                    <div className="mt-2 row px-3">
                      <div className="col-sm-12">
                        <input
                          className="inputsearchuserroles"
                          placeholder="Search"
                          onChange={(event) =>
                            setagentwholesalerQuery(event.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="mt-3 div_main_for_scroll_state">
                      {agentorwholeseller ? (
                        agentorwholeseller
                          .filter((post) => {
                            if (agentwholesalerQuery === "") {
                              return post;
                            } else if (
                              post
                                .toLowerCase()
                                .includes(agentwholesalerQuery.toLowerCase())
                            ) {
                              return post;
                            }
                          })
                          .map((countydata, index) => (
                            <div key={index} className="row ml-4">
                              <div className="col-1 checkbox_style_desired_city">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id={`checkbox_${index}`}
                                  name={`checkbox_${index}`}
                                  checked={
                                    selectedValuesagent &&
                                    selectedValuesagent.includes(countydata)
                                  }
                                  onChange={() =>
                                    handleCheckboxagentChange(countydata)
                                  }
                                />
                              </div>
                              <p className="col-11 statenamestyle">
                                {countydata}
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
                      onClick={() => {
                        fixedPriceAction();
                        closeModal2();
                      }}
                    >
                      save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-12">
            <div className="show_state_county_filter">
              <div class="d-flex justify-content-start">
                <p className="para_inside_filters">
                  Property listed with a real estate agent?
                </p>
              </div>

              <div
                class="d-flex justify-content-end"
                data-toggle="modal"
                data-target="#Modallistedwithagent"
              >
                <img src={edit_button} className="edit_button_fp" />
              </div>

              <div class="d-flex justify-content-start">
                <div className="show_county_icon_style">
                  <p className="para_inside_show_county">
                    {listedwithagentCount ? listedwithagentCount : "0"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            class="modal fade"
            id="Modallistedwithagent"
            tabindex="-1"
            role="dialog"
            aria-labelledby="newModalTitle"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-body">
                  <p className="heading_of_assign_role">
                    Is your property listed with a real estate agent?
                    <button
                      type="button"
                      class="close mr-3"
                      data-dismiss="modal"
                      aria-label="Close"
                      ref={isModallistedwithagent}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </p>
                  <div className="main_roles_user_div">
                    <div className="mt-2 row px-3">
                      <div className="col-sm-12">
                        <input
                          className="inputsearchuserroles"
                          placeholder="Search"
                          onChange={(event) =>
                            setrealestateagentQuery(event.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="mt-3 div_main_for_scroll_state">
                      {listedwithagent ? (
                        listedwithagent
                          .filter((post) => {
                            if (realestateagentQuery === "") {
                              return post;
                            } else if (
                              post
                                .toLowerCase()
                                .includes(realestateagentQuery.toLowerCase())
                            ) {
                              return post;
                            }
                          })
                          .map((countydata, index) => (
                            <div key={index} className="row ml-4">
                              <div className="col-1 checkbox_style_desired_city">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id={`checkbox_${index}`}
                                  name={`checkbox_${index}`}
                                  checked={
                                    selectedListedWithAgent &&
                                    selectedListedWithAgent.includes(countydata)
                                  }
                                  onChange={() =>
                                    handleCheckboxlistedwithagentChange(
                                      countydata
                                    )
                                  }
                                />
                              </div>
                              <p className="col-11 statenamestyle">
                                {countydata}
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
                      onClick={() => {
                        fixedPriceAction();
                        closeModal2();
                      }}
                    >
                      save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <>
        <TicketandLiveChat />
      </>
    </>
  );
}

export default FixedPriceMode;
