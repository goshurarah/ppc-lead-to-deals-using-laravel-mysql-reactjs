import React, { useEffect, useState } from "react";
import "./../Sms_Messenger/SmsStyle.css";
import axios from "axios";
import SpinnerLoader from "../SpinnerLoader/SpinnerLoader";
import serachsms from "./../../../Assets/serach_sms.png";
import iconsendsms from "./../../../Assets/smssend_btn_icon.png";

function SmsMessenger() {
  const token = localStorage.getItem("token");
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const [sideMenuModules, setSideMenuModules] = useState("");
  const [roleticketsideMenuModule, setrolesideMenuModule] = useState("");
  const [roleusersideMenuModule, setroleusersideMenuModule] = useState("");
  useEffect(() => {
    getDashboardData();
    getuserprofiledata();
    getticketrolemodule();
    getuserrolemodule();
  }, []);

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

 

  

   

  const [activeMenuItem, setActiveMenuItem] = useState("");
  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };
  useEffect(() => {
    handleMenuItemClick();
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    } catch (error) {
      console.error("Error removing token:", error);
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
      .get("/api/dashboard/get-leads")
      .then((res) => {
        
        setleadnumber(res?.data?.leads?.data?.length);
      })
      .catch((e) => {
        if (e.response.status == 404) {
        } else {
        }
      });
  };

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredModules = sideMenuModules?.data?.filter((sidebarMenu) => {
    // You can customize this filtering logic based on your requirements.
    // For example, you can use .includes() for a case-insensitive search.
    return sidebarMenu.component
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  });
  return (
    <div>
      {/* <!-- Page Wrapper --> */}
      <div id="wrapper">
        {/* <!-- Sidebar --> */}

        <ul
          className="navbar-nav sidebar_message_main_div accordion"
          id="accordionSidebar"
        >
          {/* <!-- Sidebar - Brand --> */}

          {/* <a className="sidebar-brand d-flex ">
              <div className="sidebar-brand-text mt-2">Main Menu</div>
            </a> */}

          {/* <!-- Nav Item - Dashboard --> */}
          <div className="search_div_sms d-flex flex-row">
            <img src={serachsms} className="sms_icon_search" />
            <input
              className="input_serach_sms"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          <div className="main_div_sidebar_sms_messenger">
           
            {filteredModules ? (
              filteredModules.map((sidebarMenu, index) => (
                <li
                  className={`mesg_sidebar_div ${
                    sidebarMenu.component === activeMenuItem
                      ? "mesg_sidebar_div_active"
                      : ""
                  }`}
                  key={index}
                  onClick={() => handleMenuItemClick(sidebarMenu.component)}
                >
                  <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                      <button className="round_div_sms_person_name">
                        TP
                      </button>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <p
                        className={`messenger_person_name ${
                          sidebarMenu?.component === activeMenuItem
                            ? "messenger_person_name_active"
                            : ""
                        }`}
                      >
                        Tango Tag
                      </p>
                      <p
                        className={`messenger_person_desp ${
                          sidebarMenu?.component === activeMenuItem
                            ? "messenger_person_desp_active"
                            : ""
                        }`}
                      >
                        156 Arizona, sc, NY
                      </p>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                      <p
                        className={`sms_time ${
                          sidebarMenu?.component === activeMenuItem
                            ? "sms_time_active"
                            : ""
                        }`}
                      >
                        08:49 PM
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
            {/* <!-- Topbar --> */}
         
            {/* <!-- End of Topbar --> */}

            {/* <!-- Begin Page Content --> */}

            {/* after login to dashboard this component appears */}
            {/* {activeMenuItem ? " " : <MainMenu />} */}

            {/* after click on sidemenuitem these components will appears */}

            {activeMenuItem === "mainMenu" && (
              <div className="main_sms_div_show">
                <div className="d-flex flex-row profile_sms_main_div">
                  <div className="round_div_mesage_open"></div>
                  <div className="main_div_name_desp_open">
                    <p className="messenger_person_name_open">Tango tag</p>
                    <p className="messenger_person_desp_open">
                      156 Arizona, sc, NY
                    </p>
                  </div>
                </div>

                <div className="sms_message_show_main_div">
                  <div className=" d-flex justify-content-end ">
                    <div className="receive_sms_messenger">
                      <p className="reseive_sms_name_header">azeem</p>
                      <p className="para_sms_receive">
                      If you don’t see leads in your counties on ispeedtolead - grab a package and we will add your locations to our campaigns the very next day.


                      </p>
                    </div>
                  </div>

                  <div className=" d-flex justify-content-start">
                    <div className="send_sms_messenger">
                      <p className="send_sms_name_header">azeem</p>
                      <p className="para_sms_send">
                      If you don’t see leads in your counties on ispeedtolead - grab a package and we will add your locations to our campaigns the very next day.


                      </p>
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-row">
                  <input className="input_style_sms_end" />
                  <button className="button_sms_send_style">
                    <img src={iconsendsms} /> Send
                  </button>
                </div>
              </div>
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
  );
}

export default SmsMessenger;
