import { useEffect, useState } from "react";
import "./Login.css";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import logo from "../../assets/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [Admintoken, setAdminToken] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  // Function to handle OTP verification
  const verifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading when verifying OTP
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/admin/verify-otp`,
        {
          email: email,
          otp: otp,
        },
        { withCredentials: true }
      );
      console.log("OTP Verified", response?.data);
      const token = response?.data.token;
      setAdminToken(token);
      localStorage.setItem("admin", JSON.stringify(response?.data.user));
      localStorage.setItem("token", token);
      toast.success(response?.data.status, {});

      setTimeout(() => {
        window.location.href = "/";
      }, 1200);
    } catch (error) {
      console.error("OTP verification failed", error);
      toast.error("Invalid OTP. Please try again.", {});
    } finally {
      setLoading(false); // Stop loading after the response
    }
  };

  // Function to handle login
  const handleSubmmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading when submitting login
    const payload = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/loginadmin`,
        payload,
        { withCredentials: true }
      );
      console.log("Login Response", response?.data);

      if (response?.data.success === true) {
        setOtpSent(true); // OTP has been sent, show OTP input field
        toast.success("OTP sent to your email.", {});
      } else if (response?.data.token) {
        // If no OTP verification is required, directly log in
        const token = response?.data.token;
        setAdminToken(token);
        localStorage.setItem("admin", JSON.stringify(response?.data.user));
        localStorage.setItem("token", token);
        toast.success("Login successful", {});

        setTimeout(() => {
          window.location.href = "/";
        }, 1200);
      }
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Login failed. Please try again.", {});
    } finally {
      setLoading(false); // Stop loading after the response
    }
  };

  useEffect(() => {
    if (Admintoken) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [Admintoken]);

  return (
    <>
      <ToastContainer />
      <div
        className="container signup loginzoom"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <form className="form_main" action="">
          <img src={logo} style={{ width: "10rem" }} alt="Logo" />

          {loading ? (
            <div className="loader"></div> // Display loader when loading is true
          ) : (
            <>
              {!otpSent ? (
                <>
                  <div className="inputContainer">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      id="email"
                      className="inputField"
                      type="email"
                      disabled={loading} // Disable input during loading
                    />
                  </div>

                  <div className="inputContainer">
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      id="password"
                      className="inputField"
                      type="password"
                      disabled={loading} // Disable input during loading
                    />
                  </div>

                  <button onClick={handleSubmmit} id="button" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </>
              ) : (
                <>
                  <div className="inputContainer">
                    <input
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter OTP"
                      id="otp"
                      className="inputField"
                      type="text"
                      disabled={loading} // Disable input during loading
                    />
                  </div>
                  <button onClick={verifyOtp} id="button" disabled={loading}>
                    {loading ? "Verifying OTP..." : "Verify OTP"}
                  </button>
                </>
              )}
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default Login;
