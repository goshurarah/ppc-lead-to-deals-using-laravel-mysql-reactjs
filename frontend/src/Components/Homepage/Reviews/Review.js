import React, { useEffect, useState } from "react";
import "./../Reviews/ReviewStyle.css";
import Slider from "react-slick";
import rightarrow from "./../../../Assets/RightArrow.png";
import leftarrow from "./../../../Assets/LeftArrow.png";
import profileImage from "./../../../Assets/profile_image.png";
import axios from "axios";
import SpinnerLoader from "../../Dashboard/SpinnerLoader/SpinnerLoader";

function Review() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <img className="brands_arrow" src={rightarrow} />,
    prevArrow: <img className="brands_arrow" src={leftarrow} />,
  };

  const [statedata, setStateData] = useState("");
  useEffect(() => {
    getStatedata();
  }, []);

  const getStatedata = () => {
    axios.get(`/api/user/get-reviews`).then((res) => {
      setStateData(res.data);
    });
  };

  return (
    <div className="review_main_div">
      <div className="div_slick">
        <p className="heading_review pt-5 pb-2"> Reviews</p>

        <Slider {...settings}>
          {statedata ? (
            statedata?.data?.map((reviewdata, index) => {
              return (
                <>
                  <div>
                    <div className="card_main_div">
                      <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-12">
                          <img
                            className="card_profile_img"
                            src={profileImage}
                          />
                          <p className="para_profile_card mt-2">
                            {reviewdata.name}
                          </p>
                        </div>
                        <div className="col-lg-8 col-md-8 col-sm-12">
                          <p className="para_second_card_div">
                            {reviewdata?.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <SpinnerLoader />
          )}
        </Slider>
      </div>
    </div>
  );
}

export default Review;
