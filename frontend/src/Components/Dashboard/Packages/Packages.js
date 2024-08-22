import React, { useState, useEffect } from "react";
import "./../Packages/PackagesStyle.css";
import packages_main_logo from "./../../../Assets/packagesmainpic.png";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./../MainMenu/PaymentForm.js";
import PackagesPayment from "./PackagesPayment";
import TicketandLiveChat from "../TicketAndLiveChat/TicketandLiveChat";
import axios from "axios";
import CustomNotification from "../CustomNotification/CustomNotification";
import RedNotification from "../CustomNotification/RedNotification";
import SpinnerLoader from "../SpinnerLoader/SpinnerLoader";
// import { Slider } from "@mui/material";
import rightarrow from "./../../../Assets/RightArrow.png";
import leftarrow from "./../../../Assets/LeftArrow.png";
import Slider from "react-slick";

function Packages() {
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
  
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <img className="brands_arrow" src={rightarrow} />,
    prevArrow: <img className="brands_arrow" src={leftarrow} />,
  };

  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationMessageRed, setnotificationMessageRed] = useState(null);

  const mesage1 = " user created successfullly";
  const [buttonId, setButtonId] = useState(null);
  const [subscription, setsubscription] = useState("");
  const [subscriptionprice, setsubscriptionprice] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");


  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");

  const token = localStorage.getItem("token");
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const [userprofiledata, setuserprofiledata] = useState("");
  useEffect(() => {
    getuserprofiledatadashboard();
  }, []);

  const getuserprofiledatadashboard = () => {
    axiosInstance.get(`/api/dashboard/user-profile`).then((res) => {
      setuserprofiledata(res.data.data);
      // setFirstName(res.data.data.first_name);
      // setLastName(res.data.data.last_name);
      setName(res.data.data.first_name + " " + res.data.data.last_name);
      setEmail(res.data.data.email);
      setPhone(res.data.data.phone);
    });
  };
  console.log(userprofiledata, "user data");

  const [getPackages, setPackages] = useState("");
  useEffect(() => {
    getPackagesData();
  }, []);

  const getPackagesData = () => {
    axiosInstance.get(`/api/dashboard/get-all-packages`).then((res) => {
      setPackages(res.data.data);
    });
  };
  console.log(getPackages, "paCKAGES data");

  const addAppointmentAction = (e) => {
    e.preventDefault();
    let payload = {
      name: name,
      email: email,
      phone: phone,
      address: address,
    };
    axiosInstance
      .post("/api/dashboard/create-appointment", payload)
      .then((r) => {
        // alert(r.data.message);
        setNotificationMessage(r.data.message);
        setAddress("");
        setTimeout(() => {
          setNotificationMessage("");
        }, 4000);
      })
      .catch((e) => {
        if (e.response.data.errors != undefined) {
          //   alert(e.response.data.message);
          // setnotificationMessageRed(e.response.data.message);
          // setValidationErrors(e.errors);
        }
      });
  };
  const formatValue = (value) => {
    const formattedValue = parseFloat(value).toFixed(2); // Format with 2 decimal places
    return formattedValue.replace(/\.00$/, ""); // Remove trailing ".00"
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
      {/* header of packages */}
      <div className="row main_div_packages">
        <div className="col-lg-2 col-md-2 col-2">
          <img src={packages_main_logo} className="packages_main_photo" />
        </div>
        <div className="col-lg-10 col-md-10 col-10">
          <div className="row blue_main_div">
            <div className="col-lg-1 col-md-1 col-2"></div>
            <div className="col-lg-9 col-md-9 col-10">
              <p className="scaleandclose_para">
                Scale and close even more deals
              </p>
              <p className="scaleandclose_description">
                The Leads to deals team is happy to answer your questions and
                help you through the process.
              </p>
            </div>
            <div className="col-lg-2 col-md-2 col-12">
              <a href="#call_book_form">
                <button className="book_a_call_btn">Book a Call</button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* core include */}
      <div className="core_inlcude_main_div">
        <p className="core_include_heading">Core Includes:</p>
        <ul>
          <li>
            <p className="core_include_para">
              If you don’t see leads in your counties on ispeedtolead - grab a
              package and we will add your locations to our campaigns the very
              next day.
            </p>
          </li>
          <li>
            <p className="core_include_para">
              Prepaid Packages and bonus balance can be used both on pay per
              lead open marketplace and via fixed-price mode
            </p>
          </li>
          <li>
            <p className="core_include_para">
              We guarantee that you’ll have sufficient leads in your chosen
              counties - or your money back
            </p>
          </li>
          <li>
            <p className="core_include_para">
              This guarantee is good for 45 days - so it’s zero risk and zero
              pressure. Now let’s get some deals in your pipeline.
            </p>
          </li>
        </ul>
      </div>

      {/* packages card */}
      <div className="row main_div_packages_card">
        {/* basic card */}

        {/* <Slider {...settings}> */}
        {getPackages ? (
          getPackages.map((item, index) => (
            <>
              {index % 2 === 0 ? (
                <div className="col-lg-4 col-md-4 col-4 basic_packages_main_div ">
                  <div className="basic_heading">
                    <p className="basic_heading_para">{item?.name}</p>
                  </div>
                  <div className="basic_packages_descp_para">
                    {item.description
                      ? item?.description.map((data, index) => <p>{data}</p>)
                      : null}
                    {/* <p>(one time package, non-subscription)</p>
                      <p>
                        Ideal for ballers and teams that want more deals and get
                        maximum leads on their investment.
                      </p> */}
                  </div>

                  <p className="price_of_professional ">
                    ${formatValue(item?.price)}
                  </p>

                  {item?.price_desc === null ? (
                    <div className="add_height_between"></div>
                  ) : null}
                  <p className="below_professional_price_para">
                    {item?.price_desc === null ? (
                      <div className="div_height_for_style"></div>
                    ) : (
                      item?.price_desc
                    )}
                  </p>
                  <p></p>
                  <p
                    className={`basic_package_include ${
                      item?.price_desc === null ? "mt-5" : ""
                    }`}
                  >
                    {item?.name} Package Includes:
                  </p>
                  {item.detail
                    ? item?.detail.map((data, index) => (
                        <div className="premium_pkg_div_forth">
                          <p className="premium_pkg_para_one">{data}</p>
                        </div>
                      ))
                    : null}
                  {/* <div className="professional_pkg_div_third">
                      <p className="professional_pkg_para_one">
                        PPC Leads to Deal Youtube Closers Show Invitation (close
                        free leads for an hour with a large live and replay
                        audience - promote your business, personal brand or
                        product during the show)
                      </p>
                    </div>
                    <div className="professional_pkg_div_third">
                      <p className="professional_pkg_para_one">
                        Verified Closer badge for you and your team on our
                        discord server that also allows you to freedom to JV
                        with anyone within the discord community
                      </p>
                    </div> */}

                  <button
                    className="contact_our_team_btn"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                    onClick={() => {
                      setsubscription(item?.id);
                      setsubscriptionprice(item?.price)
                    }}
                  >
                    Buy
                  </button>
                </div>
              ) : (
                <div className="col-lg-4 col-md-4 col-4 premium_packages_main_div">
                  <div className="premium_heading">
                    <p className="premium_heading_para">{item?.name}</p>
                  </div>
                  <div className="premium_packages_descp_para">
                    {item.description
                      ? item?.description.map((data, index) => <p>{data}</p>)
                      : null}
                    {/* <p>(one time package, non-subscription)</p>
                      <p>
                        With our customer reported average ratio of 6-12 leads
                        per closed deal - this is a package that has the highest
                        probability of 1-2 successful transactions.
                      </p> */}
                  </div>
                  <p
                    className={`price_of_premium ${
                      item?.price_desc == null ? "mb-5" : ""
                    }`}
                  >
                    ${formatValue(item?.price)}
                  </p>
                  <p className="below_premium_price_para">{item?.price_desc}</p>

                  <p
                    className={`premium_package_include ${
                      item?.price_desc === null ? "mt-5" : ""
                    }`}
                  >
                    {item?.name} Package Includes:
                  </p>
                  {/* <div className="premium_pkg_div_third">
                      <p className="premium_pkg_para_one">
                        Nationwide Cash Buyers List (10000 records)
                      </p>
                    </div> */}
                  {item.detail
                    ? item?.detail.map((data, index) => (
                        <div className="premium_pkg_div_forth">
                          <p className="premium_pkg_para_one">{data}</p>
                        </div>
                      ))
                    : null}

                  {/* <div className="premium_pkg_div_third">
                      <p className="premium_pkg_para_one">
                        50,000 top US real estate agents by volume w contact
                        info
                      </p>
                    </div>
                    <div className="premium_pkg_div_third">
                      <p className="premium_pkg_para_one">
                        2023 Wholesaling contract pack
                      </p>
                    </div> */}
                  {/* <div className="premium_pkg_div_forth">
                      <p className="premium_pkg_para_one">
                        Special discount coupons that are sent twice a month
                        only to package buyers
                      </p>
                    </div> */}
                  {/* <div className="basic_pkg_div_third">
            <p className="basic_pkg_para_one">Motivation Guarantee on every lead - if they changed their mind about selling - it’s your money back.</p>
          </div> */}
                  <button
                    className="contact_our_team_btn_premium"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                    onClick={() => {
                      setsubscription(item?.id);
                      setsubscriptionprice(item?.price)
                    }}
                  >
                    Buy
                  </button>
                </div>
              )}
            </>
          ))
        ) : (
          <SpinnerLoader />
        )}
        {/* </Slider> */}

        {/* basic card */}
        {/* <div className="col-lg-4 col-md-4 col-4 basic_packages_main_div">
          <div className="basic_heading">
            <p className="basic_heading_para">Basic</p>
          </div>
          <div className="basic_packages_descp_para">
            <p>(one time package, non-subscription)</p>
            <p>
              Entry level package that will last you 2-3 motivated, off market
              guaranteed, successful-contact-guaranteed leads.
            </p>
          </div>
          <p className="price_of_basic">$500</p>
          <p className="basic_package_include">Basic Package Includes:</p>
          <div className="basic_pkg_div_one">
            <p className="basic_pkg_para_one">
              Off Market Money Back Guarantee on every lead
            </p>
          </div>
          <div className="basic_pkg_div_one">
            <p className="basic_pkg_para_one">
              Successful Contact Guarantee on every lead
            </p>
          </div>
          <div className="basic_pkg_div_third">
            <p className="basic_pkg_para_one">
              Motivation Guarantee on every lead - if they changed their mind
              about selling - it’s your money back.
            </p>
          </div>
          <button
            className="contact_our_team_btn"
            data-toggle="modal"
            data-target="#exampleModalCenter"
            onClick={() => {
              setsubscription("basic");
            }}
          >
            Buy
          </button>
        </div> */}

        {/* premium card */}
        {/* <div className="col-lg-4 col-md-4 col-4 premium_packages_main_div">
          <div className="premium_heading">
            <p className="premium_heading_para">Premium</p>
          </div>
          <div className="premium_packages_descp_para">
            <p>(one time package, non-subscription)</p>
            <p>
              With our customer reported average ratio of 6-12 leads per closed
              deal - this is a package that has the highest probability of 1-2
              successful transactions.
            </p>
          </div>
          <p className="price_of_premium">$999</p>
          <p className="below_premium_price_para">
            You get $999 +9% bonus $90 on your balance = $1089 you can spend on
            leads
          </p>
          <p></p>
          <p className="premium_package_include">Premium Package Includes:</p>
          <div className="premium_pkg_div_third">
            <p className="premium_pkg_para_one">
              Nationwide Cash Buyers List (10000 records)
            </p>
          </div>
          <div className="premium_pkg_div_third">
            <p className="premium_pkg_para_one">
              50,000 top US real estate agents by volume w contact info
            </p>
          </div>
          <div className="premium_pkg_div_third">
            <p className="premium_pkg_para_one">
              2023 Wholesaling contract pack
            </p>
          </div>
          <div className="premium_pkg_div_forth">
            <p className="premium_pkg_para_one">
              Special discount coupons that are sent twice a month only to
              package buyers
            </p>
          </div>
          <button
            className="contact_our_team_btn_premium"
            data-toggle="modal"
            data-target="#exampleModalCenter"
            onClick={() => {
              setsubscription("premium");
            }}
          >
            Buy
          </button>
        </div> */}

        {/* professional card */}
        {/* <div className="col-lg-4 col-md-4 col-4 basic_packages_main_div ">
          <div className="basic_heading">
            <p className="basic_heading_para">Professional</p>
          </div>
          <div className="basic_packages_descp_para">
            <p>(one time package, non-subscription)</p>
            <p>
              Ideal for ballers and teams that want more deals and get maximum
              leads on their investment.
            </p>
          </div>
          <p className="price_of_professional">$4499</p>
          <p className="below_professional_price_para">
            You get $4499 +7% bonus $300 on your balance = $4799 you can spend
            on leads
          </p>
          <p></p>
          <p className="basic_package_include">
            Professional Package Includes:
          </p>
          <div className="professional_pkg_div_third">
            <p className="professional_pkg_para_one">
              PPC Leads to Deal Youtube Closers Show Invitation (close free
              leads for an hour with a large live and replay audience - promote
              your business, personal brand or product during the show)
            </p>
          </div>
          <div className="professional_pkg_div_third">
            <p className="professional_pkg_para_one">
              Verified Closer badge for you and your team on our discord server
              that also allows you to freedom to JV with anyone within the
              discord community
            </p>
          </div>
      

          <button
            className="contact_our_team_btn"
            data-toggle="modal"
            data-target="#exampleModalCenter"
            onClick={() => {
              setsubscription("professional");
            }}
          >
            Buy
          </button>
        </div> */}
      </div>

      <>
        <div className="main_div_book_call" id="call_book_form">
          <form onSubmit={addAppointmentAction}>
            <div className="heading_div_for_book_call">
              <p className="para_book_call">
                Fill the form & Make your appointment
              </p>
            </div>
            <div className="row">
              <div className="col-lg-1"></div>
              <div className="col-lg-5">
                <input
                  className="input_style_book_call"
                  type="text"
                  placeholder="Name *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="col-lg-5">
                <input
                  className="input_style_book_call"
                  type="email"
                  placeholder="Email *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="col-lg-1"></div>
            </div>

            <div className="row">
              <div className="col-lg-1"></div>
              <div className="col-lg-5">
                <input
                  className="input_style_book_call1"
                  type="tel"
                  placeholder="Phone *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="col-lg-5">
                <input
                  className="input_style_book_call1"
                  type="text"
                  placeholder="Address *"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="col-lg-1"></div>
            </div>

            <div className="heading_div_for_book_call">
              <button className="button_submit_book_call" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </>

      <>
        {" "}
        <TicketandLiveChat />
      </>
      {/* <RedNotification message={mesage1} /> */}
      <>
        {" "}
        <Modal subscription={subscription} subscriptionprice={subscriptionprice} />
      </>
    </>
  );
}

export default Packages;

const stripePromise = loadStripe(
  "pk_test_51NzsyWERnYtfT4FUpZVcyWtCmYPDykLnsiMWMvroGvRgdlC52aO6CMyrOh4M2mdGMm16yJDRBVzQ6ciF3qwdlT6b00e9J3Hei8"
);

function Modal({ subscription, subscriptionprice }) {
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
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p> <b>Subscription Type: </b> {subscription}</p>

              {/* <p>Buy Type: Permanently</p> */}
              <p> <b>Price: </b> ${subscriptionprice}</p>

              <Elements stripe={stripePromise}>
                <PackagesPayment subscription={subscription} subscriptionprice={subscriptionprice} />
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
