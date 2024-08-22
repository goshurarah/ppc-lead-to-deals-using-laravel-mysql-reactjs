import "./App.css";
import DesiredState from "./Components/DesiredState/DesiredState";
import VerifiedCode from "./Components/EnterVerificationCode/VerifiedCode";
import NewPassword from "./Components/ForgotNewPassword/NewPassword";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import Homepage from "./Components/Homepage/Homepage_components_merge/Homepage";
import RoleinProject from "./Components/RoleInProject/RoleinProject";
import Signin from "./Components/SignIn/SignIn";
import Signup from "./Components/SignUp/Signup";
import VerificationCode from "./Components/Verificationcode/VerificationCode";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Redirect } from "react-router-dom";
import VerifyEmail from "./Components/VerifyEmail/VerifyEmail";
import VerifiedEmailafter from "./Components/VerifyEmail/VerifiedEmailafter";
import AddEmail from "./Components/Homepage/AddEmail/AddEmail";
import DashboardPpc from "./Components/Dashboard/Dashboadpage/DashboardPpc";
// import PublicRoute from "./Components/Routes/PublicRoutes/PublicRoute";
// import PrivateRoute from "./Components/Routes/PrivateRoutes/PrivateRoute";

import EmailHasBeenVerified from "./Components/EmailHasbeenVerified/EmailHasBeenVerified";
import React, { Fragment } from "react";
import PrivateRoute from "./Components/RoutesPpc/PrivateRoute";
import Crm from "./Components/Dashboard/CRM/Crm";
import DesiredCounty from "./Components/Desiredcounty/DesiredCounty";
import { PaymentProvider } from "./Components/Dashboard/MainMenu/PaymentContext";
import DesiredCity from "./Components/DesiredCity/DesiredCity";
import GoogleRegister from "./Components/GoogleRegisteration/GoogleRegister";
import RoleInProjectGoogle from "./Components/RoleinprojectGoogleSignup/RoleInProjectGoogle";
import StatesGoogle from "./Components/DesiredStatesGoogleSignup/StatesGoogle";
import CountyGoogle from "./Components/CountyGoogleSignup/CountyGoogle";
import CityGoogle from "./Components/CityGoogleSignup/CityGoogle";
import VerificationcodeGoogle from "./Components/VerificationcodeGoogle/VerificationcodeGoogle";
import EnterVerificationCodeGoogle from "./Components/EnterverficationCodeGoogle/EnterVerificationCodeGoogle";
import PrivacyPolicy from "./Components/PrivacyPolicy/PrivacyPolicy";
import Blogs from "./Components/Homepage/Blogs/Blogs";
import BblogPostOpen from "./Components/Homepage/BlogPostOpen/BblogPostOpen";
import CategoryBlog from "./Components/Homepage/CategoryBlogs/CategoryBlog";
import BlogsTags from "./Components/Homepage/BlogsTags/BlogsTags";
import ContactUs from "./Components/Homepage/ContactUs/ContactUs";
function App() {
  // useEffect(() => {
  //   const storedToken = localStorage.getItem('token');
  //   if (storedToken) {
  //     const currentTime = new Date().getTime();
  //     const storedTime = JSON.parse(storedToken).timestamp;
  //     const timeDifference = currentTime - storedTime;
  //     const expirationTime = 1000;
  //     if (timeDifference > expirationTime) {
  //       localStorage.removeItem('token');
  //     }
  //   }
  // }, []);
  return (
    <>
      <PaymentProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/auth/google" element={<GoogleRegister />} />
            <Route path="/password_reset" element={<ForgotPassword />} />
            <Route
              path="/reset-password/:token/:email"
              element={<NewPassword />}
            />
            {/* <Route
            path="/verify-email/:token/:email"
            element={<EmailHasBeenVerified />}
          /> */}
            <Route
              path="/verify-email/:token/:email"
              element={<VerifyEmail />}
            />
            <Route path="/verify-email" element={<VerifiedEmailafter />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />


            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<BblogPostOpen />} />
            <Route path="/category/:id" element={<CategoryBlog />} />
            <Route path="/tags/:id" element={<BlogsTags />} />



            
            <Route path="/verification_code" element={<VerificationCode />} />
            <Route path="/contact_us" element={<ContactUs />} />
            <Route
              path="/verification_code_Google"
              element={<VerificationcodeGoogle />}
            />
            <Route path="/enter_code" element={<VerifiedCode />} />
            <Route
              path="/enter_code_google"
              element={<EnterVerificationCodeGoogle />}
            />
            <Route path="/role_project" element={<RoleinProject />} />
            <Route
              path="/role_project_Google"
              element={<RoleInProjectGoogle />}
            />
            <Route path="/state" element={<DesiredState />} />
            <Route path="/state_Google" element={<StatesGoogle />} />
            <Route path="/county" element={<DesiredCounty />} />
            <Route path="/county_Google" element={<CountyGoogle />} />
            <Route path="/city" element={<DesiredCity />} />
            <Route path="/city_Google" element={<CityGoogle />} />
            <Route path="/contactus" element={<AddEmail />} />
            <Route
              path="/emailhasbeenverified"
              element={<EmailHasBeenVerified />}
            />
            <Route
              path="/dashboard"
              element={<PrivateRoute Component={DashboardPpc} />}
            />
          </Routes>
        </Router>
      </PaymentProvider>
    </>
  );
}

export default App;
