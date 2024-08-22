import React, { useEffect, useState } from "react";
import "./../Blogs/BlogsStyle.css";
import Navbar_ppc from "../Navbar_PPC/Navbar_ppc";
import ppclogo from "./../../../Assets/ppclogogrey.PNG";
import { Link } from "react-router-dom";
import axios from "axios";
import RightReserved from "../AllRightReserved/RightReserved";
import SpinnerLoader from "../../Dashboard/SpinnerLoader/SpinnerLoader";
import Pagination from "react-js-pagination";
import AddEmail from "../AddEmail/AddEmail";

function Blogs() {
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

  const appUrl = process.env.REACT_APP_API_URL;
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsCountPerPages, setitemsCountPerPages] = useState(0);
  const [lastpage, setlastpage] = useState(0);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRelatedPostData, setFilteredRelatedPostData] = useState(null);

  const [blogsdata, setblogsdata] = useState("");
  useEffect(() => {
    getblogsdata();
  }, [currentPage]);

  const getblogsdata = () => {
    axios.get(`/api/posts?page=${currentPage}`).then((res) => {
      setblogsdata(res.data);
      setFilteredRelatedPostData(res.data.data);
      setTotalPages(res?.data?.total);
      setitemsCountPerPages(res?.data?.per_page);
      setlastpage(res?.data?.last_page);
    });
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filter related post data based on the search query
    const filteredData = blogsdata.data.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRelatedPostData(filteredData);
  };

  const extractDateFromUpdatedAt = (updated_at) => {
    if (updated_at) {
      const datePart = updated_at.split("T")[0];
      return datePart;
    }
    // Handle the case where updated_at is undefined or null
    return null; // or any other appropriate default value
  };

  const [tagsdata, settagsdata] = useState("");
  useEffect(() => {
    gettagsdata();
  }, []);

  const gettagsdata = () => {
    axios.get(`/api/tags`).then((res) => {
      settagsdata(res.data.tags);
    });
  };

  const [Categorydata, setCategorydata] = useState("");
  useEffect(() => {
    getCategorydata();
  }, []);

  const getCategorydata = () => {
    axios.get(`/api/categories`).then((res) => {
      setCategorydata(res.data.categories);
    });
  };

  return (
    <>
      <div
        className={`scroll-to-top ${isVisible ? "show" : ""}`}
        onClick={scrollToTop}
      >
        <span>&uarr;</span>
      </div>
      <>
        <Navbar_ppc />
      </>
      <div className="heading_div_blog ">
        <p className="blog_heading">Blogs</p>
      </div>
      <div className="container-fluid blogs_content_main_div">
        <div className="row">
          <div className="col-lg-1"></div>
          <div className="col-lg-3">
            <div className="blog_content_left_main_div">
              <p className="heading_blog_left">ROSALINA D. WILLAIM</p>
              <p className="below_heading_blog_left">Blogger/Photographer</p>
              <p className="below_below_heading_blog_left">
                he whimsically named Egg Canvas is the design director and
                photographer in New York. Why the nam
              </p>

              <div className="d-flex justify-content-center">
                <div className="main_div_icon_blog_left">
                  <i class="fa-brands fa-facebook-f"></i>
                </div>
                <div className="main_div_icon_blog_left">
                  <i class="fa-brands fa-twitter"></i>
                </div>
                <div className="main_div_icon_blog_left">
                  <i class="fa-brands fa-instagram"></i>
                </div>
                <div className="main_div_icon_blog_left">
                  <i class="fa-brands fa-youtube"></i>
                </div>
              </div>
              <div className="input_div_search_div">
                <input
                  className="input_style_serach"
                  placeholder="Type Keywords"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <i class="fa-solid fa-magnifying-glass"></i>
              </div>
              <p className="related_post_text">Related Posts</p>

              <hr className="hr_tag_blog" />

              <div className="related_post_main_div">
                {filteredRelatedPostData ? (
                  filteredRelatedPostData.map((data, index) => (
                    <div className="related_post_div" key={data.id}>
                      <Link to={`/blogs/${data.id}`}>
                        <div className="row">
                          <div className="col-lg-4 col-md-4 col-4">
                            <img
                              className="image_related_post"
                              src={data?.image_url}
                            />
                          </div>
                          <div className="col-lg-8 col-md-8 col-8">
                            <p className="desp_related_post">
                              {data?.created_at
                                ? extractDateFromUpdatedAt(data?.created_at)
                                : null}
                            </p>
                            <p className="heading_related_post">
                              {data?.title}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <SpinnerLoader />
                )}
              </div>

              <p className="related_post_text">Category</p>

              <hr className="hr_tag_blog" />

              <div className="category_div_below">
                <ul>
                  {Categorydata
                    ? Categorydata?.map((data, index) => (
                        <>
                          <Link to={`/category/${data.id}`}>
                            <li className="category_name">{data.name}</li>
                          </Link>
                        </>
                      ))
                    : null}
                </ul>
              </div>

              <p className="related_post_text">Tags</p>

              <hr className="hr_tag_blog" />

              <div className="main_div_tag">
                {tagsdata
                  ? tagsdata?.map((data, index) => (
                      <>
                        <Link to={`/tags/${data.id}`}>
                          <div className="button_tags">{data.name}</div>
                        </Link>
                      </>
                    ))
                  : null}
              </div>

              {/* <div className="main_div_tag">
                <div className="button_tags">Mobile</div>
                <div className="button_tags">Tech</div>
                <div className="button_tags">Web</div>
              </div> */}
            </div>
          </div>

          <div className="col-lg-7 ">
            {blogsdata ? (
              blogsdata?.data?.map((data, index) => (
                <div className="main_div_post_conatiner">
                  <div className="d-flex justify-content-start">
                    <i class="fa-solid fa-user icon_colour_style_content"></i>
                    <p className="content_text">{data?.user_name}</p>
                    <i class="fa-solid fa-calendar-days icon_colour_style_content"></i>
                    <p>
                      {data?.created_at
                        ? extractDateFromUpdatedAt(data?.created_at)
                        : null}
                    </p>
                  </div>

                  <p className="heading_content_right">{data?.title}</p>
                  <p className="para_centent_right">
                    {/* {data?.body
                      ? data?.body
                      : data?.body?.length > 10
                      ? data?.body?.slice(0, 10) + "..."
                      : data?.body}{" "} */}
                      <div dangerouslySetInnerHTML={{ __html:  (data?.body
                      ? data?.body
                      : data?.body?.length >= 10
                      ? data?.body?.slice(0, 10) + "..."
                      : data?.body)}} />
                  </p>

                  <div className="d-flex justify-content-start">
                    <Link to={`/blogs/${data.id}`}>
                      <p className="continue_reading_text">CONTINUE READING</p>
                    </Link>
                    <i class="fa-solid fa-arrow-right icon_colour_style_content"></i>
                  </div>

                  <img src={data?.image_url} className="blog_image_style" />
                </div>
              ))
            ) : (
              <SpinnerLoader />
            )}
          </div>
          <div className="col-lg-1"></div>
        </div>
      </div>
      <>
        {" "}
        {totalPages > 0 && (
          <div className="pagination_blogs">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={itemsCountPerPages} // Number of items per page
              totalItemsCount={totalPages} // Total number of items
              pageRangeDisplayed={lastpage} // Number of page links to display
              onChange={handlePageChange} // Callback function for page change event
              itemClass="page-item"
              linkClass="page-link"
            />
          </div>
        )}
      </>
      <>
        <AddEmail />
      </>
      <>
        <div className="main_div_footer">
          <Link to="/">
            <img src={ppclogo} className="ppc_logo_style" />
          </Link>
          <div className="main_div_footer_contents mt-4">
            <a href={`${appUrl}#reimarket`}>
              <p className="footer_a_tag mx-3">Leads marketplace</p>
            </a>

            <a href={`${appUrl}#whyus`}>
              <p className="footer_a_tag mx-3">Why us?</p>
            </a>

            <a href={`${appUrl}#fixedprice`}>
              <p className="footer_a_tag mx-3">Fixed Price Mode</p>
            </a>

            <a href={`${appUrl}#aboutus`}>
              <p className="footer_a_tag mx-3">About Us</p>
            </a>

            <Link to="/blogs">
              {/* <a href="#blogs"> */}
              <p className="footer_a_tag mx-3">Blogs</p>
              {/* </a> */}
            </Link>

            <Link to="/privacypolicy">
              <p className="footer_a_tag mx-3">Privacy Policy</p>
            </Link>

            <a href={`${appUrl}#review`}>
              <p className="footer_a_tag mx-3">Reviews</p>
            </a>
            <Link to="/contact_us">
              <a>
                <p className="footer_a_tag mx-3">Contact Us</p>
              </a>
            </Link>
          </div>
        </div>
      </>
      <RightReserved />
    </>
  );
}

export default Blogs;
