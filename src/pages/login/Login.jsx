import { useState, useCallback, useEffect } from "react";
import Axios from "axios";
import Alert from "../../../src/components/alert/alert";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validationForm, setvalidationForm] = useState(false);

  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(3);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setMessage("please fill all fields correctly!");
      setvalidationForm(true);
      setCountdown(3);
      return;
    }
    Axios.post(`http://localhost:5000/auth/login`, { username, password })
      .then((response) => {
        setMessage(response.data.message);
        setvalidationForm(true);
        setCountdown(3);
        console.log(response);
      })
      .catch((error) => {
        setMessage(error.response.data.message);
        setvalidationForm(true);
        setCountdown(3);
        console.log(error);
      });
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
      {validationForm && (
        <Alert
          message={message}
          countdown={countdown}
        />
      )}

      <div className="px-4 h-[48em] flex flex-col items-center justify-center">
        <div className="text-4xl sm:text-5xl xl:text-6xl text-center">
          Login Page
        </div>
        <div className="text-lg sm:text-xl xl:text-2xl text-center mt-12 text-slate-600 container max-w-3xl">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores,
          magni voluptates nemo porro ut veritatis.
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
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="h-12 py-2 px-12 border bg-white hover:bg-gray-50 text-black"
            >
              Login
            </button>
          </div>
        </form>
      </div>

      <div className=""></div>
    </>
  );
}

export default Login;
