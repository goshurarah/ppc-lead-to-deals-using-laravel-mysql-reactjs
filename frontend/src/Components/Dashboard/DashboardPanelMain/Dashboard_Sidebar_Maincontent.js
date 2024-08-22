import React, { useEffect, useState } from "react";
import "./../DashboardPanelMain/DashboardSidebarStyle.css";
import logout_icon from "./../../../Assets/logout_icon.png";
import MainMenu from "../MainMenu/MainMenu";
import Crm from "../CRM/Crm";
import SmsMessenger from "../Sms_Messenger/SmsMessenger";
import axios from "axios";
import SupportTicket from "../SupportTicket/SupportTicket";
import Integration from "../Integrations/Integration";
import Faq from "../Faq/Faq";
import Profile from "../Profile_User/Profile";
import Packages from "../Packages/Packages";
import SupportTicketAdmin from "../SupportTicketAdmin/SupportTicketAdmin";
import Users from "../Users/Users";
import PermissionAndRoles from "../PermisssionsAndRole/PermissionAndRoles";
// import "./../Dashboadpage/Dashboard.css";
import ppclogo from "./../../../Assets/ppclogo.png";
import bell_icon from "./../../../Assets/bell_iconnavbar.png";
import message from "./../../../Assets/messages.png";
import total_balance from "./../../../Assets/total_balance.png";
import total_balance_detail from "./../../../Assets/total_balance_detailicon.PNG";
import Inventory from "../Inventory/Inventory";
import FixedPriceMode from "../FixedPriceMode/FixedPriceMode";
import PremiumMode from "../PremiumMode/PremiumMode";
import premiumgold from "./../../../Assets/Premium badge On.png";
import premiumsilver from "./../../../Assets/Premium-badge-Off.png";
import AddBlog from "../AddBlog/AddBlog";
import { useNavigate } from "react-router-dom";

