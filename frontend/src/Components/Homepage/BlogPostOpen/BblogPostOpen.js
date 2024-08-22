import React, { useEffect, useState } from "react";
import "./../BlogPostOpen/BlogPostOpenStyle.css";
import axios from "axios";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import RightReserved from "../AllRightReserved/RightReserved";
import Navbar_ppc from "../Navbar_PPC/Navbar_ppc";
import ppclogo from "./../../../Assets/ppclogogrey.PNG";
import SpinnerLoader from "../../Dashboard/SpinnerLoader/SpinnerLoader";
import CustomNotification from "../../Dashboard/CustomNotification/CustomNotification";
import RedNotification from "../../Dashboard/CustomNotification/RedNotification";
import dummypic from "./../../../Assets/greyellipse.png";
import AddEmail from "../AddEmail/AddEmail";
function BblogPostOpen() {
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
  // Get the 'id' parameter from the route
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // Initialize the state to store the blog post data
  const [blogsdata, setblogsdata] = useState(null);

  // Fetch the blog post data when the component mounts
  useEffect(() => {
    getblogsdata();
  }, []);

  // Fetch blog post data from the API
  const getblogsdata = () => {
    axios.get(`/api/get-posts`).then((res) => {
      setblogsdata(res.data);
    });
  };

  const [relatedpostdata, setrelatedpostdata] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRelatedPostData, setFilteredRelatedPostData] = useState(null);

  // Fetch the blog post data when the component mounts
  useEffect(() => {
    getrelatedpostdata();
  }, []);

  // Fetch blog post data from the API
  const getrelatedpostdata = () => {
    axios.get(`/api/posts/${id}/related-posts`).then((res) => {
      setrelatedpostdata(res.data);
      setFilteredRelatedPostData(res.data.data);
    });
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filter related post data based on the search query
    const filteredData = relatedpostdata.data.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRelatedPostData(filteredData);
  };
  // Find the selected blog post based on the id parameter
  const selectedPost = blogsdata?.posts?.find((post) => post.id === Number(id));

  const extractDateFromUpdatedAt = (updated_at) => {
    if (updated_at) {
      const datePart = updated_at.split("T")[0];
      return datePart;
    } else {
      // Handle the case when updated_at is undefined
      return "N/A"; // or any other appropriate value or behavior
    }
  };

  const appUrl = process.env.REACT_APP_API_URL;

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

  const [relatedcategory, setrelatedcategorydata] = useState(null);

  // Fetch the blog post data when the component mounts
  useEffect(() => {
    getrelatedcategorydata();
  }, []);

  // Fetch blog post data from the API
  const getrelatedcategorydata = () => {
    axios.get(`/api/categories/${id}/posts`).then((res) => {
      setrelatedcategorydata(res.data);
    });
  };

  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showcommentForm, setshowcommentForm] = useState(true);

  const [commnetidforblog, setcommnetidforblog] = useState("");

  const [commentshow, setcommentshow] = useState(null);

  // Fetch the blog post data when the component mounts
  useEffect(() => {
    getsetcommentshow();
  }, []);

  // Fetch blog post data from the API
  const getsetcommentshow = () => {
    axios.get(`/api/posts/${id}/comments`).then((res) => {
      setcommentshow(res.data);
    });
  };
  console.log(commentshow, "commentshow");

  const handleReplyClick = (commnetid) => {
    localStorage.setItem("commnetid", commnetid);
    setcommnetidforblog(commnetid);
    setShowReplyForm(true);
    setshowcommentForm(false);
  };

  useEffect(() => {
    setcommnetidforblog(localStorage.getItem("commnetid"));
  }, []);
  const handleDateFormat = (date) => {
    const dateObject = new Date(date);
    const formattedDate = dateObject.toISOString().split("T")[0];
    return formattedDate;
  };

  const handleCancelClick = () => {
    setShowReplyForm(false);
    setshowcommentForm(true);
  };

  const handlePostComment = () => {
    // Implement your logic to handle posting the comment
    // You can access the comment, email, and password from the state
    // For example: const comment = commentState;
  };

  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationMessageRed, setnotificationMessageRed] = useState(null);

  const [writecomment, setwritecomment] = useState("");
  const [writereply, setwritereply] = useState("");
  // localStorage.getItem("comment");

  useEffect(() => {
    setwritecomment(localStorage.getItem("comment"));
    setwritereply(localStorage.getItem("reply"));
  }, []);

  localStorage.setItem("comment", writecomment);
  localStorage.setItem("reply", writereply);

  const createcommentonblog = (e) => {
    e.preventDefault();
    let payload = {
      body: writecomment,
    };
    axiosInstance
      .post(`/api/posts/${id}/comments`, payload)
      .then((r) => {
        setwritecomment("");
        // Remove the item from localStorage
        setNotificationMessage(r?.data?.message);
        localStorage.removeItem("blogid");
        localStorage.removeItem("comment");
        localStorage.removeItem("reply");
        console.log(r?.data?.comment?.message);
        getsetcommentshow();
        setTimeout(() => {
          setNotificationMessage("");
        }, 4000);
      })
      .catch((e) => {
        console.log(e.response.data.message);
        localStorage.setItem("blogid", id);
        if (e.response.data.message === "Unauthenticated.") {
          setnotificationMessageRed("SignIn for comment");
          setTimeout(() => {
            navigate("/signin");
            setnotificationMessageRed("");
          }, 4000);
        }

        if (e.response.data.errors != undefined) {
          alert(e.response.data.message);
        }
      });
  };

  const createreplyonblog = (e) => {
    e.preventDefault();
    let payload = {
      body: writereply,
    };
    axiosInstance
      .post(`/api/posts/${id}/comments/${commnetidforblog}/reply`, payload)
      .then((r) => {
        setwritereply("");
        // Remove the item from localStorage
        setNotificationMessage(r?.data?.message);
        getsetcommentshow();
        localStorage.removeItem("blogid");
        localStorage.removeItem("comment");
        localStorage.removeItem("reply");
        setTimeout(() => {
          setNotificationMessage("");
        }, 4000);

        // console.log(r?.data?.comment?.message);
      })
      .catch((e) => {
        console.log(e.response.data.message);
        localStorage.setItem("blogid", id);
        if (e.response.data.message === "Unauthenticated.") {
          setnotificationMessageRed("SignIn for reply");
          setTimeout(() => {
            navigate("/signin");
            setnotificationMessageRed("");
          }, 4000);
        }

        if (e.response.data.errors != undefined) {
          alert(e.response.data.message);
        }
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
        {notificationMessage && (
          <CustomNotification message={notificationMessage} />
        )}
      </>
      <>
        {notificationMessageRed && (
          <RedNotification message={notificationMessageRed} />
        )}
      </>
      <>
        <Navbar_ppc />
      </>
      <div className="heading_div_blog ">
        <p className="blog_heading">
          {selectedPost ? selectedPost?.title : null}
        </p>
      </div>
      <div className="container-fluid blogs_content_main_div">
        <div className="row">
          <div className="col-lg-1"></div>
          <div className=" col-lg-7  ">
            <div className="main_div_blogopen_conatainer">
              <div className="d-flex justify-content-start">
                <i class="fa-solid fa-user icon_colour_style_content"></i>
                <p className="content_text">
                  {" "}
                  {selectedPost ? selectedPost?.user?.first_name : null}
                </p>
                <i class="fa-solid fa-calendar-days icon_colour_style_content"></i>
                <p>
                  {selectedPost?.created_at
                    ? extractDateFromUpdatedAt(selectedPost?.created_at)
                    : null}
                </p>
              </div>

              <p className="heading_content_right">
                {selectedPost ? selectedPost?.title : null}
              </p>
            

              {/* <div className="d-flex justify-content-start">
                <Link to={`/blogs/${selectedPost.id}`}>
                <p className="continue_reading_text">CONTINUE READING</p>
                </Link>
                <i class="fa-solid fa-arrow-right icon_colour_style_content"></i>
              </div> */}

              <img
                src={selectedPost ? selectedPost?.image_url : <SpinnerLoader />}
                className="blog_image_style"
              />

  <p className="para_centent_right">
                <div
                  dangerouslySetInnerHTML={{
                    __html: selectedPost
                      ? selectedPost?.body
                      : selectedPost?.body?.length > 3
                      ? selectedPost?.body?.slice(0, 3) + "..."
                      : selectedPost?.body,
                  }}
                />
              </p>
              <div className="quote_main_div">
                <p className="para_quote">
                  <div
                    dangerouslySetInnerHTML={{ __html: selectedPost?.quote }}
                  />
                </p>
              </div>

              <div className="main_div_tags_social_media">
                <div className="col-lg-12 col-md-12 col-12">
                  <p className="Tag_heading_blog">Tags: </p>
                  <div className="main_div_tag">
                    {tagsdata
                      ? tagsdata?.map((data, index) => (
                          <>
                            <div className="button_tags">{data.name}</div>
                          </>
                        ))
                      : null}
                  </div>
                </div>
                {/* <>
                  <div className="d-flex justify-content-start">
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
                </> */}
              </div>

              <p className="comment_para_blog">Comments</p>

              <div className="row mb-5">
                {commentshow
                  ? commentshow?.comments?.map((data, index) => (
                      <>
                        {data?.is_approved == "1" ? (
                          <>
                            <div className="col-lg-2 col-md-3 col-12">
                              <img
                                src={
                                  data?.user?.profile_pic
                                    ? `${process.env.REACT_APP_BASE_URL}/uploads/${data?.user?.profile_pic}`
                                    : dummypic
                                }
                                className="comment_picture_style"
                              />
                            </div>
                            <div className="col-lg-10 col-md-7 col-12">
                              <p className="comment_person_name">
                                {data.user.first_name}
                              </p>
                              <p className="comment_date">
                                {data?.created_at
                                  ? handleDateFormat(data?.created_at)
                                  : null}
                              </p>
                              <p className="comment_para">{data.body}</p>
                              <p
                                className="reply_heading"
                                onClick={() => handleReplyClick(data?.id)}
                              >
                                REPLY
                              </p>

                              {data?.replies?.map((data, index) => (
                                <>
                                  {data?.is_approved == "1" ? (
                                    <>
                                      <div className="row">
                                        <div className="col-lg-2 col-md-3 col-12">
                                          <img
                                            src={
                                              data?.user?.profile_pic
                                                ? `${process.env.REACT_APP_BASE_URL}/uploads/${data?.user?.profile_pic}`
                                                : dummypic
                                            }
                                            className="comment_picture_style"
                                          />
                                        </div>
                                        <div className="col-lg-10 col-md-7 col-12">
                                          <p className="comment_person_name">
                                            {data.user.first_name}
                                          </p>
                                          <p className="comment_date">
                                            {data?.created_at
                                              ? handleDateFormat(
                                                  data?.created_at
                                                )
                                              : null}
                                          </p>
                                          <p className="comment_para">
                                            {data.body}
                                          </p>
                                        </div>
                                      </div>
                                    </>
                                  ) : null}
                                </>
                              ))}

                              {/* write reply code here  */}
                            </div>
                          </>
                        ) : null}
                      </>
                    ))
                  : null}

                {showReplyForm && (
                  <div>
                    <form onSubmit={createreplyonblog}>
                      <button
                        className="cancel_button_reply"
                        onClick={handleCancelClick}
                      >
                        Cancel Reply
                      </button>
                      <p className="comment_para_blog">Write your reply</p>
                      <textarea
                        className="enter_comment_here_input"
                        placeholder="Enter Reply Here.."
                        required
                        onChange={(e) => {
                          setwritereply(e.target.value);
                        }}
                        value={writereply}
                      />
                      {/* <textarea
                      className="enter_email_here_input"
                      placeholder="Enter Email Here.."
                    />
                    <textarea
                      className="enter_email_here_input"
                      placeholder="Enter Password Here.."
                    /> */}
                      <button
                        type="submit"
                        className="post_comment_button"
                        onClick={handlePostComment}
                      >
                        Post Reply
                      </button>
                    </form>
                  </div>
                )}

                {showcommentForm && (
                  <div>
                    {selectedPost?.is_commentable === 1 ? (
                      <form onSubmit={createcommentonblog}>
                        <p className="comment_para_blog">Write your comment</p>
                        <textarea
                          className="enter_comment_here_input"
                          placeholder="Enter Comment Here.."
                          onChange={(e) => {
                            setwritecomment(e.target.value);
                          }}
                          value={writecomment}
                          required
                        />
                        {/* <textarea
                      className="enter_email_here_input"
                      placeholder="Enter Email Here.."
                    />
                    <textarea
                      className="enter_email_here_input"
                      placeholder="Enter Password Here.."
                    /> */}
                        <button
                          className="post_comment_button"
                          onClick={handlePostComment}
                          type="submit"
                        >
                          Post Comment
                        </button>
                      </form>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          </div>

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
          <div className="col-lg-1"></div>
        </div>
      </div>
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

export default BblogPostOpen;
