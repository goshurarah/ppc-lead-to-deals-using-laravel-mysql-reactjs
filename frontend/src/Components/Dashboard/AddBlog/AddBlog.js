import React, { useEffect, useRef, useState } from "react";
import "./../AddBlog/AddblogStyle.css";
import axios from "axios";
import SpinnerLoader from "../SpinnerLoader/SpinnerLoader";
import arrowdown from "./../../../Assets/downarrowforsearch.png";
import CustomNotification from "../CustomNotification/CustomNotification";
import RedNotification from "../CustomNotification/RedNotification";
import serachsms from "./../../../Assets/serach_sms.png";
import greencommnet from "./../../../Assets/green_comment.png";
import icon_arrow from "./../../../Assets/arrow_icon_reply.png";
import iconsendsms from "./../../../Assets/smssend_btn_icon.png";
import hljs from "highlight.js";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "quill/dist/quill.snow.css";
import "highlight.js/styles/monokai-sublime.css";

function AddBlog() {
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

  // GET tags NAME
  const [tagsname, settagsname] = useState([]);
  const [storetags, setstoretags] = useState([]);

  console.log(storetags, "storetags");
  useEffect(() => {
    gettagsdata();
  }, []);

  const gettagsdata = () => {
    axios.get(`/api/tags`).then((res) => {
      settagsname(res.data.tags);
    });
  };

  const [dropdownOpentags, setDropdownOpentags] = useState(false);
  const [filtertags, setFiltertags] = useState("");
  const [selectedOptiontags, setSelectedOptiontags] = useState("");
  const dropdownReftags = useRef(null);

  useEffect(() => {
    // Add event listeners when the component mounts
    document.addEventListener("click", handleOutsideClicktags);
    window.addEventListener("scroll", handleScrolltags);

    // Remove event listeners when the component unmounts
    return () => {
      document.removeEventListener("click", handleOutsideClicktags);
      window.removeEventListener("scroll", handleScrolltags);
    };
  }, []);

  const toggleDropdowntags = () => {
    setDropdownOpentags(!dropdownOpentags);
  };

  const handleFilterChangetags = (event) => {
    const filterText = event.target.value.toLowerCase(); // Convert filter text to lowercase
    setFiltertags(filterText);
    // Keep the dropdown open when typing
    // setDropdownOpentags(true); // You can remove this line
  };

  const [selectedtags, setSelectedtags] = useState([]);

  const handleOptionChangetags = (option) => {
    const selectedtag = tagsname.find((item) => item.name === option);

    if (selectedtag) {
      setSelectedOptiontags(option);

      // Use spread operator to create a new array with the selected ID
      // and all previously selected IDs
      setSelectedtags((prevSelectedtags) => [
        ...prevSelectedtags,
        selectedtag.id,
      ]);

      setDropdownOpentags(false);
    }
  };
  const handleOutsideClicktags = (event) => {
    if (
      dropdownReftags.current &&
      !dropdownReftags.current.contains(event.target)
    ) {
      // Clicked outside the dropdown or input field, close it
      setDropdownOpentags(false);
    }
  };

  const handleScrolltags = () => {
    // Scrolling detected, close the dropdown
    setDropdownOpentags(false);
  };

  // GET category NAME
  const [categoryname, setcategoryname] = useState([]);
  const [storecategory, setstorecategory] = useState([]);

  console.log(storecategory, "storecategory");

  useEffect(() => {
    getCategorydata();
  }, []);

  const getCategorydata = () => {
    axios.get(`/api/categories`).then((res) => {
      setcategoryname(res.data.categories);
    });
  };

  const [dropdownOpencategory, setDropdownOpencategory] = useState(false);
  const [filtercategory, setFiltercategory] = useState("");
  const [selectedOptioncategory, setSelectedOptioncategory] = useState("");
  const dropdownRefcategory = useRef(null);

  useEffect(() => {
    // Add event listeners when the component mounts
    document.addEventListener("click", handleOutsideClickcategory);
    window.addEventListener("scroll", handleScrollcategory);

    // Remove event listeners when the component unmounts
    return () => {
      document.removeEventListener("click", handleOutsideClickcategory);
      window.removeEventListener("scroll", handleScrollcategory);
    };
  }, []);

  const toggleDropdowncategory = () => {
    setDropdownOpencategory(!dropdownOpencategory);
  };

  const handleFilterChangecategory = (event) => {
    const filterText = event.target.value.toLowerCase(); // Convert filter text to lowercase
    setFiltercategory(filterText);
    // Keep the dropdown open when typing
    // setDropdownOpencategory(true); // You can remove this line
  };

  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleOptionChangecategory = (option) => {
    const selectedCategory = categoryname.find((item) => item.name === option);

    if (selectedCategory) {
      setSelectedOptioncategory(option);

      // Use spread operator to create a new array with the selected ID
      // and all previously selected IDs
      setSelectedCategories((prevSelectedCategories) => [
        ...prevSelectedCategories,
        selectedCategory.id,
      ]);

      setDropdownOpencategory(false);
    }
  };

  const handleOutsideClickcategory = (event) => {
    if (
      dropdownRefcategory.current &&
      !dropdownRefcategory.current.contains(event.target)
    ) {
      // Clicked outside the dropdown or input field, close it
      setDropdownOpencategory(false);
    }
  };

  const handleScrollcategory = () => {
    // Scrolling detected, close the dropdown
    setDropdownOpencategory(false);
  };

  const [blogtitle, setblogtitle] = useState("");

  const handleblogtitleChange = (event) => {
    setblogtitle(event.target.value);
  };

  const [blogImage, setBlogImage] = useState(null);

  const handleBlogImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setBlogImage(file);
    }
  };

  const [blogdescription, setBlogDescription] = useState(""); // Corrected function name

  const handletagideChange = (event) => {
    setBlogDescription(event.target.value);
  };
  const handleQuillChange = (content, delta, source, editor) => {
    setBlogDescription(content);
  };
  console.log(blogdescription, "blogdescription");
  // const [blogdescription, setblogdescription] = useState("");

  // const handleblogdescriptionChange = (event) => {
  //   setblogdescription(event.target.value);
  // };

  const [blogquote, setblogquote] = useState("");
  const handleblogquoteChange = (value) => {
    setblogquote(value);
  };
  console.log(selectedCategories, "selectedCategories");
  const CreateBlog = (e) => {
    e.preventDefault();
    // let payload = {
    //   title: blogtitle,
    //   body: blogdescription,
    //   quote: blogquote,
    //   category_ids: selectedCategories,
    //   tag_ids: selectedtags,
    //   image: blogImage,
    // };

    const formData = new FormData();
    if (blogImage) {
      formData.append("image", blogImage);
    }
    formData.append("title", blogtitle);
    formData.append("body", blogdescription);
    formData.append("quote", blogquote);
    formData.append("category_id", selectedCategories);
    formData.append("tag_id", selectedtags);

    axiosInstance
      .post("/api/dashboard/posts", formData)
      .then((r) => {
        console.log(r);
        setblogquote("");
        setBlogDescription("");
        setBlogImage(null);
        setblogtitle("");
        setSelectedtags([]);
        setSelectedOptiontags("");
        setSelectedOptioncategory("");
        setSelectedCategories([]);
        setnotificationMessage(r.data.message);
        getblogsdetail();
        // clearvaluesincreatelead();

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

  const [addcategoryname, setaddcategoryname] = useState("");
  const handleaddcategorynameChange = (event) => {
    setaddcategoryname(event.target.value);
  };
  const CreateCategory = (e) => {
    e.preventDefault();
    let payload = {
      name: addcategoryname,
    };
    axiosInstance
      .post("/api/categories", payload)
      .then((r) => {
        console.log(r);
        setaddcategoryname("");
        getCategorydata();
        setnotificationMessage(r.data.message);

        // clearvaluesincreatelead();

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

  const [addtagname, setaddtagname] = useState("");
  const handleaddtagnameChange = (event) => {
    setaddtagname(event.target.value);
  };
  const Createtag = (e) => {
    e.preventDefault();
    let payload = {
      name: addtagname,
    };
    axiosInstance
      .post("/api/tags", payload)
      .then((r) => {
        console.log(r);
        setaddtagname("");
        gettagsdata();
        setnotificationMessage(r.data.message);

        // clearvaluesincreatelead();

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




 

  useEffect(() => {
    getblogsdetail();
  }, []);

  const [blogsdetail, setblogsdetail] = useState("");

  const getblogsdetail = async () => {
    axiosInstance
      .get("/api/dashboard/blog-admin/posts")
      .then((res) => {
        setblogsdetail(res);
      })
      .catch((e) => {
        if (e.response.status == 404) {
        } else {
        }
      });
  };



  const [activeMenuItem, setActiveMenuItem] = useState("");
  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };
  const [posttitle, setposttitle] = useState("");
  const handlesetposttitle = (title) => {
    setposttitle(title);
  };

  useEffect(() => {
    handleMenuItemClick();
    handlesetposttitle();
    handlesetsestatustposttoggle();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredModules = blogsdetail.data?.filter((sidebarMenu) => {
    // Check if sidebarMenu.title is defined before applying the filtering logic
    const menuData = sidebarMenu?.title?.toLowerCase();
    return menuData && menuData.includes(searchQuery.toLowerCase());
  });

  console.log(filteredModules, "filteredModules");

  const getInitials = (name) => {
    return name.charAt(0);
  };

  useEffect(() => {
    getcommentsdetail();
  }, [activeMenuItem]);

  const [commentsdetail, setcommentsdetail] = useState("");

  const getcommentsdetail = async () => {
    axiosInstance
      .get(`/api/dashboard/blog/posts/${activeMenuItem}/comments`)
      .then((res) => {
        setcommentsdetail(res?.data);
      })
      .catch((e) => {
        if (e.response.status == 404) {
        } else {
        }
      });
  };

  console.log(commentsdetail, "commentsdetail");

  useEffect(() => {
    getreplysdetail();
  }, [activeMenuItem]);

  const [replysdetail, setreplysdetail] = useState("");

  const getreplysdetail = async () => {
    axiosInstance
      .get(`/api/posts/${activeMenuItem}/comments`)
      .then((res) => {
        setreplysdetail(res?.data);
      })
      .catch((e) => {
        if (e.response.status == 404) {
        } else {
        }
      });
  };

  console.log(replysdetail, "replysdetail");

  const handleApproveComment = (id) => {
    axiosInstance
      .put(`/api/dashboard/blog/comments/${id}/update-approval-status`, {
        is_approved: "1",
      })
      .then((response) => {
        getcommentsdetail();
        console.log(
          "Permission status updated successfully:",
          response?.data?.message
        );
        setnotificationMessage(response?.data?.message);
        setTimeout(() => {
          setnotificationMessage("");
        }, 4000);
      })
      .catch((error) => {
        console.error("Error updating permission status:", error);
      });
  };

  const handleHideComment = (id) => {
    axiosInstance
      .put(`/api/dashboard/blog/comments/${id}/update-approval-status`, {
        is_approved: "0",
      })
      .then((response) => {
        getcommentsdetail();
        console.log(
          "Permission status updated successfully:",
          response?.data?.message
        );
        setnotificationMessage(response?.data?.message);
        setTimeout(() => {
          setnotificationMessage("");
        }, 4000);
      })
      .catch((error) => {
        console.error("Error updating permission status:", error);
      });
  };

  const handleApproveReply = (id) => {
    axiosInstance
      .put(`/api/dashboard/blog/comments/replies/${id}`, {
        is_approved: "1",
      })
      .then((response) => {
        getcommentsdetail();
        getreplysdetail();
        console.log(
          "Permission status updated successfully:",
          response?.data?.message
        );
        setnotificationMessage(response?.data?.message);
        setTimeout(() => {
          setnotificationMessage("");
        }, 4000);
      })
      .catch((error) => {
        console.error("Error updating permission status:", error);
      });
  };

  const handleHideReply = (id) => {
    axiosInstance
      .put(`/api/dashboard/blog/comments/replies/${id}`, {
        is_approved: "0",
      })
      .then((response) => {
        getcommentsdetail();
        getreplysdetail();
        console.log(
          "Permission status updated successfully:",
          response?.data?.message
        );
        setnotificationMessage(response?.data?.message);
        setTimeout(() => {
          setnotificationMessage("");
        }, 4000);
      })
      .catch((error) => {
        console.error("Error updating permission status:", error);
      });
  };

  const handleDeleteComment = async (id) => {
    try {
      const response = await axiosInstance.delete(
        `/api/dashboard/blog/posts/comments/${id}`
      );
      getcommentsdetail();
      console.log(response, "delete response");
      setnotificationMessage(response.data.message);
      setTimeout(() => {
        setnotificationMessage("");
      }, 4000);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const [posttoggle, setposttoggle] = useState(0);

  const handlesetsestatustposttoggle = (status) => {
    setposttoggle(status);
  };
  console.log(posttoggle, "after selecting sidebar posts");

  const handleToggle = async () => {
    console.log("Before toggle:", posttoggle);
    const newStatus = posttoggle === 0 ? 1 : 0;
    console.log("After toggle:", newStatus);
    setposttoggle(newStatus);

    const apiUrl = `api/dashboard/blog/posts/${activeMenuItem}/update-comments-status`;
    const payload = {
      is_commentable: newStatus,
    };

    try {
      const response = await axiosInstance.put(apiUrl, payload);
      // Handle response if needed
      getblogsdetail();
      setnotificationMessage(response?.data?.message);
      setTimeout(() => {
        setnotificationMessage("");
      }, 4000);
      console.log(response?.data?.message, "succeffully change");
    } catch (error) {
      // Handle error
      console.error("Error:", error);
    }
  };

  const quillModules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ["clean"], // remove formatting button
    ],
  };

  const quillFormats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "script",
    "indent",
    "direction",
    "color",
    "background",
    "align",
  ];

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
      <p className="main_heading_blog">Fill the Form to Add New Blog</p>

      <div className="main_div_blog_form">
        <form onSubmit={CreateBlog}>
          <div className="row">
            <div className="col-lg-6 col-md-12 col-12 pt-5">
              <input
                className="input__blog_title"
                placeholder="Title"
                value={blogtitle}
                onChange={handleblogtitleChange}
                required
              />

              <div
                className="input__blog_title row"
                onClick={toggleDropdowntags}
              >
                <div
                  className="dropdowni col-lg-10 col-md-10 col-10 m-0 p-0"
                  ref={dropdownReftags}
                >
                  <button className="dropbtni">
                    {selectedOptiontags ? (
                      selectedOptiontags
                    ) : (
                      <span>
                        Tags <font color="red">*</font>
                      </span>
                    )}
                  </button>
                  <div
                    id="myDropdowni"
                    className={`dropdown-contenti ${
                      dropdownOpentags ? "showi" : ""
                    }`}
                  >
                    <input
                      type="text"
                      placeholder="Search.."
                      id="myInputi"
                      onClick={(e) => e.stopPropagation()} // Prevent the click event from bubbling to the parent div
                      onChange={handleFilterChangetags}
                      value={filtertags}
                    />
                    {tagsname ? (
                      tagsname
                        .filter((item) =>
                          item.name.toLowerCase().includes(filtertags)
                        )
                        .map((item) => (
                          <a
                            key={item.id}
                            onClick={() => {
                              handleOptionChangetags(item.name);
                              setstoretags(item.id);
                            }}
                          >
                            {item.name}
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
                    className="arrow_down_blog"
                    alt="Arrow Down"
                  />
                </div>
              </div>

              {/* <textarea
                className="input_blog_body"
                placeholder="Description"
                value={blogdescription}
                onChange={handletagideChange}
                required
              /> */}

              <div className="editor-container">
                <ReactQuill
                  className=""
                  placeholder="Description"
                  value={blogdescription}
                  onChange={handleQuillChange}
                  modules={quillModules}
                  formats={quillFormats}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-12 pt-5">
              <label className="input__blog_title">
                <input
                  type="file"
                  accept="image/*"
                  className="upload_photo"
                  onChange={handleBlogImageChange}
                  required
                />
              </label>

              <div
                className="input__blog_title row"
                onClick={toggleDropdowncategory}
              >
                <div
                  className="dropdowni col-lg-10 col-md-10 col-10 m-0 p-0"
                  ref={dropdownRefcategory}
                >
                  <button className="dropbtni">
                    {selectedOptioncategory ? (
                      selectedOptioncategory
                    ) : (
                      <span>
                        category <font color="red">*</font>
                      </span>
                    )}
                  </button>
                  <div
                    id="myDropdowni"
                    className={`dropdown-contenti ${
                      dropdownOpencategory ? "showi" : ""
                    }`}
                  >
                    <input
                      type="text"
                      placeholder="Search.."
                      id="myInputi"
                      onClick={(e) => e.stopPropagation()} // Prevent the click event from bubbling to the parent div
                      onChange={handleFilterChangecategory}
                      value={filtercategory}
                    />
                    {categoryname ? (
                      categoryname
                        .filter((item) =>
                          item.name.toLowerCase().includes(filtercategory)
                        )
                        .map((item) => (
                          <a
                            key={item.id}
                            onClick={() => {
                              handleOptionChangecategory(item.name);
                              setstorecategory(item.id);
                            }}
                          >
                            {item.name}
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
                    className="arrow_down_blog"
                    alt="Arrow Down"
                  />
                </div>
              </div>

              {/* <textarea
                className="input_blog_body"
                placeholder="Quote"
                value={blogquote}
                onChange={handleblogquoteChange}
                required
              /> */}

              <div className="editor-container">
                <ReactQuill
                  className=""
                  placeholder="Quote"
                  value={blogquote}
                  onChange={handleblogquoteChange}
                  modules={quillModules}
                  formats={quillFormats}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6 col-md-12 col-12">
              <button className="create_blog_button" type="submit">
                Create Blog
              </button>
            </div>
            <div className="col-lg-6 col-md-12 col-12"></div>
          </div>
        </form>
      </div>

      <p className="main_heading_blog">Add New Category and Tag</p>

      <div className="row">
        <div className="col-lg-6 col-md-12 col-12">
          <div className="main_div_add_category">
            <form onSubmit={CreateCategory}>
              <input
                placeholder="Add Category"
                className="input_add_category"
                required
                value={addcategoryname}
                onChange={handleaddcategorynameChange}
              />
              <button className="Add_Category_button" type="submit">
                Add Category
              </button>
            </form>
          </div>
        </div>
        <div className="col-lg-6 col-md-12 col-12">
          <div className="main_div_add_tags">
            <form onSubmit={Createtag}>
              <input
                placeholder="Add Tag"
                className="input_add_category"
                required
                value={addtagname}
                onChange={handleaddtagnameChange}
              />
              <button className="Add_Category_button" type="submit">
                Add Tag
              </button>
            </form>
          </div>
        </div>
      </div>

      <>
        <p className="main_heading_blog">
          Approve/Hide Comments/Reply on the Blog
        </p>
        <div>
          {/* <!-- Page Wrapper --> */}
          <div id="wrapper">
            {/* <!-- Sidebar --> */}

            <ul
              className="navbar-nav sidebar_comment_main_div accordion"
              id="accordionSidebar"
            >
              {/* <!-- Sidebar - Brand --> */}

              {/* <!-- Nav Item - Dashboard --> */}
              <div className="search_div_sms d-flex flex-row">
                <img src={serachsms} className="sms_icon_search" />
                <input
                  className="input_serach_sms"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>

              <div className="main_div_sidebar_comment">
                {filteredModules ? (
                  filteredModules?.map((sidebarMenu, index) => (
                    <li
                      className={`blog_sidebar_div ${
                        sidebarMenu.id === activeMenuItem
                          ? "blog_sidebar_div_active"
                          : ""
                      }`}
                      key={index}
                      onClick={() => {
                        handlesetsestatustposttoggle(
                          sidebarMenu?.is_commentable
                        );
                        handleMenuItemClick(sidebarMenu?.id);
                        handlesetposttitle(sidebarMenu?.title);
                      }}
                    >
                      <div
                        className="row main_div_sideblogs_display"
                        style={{
                          backgroundImage: `url(${sidebarMenu?.image_url})`,
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                        }}
                      >
                        <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                          <button
                            className={`round_div_blog_person_image ${
                              sidebarMenu.id === activeMenuItem
                                ? "active_round_button"
                                : ""
                            }`}
                          >
                            {getInitials(sidebarMenu?.user_name)}
                          </button>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-9 col-12">
                          <p
                            className={`blog_person_name ${
                              sidebarMenu?.id === activeMenuItem
                                ? "messenger_person_name_active"
                                : ""
                            }`}
                          >
                            {sidebarMenu?.title &&
                            sidebarMenu?.title.length > 30
                              ? `${sidebarMenu?.title.slice(0, 20)}...`
                              : sidebarMenu?.title}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <SpinnerLoader />
                )}
              </div>

              {/* <!-- Sidebar Message --> */}
            </ul>
            {/* <!-- End of Sidebar --> */}

            {/* <!-- Content Wrapper --> */}
            <div id="content-wrapper" className="d-flex flex-column">
              {/* <!-- Main Content --> */}
              <div id="content">
                {/* after click on sidemenuitem these components will appears */}

                {posttitle ? (
                  posttitle && (
                    <>
                      <div className="main_comment_div_show">
                        <div className="d-flex justify-content-between profile_comment_main_div">
                          <div className="main_div_name_comment_open">
                            <p className="comment_open">
                              {posttitle && posttitle.length > 30
                                ? `${posttitle.slice(0, 30)}...`
                                : posttitle}
                            </p>
                          </div>
                          <div className="main_div_name_comment_right_open row">
                            <div className="col-lg-8 col-md-8 col-12">
                              <p className="comment_open1">Comments</p>
                            </div>
                            <div className="col-lg-4 col-md-4 col-12">
                              <input
                                type="checkbox"
                                id="switch"
                                checked={posttoggle === 1}
                                onChange={handleToggle}
                              />
                              <label
                                className="toggleblogcomment"
                                htmlFor="switch"
                              >
                                Toggle
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="add_blog_sms_message_show_main_div">
                          {commentsdetail ? (
                            commentsdetail?.data?.map((data, index) => (
                              <>
                                <div
                                  className=" d-flex justify-content-end mb-3"
                                  key={index}
                                >
                                  <div
                                    className="receive_comment"
                                    // style={{
                                    //   backgroundColor:
                                    //     data?.is_approved == "1" ? "#32CD32" : null,
                                    // }}
                                  >
                                    <div className="commnet_main_div ">
                                      <div className="d-flex bd-highlight">
                                        <p
                                          className="reseive_receive_comment_name_header flex-grow-1 bd-highlight"
                                          // style={{
                                          //   color:
                                          //     data?.is_approved == "1" ? "white" : null,
                                          // }}
                                        >
                                          {data?.user?.first_name}
                                        </p>
                                        <div className="comment_no_style bd-highlight">
                                          {data?.order}
                                        </div>
                                        {data?.is_approved == "1" ? (
                                          <img
                                            className="bd-highlight green_commnet_style"
                                            src={greencommnet}
                                          />
                                        ) : null}
                                      </div>

                                      <p
                                        className="para_receive_comment_receive"
                                        // style={{
                                        //   color:
                                        //     data?.is_approved == "1"
                                        //       ? "#F0FFF0"
                                        //       : null,
                                        // }}
                                      >
                                        {data?.body}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div className=" d-flex justify-content-end button_div_approve_decline">
                                  {data?.is_approved == "0" ? (
                                    <button
                                      className="approve_button_comment"
                                      onClick={() => {
                                        handleApproveComment(data?.id);
                                      }}
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Approve the comment to show in blogs module"
                                    >
                                      Approve
                                    </button>
                                  ) : null}

                                  {data?.is_approved == "1" ? (
                                    <button
                                      className="decline_button_comment"
                                      onClick={() => {
                                        handleHideComment(data?.id);
                                      }}
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Hide the comment in blogs module"
                                    >
                                      Hide
                                    </button>
                                  ) : null}
                                </div>
                              </>
                            ))
                          ) : (
                            <SpinnerLoader />
                          )}
                        </div>
                      </div>

                      <div className="main_comment_div_show">
                        <div className="d-flex justify-content-between profile_comment_main_div">
                          <div className="main_div_name_comment_open">
                            <p className="comment_open">Replies on Comments</p>
                          </div>
                        </div>

                        <div className="add_blog_sms_message_show_main_div">
                          {replysdetail ? (
                            replysdetail?.comments?.map((data, index) => (
                              <>
                                <div className="d-flex justify-content-start">
                                  <div className="reply_in_comment_no_style">
                                    {data?.order}
                                  </div>
                                  <p className="para_commnet_in_reply">
                                    {data?.body}
                                  </p>
                                </div>

                                {data ? (
                                  data.replies.map((data, index) => (
                                    <div key={index} className="">
                                      <div
                                        className=" d-flex justify-content-end mb-3"
                                        key={index}
                                      >
                                        <img
                                          src={icon_arrow}
                                          className="icon_arrow_reply"
                                        />
                                        <div className="receive_comment">
                                          <div className="commnet_main_div ">
                                            <div className="d-flex bd-highlight">
                                              <p className="reseive_receive_comment_name_header flex-grow-1 bd-highlight">
                                                {data?.user?.first_name}
                                              </p>
                                              <div className="comment_no_style bd-highlight">
                                                {data?.order}
                                              </div>
                                              {data?.is_approved == "1" ? (
                                                <img
                                                  className="bd-highlight green_commnet_style"
                                                  src={greencommnet}
                                                />
                                              ) : null}
                                            </div>

                                            <p className="para_receive_comment_receive">
                                              {data?.body}
                                            </p>
                                          </div>
                                        </div>
                                      </div>

                                      <div className=" d-flex justify-content-end button_div_approve_decline">
                                        {data?.is_approved == "0" ? (
                                          <button
                                            className="approve_button_comment"
                                            onClick={() => {
                                              handleApproveReply(data?.id);
                                            }}
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Approve the comment to show in blogs module"
                                          >
                                            Approve
                                          </button>
                                        ) : null}

                                        {data?.is_approved == "1" ? (
                                          <button
                                            className="decline_button_comment"
                                            onClick={() => {
                                              handleHideReply(data?.id);
                                            }}
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Hide the comment in blogs module"
                                          >
                                            Hide
                                          </button>
                                        ) : null}
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <SpinnerLoader />
                                )}
                              </>
                            ))
                          ) : (
                            <SpinnerLoader />
                          )}
                        </div>
                      </div>
                    </>
                  )
                ) : (
                  <p className="main_heading_blog">
                    No Data (Please select the blog for the comments view)
                  </p>
                )}
                {/* {activeMenuItem === "mainMenu" && <MainMenu />}
              {activeMenuItem === "crm" && <Crm />}
              {activeMenuItem === "smsMessenger" && <SmsMessenger />}
              {activeMenuItem === "fixedPriceMode" && <FixedPriceMode />}
              {activeMenuItem === "premiumMode" && <SmsMessenger />}
              {activeMenuItem === "packages" && <Packages />}
              {activeMenuItem === "profile" && <Profile />}
              {activeMenuItem === "integrations" && <Integration />}
              {activeMenuItem === "faq" && <Faq />}
              {activeMenuItem === "supportTicket" && <SupportTicket />}

              {activeMenuItem === "adminsupporticket" && <SupportTicketAdmin />}
              {activeMenuItem === "usersModule" && <Users />}
              {activeMenuItem === "permissionModule" && <PermissionAndRoles />}
              {activeMenuItem === "inventoryModule" && <Inventory />} */}
                {/* {activeMenuItem === "logout" && <SmsMessenger />} */}
                {/* <!-- /.container-fluid --> */}
              </div>
              {/* <!-- End of Main Content --> */}
            </div>
            {/* <!-- End of Content Wrapper --> */}
          </div>
          {/* <!-- End of Page Wrapper --> */}

          {/* <!-- Scroll to Top Button--> */}

          {/* <!-- Logout Modal--> */}
        </div>
      </>
    </div>
  );
}

export default AddBlog;
