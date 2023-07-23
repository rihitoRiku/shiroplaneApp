import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Alert from "../../../src/components/alert/alert";
import Loader from "../../../src/components/loader/loader";

import Illust from "../../assets/Cl.png";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validationForm, setvalidationForm] = useState(false);

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [loader, setLoader] = useState(false);

  // const Route = () => {
  //   if (localStorage.getItem("token")) {
  //     return <Redirect to="/dashboard" />;
  //   } else {
  //     return <Redirect to="/login" />;
  //   }
  // }

  // localStorage.setItem('token', token);
  // const token = localStorage.getItem('token');
  // localStorage.removeItem('token');

  const handleLogin = (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (!username || !password) {
      setMessage("please fill all fields correctly!");
      setvalidationForm(true);
      setCountdown(3);
      return;
    }
    Axios.post(`https://shiroplane-backend.vercel.app/auth/login`, {
      username,
      password,
    })
      .then((response) => {
        setMessage(response.data.message);
        setvalidationForm(true);
        setCountdown(3);
        let token = response.data.data.accessToken;
        let id = response.data.data._id;
        localStorage.setItem("id", id);
        localStorage.setItem("token", token);
        const headers = {
          token: `Bearer ${token}`,
        };
        setIsLoading(false);

        navigate(`/dashboard/${id}`);
      })
      .catch((error) => {
        setMessage(error.response.data.message);
        setvalidationForm(true);
        setCountdown(3);
        console.log(error);
      });
    setIsLoading(false);
  };

  // COUNT DOWN
  useEffect(() => {
    let timeout;
    if (validationForm && countdown > 0) {
      timeout = setTimeout(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setvalidationForm(false);
      setMessage("");
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [countdown, validationForm]);

  return (
    <>
      {/* ALERT VALIDATION FORM */}
      {validationForm && <Alert message={message} countdown={countdown} />}

      {loader || isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <div className="mx-auto max-w-5xl px-4 h-[55em] flex flex-col items-center justify-center">
            <div className="text-4xl sm:text-5xl xl:text-6xl text-center">
              Login Page
            </div>
            <div className="text-lg sm:text-xl xl:text-2xl text-center mt-12 text-slate-600 container max-w-3xl">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Asperiores, magni voluptates nemo porro ut veritatis.
            </div>
            <form className="mt-12 container max-w-lg" onSubmit={handleLogin}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-lg font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="title"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  name="title"
                  className="border h-12 border-gray-300 px-3 py-2 mt-1 w-full block text-md focus:outline-none"
                  placeholder="ex: shiroplane"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="font-b text-lg font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="text"
                  id="title"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="title"
                  className="border h-12 border-gray-300 px-3 py-2 mt-1 w-full block text-md focus:outline-none"
                  placeholder="ex: supersecretpassword"
                />
              </div>
              <div className="mt-8 flex flex-col md:flex-row md:justify-end items-end gap-4">
                <button
                  type="submit"
                  className="h-12 w-32 border bg-white hover:bg-gray-50 text-black"
                >
                  Login
                </button>
                <button
                  onClick={()=>navigate(`/`)}
                  className="h-12 w-32 border bg-white hover:bg-gray-50 text-black"
                >
                  Cancel
                </button>
              </div>
              
              <div className="h-56 w-56 place-self-start relative -top-14 -left-6">
                <img src={Illust} alt="" />
              </div>
            </form>
          </div>
        </>
      )}

      <div className=""></div>
    </>
  );
}

export default Login;
