import React, { useState } from "react";
import "./../SignUp/SignupStyle.css";
import Navbar from "../PpcNavbar/Navbar";
import designleftside from "./../../Assets/designleftside.PNG";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CustomNotification from "../Dashboard/CustomNotification/CustomNotification";
import SpinnerLoader from "../Dashboard/SpinnerLoader/SpinnerLoader";
import RedNotification from "../Dashboard/CustomNotification/RedNotification";
function Signup() {
  const navigate = useNavigate();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationMessageRed, setnotificationMessageRed] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [state, setstate] = useState("");

  const registerAction = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsModalOpen(true);
    let payload = {
      first_name: firstname,
      last_name: lastname,
      email: email,
      password: password,
      password_confirm: confirmPassword
    };
    axios
      .post("/api/register", payload)
      .then((r) => {
        setIsSubmitting(false);
        setIsModalOpen(false);
        localStorage.setItem("token", r.data.token);
        localStorage.setItem("email", r.data.data.email);
        // localStorage.setItem("email", r.data.token);
        navigate("/verification_code");
      })
      .catch((e) => {
        setIsSubmitting(false);
        setIsModalOpen(false);
        if (e.response.data.errors != undefined) {
          // alert(e.response.data.message);
          // <CustomNotification message={e.response.data.message}/>
          setValidationErrors(e.response.data.errors);

          setnotificationMessageRed(e.response.data.message);
          setTimeout(() => {
            setnotificationMessageRed("");
          }, 4000);
         
        }
      });
  };

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleTogglePassword = (field) => {
    if (field === 'password') {
      setPasswordVisible(!passwordVisible);
    } else if (field === 'confirmPassword') {
      setConfirmPasswordVisible(!confirmPasswordVisible);
    }
  };

  const handleInputChange = (field, value) => {
    if (field === 'password') {
      setPassword(value);
    } else if (field === 'confirmPassword') {
      setConfirmPassword(value);
      // Check for password match when user starts typing in confirm password field
      if (value !== password) {
        setValidationErrors({
          ...validationErrors,
          confirmPassword: ['Passwords do not match!'],
        });
      } else {
        // Passwords match, clear the error
        setValidationErrors({
          ...validationErrors,
          confirmPassword: undefined,
        });
      }
    }
  };


  const handleFormValidation = () => {
    // Your validation logic here

    // Update validation errors
    setValidationErrors({
      ...validationErrors,
      confirmPassword: ['Your validation error message for confirm password'],
    });
  };
  return (
    <>
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
      <Navbar />
      <div className="main_role row">
        <div className="col-sm-12 col-md-4 col-lg-4 main_design">
          <img className="design_style" src={designleftside} />
        </div>
        <div className=" col-sm-12 col-md-4 col-lg-4">
          <p className="signup">SignUp</p>
          <p className="signuppara">Tell Us about yourself</p>
          <form onSubmit={(e) => registerAction(e)}>
            <div className="row">
              <div className="form-group  col-sm-6">
                <input
                  id="firstname"
                  name="firstname"
                  type="firstname"
                  required
                  className="mt-3 form-control inputStyle inputStylesignupmargin "
                  placeholder="First Name"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  maxlength="32"
                  // pattern="[A-Za-z]{1,32}"
                />
                {/* <div className="invalid-feedback" style={{ color: "#FF0000" }}>
                  This field is required
                </div> */}
                {validationErrors.firstname != undefined && (
                  <div className="flex flex-col">
                    <small className="text-danger">
                      {validationErrors.firstname[0]}
                    </small>
                  </div>
                )}
              </div>
              <div className="form-group col-sm-6">
                <input
                  id="lastname"
                  name="lastname"
                  type="lastname"
                  required
                  maxlength="32"
                  // pattern="[A-Za-z]{1,32}"
                  className="mt-3 form-control inputStyle inputStylesignupmargin"
                  placeholder="Last Name"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
                {/* <div className="invalid-feedback" style={{ color: "#FF0000" }}>
                  This field is required
                </div> */}
                {validationErrors.lastname != undefined && (
                  <div className="flex flex-col">
                    <small className="text-danger">
                      {validationErrors.lastname[0]}
                    </small>
                  </div>
                )}
              </div>
            </div>
            <div className="form-group">
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-2 form-control inputStyle inputStylesignupmargin"
                placeholder="Email"
                pattern="[A-Za-z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
                // title="example@gmail.com"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              {/* <div className="invalid-feedback" style={{ color: "#FF0000" }}>
                This field is required
              </div> */}
              {validationErrors.email != undefined && (
                <div className="flex flex-col">
                  <small className="text-danger">
                    {validationErrors.email[0]}
                  </small>
                </div>
              )}
            </div>
            <div>
      {/* Password Field */}
      <div className="form-group">
        <div className="inputpassworddiv">
          <input
            type={passwordVisible ? 'text' : 'password'}
            className="mt-3 form-control inputStyle inputStylesignupmargin"
            placeholder="Password"
            id="password"
            name="password"
            required
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one number, one special character, one uppercase and lowercase letter, and at least 8 or more characters"
            onChange={(e) => {
              handleInputChange('password', e.target.value);
            }}
          />
          <i
            className="fa fa-eye eye_sign_up"
            style={{ color: passwordVisible ? 'blue' : 'lightgray' }}
            onClick={() => handleTogglePassword('password')}
          ></i>
        </div>
        {validationErrors.password != undefined && (
          <div className="flex flex-col">
            <small className="text-danger">{validationErrors.password[0]}</small>
          </div>
        )}
      </div>

      {/* Confirm Password Field */}
      <div className="form-group">
        <div className="inputpassworddiv">
          <input
            type={confirmPasswordVisible ? 'text' : 'password'}
            className="mt-3 form-control inputStyle inputStylesignupmargin"
            placeholder="Confirm Password"
            id="confirm_password"
            name="confirm_password"
            required
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one number, one special character, one uppercase and lowercase letter, and at least 8 or more characters"
            onChange={(e) => {
              handleInputChange('confirmPassword', e.target.value);
            }}
          />
          <i
            className="fa fa-eye eye_sign_up"
            style={{ color: confirmPasswordVisible ? 'blue' : 'lightgray' }}
            onClick={() => handleTogglePassword('confirmPassword')}
          ></i>
        </div>
        {validationErrors.confirmPassword != undefined && (
          <div className="flex flex-col">
            <small className="text-danger">{validationErrors.confirmPassword[0]}</small>
          </div>
        )}
      </div>
    </div>
      
            <div className="form-group mt-3">
              <label className="agreement">Agreements</label>
            </div>
            <div className="form-check mt-2 checkboxsignup">
              <input
                className="form-check-input"
                type="checkbox"
                // value=""
                id="termsandpolicy"
                required
              />
              <p className="forgotpasswordpara">
                I have read and agree to PPC Leads to Deals{" "}
                <font color="red">
                  <u
                    className="termsandpolicytext"
                    data-toggle="modal"
                    data-target="#exampleModalLong"
                  >
                    Terms of Service and Privacy Policy.
                  </u>
                </font>
              </p>
            </div>

            <button type="submit" className="mt-2 freshleadbuttonsignup btn">
              Register for Free
            </button>
            <p className="orstyle mt-4">OR</p>

            <Link to="/signin">
              <button
                type="submit"
                className="mt-2 signinforfreeebuttoninsignup btn"
              >
                You Already Have an Account ?
              </button>
            </Link>
          </form>
        </div>
        <div className="col-sm-12 col-md-4 col-lg-4"></div>
      </div>

      <>
        <div
          class={`modal fade bd-example-modal-sm ${
            isModalOpen ? "show" : ""
          } mt-5`}
          style={{ display: isModalOpen ? "block" : "none" }}
          tabindex="-1"
          role="dialog"
          aria-labelledby="mySmallModalLabel"
          aria-hidden={!isModalOpen}
        >
          <div class="modal-dialog modal-sm">
            <div class="modal-content">
              <SpinnerLoader />
            </div>
          </div>
        </div>
      </>

      <div
        class="modal fade"
        id="exampleModalLong"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLongTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <p className="PrivacyPolicyHeading">Privacy Policy</p>
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
              <div>
                <div className="mt-1 mb-5 container main_div_policy_desp">
                  <p className="PrivacyPolicyQuestion">
                    What information do we collect?
                  </p>
                  <p className="PrivacyPolicyDesp">
                    We collect information from you when you subscribe to our
                    newsletter or marketing updates, fill out a form or submit
                    property information.
                  </p>

                  <p className="PrivacyPolicyDesp">
                    We may collect information about your computer, including
                    your IP address, operating system and browser type using
                    Google Analytics, this is to improve browsing for everyone
                    and does not identify any individual. You can learn more
                    about how data is collected with Analytics
                  </p>
                  <p className="PrivacyPolicyDesp">
                    When ordering or registering on our site, as appropriate,
                    you may be asked to enter your: name, e-mail address,
                    mailing address or phone number. You may, however, visit our
                    site anonymously. We transfer information about you if
                    Victory Homes is acquired by or merged with another company.
                    In this event, Victory Homes will notify you before
                    information about you is transferred and becomes subject to
                    a different privacy policy.
                  </p>

                  <p className="PrivacyPolicyQuestion">
                    What do we use your information for?
                  </p>
                  <p className="PrivacyPolicyDesp">
                    Any of the information we collect from you may be used in
                    one of the following ways:
                  </p>

                  <p className="PrivacyPolicyDesp">To process transactions</p>

                  <p className="PrivacyPolicyDesp">
                    Your information, whether public or private, will not be
                    sold, exchanged, transferred, or given to any other company
                    for any reason whatsoever, without your consent, other than
                    for the express purpose of delivering the purchased product
                    or service requested.
                  </p>

                  <p className="PrivacyPolicyDesp">To send periodic emails</p>

                  <p className="PrivacyPolicyDesp">
                    The email address you provide may be used to send you
                    information, respond to inquiries, and/or other requests or
                    questions.
                  </p>
                  <p className="PrivacyPolicyDesp">
                    How do we protect your information?
                  </p>
                  <p className="PrivacyPolicyDesp">
                    We implement a variety of security measures to maintain the
                    safety of your personal information when you enter, submit,
                    or access your personal information.
                  </p>

                  <p className="PrivacyPolicyQuestion">
                    How do we protect your information?
                  </p>
                  <p className="PrivacyPolicyDesp">
                    We implement a variety of security measures to maintain the
                    safety of your personal information when you enter, submit,
                    or access your personal information.
                  </p>

                  <p className="PrivacyPolicyQuestion">
                    Do we disclose any information to outside parties?
                  </p>
                  <p className="PrivacyPolicyDesp">
                    We do not sell, trade, or otherwise transfer to outside
                    parties your personally identifiable information. This does
                    not include trusted third parties who assist us in operating
                    our website, conducting our business, or servicing you, so
                    long as those parties agree to keep this information
                    confidential. We may also release your information when we
                    believe release is appropriate to comply with the law,
                    enforce our site policies, or protect ours or others rights,
                    property, or safety. However, non-personally identifiable
                    visitor information may be provided to other parties for
                    marketing, advertising, or other uses.
                  </p>

                  <p className="PrivacyPolicyQuestion">Third party links</p>
                  <p className="PrivacyPolicyDesp">
                    Occasionally, at our discretion, we may include or offer
                    third party products or services on our website. These third
                    party sites have separate and independent privacy policies.
                    We therefore have no responsibility or liability for the
                    content and activities of these linked sites. Nonetheless,
                    we seek to protect the integrity of our site and welcome any
                    feedback about these sites.
                  </p>

                  <p className="PrivacyPolicyQuestion">Third Party Services</p>
                  <p className="PrivacyPolicyDesp">
                    In general, the third-party providers used by us will only
                    collect, use and disclose your information to the extent
                    necessary to allow them to perform the services they provide
                    to us.
                  </p>

                  <p className="PrivacyPolicyDesp">
                    However, certain third-party service providers, such as
                    payment gateways and other payment transaction processors,
                    have their own privacy policies in respect to the
                    information we are required to provide to them for your
                    purchase-related transactions.
                  </p>
                  <p className="PrivacyPolicyDesp">
                    For these providers, we recommend that you read their
                    privacy policies so you can understand the manner in which
                    your personal information will be handled by these
                    providers.
                  </p>
                  <p className="PrivacyPolicyDesp">
                    In particular, remember that certain providers may be
                    located in or have facilities that are located a different
                    jurisdiction than either you or us. So if you elect to
                    proceed with a transaction that involves the services of a
                    third-party service provider, then your information may
                    become subject to the laws of the jurisdiction(s) in which
                    that service provider or its facilities are located.
                  </p>
                  <p className="PrivacyPolicyDesp">
                    As an example, if you are located in Canada and your
                    transaction is processed by a payment gateway located in the
                    United States, then your personal information used in
                    completing that transaction may be subject to disclosure
                    under United States legislation, including the Patriot Act.
                  </p>
                  <p className="PrivacyPolicyDesp">
                    Once you leave our store’s website or are redirected to a
                    third-party website or application, you are no longer
                    governed by this Privacy Policy or our website’s Terms of
                    Service.
                  </p>

                  <p className="PrivacyPolicyQuestion">Remarketing</p>
                  <p className="PrivacyPolicyDesp">
                    Victory Homes also may use 3rd party vendor re-marketing
                    tracking cookies, including but not limited to the Google
                    Adwords tracking cookie. This means we will continue to show
                    ads to you across the internet, specifically on the Google
                    Content Network (GCN). As always we respect your privacy and
                    are not collecting any identifiable information through the
                    use of Google’s or any other 3rd party remarketing system.
                  </p>

                  <p className="PrivacyPolicyDesp">
                    The third-party vendors, including Facebook and Google,
                    whose services we use – will place cookies on web browsers
                    in order to serve ads based on past visits to our website. –
                    Third party vendors, including Google, use cookies to serve
                    ads based on a user’s prior visits to your website. This
                    allows us to make special offers and continue to market our
                    services to those who have shown interest in our service.
                  </p>
                  <p className="PrivacyPolicyDesp">
                    In addition to using cookies and related technologies as
                    described above, we also may permit certain third party
                    companies to help us tailor advertising that we think may be
                    of interest to users and to collect and use other data about
                    user activities on our Sites and/or Services (e.g., to allow
                    them to tailor ads on third party services). These companies
                    may deliver ads that might also place cookies and otherwise
                    track user behavior.
                  </p>
                  <p className="PrivacyPolicyDesp">
                    For example, we may use Google’s “remarketing” service to
                    target our ads to you based on your prior use of the Site
                    when you visit on other sites in Google’s content network.
                  </p>

                  <p className="PrivacyPolicyQuestion">
                    This website may use Google AdWords
                  </p>
                  <p className="PrivacyPolicyDesp">
                    This website uses the Google AdWords remarketing service to
                    advertise on third party websites (including Google) to
                    previous visitors to our site. It could mean that we
                    advertise to previous visitors who haven’t completed a task
                    on our site, for example using the contact form to make an
                    enquiry. This could be in the form of an advertisement on
                    the Google search results page, or a site in the Google
                    Display Network. Third-party vendors, including Google, use
                    cookies to serve ads based on someone’s past visits to the
                    Victory Homes website. Of course, any data collected will be
                    used in accordance with our own privacy policy and Google’s
                    privacy policy.”
                  </p>

                  <p className="PrivacyPolicyQuestion">
                    California Online Privacy Protection Act Compliance
                  </p>
                  <p className="PrivacyPolicyDesp">
                    Because we value your privacy we have taken the necessary
                    precautions to be in compliance with the California Online
                    Privacy Protection Act. We therefore will not distribute
                    your personal information to outside parties without your
                    consent.
                  </p>

                  <p className="PrivacyPolicyQuestion">
                    Childrens Online Privacy Protection Act Compliance
                  </p>
                  <p className="PrivacyPolicyDesp">
                    We are in compliance with the requirements of COPPA
                    (Childrens Online Privacy Protection Act), we do not collect
                    any information from anyone under 13 years of age. Our
                    website, products and services are all directed to people
                    who are at least 13 years old or older.
                  </p>

                  <p className="PrivacyPolicyQuestion">
                    Personal, Financial, And Property Information
                  </p>
                  <p className="PrivacyPolicyDesp">
                    Our company is a real estate services firm that may require
                    you submitting certain information so we can help you in
                    your situation. This information may include your contact
                    info, information about your property, or even in some cases
                    financial information needed to help us analyze your
                    property and situation. This information is for our use only
                    and will not be shared with outside parties unless as
                    required to help us help you solve your real estate
                    situation.
                  </p>

                  <p className="PrivacyPolicyQuestion">
                    Online Privacy Policy Only
                  </p>
                  <p className="PrivacyPolicyDesp">
                    This online privacy policy applies only to information
                    collected through our website and not to information
                    collected offline.
                  </p>

                  <p className="PrivacyPolicyQuestion">
                    Changes to our Privacy Policy
                  </p>
                  <p className="PrivacyPolicyDesp">
                    If we decide to change our privacy policy, we will post
                    those changes on this page.
                  </p>

                  <p className="PrivacyPolicyQuestion">Contacting Us</p>
                  <p className="PrivacyPolicyDesp">
                    If there are any questions regarding this privacy policy you
                    may contact us
                  </p>
                  <p className="PrivacyPolicyDesp">PPC Leads To Deal</p>
                  <p className="PrivacyPolicyDesp">Waterburry, Connecticut USA</p>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
