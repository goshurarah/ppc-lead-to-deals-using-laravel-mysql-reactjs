import React, { useEffect, useState, useRef } from "react";
import "./../Profile_User/ProfileStyle.css";
import key_pass from "./../../../Assets/change_password_key_icon.png";
import save_changes from "./../../../Assets/save_changes_btn_pic.png";
import saved_payment from "./../../../Assets/saved_payment_icon.png";
import delete_button from "./../../../Assets/delete button for payment detail.png";
import plus from "./../../../Assets/+.png";
import axios from "axios";
import SpinnerLoader from "../SpinnerLoader/SpinnerLoader";
import CustomNotification from "../CustomNotification/CustomNotification";
import RedNotification from "../CustomNotification/RedNotification";
import DashboardPpc from "../Dashboadpage/DashboardPpc";
import TicketandLiveChat from "../TicketAndLiveChat/TicketandLiveChat";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CardPayment from "./CardPayment";
import reload from "./../../../Assets/reload.png";

function Profile() {
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

  const [image, setImage] = useState({ preview: "", raw: "" });

  const handleChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image.raw);

    await fetch("YOUR_URL", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });
  };

  const [checkbox, setCheckBOX] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

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
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const handleCheckboxChange = (e, checkboxValue) => {
    if (e.target.checked) {
      if (selectedCheckboxes.length < MAX_CHECKBOXES) {
        setSelectedCheckboxes([...selectedCheckboxes, checkboxValue]);
      } else {
        // Prevent selecting more than 5 checkboxes
        e.target.checked = false;
        setnotificationMessageRed("Select only 5 checkboxes.");
        setTimeout(() => {
          setnotificationMessageRed("");
        }, 4000);
      }
    } else {
      setSelectedCheckboxes(
        selectedCheckboxes.filter((checkbox) => checkbox !== checkboxValue)
      );
    }
  };

  // const projectStateSelectionAction = (e) => {
  //   e.preventDefault();
  //   let payload = {
  //     email: getEmailData(),

  //     state_ids: selectedCheckboxes,
  //   };
  //   axios
  //     .post("/api/add-user-states", payload)
  //     .then((r) => {
  //       alert(r.data.data.message);
  //     })
  //     .catch((e) => {
  //       if (e.response.data.errors != undefined) {
  //         alert(e.response.data.message);

  //       }
  //     });
  // };

  const [statedata, setStateData] = useState("");
  useEffect(() => {
    getStatedata();
  }, []);

  const getStatedata = () => {
    axios.get(`/api/get-states`).then((res) => {
      setStateData(res?.data);
    });
  };

  const [query, setQuery] = useState("");

  //   change div position

  const [showDiv1, setShowDiv1] = useState(false);
  const [showDiv2, setShowDiv2] = useState(false);

  const handleButtonClick1 = () => {
    setShowDiv1(true);
    setShowDiv2(false);
    setShowDiv3(false);
  };

  const handleButtonClick2 = () => {
    setShowDiv1(false);
    setShowDiv2(true);
  };

  // card payment div chnage
  const [showDiv3, setShowDiv3] = useState(true);
  const [showDiv4, setShowDiv4] = useState(false);

  const handleButtonClick3 = () => {
    setShowDiv3(true);
    setShowDiv4(false);
    setShowDiv2(false);
  };

  //   add new card for adding payment detail
  const handleButtonClick4 = () => {
    setShowDiv1(false);
    setShowDiv2(false);
    setShowDiv3(false);
    setShowDiv4(true);
  };

  //get profile data api
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  {
    firstname && <DashboardPpc firstname={firstname} lastname={lastname} />;
  }
  const token = localStorage.getItem("token");
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const [userprofiledata, setuserprofiledata] = useState("");
  useEffect(() => {
    getuserprofiledata();
  }, []);

  const getuserprofiledata = () => {
    axiosInstance.get(`/api/dashboard/user-profile`).then((res) => {
      setuserprofiledata(res.data.data);
      setFirstName(res.data.data.first_name);
      setLastName(res.data.data.last_name);
      setEmail(res.data.data.email);
      setPhone(res.data.data.phone);
    });
  };

  //posy the profile user data

  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationMessageRed, setnotificationMessageRed] = useState(null);

  const addProfileDataAction1 = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image.raw);
    formData.append("first_name", firstname);
    formData.append("last_name", lastname);
    formData.append("email", email);
    formData.append("phone", phone);
    // let payload = {
    //   first_name: firstname,
    //   last_name: lastname,
    //   email: email,
    //   phone: phone,
    //   profile_pic: image.raw.name,
    // };
    axiosInstance
      .post("/api/dashboard/profile", formData)
      .then((r) => {
        // alert(r.data.message);
        setNotificationMessage(r.data.message);

        setTimeout(() => {
          setNotificationMessage("");
        }, 4000);
        // CustomeMessageShow(r.data.message)
      })
      .catch((e) => {
        if (e.response.data.errors != undefined) {
          setnotificationMessageRed(e.response.data.message);
          setTimeout(() => {
            setnotificationMessageRed("");
          }, 4000);
          // setValidationErrors(e.errors);
        }
      });
  };

  const [isLoading, setIsLoading] = useState(false);


  const addProfileDataAction = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("profile_pic", image.raw);
    formData.append("first_name", firstname);
    formData.append("last_name", lastname);
    formData.append("email", email);
    formData.append("phone", phone);

    try {
      const response = await axiosInstance.post(
        "/api/dashboard/profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setIsLoading(false);
      setNotificationMessage(response.data.message);
      setTimeout(() => {
        setNotificationMessage("");
      }, 4000);
    } catch (error) {
      setIsLoading(false);
      // Handle error if needed
      console.error(error);
    }
  };
  //add payment detail post api

  const [cardname, setcardname] = useState("");
  const [nameoncard, setnameoncard] = useState("");
  const [zipcode, setzipcode] = useState("");
  const [cvccode, setcvccode] = useState("");
  const [expirycarddate, setexpirycarddate] = useState("");

  const addPaymentDetailAction = (e) => {
    e.preventDefault();
    let payload = {
      card_number: cardname,
      card_holder: nameoncard,
      cvc_code: cvccode,
      expiry_date: expirycarddate,
    };
    axiosInstance
      .post("/api/dashboard/payment/add-card", payload)
      .then((r) => {
        // alert(r.data.message);
        setNotificationMessage(r.data.message);
        getpaymentcarddetail();
        handleButtonClick3();
        setcardname("");
        setnameoncard("");
        setcvccode("");
        setexpirycarddate("");
        setTimeout(() => {
          setNotificationMessage("");
        }, 4000);
      })
      .catch((e) => {
        if (e.response.data.errors != undefined) {
          //   alert(e.response.data.message);
          setnotificationMessageRed(e.response.data.message);
          // setValidationErrors(e.errors);
          setTimeout(() => {
            setnotificationMessageRed("");
          }, 4000);
        }
      });
  };

  //change password

  const [oldpassword, setoldpassword] = useState("");
  const [newpassword, setnewpassword] = useState("");

  const [showModal, setShowModal] = useState(false);

 

  const paymentmodal = useRef(null);
  const addChangePasswordAction = (e) => {
    e.preventDefault();
    setIsLoading(true);
    let payload = {
      current_password: oldpassword,
      new_password: newpassword,
    };
    axiosInstance
      .post("api/dashboard/change-password", payload)
      .then((r) => {
        // alert(r.data.message);
        setIsLoading(false);
        setNotificationMessage(r?.data?.data?.message);
        paymentmodal.current.click();
        clearvaluesinsearchbar();
        // setShowModal(false);

        // handleButtonClick3();
        setTimeout(() => {
          setNotificationMessage("");
        }, 4000);
      })
      .catch((e) => {
        if (e.response.data.errors != undefined) {
          setnotificationMessageRed(e?.response?.data?.message?.message);
          //   alert(e.response.data.message);
          // setValidationErrors(e.errors);
          setIsLoading(false);
          setTimeout(() => {
            setnotificationMessageRed("");
          }, 4000);
        }
      });
  };

  //get the payment card data
  const [paymentcarddetail, setpaymentcarddetail] = useState("");
  useEffect(() => {
    getpaymentcarddetail();
  }, []);

  const getpaymentcarddetail = () => {
    axiosInstance.get(`/api/dashboard/payment/get-cards`).then((res) => {
      setpaymentcarddetail(res?.data);
    });
  };

  //delete the payment card

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(
        `/api/dashboard/payment/delete-card/${id}`
      );

      setNotificationMessage(response.data.message);
      getpaymentcarddetail();
      setTimeout(() => {
        setNotificationMessage("");
      }, 4000);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const [passwordVisible, setPasswordVisible] = useState(false);
  const handleTogglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const [usersstate, setusersstate] = useState("");
  useEffect(() => {
    getuserstatess();
  }, []);

  const getuserstatess = () => {
    axiosInstance.get(`/api/dashboard/get-user-states`).then((res) => {
      setusersstate(res.data);
    });
  };

  const [userscounty, setuserscounty] = useState("");
  useEffect(() => {
    getusercounty();
  }, []);

  const getusercounty = () => {
    axiosInstance.get(`/api/dashboard/get-user-counties`).then((res) => {
      setuserscounty(res.data);
    });
  };

  const [userscity, setuserscity] = useState("");
  useEffect(() => {
    getusercity();
  }, []);

  const getusercity = () => {
    axiosInstance.get(`/api/dashboard/get-user-cities`).then((res) => {
      setuserscity(res.data);
    });
  };

  const clearvaluesinsearchbar = () => {
    setnewpassword("");
    setoldpassword("");
  };

  const [allstatedata, setallStateData] = useState("");
  useEffect(() => {
    getallStatedata();
  }, []);

  const getallStatedata = () => {
    axios.get(`/api/get-states`).then((res) => {
      setallStateData(res.data.data);
    });
  };

  const [options, setOptions] = useState(["ali", "hassan"]);

  const handleItemClick = (event) => {
    const target = event.currentTarget;
    const val = target.getAttribute("data-value");
    const inp = target.querySelector("input");
    const idx = options.indexOf(val);

    if (idx > -1) {
      const updatedOptions = [...options];
      updatedOptions.splice(idx, 1);
      setTimeout(() => {
        inp.checked = false;
        setOptions(updatedOptions);
      }, 0);
    } else {
      const updatedOptions = [...options, val];
      setTimeout(() => {
        inp.checked = true;
        setOptions(updatedOptions);
      }, 0);
    }

    target.blur();

    console.log(options);
  };

  const handleCheckboxChange1 = (e, checkboxValue) => {
    if (e.target.checked) {
      if (selectedCheckboxes.length < MAX_CHECKBOXES) {
        setSelectedCheckboxes([...selectedCheckboxes, checkboxValue]);
      } else {
        // Prevent selecting more than 5 checkboxes
        e.target.checked = false;
        setnotificationMessageRed("Select only 5 checkboxes.");
        setTimeout(() => {
          setnotificationMessageRed("");
        }, 4000);
      }
    } else {
      setSelectedCheckboxes(
        selectedCheckboxes.filter((checkbox) => checkbox !== checkboxValue)
      );
    }
  };
  localStorage.setItem("states", JSON.stringify(selectedCheckboxes));
  const projectStateSelectionAction = (e) => {
    e.preventDefault();
    let payload = {
      email: getEmailData(),
      state_ids: selectedCheckboxes,
    };
    axios
      .post("/api/add-user-states", payload)
      .then((r) => {
        // setnotificationMessage(r.data.data.message);
        // navigate("/county");
      })
      .catch((e) => {
        if (e.response.data.errors != undefined) {
          // setnotificationMessageRed(e.response.data.message);
        }
      });
  };
  return (
    <>
      {/* custom message display */}
      {notificationMessage && (
        <CustomNotification message={notificationMessage} />
      )}
      <>
        {" "}
        {notificationMessageRed && (
          <RedNotification message={notificationMessageRed} />
        )}
      </>

      <div className="row">
        <div className="col-lg-7">
          <form onSubmit={(e) => addProfileDataAction(e)}>
            <div>
              <p className="my_profile_para">My Profile</p>
            </div>
            <div className="profile_left_div">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-6">
                  <div>
                    <label htmlFor="upload-button">
                      {image.preview ? (
                        <img
                          src={
                            image.preview
                              ? image.preview
                              : `${process.env.REACT_APP_BASE_URL}/uploads/${userprofiledata.profile_pic}`
                          }
                          alt="dummy"
                          className="round_picture_div"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Upload Profile Picture"
                        />
                      ) : userprofiledata.profile_pic ? (
                        <img
                          src={`${process.env.REACT_APP_BASE_URL}/uploads/${userprofiledata.profile_pic}`}
                          alt="dummy"
                          className="round_picture_div"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Upload Profile Picture"
                        />
                      ) : (
                        <>
                          <div
                            className="round_picture_div"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Upload Profile Picture"
                          >
                            <p
                              className="upload_picture_lines"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Upload Profile Picture"
                            >
                              Drop your profile image
                              <br /> or browse <br />
                              Max. File size 2MB
                            </p>
                          </div>
                        </>
                      )}
                    </label>
                    <input
                      type="file"
                      id="upload-button"
                      style={{ display: "none" }}
                      onChange={handleChange}
                      accept="image/*"
                      className="round_picture_div"
                    />
                    <br />
                    {/* <button onClick={handleUpload}>Upload</button>  */}
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-6"></div>
                <div className="col-lg-6 col-md-6 col-6">
                  <input
                    className="input_style_profile"
                    placeholder="First Name *"
                    value={firstname}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    //   maxlength="32"
                    //   pattern="[A-Za-z]{1,32}"
                  />
                </div>{" "}
                <div className="col-lg-6 col-md-6 col-6">
                  <select
                    name="language"
                    id="language"
                    className="input_style_profile"
                  >
                    {usersstate && usersstate.length > 0 ? (
                      usersstate.map((statesshow, index) => {
                        return (
                          <option key={index} value={statesshow.name}>
                            {statesshow?.name}
                          </option>
                        );
                      })
                    ) : (
                      <option value="">Home State *</option>
                    )}
                  </select>
                </div>
                <div className="col-lg-6 col-md-6 col-6">
                  <input
                    className="input_style_profile"
                    placeholder="Last Name*"
                    value={lastname}
                    //   required
                    //   maxlength="32"
                    //   pattern="[A-Za-z]{1,32}"

                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </div>{" "}
                <div className="col-lg-6 col-md-6 col-6">
                  <select
                    name="language"
                    id="language"
                    className="input_style_profile"
                    // onChange={handleOption2Change}
                  >
                    {userscounty && userscounty.length > 0 ? (
                      userscounty.map((countyshow, index) => {
                        return (
                          <option key={index} value={countyshow.name}>
                            {countyshow?.name}
                          </option>
                        );
                      })
                    ) : (
                      <option value="">Home County *</option>
                    )}
                  </select>
                </div>
                <div className="col-lg-6 col-md-6 col-6">
                  <input
                    className="input_style_profile"
                    placeholder="E-mail *"
                    value={email}
                    id="email"
                    name="email"
                    type="email"
                    // required
                    // pattern="[A-Za-z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
                    // title="example@gmail.com"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>{" "}
                <div className="col-lg-6 col-md-6 col-6">
                  {/* <input
                    className="input_style_profile"
                    placeholder="Home City"
                  /> */}

                  <select
                    name="language"
                    id="language"
                    className="input_style_profile"
                    // onChange={handleOption2Change}
                  >
                    {userscity && userscity.length > 0 ? (
                      userscity.map((cityshow, index) => {
                        return (
                          <option key={index} value={cityshow.name}>
                            {cityshow?.name}
                          </option>
                        );
                      })
                    ) : (
                      <option value="">Home City *</option>
                    )}
                  </select>
                </div>
                <div className="col-lg-6 col-md-6 col-6">
                  <input
                    className="input_style_profile"
                    placeholder="Phone *"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                </div>{" "}
                <div className="col-lg-6 col-md-6 col-6"></div>
              </div>
            </div>
            <div>
              <p className="para_notification">Notifications Settings</p>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-6">
                <p className="heading_notification">Emails notifications</p>
                <div className="row">
                  <div className="col-lg-10 col-md-10 col-8">
                    <p className="para_inside_notification">
                      Emails about new leads in selected states{" "}
                    </p>
                  </div>
                  <div className="col-lg-2 col-md-2 col-3">
                    <input type="checkbox" id="switchemail" />
                    <label className="label124" for="switchemail">
                      Toggle
                    </label>
                  </div>

                  <div className="col-lg-10 col-md-10 col-8">
                    <p className="para_inside_notification">
                      Lead purchase email
                    </p>
                  </div>
                  <div className="col-lg-2 col-md-2 col-3">
                    <input type="checkbox" id="switchleadpurchase" />
                    <label className="label124" for="switchleadpurchase">
                      Toggle
                    </label>
                  </div>

                  <div className="col-lg-10 col-md-10 col-8">
                    <p className="para_inside_notification">Promo emails</p>
                  </div>
                  <div className="col-lg-2 col-md-2 col-3">
                    <input type="checkbox" id="switchpromoemail" />
                    <label className="label124" for="switchpromoemail">
                      Toggle
                    </label>
                  </div>

                  <div className="col-lg-10 col-md-10 col-8">
                    <p className="para_inside_notification">
                      System notification
                    </p>
                  </div>
                  <div className="col-lg-2 col-md-2 col-3">
                    <input type="checkbox" id="switchsystemnotification" />
                    <label className="label124" for="switchsystemnotification">
                      Toggle
                    </label>
                  </div>

                  <div className="col-lg-10 col-md-10 col-8">
                    <p className="para_inside_notification">
                      Fixed price mode notifications
                    </p>
                  </div>
                  <div className="col-lg-2 col-md-2 col-3">
                    <input type="checkbox" id="switchfixedpricednoti" />
                    <label className="label124" for="switchfixedpricednoti">
                      Toggle
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-6">
                <p className="heading_notification">SMS notifications</p>
                <div className="row">
                  <div className="col-lg-10 col-md-10 col-8">
                    <p className="para_inside_notification">
                      SMS about new leads in states
                    </p>
                  </div>
                  <div className="col-lg-2 col-md-2 col-3">
                    <input type="checkbox" id="switchnewleadsms" />
                    <label className="label124" for="switchnewleadsms">
                      Toggle
                    </label>
                  </div>

                  <div className="col-lg-10 col-md-10 col-8">
                    <p className="para_inside_notification">Promo sms</p>
                  </div>
                  <div className="col-lg-2 col-md-2 col-3">
                    <input type="checkbox" id="switchpromosms" />
                    <label className="label124" for="switchpromosms">
                      Toggle
                    </label>
                  </div>

                  <div className="col-lg-10 col-md-10 col-8">
                    <p className="para_inside_notification">
                      Lead purchase SMS
                    </p>
                  </div>
                  <div className="col-lg-2 col-md-2 col-3">
                    <input type="checkbox" id="switchleadpurchasesms" />
                    <label className="label124" for="switchleadpurchasesms">
                      Toggle
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button
                className="save_chnages_main_btn_profile_right"
                type="submit"
              >
                
                {isLoading ? <SpinnerLoader /> : "Save Changes"}
              </button>
            </div>
          </form>
        </div>

        {/* right side profile code */}
        <div className="col-lg-5">
          <div className="main_btn_right_profile">
            <button
              className="change_password_btn"
              //   onClick={handleButtonClick1}
              data-toggle="modal"
              data-target="#exampleModalCenter"
              onClick={() => setShowModal(true)}
            >
              <img src={key_pass} /> Change Password
            </button>
            {/* <button
              className="save_changes_btn"
              onSubmit={addProfileDataAction}
            >
              Save Changes
            </button> */}
          </div>
          {/* {showDiv1 && (
            <div className="change_password_main_div">
              <form onSubmit={(e) => addChangePasswordAction(e)}>
                <p className="change_password_para_in_profile">
                  Change Password
                </p>
                <input
                  placeholder="Old Password * "
                  className="input_password_change_style"
                  value={oldpassword}
                  onChange={(e) => setoldpassword(e.target.value)}
                />
                <input
                  placeholder="New Password *"
                  className="input_password_change_style"
                  value={newpassword}
                  onChange={(e) => setnewpassword(e.target.value)}
                />
                <div className="row">
                  <div className="col-lg-6">
                    <button
                      className="cancel_btn_in_change_password"
                      onClick={handleButtonClick2}
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="col-lg-6">
                    <button
                      className="chnage_password_btn_in_profile"
                      type="submit"
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )} */}
          {showModal && (
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
                  <div class="modal-body">
                    <p className="change_password_para_in_profile">
                      Change Password
                      <button
                        type="button"
                        class="close mr-3"
                        data-dismiss="modal"
                        aria-label="Close"
                        ref={paymentmodal}
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </p>
                    <div className="change_password_main_div">
                      <form onSubmit={(e) => addChangePasswordAction(e)}>
                        <input
                          type="password"
                          required
                          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                          title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                          placeholder="Old Password * "
                          className="input_password_change_style"
                          value={oldpassword}
                          onChange={(e) => setoldpassword(e.target.value)}
                        />
                        <div className="input_password_change_style">
                          <input
                            type={passwordVisible ? "text" : "password"}
                            placeholder="New Password *"
                            className="input_new_password"
                            required
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                            value={newpassword}
                            onChange={(e) => setnewpassword(e.target.value)}
                          />
                          <i
                            className="fa fa-eye view_password_icon_style"
                            style={{
                              color: passwordVisible ? "blue" : "lightgray",
                            }}
                            onClick={handleTogglePassword}
                            aria-hidden="true"
                          ></i>
                        </div>
                        <div className="row">
                          <div className="col-lg-6">
                            <button
                              className="cancel_btn_in_change_password"
                              // onClick={handleButtonClick2}
                              data-dismiss="modal"
                              onClick={clearvaluesinsearchbar}
                            >
                              Cancel
                            </button>
                          </div>
                          <div className="col-lg-6">
                            <button
                              className="chnage_password_btn_in_profile"
                              type="submit"
                            >
                              {isLoading ? (
                                <SpinnerLoader />
                              ) : (
                                "Change Password"
                              )}
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  {/* <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" class="btn btn-primary">
                    Save changes
                  </button>
                </div> */}
                </div>
              </div>
            </div>
          )}
          {showDiv2 && (
            <div className="payment_detail_div">
              <form onSubmit={(e) => addPaymentDetailAction(e)}>
                <p className="payment_detail_heading">Payment Details</p>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-12">
                    <input
                      className="input_payment_detail"
                      placeholder="Card Number"
                      value={cardname}
                      onChange={(e) => setcardname(e.target.value)}
                    />
                  </div>

                  <div className="col-lg-12 col-md-12 col-12">
                    <input
                      className="input_payment_detail"
                      placeholder="Name on card *"
                      value={nameoncard}
                      onChange={(e) => setnameoncard(e.target.value)}
                    />
                  </div>

                  <div className="col-lg-12 col-md-12 col-12">
                    <input
                      className="input_payment_detail"
                      placeholder="ZIP Code *"
                      value={zipcode}
                      onChange={(e) => setzipcode(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <button className="save_changes_payment_btn" type="submit">
                    <img src={save_changes} /> Save Card
                  </button>
                </div>
              </form>
            </div>
          )}

          {showDiv3 && (
            <>
              <div className="payment_card_main_div">
                <div class="d-flex justify-content-between">
                  <p className="payment_detail_heading">Payment Details</p>
                  <img
                    className="p-2 reload_style_image"
                    src={reload}
                    onClick={getpaymentcarddetail}
                  />
                </div>
                {paymentcarddetail ? (
                  paymentcarddetail?.map((data, index) => (
                    <div className="payment_card_saved_div_main">
                      <div className="row" key={index}>
                        <div className="col-lg-9 col-md-8 col-8">
                          <img
                            className="saved_image_payment"
                            src={saved_payment}
                          />
                          <p className="bank_number">
                            **** **** ****{" "}
                            {data?.card_number.toString().slice(-4)}
                          </p>
                        </div>
                        <div className="col-lg-3 col-md-4 col-4">
                          <img
                            src={delete_button}
                            className="delete_button_setting"
                            onClick={() => handleDelete(data.id)}
                          />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <SpinnerLoader />
                )}
                <button
                  className="add_new_card_btn"
                  // onClick={handleButtonClick4}
                  data-toggle="modal"
                  data-target="#addcardpaymentmodal"
                >
                  <img src={plus} className="mr-2" /> Add New Card
                </button>
              </div>
            </>
          )}

          {showDiv4 && (
            <div className="payment_detail_div">
              <div class="d-flex justify-content-between">
                <p className="payment_detail_heading">Payment Details</p>
                <img
                  className="p-2 reload_style_image"
                  src={reload}
                  onClick={getpaymentcarddetail}
                />
              </div>
              {paymentcarddetail ? (
                paymentcarddetail?.map((data, index) => (
                  <div className="payment_card_saved_div_main">
                    <div className="row" key={index}>
                      <div className="col-lg-9 col-md-8 col-8">
                        <img
                          className="saved_image_payment"
                          src={saved_payment}
                        />
                        <p className="bank_number">
                          **** **** ****{" "}
                          {data?.card_number.toString().slice(-4)}
                        </p>
                      </div>
                      <div className="col-lg-3 col-md-4 col-4">
                        <img
                          src={delete_button}
                          className="delete_button_setting"
                          onClick={() => handleDelete(data.id)}
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <SpinnerLoader />
              )}
              <form onSubmit={(e) => addPaymentDetailAction(e)}>
                {/* <p className="payment_detail_heading">Payment Details</p> */}
                <div className="row">
                  {/* <div className="col-lg-12 col-md-12 col-12">
                    <input
                      className="input_payment_detail"
                      placeholder="Card Number"
                      value={cardname}
                      onChange={(e) => setcardname(e.target.value)}
                    />
                  </div> */}

                  <div className="col-lg-12 col-md-12 col-12">
                    <input
                      required
                      className="input_payment_detail"
                      placeholder="Name on card *"
                      value={nameoncard}
                      onChange={(e) => setnameoncard(e.target.value)}
                    />
                  </div>

                  <div className="col-lg-12 col-md-12 col-12">
                    <input
                      required
                      className="input_payment_detail"
                      placeholder="Card Number *"
                      value={cardname}
                      onChange={(e) => setcardname(e.target.value)}
                      pattern="^\d{16}$"
                      title="Enter 16 digit code which on the front side of card"
                    />
                  </div>

                  <div className="col-lg-6 col-md-6 col-6">
                    <input
                      required
                      className="input_payment_detail_cvc"
                      placeholder="CVC *"
                      value={cvccode}
                      onChange={(e) => setcvccode(e.target.value)}
                      pattern="^\d{3}$"
                      title="Enter 3 digit code which on the back side of card"
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-6">
                    <input
                      required
                      type="date"
                      className="input_payment_detail_date"
                      placeholder="Card Expiry Date *"
                      value={expirycarddate}
                      onChange={(e) => setexpirycarddate(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <button className="save_changes_payment_btn" type="submit">
                    <img src={save_changes} /> Save Card
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="county_display_in_profile_div">
            <div className="row">
              <div className="col-sm-8 ">
                <p className="county_inside_para">Geo Notification settings</p>
              </div>
              <div className="col-sm-4 ">
                <p className="select_digit_county">
                  States ({selectedCheckboxes.length}/5)
                </p>
              </div>
              <div className="col-sm-12 ">
                <input
                  className="input_search_county_in_profile"
                  placeholder="Search"
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
            </div>
            <div className="main_div_scroll_user_profile">
              {statedata?.data ? (
                statedata?.data
                  ?.filter((post) => {
                    if (query === "") {
                      return post;
                    } else if (
                      post.name.toLowerCase().includes(query.toLowerCase())
                    ) {
                      return post;
                    }
                  })
                  ?.map((country, index) => {
                    return (
                      <>
                        <div key={index} className="row">
                          <div className="col-2 checkbox_show_to_geo">
                            <input
                              className="checkboxinputcounty"
                              type="checkbox"
                              value=""
                              id="checkbox"
                              name="checkbox"
                              checked={selectedCheckboxes.includes(country?.id)}
                              onChange={(e) =>
                                handleCheckboxChange(e, country?.id)
                              }
                            />
                          </div>

                          <p className="col-10 countyparastyle">
                            {country?.name}
                          </p>
                        </div>
                      </>
                    );
                  })
              ) : (
                <SpinnerLoader />
              )}
            </div>
          </div>
        </div>
      </div>

      <>
        {" "}
        <TicketandLiveChat />
      </>
      <Modal />
    </>
  );
}

export default Profile;

function CustomeMessageShow({ message1 }) {
  return <>{message1 ? <CustomNotification message={message1} /> : null}</>;
}

const stripePromise = loadStripe(
  "pk_test_51NzsyWERnYtfT4FUpZVcyWtCmYPDykLnsiMWMvroGvRgdlC52aO6CMyrOh4M2mdGMm16yJDRBVzQ6ciF3qwdlT6b00e9J3Hei8"
);

function Modal({ subscription }) {
  // Use the buttonId prop within the modal

  return (
    <div>
      <div
        class="modal fade"
        id="addcardpaymentmodal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Add Card
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              {/* <p> Subscription Type: {subscription}</p> */}

              {/* <p>Buy Type: Permanently</p> */}
              {/* <p>Price: ${price}</p> */}

              <Elements stripe={stripePromise}>
                <CardPayment />
              </Elements>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
