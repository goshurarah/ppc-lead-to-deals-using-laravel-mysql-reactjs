import React, { useEffect, useState } from "react";
import "./../Faq/FaqStyle.css";
import faq_large from "./../../../Assets/faq_large.png";
import faq_down from "./../../../Assets/faq_down.png";
import axios from "axios";
import SpinnerLoader from "../SpinnerLoader/SpinnerLoader";
import TicketandLiveChat from "../TicketAndLiveChat/TicketandLiveChat";

function Faq() {
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
  
  //get the token from local storage used to authorize the get api
  const token = localStorage.getItem("token");
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const [faqdata, setfaqdata] = useState("");

  //axios call to get the faq data
  useEffect(() => {
    fetchfaqdata();
  }, []);
  const fetchfaqdata = () => {
    axiosInstance.get(`/api/user/get-faqs`).then((res) => {
      setfaqdata(res?.data);
    });
  };

  return (
    <>
      <>
        <div className="container-fluid row main_div_faq_heading">
          <div className="col-lg-10  col-md-10 col-sm-10">
            <p className="frequently_asked_question">
              FREQUENTLY ASKED QUESTIONS
            </p>
          </div>

          <div className="col-lg-2   col-md-2 col-sm-2">
            <img className="faq_image" src={faq_large} />
          </div>
        </div>

        <>
          <div className="row ">
            <div className="accordion-container">
              {faqdata ? (
                faqdata?.data?.map((data, index) => (
                  <div key={index} className="mt-2">
                    <button
                      className={`support_faq_accordian ${
                        activeIndex === index ? "activefaq" : ""
                      }`}
                      onClick={() => togglePanel(index)}
                    >
                      <div className="row">
                        <div className="col-lg-11 col-md-10 col-9">
                          <p className="accordian_faq_first_heading_1">
                            {data?.question}
                          </p>
                        </div>

                        <div className="col-lg-1 col-md-2 col-3">
                          <img
                            src={activeIndex === index ? faq_down : faq_down}
                            alt="icon"
                            className="faq_down_pic"
                          />
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
                        <div className="col-lg-11 ">
                          <p className="inner_accordian_heading_faq">
                            {data?.answer}
                          </p>
                        </div>
                        {/* <div className="col-lg-6">
                        <p className="inner_accordian_heading_1">
                          Premium Details
                        </p>
                      </div> */}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <SpinnerLoader />
              )}
            </div>
          </div>
        </>
      </>
      <>  <TicketandLiveChat /></>
    </>
  );
}

export default Faq;
