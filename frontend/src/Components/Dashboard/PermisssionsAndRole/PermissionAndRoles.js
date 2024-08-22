import React, { useState, useRef, useEffect } from "react";
import "./../PermisssionsAndRole/PermissionStyle.css";
import add_role_icon from "./../../../Assets/add_role_icon.png";
import axios from "axios";
import CustomNotification from "../CustomNotification/CustomNotification";
import RedNotification from "../CustomNotification/RedNotification";

function PermissionAndRoles() {

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

  
  const fieldsnull = () => {
    setnameofrole("");
    setdescriptionofrole("");
  };

  const token = localStorage.getItem("token");
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationMessageRed, setnotificationMessageRed] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const modalRef = useRef(null);
  //   POST USER ROLE
  const [nameofrole, setnameofrole] = useState("");
  const [descriptionofrole, setdescriptionofrole] = useState("");
  const addnewrolefunction = () => {
    // e.preventDefault();

    let payload = {
      name: nameofrole,
      description: descriptionofrole,
    };
    axiosInstance
      .post("/api/dashboard/add-role", payload)
      .then((r) => {
        setNotificationMessage(r?.data?.message);
        setTimeout(() => {
          setNotificationMessage("");
        }, 4000);
    
        setdescriptionofrole("");
        setnameofrole("");
        // Hide the modal after a successful response
        const modalElement = modalRef.current;
        if (modalElement) {
          modalElement.classList.remove("show");
          modalElement.style.display = "none";
          modalElement.setAttribute("aria-hidden", "true");
          document.body.classList.remove("modal-open");
          const modalBackdrop = document.querySelector(".modal-backdrop");
          if (modalBackdrop) {
            modalBackdrop.remove();
          }
        }
      })
      .catch((e) => {
        setnotificationMessageRed(e.response.data.message);
        console.log(e.response.data.message, "error");
      });
  };
  // GET USERS ROLE
  const [userrolelist, setuserrolelist] = useState([]);
  useEffect(() => {
    getUsersRoleData();
  }, [notificationMessage]);

  const getUsersRoleData = () => {
    axiosInstance.get(`/api/dashboard/get-roles`).then((res) => {
      setuserrolelist(res?.data);
  
    });
  };


  // get the role id and change the role button css onclick

  const [gettheroleid, setgettheroleid] = useState("");

  const [clickedItemId, setClickedItemId] = useState(null);

  const handleRoleClick = (itemId) => {
    setgettheroleid(itemId); // Store the clicked item ID
    setClickedItemId(itemId); // Set the clicked item ID to manage styling
    getallpermisssionrolesafterclickroles();
    getuserpermisssionrolesafterclickroles(itemId);
  };

  const [permissions, setPermissions] = useState([]);

  const [userpermissionroles, setuserpermissionroles] = useState([]);

  const [allPermissions, setAllPermissiona] = useState([]);





    useEffect(() => {
      getusersuperadmin();
    }, []);
    const [superadminroles, setsuperadminroles] = useState("");
    const getusersuperadmin = () => {
      axiosInstance.get("/api/dashboard/super-admin-permissions").then((res) => {
        setsuperadminroles(res);
        console.log(res, "getting super admin roles");
      });
    };
    console.log(superadminroles, "super admin roles");

   
  //   useEffect(() => {
  //     getusersuperadmin();
  //   }, []);

  const getuserpermisssionrolesafterclickroles = (role_id) => {
    axiosInstance
      .get(`/api/dashboard/get-role-permissions?role_id=${role_id}`)
      .then((res) => {
        setuserpermissionroles(res);
  
      });
  };

  const getallpermisssionrolesafterclickroles = () => {
    axiosInstance.get(`/api/dashboard/permissions`).then((res) => {
   
      setAllPermissiona(res);
    });
  };

  //   console.log(userpermissionroles);

  const runroleapiafterchanging = (save_role_id) => {
    getuserpermisssionrolesafterclickroles(save_role_id);
  };

  const handleCheckboxChange = (permissionId, status) => () => {
    const newStatus = status === 1 ? 0 : 1; // Toggle status

    // Update the local state to reflect the checkbox change
    const updatedPermissions = permissions.map((permission) => {
      if (permission.id === permissionId) {
        return { ...permission, status: newStatus };
      }
      return permission;
    });

    setPermissions(updatedPermissions);

    // Update the API with the new permission status
    axiosInstance
      .put(`/api/dashboard/permissions/${permissionId}`, {
        status: newStatus,
      })
      .then((response) => {
        getallpermisssionrolesafterclickroles();
        getuserpermisssionrolesafterclickroles(clickedItemId);
        console.log("Permission status updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating permission status:", error);
      });
  };

  return (
    <>
      {notificationMessage && (
        <CustomNotification message={notificationMessage} />
      )}
      <>
        {notificationMessageRed && (
          <RedNotification message={notificationMessageRed} />
        )}
      </>
      <div className="main_div_saved_roles">
        <p className="saved_role_para">Saved Roles</p>
        <div className="add_new_roles_main_div">
          <div className="scroll-container">
            <div className="row_role">
              <button
                className="add_new_role_div_green "
                data-toggle="modal"
                data-target="#exampleModalCenter"
              >
                <img src={add_role_icon} alt="Add Role Icon" className="mr-2" /> ADD NEW ROLE
              </button>
              {userrolelist?.roles
                ? userrolelist.roles
                    .slice(0, Math.ceil(userrolelist.roles.length / 2))
                    .map((item, index) => (
                      <>
                        <button
                          key={index}
                          className={`${
                            clickedItemId === item.id
                              ? "clicked_added_new_role_div_blue"
                              : "added_new_role_div_blue"
                          } `}
                          onClick={() => handleRoleClick(item?.id)}
                        >
                          {item?.name}
                        </button>
                      </>
                    ))
                : null}
            </div>
            <div className="row_role">
              {userrolelist?.roles
                ? userrolelist.roles
                    .slice(Math.ceil(userrolelist.roles.length / 2))
                    .map((item, index) => (
                      <button
                        key={index}
                        className={`${
                          clickedItemId === item.id
                            ? "clicked_added_new_role_div_blue"
                            : "added_new_role_div_blue"
                        } `}
                        onClick={() => handleRoleClick(item?.id)}
                      >
                        {item?.name}
                      </button>
                    ))
                : null}
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="exampleModalCenter"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
          ref={modalRef}
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div className="row">
                <div className="col-lg-6">
                  <h5 class="modal_title_role_added" id="exampleModalLongTitle">
                    Add New Role
                  </h5>
                </div>
                <div className="col-lg-6"></div>
              </div>

              <div class="modal-body">
                <input
                  className="role_name_input_field"
                  placeholder="Role Name"
                  value={nameofrole}
                  onChange={(e) => setnameofrole(e.target.value)}
                  required
                />
                <textarea
                  className="description_input_field"
                  placeholder="Description"
                  value={descriptionofrole}
                  onChange={(e) => setdescriptionofrole(e.target.value)}
                  required
                />

                <div className="row mt-5">
                  <div className="col-lg-6 col-md-6 col-6">
                    {" "}
                    <button
                      className="cancal_button_role_permisssion"
                      data-dismiss="modal"
                      onClick={fieldsnull}
                    >
                      Cancal{" "}
                    </button>
                  </div>
                  <div className="col-lg-4 col-md-4 col-4">
                    <button
                      className="save_button_role_permisssion"
                      onClick={addnewrolefunction}
                    >
                      Save{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="saved_role_para mt-4">Permissions Table</p>
        <div className="main_div_permision_handle_box">
          <div className="header_main_div">
            <div className="row">
              <div className="col-lg-3 col-md-3 col-3">
                <p className="header_para_permisssion_box">Modules</p>
              </div>
              <div className="col-lg-1 col-md-1 col-1"></div>
              <div className="col-lg-2 col-md-2 col-2">
                <p className="header1_para_permisssion_box">Add</p>
              </div>
              <div className="col-lg-2 col-md-2 col-2">
                <p className="header1_para_permisssion_box">View</p>
              </div>
              <div className="col-lg-2 col-md-2 col-2">
                <p className="header1_para_permisssion_box">Edit</p>
              </div>
              <div className="col-lg-2 col-md-2 col-2">
                <p className="header1_para_permisssion_box">Remove</p>
              </div>
            </div>
          </div>

          <div>
            {allPermissions?.data?.Tickets &&
            userpermissionroles?.data?.Tickets ? (
              <>
                <div className="row">
                  <div className="col-lg-3 col-md-3 col-3">
                    <p className="para_inside_permisssion_box">Tickets</p>
                  </div>
                  <div className="col-lg-1 col-md-1 col-1"></div>
                  {allPermissions?.data?.Tickets?.map((item) => (
                    <>
                      <div className="col-lg-2 col-md-2 col-2">
                        <input
                          type="checkbox"
                          id={`Tickets_${item.id}`}
                          checked={userpermissionroles?.data?.Tickets.some(
                            (p) => p.id === item.id && p.status === 1
                          )}
                          onChange={handleCheckboxChange(item.id, item.status)}
                        />
                        <label
                          className="toggle_btn_permission"
                          htmlFor={`Tickets_${item.id}`}
                        >
                          {item.name}
                        </label>
                      </div>
                    </>
                  ))}
                </div>
              </>
            ) : <>
             <div className="row">
                  <div className="col-lg-3 col-md-3 col-3">
                    <p className="para_inside_permisssion_box">Tickets</p>
                  </div>
                  <div className="col-lg-1 col-md-1 col-1"></div>
                  {superadminroles?.data?.Tickets?.map((item) => (
                    <>
                      <div className="col-lg-2 col-md-2 col-2">
                        <input
                          type="checkbox"
                          id={`Tickets_${item.id}`}
                          checked={userpermissionroles?.data?.Tickets.some(
                            (p) => p.id === item.id && p.status === 1
                          )}
                          onChange={handleCheckboxChange(item.id, item.status)}
                        />
                        <label
                          className="toggle_btn_permission"
                          htmlFor={`Tickets_${item.id}`}
                        >
                          {item.name}
                        </label>
                      </div>
                    </>
                  ))}
                </div>
            
            </>}
          </div>

          <div>
            {/* {console.log(allPermissions?.data,"permissions")} */}
            {allPermissions?.data?.Users && userpermissionroles?.data?.Users ? (
              <>
                <div className="row">
                  <div className="col-lg-3 col-md-3 col-3">
                    <p className="para_inside_permisssion_box">Users</p>
                  </div>
                  <div className="col-lg-1 col-md-1 col-1"></div>
                  {allPermissions?.data?.Users?.map((item) => (
                    <>
                      <div className="col-lg-2 col-md-2 col-2">
                        <input
                          type="checkbox"
                          id={`inventory_${item.id}`}
                          checked={userpermissionroles?.data?.Users.some(
                            (p) => p.id === item.id && p.status === 1
                          )}
                          onChange={handleCheckboxChange(item.id, item.status)}
                        />
                        <label
                          className="toggle_btn_permission"
                          htmlFor={`inventory_${item.id}`}
                        >
                          {item.name}
                        </label>
                      </div>
                    </>
                  ))}
                </div>
              </>
            ) : <>
            <div className="row">
                  <div className="col-lg-3 col-md-3 col-3">
                    <p className="para_inside_permisssion_box">Users</p>
                  </div>
                  <div className="col-lg-1 col-md-1 col-1"></div>
                  {superadminroles?.data?.Users?.map((item) => (
                    <>
                      <div className="col-lg-2 col-md-2 col-2">
                        <input
                          type="checkbox"
                          id={`inventory_${item.id}`}
                          checked={userpermissionroles?.data?.Users.some(
                            (p) => p.id === item.id && p.status === 1
                          )}
                          onChange={handleCheckboxChange(item.id, item.status)}
                        />
                        <label
                          className="toggle_btn_permission"
                          htmlFor={`inventory_${item.id}`}
                        >
                          {item.name}
                        </label>
                      </div>
                    </>
                  ))}
                </div></>}
          </div>
        </div>
      </div>
    </>
  );
}

export default PermissionAndRoles;
