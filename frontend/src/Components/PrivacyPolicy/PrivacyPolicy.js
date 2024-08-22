import React, { useEffect, useState } from "react";
import "./../PrivacyPolicy/PrivacyPolicyStyle.css";
import FooterPpc from "../Homepage/FooterPpc/FooterPpc";
import RightReserved from "../Homepage/AllRightReserved/RightReserved";
import ppclogo from "./../../Assets/ppclogogrey.PNG";
import ppclogowhite from "./../../Assets/ppclogo.png";
import { Link } from "react-router-dom";
import AddEmail from "../Homepage/AddEmail/AddEmail";

function PrivacyPolicy() {
  const appUrl = process.env.REACT_APP_API_URL;

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

  return (
    <div>
      <>
        {" "}
        <div
          className={`scroll-to-top ${isVisible ? "show" : ""}`}
          onClick={scrollToTop}
        >
          <span>&uarr;</span>
        </div>
      </>
      <nav className="navbar navbar-expand-lg sticky-top navbarsticky">
        <img src={ppclogowhite} className="ppc_logo_navbar" />

        {/* <a className="navbar-brand" href="#">Navbar</a> */}
        <button
          className="navbar-toggler bg-light mr-3"
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
          <form className="form-inline  my-2 my-lg-0 navbar_main_div ">
            <a href={`${appUrl}#reimarket`}>
              <p className="mx-2 link_navbar_a">Leads marketplace</p>
            </a>
            <a href={`${appUrl}#whyus`}>
              <p className="mx-2 link_navbar_a">Why us?</p>
            </a>
            <a href={`${appUrl}#fixedprice`}>
              <p className="mx-2 link_navbar_a">Fixed Price Mode</p>
            </a>
            <a href={`${appUrl}#aboutus`}>
              <p className="mx-2 link_navbar_a">About Us</p>
            </a>
            <a href={`${appUrl}#review`}>
              <p className="mx-2 link_navbar_a">Reviews</p>
            </a>
            <Link to="/contact_us">
              <a>
                <p className="mx-2 link_navbar_a">Contact Us</p>
              </a>
            </Link>
            <Link to="/signin">
              <button className="ml-5 login_button_navbar">Login</button>
            </Link>
            <Link to="/register">
              <button className="ml-2 create_account_button">
                Create Account
              </button>
            </Link>
          </form>
        </div>
      </nav>

      <div className="mt-5 mb-5 container">
        <p className="PrivacyPolicyHeading mt-5 pt-5">Privacy Policy</p>
        <p className="PrivacyPolicyQuestion">What information do we collect?</p>
        <p className="PrivacyPolicyDesp">
          We collect information from you when you subscribe to our newsletter
          or marketing updates, fill out a form or submit property information.
        </p>

        <p className="PrivacyPolicyDesp">
          We may collect information about your computer, including your IP
          address, operating system and browser type using Google Analytics,
          this is to improve browsing for everyone and does not identify any
          individual. You can learn more about how data is collected with
          Analytics
        </p>
        <p className="PrivacyPolicyDesp">
          When ordering or registering on our site, as appropriate, you may be
          asked to enter your: name, e-mail address, mailing address or phone
          number. You may, however, visit our site anonymously. We transfer
          information about you if PPC is acquired by or merged with another
          company. In this event, PPC will notify you before information about
          you is transferred and becomes subject to a different privacy policy.
        </p>

        <p className="PrivacyPolicyQuestion">
          What do we use your information for?
        </p>
        <p className="PrivacyPolicyDesp">
          Any of the information we collect from you may be used in one of the
          following ways:
        </p>

        <p className="PrivacyPolicyDesp">To process transactions</p>

        <p className="PrivacyPolicyDesp">
          Your information, whether public or private, will not be sold,
          exchanged, transferred, or given to any other company for any reason
          whatsoever, without your consent, other than for the express purpose
          of delivering the purchased product or service requested.
        </p>

        <p className="PrivacyPolicyDesp">To send periodic emails</p>

        <p className="PrivacyPolicyDesp">
          The email address you provide may be used to send you information,
          respond to inquiries, and/or other requests or questions.
        </p>
        <p className="PrivacyPolicyDesp">How do we protect your information?</p>
        <p className="PrivacyPolicyDesp">
          We implement a variety of security measures to maintain the safety of
          your personal information when you enter, submit, or access your
          personal information.
        </p>

        <p className="PrivacyPolicyQuestion">
          How do we protect your information?
        </p>
        <p className="PrivacyPolicyDesp">
          We implement a variety of security measures to maintain the safety of
          your personal information when you enter, submit, or access your
          personal information.
        </p>

        <p className="PrivacyPolicyQuestion">
          Do we disclose any information to outside parties?
        </p>
        <p className="PrivacyPolicyDesp">
          We do not sell, trade, or otherwise transfer to outside parties your
          personally identifiable information. This does not include trusted
          third parties who assist us in operating our website, conducting our
          business, or servicing you, so long as those parties agree to keep
          this information confidential. We may also release your information
          when we believe release is appropriate to comply with the law, enforce
          our site policies, or protect ours or others rights, property, or
          safety. However, non-personally identifiable visitor information may
          be provided to other parties for marketing, advertising, or other
          uses.
        </p>

        <p className="PrivacyPolicyQuestion">Third party links</p>
        <p className="PrivacyPolicyDesp">
          Occasionally, at our discretion, we may include or offer third party
          products or services on our website. These third party sites have
          separate and independent privacy policies. We therefore have no
          responsibility or liability for the content and activities of these
          linked sites. Nonetheless, we seek to protect the integrity of our
          site and welcome any feedback about these sites.
        </p>

        <p className="PrivacyPolicyQuestion">Third Party Services</p>
        <p className="PrivacyPolicyDesp">
          In general, the third-party providers used by us will only collect,
          use and disclose your information to the extent necessary to allow
          them to perform the services they provide to us.
        </p>

        <p className="PrivacyPolicyDesp">
          However, certain third-party service providers, such as payment
          gateways and other payment transaction processors, have their own
          privacy policies in respect to the information we are required to
          provide to them for your purchase-related transactions.
        </p>
        <p className="PrivacyPolicyDesp">
          For these providers, we recommend that you read their privacy policies
          so you can understand the manner in which your personal information
          will be handled by these providers.
        </p>
        <p className="PrivacyPolicyDesp">
          In particular, remember that certain providers may be located in or
          have facilities that are located a different jurisdiction than either
          you or us. So if you elect to proceed with a transaction that involves
          the services of a third-party service provider, then your information
          may become subject to the laws of the jurisdiction(s) in which that
          service provider or its facilities are located.
        </p>
        <p className="PrivacyPolicyDesp">
          As an example, if you are located in Canada and your transaction is
          processed by a payment gateway located in the United States, then your
          personal information used in completing that transaction may be
          subject to disclosure under United States legislation, including the
          Patriot Act.
        </p>
        <p className="PrivacyPolicyDesp">
          Once you leave our store’s website or are redirected to a third-party
          website or application, you are no longer governed by this Privacy
          Policy or our website’s Terms of Service.
        </p>

        <p className="PrivacyPolicyQuestion">Remarketing</p>
        <p className="PrivacyPolicyDesp">
          PPC also may use 3rd party vendor re-marketing tracking cookies,
          including but not limited to the Google Adwords tracking cookie. This
          means we will continue to show ads to you across the internet,
          specifically on the Google Content Network (GCN). As always we respect
          your privacy and are not collecting any identifiable information
          through the use of Google’s or any other 3rd party remarketing system.
        </p>

        <p className="PrivacyPolicyDesp">
          The third-party vendors, including Facebook and Google, whose services
          we use – will place cookies on web browsers in order to serve ads
          based on past visits to our website. – Third party vendors, including
          Google, use cookies to serve ads based on a user’s prior visits to
          your website. This allows us to make special offers and continue to
          market our services to those who have shown interest in our service.
        </p>
        <p className="PrivacyPolicyDesp">
          In addition to using cookies and related technologies as described
          above, we also may permit certain third party companies to help us
          tailor advertising that we think may be of interest to users and to
          collect and use other data about user activities on our Sites and/or
          Services (e.g., to allow them to tailor ads on third party services).
          These companies may deliver ads that might also place cookies and
          otherwise track user behavior.
        </p>
        <p className="PrivacyPolicyDesp">
          For example, we may use Google’s “remarketing” service to target our
          ads to you based on your prior use of the Site when you visit on other
          sites in Google’s content network.
        </p>

        <p className="PrivacyPolicyQuestion">
          This website may use Google AdWords
        </p>
        <p className="PrivacyPolicyDesp">
          This website uses the Google AdWords remarketing service to advertise
          on third party websites (including Google) to previous visitors to our
          site. It could mean that we advertise to previous visitors who haven’t
          completed a task on our site, for example using the contact form to
          make an enquiry. This could be in the form of an advertisement on the
          Google search results page, or a site in the Google Display Network.
          Third-party vendors, including Google, use cookies to serve ads based
          on someone’s past visits to the PPC website. Of course, any data
          collected will be used in accordance with our own privacy policy and
          Google’s privacy policy.”
        </p>

        <p className="PrivacyPolicyQuestion">
          California Online Privacy Protection Act Compliance
        </p>
        <p className="PrivacyPolicyDesp">
          Because we value your privacy we have taken the necessary precautions
          to be in compliance with the California Online Privacy Protection Act.
          We therefore will not distribute your personal information to outside
          parties without your consent.
        </p>

        <p className="PrivacyPolicyQuestion">
          Childrens Online Privacy Protection Act Compliance
        </p>
        <p className="PrivacyPolicyDesp">
          We are in compliance with the requirements of COPPA (Childrens Online
          Privacy Protection Act), we do not collect any information from anyone
          under 13 years of age. Our website, products and services are all
          directed to people who are at least 13 years old or older.
        </p>

        <p className="PrivacyPolicyQuestion">
          Personal, Financial, And Property Information
        </p>
        <p className="PrivacyPolicyDesp">
          Our company is a real estate services firm that may require you
          submitting certain information so we can help you in your situation.
          This information may include your contact info, information about your
          property, or even in some cases financial information needed to help
          us analyze your property and situation. This information is for our
          use only and will not be shared with outside parties unless as
          required to help us help you solve your real estate situation.
        </p>

        <p className="PrivacyPolicyQuestion">Online Privacy Policy Only</p>
        <p className="PrivacyPolicyDesp">
          This online privacy policy applies only to information collected
          through our website and not to information collected offline.
        </p>

        <p className="PrivacyPolicyQuestion">Changes to our Privacy Policy</p>
        <p className="PrivacyPolicyDesp">
          If we decide to change our privacy policy, we will post those changes
          on this page.
        </p>

        <p className="PrivacyPolicyQuestion">Contacting Us</p>
        <p className="PrivacyPolicyDesp">
          If there are any questions regarding this privacy policy you may
          contact us
        </p>
        <p className="PrivacyPolicyDesp">PPC Leads To Deal</p>
        <p className="PrivacyPolicyDesp">Waterburry, Connecticut USA</p>
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
    </div>
  );
}

export default PrivacyPolicy;