function Dashboard_Sidebar_Maincontent() {
  const token = localStorage.getItem("token");
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const [sideMenuModules, setSideMenuModules] = useState("");
  const [roleticketsideMenuModule, setrolesideMenuModule] = useState("");
  const [roleusersideMenuModule, setroleusersideMenuModule] = useState("");
  const [roleblogideMenuModule, setroleblogideMenuModule] = useState("");

  useEffect(() => {
    getDashboardData();
    getuserprofiledata();
    getticketrolemodule();
    getuserrolemodule();
    getblogrolemodule();
  }, []);

  const getblogrolemodule = () => {
    axiosInstance
      .get(`/api/dashboard/blog-admin/module`)
      .then((res) => {
        setroleblogideMenuModule(res?.data);
      })
      .catch((error) => {
        console.error(
          "Error fetching dashboard data:",
          error.response.data.message
        );
        // alert(error.response.data.message);
      });
  };

  const getDashboardData = () => {
    axiosInstance
      .get(`/api/dashboard/get-side-menu-modules`)
      .then((res) => {
        setSideMenuModules(res?.data);
      })
      .catch((error) => {
        console.error(
          "Error fetching dashboard data:",
          error.response.data.message
        );
        alert(error.response.data.message);
        // Display or handle the error message
      });
  };

  const getticketrolemodule = () => {
    axiosInstance
      .get(`/api/dashboard/ticket-admin/modules`)
      .then((res) => {
        setrolesideMenuModule(res?.data);
      })
      .catch((error) => {
        console.error(
          "Error fetching dashboard data:",
          error.response.data.message
        );
        // alert(error.response.data.message);
      });
  };

  const getuserrolemodule = () => {
    axiosInstance
      .get(`/api/dashboard/user-admin/modules`)
      .then((res) => {
        setroleusersideMenuModule(res);
      })
      .catch((error) => {
        console.error(
          "Error fetching dashboard data:",
          error.response.data.message
        );
        // alert(error.response.data.message);
      });
  };

  const [storetcketroleforrendermodules, setstoreroleforrendermodules] =
    useState("");

  const getuserprofiledata = () => {
    axiosInstance.get(`/api/dashboard/user-profile`).then((res) => {
      setstoreroleforrendermodules(res?.data?.data?.role?.name);
    });
  };

  useEffect(() => {
    const handleSidebarToggle = () => {
      document.body.classList.toggle("sidebar-toggled");
      document.querySelector(".sidebar").classList.toggle("toggled");

      if (document.querySelector(".sidebar").classList.contains("toggled")) {
        const collapseElements =
          document.querySelectorAll(".sidebar .collapse");
        collapseElements.forEach((element) => {
          const bootstrapCollapse = new window.bootstrap.Collapse(element);
          bootstrapCollapse.hide();
        });
      }
    };

    const handleWindowResize = () => {
      if (window.innerWidth < 768) {
        const collapseElements =
          document.querySelectorAll(".sidebar .collapse");
        collapseElements.forEach((element) => {
          const bootstrapCollapse = new window.bootstrap.Collapse(element);
          bootstrapCollapse.hide();
        });
      }

      if (
        window.innerWidth < 480 &&
        !document.querySelector(".sidebar").classList.contains("toggled")
      ) {
        document.body.classList.add("sidebar-toggled");
        document.querySelector(".sidebar").classList.add("toggled");

        const collapseElements =
          document.querySelectorAll(".sidebar .collapse");
        collapseElements.forEach((element) => {
          const bootstrapCollapse = new window.bootstrap.Collapse(element);
          bootstrapCollapse.hide();
        });
      }
    };

    document
      .querySelector("#sidebarToggle")
      .addEventListener("click", handleSidebarToggle);
    document
      .querySelector("#sidebarToggleTop")
      .addEventListener("click", handleSidebarToggle);
    window.addEventListener("resize", handleWindowResize);

    return () => {
      document
        .querySelector("#sidebarToggle")
        .removeEventListener("click", handleSidebarToggle);
      document
        .querySelector("#sidebarToggleTop")
        .removeEventListener("click", handleSidebarToggle);
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const [activeMenuItem, setActiveMenuItem] = useState("");
  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };
  useEffect(() => {
    handleMenuItemClick();
  }, []);
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      // navigate("/");
    } catch (error) {
      console.error("Error removing items from localStorage:", error);
    }
  };

  const [superadminroles, setsuperadminroles] = useState([]);
  useEffect(() => {
    getsuperadminroles();
  }, []);
  //get the superadmin roles
  const getsuperadminroles = () => {
    axiosInstance.get(`/api/dashboard/super-admin/modules`).then((res) => {
      setsuperadminroles(res);
    });
  };

  //dashboard
  //get profile data api
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  //  const [email, setEmail] = useState("");
  //  const [phone, setPhone] = useState("");

  const [userprofiledata, setuserprofiledata] = useState("");
  useEffect(() => {
    getuserprofiledatadashboard();
  }, []);

  const getuserprofiledatadashboard = () => {
    axiosInstance.get(`/api/dashboard/user-profile`).then((res) => {
      setuserprofiledata(res.data.data);
      setFirstName(res.data.data.first_name);
      setLastName(res.data.data.last_name);
    });
  };

  const getInitials = (name) => {
    return name.charAt(0);
  };

  useEffect(() => {
    getAvailableLeadsData();
  }, []);
  const [leadnumber, setleadnumber] = useState("");
  const [totalmember, settotalmember] = useState("");

  const getAvailableLeadsData = async () => {
    axiosInstance
      .get("/api/lead-count")
      .then((res) => {
        console.log(res?.data?.lead_count, "leads count");
        setleadnumber(res?.data?.lead_count);
      })
      .catch((e) => {
        if (e.response.status == 404) {
        } else {
        }
      });
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

  const [totalUsers, settotalUsers] = useState("");

  useEffect(() => {
    fetchUsersData();
  }, []);

  const fetchUsersData = () => {
    axiosInstance.get(`/api/user-count`).then((res) => {
      console.log(res?.data?.user_count, "user info");
      settotalUsers(res?.data?.user_count);
    });
  };


  const [totalbalance, settotalbalance] = useState("");

  useEffect(() => {
    fetchbalanceData();
  }, []);

  const fetchbalanceData = () => {
    axiosInstance.get(`/api/dashboard/balance`).then((res) => {
      console.log(res?.data?.total_balance, "balance info");
      settotalbalance(res?.data?.total_balance);
    });
  };
  return (
    <>
      <>
        <nav className="navbar navbar-expand-lg sticky-top navbarsticky">
          <div className="main_div_seller_lead_market_nav">
            <div className="row">
              <div className="col-lg-5">
                <img src={ppclogo} className="ppc_logo_navbar_dashboard" />
              </div>
              <div className="col-lg-7 ">
                <p className="seller_lead_para_market_nav">
                  Seller Leads Marketplace
                </p>
                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    <button className="market_button_nav">
                      Total leads:{" "}
                      {leadnumber > 1000
                        ? `${Math.floor(leadnumber / 1000)}k`
                        : leadnumber !== null
                        ? leadnumber
                        : "0"}
                    </button>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <button className="market_button_nav">
                      Total Members:{" "}
                      {totalUsers > 1000
                        ? `${Math.floor(totalUsers / 1000)}k`
                        : totalUsers !== null
                        ? totalUsers
                        : "0"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <a className="navbar-brand" href="#">Navbar</a> */}
          <button
            className="navbar-toggler bg-light m-3"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form
              className="form-inline  my-2 my-lg-0 navbar_main_div_ppc_dashboard "
              onSubmit={(e) => e.preventDefault()}
            >
              <div
                className="mx-2"
                onClick={() => handleMenuItemClick("packages")}
              >
                <img
                  src={
                    subscriptionPackages === "subscribed"
                      ? premiumgold
                      : premiumsilver
                  }
                  className="premiumgold_picture"
                />
              </div>
              {/* <div>
                <p className="mx-2 button_navbar">OUR PACKAGE PRICING </p>
                <p className=" button_navbar_para">
                  Subscribe to see even more info about each lead
                </p>
              </div> */}
              {/* <div className="vl mx-2"></div> */}
              {/* <button
                className="our_price_package mx-1"
                onClick={() => handleMenuItemClick("supportTicket")}
              >
                <img src={ticket} />
              </button> */}
              <div className="vl mx-2"></div>
              <button className="our_price_package mx-2">
                <img src={message} />
              </button>
              <button className="our_price_package mx-2">
                <img src={bell_icon} />
              </button>
              <div className="vl mx-2"></div>
              <button className="our_price_package mx-3">
                <img src={total_balance} />
              </button>
              <div>
                <p className="mx-1 button_navbar">
                  Total Balance{" "}
                  <img
                    className="total_balance_detail_icon"
                    src={total_balance_detail}
                  />
                </p>
                <p className="price_total">${totalbalance ? totalbalance : "0.00"} </p>
              </div>
              <div className="vl mx-2"></div>
              <button
                className="profile_button mx-3"
                onClick={() => handleMenuItemClick("profile")}
              >
                {/* <img src={TT} /> */}
                <p className="firstletterpara">
                  {firstname ? getInitials(firstname) : null}
                  {lastname ? getInitials(lastname) : null}
                </p>
              </button>
              <div>
                <p
                  className="mx-1 profile_name_navbar"
                  onClick={() => handleMenuItemClick("profile")}
                >
                  {firstname ? firstname : null}
                </p>
              </div>
            </form>
          </div>
        </nav>
      </>
      <div>
        {/* <!-- Page Wrapper --> */}
        <div id="wrapper">
          {/* <!-- Sidebar --> */}

          <ul
            className="navbar-nav bg-gradient-dark sidebar sidebar-dark accordion"
            id="accordionSidebar"
            style={{ background: "linear-gradient(0deg, #37474F, #37474F)" }}
          >
            {/* <!-- Sidebar - Brand --> */}


            <a className="sidebar-brand d-flex ">
              <div className="sidebar-brand-text mt-2">Main Menu</div>
            </a>

            {/* <!-- Nav Item - Dashboard --> */}

            {sideMenuModules
              ? sideMenuModules?.data?.map((sidebarMenu, index) => {
                  return (
                    <>
                      <li
                        className={`nav-item sidebar_menu_cursor ${
                          sidebarMenu?.component === activeMenuItem
                            ? "active"
                            : ""
                        }`}
                        key={index}
                      >
                        <a
                          className="nav-link"
                          onClick={() =>
                            handleMenuItemClick(sidebarMenu?.component)
                          }
                        >
                          <img
                            src={
                              sidebarMenu?.component === activeMenuItem
                                ? sidebarMenu.icon_path_white
                                : sidebarMenu.icon_path_gray
                            }
                            className=""
                          />{" "}
                          <span className="sidebar_text mx-2">
                            {sidebarMenu?.name}
                          </span>
                        </a>
                      </li>
                      {(index + 1) % 6 === 0 && (
                        <hr className="sidebar-divider" />
                      )}
                      {(index + 1) % 6 === 0 && (
                        <a className="sidebar-brand d-flex ">
                          <div className="sidebar-brand-text mt-1">SUPPORT</div>
                        </a>
                      )}
                    </>
                  );
                })
              : null}

            {storetcketroleforrendermodules == "ticket-admin" ? (
              <>
                {roleticketsideMenuModule
                  ? roleticketsideMenuModule?.data?.map(
                      (sidebarMenu, index) => {
                        return (
                          <>
                            <li
                              className={`nav-item sidebar_menu_cursor ${
                                sidebarMenu?.component === activeMenuItem
                                  ? "active"
                                  : ""
                              }`}
                              key={index}
                            >
                              <a
                                className="nav-link"
                                onClick={() =>
                                  handleMenuItemClick(sidebarMenu?.component)
                                }
                              >
                                <img
                                  src={
                                    sidebarMenu?.component === activeMenuItem
                                      ? sidebarMenu.icon_path_white
                                      : sidebarMenu.icon_path_gray
                                  }
                                  className=""
                                />{" "}
                                <span className="sidebar_text mx-2">
                                  {sidebarMenu?.name}
                                </span>
                              </a>
                            </li>
                          </>
                        );
                      }
                    )
                  : null}
              </>
            ) : null}

            {/* <hr className="sidebar-divider d-none d-md-block" />  */}
            <hr className="sidebar-divider" />

            {storetcketroleforrendermodules == "user-admin" ? (
              <>
                {roleusersideMenuModule
                  ? roleusersideMenuModule?.data?.map((sidebarMenu, index) => {
                      return (
                        <>
                          <li
                            className={`nav-item sidebar_menu_cursor ${
                              sidebarMenu?.component === activeMenuItem
                                ? "active"
                                : ""
                            }`}
                            key={index}
                          >
                            <a
                              className="nav-link"
                              onClick={() =>
                                handleMenuItemClick(sidebarMenu?.component)
                              }
                            >
                              <img
                                src={
                                  sidebarMenu?.component === activeMenuItem
                                    ? sidebarMenu.icon_path_white
                                    : sidebarMenu.icon_path_gray
                                }
                              />{" "}
                              <span className="sidebar_text mx-2">
                                {sidebarMenu?.name}
                              </span>
                            </a>
                          </li>
                        </>
                      );
                    })
                  : null}
              </>
            ) : null}

            {storetcketroleforrendermodules == "blog-admin" ? (
              <>
                {roleblogideMenuModule
                  ? roleblogideMenuModule?.data?.map((sidebarMenu, index) => {
                      return (
                        <>
                          <li
                            className={`nav-item sidebar_menu_cursor ${
                              sidebarMenu?.component === activeMenuItem
                                ? "active"
                                : ""
                            }`}
                            key={index}
                          >
                            <a
                              className="nav-link"
                              onClick={() =>
                                handleMenuItemClick(sidebarMenu?.component)
                              }
                            >
                              <img
                                src={
                                  sidebarMenu?.component === activeMenuItem
                                    ? sidebarMenu.icon_path_white
                                    : sidebarMenu.icon_path_gray
                                }
                              />{" "}
                              <span className="sidebar_text mx-2">
                                {sidebarMenu?.name}
                              </span>
                            </a>
                          </li>
                        </>
                      );
                    })
                  : null}
              </>
            ) : null}

            {storetcketroleforrendermodules == "super-admin" ? (
              <>
                {superadminroles
                  ? superadminroles?.data?.map((sidebarMenu, index) => {
                      return (
                        <>
                          <li
                            className={`nav-item sidebar_menu_cursor ${
                              sidebarMenu?.component === activeMenuItem
                                ? "active"
                                : ""
                            }`}
                            key={index}
                          >
                            <a
                              className="nav-link"
                              onClick={() =>
                                handleMenuItemClick(sidebarMenu?.component)
                              }
                            >
                              <img
                                src={
                                  sidebarMenu?.component === activeMenuItem
                                    ? sidebarMenu.icon_path_white
                                    : sidebarMenu.icon_path_gray
                                }
                                className=""
                              />{" "}
                              <span className="sidebar_text mx-2">
                                {sidebarMenu?.name}
                              </span>
                            </a>
                          </li>
                        </>
                      );
                    })
                  : null}
              </>
            ) : null}

            {/* <li className="nav-item ">
            <a className="nav-link">
              <img src={Support_faq} />

              <span
                className="sidebar_text mx-2"
                onClick={() => handleMenuItemClick("supportticketadmin")}
              >
                Support Ticket Admin
              </span>
            </a>
          </li> */}

            {/* <li className="nav-item ">
            <a className="nav-link">
              <img src={Support_faq} />

              <span
                className="sidebar_text mx-2"
                onClick={() => handleMenuItemClick("users")}
              >
                Users
              </span>
            </a>
          </li> */}

            {/* <li className="nav-item ">
            <a className="nav-link">
              <img src={Support_faq} />

              <span
                className="sidebar_text mx-2"
                onClick={() => handleMenuItemClick("permissionsModule")}
              >
                Permisssion
              </span>
            </a>
          </li> */}

            <li className="nav-item " onClick={handleLogout}>
              <a className="nav-link" href="/">
                <img src={logout_icon} />{" "}

                <span className="sidebar_text mx-2">Logout</span>
              </a>
            </li>

            <div className="text-center d-none d-md-inline my-5">
              <button
                className="rounded-circle border-0"
                id="sidebarToggle"
              ></button>
            </div>

            {/* <!-- Sidebar Message --> */}
          </ul>
          {/* <!-- End of Sidebar --> */}

          {/* <!-- Content Wrapper --> */}
          <div id="content-wrapper" className="d-flex flex-column">
            {/* <!-- Main Content --> */}
            <div id="content">
              {/* <!-- Topbar --> */}
              <nav className="navbar navbar-expand navbar-light bg-white topbar mb-5 static-top shadow">
                <button
                  id="sidebarToggleTop"
                  className="btn btn-link d-md-none rounded-circle mr-3"
                >
                  <i className="fa fa-bars"></i>
                </button>
                {/* {sideMenuModules?.data ? <SellerLeadMarketDashboard />    : null } */}
                {/* <SellerLeadMarketDashboard /> */}
                {/* <!-- Sidebar Toggle (Topbar) --> */}

                {/* {activeMenuItem === "mainMenu" && <SellerLeadMarketDashboard />} */}
              </nav>
              {/* <!-- End of Topbar --> */}

              {/* <!-- Begin Page Content --> */}

              {/* after login to dashboard this component appears */}
              {activeMenuItem ? " " : <MainMenu />}

              {/* after click on sidemenuitem these components will appears */}
              {activeMenuItem === "mainMenu" && <MainMenu />}
              {activeMenuItem === "crm" && <Crm />}
              {activeMenuItem === "smsMessenger" && <SmsMessenger />}
              {activeMenuItem === "fixedPriceMode" && <FixedPriceMode />}
              {activeMenuItem === "premiumMode" && <PremiumMode />}
              {activeMenuItem === "packages" && <Packages />}
              {activeMenuItem === "profile" && <Profile />}
              {activeMenuItem === "integrations" && <Integration />}
              {activeMenuItem === "faq" && <Faq />}
              {activeMenuItem === "supportTicket" && <SupportTicket />}
              {activeMenuItem === "blogs" && <AddBlog />}
              {activeMenuItem === "adminsupporticket" && <SupportTicketAdmin />}
              {activeMenuItem === "usersModule" && <Users />}
              {activeMenuItem === "permissionModule" && <PermissionAndRoles />}
              {activeMenuItem === "inventoryModule" && <Inventory />}
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
  );
}

export default Dashboard_Sidebar_Maincontent;
